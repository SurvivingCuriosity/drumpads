import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useAppContext } from "../context/AppContext"
import { SoundFull } from "../db/Sound"
import { BPMInput } from "./BPMInput"
import { useIsPantallaMovil } from "../helpers/useIsPantallaMovil"

export const Sequencer = () => {

    const { sounds, play, bpm } = useAppContext()
    const isPantallaMovil = useIsPantallaMovil()
    const bars = useMemo(() => isPantallaMovil ? 4 : 8, [isPantallaMovil])
    const steps = useMemo(() => new Array(bars * 4).fill({}), [bars])

    const [sequence, setSequence] = useState<string[][]>(new Array(bars * 4).fill([]) as string[][])
    const sequenceRef = useRef(sequence)
    const [isPlaying, setIsPlaying] = useState(false)
    const activeStep = useRef(0)
    const [activeStepState, setActiveStepState] = useState(0)
    const [halfSpeed, setHalfSpeed] = useState<2|4>(2)
    
    const handleStepClick = useCallback((_s: SoundFull, index: number, soundIndex: number) => {
        setSequence(prevSequence => {
            const newSequence = [...prevSequence];
            const sonidoElegido = sounds[soundIndex].key;

            if (newSequence[index].includes(sonidoElegido)) {
                // Remove the sound if it already exists
                newSequence[index] = newSequence[index].filter(sound => sound !== sonidoElegido);
            } else {
                // Add the sound if it does not exist
                newSequence[index] = [...newSequence[index], sonidoElegido];
            }
            sequenceRef.current = newSequence;
            return newSequence;
        });
    }, [sounds]);

    useEffect(() => {
        if (!isPlaying) return;

        const sonidos = sounds.filter(s => sequenceRef.current[0]?.includes(s.key));
        sonidos.forEach(s => play(s));
        activeStep.current = activeStep.current + 1

        const playing = setInterval(() => {
            const sonidos = sounds.filter(s => sequenceRef.current[activeStep.current]?.includes(s.key));
            sonidos.forEach(s => play(s));
            setActiveStepState(activeStep.current)
            
            activeStep.current = activeStep.current === sequence.length -1 
                ? 0
                : activeStep.current + 1

        }, 60000 / bpm / halfSpeed);

        return () => clearInterval(playing);
    }, [isPlaying]);



    const togglePlay = () => {
        setIsPlaying(prevState => !prevState);
        activeStep.current = 0
        setActiveStepState(0)
    };

    const handleClickReset = () => {
        setIsPlaying(false)
        const emptySequence = new Array(bars * 4).fill([]) as string[][]
        setSequence(emptySequence)
        sequenceRef.current = emptySequence
        activeStep.current = 0
        setActiveStepState(0)
    };

    const handleClickHalfSpeed = () => {
        setHalfSpeed(halfSpeed === 2 ? 4 : 2)
    }

    return (
        <div className="w-full max-w-screen-2xl rounded-lg bg-neutral-900 p-4">
            <span className="flex items-center gap-2">
                <button onClick={togglePlay} className={`min-w-16 rounded-lg bg-neutral-800/50 px-2 py-1 border transition-colors duration-300 ${!isPlaying ? 'text-neutral-500 border-neutral-500' : ' border-fuchsia-500 text-fuchsia-500'}`}>
                    {isPlaying ? 'Stop' : 'Play'}
                </button>
                <button onClick={handleClickReset} className={`min-w-16 rounded-lg border border-neutral-500 bg-neutral-800/50 px-2 py-1 text-neutral-500 transition-colors duration-300`}>
                    Reset
                </button>
                <BPMInput disabled={isPlaying} />
                <button onClick={handleClickHalfSpeed} disabled={isPlaying} className={`disabled:text-neutral-700 disabled:border-neutral-700 rounded-lg border bg-neutral-800/50 px-2 py-1 ${halfSpeed===2 ? 'text-neutral-500 border-neutral-500' : ' border-fuchsia-500 text-fuchsia-500'} transition-colors duration-300`}>
                    {'x2'}
                </button>
            </span>

            <div className="flex flex-row gap-0.5 lg:flex-col lg:gap-0">

                <ol className="flex flex-col items-center justify-start gap-0.5 pt-12 lg:flex-row lg:justify-between lg:pt-0">
                    <span className="h-[22px] w-[50px] lg:h-0"></span>
                    {steps.map((_step, index) => (
                        <li
                            key={index}
                            className={`size-6 text-center rounded-sm -rotate-90 lg:rotate-0
                                ${activeStepState === index && isPlaying
                                    ? 'text-neutral-500'
                                    : 'text-neutral-800'}
                            `}>{'↓'}
                        </li>
                    ))}
                </ol>

                {sounds.map((s, soundIndex) => (
                    <div className="mb-1 flex flex-col items-center pt-12 lg:flex-row lg:pt-0" key={s.key}>
                        <p className={`-rotate-[35deg] lg:rotate-0 whitespace-nowrap w-4 lg:w-16 lg:truncate ${s.playing ? 'text-fuchsia-500' : 'text-neutral-600'}`}>{s.label}</p>
                        <ol className="flex w-full flex-col items-center justify-between gap-0.5 lg:flex-row">
                            {steps.map((_step, index) => (
                                <li
                                    key={index}
                                    onClick={() => { handleStepClick(s, index, soundIndex) }}
                                    className={`
                            ${sequence[index].includes(sounds[soundIndex].key)
                                            ? 'bg-fuchsia-500/20 border-fuchsia-500'
                                            : index % halfSpeed === 0
                                                ? 'bg-neutral-800/20 border-neutral-700'
                                                : 'bg-neutral-900 border-neutral-800'}
                                border rounded-sm size-6`}>
                                </li>
                            ))}
                        </ol>
                    </div>
                ))}

            </div>
        </div>
    )
}

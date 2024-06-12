import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useAppContext } from "../context/AppContext"
import { SoundFull } from "../db/Sound"

export const Sequencer = () => {

    const { sounds, play } = useAppContext()
    const bars = 4
    const steps = useMemo(() => new Array(bars * 4).fill({}), [])

    const [sequence, setSequence] = useState<string[][]>(new Array(bars * 4).fill([]) as string[][])
    const sequenceRef = useRef(sequence)
    const [isPlaying, setIsPlaying] = useState(false)
    const activeStep = useRef(0)
    const [activeStepState, setActiveStepState] = useState(0)

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
            activeStep.current = activeStep.current + 1
            if (activeStep.current === sequence.length) {
                activeStep.current = 0
            }
        }, 60000 / 80 / 4);

        return () => clearInterval(playing);
    }, [isPlaying]);

    const togglePlay = () => {
        setIsPlaying(prevState => !prevState);
        activeStep.current = 0
        setActiveStepState(0)
    };

    return (
        <div>
            <button onClick={togglePlay}>
                {isPlaying ? 'Stop' : 'Play'}
            </button>
            <div className="flex flex-row lg:flex-col">
                <ol className="flex flex-col items-center gap-0.5 lg:flex-row">
                    <p className="-mb-0.5 min-w-4">q</p>
                    {steps.map((_step, index) => (
                        <li
                            key={index}
                            className={`
                    ${activeStepState === index && isPlaying ? 'bg-fuchsia-800 border-fuchsia-400' : ''}
                    border border-transparent rounded-sm p-3`}>
                        </li>
                    ))}
                </ol>
                {sounds.map((s, soundIndex) => (
                    <div className="flex flex-col items-center lg:flex-row" key={s.key}>
                        <p className="min-w-4">{s.key}</p>
                        <ol className="flex flex-col items-center gap-0.5 lg:flex-row">
                            {steps.map((_step, index) => (
                                <li
                                    key={index}
                                    onClick={() => { handleStepClick(s, index, soundIndex) }}
                                    className={`
                            ${sequence[index].includes(sounds[soundIndex].key)
                                            ? 'bg-fuchsia-500/20 border-fuchsia-500'
                                            : index % 8 === 0
                                                ? 'bg-neutral-800/20 border-neutral-700'
                                                : 'bg-neutral-900 border-neutral-800'}
                                border rounded-sm p-3`}>
                                </li>
                            ))}
                        </ol>
                    </div>
                ))}

            </div>
        </div>
    )
}

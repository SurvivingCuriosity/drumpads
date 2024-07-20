import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useAppContext } from "../../context/useAppContext.ts"
import { ScreenContent } from "../../db/interfaces/ScreenContent.ts"
import { SoundFull } from "../../db/interfaces/Sound.ts"
import { useIsPantallaMovil } from "../../helpers/useIsPantallaMovil.ts"
import { BPMInput } from "./BPMInput.tsx"

export const Sequencer = () => {

    const { currentSounds, play, bpm, screenContent, sequencerPlaying, setSequencerPlaying } = useAppContext()

    const isPantallaMovil = useIsPantallaMovil()

    const bars = useMemo(() => isPantallaMovil ? 4 : 8, [isPantallaMovil])

    const steps = useMemo(() => new Array(bars * 4).fill({}), [bars])

    useEffect(() => {
        setSequence(new Array(bars * 4).fill([]) as string[][])
        sequenceRef.current = new Array(bars * 4).fill([]) as string[][]
    }, [bars])

    const mostrarSequencer = useMemo(() => screenContent === ScreenContent.Sequencer, [screenContent])

    const [sequence, setSequence] = useState<string[][]>(new Array(bars * 4).fill([]) as string[][])
    const sequenceRef = useRef(sequence)
    const [isPlaying, setIsPlaying] = useState(sequencerPlaying)
    const activeStep = useRef(0)
    const [activeStepState, setActiveStepState] = useState(0)
    const [halfSpeed, setHalfSpeed] = useState<2 | 4>(4)

    const sonidosValidos = useMemo(() => currentSounds.filter(s => s?.audioSrc !== "" && s !== undefined), [currentSounds])

    const handleStepClick = useCallback((_s: SoundFull | undefined, index: number, soundIndex: number) => {
        if (_s === undefined) return;
        setSequence(prevSequence => {
            const newSequence = [...prevSequence];
            const keyPressed = currentSounds[soundIndex]?.key;

            if (keyPressed !== undefined) {

                if (newSequence[index].includes(keyPressed)) {
                    // Remove the sound if it already exists
                    newSequence[index] = newSequence[index].filter(sound => sound !== keyPressed);
                } else {
                    // Add the sound if it does not exist
                    newSequence[index] = [...newSequence[index], keyPressed];
                }
            }
            sequenceRef.current = newSequence;
            return newSequence;
        });
    }, [currentSounds]);

    useEffect(() => {
        setSequencerPlaying(isPlaying);
        if (!isPlaying) return;

        const sonidos = currentSounds.filter(s => sequenceRef.current[0]?.includes(s?.key ?? ''));
        sonidos.forEach(s => play(s));
        activeStep.current = activeStep.current + 1

        const playing = setInterval(() => {
            console.log(activeStep.current);
            console.log(sequenceRef.current.length);


            const sonidos = currentSounds.filter(s => sequenceRef.current[activeStep.current]?.includes(s?.key ?? ''));
            sonidos.forEach(s => play(s));
            setActiveStepState(activeStep.current)

            activeStep.current = activeStep.current === sequenceRef.current.length - 1
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
        <div className={`${!isPantallaMovil || mostrarSequencer ? 'flex' : 'hidden'} w-min max-w-screen-2xl rounded-lg bg-neutral-900 p-4 flex-col items-center gap-2 mx-auto`}>
            <span className="mr-auto flex items-center gap-2">
                <button onClick={togglePlay} className={`min-w-16 rounded-lg bg-neutral-800/50 px-2 py-1 border transition-colors duration-100 ${!isPlaying ? 'text-neutral-400 border-neutral-500' : ' border-primary text-primary'}`}>
                    {isPlaying ? 'Stop' : 'Play'}
                </button>
                <button onClick={handleClickReset} className={`min-w-16 rounded-lg border border-neutral-500 bg-neutral-800/50 px-2 py-1 text-neutral-400 transition-colors duration-100`}>
                    Reset
                </button>
                <BPMInput disabled={isPlaying} />
                <button onClick={handleClickHalfSpeed} disabled={isPlaying} className={`disabled:text-neutral-700 disabled:border-neutral-700 rounded-lg border bg-neutral-800/50 px-2 py-1 ${halfSpeed === 4 ? 'text-neutral-400 border-neutral-500' : ' border-primary text-primary'} transition-colors duration-100`}>
                    {'/2'}
                </button>
            </span>

            <div className="flex flex-row gap-0.5 lg:flex-col lg:gap-0">
                {sonidosValidos.length === 0
                    ?
                    <p className="pt-4 text-neutral-400">{'(No sounds)'}</p>
                    :
                    sonidosValidos.map((s, soundIndex) => (
                        <div className="mb-1 flex flex-col items-center pt-4 lg:flex-row lg:pt-0" key={('s' + s?.audioSrc) + 'seq' + soundIndex}>
                            <p className={`whitespace-nowrap lg:w-16 lg:truncate ${s?.playing ? 'text-primary' : 'text-neutral-400'}`}>{soundIndex + 1}</p>
                            <ol className="flex w-full flex-col items-center justify-between gap-0.5 lg:flex-row">
                                {steps.map((_step, index) => (
                                    <li
                                        key={(s?.audioSrc ?? 'undefined') + soundIndex + index}
                                        onClick={() => { handleStepClick(s, index, soundIndex) }}
                                        className={`
                                    transition-colors duration-100
                                       ${sequence[index]?.includes(currentSounds[soundIndex]?.key ?? '')
                                                ? activeStepState === index && isPlaying
                                                    ? 'bg-primary/50 border-primary'
                                                    : 'bg-primary/20 border-primary'
                                                : index % (halfSpeed * 2) === 0
                                                    ? 'bg-neutral-800 border-neutral-500'
                                                    : 'bg-neutral-900 border-neutral-700'}
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

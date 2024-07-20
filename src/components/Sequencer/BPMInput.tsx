import { useAppContext } from "../../context/useAppContext.ts"

export interface BPMInputProps {
    disabled?: boolean
}

export const BPMInput = (props: BPMInputProps) => {


    const { disabled } = props
    const { bpm, setBpm } = useAppContext()

    const handleChangeBpm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newBpm = parseInt(e.target.value)
        setBpm(newBpm)
    }

    const handleBlur = () => {
        if (bpm < 50)
            setBpm(50)
        else if (bpm > 200)
            setBpm(200)
        else
            setBpm(bpm)
    }

    return (
        <span className="relative">

            <input
                aria-label="BPM"
                onBlur={handleBlur}
                type="number"
                className={`w-28 rounded-lg border border-neutral-500 bg-neutral-800/50 px-2 py-1 pl-12 text-neutral-400 transition-colors duration-300 disabled:border-neutral-700 disabled:text-neutral-700`}
                value={bpm}
                onChange={handleChangeBpm}
                disabled={disabled}
                min={50}
                max={200}
            />
            <p className={`absolute left-1 top-1/2 -translate-y-1/2 transition-colors duration-300 ${disabled ? 'text-neutral-700' : 'text-neutral-400'}`}>BPM: </p>
        </span>

    )
}
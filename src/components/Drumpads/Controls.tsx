import { useAppContext } from "../../context/useAppContext";
import { VolumeKnob } from "./VolumeKnob"

export const Controls = () => {
    return (
        <div className="flex h-28 w-full justify-between text-white">
            <VolumeControls />
        </div>
    )
}

export const VolumeControls = () => {

    const { currentSounds } = useAppContext();

    return (
        <div className="mb-1 flex gap-1">
            {currentSounds.map((sound, index) => {
                if (sound?.audioSrc === '') return null;
                return (
                    <VolumeKnob
                        key={(sound?.audioSrc ?? 'undefined') + 'knob' + index}
                        isPlaying={sound?.playing ?? false}
                        index={index}
                    />
                )
            })}
        </div>
    )
}
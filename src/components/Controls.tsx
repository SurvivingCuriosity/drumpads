import { useAppContext } from "../context/AppContext";
import { VolumeKnob } from "./VolumeKnob"

export const Controls = () => {
    return (
        <div className="flex h-28 w-full justify-between text-white">
            <VolumeControls />
        </div>
    )
}


export const VolumeControls = () => {

    const {sounds} = useAppContext();

    return (
        <div className="flex gap-1">
            {sounds.map((sound, index) => (
                <VolumeKnob key={sound.audioSrc} isPlaying={sound.playing} index={index} />
            ))}
        </div>
    )
}
import { VolumeKnob } from "./VolumeKnob.tsx"

// Los pads siempre son 9 (grid 3x3); cada VolumeKnob decide si renderizarse
// según su propio sonido, así Controls nunca necesita suscribirse a currentSounds.
const padIndexes = Array.from({ length: 9 }, (_, i) => i);

export const Controls = () => {
    return (
        <div className="flex h-32 w-full justify-between text-white">
            <VolumeControls />
        </div>
    )
}

export const VolumeControls = () => {
    return (
        <div className="flex w-full justify-between">
            {padIndexes.map((index) => (
                <VolumeKnob key={index} index={index} />
            ))}
        </div>
    )
}
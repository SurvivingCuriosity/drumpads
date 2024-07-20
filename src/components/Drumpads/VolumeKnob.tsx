import { useState } from "react";
import no_volume_icon from '../../assets/icons/no_volume_2.svg';
import volume_icon from '../../assets/icons/volume_2.svg';
import volume_highicon from '../../assets/icons/volume_high_2.svg';
import { useAppContext } from "../../context/useAppContext.ts";
import { SoundFull } from "../../db/interfaces/Sound.ts";
import { getColorValueFromCss } from "../../helpers/getColorValueFromCss.ts";
import './VolumeKnob.css';

export interface VolumeKnobProps {
    isPlaying: boolean;
    index: number;
}

export const VolumeKnob = (props: VolumeKnobProps) => {

    const { isPlaying, index } = props;

    const { setCurrentSounds, currentSounds } = useAppContext();

    const [value, setValue] = useState('75');
    const [storedValue, setStoredValue] = useState('75');

    const actualizarVolumen = (newValue: string) => {
        // Actualiza el volumen en el sonido actual
        const newSounds = [...currentSounds]
        newSounds[index] = { ...currentSounds[index], volume: parseInt(newValue) / 100 } as SoundFull
        setCurrentSounds(newSounds);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        setStoredValue(newValue);
        actualizarVolumen(newValue)
    }

    const handleVolumeIconClick = () => {
        if (value !== '0') {
            setValue('0');
            actualizarVolumen('0')
        } else {
            if (storedValue === '0') {
                setValue('75');
                actualizarVolumen('75')
            } else {
                setValue(storedValue)
                actualizarVolumen(storedValue)
            }
        }
    }

    return (
        <div className="relative w-6 rounded-md bg-neutral-900">
            <p className={`absolute left-1/2 top-0 -translate-x-1/2 ${isPlaying ? 'text-primary' : 'text-neutral-400'}`}>{index + 1}</p>
            <input
                aria-label="volume"
                style={{
                    background: isPlaying ? getColorValueFromCss() : '#3d3d3d77',
                    transition: 'background 0.3s ease'
                }}
                className={`absolute right-1/2 top-[55px] translate-x-1/2 translate-y-1/2 -rotate-90`}
                onChange={handleChange}
                type="range"
                min="0"
                max="100"
                value={value}
            />
            <img onClick={handleVolumeIconClick} src={value === '0' ? no_volume_icon : parseInt(value) <= 50 ? volume_icon : volume_highicon} alt="volume" className="absolute bottom-0 left-1/2 size-6 -translate-x-1/2" />
        </div>
    )
}

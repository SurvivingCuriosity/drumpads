import { useEffect, useState } from "react";
import './VolumeKnob.css'
import no_volume_icon from '../assets/icons/no_volume_2.svg'
import volume_icon from '../assets/icons/volume_2.svg'
import volume_highicon from '../assets/icons/volume_high_2.svg'
import { useAppContext } from "../context/AppContext";

export interface VolumeKnobProps {
    isPlaying: boolean;
    index: number;
}

export const VolumeKnob = (props: VolumeKnobProps) => {

    const { isPlaying, index } = props;

    const { setSounds, sounds } = useAppContext();

    const [value, setValue] = useState('75');
    const [storedValue, setStoredValue] = useState('75');

    useEffect(() => {
        setSounds(sounds.map((sound, index) =>
                index === props.index ? { ...sound, volume: parseInt(value) / 100 } : sound
            )
        );
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setStoredValue(e.target.value);
    }

    const handleVolumeIconClick = () => {
        if (value !== '0') {
            setValue('0');
        } else {
            setValue(storedValue === '0' ? '75' : storedValue);
        }
    }

    return (
        <div className="relative w-8 rounded-md bg-neutral-900">
            <p className={`absolute left-1/2 top-0 -translate-x-1/2 ${isPlaying ? 'text-fuchsia-500' : 'text-neutral-500'}`}>{index + 1}</p>
            <input
                style={{
                    background: isPlaying ? '#d946ef' : '#3d3d3d77',
                    transition: 'background 0.3s ease' // Transición suave en el cambio de color del track
                }}
                className='absolute right-1/2 top-[50px] translate-x-1/2 translate-y-1/2 -rotate-90'
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

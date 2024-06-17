import { useMemo, useState } from "react";
import drag_indicator_icon from "../assets/icons/drag_indicator.svg";
import play_icon from "../assets/icons/play.svg";
import { SoundFull } from "../db/interfaces/Sound";
import { useAppContext } from "../context/useAppContext";

export interface SonidoListItemProps {
    sonido: SoundFull;
    esMovil: boolean;
}

export const SonidoListItem = (props: SonidoListItemProps) => {

    const { sonido, esMovil } = props;
    const { play, padModificando,setPadModificando, setSideNavOpened, setCurrentSounds, currentSounds } = useAppContext();

    const [isHovered, setIsHovered] = useState(false);

    const mostrarIcono = useMemo(() => esMovil || isHovered, [esMovil, isHovered]);
    const mostrarDragIcon = useMemo(() => !esMovil && isHovered, [esMovil, isHovered]);

    const handleClickSonido = () => {
        if(padModificando !== null){
            // padModificando is the index of the sound being modified
            // Update currentSounds and set the new sound at that position
            const newSounds = [...currentSounds];
            newSounds[padModificando] = {
                ...newSounds[padModificando],
                label:sonido.label,
                category:sonido.category,
                audioSrc:sonido.audioSrc,
                volume:1,
                key:newSounds[padModificando]?.key,
                audioObj:newSounds[padModificando]?.audioObj,
                playing:false
            
            };
            console.log(sonido);
            
            setCurrentSounds(newSounds);

            // Reset padModificando and close the side navigation
            setPadModificando(null);
            setSideNavOpened(false);
        }
    };

    return (
        <li
            onClick={handleClickSonido}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex h-min items-center justify-between rounded-lg bg-neutral-800/50 p-2 text-neutral-500"
        >
            {mostrarDragIcon && (
                <button
                    className="absolute left-0.5 top-1/2 -translate-y-1/2 cursor-grab"
                >
                    <img src={drag_indicator_icon} alt="drag" className={`size-8 transition-opacity duration-200 ${mostrarIcono ? 'opacity-100' : 'opacity-0'}`} />
                </button>
            )}
            <p className={`${mostrarDragIcon ? 'translate-x-5' : 'translate-x-0'} transition-transform duration-200 text-sm`}>
                {sonido?.label}
            </p>
            <button onClick={() => play(sonido)}>
                <img src={play_icon} alt="play" className={`size-8 transition-opacity duration-200 ${mostrarIcono ? 'opacity-100' : 'opacity-0'}`} />
            </button>
        </li>
    );
}



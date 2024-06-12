import { useMemo, useState } from "react";
import drag_indicator_icon from "../assets/icons/drag_indicator.svg";
import play_icon from "../assets/icons/play.svg";
import { useAppContext } from "../context/AppContext";
import { SoundFull } from "../db/Sound";

export interface SonidoListItemProps {
    sonido: SoundFull;
    esMovil: boolean;
}

export const SonidoListItem = (props: SonidoListItemProps) => {

    const { sonido, esMovil } = props;
    const { play } = useAppContext();

    const [isHovered, setIsHovered] = useState(false);

    const mostrarIcono = useMemo(() => esMovil || isHovered, [esMovil, isHovered]);
    const mostrarDragIcon = useMemo(() => !esMovil && isHovered, [esMovil, isHovered]);

    return (
        <li
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex h-12 items-center justify-between rounded-lg bg-neutral-800/50 p-2 text-neutral-500"
        >
            {mostrarDragIcon && (
                <button
                    className="left-1 top-1/2 -translate-y-1/2 cursor-grab"
                >
                    <img src={drag_indicator_icon} alt="drag" className={`size-8 transition-opacity duration-200 ${mostrarIcono ? 'opacity-100' : 'opacity-0'}`} />
                </button>
            )}
            <p className={`${mostrarDragIcon ? 'translate-x-7' : 'translate-x-0'} transition-transform duration-200`}>
                {sonido?.label}
            </p>
            <button onClick={() => play(sonido)}>
                <img src={play_icon} alt="play" className={`size-8 transition-opacity duration-200 ${mostrarIcono ? 'opacity-100' : 'opacity-0'}`} />
            </button>
        </li>
    );
}



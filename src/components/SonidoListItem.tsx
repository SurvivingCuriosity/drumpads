import { useDraggable } from "@dnd-kit/core";
import { CSS } from '@dnd-kit/utilities';
import { useMemo, useState } from "react";
import drag_indicator_icon from "../assets/icons/drag_indicator.svg";
import play_icon from "../assets/icons/play.svg";
import { useAppStore } from "../store/useAppStore.ts";
import { SoundFull } from "../db/interfaces/Sound.ts";
import { useIsPantallaMovil } from "../helpers/useIsPantallaMovil.ts";

export interface SonidoListItemProps {
    sonido: SoundFull;
    esMovil: boolean;
}

export const SonidoListItem = (props: SonidoListItemProps) => {



    const { sonido, esMovil } = props;
    const isPantallaMovil = useIsPantallaMovil()

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: sonido.audioSrc,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 9999 : 'auto',
        width: isPantallaMovil ? '100%' : '180px'
    };

    // Se leen del store (no reactivos) solo cuando el usuario hace clic, en vez de
    // suscribirse aquí: evita que los 42 items de la lista se re-rendericen en cada
    // toque de pad.
    const play = useAppStore(s => s.play);

    const [isHovered, setIsHovered] = useState(false);

    const mostrarIcono = useMemo(() => esMovil || isHovered, [esMovil, isHovered]);
    const mostrarDragIcon = useMemo(() => !esMovil && isHovered, [esMovil, isHovered]);

    const handleClickSonido = () => {
        const { padModificando, assignSoundToPad, setPadModificando, setSideNavOpened } = useAppStore.getState();
        if (padModificando !== null) {
            assignSoundToPad(padModificando, sonido);

            // Reset padModificando and close the side navigation
            setPadModificando(null);
            setSideNavOpened(false);
        }
    };

    return (
        <li
            ref={setNodeRef} 
            style={{
                ...style,
                position: isDragging ? 'fixed' : 'relative',
                opacity: 1,
            }}
            onClick={handleClickSonido}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="opacity-1 flex h-min items-center justify-between rounded-lg bg-neutral-800/50 p-2 text-neutral-400"
        >
            {mostrarDragIcon && (
                <button
                    {...listeners} {...attributes}
                    className="absolute left-0.5 top-1/2 -translate-y-1/2 cursor-grab"
                >
                    <img src={drag_indicator_icon} alt="Drag icon indicator" className={`size-8 transition-opacity duration-200 ${mostrarIcono ? 'opacity-100' : 'opacity-0'}`} />
                </button>
            )}
            <p className={`${mostrarDragIcon ? 'translate-x-5' : 'translate-x-0'} transition-transform duration-200 text-sm`}>
                {sonido?.label}
            </p>
            <button onClick={() => play(sonido)}>
                <img src={play_icon} alt="Play icon" className={`size-8 transition-opacity duration-200 ${mostrarIcono ? 'opacity-100' : 'opacity-0'}`} />
            </button>
        </li>
    );
}



import { useMemo } from "react";
import { useAppContext } from "../context/AppContext";
import { Categories } from "../db/Categories";

import { SonidoListItem } from "./SonidoListItem";

export interface ListaTodosSonidosProps {
    esMovil: boolean;
}

export const ListaTodosSonidos = (props: ListaTodosSonidosProps) => {

    const { esMovil } = props

    const { sounds } = useAppContext();

    const kicks = useMemo(() => sounds.filter(sound => sound.category === Categories.KICKS), [sounds]);
    const claps = useMemo(() => sounds.filter(sound => sound.category === Categories.CLAPS), [sounds]);
    const snares = useMemo(() => sounds.filter(sound => sound.category === Categories.SNARES), [sounds]);
    const hihats = useMemo(() => sounds.filter(sound => sound.category === Categories.HIHATS), [sounds]);
    const percs = useMemo(() => sounds.filter(sound => sound.category === Categories.PERCS), [sounds]);
    const others = useMemo(() => sounds.filter(sound => sound.category === Categories.OTHERS), [sounds]);


    const allSounds = [...kicks, ...claps, ...snares, ...hihats, ...percs, ...others];

    return (
        <div className="">
            <ul className="mb-4 flex flex-col gap-2">
                {allSounds.map((sound, index) => {
                    return (
                        <div key={sound.key} className="w-full">
                            {
                                index === 0 || allSounds[index + 1]?.category !== sound?.category
                                    ? <p className="max-w-32 border-b border-fuchsia-400/70 text-fuchsia-400/70">{sound.category}</p>
                                    : null
                            }
                            <SonidoListItem key={sound.key} sonido={sound} esMovil={esMovil} />
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}
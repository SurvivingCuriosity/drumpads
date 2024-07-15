import { useMemo, useState } from "react";
import { Categories } from "../db/interfaces/Categories";
import { SonidoListItem } from "./SonidoListItem";
import { useAppContext } from "../context/useAppContext";
import { SoundFull } from "../db/interfaces/Sound";

export interface ListaTodosSonidosProps {
    esMovil: boolean;
}

export const ListaTodosSonidos = (props: ListaTodosSonidosProps) => {
    const { esMovil } = props;
    const { allSounds } = useAppContext();

    const kicks = useMemo(() => allSounds.filter(sound => sound.category === Categories.KICKS), [allSounds]);
    const snares = useMemo(() => allSounds.filter(sound => sound.category === Categories.SNARES), [allSounds]);
    const hihats = useMemo(() => allSounds.filter(sound => sound.category === Categories.HIHATS), [allSounds]);
    const openhats = useMemo(() => allSounds.filter(sound => sound.category === Categories.OPENHATS), [allSounds]);
    const claps = useMemo(() => allSounds.filter(sound => sound.category === Categories.CLAPS), [allSounds]);
    const percs = useMemo(() => allSounds.filter(sound => sound.category === Categories.PERCS), [allSounds]);
    const others = useMemo(() => allSounds.filter(sound => sound.category === Categories.OTHERS), [allSounds]);

    const [activeCategory, setActiveCategory] = useState<Categories | null>(null);

    const handleClickCategory = (newCategory: Categories) => {
        const category = activeCategory === newCategory ? null : newCategory;
        setActiveCategory(category);
    };

    const renderCategory = (category: Categories, sounds: SoundFull[], label: string) => {
        return (
            <div key={category}>
                <p
                    onClick={() => handleClickCategory(category)}
                    className="mb-2 cursor-pointer border-b border-amber-400/70 p-2 text-amber-400/70"
                >
                    {label}
                </p>
                <ul
                    style={{ gridTemplateRows: activeCategory === category ? '1fr' : '0fr' }}
                    className="grid flex-col gap-2 overflow-hidden transition-[grid-template-rows] duration-500"
                >
                    <div className="flex flex-col gap-1 overflow-hidden">
                        {sounds.map((sound) => (
                            <div key={sound.audioSrc} className="w-full">
                                <SonidoListItem sonido={sound} esMovil={esMovil} />
                            </div>
                        ))}
                    </div>
                </ul>
            </div>
        );
    };

    return (
        <div className="">
            <ul className="mb-4">
                {renderCategory(Categories.KICKS, kicks, 'Kicks')}
                {renderCategory(Categories.SNARES, snares, 'Snares')}
                {renderCategory(Categories.HIHATS, hihats, 'Hi hats')}
                {renderCategory(Categories.OPENHATS, openhats, 'Open hats')}
                {renderCategory(Categories.CLAPS, claps, 'Claps')}
                {renderCategory(Categories.PERCS, percs, 'Percs')}
                {renderCategory(Categories.OTHERS, others, 'Other')}
            </ul>
        </div>
    );
};

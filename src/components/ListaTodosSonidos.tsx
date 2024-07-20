import { useMemo, useState } from "react";
import { useAppContext } from "../context/useAppContext.ts";
import { Categories } from "../db/interfaces/Categories.ts";
import { SoundFull } from "../db/interfaces/Sound.ts";
import { SonidoListItem } from "./SonidoListItem.tsx";
import { IconProps } from "./icons/IconProps.ts";

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

    const renderCategory = (category: Categories, sounds: SoundFull[], label: string, IconComponent?: (props: IconProps) => JSX.Element) => {
        return (
            <li key={category}>

                <div className="flex w-full items-center border-b border-primary">

                    {IconComponent && <IconComponent size={32} />}
                    <p
                        onClick={() => handleClickCategory(category)}
                        className="mb-2 w-full cursor-pointer p-2 text-primary"
                    >
                        {label}
                    </p>
                </div>
                <ul
                    style={{ gridTemplateRows: activeCategory === category ? '1fr' : '0fr' }}
                    className="grid flex-col gap-2 overflow-hidden transition-[grid-template-rows] duration-500"
                >
                    <li className="flex flex-col gap-1 overflow-hidden">
                        {sounds.map((sound) => (
                            <ul key={sound.audioSrc} className="w-full">
                                <SonidoListItem sonido={sound} esMovil={esMovil} />
                            </ul>
                        ))}
                    </li>
                </ul>
            </li>
        );
    };

    return (
        <div className="">
            <ul className="mb-4">
                {renderCategory(Categories.KICKS, kicks, 'Kicks', kicks[0].icon)}
                {renderCategory(Categories.SNARES, snares, 'Snares', snares[0].icon)}
                {renderCategory(Categories.HIHATS, hihats, 'Hi hats', hihats[0].icon)}
                {renderCategory(Categories.OPENHATS, openhats, 'Open hats', openhats[0].icon)}
                {renderCategory(Categories.CLAPS, claps, 'Claps', claps[0].icon)}
                {renderCategory(Categories.PERCS, percs, 'Percs', percs[0].icon)}
                {renderCategory(Categories.OTHERS, others, 'Other', percs[0].icon)}
            </ul>
        </div>
    );
};

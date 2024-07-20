import { useState } from "react";
import { useAppContext } from "../../context/useAppContext.ts";
import { ScreenContent } from "../../db/interfaces/ScreenContent.ts";
import { useIsPantallaMovil } from "../../helpers/useIsPantallaMovil.ts";
import { Tab } from "./Tab.tsx";

export interface ScreenContentPickerProps {
    activeTabId?: string;
    onTabClick: (id: string) => void;
}

export const ScreenContentPicker = (props: ScreenContentPickerProps) => {

    const isPantallaMovil = useIsPantallaMovil()

    const { sequencerPlaying } = useAppContext()

    const { activeTabId, onTabClick } = props;

    const tabs = [{ id: ScreenContent.Drumpad.toString(), label: 'Drumpad' }, { id: ScreenContent.Sequencer.toString(), label: 'Sequencer' }];

    const [idSelected, setIdSelected] = useState(activeTabId || tabs[0].id);


    const handleSelectTab = (idNewTab: string) => {
        setIdSelected(idNewTab);
        onTabClick(idNewTab);
    };

    const activeIndex = tabs.findIndex(opcion => opcion.id === idSelected);
    const tabWidth = 100 / tabs.length;

    return (
        isPantallaMovil &&
            <nav className='block w-full lg:hidden'>
            <div className="mx-auto max-w-[450px] rounded-xl bg-neutral-900 p-1">
            <ul className="relative flex flex-row justify-between">
                <li
                    className="absolute h-full cursor-pointer rounded-lg bg-neutral-500/20 px-2 text-center transition-transform duration-300 ease-in-out"
                    style={{
                        width: `${tabWidth}%`,
                        transform: `translateX(${activeIndex * 100}%)`
                    }}
                ></li>

                <Tab
                    key={tabs[0].id}
                    id={tabs[0].id}
                    label={tabs[0].label}
                    onClick={handleSelectTab}
                    active={idSelected === tabs[0].id}
                />
                <Tab
                    key={tabs[1].id}
                    id={tabs[1].id}
                    label={tabs[1].label}
                    onClick={handleSelectTab}
                    active={idSelected === tabs[1].id}
                    showDot={sequencerPlaying}
                />
            </ul>
        </div>
            </nav>
          
        
    );
};

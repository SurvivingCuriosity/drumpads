import { useState } from "react";
import { Tab } from "./Tab";

export interface TabsProps {
    tabs: { id: string, label: string }[];
    activeTabId?: string;
    onTabClick: (id: string) => void;
}

export const Tabs = (props: TabsProps) => {
    const { tabs, activeTabId, onTabClick } = props;

    const [idSelected, setIdSelected] = useState(activeTabId || tabs[0].id);

    const handleSelectTab = (idNewTab: string) => {
        setIdSelected(idNewTab);
        onTabClick(idNewTab);
    };

    const activeIndex = tabs.findIndex(opcion => opcion.id === idSelected);
    const tabWidth = 100 / tabs.length;

    return (
        <ul className="rounded-xl bg-neutral-900 p-1">
            <div className="relative flex flex-row justify-between">
                <li
                    className="absolute h-full cursor-pointer rounded-lg bg-neutral-500/20 px-2 py-1 text-center transition-transform duration-300 ease-in-out"
                    style={{
                        width: `${tabWidth}%`,
                        transform: `translateX(${activeIndex * 100}%)`
                    }}
                ></li>

                {tabs.map((opcion) => (
                    <Tab
                        key={opcion.id}
                        id={opcion.id}
                        label={opcion.label}
                        onClick={handleSelectTab}
                        active={idSelected === opcion.id}
                    />
                ))}
            </div>
        </ul>
    );
};

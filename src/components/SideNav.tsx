import { ListaTodosSonidos } from "./ListaTodosSonidos";

export interface SideNavProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const SideNav = (props: SideNavProps) => {
    const { isOpen } = props;
    
    return (
        <div className={`absolute ${isOpen ? 'right-0': 'right-full'} top-12 z-50 h-[calc(100vh_-_3em)] w-full bg-neutral-900 transition-all duration-200`}>
            <div className="p-8">
                <ListaTodosSonidos esMovil/>
            </div>
        </div>
    )
}
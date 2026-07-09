import { useAppStore } from "../store/useAppStore.ts";
import { ListaTodosSonidos } from "./ListaTodosSonidos.tsx";


export const SideNav = () => {

    const sideNavOpened = useAppStore(s => s.sideNavOpened);

    return (
        <div className={`absolute ${sideNavOpened ? 'right-0': 'right-full'} top-12 z-50 h-full w-full bg-neutral-900 transition-all duration-200 overflow-y-scroll`}>
            <div className="p-8">
                <ListaTodosSonidos esMovil />
            </div>
        </div>
    )
}
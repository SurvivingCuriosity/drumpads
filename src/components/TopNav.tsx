import { useAppContext } from '../context/useAppContext.ts';
import { MusicListIcon } from './icons/MusicListIcon.tsx';
import { SideNav } from './SideNav.tsx';

export const TopNav = () => {

    const {sideNavOpened, setSideNavOpened} = useAppContext()

    return (
        <>
            <div className="block w-full border-b border-primary bg-neutral-900 lg:hidden">
                <SideNav />
                <nav className="mx-auto flex max-w-screen-xl items-center justify-between p-1">
                    <button aria-label="Open sounds list" onClick={() => { setSideNavOpened(!sideNavOpened) }} className='block min-w-8 lg:hidden'>
                        <MusicListIcon size={40}/>
                    </button>
                    <span className='min-w-8'></span>
                </nav>
            </div>
        </>
    )
}
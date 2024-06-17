import music_list_icon from '../assets/icons/music_list.svg';
import { useAppContext } from '../context/useAppContext';
import { AppTitle } from './AppTitle';
import { SideNav } from './SideNav';

export const TopNav = () => {

    const {sideNavOpened, setSideNavOpened} = useAppContext()

    return (
        <>
            <div className="w-full border-b border-fuchsia-600 bg-neutral-900">
                <SideNav />
                <nav className="mx-auto flex max-w-screen-xl items-center justify-between p-1">
                    <button onClick={() => { setSideNavOpened(!sideNavOpened) }} className='block min-w-8 lg:hidden'>
                        <img src={music_list_icon} className='size-8' />
                    </button>
                    <AppTitle />
                    <span className='min-w-8'></span>
                    {/* <button onClick={() => { }} className=''>
                        <img src={ajustes_icon} className='size-8' />
                    </button> */}
                </nav>
            </div>
        </>
    )
}
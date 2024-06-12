import music_list_icon from '../assets/icons/music_list.svg'
import ajustes_icon from '../assets/icons/ajustes.svg'
import { AppTitle } from './AppTitle'
import { useState } from 'react';
import { SideNav } from './SideNav';

export const TopNav = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="absolute top-0 w-full border-b border-fuchsia-600 bg-neutral-900">
                <SideNav isOpen={isOpen} setIsOpen={setIsOpen} />
                <nav className="mx-auto flex max-w-screen-xl items-center justify-between p-1">
                    <button onClick={() => { setIsOpen(!isOpen) }} className='block lg:hidden'>
                        <img src={music_list_icon} className='size-8' />
                    </button>
                    <AppTitle />
                    <button onClick={() => { }} className=''>
                        <img src={ajustes_icon} className='size-8' />
                    </button>
                </nav>
            </div>
        </>
    )
}
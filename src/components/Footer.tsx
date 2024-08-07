import logo from '/logo.svg';
import { ThemePicker } from './ThemePicker.tsx';

export const Footer = () => {
    return (

        <footer className="bg-neutral-900 shadow">
            <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse">
                        <img src={logo} alt="KrumDit Logo" style={{width: 32, height: 32}} />
                        <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">KrumDit</span>
                        <p className='text-neutral-400'>by <a target="_blank" href='https://github.com/SurvivingCuriosity' className='hover:underline'>SurvivingCuriosity</a></p>
                        
                    </div>
                    
                    <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-neutral-400 sm:mb-0">
                        <li>
                            <a href="https://github.com/SurvivingCuriosity/drumpads" target='_blank' className="me-4 hover:underline md:me-6">Give it a star on Github!</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-neutral-500 sm:mx-auto lg:my-8" />
                <p className='text-neutral-400'>Find BPM and key of any song with <a target="_blank" href='https://lemonade-pi.vercel.app' className='text-yellow-400 hover:underline'>Lemonade</a></p>
                <span className="block text-sm text-neutral-400 sm:text-center">© 2024 KrumDit</span>
                <ThemePicker />
            </div>
        </footer>


    );
};
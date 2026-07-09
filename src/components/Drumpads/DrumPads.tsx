// DrumPads.jsx
import { Pad } from './Pad';

import { useMemo, useState } from 'react';
import keyboard_icon from '../../assets/icons/keyboard.svg';
import keyboard_off_icon from '../../assets/icons/keyboard_off.svg';
import knobs from '../../assets/icons/knobs.svg';
import settings from '../../assets/icons/settings.svg';
import { useAppStore } from '../../store/useAppStore.ts';
import { ScreenContent } from '../../db/interfaces/ScreenContent.ts';
import { useIsPantallaMovil } from '../../helpers/useIsPantallaMovil.ts';
import { Controls } from './Controls.tsx';
import { PresetPicker } from './PresetPicker.tsx';

// Los pads siempre son 9 (grid 3x3); iterar por índice evita suscribirse a
// currentSounds aquí, así un toque de pad no re-renderiza toda la rejilla.
const padIndexes = Array.from({ length: 9 }, (_, i) => i);

const DrumPads = () => {

    const isTouch = useAppStore(s => s.isTouch);
    const setShowingShortcuts = useAppStore(s => s.setShowingShortcuts);
    const showingShortcuts = useAppStore(s => s.showingShortcuts);
    const screenContent = useAppStore(s => s.screenContent);
    const showingPadsSettings = useAppStore(s => s.showingPadsSettings);
    const setShowingPadsSettings = useAppStore(s => s.setShowingPadsSettings);

    const [showControls, setShowControls] = useState(false);

    const isPantallaMovil = useIsPantallaMovil()

    const mostrarDrumPads = useMemo(() => screenContent === ScreenContent.Drumpad, [screenContent])


    return (
        <div className={`${!isPantallaMovil || mostrarDrumPads ? 'block' : 'hidden'} flex flex-col justify-between w-full gap-4 max-w-[450px] rounded-lg bg-neutral-900 p-4`}>
            <div className='flex items-center justify-between gap-2'>
                <PresetPicker />
                <button onClick={() => setShowingShortcuts(!showingShortcuts)} className='rounded-md border border-neutral-500 bg-neutral-900'>
                    <img src={showingShortcuts ? keyboard_off_icon : keyboard_icon} className='size-8' alt="Keyboard icon" />
                </button>
                <button onClick={() => setShowControls(!showControls)} className='block rounded-md border border-neutral-500 bg-neutral-900 2xl:hidden'>
                    <img src={knobs} className='size-8' alt="Knobs icon" />
                </button>
                <button onClick={() => setShowingPadsSettings(!showingPadsSettings)} className='rounded-md border border-neutral-500 bg-neutral-900'>
                    <img src={settings} className='size-8' alt="Settings icon" />
                </button>
            </div>
            {showControls && <Controls />}
            <section id="drumkit" className='grid grid-cols-3 grid-rows-3 items-center justify-items-center gap-2 text-neutral-700'>
                {padIndexes.map((index) => (
                    <Pad
                        key={index}
                        index={index}
                        isTouch={isTouch}
                    />
                ))}
            </section>
        </div>
    );
};

export default DrumPads;

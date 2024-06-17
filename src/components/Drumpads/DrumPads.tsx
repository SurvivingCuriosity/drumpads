// DrumPads.jsx
import { Pad } from './Pad';

import { useMemo, useState } from 'react';
import keyboard_icon from '../../assets/icons/keyboard.svg';
import keyboard_off_icon from '../../assets/icons/keyboard_off.svg';
import knobs from '../../assets/icons/knobs.svg';
import settings from '../../assets/icons/settings.svg';
import { Controls } from './Controls';
import { PresetPicker } from './PresetPicker';
import { useAppContext } from '../../context/useAppContext';
import { ScreenContent } from '../../db/interfaces/ScreenContent';
import { useIsPantallaMovil } from '../../helpers/useIsPantallaMovil';

const DrumPads = () => {

    const { currentSounds, isTouch, setShowingShortcuts, showingShortcuts, screenContent, showingPadsSettings, setShowingPadsSettings } = useAppContext();
    
    const [showControls, setShowControls] = useState(false);

    const isPantallaMovil = useIsPantallaMovil()

    const mostrarDrumPads = useMemo(() => screenContent === ScreenContent.Drumpad || screenContent === ScreenContent.Both, [screenContent])

    
    return (
        <div className={`${!isPantallaMovil || mostrarDrumPads ? 'block' : 'hidden'} w-full max-w-screen-sm rounded-lg bg-neutral-900 p-4`}>
            <div className='mb-2 flex items-center justify-between gap-2'>
                <PresetPicker />
                <button onClick={() => setShowingShortcuts(!showingShortcuts)} className='rounded-md border border-neutral-800 bg-neutral-900'>
                    <img src={showingShortcuts ? keyboard_off_icon : keyboard_icon} className='size-8' />
                </button>
                <button onClick={() => setShowControls(!showControls)} className='rounded-md border border-neutral-800 bg-neutral-900'>
                    <img src={knobs} className='size-8' />
                </button>
                <button onClick={() => setShowingPadsSettings(!showingPadsSettings)} className='rounded-md border border-neutral-800 bg-neutral-900'>
                    <img src={settings} className='size-8' />
                </button>
            </div>
            {showControls && <Controls />}
            <section id="drumkit" className='grid grid-cols-3 grid-rows-3 items-center justify-items-center gap-2 text-neutral-700'>
                {currentSounds.map((sound, index) => (
                    <Pad
                        key={(sound?.audioSrc ?? 'undefined') + ('pad'+index)}
                        sound={sound}
                        index={index}
                        isTouch={isTouch}
                    />
                ))}
            </section>
        </div>
    );
};

export default DrumPads;

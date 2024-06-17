
// create context
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { claps } from '../db/Claps';
import { closehats } from '../db/CloseHats';
import { Sound, SoundFull } from '../db/interfaces/Sound';
import { kicks } from '../db/Kicks';
import { Presets } from '../db/presets/Presets';
import { reggaeton_preset } from '../db/presets/ReggaetonPreset';
import { techno_preset } from '../db/presets/TechnoPreset';
import { snares } from '../db/Snares';
import AudioManager from '../services/AudioManager';
import { empty_preset } from '../db/presets/EmptyPreset';
import { percs } from '../db/Percs';
import { openhats } from '../db/OpenHats';
import { ScreenContent } from '../db/interfaces/ScreenContent';

type ComplexEvent = React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>

export interface AppContext {
    allSounds: SoundFull[];
    currentSounds: Array<SoundFull | undefined>;
    setCurrentSounds: (sounds: Array<SoundFull | undefined>) => void;
    setAllSounds: (sounds: SoundFull[]) => void;
    playSound: (e: ComplexEvent) => void; // Ajustar el tipo del evento
    isTouch: boolean;
    showingShortcuts: boolean;
    setShowingShortcuts: (value: boolean) => void;
    play: (sound: SoundFull | undefined) => void;
    setIsTouch: (value: boolean) => void;
    bpm: number;
    setBpm: (value: number) => void;
    screenContent: ScreenContent;
    setScreenContent: (value: ScreenContent) => void;
    handlePresetChange: (newPreset: Presets) => void;
    preset: Presets;
    sideNavOpened: boolean;
    setSideNavOpened: (value: boolean) => void;
    padModificando: number | null;
    setPadModificando: (value: number | null) => void;
    showingPadsSettings: boolean;
    setShowingPadsSettings: (value: boolean) => void;
}

export const AppContext = createContext<AppContext>({} as AppContext);

// create provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const keyMap = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c']
    const presetMap: { [key in Presets]: Array<Sound | undefined> } = {
        [Presets.Reggaeton]: reggaeton_preset,
        [Presets.Techno]: techno_preset,
        [Presets.Trap]: empty_preset, // Preset vacío, puedes agregar sonidos aquí
        [Presets.HipHop]: empty_preset, // Preset vacío, puedes agregar sonidos aquí
        [Presets.Empty]: empty_preset, // Preset vacío
    };
    const [allSounds, setAllSounds] = useState<SoundFull[]>([...kicks, ...snares, ...closehats, ...claps, ...percs, ...openhats]
        .map((sound, index) => ({
            ...sound,
            playing: false,
            volume: 1,
            audioObj: null,
            key: keyMap[index] || 'p'
        })));

    const audioManager = useMemo(() => new AudioManager(allSounds), []);

    const [preset, setPreset] = useState<Presets>(Presets.Techno);

    const [currentSounds, setCurrentSounds] = useState<Array<SoundFull | undefined>>(presetMap[preset].map((sound, index) => {
        if (sound === undefined) return undefined;
        return {
            audioSrc: sound?.audioSrc || '',
            label: sound?.label || '',
            category: sound?.category || undefined,
            playing: false,
            volume: 1,
            audioObj: null,
            key: keyMap[index] || 'p'
        }
    }));

    const [showingShortcuts, setShowingShortcuts] = useState<boolean>(false);
    const [isTouch, setIsTouch] = useState<boolean>(false);
    const [bpm, setBpm] = useState<number>(90);
    const [screenContent, setScreenContent] = useState<ScreenContent>(ScreenContent.Drumpad);
    const [sideNavOpened, setSideNavOpened] = useState<boolean>(false);
    const [padModificando, setPadModificando] = useState<number | null>(null);
    const [showingPadsSettings, setShowingPadsSettings] = useState<boolean>(false);


    const handlePresetChange = (newPreset: Presets) => {
        setPreset(newPreset);
        console.log(presetMap[newPreset].map((sound, index) => ({
            audioSrc: sound?.audioSrc || '',
            label: sound?.label || '',
            category: sound?.category || undefined,
            playing: false,
            volume: 1,
            audioObj: null,
            key: keyMap[index] || 'p'
        })));

        setCurrentSounds(presetMap[newPreset].map((sound, index) => ({
            audioSrc: sound?.audioSrc || '',
            label: sound?.label || '',
            category: sound?.category || undefined,
            playing: false,
            volume: 1,
            audioObj: null,
            key: keyMap[index] || 'p'
        })));
    };

    const playSound = useCallback((e: ComplexEvent) => {
        console.log(currentSounds);

        if (!audioManager) return; // Agrega verificación de audioManager

        let eventIndex: number = -1;
        if ('key' in e) {
            eventIndex = keyMap.indexOf(e.key);
        } else if ('currentTarget' in e && 'dataset' in e.currentTarget) {
            eventIndex = parseInt((e.currentTarget as HTMLDivElement).dataset.key || "", 10) - 1;
        } else {
            return;
        }
        const audioSrc = currentSounds[eventIndex]?.audioSrc;
        if (!audioSrc) return;

        audioManager.playSound(audioSrc, currentSounds[eventIndex]?.volume);


        // Animate boom animation
        setCurrentSounds(prevSounds =>
            prevSounds.map((sound, index) =>
                sound === undefined
                    ? undefined
                    :
                    index === eventIndex ? { ...sound, playing: true } : sound
            )
        );

        // Remove boom animation
        setTimeout(() => {
            setCurrentSounds(prevSounds =>
                prevSounds.map((sound, index) =>
                    sound === undefined
                        ? undefined
                        :
                        index === eventIndex ? { ...sound, playing: false } : sound
                )
            );
        }, 100);
    }, [currentSounds, audioManager]);

    useEffect(() => {
        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent) => playSound(e as React.KeyboardEvent<HTMLDivElement>);
        window.addEventListener('keydown', handleKeyDown);

        const handleTouchStart = () => setIsTouch(true);
        window.addEventListener('touchstart', handleTouchStart, { once: true });

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [playSound]);


    const play = useCallback((sound: SoundFull | undefined) => {
        if (!audioManager) return; // Agrega verificación de audioManager
        if (sound === undefined) return;

        const audioSrc = sound?.audioSrc;
        if (!audioSrc) return;

        audioManager.playSound(audioSrc, sound?.volume);

        // Animate boom animation
        setCurrentSounds(prevSounds =>
            prevSounds.map((s) =>
                s === undefined
                    ? undefined
                    :
                    sound.key === s.key ? { ...s, playing: true } : s
            )
        );

        // Remove boom animation
        setTimeout(() => {
            setCurrentSounds(prevSounds =>
                prevSounds.map((s) =>
                    s === undefined
                        ? undefined
                        :
                        sound.key === s.key ? { ...s, playing: false } : s
                )
            );
        }, 100);

    }, [currentSounds, audioManager]);

    return (
        <AppContext.Provider value={{ playSound, isTouch, setIsTouch, showingShortcuts, setShowingShortcuts, play, bpm, setBpm, screenContent, setScreenContent, setAllSounds, currentSounds, setCurrentSounds, allSounds, handlePresetChange, preset, sideNavOpened, setSideNavOpened, padModificando, setPadModificando, showingPadsSettings, setShowingPadsSettings }}>
            {children}
        </AppContext.Provider>
    );
};


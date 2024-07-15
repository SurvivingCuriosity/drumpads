import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Sound, SoundFull } from '../db/interfaces/Sound';
import AudioManager from '../services/AudioManager';
import { ScreenContent } from '../db/interfaces/ScreenContent';
import { empty_preset, Presets, reggaeton_preset, techno_preset } from '../db/presets';
import { claps, closehats, kicks, openhats, percs, snares } from '../db/sounds';
import { PlayEvent } from '../db/interfaces/PlayEvent';

export interface AppContext {
    allSounds: SoundFull[];
    setAllSounds: (sounds: SoundFull[]) => void;
    currentSounds: Array<SoundFull | undefined>;
    setCurrentSounds: (sounds: Array<SoundFull | undefined>) => void;
    playSound: (e: PlayEvent) => void;
    isTouch: boolean;
    showingShortcuts: boolean;
    setShowingShortcuts: (value: boolean) => void;
    play: (sound: SoundFull | undefined) => void;
    setIsTouch: (value: boolean) => void;
    bpm: number;
    setBpm: (value: number) => void;
    screenContent: ScreenContent;
    setScreenContent: (value: ScreenContent) => void;
    preset: Presets;
    handlePresetChange: (newPreset: Presets) => void;
    sideNavOpened: boolean;
    setSideNavOpened: (value: boolean) => void;
    padModificando: number | null;
    setPadModificando: (value: number | null) => void;
    showingPadsSettings: boolean;
    setShowingPadsSettings: (value: boolean) => void;
    isDragging: boolean;
    setIsDragging: (value: boolean) => void;
}

export const AppContext = createContext<AppContext>({} as AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {


    // Teclas que accionan los diferentes pads
    const keyMap = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c']

    // Todos los sonidos que tiene la aplicación
    const [allSounds, setAllSounds] = useState<SoundFull[]>([...kicks, ...snares, ...closehats, ...claps, ...percs, ...openhats].map((sound, index) => ({
        ...sound,
        playing: false,
        volume: 1,
        audioObj: null,
        key: keyMap[index] || ''
    }))
    );

    const [preset, setPreset] = useState<Presets>(Presets.Techno);
    const presetMap: { [key in Presets]: Array<Sound | undefined> } = {
        [Presets.Reggaeton]: reggaeton_preset,
        [Presets.Techno]: techno_preset,
        [Presets.Trap]: empty_preset,
        [Presets.HipHop]: empty_preset,
        [Presets.Empty]: empty_preset,
    };

    // Clase encargada de manejar el audio
    const audioManager = useMemo(() => new AudioManager(allSounds), []);


    // Sonidos seleccionados (máximo 9)
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
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handlePresetChange = (newPreset: Presets) => {
        setPreset(newPreset);

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

    const playSound = useCallback((e: PlayEvent) => {
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

    return (
        <AppContext.Provider value={{ playSound, isTouch, setIsTouch, showingShortcuts, setShowingShortcuts, play, bpm, setBpm, screenContent, setScreenContent, setAllSounds, currentSounds, setCurrentSounds, allSounds, handlePresetChange, preset, sideNavOpened, setSideNavOpened, padModificando, setPadModificando, showingPadsSettings, setShowingPadsSettings, isDragging, setIsDragging }}>
            {children}
        </AppContext.Provider>
    );
};


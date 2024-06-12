
// create context
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { sounds as initialSounds } from '../db/AllSounds'; // Importa directamente el archivo sin extensión
import { SoundFull } from '../db/Sound';
import AudioManager from '../services/AudioManager';

type ComplexEvent = React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>

export interface AppContext {
    sounds: SoundFull[];
    setSounds: (sounds: SoundFull[]) => void;
    playSound: (e: ComplexEvent) => void; // Ajustar el tipo del evento
    isTouch: boolean;
    showingShortcuts: boolean;
    setShowingShortcuts: (value: boolean) => void;
    play: (sound: SoundFull) => void;
}

export const AppContext = createContext<AppContext>({} as AppContext);

// create provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {


    const [sounds, setSounds] = useState<SoundFull[]>(initialSounds.map(sound => ({
        ...sound,
        playing: false,
        volume: 1,
        audioObj: null
        })));
    const audioManager = useMemo(() => new AudioManager(sounds), [sounds]);
    const [showingShortcuts, setShowingShortcuts] = useState<boolean>(false);
    const [isTouch, setIsTouch] = useState<boolean>(false); // Especifica el tipo de la bandera

    useEffect(() => {
        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent) => playSound(e as React.KeyboardEvent<HTMLDivElement>);
        window.addEventListener('keydown', handleKeyDown);

        const handleTouchStart = () => setIsTouch(true);
        window.addEventListener('touchstart', handleTouchStart, { once: true });

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const playSound = useCallback((e: ComplexEvent) => {
        if (!audioManager) return; // Agrega verificación de audioManager

        let eventIndex: number = -1;
        if ('key' in e) {
            switch (e.key) {
                case 'q':
                    eventIndex = 0; // Índice del primer sonido
                    break;
                case 'w':
                    eventIndex = 1; // Índice del segundo sonido
                    break;
                case 'e':
                    eventIndex = 2; // Índice del tercer sonido
                    break;
                case 'a':
                    eventIndex = 3; // Índice del cuarto sonido
                    break;
                case 's':
                    eventIndex = 4; // Índice del quinto sonido
                    break;
                case 'd':
                    eventIndex = 5; // Índice del sexto sonido
                    break;
                case 'z':
                    eventIndex = 6; // Índice del séptimo sonido
                    break;
                case 'x':
                    eventIndex = 7; // Índice del séptimo sonido
                    break;
                case 'c':
                    eventIndex = 8; // Índice del séptimo sonido
                    break;
            }
        } else if ('currentTarget' in e && 'dataset' in e.currentTarget) {
            eventIndex = parseInt((e.currentTarget as HTMLDivElement).dataset.key || "", 10) - 1;
        } else {
            return;
        }
        const audioSrc = sounds[eventIndex]?.audioSrc;
        if (!audioSrc) return;

        audioManager.playSound(audioSrc, sounds[eventIndex]?.volume);

        // Animate boom animation
        setSounds(prevSounds =>
            prevSounds.map((sound, index) =>
                index === eventIndex ? { ...sound, playing: true } : sound
            )
        );

        // Remove boom animation
        setTimeout(() => {
            setSounds(prevSounds =>
                prevSounds.map((sound, index) =>
                    index === eventIndex ? { ...sound, playing: false } : sound
                )
            );
        }, 100);
    }, [sounds, audioManager]);
    
    const play = useCallback((sound: SoundFull) => {
        if (!audioManager) return; // Agrega verificación de audioManager

        const audioSrc = sound?.audioSrc;
        if (!audioSrc) return;

        audioManager.playSound(audioSrc, sound?.volume);
    }, [sounds, audioManager]);

    return (
        <AppContext.Provider value={{ sounds, playSound, isTouch, showingShortcuts, setShowingShortcuts, setSounds, play }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
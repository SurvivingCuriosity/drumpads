// create context
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { sounds as initialSounds } from '../db/Sound'; // Importa directamente el archivo sin extensión
import { Sound } from '../interfaces/Sound';
import AudioManager from '../services/AudioManager';

export interface AppContext {
    sounds: Sound[];
    playSound: (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => void; // Ajustar el tipo del evento
    isTouch: boolean;
}

export const AppContext = createContext<AppContext>({
    sounds: [],
    playSound: () => {},
    isTouch: false,
});

// create provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {

    const [sounds, setSounds] = useState<Sound[]>(initialSounds);
    const audioManager = useMemo(() => new AudioManager(initialSounds), [initialSounds]);
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

    const playSound = useCallback((e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
        if (!audioManager) return; // Agrega verificación de audioManager
        
        let eventIndex: number = 0;
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
            }
        } else if ('currentTarget' in e && 'dataset' in e.currentTarget) {
            eventIndex = parseInt((e.currentTarget as HTMLDivElement).dataset.key || "", 10) - 1;
        } else {
            return;
        }
        
        const audioSrc = sounds[eventIndex]?.audioSrc;
        if (!audioSrc) return;

        audioManager.playSound(audioSrc);

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

    return (
        <AppContext.Provider value={{ sounds, playSound, isTouch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
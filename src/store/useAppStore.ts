import { create } from 'zustand';
import { PlayEvent } from '../db/interfaces/PlayEvent.ts';
import { ScreenContent } from '../db/interfaces/ScreenContent.ts';
import { Sound, SoundFull } from '../db/interfaces/Sound.ts';
import { empty_preset, Presets, reggaeton_preset, techno_preset } from '../db/presets';
import { claps, closehats, kicks, openhats, percs, snares } from '../db/sounds';
import AudioManager from '../services/AudioManager.ts';

// Teclas que accionan los diferentes pads
const keyMap = ['q', 'w', 'e', 'a', 's', 'd', 'z', 'x', 'c'];

const presetMap: { [key in Presets]: Array<Sound | undefined> } = {
    [Presets.Reggaeton]: reggaeton_preset,
    [Presets.Techno]: techno_preset,
    [Presets.Trap]: empty_preset,
    [Presets.HipHop]: empty_preset,
    [Presets.Empty]: empty_preset,
};

const buildCurrentSounds = (preset: Presets): Array<SoundFull | undefined> =>
    presetMap[preset].map((sound, index) => {
        if (sound === undefined) return undefined;
        return {
            audioSrc: sound?.audioSrc || '',
            label: sound?.label || '',
            category: sound?.category || undefined,
            playing: false,
            volume: 1,
            audioObj: null,
            key: keyMap[index] || 'p',
            icon: sound?.icon || undefined,
        };
    });

const audioManager = new AudioManager();

export interface AppState {
    audioManager: AudioManager;
    allSounds: SoundFull[];
    currentSounds: Array<SoundFull | undefined>;
    preset: Presets;
    isTouch: boolean;
    showingShortcuts: boolean;
    bpm: number;
    screenContent: ScreenContent;
    sideNavOpened: boolean;
    padModificando: number | null;
    showingPadsSettings: boolean;
    isDragging: boolean;
    sequencerPlaying: boolean;

    setIsTouch: (value: boolean) => void;
    setShowingShortcuts: (value: boolean) => void;
    setBpm: (value: number) => void;
    setScreenContent: (value: ScreenContent) => void;
    setSideNavOpened: (value: boolean) => void;
    setPadModificando: (value: number | null) => void;
    setShowingPadsSettings: (value: boolean) => void;
    setIsDragging: (value: boolean) => void;
    setSequencerPlaying: (value: boolean) => void;

    handlePresetChange: (newPreset: Presets) => void;
    handleCambiarSonido: (idNuevoSonido: string, idPadDestino: number) => void;
    assignSoundToPad: (padIndex: number, sonido: SoundFull) => void;
    setVolume: (index: number, volume: number) => void;
    playSound: (e: PlayEvent) => void;
    play: (sound: SoundFull | undefined) => void;
    initAudio: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
    audioManager,
    allSounds: [...kicks, ...snares, ...closehats, ...claps, ...percs, ...openhats].map((sound, index) => ({
        ...sound,
        playing: false,
        volume: 1,
        audioObj: null,
        key: keyMap[index] || '',
    })),
    currentSounds: buildCurrentSounds(Presets.Techno),
    preset: Presets.Techno,
    isTouch: false,
    showingShortcuts: false,
    bpm: 90,
    screenContent: ScreenContent.Drumpad,
    sideNavOpened: false,
    padModificando: null,
    showingPadsSettings: false,
    isDragging: false,
    sequencerPlaying: false,

    setIsTouch: (value) => set({ isTouch: value }),
    setShowingShortcuts: (value) => set({ showingShortcuts: value }),
    setBpm: (value) => set({ bpm: value }),
    setScreenContent: (value) => set({ screenContent: value }),
    setSideNavOpened: (value) => set({ sideNavOpened: value }),
    setPadModificando: (value) => set({ padModificando: value }),
    setShowingPadsSettings: (value) => set({ showingPadsSettings: value }),
    setIsDragging: (value) => set({ isDragging: value }),
    setSequencerPlaying: (value) => set({ sequencerPlaying: value }),

    handlePresetChange: (newPreset) => {
        set({ preset: newPreset, currentSounds: buildCurrentSounds(newPreset) });
    },

    handleCambiarSonido: (idNuevoSonido, idPadDestino) => {
        const { allSounds, currentSounds } = get();
        const sonidoNuevo = allSounds.find(sonido => sonido.audioSrc === idNuevoSonido);
        const sonidoPadDestino = currentSounds[idPadDestino];

        if (sonidoNuevo === undefined || sonidoPadDestino === undefined) return;

        set({
            currentSounds: currentSounds.map((sonido, index) =>
                sonido === undefined
                    ? undefined
                    : index === idPadDestino
                        ? { ...sonido, audioSrc: sonidoNuevo.audioSrc, label: sonidoNuevo.label, category: sonidoNuevo.category, icon: sonidoNuevo.icon }
                        : sonido
            ),
        });
    },

    assignSoundToPad: (padIndex, sonido) => {
        const { currentSounds } = get();
        if (currentSounds[padIndex] === undefined) return;

        set({
            currentSounds: currentSounds.map((s, index) =>
                index === padIndex
                    ? {
                        ...s,
                        label: sonido.label,
                        category: sonido.category,
                        audioSrc: sonido.audioSrc,
                        volume: 1,
                        key: s?.key,
                        audioObj: s?.audioObj,
                        playing: false,
                    } as SoundFull
                    : s
            ),
        });
    },

    setVolume: (index, volume) => {
        set(state => ({
            currentSounds: state.currentSounds.map((s, i) => (i === index ? { ...s, volume } as SoundFull : s)),
        }));
    },

    playSound: (e) => {
        const { currentSounds, play } = get();

        let eventIndex = -1;
        if ('key' in e) {
            if (e.repeat) return; // Ignora la autorepetición del teclado al mantener pulsado
            eventIndex = keyMap.indexOf(e.key);
        } else if ('currentTarget' in e && 'dataset' in e.currentTarget) {
            eventIndex = parseInt((e.currentTarget as HTMLDivElement).dataset.key || '', 10) - 1;
        } else {
            return;
        }

        play(currentSounds[eventIndex]);
    },

    play: (sound) => {
        if (sound === undefined) return;

        const { currentSounds, audioManager } = get();
        const audioSrc = sound.audioSrc;
        if (!audioSrc) return;

        const index = currentSounds.findIndex(s => s?.key === sound.key);
        if (index === -1) return;

        audioManager.resume();
        audioManager.playSound(audioSrc, sound.volume);

        set(state => ({
            currentSounds: state.currentSounds.map((s, i) => (i === index ? { ...s, playing: true } as SoundFull : s)),
        }));

        setTimeout(() => {
            set(state => ({
                currentSounds: state.currentSounds.map((s, i) => (i === index ? { ...s, playing: false } as SoundFull : s)),
            }));
        }, 100);
    },

    initAudio: () => {
        const { allSounds, currentSounds, audioManager } = get();
        // Carga primero los sonidos del preset activo (los que se pueden tocar ya) y
        // el resto de la librería después, en segundo plano
        const prioritySrcs = new Set(currentSounds.filter((s): s is SoundFull => !!s?.audioSrc).map(s => s.audioSrc));
        const prioritySounds = allSounds.filter(s => prioritySrcs.has(s.audioSrc));
        const restSounds = allSounds.filter(s => !prioritySrcs.has(s.audioSrc));

        audioManager.loadSounds(prioritySounds).then(() => {
            audioManager.loadSounds(restSounds);
        });
    },
}));

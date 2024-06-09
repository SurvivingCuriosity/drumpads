// DrumPads.jsx
import { useAppContext } from '../context/AppContext';
import { Pad } from './Pad';


const DrumPads = () => {

    const { sounds, playSound, isTouch } = useAppContext();

    return (
        <section id="drumkit" className='grid w-full grid-cols-3 grid-rows-3 items-center justify-items-center gap-1 border-2 border-neutral-700 bg-neutral-900 p-1 text-neutral-700'>
            {sounds.map((sound, index) => (
                <Pad
                    key={sound.audioSrc}
                    playing={sound.playing}
                    index={index}
                    playSound={playSound}
                    isTouch={isTouch}
                />
            ))}
        </section>
    );
};

export default DrumPads;

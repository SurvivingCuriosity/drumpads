// DrumPads.jsx
import { useAppContext } from '../context/AppContext';
import { Pad } from './Pad';
import Select from 'react-select'
import keyboard_icon from '../assets/icons/keyboard.svg'
import keyboard_off_icon from '../assets/icons/keyboard_off.svg'

const DrumPads = () => {

    const { sounds, isTouch, setShowingShortcuts, showingShortcuts } = useAppContext();
    const options = [
        { value: 'chocolate', label: 'Reggaeton' },
        { value: 'strawberry', label: 'Trap' },
        { value: 'vanilla', label: 'Techno' }
    ]
    return (
        <div className='w-full rounded-lg bg-neutral-900 p-4'>
            <div className='mb-2 flex items-center justify-between gap-2'>
                <Select
                    styles={{
                        indicatorsContainer: () => ({
                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px',
                        }),
                        dropdownIndicator: (base) => ({
                            ...base,
                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px',
                            backgroundColor: '#555',
                            color: '#262626',
                        }),
                        container: (base) => ({
                            ...base,
                            borderRadius: '8px',
                            flexGrow: 1,
                        }),
                        control: (base) => ({
                            ...base,
                            backgroundColor: '#262626',
                            border: 'none',
                            color: '#c026d3',
                            borderRadius: '8px',
                        }),
                        singleValue: (base) => ({
                            ...base,
                            color: '#666'
                        }),
                    }}
                    onChange={(value) => console.log(value)}
                    isSearchable={false}
                    defaultValue={options[0]}
                    classNames={{
                        indicatorSeparator: () => `hidden`,
                        singleValue: () => `bg-neutral-800 text-neutral-200`,
                        container: () => `bg-neutral-800 text-red-200`,
                        input: () => `bg-neutral-800 text-white`,
                        control: () => `bg-neutral-800 border-none`,
                        valueContainer: () => `bg-neutral-800 text-neutral-200 border-none`,
                        indicatorsContainer: () => `bg-neutral-800 text-neutral-200`,
                        menu: () => `bg-neutral-800 text-neutral-200`,
                        menuList: () => `bg-neutral-800 text-neutral-200`,
                        option: () => `bg-neutral-800 hover:bg-neutral-700 text-fuchsia-500`,
                    }}
                    options={options} />
                <button onClick={() => setShowingShortcuts(!showingShortcuts)} className=''>
                    <img src={showingShortcuts ? keyboard_off_icon : keyboard_icon} className='size-10' />
                </button>
                <button onClick={() => setShowingShortcuts(!showingShortcuts)} className=''>
                    <img src={showingShortcuts ? keyboard_off_icon : keyboard_icon} className='size-10' />
                </button>
                <button onClick={() => setShowingShortcuts(!showingShortcuts)} className=''>
                    <img src={showingShortcuts ? keyboard_off_icon : keyboard_icon} className='size-10' />
                </button>
            </div>
            <section id="drumkit" className='grid grid-cols-3 grid-rows-3 items-center justify-items-center gap-2 text-neutral-700'>
                {sounds.map((sound, index) => (
                    <Pad
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

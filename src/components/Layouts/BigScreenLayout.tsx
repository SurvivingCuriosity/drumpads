import { Controls } from "../Drumpads/Controls.tsx";
import DrumPads from "../Drumpads/DrumPads.tsx";
import { Sequencer } from "../Sequencer/Sequencer.tsx";

export const BigScreenLayout = () => {

    return (
        <section className='mx-automax-w-screen-2xl flex w-full flex-col items-center justify-center gap-4 p-2 xl:my-auto xl:items-stretch xl:p-4 2xl:flex-row'>
            <div className='flex flex-col justify-between gap-2 2xl:gap-4'>
                <header className='flex flex-row justify-between'>
                    <h1 className='inline-block animate-text bg-gradient-to-r from-primary via-primary-light to-primary-darker bg-clip-text text-5xl font-extrabold tracking-tight text-transparent xl:text-8xl'>KrumDit <span className='block text-lg font-light tracking-normal text-neutral-400 xl:text-2xl'>Your Free Online Drum Pads and Drum Sequencer</span></h1>
                    <div className='ml-auto hidden min-w-[300px] rounded-xl bg-neutral-900 p-4 lg:block'>
                        <Controls />
                    </div>
                </header>
                <Sequencer />
            </div>
            <DrumPads />
        </section>
    )
}
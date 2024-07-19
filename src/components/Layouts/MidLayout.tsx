import { AppTitle } from "../AppTitle";
import DrumPads from "../Drumpads/DrumPads";
import { Sequencer } from "../Sequencer/Sequencer";

export const MidLayout = () => {

    return (
        <section className='flex w-full max-w-screen-2xl flex-col items-center justify-center gap-4 p-8'>
            <div className="flex w-full flex-row items-center justify-center gap-8">
            <AppTitle />
            <DrumPads />
            </div>
            <Sequencer />
        </section>
    )
}
import { useAppContext } from "../../context/useAppContext";
import { AppTitle } from "../AppTitle";
import { Controls } from "../Drumpads/Controls";
import DrumPads from "../Drumpads/DrumPads";
import { Sequencer } from "../Sequencer/Sequencer";
import { ScreenContentPicker } from "../Tabs";

export const MobileLayout = () => {

    const { setScreenContent } = useAppContext();

    return (
        <section className='flex w-full flex-1 flex-col items-center justify-start gap-2 p-2'>
            <section className='flex w-full max-w-screen-2xl flex-col items-center justify-center gap-4 p-2'>
                <AppTitle />
                <div className='ml-auto hidden w-full max-w-[400px] rounded-xl bg-neutral-900 p-4'>
                    <Controls />
                </div>
                <ScreenContentPicker onTabClick={(id) => { setScreenContent(parseInt(id, 10)); }} />
                <DrumPads />
                <Sequencer />
            </section>
        </section>
    )
}
import React from 'react';
import DrumPads from './components/Drumpads/DrumPads';
import { TopNav } from './components/TopNav';
import { ListaTodosSonidos } from './components/ListaTodosSonidos';
import { Tabs } from './components/Tabs';
import { useIsPantallaMovil } from './helpers/useIsPantallaMovil';
import { Sequencer } from './components/Sequencer/Sequencer';
import { useAppContext } from './context/useAppContext';
import { ScreenContent } from './db/interfaces/ScreenContent';


const App: React.FC = () => {
  const { setScreenContent } = useAppContext();
  const isPantallaMovil = useIsPantallaMovil();

  return (
    <main className='mx-auto flex h-dvh flex-col'>
      <TopNav />
      <main className='mx-auto flex w-full justify-between'>
        <aside className='hidden h-screen min-w-52 overflow-y-auto bg-neutral-900 p-4 lg:block'>
          <ListaTodosSonidos esMovil={false} />
        </aside>

        <section className='mx-auto flex w-full flex-col items-center gap-2 p-2'>

          {isPantallaMovil &&
            <nav className='block w-full lg:hidden'>
              <Tabs
                tabs={[{ id: ScreenContent.Drumpad.toString(), label: 'Drumpad' }, { id: ScreenContent.Sequencer.toString(), label: 'Sequencer' }, { id: ScreenContent.Both.toString(), label: 'Both' }]}
                onTabClick={(id) => { setScreenContent(parseInt(id, 10)); }}
              />
            </nav>
          }

          <section className='flex w-full max-w-screen-xl flex-col items-center gap-2'>
            <Sequencer />
            <DrumPads />
          </section>


        </section>
      </main>
    </main>
  );
};

export default App;

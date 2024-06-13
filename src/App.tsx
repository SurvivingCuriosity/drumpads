import React from 'react';
import DrumPads from './components/DrumPads';
import { TopNav } from './components/TopNav';
import { ListaTodosSonidos } from './components/ListaTodosSonidos';
import { Sequencer } from './components/Sequencer';
import { Tabs } from './components/Tabs';
import { useAppContext } from './context/AppContext';
import { useIsPantallaMovil } from './helpers/useIsPantallaMovil';


const App: React.FC = () => {

  const { screenContent, setScreenContent } = useAppContext();

  const isPantallaMovil = useIsPantallaMovil();

  return (
    <main className='mx-auto flex h-dvh flex-col'>
      <TopNav />
      <main className='mx-auto flex w-full justify-between'>
        <aside className='hidden h-screen w-64 overflow-y-auto bg-neutral-900 p-4 lg:block'>
          <ListaTodosSonidos esMovil={false} />
        </aside>

        <section className='mx-auto flex flex-col items-center gap-2 p-4'>
          <nav className='block lg:hidden'>
            <Tabs
              tabs={[{ id: 'drumpad', label: 'Drumpad' }, { id: 'sequencer', label: 'Sequencer' }, { id: 'both', label: 'Both' }]}
              onTabClick={(id) => { setScreenContent(id as 'drumpad' | 'sequencer' | 'both') }}
            />
          </nav>
          {!isPantallaMovil
            ?
            <>
              <Sequencer />
              <DrumPads />
            </>
            :
            (
              screenContent === 'drumpad'
                ?
                <DrumPads />
                :
                screenContent === 'sequencer'
                  ?
                  <Sequencer />
                  : (
                    <section className='flex flex-col gap-2'>

                      <DrumPads />
                      <Sequencer />
                    </section>
                  )
            )
          }

        </section>
      </main>
    </main>
  );
};

export default App;

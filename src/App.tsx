import { DndContext } from '@dnd-kit/core';
import 'core-js';
import React from 'react';
import DrumPads from './components/Drumpads/DrumPads';
import { Footer } from './components/Footer';
import { ListaTodosSonidos } from './components/ListaTodosSonidos';
import { Sequencer } from './components/Sequencer/Sequencer';
import { Tabs } from './components/Tabs';
import { TopNav } from './components/TopNav';
import { useAppContext } from './context/useAppContext';
import { ScreenContent } from './db/interfaces/ScreenContent';
import { useIsPantallaMovil } from './helpers/useIsPantallaMovil';
import { Controls } from './components/Drumpads/Controls';

const App: React.FC = () => {
  const { setScreenContent, setIsDragging } = useAppContext();
  const isPantallaMovil = useIsPantallaMovil();

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <main className='mx-auto flex min-h-dvh flex-col justify-between bg-neutral-950'>
        <div className='flex flex-grow flex-col'>
          <TopNav />

          <main className='mx-auto flex h-full w-full flex-1 justify-between'>

            <aside className='hidden min-w-52 overflow-y-auto bg-neutral-900 p-4 lg:block'>
              <ListaTodosSonidos esMovil={false} />
            </aside>


            <section className='flex w-full flex-1 flex-col items-center justify-start gap-2 p-2 xl:justify-center'>

              {isPantallaMovil &&
                <nav className='block w-full lg:hidden'>
                  <Tabs
                    tabs={[{ id: ScreenContent.Drumpad.toString(), label: 'Drumpad' }, { id: ScreenContent.Sequencer.toString(), label: 'Sequencer' }]}
                    onTabClick={(id) => { setScreenContent(parseInt(id, 10)); }}
                  />
                </nav>
              }

              <section className='flex w-full max-w-screen-2xl flex-col items-center justify-center gap-4 p-4 xl:my-auto xl:items-stretch 2xl:flex-row'>
                <div className='flex flex-col justify-between gap-2 2xl:gap-4'>
                  <header className='flex flex-row justify-between'>
                    <h1 className='inline-block animate-text bg-gradient-to-r from-amber-400 via-amber-400 to-amber-600 bg-clip-text text-8xl font-extrabold tracking-tight text-transparent'>KrumDit <span className='block text-2xl font-light tracking-normal text-neutral-400'>Your Free Online Drum Pads and Drum Sequencer</span></h1>
                    <div className='ml-auto hidden rounded-xl bg-neutral-900 p-4 lg:block'>
                      <Controls />
                    </div>
                  </header>
                  <Sequencer />
                </div>
                <DrumPads />
              </section>


            </section>

          </main>
        </div>
        <Footer />

      </main>
    </DndContext>
  );
};

export default App;

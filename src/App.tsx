import { DndContext, DragEndEvent } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react';
import { Footer } from './components/Footer.tsx';
import { BigScreenLayout } from './components/Layouts/BigScreenLayout.tsx';
import { MidLayout } from './components/Layouts/MidLayout.tsx';
import { MobileLayout } from './components/Layouts/MobileLayout.tsx';
import { ListaTodosSonidos } from './components/ListaTodosSonidos.tsx';
import { TopNav } from './components/TopNav.tsx';
import { PlayEvent } from './db/interfaces/PlayEvent.ts';
import { useAppStore } from './store/useAppStore.ts';

const App: React.FC = () => {
  const setIsDragging = useAppStore(s => s.setIsDragging);
  const handleCambiarSonido = useAppStore(s => s.handleCambiarSonido);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (evt: DragEndEvent) => {
    const idNuevoSonido = evt.active.id.toString();
    const idPadDestino = evt.over?.id ?? 0
    handleCambiarSonido(idNuevoSonido, parseInt(idPadDestino as string, 10));
    setIsDragging(false);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Carga de sonidos y atajos de teclado: se registran una única vez.
  // Las acciones de Zustand tienen referencia estable, así que el listener
  // nunca necesita reengancharse.
  useEffect(() => {
    useAppStore.getState().initAudio();

    const handleKeyDown = (e: KeyboardEvent) => useAppStore.getState().playSound(e as unknown as PlayEvent);
    window.addEventListener('keydown', handleKeyDown);

    const handleTouchStart = () => useAppStore.getState().setIsTouch(true);
    window.addEventListener('touchstart', handleTouchStart, { once: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <main className='mx-auto flex min-h-dvh flex-col justify-between bg-neutral-950'>
        <div className='flex flex-grow flex-col'>
          <TopNav />

          <main className='mx-auto flex h-full w-full flex-1 justify-between'>

            <aside className='hidden min-w-52 overflow-y-auto bg-neutral-900 p-4 lg:block'>
              <ListaTodosSonidos esMovil={false} />
            </aside>


            {windowWidth < 1024 ?
              <MobileLayout />
              :
              windowWidth <= 1536 ?
                <MidLayout />
                :
                <BigScreenLayout />
            }

          </main>
        </div>
        <Footer />

      </main>
    </DndContext>
  );
};

export default App;

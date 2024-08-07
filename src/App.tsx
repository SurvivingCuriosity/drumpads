import { DndContext, DragEndEvent } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react';
import { Footer } from './components/Footer.tsx';
import { BigScreenLayout } from './components/Layouts/BigScreenLayout.tsx';
import { MidLayout } from './components/Layouts/MidLayout.tsx';
import { MobileLayout } from './components/Layouts/MobileLayout.tsx';
import { ListaTodosSonidos } from './components/ListaTodosSonidos.tsx';
import { TopNav } from './components/TopNav.tsx';
import { useAppContext } from './context/useAppContext.ts';

const App: React.FC = () => {
  const { setIsDragging, handleCambiarSonido } = useAppContext();

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

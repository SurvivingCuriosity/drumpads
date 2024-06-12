import React from 'react';
import DrumPads from './components/DrumPads';
import { TopNav } from './components/TopNav';
import { ListaTodosSonidos } from './components/ListaTodosSonidos';


const App: React.FC = () => {

  return (
    <main className='mx-auto flex h-dvh max-w-lg flex-col items-center justify-between gap-3 p-2 pt-12'>
      {/* <aside className='absolute left-0 hidden h-screen w-64 overflow-y-auto bg-neutral-900 p-4 lg:block'>
      </aside> */}
      <ListaTodosSonidos esMovil={false} />

      <TopNav />
      <DrumPads />
    </main>
  );
};

export default App;

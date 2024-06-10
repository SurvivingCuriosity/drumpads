import React from 'react';
import { AppTitle } from './components/AppTitle';
import { Controls } from './components/Controls';
import DrumPads from './components/DrumPads';


const App: React.FC = () => {

  return (
    <main className='mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-between gap-3 p-2'>
      <AppTitle />
      <Controls />
      <DrumPads />

    </main>
  );
};

export default App;

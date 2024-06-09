import React from 'react';
import { AppTitle } from './components/AppTitle';
import { Controls } from './components/Controls';
import DrumPads from './components/DrumPads';

const App: React.FC = () => {



  return (
    <main className='mx-auto flex max-w-lg flex-col items-center gap-3 p-4'>
      <AppTitle />
      <Controls />
      <DrumPads />
    </main>
  );
};

export default App;

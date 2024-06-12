import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SoundFull } from '../db/Sound';
import { Key } from './Key';

export interface ButtonProps {
  index: number;
  isTouch: boolean;
  sound:SoundFull;
}

export const Pad = (props: ButtonProps) => {
  const { sound,index, isTouch } = props;

  const { showingShortcuts, playSound } = useAppContext();

  const handlePadClick = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    if (isTouch && e.type !== 'touchstart') return; // Si es un evento táctil y no es 'touchstart', sal de la función
    playSound(e);
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    playSound(e);
  }


  return (
    <div
      data-key={index + 1}
      className={`relative border-4 rounded-lg transition-all duration-500 bg-neutral-800 w-full aspect-square ${sound.playing ? 'bg-neutral-400/20 border-fuchsia-500' : 'border-transparent'}`}
      onMouseDown={handlePadClick}
      onTouchStart={handleTouchStart}
    >
      {showingShortcuts && <span className='absolute bottom-0 right-0 m-1'><Key tecla={sound.key} /></span>} 
    </div>
  );
};

import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SoundFull } from '../db/Sound';
import { Key } from './Key';

export interface ButtonProps {
  index: number;
  isTouch: boolean;
  sound: SoundFull;
}

export const Pad = (props: ButtonProps) => {
  const { sound, index, isTouch, } = props;

  const { showingShortcuts, play } = useAppContext();

  const handlePadClick = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    if (isTouch && e.type !== 'touchstart') {
      return
    } // Si es un evento táctil y no es 'touchstart', sal de la función
    play(sound);
  }

  const handleTouchStart = () => {
    play(sound);
  }


  return (
    <div
      data-key={index + 1}
      className={`relative border-2 rounded-lg transition-all bg-neutral-800/50 w-full aspect-square ${sound.playing ? 'bg-neutral-400/20 border-fuchsia-500' : 'border-fuchsia-700/20'}`}
      onMouseDown={handlePadClick}
      onTouchStart={handleTouchStart}
    >
      <p className='absolute left-0 right-0 m-1 text-xs'>{sound.label}</p>
      {showingShortcuts && <span className='absolute bottom-0 right-0 m-1'><Key tecla={sound.key} /></span>}
    </div>
  );
};

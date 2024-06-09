import React from 'react';

export interface ButtonProps {
  playing: boolean;
  index: number;
  playSound: (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => void; // Ajustar el tipo del evento
  isTouch: boolean;
}

export const Pad = (props: ButtonProps) => {
  const { playing, index, playSound, isTouch } = props;
  
  const handlePadClick = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    if(isTouch && e.type !== 'touchstart') return; // Si es un evento táctil y no es 'touchstart', sal de la función
    playSound(e);
  }
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    playSound(e);
  }

  return (
    <div
      data-key={index + 1}
      className={`border-4 transition-all duration-500 bg-neutral-800 w-full aspect-square ${playing ? 'bg-neutral-400 border-fuchsia-500' : 'border-transparent'}`}
      onClick={handlePadClick}
      onTouchStart={handleTouchStart}
    >
      <h3 className={''}>{index + 1}</h3>
    </div>
  );
};

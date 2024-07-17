import React from 'react';
import { SoundFull } from '../../db/interfaces/Sound';
import { Key } from '../Key';
import { useAppContext } from '../../context/useAppContext';
import folder from '../../assets/icons/folder.svg';
import { useDroppable } from '@dnd-kit/core';

export interface ButtonProps {
  index: number;
  isTouch: boolean;
  sound: SoundFull | undefined;
}

export const Pad = (props: ButtonProps) => {
  const { sound, index, isTouch } = props;

  const { setNodeRef, over } = useDroppable({
    id: index,
  });

  const { showingShortcuts, play, setPadModificando, setSideNavOpened, showingPadsSettings, setShowingPadsSettings, isDragging } = useAppContext();

  const handlePadClick = (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    if (isTouch && e.type !== 'touchstart') {
      return
    } // Si es un evento táctil y no es 'touchstart', sal de la función
    if (showingPadsSettings) return
    play(sound);
  }

  const handleTouchStart = () => {
    if (showingPadsSettings) return
    play(sound);
  }

  const dragIsOver = over?.id === index;

  const handleClickIconoCarpeta = () => {
    setPadModificando(index)
    setSideNavOpened(true)
    setShowingPadsSettings(false)
  }

  return (
    <div
      ref={setNodeRef}
      data-key={index + 1}
      className={`relative border-2 rounded-lg transition-all bg-neutral-800/50 w-full aspect-square 
        ${dragIsOver ? 'bg-primary/30 border-primary'
          : isDragging ?
            'border-primary' 
            : sound?.playing
              ? 'bg-neutral-300/10 border-primary'
              : sound?.audioSrc === ''
                ? 'bg-neutral-400/20 border-neutral-800'
                : 'bg-neutral-400/20 border-primary-darker/60'}`}
      onMouseDown={handlePadClick}
      onTouchStart={handleTouchStart}
    >
      {showingPadsSettings
        ?
        <img onClick={handleClickIconoCarpeta} src={folder} className='absolute right-1/2 top-1/2 size-12 -translate-y-1/2 translate-x-1/2 cursor-pointer transition-transform duration-200 hover:scale-125' />
        :
        <>
          <p className='absolute left-0 m-1 text-xs text-neutral-500'>{sound?.label}</p>
          <p className='absolute bottom-0 left-0 m-1 text-xs text-neutral-700'>{index+1}</p>
          {showingShortcuts && sound?.key && <span className='absolute bottom-0 right-0 m-1'><Key tecla={sound.key} /></span>}
        </>
      }
    </div>
  );
};

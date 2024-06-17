import React from 'react';
import { SoundFull } from '../../db/interfaces/Sound';
import { Key } from '../Key';
import { useAppContext } from '../../context/useAppContext';
import folder from '../../assets/icons/folder.svg';

export interface ButtonProps {
  index: number;
  isTouch: boolean;
  sound: SoundFull | undefined;
}

export const Pad = (props: ButtonProps) => {
  const { sound, index, isTouch } = props;

  const { showingShortcuts, play, setPadModificando, setSideNavOpened, showingPadsSettings, setShowingPadsSettings } = useAppContext();

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


  const handleClickIconoCarpeta = () => {
    setPadModificando(index)
    setSideNavOpened(true)
    setShowingPadsSettings(false)
  }

  return (
    <div
      data-key={index + 1}
      className={`relative border-2 rounded-lg transition-all bg-neutral-800/50 w-full aspect-square 
        ${sound?.playing
          ? 'bg-neutral-300/10 border-fuchsia-500'
          : sound?.audioSrc === ''
            ? 'bg-neutral-400/20 border-neutral-800'
            : 'bg-neutral-400/20 border-fuchsia-700/50'}`}
      onMouseDown={handlePadClick}
      onTouchStart={handleTouchStart}
    >
      {showingPadsSettings
        ?
        <img onClick={handleClickIconoCarpeta} src={folder} className='absolute right-1/2 top-1/2 size-12 -translate-y-1/2 translate-x-1/2' />
        :
        <>
          <p className='absolute left-0 right-0 m-1 text-xs text-neutral-500'>{sound?.label}</p>
          {showingShortcuts && sound?.key && <span className='absolute bottom-0 right-0 m-1'><Key tecla={sound.key} /></span>}
        </>
      }
    </div>
  );
};

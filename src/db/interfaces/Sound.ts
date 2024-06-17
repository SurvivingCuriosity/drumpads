import { Categories } from "./Categories";

export interface Sound {
  audioSrc: string;
  label: string;
  category: Categories|undefined;
}
export interface SoundFull extends Sound {
  playing: boolean|undefined;
  audioObj: HTMLAudioElement|null|undefined;
  volume: number|undefined;
  key: string|undefined
}


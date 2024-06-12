import { Categories } from "./Categories";

export interface Sound {
  audioSrc: string;
  label: string;
  category: Categories;
  key: string
}
export interface SoundFull extends Sound {
  playing: boolean;
  audioObj: HTMLAudioElement|null;
  volume: number;
}
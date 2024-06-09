export interface Sound {
  audioSrc: string;
  playing: boolean;
  audioObj: HTMLAudioElement|null;
}
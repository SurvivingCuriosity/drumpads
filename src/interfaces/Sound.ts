export interface Sound {
  audioSrc: string;
  playing: boolean;
  audioObj: HTMLAudioElement|null;
  key: string
  volume: number;
}
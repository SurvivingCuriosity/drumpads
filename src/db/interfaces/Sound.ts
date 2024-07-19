import { IconProps } from "../../components/icons/IconProps";
import { Categories } from "./Categories";

export interface Sound {
  audioSrc: string;
  label: string;
  category: Categories|undefined;
  icon?: (props: IconProps) => JSX.Element
}
export interface SoundFull extends Sound {
  playing: boolean|undefined;
  audioObj: HTMLAudioElement|null|undefined;
  volume: number|undefined;
  key: string|undefined
}


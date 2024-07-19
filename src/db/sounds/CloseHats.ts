import { HihatIcon } from "../../components/icons/HihatIcon";
import { Categories } from "../interfaces/Categories";
import { Sound } from "../interfaces/Sound";

export const closehats: Sound[] = [
  {
    audioSrc: "./assets/sound/close_hats/hard_chat.mp3",
    label: "Hard hi-hat",
    category: Categories.HIHATS,
    icon: HihatIcon,
  },
  {
    audioSrc: "./assets/sound/close_hats/hard2_chat.mp3",
    label: "Hard hi-hat (2)",
    category: Categories.HIHATS,
    icon: HihatIcon,
  },
  {
    audioSrc: "./assets/sound/close_hats/lofi_chat.mp3",
    label: "Lofi hi-hat",
    category: Categories.HIHATS,
    icon: HihatIcon,
  },
  {
    audioSrc: "./assets/sound/close_hats/present_chat.mp3",
    label: "Present hi-hat",
    category: Categories.HIHATS,
    icon: HihatIcon,
  },
  {
    audioSrc: "./assets/sound/close_hats/roll_chat.mp3",
    label: "Rolling hi-hat",
    category: Categories.HIHATS,
    icon: HihatIcon,
  },
  {
    audioSrc: "./assets/sound/close_hats/trap_chat.mp3",
    label: "Trap hi-hat",
    category: Categories.HIHATS,
    icon: HihatIcon,
  },
  {
    audioSrc: "./assets/sound/close_hats/weak_chat.mp3",
    label: "Weak hi-hat",
    category: Categories.HIHATS,
    icon: HihatIcon,
  },
];

export const labeledClosehats = {
  hardChat: closehats[0],
  hard2Chat: closehats[1],
  lofiChat: closehats[2],
  presentChat: closehats[3],
  rollChat: closehats[4],
  trapChat: closehats[5],
  weakChat: closehats[6],
};

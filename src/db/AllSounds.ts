import { Categories } from "./Categories";
import { Sound } from "./Sound";

export const sounds: Sound[] = [
  {
    audioSrc: "./assets/sound/808.wav",
    key: "q",
    label: "808",
    category:Categories.OTHERS,
  },
  {
    audioSrc: "./assets/sound/big-rack-tom.mp3",
    key: "w",
    label: "Tom",
    category:Categories.OTHERS,
  },
  {
    audioSrc: "./assets/sound/crash.mp3",
    key: "e",
    label: "Crash",
    category:Categories.OPENHATS,
  },
  {
    audioSrc: "./assets/sound/ride.wav",
    key: "a",
    label: "Ride",
    category:Categories.OPENHATS,
  },
  {
    audioSrc: "./assets/sound/snare.wav",
    key: "s",
    label: "Snare",
    category:Categories.SNARES,
  },
  {
    audioSrc: "./assets/sound/openhat2.wav",
    key: "d",
    label: "Open hat",
    category:Categories.OPENHATS,
  },
  {
    audioSrc: "./assets/sound/kick.mp3",
    key: "z",
    label: "Kick",
    category:Categories.KICKS,
  },
  {
    audioSrc: "./assets/sound/clap.wav",
    key: "x",
    label: "Clap",
    category:Categories.CLAPS,
  },
  {
    audioSrc: "./assets/sound/closehat.wav",
    key: "c",
    label: "Close hat",
    category:Categories.HIHATS,
  },
];

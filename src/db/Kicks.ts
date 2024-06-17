import { Categories } from "./interfaces/Categories";
import { Sound } from "./interfaces/Sound";

export const kicks: Sound[] = [
  {
    audioSrc: "./assets/sound/kicks/base_kick.mp3",
    label: "Base kick",
    category: Categories.KICKS,
  },
  {
    audioSrc: "./assets/sound/kicks/clicky_kick.mp3",
    label: "Clicky kick",
    category: Categories.KICKS,
  },
  {
    audioSrc: "./assets/sound/kicks/deep_kick.mp3",
    label: "Deep kick",
    category: Categories.KICKS,
  },
  {
    audioSrc: "./assets/sound/kicks/dist_kick.mp3",
    label: "Dist kick",
    category: Categories.KICKS,
  },
  {
    audioSrc: "./assets/sound/kicks/hiphop_kick.mp3",
    label: "Hiphop kick",
    category: Categories.KICKS,
  },
  {
    audioSrc: "./assets/sound/kicks/lofi_kick.mp3",
    label: "Lofi kick",
    category: Categories.KICKS,
  },
  {
    audioSrc: "./assets/sound/kicks/reggaeton_kick.mp3",
    label: "Reggaeton kick",
    category: Categories.KICKS,
  },
];

export const labeledKicks = {
  baseKick: kicks[0],
  clickyKick: kicks[1],
  deepKick: kicks[2],
  distKick: kicks[3],
  hiphopKick: kicks[4],
  lofiKick: kicks[5],
  reggaetonKick: kicks[6],
};

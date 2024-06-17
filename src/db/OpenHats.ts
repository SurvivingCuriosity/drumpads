import { Categories } from "./interfaces/Categories";
import { Sound } from "./interfaces/Sound";

export const openhats:Sound[] = [
    {
      audioSrc: "./assets/sound/open_hats/attack_ohat.mp3",
      label: "Attack open hat",
      category:Categories.OPENHATS,
    },
    {
      audioSrc: "./assets/sound/open_hats/electric_ohat.mp3",
      label: "Electric open hat",
      category:Categories.OPENHATS,
    },
    {
      audioSrc: "./assets/sound/open_hats/energic_ohat.mp3",
      label: "Energic open hat",
      category:Categories.OPENHATS,
    },
    {
      audioSrc: "./assets/sound/open_hats/high_ohat.mp3",
      label: "High open hat",
      category:Categories.OPENHATS,
    },
    {
      audioSrc: "./assets/sound/open_hats/lofi_ohat.mp3",
      label: "Lofi open hat",
      category:Categories.OPENHATS,
    },
    {
      audioSrc: "./assets/sound/open_hats/rev_ohat.mp3",
      label: "Reverb open hat",
      category:Categories.OPENHATS,
    },
    {
      audioSrc: "./assets/sound/open_hats/soft_ohat.mp3",
      label: "Soft open hat",
      category:Categories.OPENHATS,
    },
  ]


  export const labeledOpenhats = {
    attackOhat: openhats[0],
    electricOhat: openhats[1],
    energicOhat: openhats[2],
    highOhat: openhats[3],
    lofiOhat: openhats[4],
    revOhat: openhats[5],
    softOhat: openhats[6],
  };
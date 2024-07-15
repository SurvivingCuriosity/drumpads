import { Categories } from "../interfaces/Categories";
import { Sound } from "../interfaces/Sound";

export const snares:Sound[] = [
    {
      audioSrc: "./assets/sound/snares/attack_snare.mp3",
      label: "Attack snare",
      category:Categories.SNARES,
    },
    {
      audioSrc: "./assets/sound/snares/drill_snare.mp3",
      label: "Drill snare",
      category:Categories.SNARES,
    },
    {
      audioSrc: "./assets/sound/snares/lofi_snare.mp3",
      label: "Lofi snare",
      category:Categories.SNARES,
    },
    {
      audioSrc: "./assets/sound/snares/lofi2_snare.mp3",
      label: "Lofi snare (2)",
      category:Categories.SNARES,
    },
    {
      audioSrc: "./assets/sound/snares/perreo_snare.mp3",
      label: "Perreo snare",
      category:Categories.SNARES,
    },
    {
      audioSrc: "./assets/sound/snares/perreo2_snare.mp3",
      label: "Perreo snare (2)",
      category:Categories.SNARES,
    },
    {
      audioSrc: "./assets/sound/snares/trap_snare.mp3",
      label: "Trap snare",
      category:Categories.SNARES,
    },
    {
        audioSrc: "./assets/sound/snares/weak_snare.mp3",

        label: "Weak snare",
        category:Categories.SNARES,
      }
  ]

  export const labeledSnares = {
    attackSnare: snares[0],
    drillSnare: snares[1],
    lofiSnare: snares[2],
    lofi2Snare: snares[3],
    perreoSnare: snares[4],
    perreo2Snare: snares[5],
    trapSnare: snares[6],
    weakSnare: snares[7],
  };
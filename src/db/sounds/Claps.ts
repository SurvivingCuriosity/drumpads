import { ClapIcon } from "../../components/icons/ClapIcon.tsx";
import { Categories } from "../interfaces/Categories.ts";
import { Sound } from "../interfaces/Sound.ts";


export const claps:Sound[] = [
    {
      audioSrc: "./assets/sound/claps/attack_clap.mp3",
      label: "Attack clap",
      category:Categories.CLAPS,
      icon: ClapIcon
    },
    {
      audioSrc: "./assets/sound/claps/lofi_clap.mp3",
      label: "Lofi clap",
      category:Categories.CLAPS,
      icon: ClapIcon
    },
    {
      audioSrc: "./assets/sound/claps/rev_clap.mp3",
      label: "Reverb clap",
      category:Categories.CLAPS,
      icon: ClapIcon
    },
    {
      audioSrc: "./assets/sound/claps/rev2_clap.mp3",
      label: "Reverb clap (2)",
      category:Categories.CLAPS,
      icon: ClapIcon
    },
    {
      audioSrc: "./assets/sound/claps/stereo_clap.mp3",
      label: "Stereo clap",
      category:Categories.CLAPS,
      icon: ClapIcon
    },
    {
      audioSrc: "./assets/sound/claps/trap_clap.mp3",	
      label: "Trap clap",
      category:Categories.CLAPS,
      icon: ClapIcon
    }
  ]


  export const labeledClaps = {
    attackClap: claps[0],
    lofiClap: claps[1],
    revClap: claps[2],
    rev2Clap: claps[3],
    stereoClap: claps[4],
    trapClap: claps[5],
  };
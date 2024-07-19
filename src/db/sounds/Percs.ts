import { PercIcon } from "../../components/icons/PercIcon";
import { Categories } from "../interfaces/Categories";
import { Sound } from "../interfaces/Sound";

export const percs:Sound[] = [
    {
      audioSrc: "./assets/sound/percs/cowbell_perc.mp3",
      label: "Cowbell perc",
      category:Categories.PERCS,
      icon:PercIcon
    },
    {
      audioSrc: "./assets/sound/percs/deep_perc.mp3",
      label: "Deep perc",
      category:Categories.PERCS,
      icon:PercIcon
    },
    {
      audioSrc: "./assets/sound/percs/dry_perc.mp3",
      label: "Dry perc",
      category:Categories.PERCS,
      icon:PercIcon
    },
    {
      audioSrc: "./assets/sound/percs/guiro_perc.mp3",
      label: "Guiro perc",
      category:Categories.PERCS,
      icon:PercIcon
    },
    {
      audioSrc: "./assets/sound/percs/reg_perc.mp3",
      label: "Reg perc",
      category:Categories.PERCS,
      icon:PercIcon
    },
    {
      audioSrc: "./assets/sound/percs/rev_perc.mp3",	
      label: "Reverb perc",
      category:Categories.PERCS,
      icon:PercIcon
    },
    {
      audioSrc: "./assets/sound/percs/wood_perc.mp3",	
      label: "Wood perc",
      category:Categories.PERCS,
      icon:PercIcon
    },
  ]

  export const labeledPercs = {
    cowbellPerc: percs[0],
    deepPerc: percs[1],
    dryPerc: percs[2],
    guiroPerc: percs[3],
    regPerc: percs[4],
    revPerc: percs[5],
    woodPerc: percs[6],
  };


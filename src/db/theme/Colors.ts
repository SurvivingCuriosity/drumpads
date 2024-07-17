import { getColorValueFromCss } from "../../helpers/getColorValueFromCss";

console.log("====================================");
console.log(getColorValueFromCss("--yellow"));
console.log("=========================s===========");

export const COLORS = [
  { name: "yellow", value: "hsl(54,100%,60%)" },
  { name: "orange", value: "hsl(39,100%,60%)" },
  { name: "red", value: "hsl(349,100%,60%)" },
  { name: "pink", value: "hsl(301,100%,60%)" },
  { name: "green", value: "hsl(135,100%,60%)" },
  { name: "blue", value: "hsl(190,100%,60%)" },
];

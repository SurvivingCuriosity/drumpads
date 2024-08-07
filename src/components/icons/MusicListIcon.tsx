import { IconProps } from "./IconProps";


export const MusicListIcon = (props: IconProps) => {

  const { size = 48 } = props;

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className="fill-primary"
      viewBox="0 -960 960 960"
    >
      <path d="M629.88-212q-35.88 0-61.38-24.96-25.5-24.97-25.5-60.63 0-36.49 25.08-61.95Q593.17-385 629-385q18.1 0 34.55 7.5Q680-370 694-359v-309h134v49H716v322q0 35.42-25.12 60.21t-61 24.79ZM172-384v-22h266v22H172Zm0-131v-22h415v22H172Zm0-131v-22h415v22H172Z" />
    </svg>
  )
}


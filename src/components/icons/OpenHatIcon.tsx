import { IconProps } from "./IconProps"

export const OpenHatIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 64 64"
    width={props.size}
    height={props.size}
    className="fill-primary"
    {...props}
  >
    <path className="fill-primary" d="M59 24c0-4.98-15.184-6.884-26-6.995V8a1 1 0 0 0-2 0v9.005C20.184 17.116 5 19.02 5 24s15.184 6.884 26 6.995V56a1 1 0 1 0 2 0V30.995C43.816 30.884 59 28.98 59 24zm-27 5c-16.414 0-25-3.255-25-5 0-1.708 8.251-4.856 24-4.988V22a1 1 0 0 0 2 0v-2.988c15.749.132 24 3.28 24 4.988 0 1.745-8.586 5-25 5z" />
  </svg>
)


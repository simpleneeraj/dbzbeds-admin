import React from "react";
type SVG = React.SVGProps<SVGSVGElement>;
interface SVGICONPROPS extends SVG {
  size?: number | string;
  color?: string;
}
const BedIcon = ({
  size = "20px",
  color = "currentColor",
  ...rest
}: SVGICONPROPS) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      width={size}
      height={size}
      {...rest}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M22 11v9h-2v-3H4v3H2V4h2v10h8V7h6a4 4 0 0 1 4 4zm-2 3v-3a2 2 0 0 0-2-2h-4v5h6zM8 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </svg>
  );
};
export default BedIcon;

{
  /* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"></svg> */
}

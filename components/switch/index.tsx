import React from "react";
import css from "styles/switch.module.scss";

interface SwitchProps extends React.ComponentPropsWithoutRef<"div"> {
  active: boolean;
}

const Switch = ({ active, ...props }: SwitchProps) => {
  const classNames = active ? css.active : css.no;
  return (
    <div className={classNames} {...props}>
      <span></span>
    </div>
  );
};

export default Switch;

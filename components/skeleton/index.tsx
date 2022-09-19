import React from "react";
import css from "./skeleton.module.scss";

interface Skeleton {}
const Skeleton = ({
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div className={css.container}>
      <span className={`${css.skeleton} ${className}`} {...rest}></span>
    </div>
  );
};
export default Skeleton;

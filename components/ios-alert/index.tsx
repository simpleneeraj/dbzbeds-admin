import React from "react";
import css from "./ios.module.scss";

interface IosAlertProps {
  message: string;
  buttonText: string;
}
const IosAlert = ({}: IosAlertProps) => {
  return (
    <div className={css["container"]}>
      <div className={css["alert-box"]}>
        <div className={css["msg"]}>
          <p>Hello World</p>
        </div>
        <div className={css["button"]}>
          <button>OK</button>
        </div>
      </div>
    </div>
  );
};
export default IosAlert;

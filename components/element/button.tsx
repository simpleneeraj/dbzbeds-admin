import React from "react";
import css from "styles/admin.module.scss";

const Button = (props: React.ComponentPropsWithoutRef<"button">) => {
    return (
        <div className={css.button}>
            <button {...props} />
        </div>
    );
};

export default Button;

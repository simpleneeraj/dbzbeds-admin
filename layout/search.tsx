/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "styles/order.module.scss";
import SearchIcon from "icons/SearchIcon";

interface SearchProps {
  buttonProps?: React.ComponentPropsWithoutRef<"button">;
  inputProps?: React.ComponentPropsWithoutRef<"input">;
}

const Search = ({ buttonProps, inputProps }: SearchProps) => {
  return (
    <div className={Styles.leftside}>
      <div className={Styles.topsearch}>
        <input type="text" placeholder="Search Products..." {...inputProps} />
        <button {...buttonProps}>
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default Search;

import CancleIcon from "icons/CancleIcon";
import React, { useState } from "react";
import styles from "./chip.module.scss";

interface Industry {
  name: string;
  selected: boolean;
}

function ChipInput({}) {
  const [chips, setChips] = useState<string[]>([]);
  const [industryItem, setIndustryName] = useState<Industry>();

  //   const checkingChips = chips.length < 1;

  //Handle Chips
  const onAddIndusrtryChip = (chip: any) => {
    const newChips = [...chips];

    console.log(chip.code);
    // if (checkingChips) {
    if (chip.code === "Enter") {
      //remove last letter 188 (,) from chip
      chip.target.value = chip.target.value.slice(0, -1);
      //add chip to array
      newChips.push(chip.target.value);
      setChips(newChips);
      chip.target.value = "";
    }
    if (chip.code === "Backspace") {
      const lastRemoved = [...chips];
      // Remove last from array
      lastRemoved.pop();
      setChips(lastRemoved);
    }
    // }
  };

  const handleRemoveIndustryChip = (index: any) => {
    const newChips = [...chips];
    newChips.splice(index, 1);
    setChips(newChips);
  };

  //   useEffect(() => {
  //     const selectedIndustries = industries.filter(
  //       (item: any) => item.selected === true
  //     );
  //     if (chips.length > 0 || selectedIndustries.length > 0) {
  //       isNext(true);
  //     } else {
  //       isNext(false);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [chips, industries]);

  //   useEffect(() => {
  //     handleState(Object.freeze({ chips, industries }));
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [chips, industries]);

  //   useEffect(() => {
  //     if (values) {
  //       setChips(values.chips);
  //       setIndustries(values.industries);
  //     }
  //   }, [values]);

  return (
    <div className={styles.chips}>
      <div className={styles.chipList}>
        <ul>
          {chips.map((item: any, index: any) => (
            <li className={styles.chip} key={index}>
              {item}{" "}
              <span onClick={() => handleRemoveIndustryChip(index)}>
                <CancleIcon height={16} width={16} fill="#fff" />
              </span>
            </li>
          ))}
          <li className="">
            <input
              type="text"
              name="name"
              className="chipinput"
              placeholder={true ? "Type here..." : ""}
              //   disabled={!checkingChips || industryItem?.selected}
              onKeyUp={(e) => onAddIndusrtryChip(e)}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ChipInput;

/**
 *    <div className={styles.choiceslist}>
          <ul>
            {industries.map((item: any, index: any) => {
              const className = `${
                item?.selected && checkingChips ? styles.choiceslistActive : ""
              } ${checkingChips ? styles.listHover : ""}`;

              return (
                <li
                  key={index}
                  onClick={() => selectIndustryHandler(item)}
                  className={className}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
 */

import CancleIcon from "icons/CancleIcon";
import { useFetchIconsByType } from "network-requests/queries";
import React, { useEffect, useState } from "react";
import styles from "./chip.module.scss";

interface Industry {
    onChange: (e: any) => void;
    value?: string[];
}

function ChipInput({ onChange, value }: Industry) {
    const [chips, setChips] = useState<string[]>([]);

    const onAddIndusrtryChip = (chip: any) => {
        const newChips = [...chips];

        if (chip.code === "Enter") {
            chip.target.value = chip.target.value;
            newChips.push(chip.target.value);
            setChips(newChips);
            chip.target.value = "";
        }
        if (chip.code === "Backspace") {
            const lastRemoved = [...chips];
            lastRemoved.pop();
            setChips(lastRemoved);
        }
    };

    const handleRemoveIndustryChip = (index: any) => {
        const newChips = [...chips];
        newChips.splice(index, 1);
        setChips(newChips);
    };

    useEffect(() => {
        if (value) {
            setChips(value);
        }
    }, [value]);

    useEffect(() => {
        onChange(chips);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chips]);

    return (
        <div className={styles.chips}>
            <div className={styles.chipList}>
                <ul>
                    {chips.map((item: any, index: any) => (
                        <li className={styles.chip} key={index}>
                            {item}{" "}
                            <span
                                onClick={() => handleRemoveIndustryChip(index)}
                            >
                                <CancleIcon
                                    height={16}
                                    width={16}
                                    fill="#fff"
                                />
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

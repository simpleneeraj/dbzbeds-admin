import React from "react";
import CancleIcon from "icons/CancleIcon";
import styles from "./chip.module.scss";

interface ChipInputProps extends React.ComponentPropsWithRef<"input"> {
  value?: string[];
  label?: string;
  onChange: (e: any) => void;
}

const ChipInput = React.forwardRef(
  (
    { onChange, value, label, ...rest }: ChipInputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [chips, setChips] = React.useState<string[]>(value || []);

    const onAddIndusrtryChip = (chip: any) => {
      const newChips = [...chips];
      if (chip.code === "Enter") {
        chip.target.value = chip.target.value;
        newChips.push(chip.target.value);
        setChips(newChips);
        chip.target.value = "";
      }
    };

    const handleRemoveIndustryChip = (index: any) => {
      const newChips = [...chips];
      newChips.splice(index, 1);
      setChips(newChips);
    };

    React.useMemo(() => {
      if (value) {
        setChips(value);
      }
    }, [value]);

    React.useEffect(() => {
      onChange(chips);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chips]);

    return (
      <>
        <label className={styles.label}>{label}</label>
        <div className={styles.chips}>
          <div className={styles.chipList}>
            <ul>
              {chips.map((item: any, index: any) => (
                <li className={styles.chip} key={index}>
                  {item}
                  <i onClick={() => handleRemoveIndustryChip(index)}>
                    <CancleIcon height={16} width={16} fill="#fff" />
                  </i>
                </li>
              ))}
              <div className={styles.field}>
                <input
                  ref={ref}
                  type="text"
                  name="name"
                  className="chipinput"
                  //   placeholder={true ? "Type here..." : ""}
                  onKeyUp={(e) => onAddIndusrtryChip(e)}
                  {...rest}
                />
              </div>
            </ul>
          </div>
        </div>
      </>
    );
  }
);

ChipInput.displayName = "ChipInput";
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

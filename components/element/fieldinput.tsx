/* eslint-disable jsx-a11y/alt-text */
import React from "react";

import css from "styles/admin.module.scss";
import AddMoreButton from "./addmore";
import Input from "./input";

import Select from "./select";

type E = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>;
// type E = React.ChangeEvent<HTMLInputElement>;

interface StateType {
  id: string;
  name?: string;
  image?: string;
  price?: number;
}

interface OptionsTypes {
  text: any;
  value: any;
  label: string;
}
interface DynamicInputProps {
  title: string;
  options: OptionsTypes[];
  // getState: (value: StateType[]) => void;
  addInputs: () => void;
  initialState: StateType[];
  removeInputs: (id: string) => void;
  onChangeInputs: (id: number, e: E) => void;
}

const FieldInput = ({
  title,
  options,
  initialState,
  addInputs,
  removeInputs,
  onChangeInputs,
}: DynamicInputProps) => {
  return (
    <React.Fragment>
      {/* Dynamic Fields */}
      <h4 className={css.heading}>{title}</h4>
      <div className={css.grid}>
        {initialState?.map((data: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <Select
                name="name"
                label={`${title} Name`}
                options={options}
                onChange={(e) => onChangeInputs(index, e)}
                value={data?.name}
              />

              <div className="d-flex" style={{ alignItems: "center" }}>
                <Input
                  type="number"
                  name="price"
                  label={`${title} Price`}
                  placeholder="Enter product name"
                  onChange={(e) => onChangeInputs(index, e)}
                  deletable
                  onDelete={() => removeInputs(data.id)}
                  style={{ width: "100%" }}
                />
              </div>
            </React.Fragment>
          );
        })}
        <AddMoreButton onClick={addInputs} title="Add More Color" />
      </div>
    </React.Fragment>
  );
};
export default FieldInput;

// {data?.image && (
//   <Image
//     width={50}
//     height={50}
//     src={handleImageURL(data?.image)}
//     objectFit={"contain"}
//   />
// )}

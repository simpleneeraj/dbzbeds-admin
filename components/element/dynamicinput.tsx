/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Select from "./select";
import css from "styles/admin.module.scss";
import AddMoreButton from "./addmore";
import id from "utils/id";
import Input from "./input";

interface StateType {
  id: string;
  name: string;
  price: string;
}

interface OptionsTypes {
  text: any;
  value: any;
}
interface DynamicInputProps {
  title: string;
  // min?: number;
  // max?: number;
  options: OptionsTypes[];
  getState: (value: StateType[]) => void;
  initialState?: StateType[];
}

const init: StateType[] = [
  {
    id: "7d24f79a",
    name: "",
    price: "",
  },
];

const DynamicInputWithPrice = ({
  options,
  title,
  getState,
  initialState,
}: DynamicInputProps) => {
  const [inputs, setInputs] = React.useState<StateType[]>(init);
  const draft = [...inputs] as any;

  console.log({ draft });

  //Change On Initial Input
  React.useMemo(() => {
    if (initialState) {
      setInputs(initialState);
    }
  }, [initialState]);

  // CHANGE
  const onChangeInputs = (index: number, event: any) => {
    draft[index][event.target.name] = event.target.value;
    setInputs(draft);
  };

  // ADD
  const addInputs = () => {
    const addFields = {
      id: id(4),
      name: "",
      price: 0,
    };

    draft.push(addFields);
    setInputs(draft);
  };
  // REMOVE
  const removeInputs = (id: string) => {
    if (id) {
      const filter = inputs.filter((v: StateType) => v.id !== id);
      setInputs(filter);
    }
  };

  React.useEffect(() => {
    if (getState) getState(inputs);
  }, [inputs]);

  return (
    <React.Fragment>
      {/* Dynamic Fields */}
      <h4 className={css.heading}>{title}</h4>
      <div className={css.grid}>
        {inputs.map((data: StateType, index: number) => {
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
                  name="price"
                  value={data.price}
                  type="number"
                  label={`${title} Price`}
                  placeholder="Enter product price"
                  onChange={(e) => onChangeInputs(index, e)}
                  deletable
                  onDelete={() => removeInputs(data.id)}
                  style={{ width: "100%" }}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <br />
      <AddMoreButton onClick={addInputs} title="Add More Color" />
    </React.Fragment>
  );
};
export default DynamicInputWithPrice;

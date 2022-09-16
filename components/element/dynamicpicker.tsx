/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Select from "./select";
import FilePicker from "./picker";
import css from "styles/admin.module.scss";
import AddMoreButton from "./addmore";
import id from "utils/id";
import Image from "next/image";

interface StateType {
  id: string;
  name: string;
  image: string;
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
    image: "",
  },
];

const DynamicInputWithImagePicker = ({
  options,
  title,
  getState,
  initialState,
}: DynamicInputProps) => {
  const [inputs, setInputs] = React.useState<StateType[]>(init);
  const draft = [...inputs] as any;

  //Change On Initial Input
  React.useMemo(() => {
    if (initialState) {
      setInputs(initialState);
    }
  }, [initialState]);

  // CHANGE
  const onChangeInputs = (index: number, event: any) => {
    draft[index][event.target.name] = event.target.value;
    if (event.target.name === "image") {
      const file = event.target.files[0];
      // const blob = URL.createObjectURL(file);
      draft[index][event.target.name] = file;
      setInputs(draft);
    } else {
      draft[index][event.target.name] = event.target.value;
      setInputs(draft);
    }
  };
  // ADD
  const addInputs = () => {
    const addFields = {
      id: id(4),
      name: "",
      image: "",
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

  const handleImageURL = (url: string | File) => {
    if (url instanceof File) {
      return URL.createObjectURL(url);
    } else {
      return url;
    }
  };

  return (
    <React.Fragment>
      {/* Dynamic Fields */}
      <h1 className={css.heading}>{title}</h1>
      <div className={css.grid}>
        {inputs.map((data: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <Select
                name="name"
                label={`${title} Name`}
                options={options}
                onChange={(e) => onChangeInputs(index, e)}
                value={data?.name}
              />

              <div
                className="d-flex"
                style={{ alignItems: "end", gap: "15px" }}
              >
                {data?.image && (
                  <Image
                    width={50}
                    height={50}
                    src={handleImageURL(data?.image)}
                    objectFit={"contain"}
                  />
                )}
                <FilePicker
                  name="image"
                  type="file"
                  label={`${title} Image`}
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
      </div>
      <br />
      <AddMoreButton onClick={addInputs} title="Add More Color" />
    </React.Fragment>
  );
};
export default DynamicInputWithImagePicker;

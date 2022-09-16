/* eslint-disable @next/next/no-img-element */
// import Input from "components/admin/context/input";
import Input from "components/element/input";
import { useCreateBedColor } from "network-requests/mutations";
import React from "react";
// import Button from "components/element/button";

import Styles from "styles/order.module.scss";
import extraSpace from "utils/extraspace";
import replacer from "utils/replacer";
import { toast } from "react-toastify";
import imageToUrl from "utils/image2url";
import Button from "components/element/button";

interface InputTypes {
  type: string;
  label: string;
  value: string;
  image: File;
}
const UpdateColor = () => {
  //API POST
  const { mutate } = useCreateBedColor();

  const [inputValue, setInputValue] = React.useState<InputTypes>({
    type: "COLOR",
    label: "",
    value: "",
    image: "" as any,
  });

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      if (!e.target.files) return;
      return setInputValue({
        ...inputValue,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }
  };

  const handleIconUpload = () => {
    if (!inputValue.image || !inputValue.label || !inputValue.value) return;
    mutate(inputValue, {
      onSuccess: (data) => {
        toast.success(data?.message || "Color Icon Added Successfully");
        setInputValue({
          type: "COLOR",
          label: "",
          value: "",
          image: "" as any,
        });
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  React.useEffect(() => {
    setInputValue((prev) => ({
      ...prev,
      value: replacer(inputValue.label),
    }));
  }, [inputValue.label]);

  return (
    <div className="tabcontantinner">
      <h1>Color</h1>
      <div className="box">
        <ul>
          <li>
            <Input
              name="label"
              type="text"
              label={"Name"}
              placeholder="Enter Name"
              value={extraSpace(inputValue.label)}
              onChange={onChangeInputs}
            />
          </li>
          <li>
            <Input
              value={inputValue.value}
              type="text"
              name="value"
              label={"Value"}
              placeholder="auto-generated"
              onChange={onChangeInputs}
            />
          </li>
          <li>
            <Input
              name="image"
              type="file"
              label={"Image"}
              onChange={onChangeInputs}
              imageUrl={imageToUrl(inputValue.image)}
            />
          </li>
        </ul>
        <div className={Styles.buttonsection}>
          <Button onClick={handleIconUpload}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateColor;

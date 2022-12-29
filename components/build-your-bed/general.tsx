import React, { useState } from "react";
import imageToUrl from "utils/image2url";
import { useRouter } from "next/router";
import { VarientsProps } from "typings/variants";
import { useFetchIconsByType } from "network-requests/queries";
import Select from "components/element/select";
import Input from "components/element/input";

interface StateTypes {
  size: string;
  image: string;
  basePrice: string;
  salePrice: string;
}

const General = ({ getValue, value, heading }: VarientsProps) => {
  const router = useRouter();
  //Api call for getting the list of icons
  const [state, setState] = useState<StateTypes>(value);

  const { data = [] } = useFetchIconsByType("COLOR", router.query.id as any);

  const changeHandler = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setState((current: StateTypes) => ({ ...current, [name]: files[0] }));
    } else {
      setState((current: StateTypes) => ({ ...current, [name]: value }));
    }
  };
  React.useEffect(() => {
    setState(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  React.useEffect(() => {
    if (getValue) {
      getValue(state);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // color
  // price
  // image

  return (
    <div className="tabcontantinner">
      {heading && <h2>{heading}</h2>}
      <div className="box">
        <ul>
          <li className="grid-2">
            <Select
              name="color"
              options={[{ label: "Select Bed Color", value: "" }, ...data]}
              label={"Select Color"}
              onChange={changeHandler}
              value={state.color}
            />
            <Input
              type="file"
              name="image"
              label={"Color Image"}
              accept="image/*"
              onChange={changeHandler}
              imageUrl={imageToUrl(state.image as any)}
            />
          </li>
          <li className="grid-2">
            <Input
              name="basePrice"
              type="number"
              label={"Base Price"}
              placeholder="Enter base price"
              onChange={changeHandler}
              value={state.basePrice}
            />
            <Input
              name="salePrice"
              type="number"
              label={"Salling Price"}
              placeholder="Enter sale price"
              onChange={changeHandler}
              value={state.salePrice}
            />
          </li>
        </ul>
        {/* <div className={styles.buttonsection}>
          <Button>Next </Button>
        </div> */}
      </div>
    </div>
  );
};

export default General;

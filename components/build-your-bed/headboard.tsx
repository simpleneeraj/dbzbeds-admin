import React, { useEffect } from "react";
import { VarientsProps } from "typings/variants";
import { useFetchIconsByType } from "network-requests/queries";
import InputFieldWithImage from "components/element/input-field-image";

const HeadBoard = ({ getValue, value, id }: VarientsProps) => {
  const { data = [] } = useFetchIconsByType("HEADBOARD", id as string);

  const [state, setState] = React.useState<any>([]);
  // data[0].label
  // data[0].value
  useEffect(() => {
    getValue(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <InputFieldWithImage
      title={"HeadBoard"}
      label="HeadBoard"
      initialValue={value}
      options={[{ label: "Select a HeadBoard", value: "" }, ...(data as any)]}
      getValue={(value) => setState(value)}
    />
  );
};

export default HeadBoard;

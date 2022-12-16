import React from "react";
import { VarientsProps } from "typings/variants";
import { useFetchIconsByType } from "network-requests/queries";
import InputFieldWithImage from "components/element/input-field-image";

const Feet = ({ getValue, value, id }: VarientsProps) => {
  const { data = [] } = useFetchIconsByType("FEET", id as string);

  console.log({ data });

  const [state, setState] = React.useState<any>(value || []);

  React.useEffect(() => {
    getValue(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  console.log({ FEET: state });
  return (
    <InputFieldWithImage
      title={"Feet"}
      label="Feet"
      initialValue={value}
      options={[{ label: "Select a Feet", value: "" }, ...(data as any)]}
      getValue={(value) => setState(value)}
    />
  );
};

export default Feet;

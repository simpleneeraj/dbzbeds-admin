import React, { useEffect } from "react";
import { VarientsProps } from "typings/variants";
import { useFetchIconsByType } from "network-requests/queries";
import InputFieldWithImage from "components/element/input-field-image";

const Mattress = ({ getValue, value, id }: VarientsProps) => {
  const { data = [] } = useFetchIconsByType("MATTRESS", id as string);
  const [state, setState] = React.useState<any>([]);

  useEffect(() => {
    getValue(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <InputFieldWithImage
      title={"Mattress"}
      label="Mattress"
      initialValue={value}
      options={[{ label: "Select a Mattress", value: "" }, ...(data as any)]}
      getValue={(value) => setState(value)}
    />
  );
};

export default Mattress;

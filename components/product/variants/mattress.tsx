import { useFetchIconsByType } from "network-requests/queries";
import React, { useEffect } from "react";
import { VarientsProps } from "typings/variants";
import DynamicInputFields from "../../element/input-field";

const Mattress = ({ getValue, value, id }: VarientsProps) => {
  const { data = [] } = useFetchIconsByType("MATTRESS", id as string);
  const [state, setState] = React.useState<any>([]);

  useEffect(() => {
    getValue(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <DynamicInputFields
      title={"Mattress"}
      label="Mattress"
      initialValue={value}
      getValue={(value) => setState(value)}
      options={[{ label: "Select a Mattress", value: "" }, ...(data as any)]}
    />
  );
};

export default Mattress;

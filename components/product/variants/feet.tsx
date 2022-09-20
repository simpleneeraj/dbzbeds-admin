import useDeepCompareEffect from "hooks/use-deep-effect";
import { useFetchIconsByType } from "network-requests/queries";
import React from "react";
import { VarientsProps } from "typings/variants";
import DynamicInputFields from "../../element/input-field";

const Feet = ({ getValue, value, id }: VarientsProps) => {
  const { data = [] } = useFetchIconsByType("FEET", id as string);
  const [state, setState] = React.useState<any>([]);

  React.useEffect(() => {
    if (state.length <= 0) {
      setState(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useDeepCompareEffect(() => {
    getValue(state);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return (
    <DynamicInputFields
      title={"Feet"}
      label="Feet"
      initialValue={value}
      options={[{ label: "Select a Feet", value: "" }, ...(data as any)]}
      getValue={(value) => setState(value)}
    />
  );
};

export default Feet;

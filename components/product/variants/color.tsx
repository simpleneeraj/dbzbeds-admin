import React from "react";
import { VarientsProps } from "typings/variants";
import DynamicImagePicker from "components/element/image-picker";
import { useFetchIconsByType } from "network-requests/queries";
import useDeepCompareEffect from "hooks/use-deep-effect";

const Color = ({ getValue, value, id }: VarientsProps) => {
  const { data = [] } = useFetchIconsByType("COLOR", id as string);
  const colors = [{ label: "Select a Color", value: "" }, ...(data as any)];

  const [state, setState] = React.useState<any>([]);

  useDeepCompareEffect(() => {
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
    <React.Fragment>
      <DynamicImagePicker
        title={"Color"}
        options={colors}
        initialValue={state}
        getValue={(value) => setState(value)}
      />
    </React.Fragment>
  );
};

export default Color;

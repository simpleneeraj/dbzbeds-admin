import React from "react";
import { VarientsProps } from "typings/variants";
import useDeepCompareEffect from "hooks/use-deep-effect";
import { useFetchIconsByType } from "network-requests/queries";
import InputFieldWithImage from "components/element/input-field-image";

const Storages = ({ getValue, value, id }: VarientsProps) => {
  const { data = [] } = useFetchIconsByType("STORAGE", id as string);
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
    <InputFieldWithImage
      title={"Storage"}
      label="Storage"
      initialValue={value}
      options={[{ label: "Select a Storage", value: "" }, ...(data as any)]}
      getValue={(value) => setState(value)}
    />
  );
};

export default Storages;

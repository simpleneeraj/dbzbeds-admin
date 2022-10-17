import useDeepCompareEffect from "hooks/use-deep-effect";
import { useFetchIconsByType } from "network-requests/queries";
import React, { useEffect } from "react";
import { VarientsProps } from "typings/variants";
import DynamicInputFields from "../../element/input-field";

const HeadBoard = ({ getValue, value, id }: VarientsProps) => {
    const { data = [] } = useFetchIconsByType("HEADBOARD", id as string);
    console.log({ value, useFetchIconsByTypeHEADBOARD: data });

    const [state, setState] = React.useState<any>([]);
    // data[0].label
    // data[0].value
    useEffect(() => {
        getValue(state);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);
    return (
        <DynamicInputFields
            title={"HeadBoard"}
            label="HeadBoard"
            initialValue={value}
            options={[
                { label: "Select a HeadBoard", value: "" },
                ...(data as any),
            ]}
            getValue={(value) => getValue(value)}
        />
    );
};

export default HeadBoard;

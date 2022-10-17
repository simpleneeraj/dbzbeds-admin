import React from "react";
import { VarientsProps } from "typings/variants";
import DynamicImagePicker from "components/element/image-picker";
import { useFetchIconsByType } from "network-requests/queries";
import useDeepCompareEffect from "hooks/use-deep-effect";
import { useEffect } from "react";

const Color = ({ getValue, value, id }: VarientsProps) => {
    const { data = [] } = useFetchIconsByType("COLOR", id as string);
    const colors = [{ label: "Select a Color", value: "" }, ...(data as any)];

    const [state, setState] = React.useState<any>([]);

    useEffect(() => {
        getValue(state);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);
    return (
        <React.Fragment>
            <DynamicImagePicker
                title={"Color"}
                options={colors}
                initialValue={value}
                getValue={(value) => setState(value)}
            />
        </React.Fragment>
    );
};

export default Color;

import { FeetArray } from "constants/data/bed";
import { useFetchIconsByType } from "network-requests/queries";
import React from "react";
import DynamicInputForm from "../../element/dynamicInputForm";

const HeadBoard = () => {
    const { data = [] } = useFetchIconsByType("HEADBOARD");

    return (
        <DynamicInputForm
            title={"HeadBoard"}
            label="HeadBoard"
            options={[
                { label: "Select a HeadBoard", value: "" },
                ...(data as any),
            ]}
            getValue={(value) => console.log(value)}
        />
    );
};

export default HeadBoard;

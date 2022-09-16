import { FeetArray, MattressArray } from "constants/data/bed";
import { useFetchIconsByType } from "network-requests/queries";
import React from "react";
import DynamicInputForm from "../../element/dynamicInputForm";

const Feet = () => {
    const { data = [] } = useFetchIconsByType("FEET");

    return (
        <DynamicInputForm
            title={"Feet"}
            label="Feet"
            options={[{ label: "Select a Feet", value: "" }, ...(data as any)]}
            getValue={(value) => console.log(value)}
        />
    );
};

export default Feet;

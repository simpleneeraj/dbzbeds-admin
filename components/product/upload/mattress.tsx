import { FeetArray } from "constants/data/bed";
import { useFetchIconsByType } from "network-requests/queries";
import React from "react";
import DynamicInputForm from "../../element/dynamicInputForm";

const Mattress = () => {
    const { data = [] } = useFetchIconsByType("MATTRESS");

    return (
        <DynamicInputForm
            title={"Mattress"}
            label="Mattress"
            options={[
                { label: "Select a Mattress", value: "" },
                ...(data as any),
            ]}
            getValue={(value) => console.log(value)}
        />
    );
};

export default Mattress;

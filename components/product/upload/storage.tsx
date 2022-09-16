import { FeetArray } from "constants/data/bed";
import { useFetchIconsByType } from "network-requests/queries";
import React from "react";
import DynamicInputForm from "../../element/dynamicInputForm";

const Storages = () => {
    const { data = [] } = useFetchIconsByType("STORAGE");

    return (
        <DynamicInputForm
            title={"Storage"}
            label="Storage"
            options={[
                { label: "Select a Storage", value: "" },
                ...(data as any),
            ]}
            getValue={(value) => console.log(value)}
        />
    );
};

export default Storages;

import { FeetArray } from "constants/data/bed";
import React from "react";
import DynamicInputForm from "../../element/dynamicInputForm";

const Storages = () => {
    return (
        <DynamicInputForm
            title={"Storage"}
            label="Storage"
            options={FeetArray}
            getValue={(value) => console.log(value)}
        />
    );
};

export default Storages;

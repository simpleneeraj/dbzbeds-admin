import { FeetArray } from "constants/data/bed";
import React from "react";
import DynamicInputForm from "../../element/dynamicInputForm";

const Mattress = () => {
    return (
        <DynamicInputForm
            title={"Mattress"}
            label="Mattress"
            options={FeetArray}
            getValue={(value) => console.log(value)}
        />
    );
};

export default Mattress;

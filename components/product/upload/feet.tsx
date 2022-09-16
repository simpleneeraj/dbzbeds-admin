import { FeetArray, MattressArray } from "constants/data/bed";
import React from "react";
import DynamicInputForm from "../../element/dynamicInputForm";

const Feet = () => {
    return (
        <DynamicInputForm
            title={"Feet"}
            label="Feet"
            options={FeetArray}
            getValue={(value) => console.log(value)}
        />
    );
};

export default Feet;

import { FeetArray } from "constants/data/bed";
import React from "react";
import DynamicInputForm from "../../element/dynamicInputForm";

const HeadBoard = () => {
    return (
        <DynamicInputForm
            title={"HeadBoard"}
            label="HeadBoard"
            options={FeetArray}
            getValue={(value) => console.log(value)}
        />
    );
};

export default HeadBoard;

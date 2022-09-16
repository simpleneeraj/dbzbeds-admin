import AddMoreButton from "components/element/addmore";

import DynamicInputWithImagePicker from "components/element/dynamicpicker";
import { useFetchIconsByType } from "network-requests/queries";
import React from "react";

const Color = () => {
    const { data = [] } = useFetchIconsByType("COLOR");

    return (
        <React.Fragment>
            <DynamicInputWithImagePicker
                title={"Color"}
                // label="Color"
                options={[
                    { label: "Select a Color", value: "" },
                    ...(data as any),
                ]}
                getState={(value) => console.log(value)}
            />
            <AddMoreButton title="Next" />
            {/* <Colors /> */}
        </React.Fragment>
    );
};

export default Color;
{
    /* <ReactChipInput
              chips={["hello"]}
              classes={""}
              onSubmit={onAddChip}
              onRemove={onRemoveChip}
            /> */
}

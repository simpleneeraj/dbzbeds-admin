import AddMoreButton from "components/element/addmore";
import Colors from "components/element/colors";
import DynamicInputWithImagePicker from "components/element/dynamicpicker";
import React from "react";

const Color = () => {
  return (
    <React.Fragment>
      <DynamicInputWithImagePicker
        title={"Color"}
        // label="Color"
        options={[]}
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

import React from "react";
import Input from "../../element/input";
import Select from "../../element/select";
import AddMoreButton from "../../element/addmore";
import styles from "styles/order.module.scss";

const General = () => {
  return (
    <div className="tabcontantinner">
      <h1>General</h1>
      <div className="box">
        <ul>
          {/* <li>
            <Input type="text" label={"Product Name"} />
          </li>
          <li>
            <Textarea label="Product Description" />
          </li> */}
          <li className="grid-2">
            <Select
              // multiple
              options={[
                { text: "Available Sizes", value: "" },
                { text: "2 Feet", value: "Bye" },
                { text: "3 Feet", value: "Bye" },
                { text: "4 Feet", value: "Bye" },
                { text: "5 Feet", value: "Bye" },
                { text: "6 Feet", value: "Bye" },
                { text: "9 Feet", value: "Bye" },
              ]}
              label={"Select Size"}
            />
            <Input type="file" label={"Featured Image"} accept="image/*" />
          </li>
          <li>
            <Select
              // multiple
              options={[
                { text: "Select", value: "" },
                { text: "Hello", value: "Bye" },
                { text: "Hello", value: "Bye" },
                { text: "Hello", value: "Bye" },
                { text: "Hello", value: "Bye" },
                { text: "Hello", value: "Bye" },
              ]}
              label={"Select Category"}
            />
          </li>
          <li className="grid-2">
            <Input
              type="number"
              label={"Base Price"}
              placeholder="Enter base price"
            />
            <Input
              type="number"
              label={"Salling Price"}
              placeholder="Enter sale price"
            />
          </li>
        </ul>
        <div className={styles.buttonsection}>
          <AddMoreButton title="Next" />
        </div>
      </div>
    </div>
  );
};

export default General;

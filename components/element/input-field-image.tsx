import React from "react";
import Input from "./input";
import Select from "./select";
import AddMoreButton from "./addmore";
import handleImageURL from "utils/image-url";
import styles from "styles/admin.module.scss";

interface InputFields {
  name: string;
  price: string;
  image?: string | File;
}

interface InputFieldWithImageProps {
  title: string;
  options: any[];
  label?: string;
  getValue: (value: InputFields[]) => void;
  initialValue?: InputFields[];
}

function InputFieldWithImage({
  title,
  options,
  getValue,
  initialValue,
  label,
}: InputFieldWithImageProps) {
  const [inputFields, setInputFields] = React.useState<InputFields[]>([]);

  const handleFormChange = (index: number, event: any) => {
    let data = [...inputFields] as any;
    if (event.target.name === "image") {
      const file = event.target.files ? event.target.files[0] : null;
      data[index][event.target.name] = file;
    } else {
      data[index][event.target.name] = event.target.value;
    }
    setInputFields(data);
    getValue(data);
  };

  const addFields = () => {
    let object = { name: "", price: "" };
    setInputFields([...inputFields, object]);
    getValue([...inputFields, object]);
  };

  const removeFields = (index: number) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
    getValue(data);
  };

  React.useEffect(() => {
    if (initialValue && initialValue?.length > 0) {
      setInputFields(initialValue);
    }
  }, [initialValue]);

  options?.map((item) => {
    if (item?._id) {
      item.value = item._id;
    }
  });

  return (
    <React.Fragment>
      {/* Dynamic Fields */}
      {title && <h2 className={styles.heading}>{title}</h2>}
      <div className={styles.grid} style={{ gridTemplateColumns: "1fr 2fr" }}>
        {inputFields.map((data: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <Select
                name="name"
                label={`${label} Name`}
                options={options}
                onChange={(e) => handleFormChange(index, e)}
                value={data?.name?._id}
              />
              <div
                className="d-flex"
                style={{ flex: 2, alignItems: "center", gap: "0.4rem" }}
              >
                <Input
                  name="price"
                  type="number"
                  label={`${label} Price`}
                  placeholder="Enter product price"
                  value={data?.price}
                  onChange={(e) => handleFormChange(index, e)}
                  style={{ width: "100%" }}
                />
                <Input
                  name="image"
                  type="file"
                  deletable
                  label={`${title} Image`}
                  // style={{ width: "100%" }}
                  onChange={(e) => handleFormChange(index, e)}
                  onDelete={() => removeFields(index)}
                  imageUrl={handleImageURL(data?.image)}
                />
              </div>
            </React.Fragment>
          );
        })}
        <AddMoreButton onClick={addFields} title={`Add More ${label}`} />
      </div>
    </React.Fragment>
  );
}

export default InputFieldWithImage;

// let data = [...inputFields] as any;
// data[index][event.target.name] = event.target.value;
// setInputFields(data);
// getValue(data);

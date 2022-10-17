/* eslint-disable @next/next/no-img-element */
import useDeepEffect from "hooks/use-deep-effect";
import React from "react";
import { useEffect } from "react";
import styles from "styles/admin.module.scss";
import AddMoreButton from "./addmore";
import Input from "./input";
import Select from "./select";

interface InputFields {
    name: string;
    image: File | null;
}

interface DynamicInputProps {
    title: string;
    options: any[];
    getValue: (value: InputFields[]) => void;
    initialValue?: InputFields[];
}

function DynamicImagePicker({
    title,
    options,
    getValue,
    initialValue,
}: DynamicInputProps) {
    const [inputFields, setInputFields] = React.useState<InputFields[]>([
        { name: "", image: null },
    ]);

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
        let object = { name: "", image: null };
        setInputFields([...inputFields, object]);
        getValue([...inputFields, object]);
    };

    const removeFields = (index: number) => {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
        getValue(data);
    };

    const handleImageURL = (url: string | File) => {
        if (typeof File !== "undefined")
            if (url instanceof File) {
                return URL.createObjectURL(url);
            } else {
                return url;
            }
    };

    options?.map((item) => {
        if (item?._id) {
            item.value = item._id;
        }
    });

    useEffect(() => {
        if (initialValue && initialValue?.length > 0) {
            setInputFields(initialValue);
        }
    }, [initialValue]);

    return (
        <React.Fragment>
            {/* Dynamic Fields */}
            <h1 className={styles.heading}>{title}</h1>
            <div className={styles.grid}>
                {inputFields.map((data: any, index: number) => {
                    return (
                        <React.Fragment key={index}>
                            <Select
                                name="name"
                                label={`${title} Name`}
                                options={options}
                                onChange={(e) => handleFormChange(index, e)}
                                value={data?.name}
                            />
                            <Input
                                name="image"
                                type="file"
                                label={`${title} Image`}
                                placeholder="Enter product name"
                                onChange={(e) => handleFormChange(index, e)}
                                deletable
                                onDelete={() => removeFields(index)}
                                style={{ width: "100%" }}
                                imageUrl={handleImageURL(data?.image)}
                            />
                        </React.Fragment>
                    );
                })}
                <AddMoreButton
                    onClick={addFields}
                    title={`Add More ${title}`}
                />
            </div>
        </React.Fragment>
    );
}

export default DynamicImagePicker;

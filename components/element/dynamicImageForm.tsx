import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "styles/admin.module.scss";
import AddMoreButton from "./addmore";
import Input from "./input";
import FilePicker from "./picker";
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

function DynamicImageForm({
    title,
    options,
    getValue,
    initialValue,
}: DynamicInputProps) {
    const [inputFields, setInputFields] = useState<InputFields[]>([
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
    };

    const addFields = () => {
        let object = { name: "", image: null };
        setInputFields([...inputFields, object]);
    };

    const removeFields = (index: number) => {
        let data = [...inputFields];
        data.splice(index, 1);
        setInputFields(data);
    };

    const handleImageURL = (url: string | File) => {
        if (url instanceof File) {
            return URL.createObjectURL(url);
        } else {
            return url;
        }
    };

    useEffect(() => {
        if (initialValue && initialValue?.length > 0) {
            setInputFields(initialValue);
        }
    }, [initialValue]);

    useEffect(() => {
        getValue(inputFields);
    }, [inputFields]);

    return (
        <React.Fragment>
            {/* Dynamic Fields */}
            <h4 className={styles.heading}>{title}</h4>
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

                            <div
                                className="d-flex"
                                style={{ alignItems: "center" }}
                            >
                                <div
                                    className="d-flex"
                                    style={{ alignItems: "center" }}
                                >
                                    {data?.image && (
                                        <Image
                                            width={50}
                                            height={50}
                                            src={handleImageURL(data?.image)}
                                            objectFit={"contain"}
                                            alt="image"
                                        />
                                    )}
                                    <FilePicker
                                        name="image"
                                        type="file"
                                        label={`${title} Image`}
                                        placeholder="Enter product name"
                                        onChange={(e) =>
                                            handleFormChange(index, e)
                                        }
                                        deletable
                                        onDelete={() => removeFields(index)}
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </div>
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

export default DynamicImageForm;

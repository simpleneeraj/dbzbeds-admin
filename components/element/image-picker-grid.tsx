/* eslint-disable @next/next/no-img-element */
import React from "react";
import AddIcon from "icons/add";
import { useEffect } from "react";
import css from "styles/picker.module.scss";
import DeleteIcon from "icons/delete";
import EditIcon from "icons/edit";
import AddImage from "icons/AddImage";

interface DynamicInputProps {
    title?: string;
    getValue: (value: any) => void;
    initialValue?: any;
}

function DynamicImageGrid({ getValue, initialValue }: DynamicInputProps) {
    const [inputFields, setInputFields] = React.useState<any[]>([]);

    const handleFormChange = (index: number, event: any) => {
        let data = [...inputFields] as any;
        data[index] = event.target.files[0];
        setInputFields(data);
        getValue(data);
    };

    const addFields = () => {
        setInputFields([...inputFields, ""]);
        getValue([...inputFields, ""]);
    };

    const removeFields = (index: number) => {
        if (window.confirm("Are you sure to delete this file?")) {
            let data = [...inputFields];
            data.splice(index, 1);
            setInputFields(data);
            getValue(data);
        }
    };

    const handleImageURL = React.useCallback((url: string | File) => {
        if (typeof File !== "undefined")
            if (url instanceof File) {
                return URL.createObjectURL(url);
            } else {
                return url;
            }
    }, []);

    useEffect(() => {
        if (initialValue && initialValue?.length > 0) {
            setInputFields(initialValue);
        }
    }, [initialValue]);

    return (
        <React.Fragment>
            <div className={css.container}>
                {inputFields.map((data, index) => {
                    const imagePickerId = `image-${index}`;
                    return (
                        <div key={index} className={css["input-card"]}>
                            <div className={css["picker"]}>
                                <input
                                    type="file"
                                    id={imagePickerId}
                                    onChange={(e) => handleFormChange(index, e)}
                                />
                                {data ? (
                                    <React.Fragment>
                                        <img
                                            src={handleImageURL(data)}
                                            alt=""
                                        />
                                        <div className={css["controls"]}>
                                            <label htmlFor={imagePickerId}>
                                                <span
                                                    className={
                                                        css["delete-icon"]
                                                    }
                                                >
                                                    <EditIcon
                                                        height={18}
                                                        width={18}
                                                        color="#222"
                                                    />
                                                </span>
                                            </label>
                                            <span
                                                className={css["delete-icon"]}
                                                onClick={() =>
                                                    removeFields(index)
                                                }
                                            >
                                                <DeleteIcon
                                                    height={16}
                                                    width={16}
                                                    color="#222"
                                                />
                                            </span>
                                        </div>
                                    </React.Fragment>
                                ) : (
                                    <label
                                        className={css["add-card"]}
                                        htmlFor={imagePickerId}
                                    >
                                        <AddImage
                                            height={24}
                                            width={24}
                                            color="#222"
                                        />
                                        <p>Pick Image</p>
                                    </label>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div className={css["input-card"]}>
                    <div
                        className={`${css["add-card"]} ${css["picker"]}`}
                        onClick={addFields}
                    >
                        <label>
                            <AddIcon height={24} width={24} color="#222" />
                            <p>Add More</p>
                        </label>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DynamicImageGrid;

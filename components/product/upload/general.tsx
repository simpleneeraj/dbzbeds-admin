import React, { useEffect, useState } from "react";
import Input from "../../element/input";
import Select from "../../element/select";
import AddMoreButton from "../../element/addmore";
import styles from "styles/order.module.scss";
import ChipInput from "components/chip-input";
import { useFetchIconsByType } from "network-requests/queries";
import { sizes } from "constants/varients";

interface Props {
    onChange: (e: any) => void;
    value?: any;
}

const General = ({ onChange, value }: Props) => {
    //Api call for getting the list of icons
    const { data = [] } = useFetchIconsByType("SIZE");

    const [state, setState] = useState({
        size: "",
        image: "",
        category: [],
        basePrice: "",
        salePrice: "",
    });

    const changeHandler = (e: any) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setState((current) => ({ ...current, [name]: files[0] }));
        } else {
            setState((current) => ({ ...current, [name]: value }));
        }
    };

    const handleChipsChange = (chips: any) => {
        setState((current) => ({ ...current, category: chips }));
    };

    useEffect(() => {
        onChange(state);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    return (
        <div className="tabcontantinner">
            <h1>General</h1>
            <div className="box">
                <ul>
                    <li className="grid-2">
                        <Select
                            // multiple
                            name="size"
                            onChange={changeHandler}
                            options={[
                                { label: "Select Bed Size", value: "" },
                                ...(data as any),
                            ]}
                            label={"Select Size"}
                        />
                        <Input
                            type="file"
                            name="image"
                            label={"Featured Image"}
                            accept="image/*"
                            onChange={changeHandler}
                        />
                    </li>
                    <li>
                        <br />
                        <label>Category</label>
                        <ChipInput onChange={handleChipsChange} />
                    </li>
                    <li className="grid-2">
                        <Input
                            name="basePrice"
                            type="number"
                            label={"Base Price"}
                            placeholder="Enter base price"
                            onChange={changeHandler}
                        />
                        <Input
                            name="salePrice"
                            type="number"
                            label={"Salling Price"}
                            placeholder="Enter sale price"
                            onChange={changeHandler}
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

/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import id from "utils/id";

const useIn = <T>(initialState: T[]) => {

    const [inputs, setInputs] = React.useState<T[]>(initialState);
    const draft = [...(inputs as any)] as any;

    //Change On Initial Input
    // React.useEffect(() => {
    //     if (initialState) {
    //         setInputs(initialState);
    //     }
    // }, [initialState]);

    // CHANGE
    const onChangeInputs = (index: number, event: any) => {
        draft[index][event.target.name] = event.target.value;
        if (event.target.name === "image") {
            const file = event.target.files[0];
            // const blob = URL.createObjectURL(file);
            draft[index][event.target.name] = file;
            setInputs(draft);
        } else {
            draft[index][event.target.name] = event.target.value;
            setInputs(draft);
        }
    };
    // ADD
    const addInputs = () => {
        const addFields = {
            id: id(4),
            name: "",
            image: "",

        };

        draft.push(addFields);
        setInputs(draft);
    };
    // REMOVE
    const removeInputs = (id: string) => {
        if (id) {
            // @ts-ignore
            const filter = inputs.filter((v: T) => v.id !== id);
            setInputs(filter);
        }
    };

    // const handleImageURL = (url: string | File) => {
    //     if (url instanceof File) {
    //         return URL.createObjectURL(url);
    //     } else {
    //         return url;
    //     }
    // };

    // Return Values
    return {
        inputs,
        addInputs,
        removeInputs,
        onChangeInputs,
        // handleImageURL,
    }

}
export default useIn;
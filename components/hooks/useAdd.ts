import React from 'react';
import id from 'utils/id';


const useAdd = <T>(initialState: T) => {
    const [inputs, setInputs] = React.useState<typeof initialState>(initialState);
    const draft = [...inputs as any] as any;
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
            ...inputs,
            id: id(4),
        };
        // @ts-ignore

        setInputs((draft) => [...draft, addFields]);
    };
    // REMOVE
    const removeInputs = (id: string) => {
        if (id) {
            const filter = draft.filter((v: { id: string; }) => v.id !== id);
            setInputs(filter);
        }
    };

    // Return Values
    return { inputs, onChangeInputs, addInputs, removeInputs }

}
export default useAdd;
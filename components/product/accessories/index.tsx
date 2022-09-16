// FOR COLOR
import AddColor from "./create/color";
import AddFeet from "./create/feet";
import AddHeadBoard from "./create/headBoard";
import AddMattress from "./create/mattress";
import AddSize from "./create/size";
import AddStorage from "./create/storage";
import IconList from "./list";

export const AddAccessoriesTabs = ({ tabName }: any) => {
    switch (tabName) {
        case "Color":
            return <AddColor />;
        case "Size":
            return <AddSize />;
        case "HeadBoard":
            return <AddHeadBoard />;
        case "Storage":
            return <AddStorage />;
        case "Feet":
            return <AddFeet />;
        case "Mattress":
            return <AddMattress />;
        default:
            return null;
    }
};

export const ListAccessoriesTabs = ({ tabName }: any) => {
    switch (tabName) {
        case "Color":
            return <IconList type="COLOR" />;
        case "Size":
            return <IconList type="SIZE" />;
        case "HeadBoard":
            return <IconList type="HEADBOARD" />;
        case "Storage":
            return <IconList type="STORAGE" />;
        case "Feet":
            return <IconList type="FEET" />;
        case "Mattress":
            return <IconList type="MATTRESS" />;
        default:
            return null;
    }
};

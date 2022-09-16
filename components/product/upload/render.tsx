import Color from "./color";
import Feet from "./feet";
import General from "./general";
import HeadBoard from "./headBoard";
import Mattress from "./mattress";
import Storages from "./storage";

const AccessoriesTabs = ({ tabName, onChange }: any) => {
    switch (tabName) {
        case "Basic":
            return <General onChange={onChange} />;
        case "Color":
            return <Color />;
        case "HeadBoard":
            return <HeadBoard />;
        case "Storage":
            return <Storages />;
        case "Feet":
            return <Feet />;
        case "Mattress":
            return <Mattress />;
        default:
            return null;
    }
};

export default AccessoriesTabs;

// FOR COLOR
import AddColor from "./create/color";
import AddFeet from "./create/feet";
import AddHeadBoard from "./create/headBoard";
import AddMattress from "./create/mattress";
import AddSize from "./create/size";
import AddStorage from "./create/storage";
import AccessoriesList from "./list";

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

export const UpdateAccessoriesTabs = ({ tabName }: any) => {
  switch (tabName) {
    case "Color":
      return <AccessoriesList type="COLOR" />;
    case "Size":
      return <AccessoriesList type="SIZE" />;
    case "HeadBoard":
      return <AccessoriesList type="HEADBOARD" />;
    case "Storage":
      return <AccessoriesList type="STORAGE" />;
    case "Feet":
      return <AccessoriesList type="FEET" />;
    case "Mattress":
      return <AccessoriesList type="MATTRESS" />;
    default:
      return null;
  }
};

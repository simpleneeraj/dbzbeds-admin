import React from "react";
import styles from "styles/order.module.scss";
import { productSideTab } from "constants/sidetab";
import DashboardHeader from "layout/header";
import { VariantsActions } from "context/variant/create";
import General from "components/product/variants/general";
import Color from "components/product/variants/color";
import Storages from "components/product/variants/storage";
import Feet from "components/product/variants/feet";
import Mattress from "components/product/variants/mattress";
import HeadBoard from "components/product/variants/headboard";
import { useUpdateBedVariant } from "network-requests/mutations";
import { useRouter } from "next/router";
import pMap from "p-map";

import { uploadBedImage } from "network-requests/api";
import Button from "components/element/button";
import {
  UpdateVariantContext,
  UpdateVariantProvider,
} from "context/variant/update";

interface AccessoriesTabsProps {
  id: string;
  tabName: string;
}
function CreateVariant() {
  const router = useRouter();
  const id = router.query?.id as string;

  return (
    <UpdateVariantProvider id={id}>
      <Create />
    </UpdateVariantProvider>
  );
}

export default CreateVariant;

const Create = () => {
  const { state } = React.useContext(UpdateVariantContext);
  const [activeTab, setActiveTab] = React.useState("Basic");

  const onActiveTab = (value: string) => {
    setActiveTab(value);
  };

  const router = useRouter();
  const id = router.query?.id as string;

  const { mutate } = useUpdateBedVariant(id);

  const handleProductUpdate = async () => {
    const baseImage = !state.general.image
      ? null
      : (await uploadBedImage(state.general.image as unknown as Blob)).url;

    const getImageUrlAndName = async (color: any) => {
      if (color.image) {
        console.log({ first: color.image });
        const imageUrl = (await uploadBedImage(color.image as Blob)).url;
        return {
          name: color?.name,
          image: imageUrl,
        };
      }
      return {
        name: color?.name,
        image: null,
      };
    };
    const colorWithUrlAndName = await pMap(state.color, getImageUrlAndName);

    mutate({
      price: {
        basePrice: state.general.basePrice,
        salePrice: state.general.basePrice,
      },
      size: state.general.size,
      image: baseImage,
      accessories: {
        color: colorWithUrlAndName as any,
        storage: state.storage,
        feet: state.feet,
        headboard: state.headboard,
        mattress: state.mattress,
      },
    });
  };

  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      <main className={styles.main}>
        <div className={styles.containerbox}>
          <div className={styles.mainheading}>Create Variant</div>
          <div
            className={` ${styles.tablebox} ${styles.mt2} ${styles.productuploadtabbox}`}
          >
            <ul className={styles.productuploadtab}>
              {productSideTab.map(({ text }, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => onActiveTab(text)}
                    className={text === activeTab ? styles.active : ""}
                  >
                    {text}
                  </li>
                );
              })}
            </ul>
            <div className={styles.tabbox}>
              <AccessoriesTabs id={id} tabName={activeTab} />
            </div>
          </div>
          <div className="grid">
            <Button onClick={handleProductUpdate}>Submit Data</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

const AccessoriesTabs = ({ tabName, id }: AccessoriesTabsProps) => {
  const { state, dispatch } = React.useContext(UpdateVariantContext);
  const { color, feet, headboard, mattress, general, storage } = state;

  // console.log(state);
  switch (tabName) {
    case "Basic":
      return (
        <General
          id={id}
          getValue={(v) => dispatch(VariantsActions.GENERAL(v))}
          value={general}
        />
      );
    case "Color":
      return (
        <Color
          id={id}
          getValue={(v) => dispatch(VariantsActions.COLOR(v))}
          value={color}
        />
      );
    case "HeadBoard":
      return (
        <HeadBoard
          id={id}
          getValue={(v) => dispatch(VariantsActions.HEADBOARD(v))}
          value={headboard}
        />
      );
    case "Storage":
      return (
        <Storages
          id={id}
          getValue={(v) => dispatch(VariantsActions.STORAGE(v))}
          value={storage}
        />
      );
    case "Feet":
      return (
        <Feet
          id={id}
          getValue={(v) => dispatch(VariantsActions.FEET(v))}
          value={feet}
        />
      );
    case "Mattress":
      return (
        <Mattress
          id={id}
          getValue={(v) => dispatch(VariantsActions.MATTRESS(v))}
          value={mattress}
        />
      );
    default:
      return null;
  }
};

import React from "react";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";
import {
  VariantsActions,
  VariantsContext,
  VariantsProvider,
} from "context/variant/create";
import General from "components/product/variants/general";
import Color from "components/product/variants/color";
import Storages from "components/product/variants/storage";
import Feet from "components/product/variants/feet";
import Mattress from "components/product/variants/mattress";
import HeadBoard from "components/product/variants/headboard";
import { useCreateNewBedVariant } from "network-requests/mutations";
import { useRouter } from "next/router";
import pMap from "p-map";
import { uploadBedImage } from "network-requests/api";
import Button from "components/element/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useFetchBedVariantsById,
  useFetchHeadboardVariantById,
} from "network-requests/queries";

interface AccessoriesTabsProps {
  tabName: string;
  id: string;
}
function CreateVariant() {
  return (
    <VariantsProvider>
      <Create />
    </VariantsProvider>
  );
}

export default CreateVariant;

const Create = () => {
  const { state, dispatch } = React.useContext(VariantsContext);
  const { color, feet, headboard, mattress, general, storage } = state;
  const router = useRouter();
  const id = router.query?.id as string;

  // const [activeTab, setActiveTab] = React.useState("Basic");
  // const onActiveTab = (value: string) => {
  //   setActiveTab(value);
  // };

  console.log({ state });

  const { refetch } =
    router.pathname === "/headboard/variants/update"
      ? // eslint-disable-next-line react-hooks/rules-of-hooks
        (useFetchHeadboardVariantById(id) as any)
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        (useFetchBedVariantsById(id) as any);

  const { mutate } = useCreateNewBedVariant(id);

  const handleProductUpload = async () => {
    const baseImage = !state.general.image
      ? null
      : ((await uploadBedImage(state.general.image as unknown as Blob)) as any);

    const getImageUrlAndName = async (color: any) => {
      if (color.image) {
        // console.log({ first: color.image });
        const imageUrl = await uploadBedImage(color.image as Blob);
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

    mutate(
      {
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
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Varient Created Successfully");
          router.reload();
        },
      }
    );
  };

  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      <ToastContainer />

      <div className={styles.mainheading}>Create Variant</div>
      <main className={styles.main}>
        <div className={styles.containerbox}>
          {/* <div
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
          </div> */}

          <div
            style={{
              marginTop: "10px",
              background: "#fff",
              padding: ".5rem",
              width: "100%",
            }}
          >
            <General
              id={id}
              getValue={(v) => dispatch(VariantsActions.GENERAL(v))}
              value={general}
            />

            <Color
              id={id}
              getValue={(v) => dispatch(VariantsActions.COLOR(v))}
              value={color}
            />
            <HeadBoard
              id={id}
              getValue={(v) => dispatch(VariantsActions.HEADBOARD(v))}
              value={headboard}
            />
            <Storages
              id={id}
              getValue={(v) => dispatch(VariantsActions.STORAGE(v))}
              value={storage}
            />
            <Feet
              id={id}
              getValue={(v) => dispatch(VariantsActions.FEET(v))}
              value={feet}
            />
            <Mattress
              id={id}
              getValue={(v) => dispatch(VariantsActions.MATTRESS(v))}
              value={mattress}
            />
          </div>
          <div className="grid">
            <Button onClick={handleProductUpload}>Submit Data</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

// const AccessoriesTabs = ({ tabName, id }: AccessoriesTabsProps) => {
//   const { state, dispatch } = React.useContext(VariantsContext);
//   const { color, feet, headboard, mattress, general, storage } = state;

//   // console.log(state);
//   switch (tabName) {
//     case "Basic":
//       return (
//         <General
//           id={id}
//           getValue={(v) => dispatch(VariantsActions.GENERAL(v))}
//           value={general}
//         />
//       );
//     case "Color":
//       return (
//         <Color
//           id={id}
//           getValue={(v) => dispatch(VariantsActions.COLOR(v))}
//           value={color}
//         />
//       );
//     case "HeadBoard":
//       return (
//         <HeadBoard
//           id={id}
//           getValue={(v) => dispatch(VariantsActions.HEADBOARD(v))}
//           value={headboard}
//         />
//       );
//     case "Storage":
//       return (
//         <Storages
//           id={id}
//           getValue={(v) => dispatch(VariantsActions.STORAGE(v))}
//           value={storage}
//         />
//       );
//     case "Feet":
//       return (
//         <Feet
//           id={id}
//           getValue={(v) => dispatch(VariantsActions.FEET(v))}
//           value={feet}
//         />
//       );
//     case "Mattress":
//       return (
//         <Mattress
//           id={id}
//           getValue={(v) => dispatch(VariantsActions.MATTRESS(v))}
//           value={mattress}
//         />
//       );
//     default:
//       return null;
//   }
// };

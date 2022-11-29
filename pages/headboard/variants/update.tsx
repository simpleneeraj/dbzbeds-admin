import React, { useEffect, useState } from "react";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";
import { VariantsActions } from "context/variant/create";
import General from "components/product/variants/general";
import Color from "components/product/variants/color";
import Storages from "components/product/variants/storage";
import Feet from "components/product/variants/feet";
import Mattress from "components/product/variants/mattress";
import HeadBoard from "components/product/variants/headboard";
import {
  useUpdateBedVariant,
  useUpdateHeadboardVariant,
} from "network-requests/mutations";
import { useRouter } from "next/router";
import pMap from "p-map";

import { uploadBedImage } from "network-requests/api";
import Button from "components/element/button";
import {
  UpdateVariantContext,
  UpdateVariantProvider,
} from "context/variant/update";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { state, dispatch } = React.useContext(UpdateVariantContext);
  const { color, feet, headboard, mattress, general, storage } = state;
  // const [activeTab, setActiveTab] = React.useState("Basic");
  console.log({ state });
  const router = useRouter();
  const id = router.query?.id as string;
  const { mutate } = useUpdateHeadboardVariant(id);
  const [isDraft, setIsDraft] = useState(false);

  const handleProductUpdate = async () => {
    const baseImage =
      typeof state.general.image === "string"
        ? state.general.image
        : await uploadBedImage(state.general.image as unknown as Blob);

    const getImageUrlAndName = async (color: any) => {
      console.log({ color });
      if (color.image) {
        console.log({ first: color.image });
        const imageUrl =
          typeof color.image === "string"
            ? color.image
            : await uploadBedImage(color.image as Blob);
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

    console.log({ colorWithUrlAndName });

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
        },
        isDraft: isDraft,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Varient Created Successfully");
        },
      }
    );
  };

  useEffect(() => {
    setIsDraft(state.general?.isDraft);
  }, [state.general?.isDraft]);

  console.log({ headboardInitial: headboard, storage });

  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      <ToastContainer />
      <main className={styles.main}>
        <div className={styles.containerbox}>
          <div className={styles.mainheading}>Create Variant</div>
          <div
            style={{
              marginTop: "10px",
              background: "#fff",
              padding: ".5rem",
            }}
          >
            is draft
            <input
              type="checkbox"
              checked={isDraft}
              onChange={(e) => setIsDraft(e.target.checked)}
            />
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
            {/* <HeadBoard
                            id={id}
                            getValue={(v) =>
                                dispatch(VariantsActions.HEADBOARD(v))
                            }
                            value={headboard}
                        />
                        <Storages
                            id={id}
                            getValue={(v) =>
                                dispatch(VariantsActions.STORAGE(v))
                            }
                            value={storage}
                        />
                        <Feet
                            id={id}
                            getValue={(v) => dispatch(VariantsActions.FEET(v))}
                            value={feet}
                        />
                        <Mattress
                            id={id}
                            getValue={(v) =>
                                dispatch(VariantsActions.MATTRESS(v))
                            }
                            value={mattress}
                        /> */}
          </div>
          <div className="grid">
            <Button onClick={handleProductUpdate}>Submit Data</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

// const AccessoriesTabs = ({ tabName, id }: AccessoriesTabsProps) => {
//   const { state, dispatch } = React.useContext(UpdateVariantContext);
//   const { color, feet, headboard, mattress, general, storage } = state;

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

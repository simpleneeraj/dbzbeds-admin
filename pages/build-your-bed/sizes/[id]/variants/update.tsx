import React, { useEffect } from "react";
import { useRouter } from "next/router";
import DashboardHeader from "layout/header";
import styles from "styles/order.module.scss";
import Feet from "components/build-your-bed/feet";
import Storages from "components/build-your-bed/storage";
import Mattress from "components/build-your-bed/mattress";
import HeadBoard from "components/build-your-bed/headboard";
import Button from "components/element/button";
import Toast from "components/toast";
import General from "components/build-your-bed/general";
import { UpdateYourBedProvider } from "context/bed-builder/update";
import useUpdateYourBed from "context/bed-builder/use-update-your-bed";
import { useGetBuildYourBedsVariantColorsById } from "network-requests/queries";
import pMap from "p-map";
import { uploadBedImage } from "network-requests/api";
import { toast } from "react-toastify";
import { updateBuildYourBedVariantColorById } from "network-requests/api/build-your-bed";
import { useUpdateBuildYourBedVariantColorById } from "network-requests/mutations";

function UpdateVariant() {
  return (
    <UpdateYourBedProvider id={""}>
      <_UpdateVariant />;
    </UpdateYourBedProvider>
  );
}

function _UpdateVariant() {
  const router = useRouter();
  const id = router.query?.colorId as string;
  const { onUpdate, yourBedState } = useUpdateYourBed();
  const { data } = useGetBuildYourBedsVariantColorsById(id);
  const { mutate } = useUpdateBuildYourBedVariantColorById(id);

  console.log({ yourBedState });

  useEffect(() => {
    if (data) {
      onUpdate("general", {
        basePrice: data?.price,
        salePrice: data?.price,
        color: data?.color,
        image: data?.image,
      });
      onUpdate("feet", data?.feet);
      onUpdate("headboard", data?.headboard);
      onUpdate("mattress", data?.mattress);
      onUpdate("storage", data?.storage);
    }
  }, [data, onUpdate]);

  const handleProductUpload = async () => {
    const baseImage =
      typeof yourBedState?.general?.image === "string"
        ? yourBedState.general.image
        : await uploadBedImage(yourBedState?.general?.image as unknown as Blob);

    const getImageUrlAndName = async (color: any) => {
      if (color.image) {
        const imageUrl =
          typeof color.image === "string"
            ? color.image
            : await uploadBedImage(color.image as Blob);
        return {
          name: color?.name,
          price: color?.price,
          image: imageUrl,
        };
      }
      return {
        name: color?.name,
        price: color?.price,
        image: null,
      };
    };

    const uploadHeadboardImages = await pMap(
      yourBedState.headboard as any,
      getImageUrlAndName
    );

    const uploadMattressImages = await pMap(
      yourBedState.mattress as any,
      getImageUrlAndName
    );

    const uploadStorageImages = await pMap(
      yourBedState.storage as any,
      getImageUrlAndName
    );

    const uploadFeetImages = await pMap(
      yourBedState.feet as any,
      getImageUrlAndName
    );

    mutate(
      {
        color: yourBedState?.general?.color || "",
        price: yourBedState?.general?.salePrice,
        image: baseImage,
        storage: uploadStorageImages as any,
        feet: uploadFeetImages as any,
        headboard: uploadHeadboardImages as any,
        mattress: uploadMattressImages as any,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Varient Created Successfully");
          router.reload();
        },
      }
    );
  };

  console.log({ data, id });
  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      <Toast />
      <div className={styles.mainheading}>Create Variant</div>
      <div className={styles.containerbox}>
        <div className={styles["innner-container"]}>
          <General
            id={id}
            heading="General"
            value={yourBedState?.general || {}}
            getValue={(value) => onUpdate("general", value)}
          />
        </div>
        <div className={styles["innner-container"]}>
          <Feet
            id={id}
            value={yourBedState.feet}
            getValue={(value) => onUpdate("feet", value)}
          />
        </div>
        <div className={styles["innner-container"]}>
          <HeadBoard
            id={id}
            value={yourBedState.headboard}
            getValue={(value) => onUpdate("headboard", value)}
          />
        </div>
        <div className={styles["innner-container"]}>
          <Mattress
            id={id}
            value={yourBedState.mattress}
            getValue={(value) => onUpdate("mattress", value)}
          />
        </div>
        <div className={styles["innner-container"]}>
          <Storages
            id={id}
            value={yourBedState.storage}
            getValue={(value) => onUpdate("storage", value)}
          />
        </div>
        <div className={styles.mainheading}>
          <Button onClick={handleProductUpload}>Submit Data</Button>
        </div>
      </div>
    </div>
  );
}

export default UpdateVariant;

// const { state, dispatch } = React.useContext(VariantsContext);
// const { general } = state;
// const { mutate } = useCreateBuildYourBedVariantById(id);

// const handleProductUpload = async () => {
//   const baseImage = !state.general.image
//     ? null
//     : ((await uploadBedImage(state.general.image as unknown as Blob)) as any);

//   mutate(
//     {
//       price: {
//         basePrice: state.general.basePrice,
//         salePrice: state.general.basePrice,
//       },
//       size: state.general.size,
//       image: baseImage,
//     },
//     {
//       onSuccess: (data) => {
//         toast.success(data?.message || "Varient Created Successfully");
//         router.reload();
//       },
//     }
//   );
// };

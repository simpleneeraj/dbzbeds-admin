import React from "react";
import { useRouter } from "next/router";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";
import Button from "components/element/button";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import General from "components/product/variants/general";

function CreateColor() {
  const router = useRouter();
  const id = router.query?.id as string;

  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      <ToastContainer />
      <div className={styles.mainheading}>Create Size</div>
      <main className={styles.main}>
        <div className={styles.containerbox}>
          <div className={styles["innner-container"]}>
            <General id={id} getValue={(v) => console.log(v)} value={{}} />
          </div>
          <div className={styles.mainheading}>
            <Button>Submit Data</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateColor;

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

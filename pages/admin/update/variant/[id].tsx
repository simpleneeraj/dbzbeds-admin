/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { isValidObjectId } from "mongoose";
import AdminLayout from "layout";
import { useFetchBedVariantsById } from "network-requests/queries";
import AddMoreButton from "components/element/addmore";
import css from "styles/admin.module.scss";
import Input from "components/element/input";
import FilePicker from "components/element/picker";
import { useUpdateBedVariant } from "network-requests/mutations";
import { uploadBedImage } from "network-requests/api";
import DynamicInputWithImagePicker from "components/element/dynamicpicker";
import pMap from "p-map";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import updateBedSlice from "components/admin/context/update";
import {
  FeetArray,
  HeadboardArray,
  MattressArray,
  StorageArray,
  colorArray,
} from "constants/data/bed";
import DynamicInputForm from "components/element/dynamicInputForm";

interface AddNewVarientsProps {
  id: string;
}

const AddNewVarients = ({ id }: AddNewVarientsProps) => {
  // REDUCER FOR REDUCE CODE

  // const { actions, reducer, initialState } = updateBedSlice;

  // @ts-ignore
  // const [state, dispatch] = React.useReducer(reducer, initialState);
  const [currentInfo, setCurrentInfo] = React.useState({
    basePrice: 0,
    salePrice: 0,
    image: "" as any,
  });

  //LOCAL DATA
  const [colorInput, setColorInput] = React.useState<any>();

  const [headboardInputs, setHeadboardInputs] = React.useState<any>([]);
  const [feetInputs, setFeetInputs] = React.useState<any>([]);
  const [mattressInputs, setMattressInputs] = React.useState<any>([]);
  const [storageInputs, setStorageInputs] = React.useState<any>([]);

  //API DATA
  const [apiColorInput, setApiColorInput] = React.useState<any>();

  const [apiHeadboardInputs, setApiHeadboardInputs] = React.useState<any>([]);
  const [apiFeetInputs, setApiFeetInputs] = React.useState<any>([]);
  const [apiMattressInputs, setApiMattressInputs] = React.useState<any>([]);
  const [apiStorageInputs, setApiStorageInputs] = React.useState<any>([]);

  //TOAST PRODUCT UPDATE STATUS

  const currentInfoHandler = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setCurrentInfo({ ...currentInfo, [name]: files[0] });
    } else {
      setCurrentInfo({ ...currentInfo, [name]: value });
    }
  };

  // console.log({ currentInfo });
  //API HANDLING
  // API SECTION

  const { data, isFetched } = useFetchBedVariantsById(id);
  const { mutate, isSuccess, isLoading } = useUpdateBedVariant(id);

  // console.log({ data });

  useEffect(() => {
    if (data) {
      const newData = {
        basePrice: (data && data?.price?.basePrice) || 0,
        salePrice: (data && data?.price?.salePrice) || 0,
      };
      setCurrentInfo((prev: any) => ({
        ...prev,
        ...newData,
      }));

      const color = data?.accessories?.color?.map((color: any) => {
        return { ...color, id: color._id };
      });

      setApiHeadboardInputs(data?.accessories?.headboard);
      setApiFeetInputs(data?.accessories?.feet);
      setApiMattressInputs(data?.accessories?.mattress);
      setApiStorageInputs(data?.accessories?.storage);
      setApiColorInput(color);
    }
  }, [data]);

  const handleProductUpload = async () => {
    const baseImage = !currentInfo.image
      ? data?.image || null
      : (await uploadBedImage(currentInfo.image as unknown as Blob)).url;

    const getImageUrlAndName = async (color: any) => {
      if (color?.image instanceof File || color?.image instanceof Blob) {
        const imageUrl = (await uploadBedImage(color.image as Blob)).url;

        return {
          name: color?.name,
          image: imageUrl,
        };
      }

      return {
        name: color?.name,
        image: typeof color?.image === "string" ? color?.image : null,
      };
    };
    const colorWithUrlAndName = await pMap(colorInput, getImageUrlAndName);

    mutate(
      {
        price: {
          basePrice: currentInfo.basePrice,
          salePrice: currentInfo.salePrice,
        },
        image: baseImage as string,
        accessories: {
          color: colorWithUrlAndName as any,
          storage: storageInputs as any,
          feet: feetInputs as any,
          headboard: headboardInputs as any,
          mattress: mattressInputs as any,
        },
      },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Bed Varient Updated Successfully");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  const handleImageURL = ({
    local,
    api,
  }: {
    local: File;
    api: string | undefined | null;
  }) => {
    if (local) {
      console.log({ local: "local" });
      return URL.createObjectURL(local);
    }

    if (api) {
      return api;
    }

    return "";
  };

  return (
    <AdminLayout>
      <h6>Add New Variant for ID : {id}</h6>

      <h4 className={css.heading}>Price and Size</h4>
      <div className={css.grid3}>
        <Input
          name="basePrice"
          type="number"
          label="Base Price"
          placeholder="Enter Base Price"
          value={currentInfo.basePrice}
          onChange={currentInfoHandler}
        />
        <Input
          name="salePrice"
          type="number"
          label="Selling Price"
          placeholder="Enter Selling Price"
          onChange={currentInfoHandler}
          value={currentInfo.salePrice}
        />

        <div className="d-flex" style={{ alignItems: "center" }}>
          {(currentInfo?.image || data?.image) && (
            <img
              width={50}
              height={50}
              src={handleImageURL({
                local: currentInfo?.image as File,
                api: data?.image,
              })}
              // objectFit={"contain"}
              // layout={"fixed"}
            />
          )}
          <FilePicker
            name="image"
            type="file"
            label="Color Image"
            placeholder="Enter product name"
            onChange={currentInfoHandler}
            // value={currentInfo.image}
          />
        </div>
      </div>
      {/* Dynamic Fields */}
      {isFetched && (
        <>
          <DynamicInputWithImagePicker
            title="Color"
            options={colorArray}
            initialState={apiColorInput}
            getState={(value) => setColorInput(value)}
          />
          {/* NEWLY ADDED */}
          <DynamicInputForm
            title="Headboard"
            options={HeadboardArray}
            initialValue={apiHeadboardInputs}
            getValue={(value) => setHeadboardInputs(value)}
          />
          <DynamicInputForm
            title="Storage"
            options={StorageArray}
            initialValue={apiStorageInputs}
            getValue={(value) => setStorageInputs(value)}
          />
          <DynamicInputForm
            title="Feet"
            options={FeetArray}
            initialValue={apiFeetInputs}
            getValue={(value) => setFeetInputs(value)}
          />
          <DynamicInputForm
            title="Mattress"
            options={MattressArray}
            initialValue={apiMattressInputs}
            getValue={(value) => setMattressInputs(value)}
          />
        </>
      )}

      <br />
      <AddMoreButton title="Submit Variant" onClick={handleProductUpload} />
      {/* {JSON.stringify(data)} */}
      <ToastContainer />
    </AdminLayout>
  );
};
export default AddNewVarients;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (isValidObjectId(id)) {
    return {
      props: {
        id,
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }
};

// COLOR ARRAY

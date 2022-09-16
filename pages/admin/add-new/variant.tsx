/* eslint-disable @next/next/no-img-element */
import AddMoreButton from "components/element/addmore";
import Input from "components/element/input";
import FilePicker from "components/element/picker";
import Select from "components/element/select";
import Textarea from "components/element/textarea";
import {
  bedSizeArray,
  colorArray,
  colorArrayWithImages,
  FeetArray,
  HeadboardArray,
  MattressArray,
  StorageArray,
} from "constants/data/bed";
import { isValidObjectId } from "mongoose";
import { uploadBedImage } from "network-requests/api";
import { useCreateNewBedVariant } from "network-requests/mutations";
import { useFetchBedById } from "network-requests/queries";
import { GetServerSideProps } from "next";
import pMap from "p-map";
import React, { useEffect } from "react";
import css from "styles/admin.module.scss";

import AdminLayout from "layout";
import DynamicInputForm from "components/element/dynamicInputForm";
import DynamicImageForm from "components/element/dynamicImageForm";

interface AddNewVarientsProps {
  id: string;
}

const AddNewVarients = ({ id }: AddNewVarientsProps) => {
<<<<<<< HEAD
  // REDUCER FOR REDUCE CODE
  // const { actions, reducer, initialState } = updateBedSlice;

  // const [state, dispatch] = React.useReducer(reducer, initialState);

  // React.useEffect(() => {
  //   console.log(state);
  // }, [state]);
  // API SECTION
=======
>>>>>>> 5d586b15337dd32585db97a3a5dd32dd9a433c10
  const { data, isFetched } = useFetchBedById(id);

  const [sizeData, setSizeData] = React.useState(bedSizeArray);
  const [colorInput, setColorInput] = React.useState<any>([]);
  const [headboardInputs, setHeadboardInputs] = React.useState<any>([]);
  const [feetInputs, setFeetInputs] = React.useState<any>([]);
  const [mattressInputs, setMattressInputs] = React.useState<any>([]);
  const [storageInputs, setStorageInputs] = React.useState<any>([]);

  console.log({ colorInput });

  useEffect(() => {
    const handleSizeOption = () => {
      const temp = [...sizeData];

      if (isFetched) {
        const availableSizes = temp.filter((item) => {
          return !data?.variants.find(
            (variant) => Number(variant.size) === item.value
          );
        });
        setSizeData(availableSizes);
      }
    };
    void handleSizeOption();
  }, [isFetched]);

  const [currentInfo, setCurrentInfo] = React.useState({
    size: "",
    basePrice: 0,
    salePrice: 0,
    image: null,
  });

  const currentInfoHandler = (e: any) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setCurrentInfo({ ...currentInfo, [name]: files[0] });
    } else {
      setCurrentInfo({ ...currentInfo, [name]: value });
    }
  };

  //API HANDLING

  const { mutate } = useCreateNewBedVariant(id);

  const handleProductUpload = async () => {
    const baseImage = !currentInfo.image
      ? null
      : (await uploadBedImage(currentInfo.image as unknown as Blob)).url;

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
    const colorWithUrlAndName = await pMap(colorInput, getImageUrlAndName);

    mutate({
      price: {
        basePrice: currentInfo.basePrice,
        salePrice: currentInfo.salePrice,
      },
      size: currentInfo.size,
      image: baseImage,

      accessories: {
        color: colorWithUrlAndName as any,
        storage: storageInputs as any,
        feet: feetInputs as any,
        headboard: headboardInputs as any,
        mattress: mattressInputs as any,
      },
    });
    // console.log({ colorWithUrlAndName });
  };

  return (
    <AdminLayout>
      <h6>Add New Variant for ID : {id}</h6>
      <div className={css.inputsBox}>
        <Input
          name="name"
          type="text"
          label="Product Name"
          placeholder="Enter product name"
          value={data?.name}
          // onChange={onChangeInputs}
        />
        <Textarea
          name="description"
          label="Product Description"
          placeholder="Enter product description"
          value={data?.description}
          // onChange={onChangeInputs}
        />
      </div>
      {/* <h4>NOT AVAILABLE SIZES</h4> */}

      {/* {data?.variants.map((variant) => {
        return (
          <div key={variant._id}>
            <p>{variant?.size}</p>
          </div>
        );
      })} */}

      <h4 className={css.heading}>Price and Size</h4>
      <div className={css.gridfour}>
        <Select
          name="size"
          label="Product Size"
          onChange={currentInfoHandler}
          options={sizeData}
        />
        <Input
          name="basePrice"
          type="number"
          label="Base Price"
          placeholder="Enter product name"
          onChange={currentInfoHandler}
        />
        <Input
          name="salePrice"
          type="number"
          label="Selling Price"
          placeholder="Enter product name"
          onChange={currentInfoHandler}
        />
        <FilePicker
          name="image"
          type="file"
          label="Color Image"
          placeholder="Enter product name"
          onChange={currentInfoHandler}
        />
      </div>
      {/* Dynamic Fields */}
      <DynamicImageForm
        title="Color"
        options={colorArray}
        getValue={(value) => setColorInput(value)}
      />

      <div
        style={{
          padding: "10px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
          gap: "10px",
        }}
      >
        {colorArrayWithImages.map((data, index) => {
          return (
            <img
              key={index}
              title={data.colorName}
              src={data.imageUrl}
              alt={data.colorName}
              height={60}
              width={60}
            />
          );
        })}
      </div>
      {/* NEWLY ADDED */}
      <DynamicInputForm
        title="Headboard"
        options={HeadboardArray}
        getValue={(value) => setHeadboardInputs(value)}
      />
      <DynamicInputForm
        title="Storage"
        options={StorageArray}
        getValue={(value) => setStorageInputs(value)}
      />
      <DynamicInputForm
        title="Feet"
        options={FeetArray}
        getValue={(value) => setFeetInputs(value)}
      />
      <DynamicInputForm
        title="Mattress"
        options={MattressArray}
        getValue={(value) => setMattressInputs(value)}
      />

      <br />
      <AddMoreButton title="Submit Variant" onClick={handleProductUpload} />
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

import React, { useEffect } from "react";
import AdminLayout from "layout";
import styles from "styles/admin.module.scss";
import Input from "components/element/input";
import Textarea from "components/element/textarea";
// import ReactChipInput from "react-chip-input";
import AddMoreButton from "components/element/addmore";
import { useUpdateBed } from "network-requests/mutations";
import { useFetchBedById } from "network-requests/queries";
import { dehydrate, QueryClient } from "react-query";
import { GetServerSideProps } from "next";
import { isValidObjectId } from "mongoose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Bed {
  name: string;
  description: string;
  categories: string[];
}

interface Props {
  id: string;
}
function UpdateNewBed({ id }: Props) {
  const [bed, setBed] = React.useState<Bed>({
    name: "",
    description: "",
    categories: [],
  });

  //API POST
  const { data } = useFetchBedById(id);
  const { mutate, isLoading } = useUpdateBed(id);

  const handleAddChip = (value: string) => {
    setBed({ ...bed, categories: [...bed.categories, value] });
  };

  const handleDeleteChip = (index: number) => {
    setBed({
      ...bed,
      categories: bed.categories.filter((_, i) => i !== index),
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBed({ ...bed, [event.target.name]: event.target.value });
  };

  const handleBedCreate = () => {
    mutate(bed, {
      onSuccess: (data) => {
        toast.success(data?.message || "Product Updated Successfully");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  useEffect(() => {
    if (data) {
      setBed({
        name: data.name,
        description: data.description,
        categories: data.categories,
      });
    }
  }, [data]);

  return (
    <AdminLayout>
      <h6>Update Bed with this ID : {id}</h6>
      <h4 className={styles.heading}>Price and Size</h4>
      <div className={styles.inputsBox}>
        <Input
          name="name"
          type="text"
          label="Product Name"
          placeholder="Enter Product Name"
          value={bed.name}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.inputsBox}>
        <Textarea
          name="description"
          label="Product Description"
          placeholder="Enter Product Description"
          value={bed.description}
          onChange={handleInputChange}
        />
      </div>
      <h3>Categories</h3>
      {/* <ReactChipInput
        classes="class1 class2"
        chips={bed.categories}
        onSubmit={handleAddChip}
        onRemove={handleDeleteChip}
      /> */}

      <AddMoreButton onClick={handleBedCreate} title={`Create Bed`} />
      <ToastContainer />
    </AdminLayout>
  );
}

export default UpdateNewBed;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!isValidObjectId(id)) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  const getBed = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/beds/${id}`
    );

    console.log({ response });

    if (response.status !== 200) {
      return {
        redirect: {
          permanent: false,
          destination: "/404",
        },
      };
    } else {
      return response.json();
    }
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["bed", id], async () => await getBed());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  };
};

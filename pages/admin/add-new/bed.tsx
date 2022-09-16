import React from "react";
import AdminLayout from "layout";
import styles from "styles/admin.module.scss";
import Input from "components/element/input";
import Textarea from "components/element/textarea";
import ReactChipInput from "react-chip-input";
import AddMoreButton from "components/element/addmore";
import { useCreateNewBed } from "network-requests/mutations";
import { ToastContainer, toast } from "react-toastify";

interface Bed {
  name: string;
  description: string;
  categories: string[];
}
function AddNewBed() {
  const [bed, setBed] = React.useState<Bed>({
    name: "",
    description: "",
    categories: [],
  });

  //API POST
  const { mutate, isLoading } = useCreateNewBed();

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

  return (
    <AdminLayout>
      <h6>Create New Bed</h6>

      <h4 className={styles.heading}>Price and Size</h4>
      <div className={styles.grid3}>
        <Input
          name="name"
          type="text"
          label="Product Name"
          placeholder="Enter Product Name"
          value={bed.name}
          onChange={handleInputChange}
        />
        <Textarea
          name="description"
          label="Product Description"
          placeholder="Enter Product Description"
          value={bed.description}
          onChange={handleInputChange}
        />
      </div>
      <h3>Categories</h3>
      <ReactChipInput
        classes="class1 class2"
        chips={bed.categories}
        onSubmit={handleAddChip}
        onRemove={handleDeleteChip}
      />

      <AddMoreButton onClick={handleBedCreate} title={`Create Bed`} />
      <ToastContainer />
    </AdminLayout>
  );
}

export default AddNewBed;

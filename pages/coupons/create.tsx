import React from "react";
import Input from "components/element/input";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useCreateCoupon } from "network-requests/mutations";
import Button from "components/element/button";

function CreateCoupon() {
  const { mutate } = useCreateCoupon();

  const init = {
    max: "",
    min: "",
    label: "",
    percent: "",
    description: "",
  };
  const [coupon, setCoupon] = React.useState(init);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoupon((current) => ({ ...current, [name]: value }));
  };

  const handleCreateCoupon = () => {
    if (coupon.label === "") {
      toast.error("Label is required");
      return;
    }
    if (coupon.percent === "") {
      toast.error("Percent is required");
      return;
    }
    if (coupon.max === "") {
      toast.error("Max is required");
      return;
    }
    if (coupon.description === "") {
      toast.error("Description is required");
      return;
    }

    mutate(coupon, {
      onSuccess: () => {
        toast.success("Coupon created successfully");
        setCoupon(init);
      },
      onError: (data: any) => {
        console.log({ data });
        toast.error(data?.response?.data?.message || data?.message);
      },
    });
  };

  return (
    <div>
      <ToastContainer />
      <h1>Create Coupon</h1>
      <div>
        <Input
          label="Label"
          type="text"
          name="label"
          value={coupon.label}
          onChange={handleChange}
        />
        <Input
          type="text"
          label="Percent"
          name="percent"
          value={coupon.percent}
          onChange={handleChange}
        />

        <Input
          label="Min"
          type="text"
          name="min"
          value={coupon.min}
          onChange={handleChange}
        />
        <Input
          label="Max"
          type="text"
          name="max"
          value={coupon.max}
          onChange={handleChange}
        />
        <Input
          label="Description"
          type="text"
          name="description"
          value={coupon.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <Button
          style={{
            background: "green",
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            margin: 20,
          }}
          onClick={handleCreateCoupon}
        >
          Create
        </Button>
      </div>
    </div>
  );
}

export default CreateCoupon;

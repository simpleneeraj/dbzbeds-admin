import { useCreateCoupon } from "network-requests/mutations";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateCoupon() {
  const { mutate } = useCreateCoupon();

  const [coupon, setCoupon] = React.useState({
    label: "",
    percent: "",
    max: "",
    description: "",
  });

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
        setCoupon({
          label: "",
          percent: "",
          max: "",
          description: "",
        });
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
      <h1>CreateCoupon</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: 20,
        }}
      >
        <label htmlFor="label">Label</label>
        <input
          type="text"
          name="label"
          value={coupon.label}
          onChange={handleChange}
        />
        <label htmlFor="percent">Percent</label>
        <input
          type="text"
          name="percent"
          value={coupon.percent}
          onChange={handleChange}
        />
        <label htmlFor="Max Discount Price">Max</label>
        <input
          type="text"
          name="max"
          value={coupon.max}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={coupon.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <button
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
        </button>
      </div>
    </div>
  );
}

export default CreateCoupon;

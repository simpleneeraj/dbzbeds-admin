import DashboardHeader from "layout/header";
import { useCreateCoupon } from "network-requests/mutations";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "styles/order.module.scss";

function CreateCoupon() {
  const { mutate } = useCreateCoupon();

  const [coupon, setCoupon] = React.useState({
    label: "",
    percent: "",
    max: "",
    min: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoupon((current) => ({ ...current, [name]: value }));
  };
  const handleCoupanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoupon((current) => ({ ...current, [name]: value.toUpperCase() }));
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
          min: "",
        });
      },
      onError: (data: any) => {
        console.log({ data });
        toast.error(data?.response?.data?.message || data?.message);
      },
    });
  };

  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      <div className={styles.maincoupon}>
        <ToastContainer />
        <h1>CreateCoupon</h1>
        <div
          className={styles.maincoupon1}
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
            onChange={handleCoupanChange}
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
          <label htmlFor="Max Discount Price">Min</label>

          <input
            type="text"
            name="min"
            value={coupon.min}
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            value={coupon.description}
            onChange={handleChange}
          />
          <button
            style={{
              background: "#201d72",
              padding: 12,
              paddingBottom: 12,
              borderRadius: 10,
              width: "150px",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "600",
              margin: "12px auto",
            }}
            onClick={handleCreateCoupon}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCoupon;

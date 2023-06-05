import { useCreateCoupon, useUpdateCoupon } from "network-requests/mutations";
import { useGetCouponById } from "network-requests/queries";
import { useRouter } from "next/router";
import Styles from "styles/order.module.scss";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardHeader from "layout/header";

function UpdateCoupon() {
  const router = useRouter();
  const { mutate } = useUpdateCoupon(router.query?.id as string);
  const { data } = useGetCouponById(router.query?.id as string);

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

  useEffect(() => {
    if (data) {
      setCoupon(data);
    }
  }, [data]);

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
        toast.success("Coupon updated successfully");
      },
      onError: (data: any) => {
        console.log({ data });
        toast.error(data?.response?.data?.message || data?.message);
      },
    });
  };

  return (
    <>
      <div className={Styles.rightsidebar}>
        <DashboardHeader />
        <div className={Styles.maincoupon}>
          <ToastContainer />
          <h1>Update Coupon</h1>
          <div
            className={Styles.maincoupon1}
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
            <label htmlFor="Min Order Price">Min</label>
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
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateCoupon;

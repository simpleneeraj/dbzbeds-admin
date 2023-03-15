/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import styles from "styles/order.module.scss";
import DashboardHeader from "layout/header";
import dynamic from "next/dynamic";
import { useFetchOrderById, useGetMyself } from "network-requests/queries";
import { format } from "date-fns";
import {
  useSendOrderDetails,
  useUpdateOrder,
  useUpdateOrderStatus,
} from "network-requests/mutations";
import { useSocket } from "hooks/useSocket";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Invoice from "components/Invoice";
import Textarea from "components/element/textarea";
import Button from "components/element/button";
import { useImmer } from "use-immer";
import Input from "components/element/input";
import handleImageURL from "constants/image-convert";
import { uploadBedImage } from "network-requests/api";
import paymentOptions from "constants/payment-status";
import moment from "moment";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ProductDetails = dynamic(
  () => import("components/order/product-details"),
  {
    ssr: false,
  }
);
const ItemSubtotal = dynamic(() => import("components/order/item-subtotal"), {
  ssr: false,
});

function SingleOrderPreview() {
  const router = useRouter();
  const socket = useSocket();
  const { id } = router.query;

  const { data, isLoading, refetch } = useFetchOrderById(id as string);
  console.log({ pageData: data });
  const { mutate } = useUpdateOrderStatus(id as string);
  const { mutateAsync } = useUpdateOrder(router.query?.id as string);

  const { mutate: sendEmailInvoce } = useSendOrderDetails();

  const [orderDate, setOrderDate] = React.useState("");
  const [paymentStatus, setPaymentStatus] = React.useState("");
  const [edit, setEdit] = React.useState("");

  const [billingEdit, setBillingEdit] = React.useState({
    address: "",
    townCity: "",
    postalCode: "",
    country: "",
    companyName: "",
  });

  const [userEdit, setUserEdit] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleUserChange = (e: any) => {
    const { name, value } = e.target;
    const updatedUser = { ...userEdit, [name]: value };
    setUserEdit(updatedUser);
  };

  const handleBillingChange = (e: any) => {
    const { name, value } = e.target;
    const updatedBilling = { ...billingEdit, [name]: value };
    setBillingEdit(updatedBilling);
  };

  const updateOrder = async () => {
    await mutateAsync(
      {
        ...data,
        shippingAddress: billingEdit,
        user: userEdit,
      },
      {
        onSuccess: () => {
          toast.success("Order updated successfully");
          refetch();
          setEdit("");
        },
      }
    );
  };

  const handleEmailSend = () => {
    sendEmailInvoce(
      {
        email: data?.user.email,
        message: data?._id,
      },
      {
        onSuccess: () => {
          toast.success("Email sent successfully");
        },
      }
    );
  };
  const handleOrderStatus = (e: any) => {
    mutate({ status: e.target.value });
    setPaymentStatus(e.target.value);
    toast.success("Order status updated successfully");
  };

  const handleInvoicePrint = () => {
    router.push("/invoice/" + id);
  };

  React.useEffect(() => {
    if (data) {
      setPaymentStatus(data?.payment?.status as string);
      setBillingEdit(data?.shippingAddress as any);
      setUserEdit(data?.user as any);
      setOrderDate(
        format(new Date(data?.createdAt as any), "yyyy-MM-dd'T'HH:mm:ss")
      );
    }
  }, [data]);

  const [accessible, setAccessible] = React.useState(false);
  const [socketLoading, setSocketLoading] = React.useState(false);
  const { data: _data } = useGetMyself();

  const [name, setName] = React.useState("");

  React.useEffect(() => {
    if (socket) {
      if (id && _data?.name) {
        setSocketLoading(true);
        socket.emit("active-order", id as string, _data?.name);
      }
      socket.on("is-order-accessible", ({ access, name }) => {
        setAccessible(access);
        setSocketLoading(false);
        setName(name);
      });
    }
    return () => {
      if (socket) {
        socket.off("is-order-accessible");
        socket.emit("inactive-order", id as string);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, socket, _data?.name]);

  if (isLoading || socketLoading) return <div>Loading...</div>;
  if (!data) return <div>No order found</div>;
  if (!accessible)
    return (
      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h1>Order is not accessible</h1>
        <p style={{ textAlign: "center" }}>
          <span style={{ fontWeight: "600" }}> {name || "Other Admin"}</span> is
          working on this order currently <br />
          Please try again later
        </p>
        <button
          onClick={() => router.back()}
          style={{
            width: "max-content",
            padding: 10,
            borderRadius: 8,
            marginTop: 20,
          }}
        >
          Go Back
        </button>
      </div>
    );

  // console.log();
  return (
    <>
      <ToastContainer />
      <div className={styles.rightsidebar} id="orderMain">
        <DashboardHeader />
        <main className={styles.main}>
          <div className={styles.containerbox}>
            <div
              className={styles.containerbox1}
              style={{
                display: "flex",
                gap: ".5rem",
                flex: "1",
              }}
            >
              <div className={styles.devide}>
                <div className={styles.mainheading}>
                  <h1>Orders No #{data?.orderId?.toString()}</h1>
                  <p>
                    Payment via {data?.payment?.paymentMethod}. Customer IP:
                    <span> 92.40.196.240</span>
                  </p>
                  <p>
                    <span>
                      Last Modified By: {data?.lastModifiedBy?.name} at{" "}
                      {moment(data?.updatedAt).format("DD MMM YY - hh:mm A")}
                    </span>
                  </p>
                  <div className={styles.orderdetails}>
                    <div className={styles.col}>
                      <div className={styles.box}>
                        <div className={styles.wdheading}>General</div>
                        <span>
                          <label>Date Created</label>
                          <input
                            type="datetime-local"
                            id="date-time"
                            name="date-time"
                            value={orderDate}
                            onChange={(e) => setOrderDate(e.target.value)}
                          />
                        </span>
                        <div className={styles.payment_link}>
                          {" "}
                          <label>
                            Status <a href="">Customer payment page →</a>
                          </label>
                        </div>

                        <select
                          name="order_status"
                          className={styles.select_status}
                          value={paymentStatus}
                          onChange={handleOrderStatus}
                        >
                          {paymentOptions?.map((item) => {
                            return (
                              <option key={item?.value} value={item?.value}>
                                {item?.label}
                              </option>
                            );
                          })}
                        </select>
                        <span></span>
                      </div>
                    </div>
                    <div className={styles.col}>
                      <div className={styles.box}>
                        <div className={styles.swdheading}>Billing</div>
                        <div className={styles.Billingbox}>
                          <span>
                            {data?.user?.firstName} {data?.user?.lastName}
                          </span>
                          <span>
                            {data?.billingAddress?.companyName ||
                              data?.shippingAddress?.companyName}
                          </span>
                          <span>
                            {data?.billingAddress?.address ||
                              data?.shippingAddress?.address}
                          </span>
                          <span>
                            {data?.billingAddress?.townCity ||
                              data?.shippingAddress?.townCity}
                          </span>
                          <span>
                            {data?.billingAddress?.country ||
                              data?.shippingAddress?.country}
                          </span>
                          <span>
                            {data?.billingAddress?.postalCode ||
                              data?.shippingAddress?.postalCode}
                          </span>
                          <span>
                            <strong>Email address:</strong>
                          </span>{" "}
                          <span>
                            <a href="mailto:">{data?.user?.email}</a>
                          </span>
                          <span>
                            <strong>Phone:</strong>
                          </span>{" "}
                          <span>
                            <a href="tel:">{data?.user?.phone}</a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.col}>
                      <div className={styles.box}>
                        <div className="d-flex justify-content-between">
                          <div className={styles.swdheading}>Shipping</div>
                          <a
                            onClick={() => setEdit("billing")}
                            className={styles.butn}
                          >
                            Edit{" "}
                          </a>
                        </div>

                        {edit === "billing" ? (
                          <div className={styles.Billingbox}>
                            <input
                              type="text"
                              value={userEdit?.firstName}
                              onChange={handleUserChange}
                              name="firstName"
                            />
                            <input
                              type="text"
                              value={userEdit?.lastName}
                              onChange={handleUserChange}
                              name="lastName"
                            />
                            <input
                              type="text"
                              value={billingEdit?.companyName}
                              onChange={handleBillingChange}
                              name="companyName"
                            />
                            <input
                              type="text"
                              value={billingEdit?.address}
                              onChange={handleBillingChange}
                              name="address"
                            />
                            <input
                              type="text"
                              value={billingEdit?.townCity}
                              onChange={handleBillingChange}
                              name="townCity"
                            />
                            <input
                              type="text"
                              value={billingEdit?.country}
                              onChange={handleBillingChange}
                              name="country"
                            />
                            <input
                              type="text"
                              value={billingEdit?.postalCode}
                              onChange={handleBillingChange}
                              name="postalCode"
                            />
                            <input
                              type="text"
                              value={userEdit?.email}
                              onChange={handleUserChange}
                              name="email"
                            />
                            <input
                              type="text"
                              value={userEdit?.phone}
                              onChange={handleUserChange}
                              name="phone"
                            />

                            <div
                              className={` ${styles.btnbox}  ${styles.mt_10}  mt-10 d-flex justify-content-between`}
                            >
                              <button
                                onClick={updateOrder}
                                className={styles.butn}
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEdit("")}
                                className={styles.butn}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.Billingbox}>
                            <span>
                              {data?.user?.firstName} {data?.user?.lastName}
                            </span>
                            <span>{data?.shippingAddress?.companyName}</span>
                            <span>{data?.shippingAddress?.address}</span>
                            <span>{data?.shippingAddress?.townCity}</span>
                            <span>{data?.shippingAddress?.country}</span>
                            <span>{data?.shippingAddress?.postalCode}</span>
                            <span>
                              <strong>Email address:</strong>
                            </span>{" "}
                            <span>
                              <a href="mailto:">{data?.user?.email}</a>
                            </span>
                            <span>
                              <strong>Phone:</strong>
                            </span>{" "}
                            <span>
                              <a href="tel:">{data?.user?.phone}</a>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {data?.orderItems?.map((item, index) => (
                  <ProductDetails data={item} key={index} />
                ))}

                <div className={styles.Order_subtotal}>
                  <ItemSubtotal data={data} />
                  <div className={styles.refund_button}>
                    <p>
                      <button type="button">Refund</button>
                      {/* <span>This order is no longer editable.</span> */}
                    </p>
                  </div>
                </div>
              </div>
              {/* Side Content */}
              <div className={styles["side-content"]}>
                <SideContent
                  notesList={data?.notes}
                  adminImage={data?.adminImage}
                  user={_data}
                />
                <div className={styles.action_parent}>
                  <div className={styles.order_Action}>
                    <h2>Order actions</h2>
                    <div className={styles.action_Select}>
                      <select>
                        <option value={"action"}>Choose an action...</option>
                        <option value={"email"}>
                          Email Invoice / Order Details To Customer
                        </option>
                        {/* <option value={"resend"}>
                          Resend new order notification
                        </option>
                        <option value={"regenerate"}>
                          Regenerate download permissions
                        </option> */}
                      </select>
                    </div>
                    <div className={styles.action_update}>
                      <div className={styles.left_link}>
                        <a href="#">Move to bin</a>
                      </div>
                      <div
                        className={styles.right_update_button}
                        onClick={handleEmailSend}
                      >
                        <button type="button">Send</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={styles.Order_printing}>
                      <h2>Order Printing</h2>
                    </div>
                    <div className={styles.printing_buttons}>
                      <button onClick={() => window.print()}>
                        Print Invoice
                      </button>
                      <button>Print Delivery Note</button>
                      <span>
                        <button>Print Receipt</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* <Invoice data={data} /> */}
    </>
  );
}

export default SingleOrderPreview;

const SideContent = ({ notesList, adminImage, user }: any) => {
  const router = useRouter();
  const { data, refetch } = useFetchOrderById(router.query?.id as string);

  const { mutateAsync, mutate } = useUpdateOrder(router.query?.id as string);

  // const [textValue, setTextValue] = React.useState(defaultState);

  const [notes, setNotes] = useImmer({
    value: "",
    notesList: notesList as any,
  });

  console.log({ notes });

  React.useMemo(() => {
    setNotes((draft) => {
      draft.notesList = notesList;
    });
  }, [notesList, setNotes]);

  const onChangeNotes = React.useCallback(
    (value: string) => {
      setNotes((draft) => {
        draft.value = value;
      });
    },
    [setNotes]
  );
  const onAddNotes = React.useCallback(async () => {
    sleep(100)
      .then(() => {
        setNotes((draft: any) => {
          if (draft.value) {
            draft?.notesList?.push({
              content: draft.value,
              createdAt: new Date().toISOString(),
              createdBy: user?.name,
            });
          }
          draft.value = "";
        });
      })
      .then(async () => {
        await mutateAsync(
          { notes: notes.notesList },
          {
            onSuccess: (_data) => {
              alert("Note Added");
            },
          }
        );
      });
  }, [mutateAsync, notes.notesList, setNotes, user?.name]);

  // const onUpadateNotes = React.useCallback(async () => {
  //   mutateAsync(
  //     { notes: notes.notesList },
  //     {
  //       onSuccess: (_data) => {
  //         alert("Note Added");
  //       },
  //     }
  //   );
  // }, [mutateAsync, notes.notesList]);

  const onDeleteNote = React.useCallback(
    (index: number) => {
      setNotes((draft) => {
        draft.notesList.splice(index, 1);
      });
    },
    [setNotes]
  );

  // FOR IAMGE
  const [image, updateImage] = React.useState<any>(undefined);

  const url = React.useMemo(() => {
    if (image) {
      return handleImageURL(image);
    }
    return adminImage;
  }, [adminImage, image]);

  const updateAdminImage = React.useCallback(async () => {
    const adminImage = image ? await uploadBedImage(image) : null;
    await mutateAsync(
      { adminImage },
      {
        onSuccess: (_data) => {
          alert("Image Updated");
          refetch();
        },
      }
    );
  }, [image, mutateAsync, refetch]);
  const deleteAdminImage = React.useCallback(async () => {
    updateImage(undefined);
    await mutateAsync(
      { adminImage: null },
      {
        onSuccess: (_data) => {
          alert("Image Removed");
          refetch();
        },
      }
    );
  }, [mutateAsync, refetch]);

  return (
    <React.Fragment>
      <div className={styles["imageupload"]}>
        <div className={styles["image-container"]}>
          <Input
            label="Order Image"
            type={"file"}
            onChange={({ target }) => {
              if (target?.files) {
                updateImage(target?.files[0]);
              }
            }}
          />
          {url && (
            <React.Fragment>
              <img
                src={url}
                alt=""
                style={{
                  height: "200px",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                  margin: "10px 0px",
                }}
              />
              <Button onClick={updateAdminImage}>Update Image</Button>
              <Button onClick={deleteAdminImage}>Delete Image</Button>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className={styles["notes-container"]}>
        {notes?.notesList?.length > 0 && (
          <div className={styles["notes-list"]}>
            <div className={styles["items"]}>
              {notes.notesList.map((item: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <p>
                      {item?.content}{" "}
                      <span onClick={() => onDeleteNote(index)}>Delete</span>
                    </p>
                    <span className={styles["notedate"]}>
                      At {moment(item?.createdAt).format("DD MMM YY - hh:mm A")}{" "}
                      by {item?.createdBy}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
        <div className={styles["field-container"]}>
          <Textarea
            label={"Add Personal Note"}
            className={styles["text-container"]}
            value={notes.value}
            onChange={({ target }) => onChangeNotes(target.value)}
          />
          <div className={styles["mainbuttondiv"]}>
            <Button onClick={onAddNotes} className={styles["addbutton"]}>
              Add Note
            </Button>
            {/* <Button onClick={onUpadateNotes} className={styles["updatebutton"]}>
              Update Note{" "}
            </Button> */}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

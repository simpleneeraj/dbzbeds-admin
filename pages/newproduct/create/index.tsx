import React from "react";
import styles from "styles/newproduct/create.module.scss";
import Input from "components/element/input";
import Textarea from "components/element/textarea";
import AddMoreButton from "components/element/addmore";
import { productSideTab } from "constants/sidetab";
import DashboardHeader from "layout/header";
import ChipInput from "components/chip-input";
import { useCreateNewBed, useCreateUser } from "network-requests/mutations";
import { toast } from "react-toastify";
import Toast from "components/toast";
import { useRouter } from "next/router";
import Select from "components/element/select";

function CreateNewProduct() {
  const [activeTab, setActiveTab] = React.useState("Basic");

  const onActiveTab = (value: string) => {
    setActiveTab(value);
  };

  return (
    <React.Fragment>
      <Toast />
      <div className={styles.rightsidebar}>
        <DashboardHeader />
        <main className={styles.main}>
          <div className={styles.containerbox}>
            <div className={styles.mainheading}>Add User</div>
            <div
              className={` ${styles.tablebox} ${styles.mt2} ${styles.productuploadtabbox}`}
            >
              <ul className={styles.productuploadtab}>
                {productSideTab.slice(0, 1).map(({ text }, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => onActiveTab(text)}
                      className={text === activeTab ? styles.active : ""}
                    >
                      {text}
                    </li>
                  );
                })}
              </ul>
              <div className={styles.tabbox}>
                <TabsRender tabName={activeTab} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}

export default CreateNewProduct;

const TabsRender = ({ tabName }: any) => {
  switch (tabName) {
    case "Basic":
      return <Basic />;

    default:
      return null;
  }
};

const Basic = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    name: "" as string,
    email: "" as string,
    role: "" as string,
    password: "" as string,
  });

  //API POST
  const { mutate } = useCreateUser();

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleUserCreate = React.useCallback(async () => {
    if (!user.name || !user.email || !user.role) {
      toast.error("Please fill all the fields");
      return;
    }

    mutate(user, {
      onSuccess: (data) => {
        toast.success("User Created Successfully");
        router.push("/users");
      },
    });
  }, [mutate, router, user]);

  return (
    <div className="tabcontantinner">
      {/* <h1>Basic Info</h1> */}
      <div className="box">
        <ul>
          <li>
            <Input
              name="name"
              type="text"
              label={"Name"}
              placeholder="Enter User Name"
              onChange={handleInputChange}
            />
          </li>
          <li>
            <Input
              name="email"
              type="email"
              label={"Email"}
              placeholder="Enter User Email"
              onChange={handleInputChange}
            />
          </li>
          <li className="grid">
            <Select
              label="Role"
              name="role"
              onChange={handleInputChange}
              options={[
                { label: "Select Role", value: "" },
                { label: "Customer", value: "customer" },
                { label: "Admin", value: "admin" },
                { label: "Super Admin", value: "superadmin" },
              ]}
            />
          </li>
          {(user.role === "admin" || user.role === "superadmin") && (
            <li className="grid">
              <Input
                name="password"
                type="password"
                label={"Password"}
                placeholder="Enter User Password"
                onChange={handleInputChange}
              />
            </li>
          )}
        </ul>
        <div className={styles.buttonsection}>
          <AddMoreButton title="Create User" onClick={handleUserCreate} />
        </div>
      </div>
    </div>
  );
};

{
  /* <li>
          <Input type="file" label={"Featured Image"} />
        </li> */
}
{
  /* <li>
          <Select
            // multiple
            options={[
              { text: "Select", value: "" },
              { text: "Hello", value: "Bye" },
              { text: "Hello", value: "Bye" },
              { text: "Hello", value: "Bye" },
              { text: "Hello", value: "Bye" },
              { text: "Hello", value: "Bye" },
            ]}
            label={"Select Category"}
          />
        </li> */
}
{
  /* <li className="grid-2">
          <Input type="text" label={"Base Price"} />
          <Input type="text" label={"Price"} />
        </li> */
}

const lazyAlert = (succes?: any, error?: any) => {
  return new Promise((resolve, reject) => {
    resolve(alert(succes));
    reject(alert(error));
  });
};

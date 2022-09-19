import React from "react";
import Image from "next/image";
import styles from "styles/order.module.scss";
import Input from "components/element/input";
import extraSpace from "utils/extraspace";
import replacer from "utils/replacer";
import { toast, ToastContainer } from "react-toastify";
import imageToUrl from "utils/image2url";
import Button from "components/element/button";
import { useUpdateAccessoriesIcon } from "network-requests/mutations";
import { useFetchIconById } from "network-requests/queries";
import { GetServerSideProps } from "next";
import "react-toastify/dist/ReactToastify.css";

// const [dropWDownload, dropWDownloadActive] = useState(false);

interface InputTypes {
  type: string;
  label: string;
  value: string;
  image: File;
}

interface Props {
  id: string;
}
export default function UpdateProduct({ id }: Props) {
  //API POST

  const { data } = useFetchIconById(id as string);
  const { mutate } = useUpdateAccessoriesIcon();

  const [inputValue, setInputValue] = React.useState<InputTypes>({
    type: "COLOR",
    label: "",
    value: "",
    image: "" as any,
  });

  const onChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      if (!e.target.files) return;
      return setInputValue({
        ...inputValue,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }
  };

  const handleIconUpdate = () => {
    if (!inputValue.label || !inputValue.value) return;
    mutate(
      { ...inputValue, id },
      {
        onSuccess: (data) => {
          toast.success(data?.message || "Color Icon Updated Successfully");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  React.useEffect(() => {
    setInputValue((prev) => ({
      ...prev,
      value: replacer(inputValue.label),
    }));
  }, [inputValue.label]);

  React.useEffect(() => {
    if (data) {
      setInputValue((prev) => ({
        ...prev,
        label: data?.label,
        value: data?.value,
        type: data?.type,
      }));
    }
  }, [data]);

  return (
    <>
      <div className={styles.rightsidebar}>
        <div className={styles.topheaderdashboard}>
          <div className={styles.leftside}>
            <div className={styles.topsearch}>
              <input type="text" placeholder="Type Hare...." />
              <button>
                <Image
                  src="/icons/search-line.svg"
                  alt="search"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          <div className={styles.rightside}>
            <div className={styles.dropdownaction}>
              <div className={styles.userimagewithtext}>
                <div className={styles.image}>
                  <Image
                    src="/icons/user-line.svg"
                    alt="search"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={styles.text}>Acme Inc.</div>
              </div>
            </div>
          </div>
        </div>
        <main className={styles.main}>
          <div className={styles.containerbox}>
            <div className={styles.mainheading}>
              Update {data?.type.toLowerCase()}
            </div>

            <div
              className={` ${styles.tablebox} ${styles.mt2} ${styles.productuploadtabbox}`}
            >
              <div className="tabcontantinner">
                <div className="box">
                  <ul>
                    <li>
                      <Input
                        name="label"
                        type="text"
                        label={"Name"}
                        placeholder="Enter Name"
                        value={extraSpace(inputValue.label)}
                        onChange={onChangeInputs}
                      />
                    </li>
                    <li>
                      <Input
                        value={inputValue.value}
                        type="text"
                        name="value"
                        label={"Value"}
                        placeholder="auto-generated"
                        onChange={onChangeInputs}
                      />
                    </li>
                    <li>
                      <Input
                        name="image"
                        type="file"
                        label={"Image"}
                        onChange={onChangeInputs}
                        imageUrl={
                          inputValue.image
                            ? imageToUrl(inputValue.image)
                            : data?.image
                        }
                      />
                    </li>
                  </ul>
                  <div>
                    <Button onClick={handleIconUpdate}>Submit</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: { id },
  };
};

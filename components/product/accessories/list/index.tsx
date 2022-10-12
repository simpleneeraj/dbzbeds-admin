/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import Skeleton from "components/skeleton";
import css from "styles/accessories.module.scss";
import { useFetchAllIconByType } from "network-requests/queries";
import EditIcon from "icons/edit";
import DeleteIcon from "icons/delete";
import { useDeleteIconById } from "network-requests/mutations";
import { toast } from "react-toastify";

// @ts-ignore
const arr = [...Array(5).keys()];
interface Props {
  type: string;
}

function AccessoriesList({ type }: Props) {
  const { data, isLoading, refetch } = useFetchAllIconByType(type);
  const { mutate } = useDeleteIconById();
  const router = useRouter();
  const onUpdateAccessories = React.useCallback(
    (id: string) => {
      const path = `/accessories/update?id=${id}`;
      router.push(path);
    },
    [router]
  );

  const onDeleteAccessories = React.useCallback(
    (id: string) => {
      if (window.confirm("Are you sure to delete this Accessories")) {
        console.log(id);
        mutate(id, {
          onSuccess: (data) => {
            refetch();
            toast.success(data?.message || "Accessories Created Successfully");
          },
        });
      }
    },
    [mutate, refetch]
  );

  return (
    <div className={css.container}>
      {isLoading ? (
        arr.map((_, i) => <Loading key={i} />)
      ) : (
        <ul>
          {data?.map((item) => (
            <li key={item._id}>
              <div className={css.image}>
                <img
                  // src={"/image.png"}
                  src={item.image || "/image.png"}
                  alt={item.label}
                />
              </div>
              <div className={css.text}>
                <p>{item.label}</p>
                <p>{item.value}</p>
              </div>
              <div className={css.controls}>
                <i onClick={() => onUpdateAccessories(item._id)}>
                  <EditIcon width="16" height="16" />
                </i>
                <i onClick={() => onDeleteAccessories(item._id)}>
                  <DeleteIcon width="16" height="16" />
                </i>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AccessoriesList;

const Loading = () => {
  return (
    <div className={css.loading}>
      <Skeleton className={css.skeleton} />
      <Skeleton className={css.skeleton} />
    </div>
  );
};

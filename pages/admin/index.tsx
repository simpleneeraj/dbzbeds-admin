/* eslint-disable @next/next/no-img-element */
import { useFetchAllBedsWithImageAdmin } from "network-requests/queries";
import { useRouter } from "next/router";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import css from "styles/admin.module.scss";
import AdminLayout from "layout";
import { useDeleteBedById } from "network-requests/mutations";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/**
 * Admin Panel
 */

const AllProducts = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } =
    useFetchAllBedsWithImageAdmin();

  const { mutate } = useDeleteBedById();

  const router = useRouter();

  console.log({ data: data?.pages });
  return (
    <AdminLayout>
      <div className={css.content}>
        <h1>All Product</h1>
        <div className={css.products}>
          <InfiniteScroll
            dataLength={data?.pages?.length || 0}
            next={fetchNextPage}
            hasMore={hasNextPage as boolean}
            loader={<div>Loading...</div>}
          >
            {data?.pages.map((page) =>
              page?.data?.map((idata: any, i: number) => {
                return (
                  <div key={i} className={css.item}>
                    <div className={css.image}>
                      <img src={idata?.image || "/image.png"} alt="icon" />
                    </div>
                    <div className={css.text}>
                      <h4>{idata.name}</h4>
                      <p>{idata.description}</p>
                      <p>Price</p>
                      {JSON.stringify(idata?.price, null, 4)}
                      <div className={css.category}>
                        {idata?.categories?.map((c: string, i: number) => (
                          <span key={i}>{c}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() =>
                          router.push(`/admin/all-varients/${idata._id}`)
                        }
                      >
                        Show All Created Sizes
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/admin/add-new/variant?id=${idata._id}`)
                        }
                      >
                        Add Variants
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/admin/update/bed/${idata._id}`)
                        }
                      >
                        Update Bed
                      </button>
                      <button
                        onClick={() =>
                          mutate(idata._id, {
                            onSuccess: () => {
                              toast.success("Bed Deleted Successfully");
                              refetch();
                            },
                          })
                        }
                      >
                        Delete Bed
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </InfiniteScroll>
        </div>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};
export default AllProducts;

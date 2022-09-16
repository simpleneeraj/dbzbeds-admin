/* eslint-disable @next/next/no-img-element */
import { isValidObjectId } from "mongoose";
import { useFetchBedById } from "network-requests/queries";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient } from "react-query";
import css from "styles/admin.module.scss";
import AdminLayout from "layout";
import { useDeleteBedVariantById } from "network-requests/mutations";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/**
 * Admin Panel
 */

interface EditProductPageProps {
  id: string;
}

const EditProductPage = ({ id }: EditProductPageProps) => {
  const { data, isLoading, isError, refetch } = useFetchBedById(id);

  console.log({ data });
  const router = useRouter();

  const { mutate } = useDeleteBedVariantById();

  return (
    <AdminLayout>
      <div className={css.content}>
        <h1>All Product</h1>
        <div className={css.products}>
          {data?.variants?.map((idata: any, i: number) => {
            console.log({ idata });
            return (
              <div key={i} className={css.item}>
                <div className={css.image}>
                  <img src={idata?.image || "/image.png"} alt="icon" />
                </div>
                <div className={css.text}>
                  <h4>{idata.size}</h4>
                  <p>{idata?.description}</p>
                  <div className={css.category}>
                    {idata?.categories?.map((c: string, i: number) => (
                      <span key={i}>{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() =>
                      router.push(`/admin/update/variant/${idata._id}`)
                    }
                  >
                    Update Variant
                  </button>
                  <button
                    onClick={() =>
                      mutate(idata._id, {
                        onSuccess: () => {
                          toast.success("Variant Deleted Successfully");
                          refetch();
                        },
                      })
                    }
                  >
                    Delete Variant
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </AdminLayout>
  );
};
export default EditProductPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  if (!isValidObjectId(id)) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  const getBed = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/beds/${id}`
    );

    console.log({ response });

    if (response.status !== 200) {
      return {
        redirect: {
          permanent: false,
          destination: "/404",
        },
      };
    } else {
      return response.json();
    }
  };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["bed", id], async () => await getBed());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  };
};

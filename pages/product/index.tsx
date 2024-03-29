/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import DashboardHeader from "layout/header";
import styles from "styles/order.module.scss";
import Button from "components/element/button";
import TableHeader from "components/table/header";
import FilterHeader from "components/table/filter";
import ProductList from "components/table/product-list";
import { deleteBedById, syncWithGoogle } from "network-requests/api";
import { useInView } from "react-intersection-observer";
import { useFetchAllBedsWithImageAdmin } from "network-requests/queries";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import Toast from "components/toast";

const Skeleton = dynamic(() => import("components/skeleton"), { ssr: false });

function ProductPage() {
  const { push } = useRouter();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchAllBedsWithImageAdmin();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const onDeleteProduct = React.useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure to delete this Product")) {
        const res = await deleteBedById(id);
        refetch();
      }
    },
    [refetch]
  );

  const onSyncWithGoogleMerchant = React.useCallback(async (id: string) => {
    if (
      window.confirm(
        "Are you sure to sync with google merchant with this Product"
      )
    ) {
      const data = await syncWithGoogle(id);
      if (data) {
        await toast.success("Added to Google merchant successfully");
      }
    }
  }, []);

  return (
    <>
      <Toast />
      <div className={styles.rightsidebar}>
        <DashboardHeader />
        <div className={styles.mainheading}>Products list</div>
        <main className={styles.main}>
          <div className={styles.containerbox}>
            <div className={` ${styles.tablebox} ${styles.mt2}`}>
              <FilterHeader
                onCreate={() => push("/product/create")}
                createText="Create New Product"
              />
              <div className={`${styles.table} ${styles.allproducttable} `}>
                <table>
                  {isLoading ? (
                    <tbody className={styles.loading}>
                      {Array.from(Array(5).keys()).map((_, i) => (
                        <tr key={i}>
                          <Skeleton key={i} className={styles.skeleton} />
                        </tr>
                      ))}
                    </tbody>
                  ) : isError ? (
                    <thead>{`Error: Something Went Wrong`}</thead>
                  ) : (
                    <React.Fragment>
                      <thead>
                        <TableHeader listArray={headerArray} />
                      </thead>
                      <tbody>
                        {data?.pages?.map((page, index: number) => (
                          <React.Fragment key={index}>
                            {page.data.map((product) => (
                              <ProductList
                                key={product._id}
                                name={product?.name}
                                image={product?.image}
                                date={product?.createdAt}
                                categories={product?.categories}
                                onEdit={() =>
                                  push(`/product/update?id=${product._id}`)
                                }
                                onDelete={() => onDeleteProduct(product._id)}
                                onView={() => push(`/variants/${product._id}`)}
                                onSync={() =>
                                  onSyncWithGoogleMerchant(product._id)
                                }
                              />
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </React.Fragment>
                  )}
                </table>
              </div>
              <div className={styles.mainheading}>
                <Button
                  ref={ref}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                    ? "Load Newer"
                    : "Nothing more to load"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ProductPage;

const headerArray = [
  {
    name: "Image",
  },
  {
    name: "Name",
  },
  {
    name: "Category",
  },
  {
    name: "Status",
  },
  {
    name: "Date",
  },
  {
    name: "Action",
  },
];

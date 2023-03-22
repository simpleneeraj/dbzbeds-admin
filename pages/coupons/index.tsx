/* eslint-disable @next/next/no-img-element */
import CouponList from "components/table/coupon-liist";
import FilterHeader from "components/table/filter";
import TableHeader from "components/table/header";
import DashboardHeader from "layout/header";
import { deleteCoupon } from "network-requests/api/coupons";
import { useGetAllCoupons } from "network-requests/queries";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import styles from "styles/order.module.scss";

const Skeleton = dynamic(() => import("components/skeleton"), { ssr: false });

function CouponsPage() {
  const { push } = useRouter();

  const { data, isLoading, refetch, isError } = useGetAllCoupons();

  const onDeleteProduct = React.useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure to delete this Product")) {
        const res = await deleteCoupon(id);
        refetch();
      }
    },
    [refetch]
  );

  return (
    <>
      <div className={styles.rightsidebar}>
        <DashboardHeader />
        <div className={styles.mainheading}>Products list</div>
        <main className={styles.main}>
          <div className={styles.containerbox}>
            <div className={` ${styles.tablebox} ${styles.mt2}`}>
              <FilterHeader
                onCreate={() => push("/coupons/create")}
                createText="Create New Coupon"
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
                        {data?.map((product: any) => (
                          <CouponList
                            key={product._id}
                            name={product?.label}
                            percentage={product?.percent}
                            max={product?.max}
                            min={product?.min}
                            description={product?.description}
                            date={product?.createdAt}
                            onEdit={() =>
                              push(`/coupons/update?id=${product._id}`)
                            }
                            onDelete={() => onDeleteProduct(product._id)}
                          />
                        ))}
                      </tbody>
                    </React.Fragment>
                  )}
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default CouponsPage;

const headerArray = [
  {
    name: "Label",
  },
  {
    name: "percent",
  },
  {
    name: "min",
  },
  {
    name: "max",
  },
  {
    name: "description",
  },
];

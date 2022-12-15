/* eslint-disable @next/next/no-img-element */
import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import DashboardHeader from "layout/header";
import styles from "styles/order.module.scss";
import TableHeader from "components/table/header";
import ProductList from "components/table/product-list";
import { useGetBuildYourBeds } from "network-requests/queries";

const Skeleton = dynamic(() => import("components/skeleton"), { ssr: false });

function ProductPage() {
  const { push } = useRouter();

  const { data, isLoading, isError } = useGetBuildYourBeds();

  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      <div className={styles.mainheading}>BUILD YOUR BED</div>
      <main className={styles.main}>
        <div className={styles.containerbox}>
          <div className={` ${styles.tablebox} ${styles.mt2}`}>
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
                      {data?.map((product, _index: number) => (
                        <ProductList
                          key={product._id}
                          name={product?.name}
                          image={product?.image}
                          date={product?.createdAt}
                          categories={product?.categories}
                          onEdit={() =>
                            push(`/build-your-bed/update?id=${product._id}`)
                          }
                          onView={() =>
                            push(`/build-your-bed/sizes/${product._id}`)
                          }
                          showDelete={false}
                        />
                      ))}
                    </tbody>
                  </React.Fragment>
                )}
              </table>
            </div>
            <div className={styles.mainheading}></div>
          </div>
        </div>
      </main>
    </div>
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

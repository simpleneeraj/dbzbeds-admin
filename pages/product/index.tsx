/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "styles/order.module.scss";
import TableHeader from "components/table/header";
import TableList from "components/table/list";
import FilterHeader from "components/table/filter";
import DashboardHeader from "layout/header";
import { useRouter } from "next/router";
import { useFetchAllBeds } from "network-requests/queries";

function ProductPage() {
  const router = useRouter();

  const { data, isLoading, isError, fetchNextPage, hasNextPage, refetch } =
    useFetchAllBeds();

  console.log(data);
  return (
    <>
      <div className={Styles.rightsidebar}>
        <DashboardHeader />
        <main className={Styles.main}>
          <div className={Styles.containerbox}>
            <div className={Styles.mainheading}>Products list</div>
            <div className={` ${Styles.tablebox} ${Styles.mt2}`}>
              <FilterHeader
                onCreate={() => router.push("/product/create")}
                createText="Create New Product"
              />
              <div className={`${Styles.table} ${Styles.allproducttable} `}>
                <table>
                  <thead>
                    <TableHeader listArray={headerArray} />
                  </thead>
                  <tbody>
                    <TableList onClickList={() => router.push("/variants")} />
                    <TableList />
                    <TableList />
                  </tbody>
                </table>
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
    name: "Price",
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

/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "styles/order.module.scss";
import TableHeader from "components/table/header";
import TableList from "components/table/list";
import FilterHeader from "components/table/filter";
import DashboardHeader from "layout/header";
import { useRouter } from "next/router";
// const [dropWDownload, dropWDownloadActive] = useState(false);

function VariantsPage() {
  const onDelete = () => {
    if (window.confirm("Are you sure to delete this")) {
      alert("Delete Succesfully");
    }
  };

  const router = useRouter();
  const onEdit = () => {
    router.push(`/variant/update`);
  };
  return (
    <>
      <div className={Styles.rightsidebar}>
        <DashboardHeader />
        <main className={Styles.main}>
          <div className={Styles.containerbox}>
            <div className={Styles.mainheading}>Variants list</div>
            <div className={` ${Styles.tablebox} ${Styles.mt2}`}>
              <FilterHeader
                createText="Create New Variants"
                onCreate={() => router.push(`/variants/create`)}
              />
              <div className={`${Styles.table} ${Styles.allproducttable} `}>
                <table>
                  <thead>
                    <TableHeader listArray={headerArray} />
                  </thead>
                  <tbody>
                    <TableList
                      onEdit={onEdit}
                      onDelete={onDelete}
                      onClickList={() => router.push(`/variants/update`)}
                    />
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

export default VariantsPage;

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

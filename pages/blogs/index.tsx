/* eslint-disable @next/next/no-img-element */
import React from "react";
import BlogList from "components/table/blog-list";
import FilterHeader from "components/table/filter";
import TableHeader from "components/table/header";
import DashboardHeader from "layout/header";
import { deleteBlogs } from "network-requests/api/blogs";
import { useGetAllBlogs } from "network-requests/queries";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "styles/order.module.scss";

const Skeleton = dynamic(() => import("components/skeleton"), { ssr: false });

function AllBlogs() {
  const { push } = useRouter();

  const { data, isLoading, refetch, isError } = useGetAllBlogs();

  const onDeleteProduct = React.useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure to delete this Product")) {
        await deleteBlogs(id);
        refetch();
      }
    },
    [refetch]
  );

  return (
    <>
      <div className={styles.rightsidebar}>
        <DashboardHeader />
        <div className={styles.mainheading}>All Blogs</div>
        <main className={styles.main}>
          <div className={styles.containerbox}>
            <div className={` ${styles.tablebox} ${styles.mt2}`}>
              <FilterHeader
                onCreate={() => push("/blogs/create")}
                createText="Create New Blogs"
                placeholderName="Search Blogs"
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
                        {data?.map((blog: any, index: number) => (
                          <BlogList
                            key={index}
                            name={blog?.name}
                            image={blog?.images[0]}
                            onEdit={() => push(`/blogs/update?id=${blog._id}`)}
                            onDelete={() => onDeleteProduct(blog._id)}
                            content={blog?.content}
                            categories={blog?.categories}
                            date={blog?.createdAt}
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

export default AllBlogs;

const headerArray = [
  {
    name: "Image",
  },
  {
    name: "Name",
  },
  // {
  //   name: "Content",
  // },
  {
    name: "Category",
  },
  {
    name: "Date",
  },
];

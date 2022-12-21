import React from "react";
import { useRouter } from "next/router";
import DashboardHeader from "layout/header";
import styles from "styles/order.module.scss";
import Button from "components/element/button";
import Skeleton from "components/skeleton";
import FilterHeader from "components/table/filter";
import TableHeader from "components/table/header";
import ReviewList from "components/table/review-list";
import { useInView } from "react-intersection-observer";
import { useFetchAllBedsWithImageAdmin } from "network-requests/queries";

const Reviews = () => {
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

  return (
    <div className={styles.rightsidebar}>
      <DashboardHeader />
      <div className={styles.mainheading}>(All) Reviews</div>
      <main className={styles.main}>
        <div className={styles.containerbox}>
          <div className={` ${styles.tablebox} ${styles.mt2}`}>
            <FilterHeader />
            <div className={`${styles.table} ${styles.allproducttable} `}>
              <table>
                {isLoading ? (
                  <tbody className={styles.loading}>
                    <tr>
                      <Skeleton
                        style={{
                          height: "36px",
                        }}
                        className={styles.skeleton}
                      />
                    </tr>
                    {Array.from(Array(5).keys()).map((_, i) => (
                      <tr key={i}>
                        <Skeleton
                          style={{
                            height: "86px",
                          }}
                          className={styles.skeleton}
                        />
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
                      <ReviewList
                        name={"Simple"}
                        date={"1 January 2023"}
                        status="approved"
                        onApprove={() => alert("Approved Clicked")}
                        onReject={() => alert("Reject Clicked")}
                        image={""}
                        email={"example@gmail.com"}
                      />
                      <ReviewList
                        name={"Simple"}
                        date={"1 January 2023"}
                        status="rejected"
                        onApprove={() => alert("Approved Clicked")}
                        onReject={() => alert("Reject Clicked")}
                        image={""}
                        email={"example@gmail.com"}
                      />
                      <ReviewList
                        name={"Simple"}
                        date={"1 January 2023"}
                        onApprove={() => alert("Approved Clicked")}
                        onReject={() => alert("Reject Clicked")}
                        image={""}
                        status="pending"
                        email={"example@gmail.com"}
                      />
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
  );
};
export default Reviews;

const headerArray = [
  {
    name: "Image",
  },
  {
    name: "Name",
  },
  {
    name: "Email",
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

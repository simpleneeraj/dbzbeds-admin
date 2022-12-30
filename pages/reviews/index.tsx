import React from "react";
import DashboardHeader from "layout/header";
import styles from "styles/order.module.scss";
import Button from "components/element/button";
import Skeleton from "components/skeleton";
import FilterHeader from "components/table/filter";
import TableHeader from "components/table/header";
import ReviewList from "components/table/review-list";
import { useInView } from "react-intersection-observer";
import { useGetAllReviews } from "network-requests/queries";
import {
  useApproveReview,
  useDeleteReview,
  useRejectReview,
} from "network-requests/mutations";

const Reviews = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const {
    data,
    isLoading,
    isError,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllReviews();

  const { mutate: approveReview } = useApproveReview();
  const { mutate: rejectReview } = useRejectReview();
  const { mutate: deleteReview } = useDeleteReview();

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
                      {data?.pages?.map((page: any) =>
                        page?.reviews?.map((item: any) => {
                          console.log({ item });
                          return (
                            <ReviewList
                              key={item?._id}
                              name={item?.name}
                              date={item?.created_at}
                              status={item?.isApproved ? "approved" : "pending"}
                              onApprove={() => {
                                approveReview(
                                  { id: item?._id },
                                  {
                                    onSuccess: () => refetch(),
                                  }
                                );
                              }}
                              onReject={() =>
                                rejectReview(
                                  { id: item?._id },
                                  {
                                    onSuccess: () => refetch(),
                                  }
                                )
                              }
                              image={""}
                              email={item?.email}
                              onDelete={() =>
                                deleteReview(
                                  { id: item?._id },
                                  {
                                    onSuccess: () => refetch(),
                                  }
                                )
                              }
                            />
                          );
                        })
                      )}
                      {/* <ReviewList
                        name={"Simple"}
                        date={"1 January 2023"}
                        onApprove={() => alert("Approved Clicked")}
                        onReject={() => alert("Reject Clicked")}
                        image={""}
                        status="pending"
                        email={"example@gmail.com"}
                      /> */}
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

/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Styles from "styles/order.module.scss";
import TableHeader from "components/table/header";
import TableList from "components/table/BedList";
import FilterHeader from "components/table/filter";
import DashboardHeader from "layout/header";
import { useRouter } from "next/router";
import { useFetchAllBeds } from "network-requests/queries";
import { useInView } from "react-intersection-observer";

function ProductPage() {
    const router = useRouter();
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
        status,
        error,
    } = useFetchAllBeds();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

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
                            <div
                                className={`${Styles.table} ${Styles.allproducttable} `}
                            >
                                <table>
                                    <thead>
                                        <TableHeader listArray={headerArray} />
                                    </thead>
                                    <tbody>
                                        {status === "loading" ? (
                                            <p>Loading...</p>
                                        ) : status === "error" ? (
                                            <span>
                                                Error: Something Went Wrong
                                            </span>
                                        ) : (
                                            <>
                                                {data?.pages?.map(
                                                    (page, index: number) => (
                                                        <React.Fragment
                                                            key={index}
                                                        >
                                                            {page.data.map(
                                                                (product) => (
                                                                    <TableList
                                                                        key={
                                                                            product._id
                                                                        }
                                                                        data={
                                                                            product
                                                                        }
                                                                        onClickList={() =>
                                                                            router.push(
                                                                                `/variants/${product._id}`
                                                                            )
                                                                        }
                                                                        onDelete={() =>
                                                                            console.log(
                                                                                "delete"
                                                                            )
                                                                        }
                                                                        onEdit={(
                                                                            e: any
                                                                        ) => {
                                                                            e.stopPropagation();
                                                                            router.push(
                                                                                "/product/update"
                                                                            );
                                                                        }}
                                                                    />
                                                                )
                                                            )}
                                                        </React.Fragment>
                                                    )
                                                )}
                                            </>
                                        )}
                                    </tbody>
                                    <div>
                                        <button
                                            ref={ref}
                                            onClick={() => fetchNextPage()}
                                            disabled={
                                                !hasNextPage ||
                                                isFetchingNextPage
                                            }
                                        >
                                            {isFetchingNextPage
                                                ? "Loading more..."
                                                : hasNextPage
                                                ? "Load Newer"
                                                : "Nothing more to load"}
                                        </button>
                                    </div>
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

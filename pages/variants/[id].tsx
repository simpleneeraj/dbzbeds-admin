/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "styles/order.module.scss";
import TableHeader from "components/table/header";
import TableList from "components/table/BedList";
import FilterHeader from "components/table/filter";
import DashboardHeader from "layout/header";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";
import { isValidObjectId } from "mongoose";
import { GetServerSideProps } from "next";
import { useFetchBedById } from "network-requests/queries";
import TableListVariants from "components/table/BedListVariants";
// const [dropWDownload, dropWDownloadActive] = useState(false);

interface VariantsPageProps {
    id: string;
}

function VariantsPage({ id }: VariantsPageProps) {
    const { data, isLoading, isError, refetch } = useFetchBedById(id);

    const onDelete = () => {
        if (window.confirm("Are you sure to delete this")) {
            alert("Delete Succesfully");
        }
    };

    const router = useRouter();
    const onEdit = (id: string) => {
        router.push(`/variants/update?id=${id}`);
    };
    return (
        <>
            <div className={Styles.rightsidebar}>
                <DashboardHeader />
                <main className={Styles.main}>
                    <div className={Styles.containerbox}>
                        <div className={Styles.mainheading}>
                            {data?.name} (Variants Lists)
                            <p
                                style={{
                                    fontSize: 15,
                                    marginTop: 10,
                                    color: "#bcbcbc",
                                }}
                            >
                                Description
                            </p>
                            <p style={{ fontSize: 12, color: "#bcbcbc" }}>
                                {data?.description}
                            </p>
                        </div>
                        <div className={` ${Styles.tablebox} ${Styles.mt2}`}>
                            <FilterHeader
                                createText="Create New Variants"
                                onCreate={() => router.push(`/variants/create`)}
                            />
                            <div
                                className={`${Styles.table} ${Styles.allproducttable} `}
                            >
                                <table>
                                    <thead>
                                        <TableHeader listArray={headerArray} />
                                    </thead>
                                    <tbody>
                                        {data?.variants?.map((variant) => (
                                            <TableListVariants
                                                key={variant._id}
                                                data={variant}
                                                onEdit={() =>
                                                    onEdit(
                                                        variant._id as string
                                                    )
                                                }
                                                onDelete={onDelete}
                                                onClickList={() =>
                                                    router.push(
                                                        `/variants/update?id=${variant._id}`
                                                    )
                                                }
                                            />
                                        ))}
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
        name: "Size",
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

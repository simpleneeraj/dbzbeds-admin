/* eslint-disable @next/next/no-img-element */
import React from "react";
import Styles from "styles/order.module.scss";
import TableHeader from "components/table/header";
import FilterHeader from "components/table/filter";
import DashboardHeader from "layout/header";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";
import { isValidObjectId } from "mongoose";
import { GetServerSideProps } from "next";
import {
    useFetchBedById,
    useFetchHeadboardById,
} from "network-requests/queries";
import VariantList from "components/table/variant-list";
import { deleteBedVariantById } from "network-requests/api";
// const [dropWDownload, dropWDownloadActive] = useState(false);

interface VariantsPageProps {
    id: string;
}

function VariantsPage({ id }: VariantsPageProps) {
    const { data, isLoading, isError, refetch } = useFetchHeadboardById(id);

    const router = useRouter();

    const onDelete = React.useCallback(
        async (id: string) => {
            if (window.confirm("Are you sure to delete this variant")) {
                const res = await deleteBedVariantById(id);
                console.log(res);
                refetch();
                alert("Delete Succesfully");
            }
        },
        [refetch]
    );

    const { push } = useRouter();
    const onEdit = (id: string) => {
        push(`/headboard/variants/update?id=${id}`);
    };
    const onCreateNew = (id: string) => {
        push(`/headboard/variants/create?id=${id}`);
    };
    return (
        <>
            <div className={Styles.rightsidebar}>
                <DashboardHeader />
                <main className={Styles.main}>
                    <div className={Styles.containerbox}>
                        <div className={Styles.mainheading}>
                            {/* {data?.name}  */}
                            All Variants Lists
                        </div>
                        <div className={` ${Styles.tablebox} ${Styles.mt2}`}>
                            <FilterHeader
                                createText="Create New Variants"
                                onCreate={() =>
                                    onCreateNew(router.query?.id as string)
                                }
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
                                            <VariantList
                                                key={variant?._id}
                                                price={variant?.price}
                                                size={variant?.size}
                                                image={variant?.image}
                                                date={variant?.createdAt}
                                                onDelete={() =>
                                                    onDelete(
                                                        variant?._id as any
                                                    )
                                                }
                                                onEdit={() =>
                                                    onEdit(
                                                        variant._id as string
                                                    )
                                                }
                                                // onView={() =>
                                                //   push(`/variants/update?id=${variant._id}`)
                                                // }
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
            `${process.env.NEXT_PUBLIC_API_URL}/api/beds/${id}`
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

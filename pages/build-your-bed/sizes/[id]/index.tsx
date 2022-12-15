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
import { useGetBuildYourBedsVariantsById } from "network-requests/queries";
import VariantList from "components/table/variant-list";
import { deleteBedVariantById } from "network-requests/api";
// const [dropWDownload, dropWDownloadActive] = useState(false);

interface VariantsPageProps {
  id: string;
}

function ColorsPage({ id }: VariantsPageProps) {
  const { data, refetch } = useGetBuildYourBedsVariantsById(id);
  const variants = data?.variants as any;
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

  const onEdit = (_id: string) => {
    router.push(`/build-your-bed/sizes/${id}/update`);
  };
  const onView = (_id: string) => {
    router.push(`/build-your-bed/sizes/${id}/variants/${_id}`);
  };
  const onCreateNew = (id: string) => {
    router.push(`/build-your-bed/sizes/${id}/create`);
  };

  // i min
  return (
    <>
      <div className={Styles.rightsidebar}>
        <DashboardHeader />
        <div className={Styles.mainheading}>
          {/* {data?.name}  */}
          All Variants Lists ( LEVEL 1 )
        </div>
        <main className={Styles.main}>
          <div className={Styles.containerbox}>
            <div className={` ${Styles.tablebox} ${Styles.mt2}`}>
              <FilterHeader
                createText="Create New Size"
                onCreate={() => onCreateNew(router.query?.id as string)}
              />
              <div className={`${Styles.table} ${Styles.allproducttable} `}>
                <table>
                  <thead>
                    <TableHeader listArray={headerArray} />
                  </thead>
                  <tbody>
                    {variants?.map((variant: any) => (
                      <VariantList
                        key={variant?._id}
                        size={variant?.size}
                        image={variant?.image}
                        price={variant?.price}
                        date={variant?.createdAt}
                        onEdit={() => onEdit(variant._id as string)}
                        onView={() => onView(variant._id as string)}
                        onDelete={() => onDelete(variant?._id as string)}
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

export default ColorsPage;

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

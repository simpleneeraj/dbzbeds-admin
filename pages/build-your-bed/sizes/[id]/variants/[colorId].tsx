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
  useGetBuildYourBedsById,
  useGetColorsVariantsBySizeVariantId,
} from "network-requests/queries";
import VariantList from "components/table/variant-list";
import { deleteBedVariantById } from "network-requests/api";
import { deleteBuildYourBedVariantColorById } from "network-requests/api/build-your-bed";
// const [dropWDownload, dropWDownloadActive] = useState(false);

interface VariantsPageProps {
  id: string;
  colorId: string;
}

function VariantsPage({ id, colorId }: VariantsPageProps) {
  console.log({ colorId });
  const { data, refetch } = useGetColorsVariantsBySizeVariantId(colorId) as any;
  const router = useRouter();

  const onDelete = React.useCallback(
    async (id: string) => {
      if (window.confirm("Are you sure to delete this variant")) {
        await deleteBuildYourBedVariantColorById(id);
        refetch();
        alert("Delete Succesfully");
      }
    },
    [refetch]
  );

  const onEdit = (id: string) => {
    router.push(`/build-your-bed/sizes/${id}/variants/update?colorId=${id}`);
  };
  const onCreateNew = () => {
    router.push(
      `/build-your-bed/sizes/${id}/variants/create?colorId=${colorId}`
    );
  };

  return (
    <>
      <div className={Styles.rightsidebar}>
        <DashboardHeader />
        <div className={Styles.mainheading}>
          {/* {data?.name}  */}
          All Colors Lists ( LEVEL 2 )
        </div>
        <main className={Styles.main}>
          <div className={Styles.containerbox}>
            <div className={` ${Styles.tablebox} ${Styles.mt2}`}>
              <FilterHeader
                createText="Create New Colors"
                onCreate={onCreateNew}
              />
              <div className={`${Styles.table} ${Styles.allproducttable} `}>
                <table>
                  <thead>
                    <TableHeader listArray={headerArray} />
                  </thead>
                  <tbody>
                    {data?.colors?.map((variant: any) => (
                      <VariantList
                        key={variant?._id}
                        price={variant?.price}
                        size={variant?.size}
                        image={variant?.image}
                        date={variant?.createdAt}
                        onDelete={() => onDelete(variant?._id as string)}
                        onEdit={() => onEdit(variant?._id as string)}
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
  const { id = null, colorId = null } = context.query;

  console.log(context.query);
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
      colorId,
    },
  };
};

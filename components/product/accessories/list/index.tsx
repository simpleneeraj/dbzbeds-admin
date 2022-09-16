import { useFetchIconsByType } from "network-requests/queries";
import Image from "next/image";
import Router from "next/router";
import React from "react";

interface Props {
    type: string;
}

function IconList({ type }: Props) {
    const { data, isLoading } = useFetchIconsByType(type);
    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul>
                    {data?.map((item) => (
                        <li
                            key={item._id}
                            style={{
                                display: "flex",
                                gap: 10,
                                alignItems: "center",
                            }}
                            onClick={() =>
                                Router.push(
                                    "/admin/product/accessories/update?id=" +
                                        item._id
                                )
                            }
                        >
                            <Image
                                src={item.image}
                                alt={item.label}
                                width="50"
                                height="50"
                                layout="fixed"
                                objectFit="contain"
                            />
                            <p>{item.label}</p>

                            <p>{item.value}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default IconList;

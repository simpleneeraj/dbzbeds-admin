/* eslint-disable @next/next/no-img-element */
import { Order, OrderItems } from "network-requests/types";
import styles from "styles/order.module.scss";

interface OrderListProps {
    data: OrderItems;
}

const ProductDetails = ({ data }: OrderListProps) => {
    return (
        <>
            <div className={styles.singleorderpage}>
                <div className={styles.productdetailslist}>
                    <table>
                        <tbody>
                            <tr>
                                <th>Product</th>
                                <th>Option</th>
                                <th>Cost</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                            <tr>
                                <td>Select Your Mattress</td>
                                <td>{data?.accessories?.mattress?.name}</td>
                                <td>£{data?.accessories?.mattress?.price}</td>
                                <td>
                                    1<small>(1x1)</small>
                                </td>
                                <td>£{data?.accessories?.mattress?.price}</td>
                            </tr>
                            <tr>
                                <td>Select Your Headboard</td>
                                <td>{data?.accessories?.headboard?.name}</td>
                                <td>£{data?.accessories?.headboard?.price}</td>
                                <td>
                                    1 <small>(1×1)</small>
                                </td>
                                <td>£{data?.accessories?.headboard?.price}</td>
                            </tr>
                            <tr>
                                <td>Select Your Feet</td>
                                <td>{data?.accessories?.feet?.name}</td>
                                <td>£{data?.accessories?.feet?.price}</td>
                                <td>
                                    1 <small>(1×1)</small>
                                </td>
                                <td>£{data?.accessories?.feet?.price}</td>
                            </tr>
                            <tr>
                                <td>Storage Options</td>
                                <td>{data?.accessories?.storage?.name}</td>
                                <td>£{data?.accessories?.storage?.price}</td>
                                <td>
                                    1 <small>(1×1)</small>
                                </td>
                                <td>£{data?.accessories?.storage?.price}</td>
                            </tr>
                            <tr>
                                <td>Select Your Size</td>
                                <td>{data?.size}</td>
                                <td>£{data?.price}</td>
                                <td>
                                    1 <small>(1×1)</small>
                                </td>
                                <td>£{data?.price}</td>
                            </tr>
                            <tr>
                                <td>Choose Colour</td>
                                <td>
                                    <img src={data?.image} alt="color" />
                                </td>
                                <td>£0.00</td>
                                <td>
                                    1 <small>(1×1)</small>
                                </td>
                                <td>£0.00</td>
                            </tr>
                            <tr className={styles.total_cal}>
                                <td>Image</td>
                                <td>Product</td>
                                <td>Total cost</td>
                                <td>Qty</td>
                                <td>Grand total</td>
                            </tr>
                            <tr>
                                <td>
                                    <img src={data?.image} alt="image" />
                                </td>
                                <td>
                                    <a>
                                        {data?.name} {data?.size}
                                    </a>
                                </td>
                                <td>£{data.price / data.quantity}</td>
                                <td>× {data?.quantity}</td>
                                <td>£ {data?.price}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <tbody>
                <div className={styles.free_ship}>
                    <tr>
                        <p>
                            <td>Free shipping</td>
                            <td>£0.00</td>
                        </p>
                    </tr>
                </div>
            </tbody>
        </>
    );
};

export default ProductDetails;

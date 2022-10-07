import "styles/globals.scss";
import React from "react";
import store from "store";
import { Provider } from "react-redux";
import { AppPropsWithLayout } from "typings/layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import Layout from "layout";
import { ReactQueryDevtools } from "react-query/devtools";
import Router, { useRouter } from "next/router";
import axios from "network-requests/axios";

/**
 * Admin Root
 */

function RootApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page: any) => page);

    const router = useRouter();

    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnReconnect: true,
                        retry: false,
                        refetchOnMount: false,
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    const { user } = store.getState().user;

    //HANDLE AUTHENTICATION LOGOUT
    // React.useEffect(() => {
    //     axios.interceptors.response.use(
    //         (response) => response,
    //         (error) => {
    //             if (error.response.status === 401) {
    //                 Router.replace("/login");
    //             }
    //             return Promise.reject(error);
    //         }
    //     );
    // }, []);

    return getLayout(
        <Provider store={store}>
            <Layout>
                <QueryClientProvider client={queryClient}>
                    {/* @ts-ignore */}
                    <Hydrate state={pageProps.dehydratedState}>
                        <Component {...pageProps} />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </Hydrate>
                </QueryClientProvider>
            </Layout>
        </Provider>
    );
}
export default RootApp;

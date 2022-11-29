import React from "react";
import { Socket } from "socket.io-client";

const SocketContext = React.createContext<Socket>({} as Socket);

export default SocketContext;

export const useSocket = () => {
    let context = React.useContext(SocketContext);

    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

import { useEffect } from "react";
import { io } from "socket.io-client";
import SocketContext from "hooks/useSocket";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "";
const socket = io(SOCKET_URL);

const WebSocketProvider = ({ children }: any) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected to WebSocket -> " + SOCKET_URL);
    });

    socket.emit("active");

    socket.on("disconnect", () => {
      socket.removeAllListeners();
    });
  }, []);

  // console.log("socket", socket);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default WebSocketProvider;

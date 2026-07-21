import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket"]
});

socket.on("connect", () => {
    console.log("🟢 Socket Connected:", socket.id);
});

socket.on("disconnect", () => {
    console.log("🔴 Socket Disconnected");
});

export default socket;
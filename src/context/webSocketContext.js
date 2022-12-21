import { createContext } from "react";
import { io, Socket } from "socket.io-client";

export const socket = io("http://localhost:1811");
export const WebsocketContext = createContext(socket);
export const WebsocketProvider = WebsocketContext.Provider;

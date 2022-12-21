import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { Provider } from "react-redux";
import store from "./app/store";

import { socket, WebsocketProvider } from "./context/webSocketContext";

ReactDOM.render(
  <BrowserRouter>
    <WebsocketProvider value={socket}>
      <MaterialUIControllerProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </MaterialUIControllerProvider>
    </WebsocketProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

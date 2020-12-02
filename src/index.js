import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import JsonPlaceholderService from "./services/json-placeholder-service";
import store from "./store";
export const JsonPlaceholderContext = React.createContext()
const jsonPlaceholderService = new JsonPlaceholderService() 
ReactDOM.render(
  <Provider store={store}>
  <JsonPlaceholderContext.Provider value={jsonPlaceholderService}>
    <App />
    </JsonPlaceholderContext.Provider>
  </Provider>,
  document.getElementById("root")
);

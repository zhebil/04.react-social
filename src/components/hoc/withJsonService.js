import React, { useContext } from "react";
import { JsonPlaceholderContext } from "../../index";

export default function withJsonPlaceholderService() {
  return (Wrapped) => {
    return (props) => {
      const jsonPlaceholderService = useContext(JsonPlaceholderContext);

      return (
        <Wrapped {...props} jsonPlaceholderService={jsonPlaceholderService} />
      );
    };
  };
}

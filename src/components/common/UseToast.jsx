import React from "react";
import { useToast } from "react-native-toast-notifications";

const UseToast = (message, type = "default", duration = 3000) => {
  const toast = useToast();

  toast.show(message, {
    type,
    duration,
    position: "bottom",
  });
};

export default UseToast;
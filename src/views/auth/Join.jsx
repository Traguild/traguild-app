import { StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

/* IMPORT RESOURCES */
import { theme } from "resources/theme/common";

// IMPORT COMPONENTS
import UserInfo from "components/auth/UserInfo";
import PhoneAuth from "components/auth/PhoneAuth";

const Join = ({ navigation }) => {
  const toasts = useToast();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitleVisible: false,
      headerBackTitle: null,
      title: "",
      headerStyle: {
        backgroundColor: theme["default-bg"],
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: theme["default-btn"],
    });
  });

  const [step, setStep] = useState(1);
  const [user_idx, setUserIdx] = useState(null);

  const handleNext = (idx) => {
    setUserIdx(idx);
    setStep((prev) => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PhoneAuth setStep={setStep} handleNext={handleNext} />;
      case 2:
        return <UserInfo setStep={setStep} user_idx={user_idx} />;
    }
  };

  return <>{renderStep()}</>;
};

export default Join;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme["default-bg"],
    paddingHorizontal: 35,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
});

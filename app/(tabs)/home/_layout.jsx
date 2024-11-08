import { Stack } from "expo-router";

export default StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Home Screen" }} />
    </Stack>
  );
}
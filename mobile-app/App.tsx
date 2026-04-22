import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RotasApp from "./src/routes/RotasApp";

export default function App() {
  return (
    <SafeAreaProvider>
      <RotasApp />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

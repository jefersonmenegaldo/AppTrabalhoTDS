import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import TelaCadastro from "../screens/TelaCadastro";
import TelaInicial from "../screens/TelaInicial";
import TelaLogin from "../screens/TelaLogin";
import { obterToken } from "../services/armazenamentoToken";
import type { ListaRotasRaiz } from "../types/navegacao";

const Pilha = createNativeStackNavigator<ListaRotasRaiz>();

export default function RotasApp() {
  const [carregandoSessao, setCarregandoSessao] = useState(true);
  const [rotaInicial, setRotaInicial] =
    useState<keyof ListaRotasRaiz>("Login");

  useEffect(() => {
    let montado = true;
    (async () => {
      try {
        const token = await obterToken();
        if (montado) {
          setRotaInicial(token ? "Inicial" : "Login");
        }
      } finally {
        if (montado) setCarregandoSessao(false);
      }
    })();
    return () => {
      montado = false;
    };
  }, []);

  if (carregandoSessao) {
    return (
      <View style={estilos.central}>
        <ActivityIndicator size="large" color="#1565c0" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Pilha.Navigator initialRouteName={rotaInicial}>
        <Pilha.Screen
          name="Login"
          component={TelaLogin}
          options={{ title: "Entrar", headerShown: false }}
        />
        <Pilha.Screen
          name="Cadastro"
          component={TelaCadastro}
          options={{ title: "Cadastro" }}
        />
        <Pilha.Screen
          name="Inicial"
          component={TelaInicial}
          options={{ title: "Inicio" }}
        />
      </Pilha.Navigator>
    </NavigationContainer>
  );
}

const estilos = StyleSheet.create({
  central: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

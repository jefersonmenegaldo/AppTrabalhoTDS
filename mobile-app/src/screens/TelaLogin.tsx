import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { ListaRotasRaiz } from "../types/navegacao";
import { salvarToken } from "../services/armazenamentoToken";
import { salvarUsuario } from "../services/armazenamentoUsuario";
import { autenticarNaApi } from "../services/autenticacaoService";
import { ErroApi } from "../services/api";

type Props = NativeStackScreenProps<ListaRotasRaiz, "Login">;

export default function TelaLogin({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  async function aoEntrar() {
    setMensagemErro(null);
    setCarregando(true);
    try {
      const resultado = await autenticarNaApi({
        email: email.trim(),
        password: senha,
      });
      await salvarToken(resultado.token);
      await salvarUsuario(resultado.usuario);
      navigation.replace("Inicial");
    } catch (erro) {
      if (erro instanceof ErroApi) {
        setMensagemErro(erro.message);
      } else if (erro instanceof Error) {
        setMensagemErro(erro.message);
      } else {
        setMensagemErro("Erro inesperado ao entrar.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={estilos.titulo}>Aulas API</Text>
      <Text style={estilos.subtitulo}>Entre com sua conta</Text>

      <TextInput
        style={estilos.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={estilos.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {mensagemErro ? (
        <Text style={estilos.erro}>{mensagemErro}</Text>
      ) : null}

      <TouchableOpacity
        style={[estilos.botao, carregando && estilos.botaoDesabilitado]}
        onPress={aoEntrar}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={estilos.textoBotao}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botaoSecundario}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={estilos.textoBotaoSecundario}>Criar conta</Text>
      </TouchableOpacity>

      <Text style={estilos.dica}>
        A API deve estar rodando e a URL configurada em EXPO_PUBLIC_URL_BASE_API
        (veja README).
      </Text>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111",
  },
  subtitulo: {
    fontSize: 16,
    color: "#555",
    marginBottom: 28,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
    color: "#111",
  },
  erro: {
    color: "#c62828",
    marginBottom: 12,
    fontSize: 14,
  },
  botao: {
    backgroundColor: "#1565c0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  botaoSecundario: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#cfd8dc",
    alignItems: "center",
  },
  textoBotaoSecundario: {
    color: "#1565c0",
    fontWeight: "600",
  },
  dica: {
    marginTop: 24,
    fontSize: 13,
    color: "#777",
    lineHeight: 18,
  },
});

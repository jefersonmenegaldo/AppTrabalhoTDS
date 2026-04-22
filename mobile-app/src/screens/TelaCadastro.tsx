import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ErroApi } from "../services/api";
import { cadastrarNaApi } from "../services/autenticacaoService";
import type { ListaRotasRaiz } from "../types/navegacao";

type Props = NativeStackScreenProps<ListaRotasRaiz, "Cadastro">;

export default function TelaCadastro({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  function validarFormulario(): boolean {
    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
      setMensagemErro("Preencha todos os campos.");
      return false;
    }
    if (senha.length < 6) {
      setMensagemErro("A senha deve ter no minimo 6 caracteres.");
      return false;
    }
    if (senha !== confirmarSenha) {
      setMensagemErro("As senhas nao conferem.");
      return false;
    }
    return true;
  }

  async function aoCadastrar() {
    setMensagemErro(null);
    if (!validarFormulario()) return;

    setCarregando(true);
    try {
      await cadastrarNaApi({
        name: nome.trim(),
        email: email.trim(),
        password: senha,
      });
      Alert.alert("Cadastro realizado", "Usuario cadastrado com sucesso.", [
        {
          text: "Ir para login",
          onPress: () => navigation.replace("Login"),
        },
      ]);
    } catch (erro) {
      if (erro instanceof ErroApi) {
        setMensagemErro(erro.message);
      } else if (erro instanceof Error) {
        setMensagemErro(erro.message);
      } else {
        setMensagemErro("Erro inesperado ao cadastrar.");
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
      <Text style={estilos.titulo}>Criar conta</Text>
      <Text style={estilos.subtitulo}>Cadastre um novo usuario na API</Text>

      <TextInput
        style={estilos.input}
        placeholder="Nome"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />
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
      <TextInput
        style={estilos.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      {mensagemErro ? <Text style={estilos.erro}>{mensagemErro}</Text> : null}

      <TouchableOpacity
        style={[estilos.botaoPrimario, carregando && estilos.botaoDesabilitado]}
        onPress={aoCadastrar}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={estilos.textoBotaoPrimario}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botaoSecundario}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={estilos.textoBotaoSecundario}>Ja tenho conta</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
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
  botaoPrimario: {
    backgroundColor: "#1565c0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  textoBotaoPrimario: {
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
});

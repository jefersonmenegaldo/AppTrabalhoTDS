import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ItemMenu from "../components/ItemMenu";
import type { ListaRotasRaiz } from "../types/navegacao";
import { removerToken } from "../services/armazenamentoToken";
import {
  obterUsuario,
  removerUsuario,
  type DadosUsuario,
} from "../services/armazenamentoUsuario";

type Props = NativeStackScreenProps<ListaRotasRaiz, "Inicial">;

export default function TelaInicial({ navigation }: Props) {
  const [usuario, setUsuario] = useState<DadosUsuario | null>(null);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      (async () => {
        const dados = await obterUsuario();
        if (ativo) setUsuario(dados);
      })();
      return () => {
        ativo = false;
      };
    }, [])
  );

  async function aoSair() {
    await removerToken();
    await removerUsuario();
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  }

  return (
    <ScrollView
      style={estilos.area}
      contentContainerStyle={estilos.conteudo}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={estilos.saudacao}>
        Ola{usuario?.name ? `, ${usuario.name}` : ""}!
      </Text>
      {usuario?.email ? (
        <Text style={estilos.email}>{usuario.email}</Text>
      ) : null}

      <Text style={estilos.secao}>Menu</Text>

      <ItemMenu
        titulo="Perfil"
        descricao="Exemplo: dados do usuario (didatico)"
        aoPressionar={() =>
          Alert.alert(
            "Perfil",
            usuario
              ? `${usuario.name}\n${usuario.email}`
              : "Usuario nao carregado."
          )
        }
      />
      <ItemMenu
        titulo="Pessoas"
        descricao="Siga o tutorial em docs/03-consumo-endpoint-pessoas.md"
        aoPressionar={() =>
          Alert.alert(
            "Pessoas",
            "Implemente listagem e cadastro seguindo o tutorial de pessoas na pasta docs/."
          )
        }
      />
      <ItemMenu
        titulo="Configuracoes"
        descricao="Exemplo de item extra no menu"
        aoPressionar={() =>
          Alert.alert("Configuracoes", "Item apenas de exemplo para aulas.")
        }
      />
      <ItemMenu
        titulo="Sair"
        descricao="Encerra sessao e remove o token"
        aoPressionar={aoSair}
      />

      <View style={estilos.rodape}>
        <Text style={estilos.textoRodape}>
          Token JWT salvo localmente apos login. Proximo passo: usar o token no
          header Authorization para endpoints protegidos.
        </Text>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: "#fff",
  },
  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },
  saudacao: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: "#555",
    marginBottom: 20,
  },
  secao: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  rodape: {
    marginTop: 24,
    padding: 12,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
  },
  textoRodape: {
    fontSize: 13,
    color: "#1565c0",
    lineHeight: 18,
  },
});

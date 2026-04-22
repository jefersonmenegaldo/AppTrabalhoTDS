import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  titulo: string;
  descricao?: string;
  aoPressionar: () => void;
};

/**
 * Item de menu reutilizavel para a tela principal (didatico).
 */
export default function ItemMenu({ titulo, descricao, aoPressionar }: Props) {
  return (
    <Pressable
      onPress={aoPressionar}
      style={({ pressed }) => [
        estilos.cartao,
        pressed && estilos.cartaoPressionado,
      ]}
    >
      <View>
        <Text style={estilos.titulo}>{titulo}</Text>
        {descricao ? (
          <Text style={estilos.descricao}>{descricao}</Text>
        ) : null}
      </View>
      <Text style={estilos.seta}>›</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  cartaoPressionado: {
    opacity: 0.85,
    backgroundColor: "#ebebeb",
  },
  titulo: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  descricao: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
  },
  seta: {
    fontSize: 22,
    color: "#888",
    marginLeft: 8,
  },
});

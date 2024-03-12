import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

import { api } from "../../services/api";

export default function Dashboard() {

  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
  const [number, setNumber] = useState("");

  async function openOrder() {
    if (number === "") {
      return;
    }

    const response = await api.post("/order", {
      table: Number(number),
    });

    //console.log(response.data);

    navigation.navigate("Order", { number: number, order_id: response.data.id })

    setNumber("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nova Reunião</Text>

      <TextInput
        placeholder="Digite o numero da reunião"
        placeholderTextColor={"#000000"}
        style={styles.input}
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir Reunião</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#297261",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#F0F0F0",
    marginBottom: 24,
  },
  input: {
    width: "90%",
    height: 60,
    backgroundColor: "#1a5536",
    borderRadius: 4,
    textAlign: "center",
    paddingHorizontal: 8,
    fontSize: 18,
    color: "#F0F0F0",
  },
  button: {
    width: "90%",
    height: 40,
    backgroundColor: "#1a5553",
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: "center",
    alignContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F0F0F0",
    textAlign: "center",
  },


});


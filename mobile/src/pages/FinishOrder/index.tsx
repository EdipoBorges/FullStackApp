import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

import { api } from "../../services/api";

type RouteDetailParams = {
    FinishOrder: {
        number: number | string;
        order_id: string;
    };
};

type FinishOrderRouteProp = RouteProp<RouteDetailParams, "FinishOrder">;

export default function FinishOrder() {
    const route = useRoute<FinishOrderRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

    async function handleFinish() {
        try {
            await api.put(`/order/send`, {
                order_id: route.params?.order_id,
            });

            navigation.popToTop();
            
        } catch (err) {
            console.log("Erro ao Finalizar. Tente novamente mais tarde ",err);
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.alert} >Você deseja finalizar essa Reunião?</Text>
            <Text style={styles.title} >
                Reunião {route.params?.number}
                </Text>

            <TouchableOpacity style={styles.button} onPress={handleFinish}>
                <Text style={styles.textButton} >Finalizar Reunião</Text>
                <Feather name="airplay" size={24} color="#1e8b71" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1e8b71",
        paddingVertical: '5%',
        paddingHorizontal: '4%',
        alignItems: "center",
        justifyContent: "center",
    },
    alert: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 12,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#27cbcb",
        flexDirection: "row",
        width: "75%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
    },
    textButton: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: "bold",
        color: "black",
    },

});

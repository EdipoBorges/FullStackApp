import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Order() {
    return (
        <View style={styles.container}>
            <Text>Tela Reunião</Text>
        </View>
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
});

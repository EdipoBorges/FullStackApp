import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList } from "react-native";

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { api } from "../../services/api";
import { ModalPiker } from "../../components/ModalPiker";
import { ListItem } from "../../components/ListItem";

type RouteDetailsParams = {
    Order: {
        number: string | number;
        order_id: string;
    };
};

export type CategoryProps = {
    id: string;
    name: string;
};

type ContactProps = {
    id: string;
    name: string;
};

type ItemProps = {
    id: string;
    product_id: string;
    name: string;
    amount: string;
};

type OrderRouteProps = RouteProp<RouteDetailsParams, "Order">;

export default function Order() {
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [contact, setContact] = useState<ContactProps[] | []>([]);
    const [contactSelected, setContactSelected] = useState<ContactProps | undefined>();
    const [modalContactVisible, setModalContactVisible] = useState(false);

    const [amount, setAmount] = useState('1');
    const [items, setItems] = useState<ItemProps[]>([]);

    useEffect(() => {
        async function loadInfo() {

            const response = await api.get('/category');

            setCategory(response.data);
            setCategorySelected(response.data[0]);
        }
        loadInfo();
    }, []);

    useEffect(() => {
        async function loadContacts() {
            const response = await api.get('/category/product', {
                params: {
                    category_id: contactSelected?.id
                }
            }
            );

            setContact(response.data);
            setContactSelected(response.data[0]);
        }
        loadContacts();
    }, [categorySelected]);

    async function handleCloseOrder() {
        try {
            await api.delete('/order', {
                params: {
                    order_id: route.params?.order_id
                }
            });

            navigation.goBack();
        }
        catch (err) {
            console.log(err);
        }
    }

    function handleChangeCategory(item: CategoryProps) {
        setCategorySelected(item);
    }

    function handleChangeContact(item: ContactProps) {
        setContactSelected(item);
    }

    //adicionando item na lista
    async function handleAdd() {
        const response = await api.post('/order/add', {
            order_id: route.params?.order_id,
            product_id: contactSelected?.id,
            amount: Number(amount)
        })

        let data = {
            id: response.data.id,
            product_id: contactSelected?.id as string,
            name: contactSelected?.name as string,
            amount: amount
        }
        setItems(oldArray => [...oldArray, data])
    }

    async function handleDeleteItem(item_id: string) {
        await api.delete('/order/remove', {
            params: {
                item_id: item_id
            }
        });

        let removeItem = items.filter(item => {
            return (item.id !== item_id);        
        });
        setItems(removeItem);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Reunião {route.params.number}
                </Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name="trash-2" size={28} color="red" />
                    </TouchableOpacity>
                )}
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
                    <Text style={{ color: "#fff" }}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {contact.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalContactVisible(true)}>
                    <Text style={{ color: "#fff" }}>
                        {contactSelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.qtdContainer}>
                <Text style={styles.qtdText}>Multiplicador Contratual =</Text>
                <TextInput
                    style={[styles.input, { width: "30%", textAlign: "center" }]}
                    keyboardType="numeric"
                    placeholderTextColor="#fff"
                    value={amount}
                    onChangeText={setAmount}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
                    disabled={items.length === 0}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType="fade"
            >
                <ModalPiker
                    handleCloseModal={() => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={handleChangeCategory}
                />
            </Modal>
            <Modal
                transparent={true}
                visible={modalContactVisible}
                animationType="fade">
                <ModalPiker
                    handleCloseModal={() => setModalContactVisible(false)}
                    options={contact}
                    selectedItem={handleChangeContact}
                />

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%',
        backgroundColor: "#297261",
    },
    header: {
        flexDirection: "row",
        marginBottom: 12,
        marginTop: 24,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginRight: 12,
    },
    input: {
        height: 40,
        backgroundColor: "#1e5f4b",
        borderRadius: 4,
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 8,
        marginBottom: 12,
        color: "#fff",
        fontSize: 18,
    },
    qtdContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    qtdText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },

    actions: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    buttonAdd: {
        backgroundColor: "#1e4c5f",
        borderRadius: 4,
        height: 40,
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#000000",
        fontSize: 18,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#3e5f1e",
        borderRadius: 4,
        height: 40,
        width: "75%",
        alignItems: "center",
        justifyContent: "center",
    },
});

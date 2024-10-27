import HeaderApp from "@/components/other/header";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';

interface StatusProps {
    funvoid: () => void
}

interface IHistoryExam {
    id: number;
    date: string;
    answers: string;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        backgroundColor: "white",
        paddingBottom: 25,
    },
    text_header: {
        fontSize: 25,
        color: "#4C4A54",
        fontWeight: "700",
        textAlign: "center",
        paddingTop: 20,
    },
    itemHistory: {
        // borderWidth:1,
        // borderColor: "red",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 15,
        marginHorizontal: 40,
        borderRadius: 10,
        backgroundColor: "#A3EFA5",
        elevation: 5,
    },
    circleOverlay: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
    },
    infoHistory: {
        paddingStart: 20,
        color: "#4C4A59",
        fontSize: 16,
        fontWeight: "500",
    },
})

const HistoryExamLayout = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    useEffect(() => {
        // Ẩn tabBar khi vào trang HistoryExamScreen
        navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
        // Hiện lại tabBar khi rời khỏi trang
        return () => navigation.getParent()?.setOptions({ tabBarStyle: { display: 'flex' } });
    }, [navigation]);

    const [historyexems, setHistoryexems] = useState<IHistoryExam[]>([
        { id: 1, date: "20/01/2024", answers: "20/20" },
        { id: 2, date: "20/01/2024", answers: "20/20" },
        { id: 3, date: "20/01/2024", answers: "20/20" },
        { id: 4, date: "20/01/2024", answers: "20/20" },
        { id: 5, date: "20/01/2024", answers: "20/20" },
        { id: 6, date: "20/01/2024", answers: "20/20" },
        { id: 7, date: "20/01/2024", answers: "20/20" },
        { id: 8, date: "20/01/2024", answers: "20/20" },
        { id: 9, date: "20/01/2024", answers: "20/20" },
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back-outline"
                    size={40}
                    color="black"
                    style={{ zIndex: 10, position: "absolute", paddingLeft: 10, }}
                    onPress={() => navigation.navigate("userInfo")}
                />
                <Text style={styles.text_header}>Lịch sử kiểm tra</Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    data={historyexems}
                    keyExtractor={(item) => item.id + ""}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.itemHistory}>
                                <View style={styles.circleOverlay}></View>
                                <View>
                                    <Text style={styles.infoHistory}>Ngày : {item.date}</Text>
                                    <Text style={styles.infoHistory}>Số câu trả lời đúng : {item.answers}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default HistoryExamLayout;
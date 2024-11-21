import HeaderApp from "@/components/other/header";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Svg, { Circle } from "react-native-svg";
import { hisExamsStyles } from "../css/hisExamsStyles";

interface IHistoryExam {
    id: number;
    date: string;
    answers: number;
}

// const hisExamsStyles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#FFFFFF",
//     },
//     header: {
//         backgroundColor: "white",
//         paddingBottom: 25,
//     },
//     text_header: {
//         fontSize: 25,
//         color: "#4C4A54",
//         fontWeight: "700",
//         textAlign: "center",
//         paddingTop: 20,
//     },
//     itemHistory: {
//         flexDirection: "row",
//         paddingHorizontal: 20,
//         paddingVertical: 15,
//         marginBottom: 15,
//         marginHorizontal: 40,
//         borderRadius: 10,
//         backgroundColor: "#A3EFA5",
//         elevation: 5,
//     },
//     circleOverlay: {
//         width: 40,
//         height: 40,
//         borderRadius: 30,
//         backgroundColor: "#FFFFFF",
//         justifyContent: "center",
//         alignItems: "center",
//         shadowColor: "#000",

//         elevation: 5,
//     },
//     percentageText: {
//         position: "absolute",
//         color: "black",
//         fontSize: 14,
//         fontWeight: "500",
//     },
//     infoHistory: {
//         paddingStart: 20,
//         color: "#4C4A59",
//         fontSize: 16,
//         fontWeight: "500",
//     },
// });

const HistoryExamLayout = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const totalQuestions = 20;
    const radius = 20; // bán kính của vòng tròn
    const strokeWidth = 4;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
    }, [navigation]);

    const calculatePercentage = (correctAnswers: number) => {
        return Math.round((correctAnswers / totalQuestions) * 100);
    };

    const calculateStrokeDashoffset = (percentage: number) => {
        return circumference - (percentage / 100) * circumference;
    };

    const [historyexams, setHistoryexams] = useState<IHistoryExam[]>([
        { id: 1, date: "20/01/2024", answers: 20 },
        { id: 2, date: "20/01/2024", answers: 16 },
        { id: 3, date: "20/01/2024", answers: 15 },
        { id: 4, date: "20/01/2024", answers: 3 },
        { id: 5, date: "20/01/2024", answers: 10 },
        { id: 6, date: "20/01/2024", answers: 20 },
        { id: 7, date: "20/01/2024", answers: 16 },
        { id: 8, date: "20/01/2024", answers: 15 },
        { id: 9, date: "20/01/2024", answers: 3 },
        { id: 10, date: "20/01/2024", answers: 10 },
    ]);

    return (
        <View style={hisExamsStyles.container}>
            <View style={hisExamsStyles.header}>
                <Ionicons
                    name="arrow-back-outline"
                    size={40}
                    color="black"
                    style={{ zIndex: 10, position: "absolute", paddingLeft: 10 }}
                    onPress={() => navigation.navigate("userInfo")}
                />
                <Text style={hisExamsStyles.text_header}>Lịch sử kiểm tra</Text>
            </View>
            <View style={hisExamsStyles.container}>
                <FlatList
                    data={historyexams}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const percentage = calculatePercentage(item.answers);
                        const strokeDashoffset = calculateStrokeDashoffset(percentage);

                        return (
                            <View style={hisExamsStyles.itemHistory}>
                                <View style={hisExamsStyles.circleOverlay}>
                                    <Svg width={50} height={50}>
                                        <Circle
                                            cx="25"
                                            cy="25"
                                            r={radius}
                                            stroke="#9e9e9e"
                                            strokeWidth={strokeWidth}
                                            fill="none"
                                        />
                                        <Circle
                                            cx="25"
                                            cy="25"
                                            r={radius}
                                            stroke="#7175D8"
                                            strokeWidth={strokeWidth}
                                            fill="none"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={strokeDashoffset}
                                            strokeLinecap="round"
                                            transform={`rotate(-90 25 25)`}
                                        />
                                    </Svg>
                                    <Text style={hisExamsStyles.percentageText}>{percentage}%</Text>
                                </View>
                                <View>
                                    <Text style={hisExamsStyles.infoHistory}>Ngày : {item.date}</Text>
                                    <Text style={hisExamsStyles.infoHistory}>
                                        Số câu trả lời đúng : {item.answers}/{totalQuestions}
                                    </Text>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    );
};

export default HistoryExamLayout;

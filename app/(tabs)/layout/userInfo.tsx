import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OPENSANS_REGULAR, SPACEMONO_REGULAR } from "../css/const";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import headerInfo from "../../../assets/images/png/headerInfo.png";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import userInforIcon2 from "../../../assets/images/png/imageInfo2.png";
import userInforIcon1 from "../../../assets/images/png/imageInfo1.png";
import userInforIcon3 from "../../../assets/images/png/imageInfo3.png";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { getLogout } from "../data";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1
    },
    headerImage: {
        height: 267,
        width: "100%",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    circleOverlay: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -45 }, { translateY: -100 }],
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#FFFFFF",
        elevation: 5,
        alignItems: "center",
    },
    textContainer: {
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: [{ translateX: -60 }],
        alignItems: "center",
    },
    userName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    userEmail: {
        fontSize: 16,
        fontStyle: "italic",
        color: "white",
        // fontFamily: "Helvet",
    },
    rectangleContainer: {
        position: "absolute",
        top: "70%",
        left: "50%",
        transform: [{ translateX: -130 }],
        flexDirection: "row",
        gap: 25,
    },
    rectangle: {
        width: 120,
        height: 60,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    userInforIcon1: {
        height: 25,
        width: 25,
        marginStart: 5,
    },
    bodyInfo: {
        marginHorizontal: 40,
        marginTop: 80,
    },
    itemBody: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 15,
        gap: 15,
        // borderWidth: 1,
        // borderColor: "#4C4A54",
        marginBottom: 30,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: "white",
    },
    itemText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4C4A54",
    },
});

const UserInfoScreen = () => {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    return (
        <View style={styles.container}>
            {/* Header */}
            <View>
                <Image style={styles.headerImage} source={headerInfo} />
                <View style={styles.circleOverlay}>
                    <Image style={{
                        height: 35,
                        width: 30,
                        marginTop: 25
                    }}
                        source={userInforIcon1}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>Name</Text>
                    <Text style={styles.userEmail}>user@gmail.com</Text>
                </View>
                <View style={styles.rectangleContainer}>
                    <View style={styles.rectangle}>
                        <View>
                            <Image style={styles.userInforIcon1}
                                source={userInforIcon2}
                            />
                        </View>
                        <View>
                            <Text style={{ color: "#545454" }}>Progress</Text>
                            <Text>0/8777</Text>
                        </View>

                    </View>
                    <View style={styles.rectangle}>
                        <View>
                            <Image style={styles.userInforIcon1}
                                source={userInforIcon3}
                            />
                        </View>
                        <View>
                            <Text style={{ color: "#545454" }}>Coin</Text>
                            <Text>0 dats</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Body */}
            <View style={styles.bodyInfo}>
                <TouchableOpacity
                style={styles.itemBody}
                onPress={() => navigation.navigate("historyExams")}>
                    <FontAwesome6 name="list-check" size={24} color="black" />
                    <Text style={styles.itemText}>Lịch sử kiểm tra</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.itemBody}
                onPress={() => navigation.navigate("historyRewards")}>
                    <MaterialIcons name="list-alt" size={30} color="black" />
                    <Text style={styles.itemText}>Lịch sử đổi thưởng</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.itemBody}
                onPress={() => getLogout()}>
                    <MaterialCommunityIcons name="logout" size={24} color="red" />
                    <Text style={styles.itemText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserInfoScreen;
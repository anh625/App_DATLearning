import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import vsgameImg from "../../../../assets/images/png/game/game.png";
import guideIcon from "../../../../assets/images/png/game/guide.png";
import rankIcon from "../../../../assets/images/png/game/rank.png";
import startIcon from "../../../../assets/images/png/game/pvp.png";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import GuideScreen from "./guide";

const GameScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  // Hàm đóng modal
  const closeModal = () => setModalVisible(false);
  return (
    <View style={style.container}>
      {/* // headerp */}
      <View style={style.header}>
        <Text style={style.text_header}>Trò chơi</Text>
      </View>

      {/* // body  */}
      <View style={style.vsSection}>
        <Image source={vsgameImg} style={style.vsgame} />
      </View>

      {/* Buttons */}
      <View style={style.buttonsContainer}>
        {/* Hướng dẫn  */}
        <TouchableOpacity
          style={style.buttonGuide}
        onPress={() => setModalVisible(true)}
        >
          <Image source={guideIcon} style={style.icon} />
          <Text style={[style.buttonText, { color: "black" }]}>Hướng dẫn</Text>
        </TouchableOpacity>

        {/* Bảng xếp hạng  */}
        <TouchableOpacity
          style={style.buttonRanking}
          onPress={() => navigation.navigate("ranks")}
        >
          <Image source={rankIcon} style={style.icon} />
          <Text style={[style.buttonText, { color: "#FFFFFF" }]}>
            Bảng xếp hạng
          </Text>
        </TouchableOpacity>

        {/* Bắt đầu trò chơi  */}
        <TouchableOpacity style={style.buttonStart}>
          <Image source={startIcon} style={style.icon} />
          <Text style={[style.buttonText, { color: "#FFFFFF" }]}>Bắt đầu</Text>
        </TouchableOpacity>
      </View>
      {/* Hiển thị GuideScreen khi modalVisible là true */}
      {modalVisible && (
        <GuideScreen visible={modalVisible} onClose={closeModal} />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    backgroundColor: "#FFFFFF",

  },
  header: {
    height: 65,
    backgroundColor: "#459DE4",
    justifyContent: "center",
    alignItems: "center",
  },
  text_header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  vsSection: {
    // borderWidth: 1,
    marginTop: 25,
    alignItems: "center",
  },

  vsgame: {
    width: 300,
    height: 300,
  },
  buttonsContainer: {
    // flex: 1,
    // borderWidth: 1,
    // borderColor:"red",
    alignItems: "center",
    marginTop: 50,
  },
  buttonGuide: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#AAAAAA",
    flexDirection: "row",
    elevation: 2,
  },
  buttonRanking: {
    backgroundColor: "#8AD0E7",
    padding: 10,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#AAAAAA",
    flexDirection: "row",
    elevation: 2,
  },
  buttonStart: {
    backgroundColor: "#41669C",
    padding: 10,
    borderRadius: 5,
    width: "70%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#AAAAAA",
    flexDirection: "row",
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    // borderWidth:1,
  },
  buttonText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    // borderWidth: 1,
    marginEnd: 30,
    textAlign: "center",
  },
});

export default GameScreen;

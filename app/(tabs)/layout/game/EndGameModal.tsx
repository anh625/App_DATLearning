import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import img_gamelose from "../../../../assets/images/png/game/gamelose.png";
import img_cup from "../../../../assets/images/png/game/cup_icon.png";
interface EndGameModalProps {
  visible: boolean;
  score: number[];
}

const EndGameModal: React.FC<EndGameModalProps> = ({ visible, score }) => {
  const handleShare = async () => {
    <></>;
  };

  const handleQuit = () => {
    <></>;
  };
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.container}>
        {/* header  */}
        <View style={styles.header}>
          <Image source={img_gamelose} style={styles.imgendgame} />
          <View style={styles.pluspoint}>
            <Image source={img_cup} style={styles.imgcup} />
            <Text style={styles.point}> +15</Text>
          </View>
        </View>

        {/* body  */}
        <View style={styles.body}>
          <View style={styles.scoreContainer}>
            <View style={styles.circle}>
              <Image source={img_cup} style={styles.avatar} />
            </View>
            <View style={styles.centerContainer}>
              <Text style={styles.scoreTitle}>SCORE</Text>
              <Text style={styles.scoreValue}>
                {score[0]} - {score[1]}
              </Text>
            </View>
            <View style={styles.circle}>
              <Image source={img_cup} style={styles.avatar} />
            </View>
          </View>
        </View>

        {/* footer  */}
        <View style={styles.footer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.shareButton]}
              onPress={handleShare}
            >
              <Text style={styles.buttonTextShare}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.quitButton]}
              onPress={handleQuit}
            >
              <Text style={styles.buttonTextQuit}>Quit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "92.3%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // borderWidth: 1,
    // borderColor: "red",
    bottom: 0,
  },
  header: {
    height: 210,
    backgroundColor: "#8AD0E7",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
  },
  imgendgame: {
    height: 150,
    width: 150,
    marginTop: 30,
  },
  pluspoint: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 300,
    alignItems: "center",
    marginBottom: 10,
  },
  imgcup: {
    height: 30,
    width: 30,
  },
  point: {
    color: "#A19116",
    fontSize: 17,
    fontWeight: "bold",
  },
  body: {
    // borderWidth: 1,
    height: 450,
  },
  scoreContainer: {
    // borderWidth: 1,
    // flex: 1,
    marginHorizontal: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#695F5F",
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginTop: 280,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#D9D9D9",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
  },
  scoreTitle: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  scoreValue: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  footer: {
    flex: 1,
    backgroundColor: "#8AD0E7",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 60,
    width: 120,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  shareButton: {
    backgroundColor: "#FFFF",
  },
  quitButton: {
    backgroundColor: "#41669C",
  },
  buttonTextShare: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextQuit: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EndGameModal;

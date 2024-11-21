import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { rankStyles } from "../../css/rankStyles";

const RankSceen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    return () =>
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
  }, [navigation]);

  return (
    <View style={rankStyles.container}>
      <View style={rankStyles.header}>
        <Ionicons
          name="arrow-back-outline"
          size={40}
          color="#FFFFFF"
          style={{ zIndex: 10, paddingLeft: 10 }}
          onPress={() => navigation.navigate("homegames")}
        />
        <Text style={rankStyles.headerTitle}>Bảng xếp hạng</Text>
      </View>
      <View style={rankStyles.topContainer}>
        <View style={rankStyles.mainCardContainer}>
          {[2, 1, 3].map((item, index) => {
            return (
              <View
                key={index}
                style={[rankStyles.mainCard, item !== 1 && { marginTop: 20 }]}
              >
                <Image
                  source={require("../../../../assets/images/png/rewardBear.png")}
                  style={rankStyles.mainCardImage}
                  resizeMode="cover"
                />
                <Text style={rankStyles.mainCardTitle}>Vishu</Text>
                {/* <View style={style.mainCardRankContainer}> */}
                  {/* <Text style={style.mainCardRankContainerText}>{item}</Text> */}
                  {/* Thay đổi thành ảnh tương ứng */}
                  {item === 1 ? (
                    <Image
                      source={require("../../../../assets/images/png/game/vang.png")} // Thay bằng ảnh huy chương vàng
                      style={rankStyles.mainCardRankContainer}
                    />
                  ) : item === 2 ? (
                    <Image
                      source={require("../../../../assets/images/png/game/bac.png")} // Thay bằng ảnh huy chương bạc
                      style={rankStyles.mainCardRankContainer}
                    />
                  ) : (
                    <Image
                      source={require("../../../../assets/images/png/game/dong.png")} // Thay bằng ảnh huy chương đồng
                      style={rankStyles.mainCardRankContainer}
                    />
                  )}
                </View>
              // </View>
            );
          })}
        </View>
      </View>

      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 5, 6, 7, 8, 9]}
        renderItem={({ item, index }) => {
          return (
            <View style={rankStyles.card}>
              <View style={rankStyles.cardDataContainer}>
                <Text style={rankStyles.cardIndex}>{index + 1}</Text>
                <Image
                  source={require("../../../../assets/images/png/rewardBear.png")}
                  style={rankStyles.cardImage}
                  resizeMode="cover"
                />
                <Text style={rankStyles.cardTitle}>Vishu Chaturvedi</Text>
              </View>
              <View style={rankStyles.cardRankContainer}>
                <Text style={rankStyles.cardRankTitle}>3456,789</Text>
              </View>
            </View>
          );
        }}
      />
      <View style={rankStyles.cardbyme}>
          <View style={rankStyles.cardDataContainer}>
            <Image
              source={require("../../../../assets/images/png/rewardBear.png")}
              style={rankStyles.cardImage}
              resizeMode="cover"
            />
            <Text style={rankStyles.cardTitleByMe}>Vishu Chaturvedi (YOU)</Text>
          </View>
          <View style={rankStyles.cardRankContainer}>
            <Text style={rankStyles.cardRankTitle}>3456,789</Text>
          </View>
        </View>
      </View>
  );
};

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   header: {
//     height: 65,
//     backgroundColor: "#316BA8",
//     // justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "row",
//     // borderWidth: 1,
//   },
//   headerTitle: {
//     flex: 1,
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//     // borderWidth: 1,
//     marginEnd: 50,
//     textAlign: "center",
//   },
//   topContainer: {
//     backgroundColor: "#C7E9FF",
//     padding: 20,
//     paddingTop: 30,
//     borderBottomRightRadius: 40,
//     borderBottomLeftRadius: 40,
//     gap: 20,
//     paddingBottom: 40,
//   },
//   mainCardContainer: {
//     flexDirection: "row",
//     gap: 20,
//     justifyContent: "center",
//   },
//   mainCard: {
//     backgroundColor: "#61C0DD",
//     padding: 20,
//     alignItems: "center",
//     borderRadius: 20,
//     gap: 15,
//     paddingBottom: 30,
//     height: 170,
//   },
//   mainCardImage: {
//     width: 70,
//     height: 90,
//     borderRadius: 20,
//   },
//   mainCardTitle: {
//     color: "while",
//     fontSize: 17,
//     fontWeight: "700",
//   },
//   mainCardRankContainer: {
//     // backgroundColor: "#FFC107",
//     width: 40,
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 30,
//     position: "absolute",
//     bottom: -15,
//   },
//   mainCardRankContainerText: {
//     color: "while",
//   },
//   card: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderColor: "#E0E0E0",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 10,
//     marginVertical: 5,
//   },
//   cardDataContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   cardIndex: {
//     color: "#316BA8",
//     fontWeight: "bold",
//     // borderWidth:1,
//     width: 40,
//     textAlign: "center"
//   },
//   cardImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//     marginLeft: 5,
//     // borderWidth: 1,
//   },
//   cardTitle: {
//     color: "#333333",
//     fontSize: 17,
//     // fontWeight: "500",
//     // borderWidth: 1
//   },
//   cardRankContainer: {},
//   cardRankTitle: {
//     color: "#FFC107",
//     fontWeight: "700",
//   },
//   cardbyme: {
//     // paddingHorizontal: 20,
//     paddingRight: 20,
//     paddingLeft: 30,
//     paddingVertical: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderTopColor: "#E0E0E0",
//     backgroundColor: "#C7E9FF",
//     borderRadius: 5,
//   },
//   cardTitleByMe:{
//     fontSize: 16,
//     fontWeight: "700",
//     marginLeft: 10
//   },
// });
export default RankSceen;

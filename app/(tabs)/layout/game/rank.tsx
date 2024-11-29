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

export default RankSceen;

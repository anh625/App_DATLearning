import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { CompatClient, Stomp, Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import apiClient from "../../bearerToken";
import { getServerIpAddress, getTokenAuthor } from '@/app/(tabs)/data';

const GamePlayScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const [question, setQuestion] = useState<string>(""); // Câu hỏi hiện tại
  // const [answers, setAnswers] = useState<string[]>([]); // Các đáp án
  // const [correctAnswer, setCorrectAnswer] = useState<string>(""); // Đáp án đúng
  const [score, setScore] = useState<number>(0); // Điểm của người chơi
  const [opponentScore, setOpponentScore] = useState<number>(0); // Điểm đối thủ
  const [stomp, setStomp] = useState<CompatClient | null>(null);
  // const [roomId, setRoomId] = useState<String | null>(null);
  const [connected, setConnected] = useState(false);

  const fetchGames = async () => {
    try {
      const apiInstance = await apiClient();
      const response = await apiInstance.get("/game/join");
      const roomId = (response.data.roomId);

      console.log(roomId);
      const userId = "";
  

      
          const socket = new Client({
            brokerURL: `ws://${getServerIpAddress()}:8080/chat`,
          });
      
          socket.onConnect = () => {
            setConnected(true);
            socket.subscribe('/topic/game', (message) => {
              console.log(message.body);
            });
          };
      
          socket.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame);
            console.error('Additional details: ' + frame.headers);
          };
      
          socket.activate();
      
      
     
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }
  useEffect(() => {
    fetchGames();
    // let stompClient: CompatClient | null = null;
    //   let socket: any = null;
    //   const SOCKET_URL = `http://${getServerIpAddress()}:8080/chat`;
    //   if(socket == null && stomp == null && stompClient == null){
    //     socket = new SockJS(SOCKET_URL);
    //     stompClient = Stomp.over(socket);
    //     if (!socket.OPEN) {
    //       stompClient.connect({"token" : getTokenAuthor()}, (frame: any) => {
    //         setTimeout(() => {
    //           setStomp(stompClient);
    //           stompClient!.subscribe(`/topic/game/${roomId}`, (messageOutput: any) => {
    //             console.log(JSON.parse(messageOutput))
    //           })
    //           // stompClient!.subscribe(`/topic/game/${roomId}/${userId}`, (messageOutput: any) => {
    //           //   console.log(JSON.parse(messageOutput))
    //           // })
    //         }, 1500)
    //       })
    //     }
    //   }
  }, []);

  // Trạng thái câu hỏi và đáp án
  const [question, setQuestion] = useState<string>("DCMMMM");
  const [answers, setAnswers] = useState<string[]>([
    "Thái",
    "Nam",
    "Hùng",
    "Phong",
    "Vinh",
    "Quân",
    "Đức",
    "Lâm",
  ]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("Thái");
  
  // Hàm xử lý khi chọn đáp án
  const handleAnswerPress = (selectedAnswer: string) => {
    if (selectedAnswer === correctAnswer) {
      Alert.alert("Đúng rồi!", "Bạn đã chọn đúng đáp án!", [{ text: "OK" }]);
    } else {
      Alert.alert("Sai rồi!", "Hãy thử lại lần sau.", [{ text: "OK" }]);
    }
  };

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    return () =>
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back-outline"
          size={40}
          color="#FFFFFF"
          style={{ zIndex: 10, paddingLeft: 10 }}
          onPress={() => navigation.navigate("homegames")}
        />
        <Text style={styles.headerTitle}>Bảng xếp hạng</Text>
      </View>
      {/* Thông tin người chơi */}
      <View style={styles.playerInfo}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.playerName}>Thái</Text>
          <Text style={styles.playerStats}>🏆 199203</Text>
          <Text style={styles.playerStats}>✔️ 0</Text>
        </View>
      </View>

      {/* Câu hỏi */}
      <Text style={styles.question}>{question}</Text>

      {/* Các đáp án */}
      <View style={styles.answersGrid}>
        {answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={styles.answerButton}
            onPress={() => handleAnswerPress(answer)}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Thông tin người chơi cuối màn hình */}
      <View style={styles.footer}>
        <View style={styles.playerInfo}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.playerName}>Thái</Text>
            <Text style={styles.playerStats}>🏆 199203</Text>
            <Text style={styles.playerStats}>✔️ 0</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    // padding: 10,
  },
  header: {
    height: 65,
    backgroundColor: "#41669C",
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // borderWidth: 1,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    // borderWidth: 1,
    marginEnd: 50,
    textAlign: "center",
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B3E5FC",
    padding: 10,
    // marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  playerStats: {
    fontSize: 14,
    color: "#4CAF50",
  },
  question: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  answersGrid: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    // borderWidth: 1
  },
  answerButton: {
    width: "40%",
    backgroundColor: "#fff",
    paddingVertical: 40,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    // borderWidth:1
  },
  answerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    // backgroundColor: "#B3E5FC",
    // padding: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default GamePlayScreen

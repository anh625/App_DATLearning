import { StyleSheet } from "react-native";

export const dictionaryStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5', // Nền sáng hơn
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
    body: {
      flex: 1,
      paddingHorizontal: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#1e90ff', // Màu xanh tương tự header
      borderRadius: 10,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 5,
      marginVertical: 30,
      marginHorizontal: 25,
      gap: 15
    },
    searchInput: {
      flex: 1,
      paddingVertical: 8,
      fontSize: 16,
      color: "#333", // Màu chữ đen đậm
    },
    noResultsText: {
      fontSize: 18,
      fontWeight: '500',
      color: "#888888",
      textAlign: 'center',
      marginTop: 20,
    },
    itemWord: {
      backgroundColor: "#ffffff", // Nền trắng sáng
      padding: 20,
      marginHorizontal: 25,
      marginVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
      elevation: 3,
    },
    wordText: {
      fontSize: 20,
      fontWeight: '600',
      color: "#1e90ff", // Màu xanh để làm nổi bật từ vựng
    },
    meaningText: {
      fontSize: 16,
      color: "#333333", // Màu chữ đen cho nghĩa
      marginVertical: 10,
    },
    exampleText: {
      fontSize: 14,
      color: "#459DE4", // Màu xanh nhạt cho ví dụ
      fontStyle: 'italic',
    },
  });
import { useState } from "react";
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface IWord {
  id: number;
  word: string;
  meaning: string;
  example: string;
}

const DictionaryScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [hasResults, setHasResults] = useState(true);

  const words: IWord[] = [
    { id: 1, word: "Apple", meaning: "A round fruit with red, green, or yellow skin and a whitish interior.", example: "I ate an apple for breakfast." },
    { id: 2, word: "Banana", meaning: "A long curved fruit with a yellow skin and soft, sweet, white flesh inside.", example: "She peeled the banana and ate it." },
    { id: 3, word: "Cat", meaning: "A small domesticated carnivorous mammal with soft fur, a short snout, and retractile claws.", example: "My cat loves to sleep on the couch." },
    { id: 4, word: "Dog", meaning: "A domesticated carnivorous mammal that typically has a long snout, an acute sense of smell, and barks.", example: "The dog ran after the ball." },
  ];

  const filteredWords = words.filter(word =>
    word.word.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (text: string) => {
    setSearchText(text);

    const filteredWords = words.filter(word =>
      word.word.toLowerCase().includes(text.toLowerCase())
    );

    if (filteredWords.length > 0) {
      setHasResults(true);
    } else {
      setHasResults(false); 
    }
  };

  const handleDismiss = () => {
    if (!hasResults) {
        setSearchText('');    
        setHasResults(true); 
        Keyboard.dismiss();
    } else {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Tra từ điển</Text>
      </View>
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View style={styles.body}>
          <View style={styles.searchContainer}>
            <FontAwesome name="search" size={24} color="#fff" />
            <TextInput
              style={styles.searchInput}
              placeholder="Nhập từ cần tìm"
              placeholderTextColor="#a1a1a1"
              value={searchText}
              onChangeText={handleSearch}
              onFocus={() => setSearchText('')}
            />
          </View>
          {!hasResults ? (
            <Text style={styles.noResultsText}>Không tìm thấy kết quả</Text>
          ) : (
            <FlatList
              data={filteredWords}
              numColumns={1}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity>
                    <View style={styles.itemWord}>
                      <Text style={styles.wordText}>{item.word}</Text>
                      <Text style={styles.meaningText}>{item.meaning}</Text>
                      <Text style={styles.exampleText}>{`Ví dụ: ${item.example}`}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default DictionaryScreen;

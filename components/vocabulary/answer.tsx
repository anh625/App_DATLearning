import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from "react";
interface StatusProps{
    vocabularys: Vocabulary;
    iVisiable: boolean;
    setIVisiable: (v: boolean) => void;
}

interface Vocabulary {
    id: number;
    word: string;
    meaning: string;
    transcription: string;
    type: string;
    used_en: string;
    used_vi: string;
    answer_a: string;
    answer_b: string;
    answer_c: string;
    answer_d: string;
    answer_correct: string,
}

const Answer:React.FC<StatusProps>  = ({vocabularys, iVisiable, setIVisiable}) => {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={iVisiable}
        >
            <View style={styleGlobal.mainLayout}>
                <View style={styleGlobal.answerLayout}>
                    <Image style={styleGlobal.imageAnswer} source={require("@/assets/images/png/answer.png")} />
                    <View style={styleGlobal.viewWordAnswer}> 
                        <View style={styleGlobal.wordAnswer}>
                            <Text style={styleGlobal.textWAnswer}>{vocabularys.word}</Text>
                            <TouchableOpacity>
                                <FontAwesome5 name="volume-down" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styleGlobal.textWAnswer}>{vocabularys.meaning}</Text>
                        <Text style={styleGlobal.textWAnswer}>{vocabularys.transcription}</Text>
                        <View style={styleGlobal.viewTypeAnswer}>
                            <Text style={styleGlobal.textTAnswer}>{vocabularys.type}</Text>
                        </View>
                        <Text style={styleGlobal.textUAnswer}>{vocabularys.used_en}</Text>
                        <Text style={styleGlobal.textUAnswer}>{vocabularys.used_vi}</Text>
                    </View>
                    <TouchableOpacity style={styleGlobal.butAnswer} onPress={() => setIVisiable(false)}>
                        <Text style={styleGlobal.textButAnswer}>Tiếp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
export default Answer;
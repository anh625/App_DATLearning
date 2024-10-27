import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { Text, TouchableOpacity, View } from "react-native"
import HeaderApp from "../other/header";
import { useState } from "react";
interface StatusProps {
    backVoid: () => void,
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
}

const Question: React.FC<StatusProps>  = ({backVoid}) => {
    const [vocabularys, setVocabularys] = useState<Vocabulary>(
        {id:1, word:"Please", meaning: "Vui lòng", transcription: "/pliz/", type:"adverb", 
            used_en:"Used when we want to politely ask for something", 
            used_vi:"Được sử dụng khi chúng ta muốn lịch sự yêu cầu một cái gì đó",
            answer_a:"People",
            answer_b:"Person",
            answer_c:"Boy",
            answer_d:"Please",
        }
    )
    return(
        <View style={styleGlobal.mainLayout}>
            <HeaderApp isHome={false} title="Hello and goodbye" funVoid={backVoid}/>    
            <View style={styleGlobal.viewBodyQues} >
                <View style={styleGlobal.viewHeaderQues}>
                    <Text style={styleGlobal.titleQues}>Từ nào có nghĩa: {vocabularys.meaning} </Text>
                    <Text style={styleGlobal.titleQues}>phiên âm: {vocabularys.transcription}</Text>
                </View>
                <View style={styleGlobal.mainLayout}>
                    <TouchableOpacity style={styleGlobal.viewAnswerQues}>
                        <Text style={styleGlobal.textAnsQues}>{vocabularys.answer_a}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleGlobal.viewAnswerQues}>
                        <Text style={styleGlobal.textAnsQues}>{vocabularys.answer_b}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleGlobal.viewAnswerQues}>
                        <Text style={styleGlobal.textAnsQues}>{vocabularys.answer_c}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleGlobal.viewAnswerQues}>
                        <Text style={styleGlobal.textAnsQues}>{vocabularys.answer_d}</Text>
                    </TouchableOpacity>

                    {/* nut xac nhan */}
                    <TouchableOpacity style={styleGlobal.buttonQues}>
                        <Text style={styleGlobal.textButQues}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default Question;
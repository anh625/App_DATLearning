import { Text, TouchableOpacity, View } from "react-native"
import HeaderApp from "../other/header"
import { styleGlobal } from "@/app/(tabs)/css/cssGlobal"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from "react";

interface StatusProps {
    goVoid: () => void,
    backVoid: () => void,
    getData: (ans: string[],ques: Vocabulary[]) => void,
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
    answer_correct: string;
}

const Exams: React.FC<StatusProps>  = ({goVoid, backVoid, getData}) => {
    //cau thu i
    const [index, setIndex] = useState(0);
    const nextQues = () => {
        if(index+1 < vocabularys.length) setIndex(index+1)
        else{
            getData(listAnswer,vocabularys),
            goVoid()};
    }
    const backQues = () => {
        index > 0 && setIndex(index-1);
    }


    //du lieu
    const [vocabularys, setVocabularys] = useState<Vocabulary[]>([
        {id:1, word:"Please", meaning: "Vui lòng", transcription: "/pliz/", type:"adverb", 
            used_en:"Used when we want to politely ask for something", 
            used_vi:"Được sử dụng khi chúng ta muốn lịch sự yêu cầu một cái gì đó",
            answer_a:"People",
            answer_b:"Person",
            answer_c:"Boy",
            answer_d:"Please",
            answer_correct:"answer_a",
        },
        {id:2, word:"Please", meaning: "Vui lòng", transcription: "/pliz/", type:"adverb", 
            used_en:"Used when we want to politely ask for something", 
            used_vi:"Được sử dụng khi chúng ta muốn lịch sự yêu cầu một cái gì đó",
            answer_a:"People",
            answer_b:"Person",
            answer_c:"Boy",
            answer_d:"Please",
            answer_correct:"answer_a",
        },
        {id:3, word:"Please", meaning: "Vui lòng", transcription: "/pliz/", type:"adverb", 
            used_en:"Used when we want to politely ask for something", 
            used_vi:"Được sử dụng khi chúng ta muốn lịch sự yêu cầu một cái gì đó",
            answer_a:"People",
            answer_b:"Person",
            answer_c:"Boy",
            answer_d:"Please",
            answer_correct:"answer_a",
        },
    ])

    //lay dap an
    const [listAnswer, setListAnswer] = useState<string[]>(new Array(vocabularys.length).fill(""));
    const updateAnswer = (ans: string) =>{
        setListAnswer(preAnswer => {
            const updateItems = [...preAnswer]
            updateItems[index] = ans;
            return updateItems;
        })
    }

    //dong ho dem nguoc
    const [seconds, setSeconds] = useState(600);
    useEffect(() => {
        if (seconds > 0) {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        return () => clearInterval(interval);
        }
        else{
            goVoid();
        }
    }, [seconds]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const secs = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return(
        <View style={styleGlobal.mainLayout} >
            <HeaderApp isHome={false} title="" funVoid={backVoid}/>
            <View style={styleGlobal.viewTitleExams}>
                <Text style={styleGlobal.numQuesExams}>Câu {index+1}/{vocabularys.length}</Text>
                <View style={styleGlobal.viewTimeExams}>
                    <MaterialIcons name="access-time" size={20} color="#459DE4" />
                    <Text style={styleGlobal.textTimeExams}>{formatTime(seconds)}</Text>
                </View>
            </View>
            <View style={styleGlobal.lineExams}/>

            {/* cau hoi */}
            <View style={styleGlobal.viewBodyQues} >
                <View style={styleGlobal.headerExams}>
                    <Text style={styleGlobal.titleQues}>Từ nào có nghĩa: {vocabularys[index].meaning} </Text>
                    <Text style={styleGlobal.titleQues}>phiên âm: {vocabularys[index].transcription}</Text>
                </View>
                <View style={styleGlobal.mainLayout}>
                    <TouchableOpacity style={styleGlobal.viewAnswerQues} 
                    onPress={() => updateAnswer("answer_a")}>
                        <Text style={styleGlobal.textAnsQues}>{vocabularys[index].answer_a}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleGlobal.viewAnswerQues}
                    onPress={() => updateAnswer("answer_b")}>
                        <Text style={styleGlobal.textAnsQues}>{vocabularys[index].answer_b}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleGlobal.viewAnswerQues}
                    onPress={() => updateAnswer("answer_c")}>
                        <Text style={styleGlobal.textAnsQues}>{vocabularys[index].answer_c}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styleGlobal.viewAnswerQues}
                    onPress={() => updateAnswer("answer_d")}>
                        <Text style={styleGlobal.textAnsQues}>{vocabularys[index].answer_d}</Text>
                    </TouchableOpacity>

                    {/* nut quay lai cau truoc */}
                    {index == 0 && 
                        <TouchableOpacity style={[styleGlobal.butPreExams,{backgroundColor: "#AEDEF4",}]} 
                        onPress={backQues}>
                            <Text style={[styleGlobal.textExams,{color:"#4C4A54",}]}>Câu trước</Text>
                        </TouchableOpacity>
                    }
                    {index != 0 && 
                        <TouchableOpacity style={[styleGlobal.butPreExams,{backgroundColor: "#565CCE",}]} 
                        onPress={backQues}>
                            <Text style={[styleGlobal.textExams,{color:"white",}]}>Câu trước</Text>
                        </TouchableOpacity>
                    }


                    {/* nut xac nhan */}
                    {index+1 == vocabularys.length && 
                        <TouchableOpacity style={[styleGlobal.butNextExams,{backgroundColor: "#AEDEF4",}]} 
                        onPress={nextQues}>
                            <Text style={[styleGlobal.textExams,{color:"#4C4A54",}]}>Câu trước</Text>
                        </TouchableOpacity>
                    }
                    {index+1 != vocabularys.length && 
                        <TouchableOpacity style={[styleGlobal.butNextExams,{backgroundColor: "#565CCE",}]} 
                        onPress={nextQues}>
                            <Text style={[styleGlobal.textExams,{color:"white",}]}>Câu trước</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}
export default Exams
import { FlatList, Text, TouchableOpacity, View } from "react-native"
import HeaderApp from "../other/header"
import { styleGlobal } from "@/app/(tabs)/css/cssGlobal"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import Vocabulary from "@/app/(tabs)/layout/vocabularyLayout";
import Svg, { Circle } from 'react-native-svg';

interface StatusProps {
    goVoid: () => void,
    backVoid: () => void,
    ans: string[],
    ques: Vocabulary[],
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

const Result: React.FC<StatusProps>  = ({goVoid, backVoid, ans, ques}) => {
    //tron du lieu
    const [data, setData] = useState<(Vocabulary & {useAnswer: string})[]>([]);
    useEffect(()=>{
        const combieData = ques.map((question,index) => ({
            ...question,
            useAnswer: ans[index] || "",
        }));
        setData(combieData);
    },[ques,ans])

    //xu ly du lieu
    //tinh so cau da lam
    const [progress, setProgress] = useState<number>(0)
    useEffect(()=>{
        const answeredCount = ans.filter(item => item !== "").length;
        const answeredPercentage = Math.trunc((answeredCount / data.length) * 100);
        setProgress(answeredPercentage);
    },[data])

    //tinh so cau dung
    const [correct, setCorrect] = useState<number>(0)
    useEffect(()=>{
        const correctCount = data.reduce((count, item) => {
            return count + (item.useAnswer === item.answer_correct ? 1 : 0);
        }, 0);
        setCorrect(correctCount);
    },[data])

    return(
        <View style={styleGlobal.mainLayout} >
            <HeaderApp isHome={false} title="Kết quả" funVoid={backVoid}/>
            <Text style={styleGlobal.evaluateResult}>Chăm chỉ hơn nhé</Text>
            <View style={styleGlobal.viewProcessResult}>
                <Text style={[styleGlobal.textAnsResult, {color:"#0EB1FC"}]}>{progress}%</Text>
            </View>
            <Text style={styleGlobal.correctResult}>Bạn đã trả lời đúng {correct}/{data.length}</Text>
            <TouchableOpacity style={styleGlobal.butonResult}
            onPress={goVoid}>
                <Text style={[styleGlobal.textAnsResult,{color:"white"}]}>Kết thúc</Text>
            </TouchableOpacity>
            <View style={styleGlobal.viewAnsResult}>
                <Text style={styleGlobal.titleAnsResult}>Đáp án chi tiết</Text>

                <FlatList data={data}
                    keyExtractor={(item) => item.id+""}
                    renderItem={({item}) => {
                        return(
                            <View>
                                <View style={styleGlobal.eachAnsResult}>
                                    <Text style={styleGlobal.textAnsResult}>{item.id}.</Text>
                                    <View style={{marginLeft:5}}>
                                        <Text style={styleGlobal.textAnsResult}>Question: </Text>
                                        <Text style={[styleGlobal.textAnsResult,{color:"#0545a2"}]}
                                            >Đáp án đúng: {item[item.answer_correct as keyof Vocabulary]} </Text>
                                        <Text style={[styleGlobal.textAnsResult,{color:"#9422bd"}]}
                                            >Đáp án của bạn: {item[item.useAnswer as keyof Vocabulary]}</Text>
                                    </View>
                                </View>
                                <View style={styleGlobal.lineResult}/>
                            </View>
                        )
                    }}
                />
                
            </View>
        </View>
    )
}
export default Result
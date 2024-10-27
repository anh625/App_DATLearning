
import HomeTest from "@/components/test/homeTest";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { styleGlobal } from "../css/cssGlobal";
import Exams from "@/components/test/exams";
import Result from "@/components/test/result";

interface StatusProps {
    funVoid: (is: boolean) => void;
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

const TestLayout: React.FC<StatusProps> = ({funVoid }) => {
    const [status, setStatus] = useState(1);
    const [data, setData] = useState<string[]>([]);
    const [ques, setQues] = useState<Vocabulary[]>([])

    const handleData = (ans: string[],ques: Vocabulary[]) => {
        setData(ans);
        setQues(ques);
    }

    useEffect(()=>{
        status == 1 && funVoid(true);
        status == 2 && funVoid(false);
        status == 3 && funVoid(false);
    },[status])

    const toHome = () => {
        setStatus(1);
    }
    const toTest = () => {
        setStatus(2);
    }

    const toResult = () => {
        setStatus(3);
    }

    return(
        <View style={styleGlobal.mainLayout}>
            {status == 1 && <HomeTest funvoid={toTest}/>}
            {status == 2 && <Exams goVoid={toResult} backVoid={toHome} getData={handleData}/>}
            {status == 3 && <Result goVoid={toHome} backVoid={toTest} ans={data} ques={ques}/>}
        </View> 
    )
}
export default TestLayout;
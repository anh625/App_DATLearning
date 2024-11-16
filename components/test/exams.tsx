import { BackHandler, Text, TouchableOpacity, View } from "react-native"
import HeaderApp from "../other/header"
import { styleGlobal } from "@/app/(tabs)/css/cssGlobal"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import { answer, getTests, Questions } from "@/app/(tabs)/data";
import { index } from "realm";
import { Audio } from "expo-av";

interface StatusProps {
    goVoid: () => void,
    backVoid: () => void,

}


const Exams: React.FC<StatusProps>  = ({goVoid, backVoid}) => {
    const [exam,setExam] = useState<Questions[]>([]);
    const [ques,setQues] = useState<string>();
    
    useEffect(()=>{
        const handleBack = () => {
            backVoid();
            return true;
        }
        BackHandler.addEventListener("hardwareBackPress",handleBack);
        return () => {BackHandler.removeEventListener("hardwareBackPress",handleBack)};
    },[])

    useEffect(()=>{
        handleData();
    },[])
    const handleData = () =>{
        try{
            const getData = getTests();
            setExam(getData);
        }catch(error){
            console.error(error)
        }
    }

    //cau thu i
    const [iExam, setiExam] = useState(0);
    const nextQues = () => {
        if(iExam+1 < exam.length) setiExam(iExam+1)
        else{
            //lay du lieu
            goVoid()};
    }
    const backQues = () => {
        iExam > 0 && setiExam(iExam-1);
    }

    //lay dap an
    const [listAnswer, setListAnswer] = useState<string[]>(new Array(exam.length).fill(""));
    const updateAnswer = (ans: string) =>{
        setListAnswer(preAnswer => {
            const updateItems = [...preAnswer]
            updateItems[iExam] = ans;
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
    if(exam.length==0){
        return(<View></View>)
    }
    //ham phat ra tieng audio
    const playSound = async (link:string) => {
        if(link){
            const text = link.split("https");
            // Phần văn bản trước URL
            // Phần URL
            const url = "https" + text[1].trim();
            try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: url }
            );
            await sound.playAsync();
            
            // Giải phóng tài nguyên sau khi âm thanh phát xong
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    sound.unloadAsync(); // Giải phóng tài nguyên sau khi phát xong
                }
            });          
            } catch (error) {
            console.error('Lỗi khi phát âm thanh:', error);
            }
        }
    };
    return(
        <View style={styleGlobal.mainLayout} >
            <HeaderApp isHome={false} title="" funVoid={backVoid}/>
            <View style={styleGlobal.viewTitleExams}>
                <Text style={styleGlobal.numQuesExams}>Câu {iExam+1}/{exam.length}</Text>
                <View style={styleGlobal.viewTimeExams}>
                    <MaterialIcons name="access-time" size={20} color="#459DE4" />
                    <Text style={styleGlobal.textTimeExams}>{formatTime(seconds)}</Text>
                </View>
            </View>
            <View style={styleGlobal.lineExams}/>

            {/* cau hoi */}
            <View style={styleGlobal.viewBodyQues} >
                <View style={styleGlobal.headerExams}>
                    {exam[iExam].question.includes('https') ? 
                            <View style={styleGlobal.viewQuesUrl}>
                                <Text style={styleGlobal.titleQuesUrl}>Hãy chọn từ được nói trong: </Text>
                                <TouchableOpacity onPress={() => playSound(exam[iExam].question)}>
                                <Text style={styleGlobal.titleQuesUrl}>Nhấn vào đây để nghe</Text>
                            </TouchableOpacity> 
                            </View>
                            : 
                        <Text style={styleGlobal.titleQues}>{exam[iExam].question}</Text>}
                </View>
                <View style={styleGlobal.mainLayout}>
                    {exam[iExam].answers.map((answer,index)=>(<TouchableOpacity style={styleGlobal.viewAnswerQues} 
                    key={index}
                    onPress={() => updateAnswer(answer)}>
                        <Text style={styleGlobal.textAnsQues}>{answer}</Text>
                    </TouchableOpacity>))}
                    {/* nut quay lai cau truoc */}
                    {iExam == 0 && 
                        <TouchableOpacity style={[styleGlobal.butPreExams,{backgroundColor: "#AEDEF4",}]} 
                        onPress={backQues}>
                            <Text style={[styleGlobal.textExams,{color:"#4C4A54",}]}>Câu trước</Text>
                        </TouchableOpacity>
                    }
                    {iExam != 0 && 
                        <TouchableOpacity style={[styleGlobal.butPreExams,{backgroundColor: "#565CCE",}]} 
                        onPress={backQues}>
                            <Text style={[styleGlobal.textExams,{color:"white",}]}>Câu trước</Text>
                        </TouchableOpacity>
                    }
                    {/* nut xac nhan */}
                    {iExam+1 == exam.length && 
                        <TouchableOpacity style={[styleGlobal.butNextExams,{backgroundColor: "#AEDEF4",}]} 
                        onPress={nextQues}>
                            <Text style={[styleGlobal.textExams,{color:"#4C4A54",}]}>Câu trước</Text>
                        </TouchableOpacity>
                    }
                    {iExam+1 != exam.length && 
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
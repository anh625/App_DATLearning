import ListLevels from "@/components/vocabulary/listLevels"
import ListTopics from "@/components/vocabulary/listTopics";
import { useEffect, useState } from "react";
import { View } from "react-native";
interface StatusProps {
    funVoid: (is: boolean) => void;
}

const Vocabulary: React.FC<StatusProps> = ({funVoid}) => {
    const [status, setStatus] = useState(1);
    const toLevel = () => {
        setStatus(1);
        funVoid(true);
    }

    const toTopic = () => {
        setStatus(2);
        funVoid(false);
    }

    const toQues = () => {
        setStatus(3);
        funVoid(false);
    }

    const toAnswer = () => {
        setStatus(4);
        funVoid(false);
    }

    return(
        <View style={{flex: 1}}>
            {status == 1 && <ListLevels funvoid={toTopic} />}
            {status == 2 && <ListTopics funvoid={toLevel} />}
        </View> 
    )
}
export default Vocabulary;
import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { Modal, View } from "react-native";

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

const Answer = (vocabularys: Vocabulary, iVisiable: boolean) => {
    return(
        <Modal
            style={styleGlobal.IViewLevels}
            animationType="slide"
            transparent={true}
            visible={iVisiable}
        >
            {/* <View>
                <Image style= source={require("@/assets/images/png/answer.png")} />
            </View> */}
            
        </Modal>
    )
}
export default Answer;
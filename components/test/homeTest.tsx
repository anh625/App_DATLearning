import { styleGlobal } from "@/app/(tabs)/css/cssGlobal"
import HeaderApp from "../other/header"
import { Button, Image, Text, TouchableOpacity, View } from "react-native"

interface StatusProps {
    funvoid: () => void
}
const HomeTest: React.FC<StatusProps> = ({funvoid}) => {
    return(
        <View style={[styleGlobal.mainLayout,{borderBlockColor:"red"}]} >
            <HeaderApp isHome={true} title="Kiểm tra" funVoid={() => null}/>
            <Image style={styleGlobal.imageHomeTest} source={require("@/assets/images/png/study.png")} />
            <Text style={styleGlobal.titleTest}>Quizzy App</Text>
            <TouchableOpacity style={styleGlobal.butHomeTest} onPress={funvoid}>
                <Text style={styleGlobal.textButHomeTest}>Bắt đầu</Text>
            </TouchableOpacity>
        </View>
    )
}
export default HomeTest
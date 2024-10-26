import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { Button, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

interface StatusProps {
    isHome: boolean;
    title: string;
    funVoid: () => void;
}
const HeaderApp: React.FC<StatusProps>  = ({isHome, title, funVoid}) => {
    return(
        <View style={styleGlobal.header}>
            {!isHome? (<AntDesign onPress={funVoid} style={styleGlobal.backHeader} name="arrowleft" size={30} color="white" />) : null}
            <Text style={styleGlobal.textHeader}>{title}</Text>
        </View>
    )
}

export default HeaderApp;
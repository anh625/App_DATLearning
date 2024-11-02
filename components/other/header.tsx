import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { Button, Text, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

interface StatusProps {
    isHome: boolean;
    title: string;
    funVoid: () => void;
}
const HeaderApp: React.FC<StatusProps>  = ({isHome, title, funVoid}) => {
    return(
        <View style={styleGlobal.header}>
            <Text style={styleGlobal.textHeader}>{title}</Text>
            {!isHome? (<TouchableOpacity onPress={funVoid} style={styleGlobal.backHeader}>
                        <AntDesign name="arrowleft" size={30} color="white" />
                </TouchableOpacity>) : null}
        </View>
    )
}

export default HeaderApp;
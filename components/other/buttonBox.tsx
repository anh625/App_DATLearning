import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { Text, TouchableOpacity, View } from "react-native"
interface StatusProps {
    //title ma button se hien thi
    name: string;
    //background cua button
    background: string;
    //ham ma button se thuc hien
    funVoid: () => void;
    border: number;
    colorText: string
}
//: React.FC<StatusProps >
const ButtonBox: React.FC<StatusProps> = ({ name, background, funVoid , border, colorText}) => {
    return(
        <TouchableOpacity 
            style={[styleGlobal.button, {backgroundColor: background, borderWidth: border}]}
            onPress={funVoid}>
            <Text style={[styleGlobal.textButton, { color: colorText }]}>{name}</Text>
        </TouchableOpacity>
    )
}

export default ButtonBox;
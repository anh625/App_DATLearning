import { View } from "react-native";
import HeaderApp from "../other/header";

interface StatusProps {
    funvoid: () => void
}

interface ILevel {
    title: string;
    progress: number;
}

const ListTopics: React.FC<StatusProps>  = ({funvoid}) =>{
    return(
        <View>
            <HeaderApp isHome={false} title="Beginner[A1]" funVoid={funvoid}/>
            <View>
                
            </View>
        </View>
    )
}
export default ListTopics;
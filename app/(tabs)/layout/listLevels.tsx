import HeaderApp from "@/components/other/header"
import { ExpoRoot } from "expo-router"
import { Button, View } from "react-native"
interface StatusProps {
    funvoid: () => void
}

const ListLevels: React.FC<StatusProps> = ({funvoid}) => {
    return(
        <View>
            <HeaderApp isHome={true} title="Danh sách các cấp độ"/>
            <Button title="on/off bottonTap" onPress={funvoid}/>
        </View>
    )
}
export default ListLevels;
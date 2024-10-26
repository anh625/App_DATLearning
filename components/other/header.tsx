import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import { Button, Text, View } from "react-native";


interface StatusProps {
    isHome: boolean;
    title: string;
}
const HeaderApp: React.FC<StatusProps>  = ({isHome, title}) => {
    return(
        <View style={styleGlobal.header}>
            <Button title="Click Me" onPress={() => {}} />
            <Text style={{ flex: 1, textAlign: "center" }}>Your Text Here</Text>
        </View>
    )
}

export default HeaderApp;
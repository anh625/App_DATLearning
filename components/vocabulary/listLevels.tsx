import HeaderApp from "@/components/other/header"
import { ExpoRoot } from "expo-router"
import { Button, FlatList, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { styleGlobal } from "../../app/(tabs)/css/cssGlobal"
import { useState } from "react"
interface StatusProps {
    funvoid: () => void
}

interface ILevel {
    id: number;
    image: ImageSourcePropType;
    title: string;
    detail: string;
    progress: number;
}

const ListLevels: React.FC<StatusProps> = ({funvoid}) => {
    const [levels, setLevels] = useState<ILevel[]>([
        { id: 1,image: require("@/assets/images/png/level.png"), title: "Beginner[A1]", 
            detail: "Danh sách từ vựng từ Beginner[A1] bao gồm 32 bài học và 615"+
            " từ vựng được phân loại theo chủ đề, độ khó và cách sử dụng theo CERF", progress: 69},
        { id: 2,image: require("@/assets/images/png/level.png"), title: "Beginner[A1]", 
                detail: "Danh sách từ vựng từ Beginner[A1] bao gồm 32 bài học và 615"+
            " từ vựng được phân loại theo chủ đề, độ khó và cách sử dụng theo CERF", progress: 69},
        { id: 3,image: require("@/assets/images/png/level.png"), title: "Beginner[A1]", 
                detail: "Danh sách từ vựng từ Beginner[A1] bao gồm 32 bài học và 615"+
            " từ vựng được phân loại theo chủ đề, độ khó và cách sử dụng theo CERF", progress: 69},
            { id: 4,image: require("@/assets/images/png/level.png"), title: "Beginner[A1]", 
                detail: "Danh sách từ vựng từ Beginner[A1] bao gồm 32 bài học và 615"+
            " từ vựng được phân loại theo chủ đề, độ khó và cách sử dụng theo CERF", progress: 69},
            { id: 5,image: require("@/assets/images/png/level.png"), title: "Beginner[A1]", 
                detail: "Danh sách từ vựng từ Beginner[A1] bao gồm 32 bài học và 615"+
            " từ vựng được phân loại theo chủ đề, độ khó và cách sử dụng theo CERF", progress: 69},
            { id: 6,image: require("@/assets/images/png/level.png"), title: "Beginner[A1]", 
                detail: "Danh sách từ vựng từ Beginner[A1] bao gồm 32 bài học và 615"+
            " từ vựng được phân loại theo chủ đề, độ khó và cách sử dụng theo CERF", progress: 69},
            { id: 7,image: require("@/assets/images/png/level.png"), title: "Beginner[A1]", 
                detail: "Danh sách từ vựng từ Beginner[A1] bao gồm 32 bài học và 615"+
            " từ vựng được phân loại theo chủ đề, độ khó và cách sử dụng theo CERF", progress: 69},
        ])

    const handleTopic = () => {
        funvoid();
    }
    return(
        <View style={styleGlobal.mainLayout}>
            <HeaderApp isHome={true} title="Danh sách các cấp độ" funVoid={() => null}/>
            <Image style={styleGlobal.studyImage} source={require("@/assets/images/png/study.png")} />
            <View style={styleGlobal.levels}>
            <FlatList 
                data={levels}
                keyExtractor={(item) => item.id +""}
                renderItem={({item}) => {
                    return(
                        <TouchableOpacity onPress={handleTopic} style={styleGlobal.IViewLevels}>
                            <Image style={styleGlobal.imageLevel} source={item.image} />
                            <View style={styleGlobal.viewDetail}>
                                <Text style={styleGlobal.titleLevel}>{item.title}</Text>
                                <Text style={styleGlobal.detailLevel}>{item.detail}</Text>
                                <View style={styleGlobal.sumPro}>
                                    <View style={[styleGlobal.progress, {width: `${item.progress}%`}]} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
            </View>
            {/* <Button title="on/off bottonTap" onPress={funvoid}/> */}
        </View>
    )
}
export default ListLevels;
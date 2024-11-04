import HeaderApp from "@/components/other/header"
import { BackHandler, Button, FlatList, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { styleGlobal } from "../../app/(tabs)/css/cssGlobal"
import React, { useEffect, useState } from "react"
import { useFocusEffect } from "expo-router"
interface StatusProps {
    funvoid: () => void;
    // logout: () => void;
}

interface ILevel {
    id: number;
    image: ImageSourcePropType;
    title: string;
    detail: string;
    progress: number;
}

const ListLevels: React.FC<StatusProps> = ({funvoid}) => {
    const [isFocus, setIsFocus] = useState(true);
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

    //dang xuat
    //dong app
    const closeApp = () => {
      BackHandler.exitApp();
      return true;
    };
    useFocusEffect(
        React.useCallback(() => {
            // Thêm listener cho sự kiện nhấn nút quay lại
            BackHandler.addEventListener('hardwareBackPress', closeApp);
            // Dọn dẹp listener khi component không còn được hiển thị
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', closeApp);
            };
        }, []) // Mảng phụ thuộc rỗng để chỉ chạy khi component được hiển thị
    );

    // alert infoApi
    // const handleInfoApi = ()=>{
    //     const info = getInfoApi();
    //     if (info && info.data) {
    //         console.log("Kiểu của info:", typeof info);
    //         alert(info.data["email"]);
    //     } else {
    //        console.log("Info is null or undefined");
    //     }
    // }

    return(
        <View style={styleGlobal.mainLayout}>
            <HeaderApp isHome={true} title="Danh sách các cấp độ" funVoid={() => null}/>
            <Image style={styleGlobal.studyImage} source={require("@/assets/images/png/study.png")} />
            <View style={styleGlobal.levels}>
            <FlatList 
                data={levels}
                keyExtractor={(item) => item.id +""}
                showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
                renderItem={({item}) => {
                    return(
                        <TouchableOpacity onPress={()=>funvoid()} style={styleGlobal.IViewLevels}>
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
            {/* <Button title="on/off bottonTap" onPress={handleInfoApi}/> */}
        </View>
    )
}
export default ListLevels;
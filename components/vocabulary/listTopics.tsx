import { BackHandler, FlatList, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import HeaderApp from "../other/header";
import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";

interface StatusProps {
    goVoid: () => void,
    backVoid: () => void,
}

interface ITopic {
    id:number;
    title: string;
    progress: number;
}

const ListTopics: React.FC<StatusProps>  = ({goVoid, backVoid}) =>{
    const [searchTopic, setSearchTopic] = useState("");

    const [topics,setTopics] = useState<ITopic[]>([
        {id:1, title:"Hello and goodbye", progress:69},
        {id:2, title:"Hello and goodbye", progress:69},
        {id:3, title:"Hello and goodbye", progress:69},
        {id:4, title:"Hello and goodbye", progress:69},
        {id:5, title:"Hello and goodbye", progress:69},
        {id:6, title:"Hello and goodbye", progress:69},
        {id:7, title:"Hello and goodbye", progress:69},
        {id:8, title:"Hello and goodbye", progress:69},
        {id:9, title:"Hello and goodbye", progress:69},
        {id:10, title:"Hello and goodbye", progress:69},
    ])

    const [resultSearch, setResultSearch] = useState<ITopic[]>(topics);

    const handleSearch = () => {
        setResultSearch(topics.filter(stu => stu.title.includes(searchTopic)))
    }

    useEffect(()=>{
        setResultSearch(topics.filter(stu => stu.title.includes(searchTopic)))
    },[searchTopic])

    //ham tro lai
    useEffect(()=>{
        const handleBack = () => {
            backVoid();
            return true;
        }
        BackHandler.addEventListener("hardwareBackPress",handleBack);
        return () => {BackHandler.removeEventListener("hardwareBackPress",handleBack)};
    },[])

    return(
        <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
            <View style={styleGlobal.mainLayout}>
            <HeaderApp isHome={false} title="Beginner[A1]" funVoid={backVoid}/>
            <View style={styleGlobal.viewInsert}>
                <TouchableOpacity onPress={handleSearch}>
                    <FontAwesome style={styleGlobal.searchTopic} name="search" size={24} color="black" />
                </TouchableOpacity>
                <TextInput style={styleGlobal.inputTopic}
                    placeholder="Nhập tên chủ đề muốn tìm"
                    value={searchTopic}
                    onChangeText={setSearchTopic}
                />
            </View>
            <View style={styleGlobal.viewTopic}>
            {resultSearch.length == 0 ? (<Text style={styleGlobal.textError}>Không tìm thấy chủ đề chứa "{searchTopic}"</Text>):
                (<FlatList 
                    data={resultSearch}
                    showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
                    keyExtractor={(item) => item.id + ""}
                    renderItem={({item}) => {
                        return(
                            <TouchableOpacity style={styleGlobal.iTopic} onPress={goVoid}>
                                <Text style={styleGlobal.titleTopic}>Chủ đề: {item.title}</Text>
                                <View style={styleGlobal.sumPro}>
                                    <View style={[styleGlobal.progress, {width: `${item.progress}%`}]} />
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />)
            }
            </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default ListTopics;
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import HeaderApp from "../other/header";
import { styleGlobal } from "@/app/(tabs)/css/cssGlobal";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from "react";

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
    const [seachTopic, setSeachTopic] = useState("");
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

    return(
        <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
            <View style={styleGlobal.mainLayout}>
            <HeaderApp isHome={false} title="Beginner[A1]" funVoid={backVoid}/>
            <View style={styleGlobal.viewInsert}>
                <TouchableOpacity onPress={() => alert(seachTopic   )}>
                    <FontAwesome style={styleGlobal.searchTopic} name="search" size={24} color="black" />
                </TouchableOpacity>
                <TextInput style={styleGlobal.inputTopic}
                    placeholder="Nhập tên chủ đề muốn tìm"
                    value={seachTopic}
                    onChangeText={setSeachTopic}
                />
            </View>
            <View style={styleGlobal.viewTopic}>
            <FlatList 
                    style={{flex:1,paddingTop:33,}}
                    data={topics}
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
                />
            </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default ListTopics;
import { styleGlobal } from "@/app/(tabs)/css/cssGlobal"
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react"
import { Text, TextInput, View } from "react-native"
interface StatusProps {
    variable: string;
    namePlaceholder: string;
    isPass: boolean;
    onChangeText: (value: string) => void;
}

const InputBox: React.FC<StatusProps> = ({ variable, namePlaceholder, onChangeText, isPass}) => {
    //lay du lieu component con truyen cho component cha
    const [inputValue, setInputValue] = useState(variable)
    const handleChangeText = (value: string) => {
        setInputValue(value);
        onChangeText(value);
    }

    //bien doi icon eye
    const [show, setShow] = useState(true)
    //ham an hien mat khau
    const handleEye = () => {
        setShow( show? false : true );
    }


    //kiem tra xem la input hay pass?
    useEffect(() => {
        if(!isPass){
            setShow(false);
        };
    },[isPass]);

    //kiem tra co focus ko?
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    }
    const handleBlur = () => {
        setIsFocused(false);
    }

    // Tạo ref cho TextInput
    const inputRef = useRef<TextInput>(null);
    const focusInut = () => {
        inputRef.current?.focus();
    }

    return(
        <View style={styleGlobal.container}>
            <TextInput 
                ref={inputRef}
                secureTextEntry={show}
                style={styleGlobal.input} 
                value={inputValue}
                onChangeText={handleChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {/* {inputValue.length == 0 && (<Text style={styleGlobal.placeholder}>{name}</Text>)} */}
            {(isFocused || inputValue.length !== 0) && (<Text 
                onPress={focusInut}
                style={styleGlobal.placeholderFocus}
            >{namePlaceholder}</Text>) }
            {!isFocused && inputValue.length == 0 && (<Text 
                style={styleGlobal.placeholderBlur}
                onPress={focusInut}
            >{namePlaceholder}</Text>) }
            {show && isPass && (<Ionicons style={styleGlobal.iconEye} name="eye" size={24} color="#459DE4" onPress={handleEye}/>)}
            {!show && isPass && (<Ionicons style={styleGlobal.iconEye} name="eye-off" size={24} color="#459DE4" onPress={handleEye}/>)}
        </View>
    )
}

export default InputBox;
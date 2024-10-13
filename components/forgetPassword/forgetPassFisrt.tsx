import { styleForgetPassword } from "@/app/(tabs)/css/cssForgetPassword";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import InputBox from "../other/inputBox";
import ButtonBox from "../other/buttonBox";
interface StatusProps {
    funVoid: () => void;
    getData: (value: string) => void;
    data: string;
}
const ForgetPassFirst: React.FC<StatusProps> = ({funVoid , data, getData}) => {
    //kiem tra dinh dang mail
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //day du lieu vao trong component de lay du lieu ra ngoai
    const [email, setEmail] = useState(data)
    const handleChangeText = (value: string) => {
        setEmail(value);
        getData(value);
    }

    //kiem tra dinh dang Email 
    const handleSecond = () => {
        if(validateEmail(data)) funVoid();
        else {alert("hay nhap dung dinh dang Email")};
    }
    return(
        <View style={styleForgetPassword.forgetPassword}> 
                    <Image style={styleForgetPassword.imgForgetPassword} source={require("@/images/png/forgetPassword.png")}/>
                    <Text style={styleForgetPassword.title}>FORGET</Text>
                    <Text style={styleForgetPassword.title}>PASSWORD</Text>
                    <View style={styleForgetPassword.detailView}>
                        <Text style={styleForgetPassword.detailText}>Provide your account’s email for which you want</Text>
                        <Text style={styleForgetPassword.detailText}>to reset your password</Text>
                    </View>
                    <View>
                        <InputBox namePlaceholder="Email" isPass={false} onChangeText={handleChangeText} variable={email} />
                    </View>
                    <View>
                        <ButtonBox name="Continue" funVoid={handleSecond} background="#459DE4" border={0} colorText="#FFFDFD"/>
                    </View>
        </View>
    )
}
export default ForgetPassFirst;
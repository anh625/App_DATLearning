import { styleForgetPassword } from "@/app/(tabs)/css/cssForgetPassword";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import InputBox from "../other/inputBox";
import ButtonBox from "../other/buttonBox";
interface StatusProps {
    funVoid: () => void;
    getData: (value: string) => void;
    data: string;
}
const ForgetPassThird: React.FC<StatusProps> = ({funVoid, data, getData}) => {
    const [pass, setPass] = useState("");
    const handlePass = (value: string) => {
        setPass(value);
        getData(value);
    }
    const [comfirmPass, setComfirmPass] = useState("");

    const checkPass = () => {
        if(pass != comfirmPass) alert(data);
        else {
            if(pass.length == 0) alert("Mat khau khong khong duoc rong");
            else funVoid();
        };
    }
    return(
        <View style={styleForgetPassword.forgetPassword}> 
                    <Image style={styleForgetPassword.imgForgetPassword} source={require("@/images/png/forgetPassword.png")}/>
                    <Text style={styleForgetPassword.title}>NEW</Text>
                    <Text style={styleForgetPassword.title}>CREDENTIAL</Text>
                    <View style={styleForgetPassword.detailView}>
                        <Text style={styleForgetPassword.detailText}>Your identify, has been verified!</Text>
                        <Text style={styleForgetPassword.detailText}>Set your new password</Text>
                    </View>
                    <View>
                        <InputBox namePlaceholder="Password" isPass={true} onChangeText={handlePass} variable={pass} />
                        <InputBox namePlaceholder="Confirm Password" isPass={true} onChangeText={setComfirmPass} variable={comfirmPass} />
                    </View>
                    <View>
                        <ButtonBox name="Update" funVoid={checkPass} background="#459DE4" colorText="#FFFDFD" border={0}/>
                    </View>
        </View>
    )
}
export default ForgetPassThird;
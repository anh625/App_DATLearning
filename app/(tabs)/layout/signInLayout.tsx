import { Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styleGlobal } from "../css/cssGlobal";
import { styleSignIn } from "../css/cssSignIn";
import InputBox from "@/components/other/inputBox";
import React, { useEffect, useState } from "react";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import ButtonBox from "@/components/other/buttonBox";
import LineSign from "@/components/other/lineSign";
import LoginGoogleBtn from "@/components/other/loginGoogleBtn";
import QuizAcc from "@/components/other/quizAccount";
import { CommonActions, NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import SignUpLayout from "./signUpLayout";
// Cập nhật import và các phần đầu của file
import Realm, { Results } from 'realm'; // Nhập Results từ Realm
import { NetworkInfo } from 'react-native-network-info';
import { BackHandler } from 'react-native';
import { RealmObject } from "realm/dist/public-types/namespace";
import apiClient, { setAuthToken } from "../bearerToken";
import { setInfoApi } from "@/.expo/data"

const tokenDB= {
    name: 'Token',
    properties: {
        _id: 'int',
        token: 'string',
    },
    primaryKey: '_id',
};

interface Token {
    _id: number;
    token: string;
  }

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    noPassword: boolean;
}

interface ApiResponse {
    code: number;
    message: string;
    data: {
        user: User;
        access_token: string;
        refresh_token: string;
    };
}


const SignInLayout = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [eEmail, setEEmail] = useState(false);
    const [errorPass, setErrorPass] = useState("");
    const [ePass, setEPass] = useState(false);
    const [backApp, setBackApp] =useState(false);
    //const realm = new Realm({schema: [tokenDB]});
    //gọi api login
    const realm = new Realm({ schema: [tokenDB] });
    const [loading, setLoading] = useState(false);
    const [getToken, setGetTokens] = useState();
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const [isFocus, setIsFocus] = useState(true);
    const [accessToken, setAccessToken] = useState<string>("");
    
    const postLogin = async () => {
        setLoading(true);
        try {
            let response = await fetch('http://192.168.1.2:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:email,
                    password:password,
                }),
            });
            const result: ApiResponse = await response.json();
            console.log("da post api");
            if (result && result.data && result.data.access_token) {
                saveOrUpdateToken(result.data.access_token);
                setAuthToken(result.data.access_token);
                try {
                    const response = await apiClient.get('/users/my-info');
                    console.log(JSON.stringify(response.data));
                    setInfoApi(response.data);
                  } catch (error) {
                    console.error(error);
                }
                navigation.navigate("myTabs");
            } else {
                setErrorPass("Tai khoan hoac mat khau khong chinh xac"); setEPass(true);
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };
    //auto login
    const autoLogin = async () =>{
        type RealmToken = RealmObject<Token> & Token;
        const tokens: Results<RealmToken> = realm.objects<Token>('Token'); // Chỉ định kiểu
        if (tokens.length > 0 && isFocus) {
            console.log("da kiem tra xong if");
            setBackApp(true);
            setAuthToken(tokens[0].token);
            try {
                    const response = await apiClient.get('/users/my-info');
                    console.log(JSON.stringify(response.data))
                    setInfoApi(response.data);
                    navigation.navigate("myTabs");
                } catch (error) {
                    setErrorPass("Het han phien dang nhap. Vui long dang nhap lai."); setEPass(true);
            }
        }
    }




    //post api 
    useEffect(() => {
        autoLogin();
        console.log("token truoc update db:", realm.objects("Token")[0]);
    }, [isFocus]);




    //Luu token
    const saveOrUpdateToken = (newToken: any) => {
        realm.write(() => {
            // Xóa tất cả đối tượng Token
            realm.delete(realm.objects('Token'));
            // Thêm token mới
            realm.create('Token', { _id: 1, token: newToken });
            console.log('Token đã được thêm vào DB:', newToken);
        });
    };

    //dong app
    const backSignin = () => {
        realm.write(() => {
            // Xóa tất cả đối tượng Token
            realm.delete(realm.objects('Token'));
            BackHandler.exitApp();
            return true;
        });
        return false;
      };
    useFocusEffect(
        React.useCallback(() => {
            // Thêm listener cho sự kiện nhấn nút quay lại
            BackHandler.addEventListener('hardwareBackPress', backSignin);
            // Dọn dẹp listener khi component không còn được hiển thị
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', backSignin);
            };
        }, []) // Mảng phụ thuộc rỗng để chỉ chạy khi component được hiển thị
    );
    //chuyen trang
    const moveSignUp = () => {
        navigation.navigate("signUp");
    }

    const moveForgetPassword = () => {
        navigation.navigate("forgetPassword");
    }






    const submitSignIn = () => {
        if(!validateEmail(email)) {setErrorEmail("Hay nhap dung dinh dang email"); setEEmail(true); return};
        setEEmail(false);
        if(password.length == 0) {setErrorPass("Mat khau khong duoc de trong"); setEPass(true); return};
        setEPass(false);
        postLogin();  // Gọi hàm này để thực hiện đăng nhập và nhận token
        realm.write(() => {
            // Xóa tất cả đối tượng Token
            realm.delete(realm.objects('Token'));
            // Thêm token mới
            realm.create('Token', { _id: 1, token: "newToken" });
        });
        console.log("token sau update db:", realm.objects("Token"));
    }






    //xac nhan email
    //regex email
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    //ham doi trang thai Toggle
    const [isOnToggle, setIsOnToggle] = useState(true);
    const handleToggle = () => {
        {isOnToggle? setIsOnToggle(false) : setIsOnToggle(true) }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styleSignIn.signIn}>
            {/* logo app */}
            <Image style={styleSignIn.logoApp} source={require("@/assets/images/png/logoApp.png")}></Image>

            {/* nhap tai khoan va mat khau */}
            <View style={styleSignIn.ViewInput}>
                <InputBox variable={email} namePlaceholder="Email" onChangeText={setEmail} isPass={false} errorMess={errorEmail} error={eEmail}/>
                <InputBox variable={password} namePlaceholder="Password" onChangeText={setPassword} isPass={true} errorMess={errorPass} error={ePass}/>
            </View>

            {/* lua chon khac gom: luu mat khau va quen mat khau */}
            <View style={styleSignIn.lineOtherChoice}>
                <View style={styleSignIn.viewRemember}>
                    {isOnToggle && (<FontAwesome6 style={styleSignIn.iconToggle} name="toggle-on" size={24} color="#B3B3B3" onPress={handleToggle}/>) }
                    {!isOnToggle && (<FontAwesome6 style={styleSignIn.iconToggle} name="toggle-off" size={24} color="#B3B3B3" onPress={handleToggle}/>) }
                    <Text style={styleSignIn.textSignIn} >Remember Password</Text>
                </View>
                <TouchableOpacity onPress={moveForgetPassword}><Text style={styleSignIn.textSignIn}>Forget PassWord</Text></TouchableOpacity>
            </View>

            {/* nut dang nhap bang tai khoan hoac bang google */}
            <View style={styleSignIn.viewButton}>
                <ButtonBox name="Sign In" background= "#459DE4" funVoid={submitSignIn} border={0} colorText="#FFFDFD"/>
                <LineSign haveAccount={true}/>
                <LoginGoogleBtn funVoid={handleToggle}/>
            </View>

            {/* chuyen sang dang ki */}
            <View style={styleSignIn.lineQuiz}>
                <QuizAcc haveAccount={false} funVoid={moveSignUp}/>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default SignInLayout;
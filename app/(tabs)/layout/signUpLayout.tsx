import React, { useEffect, useState } from 'react';
import { Animated, Button, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TextInputBase, TextInputComponent, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Status from '@/components/signUp/status';
import { styleGlobal } from '../css/cssGlobal';
import InputBox from '@/components/other/inputBox';
import ButtonBox from '@/components/other/buttonBox';
import LineSign from '@/components/other/lineSign';
import QuizAcc from '@/components/other/quizAccount';
import LoginGoogleBtn from '@/components/other/loginGoogleBtn';
import { styleSignUp } from '../css/cssSignUp';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';

const SignUpLayout = () => {
    //chuyen sang trang signIn
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const moveSignIn = () => {
        navigation.goBack();
    }

    const alertVar = () => {
        alert("Email: "+ email + ", Name: " +name+", Pass: " + pass+ ", comPass: " +comfirmPass)
    }
    ///
    //Sua giao dien khi keybroad duoc bat
    const [isShowKeyBroad, setIsShowKeyBroad] = useState(false);
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsShowKeyBroad(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsShowKeyBroad(false);
        });
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, [isShowKeyBroad]);
      ///////////////////////////////////////////

    const [statusIndex, setStatusIndex] = useState('1'); // Màu nền ban đầu là trắng
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [comfirmPass, setComfirmPass] = useState("")

    const status31 = () => {
        if(pass != comfirmPass) alert("Mat khau khong trung khop");
        else {
            if(pass.length == 0) alert("Mat khau khong khong duoc rong");
            else setStatusIndex("1");
        };
    }
    const status12 = () => {
        if(validateEmail(email)) setStatusIndex("2");
        else alert("Nhap sai dinh dang email");
    }
    const status23 = () => {
        if(name.length == 0) alert("Ten khong duoc de trong");
        else setStatusIndex("3");
    }

    const status21 = () => {
        setStatusIndex("1");
    }
    const status32 = () => {
        setStatusIndex("2");
    }

    //regex email
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return(
        <TouchableWithoutFeedback onPress={ ()=>Keyboard.dismiss() }>
        <View style={styleSignUp.signUp}>
            {/* title */}
            <View style={styleSignUp.viewTitle}>
                <Text style={styleSignUp.textTitle}>Sign Up</Text>
            </View>
            <View style={styleGlobal.boxInput}>

            {/* Thanh trang thai */}
                <Status index={statusIndex}/>
                <View>
                    {/* inputbox */}
                    {statusIndex == "1" && (
                        <View>
                            <InputBox variable={email} namePlaceholder='Email' onChangeText={setEmail} isPass={false}/>
                            <ButtonBox name='Continue' background='#459DE4' funVoid={status12} border={0} colorText="#FFFDFD"/>
                        </View>
                    )}

                    {statusIndex == "2" && (
                        <View>
                            <InputBox variable={name} namePlaceholder='Full name' onChangeText={setName} isPass={false} />
                            <ButtonBox name='Continue' background='#459DE4' funVoid={status23} border={0} colorText="#FFFDFD"/>
                            <ButtonBox name='Back' background='#838383' funVoid={status21} border={0} colorText="#FFFDFD"/>
                        </View>
                    )}

                    {statusIndex == "3" && (
                        <View>
                            <InputBox variable={pass} namePlaceholder='Password' onChangeText={setPass} isPass={true} />
                            <InputBox variable={comfirmPass} namePlaceholder='Comfirm Password' onChangeText={setComfirmPass} isPass={true} />
                            <ButtonBox name='Register' background='#459DE4' funVoid={status31} border={0} colorText="#FFFDFD"/>
                            <ButtonBox name='Back' background='#838383' funVoid={status32} border={0} colorText="#FFFDFD"/>
                        </View>
                    )}
                </View>
            </View>
            {!isShowKeyBroad && <LineSign haveAccount={false}/>}
            {!isShowKeyBroad && <LoginGoogleBtn funVoid={alertVar}/>}
            {!isShowKeyBroad && <QuizAcc haveAccount={true} funVoid={moveSignIn}/>}
        </View>
        </TouchableWithoutFeedback>
    )
}
 export default SignUpLayout;

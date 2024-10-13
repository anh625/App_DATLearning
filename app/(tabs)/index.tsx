import { Image, StyleSheet, Platform, Text, View, TouchableOpacity, SafeAreaView, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SignUpLayout from './layout/signUpLayout';
import { useState } from 'react';
import { styleGlobal } from './css/cssGlobal';
import React, { useRef } from 'react';
import SignInLayout from './layout/signInLayout';
import AppNavigation from '@/components/navigation/app.navigation';
import ForgetPassword from './layout/forgetPassword';
export default function HomeScreen() {
  
  return (
    <SafeAreaView style={styleGlobal.mainLayout}>
        {/* <SignUpLayout />  */}
        {/* <SignInLayout /> */}
        <AppNavigation />
        {/* <ForgetPassword /> */}
    </SafeAreaView>
  );
}
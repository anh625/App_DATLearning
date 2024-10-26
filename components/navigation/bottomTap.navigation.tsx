import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import SignInLayout from '@/app/(tabs)/layout/signInLayout';
import SignUpLayout from '@/app/(tabs)/layout/signUpLayout';
import { styleGlobal } from '@/app/(tabs)/css/cssGlobal';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import ListLevels from '@/components/vocabulary/listLevels';
import { NavigationContainer } from '@react-navigation/native';
import Vocabulary from '@/app/(tabs)/layout/vocabularyLayout';
const Tab = createBottomTabNavigator();

const MyTabs = () => {
    const [isDis, setIsDis] = React.useState(true);
    const handleDis = (is: boolean) => {
        setIsDis(is);
    }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0EB1FC',
        tabBarInactiveTintColor: '#8AD0E7',
        tabBarStyle: {
            backgroundColor: '#f8f8f8', // Màu nền của tab bar
            paddingBottom: 5, // Khoảng cách dưới cùng
            height: 60, // Chiều cao của tab bar
            display: isDis ? "flex": "none",
          },
          tabBarIconStyle: {
            marginTop: 5, // Khoảng cách giữa icon và label
          },
      }}
    >
      <Tab.Screen 
        name="ListLevels" 
        options={{
          tabBarLabel: ({ focused }) => (
            focused ? <Text style={styleGlobal.textBottomTap}>Học từ vựng</Text> : null
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book" size={size} color={color} />
          ),
        }}>{() => <Vocabulary funVoid={handleDis}/>}</Tab.Screen> 
      <Tab.Screen 
        name="exams" 
        component={SignUpLayout} 
        options={{
          tabBarLabel: ({ focused }) => (
            focused ? <Text style={styleGlobal.textBottomTap}>Kiểm tra</Text> : null
          ),
          tabBarIcon: ({ color, size }) => (
            <Feather name="check-square" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="rewards" 
        component={SignUpLayout} 
        options={{
          tabBarLabel: ({ focused }) => (
            focused ? <Text style={styleGlobal.textBottomTap}>Đổi thưởng</Text> : null
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="gift" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="games" 
        component={SignUpLayout} 
        options={{
          tabBarLabel: ({ focused }) => (
            focused ? <Text style={styleGlobal.textBottomTap}>Giải trí</Text> : null
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="gamepad" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen 
        name="info" 
        component={SignUpLayout} 
        options={{
          tabBarLabel: ({ focused }) => (
            focused ? <Text style={styleGlobal.textBottomTap}>Cá nhân</Text> : null
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}
export default MyTabs;

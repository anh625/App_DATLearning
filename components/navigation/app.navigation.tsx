import ForgetPassword from '@/app/(tabs)/layout/forgetPassword';
import HistoryExam from '@/app/(tabs)/layout/historyExams';
import SignInLayout from '@/app/(tabs)/layout/signInLayout';
import SignUpLayout from '@/app/(tabs)/layout/signUpLayout';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const AppNavigation = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="signIn"
                component={SignInLayout} />
            <Stack.Screen name="signUp"
                component={SignUpLayout} />
            <Stack.Screen name="forgetPassword"
                component={ForgetPassword} />
            
        </Stack.Navigator>
    );
}
export default AppNavigation;
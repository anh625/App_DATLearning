import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInfoScreen from './userInfo';
import HistoryExamScreen from './historyExams';

const UserInfoLayout = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='userInfo'
                component={UserInfoScreen}
            />
            <Stack.Screen
                name="historyExams"
                component={HistoryExamScreen}
            />
        </Stack.Navigator>
    )
}

export default UserInfoLayout;
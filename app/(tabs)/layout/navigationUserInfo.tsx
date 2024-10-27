import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInfoScreen from './userInfo';
import HistoryExamScreen from './historyExams';
import Ionicons from '@expo/vector-icons/Ionicons';
import HistoryExamLayout from './historyExams';
import HistoryRewardLayout from './historyRewards';
import SignInLayout from './signInLayout';

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
                component={HistoryExamLayout}
            />
            <Stack.Screen
                name="historyRewards"
                component={HistoryRewardLayout}
            />
            <Stack.Screen
                name="signIn"
                component={SignInLayout}
            />
        </Stack.Navigator>
    )
}

export default UserInfoLayout;
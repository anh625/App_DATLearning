import GameScreen from '@/app/(tabs)/layout/game/gameLayout';
import GuideScreen from '@/app/(tabs)/layout/game/guide';
import RankSceen from '@/app/(tabs)/layout/game/rank';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const GameLayout = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='homegames'
                component={GameScreen}
            />
            {/* <Stack.Screen
                name='guides'
                component={GuideScreen}
            /> */}
            <Stack.Screen
                name='ranks'
                component={RankSceen}
            />
        </Stack.Navigator>
    )
}

export default GameLayout;
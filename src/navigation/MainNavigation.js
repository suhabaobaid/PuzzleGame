import { StackNavigator } from 'react-navigation';

import GameScreen from '../screens/GameScreen';
import MenuScreen from '../screens/MenuScreen';

const MainNavigator = StackNavigator({
    Menu: {
        screen: MenuScreen

    },
    Game: {
        screen: GameScreen
    }
}, {
    headerMode: 'none'
});

export default MainNavigator;

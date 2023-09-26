import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Splash from './Splash';
import BasicDetail from './BasicDetail';
import Discover from "./Discover";
import RegisteredEvents from "./RegisteredEvents";
import Login from "./Login";
import Signup from "./Signup";
import EventDesc from "./EventDesc";
import Token from "./Token"
import BasicDetails2 from "./BasicDetails2";
import Otp from "./Otp";
import DisplayEventDesc from "./DisplayEventDesc";




const MainNavigator = createStackNavigator({
    Splash: { screen: Splash },
    BasicDetail: { screen: BasicDetail },
    Discover: {screen: Discover},
    RegisteredEvents: {screen: RegisteredEvents},
    Login: {screen: Login},
    Signup: {screen: Signup},
    EventDesc: {screen: EventDesc},
    Token: { screen: Token },
    BasicDetails2: {screen: BasicDetails2},
    Otp: {screen: Otp},
    DisplayEventDesc: {screen: DisplayEventDesc}
    
    
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

export default createAppContainer(
    MainNavigator
);


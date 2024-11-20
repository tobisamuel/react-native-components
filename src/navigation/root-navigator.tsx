import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStaticNavigation } from "@react-navigation/native";

import IntroductionScreen from "@/screens/introduction";
import SwitchScreen from "@/screens/switch";

const DrawerNavigator = createDrawerNavigator({
  screens: {
    Home: IntroductionScreen,
    Switch: SwitchScreen,
  },
});

const Navigation = createStaticNavigation(DrawerNavigator);

export default Navigation;

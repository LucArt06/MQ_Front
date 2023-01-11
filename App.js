import React from "react";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpFormScreen from "./src/components/views/SignUpFormScreen";
import LogInFormScreen from "./src/components/views/LogInFormScreen";
import PreStarterScreen from "./src/components/views/PreStarterScreen";
import StarterScreen from "./src/components/views/StarterScreen";
import IntroScreen from "./src/components/views/IntroScreen";
import RobotChoiceScreen from "./src/components/views/RobotChoiceScreen";
import HomeScreen from "./src/components/views/HomeScreen";
import CollectionScreen from "./src/components/views/CollectionScreen";
import ProfilScreen from "./src/components/views/ProfilScreen";
import RankingScreen from "./src/components/views/RankingScreen";
import ShopScreen from "./src/components/views/ShopScreen";
import AreaChoiceScreen from "./src/components/views/AreaChoiceScreen";
import BattleScreen from "./src/components/views/BattleScreen";
import { MainRobotContext } from "./src/lib/MainRobotContext";
import { BattleScreenLoadingContext } from "./src/lib/BattleScreenLoadingContext";
import { MessageStamContext } from "./src/lib/MessageStamContext";
import { AreaChoosenContext } from "./src/lib/AreaChoosenContext";
const Stack = createNativeStackNavigator();

// L'app.js va nous permettre de lire tous les screens/views
export default function App() {
  const [mainRobot, setMainRobot] = useState([]);
  const [areaChoosen, setAreaChoosen] = useState([]);
  const [battleScreenLoading, setBattleScreenLoading] = useState([]);
  const [messageStam, setMessageStam] = useState("");

  return (
    <AreaChoosenContext.Provider value={{ areaChoosen, setAreaChoosen }}>
      {/* <DiceResultContext.Provider value={{ diceResult, setDiceResult }}> */}
      <MessageStamContext.Provider value={{ messageStam, setMessageStam }}>
        <BattleScreenLoadingContext.Provider
          value={{ battleScreenLoading, setBattleScreenLoading }}
        >
          <MainRobotContext.Provider value={{ mainRobot, setMainRobot }}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="PreStarterScreen"
                  component={PreStarterScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="StarterScreen"
                  component={StarterScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="LogInFormScreen"
                  component={LogInFormScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="SignUpFormScreen"
                  component={SignUpFormScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="IntroScreen"
                  component={IntroScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="RobotChoiceScreen"
                  component={RobotChoiceScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="AreaChoiceScreen"
                  component={AreaChoiceScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="BattleScreen"
                  component={BattleScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CollectionScreen"
                  component={CollectionScreen}
                />
                <Stack.Screen name="ShopScreen" component={ShopScreen} />
                <Stack.Screen name="RankingScreen" component={RankingScreen} />
                <Stack.Screen name="ProfilScreen" component={ProfilScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </MainRobotContext.Provider>
        </BattleScreenLoadingContext.Provider>
      </MessageStamContext.Provider>
    </AreaChoosenContext.Provider>
  );
}

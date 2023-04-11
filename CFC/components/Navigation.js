import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer} from "@react-navigation/native";

import Main from "./Main";
import Transaction from "./Transaction";

const Stack = createStackNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='Main' component={Main}/>
            <Stack.Screen name='Transaction' component={Transaction}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
}
import React from "react";
import { createStackNavigator, TransitionPresets  } from "@react-navigation/stack";
import { NavigationContainer} from "@react-navigation/native";

import Main from "./pages/Main";
import Transaction from "./pages/Transaction";
import Categories from "./pages/Categories";
import TransactionInfo from "./pages/TransactionInfo";
import CategoryForm from "./pages/CategoryForm";
import Icons from "./pages/Icons";

const Stack = createStackNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen options={{ ...TransitionPresets.ModalSlideFromBottomIOS   }} name='Main' component={Main}/>
            <Stack.Screen options={{ ...TransitionPresets.ModalSlideFromBottomIOS   }} name='Transaction' component={Transaction}/>
            <Stack.Screen options={{ ...TransitionPresets.ModalSlideFromBottomIOS   }}  name='Categories' component={Categories}/>
            <Stack.Screen options={{ ...TransitionPresets.ModalSlideFromBottomIOS   }} name='TransactionInfo' component={TransactionInfo}/>
            <Stack.Screen options={{ ...TransitionPresets.ModalSlideFromBottomIOS   }} name='CategoryForm' component={CategoryForm}/>
            <Stack.Screen options={{ ...TransitionPresets.ModalSlideFromBottomIOS   }} name='Icons' component={Icons}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
}
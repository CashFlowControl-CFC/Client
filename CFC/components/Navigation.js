import React from "react";
import { createStackNavigator, TransitionPresets  } from "@react-navigation/stack";
import { NavigationContainer} from "@react-navigation/native";

import Main from "./pages/Main";
import Transaction from "./pages/Transaction";
import Categories from "./pages/Categories";
import TransactionInfo from "./pages/TransactionInfo";
import CategoryForm from "./pages/CategoryForm";
import Icons from "./pages/Icons";
import AuthPage from "./pages/AuthPage";
import LogIn from "./pages/LogIn";

const Stack = createStackNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }} name='Auth' component={AuthPage}/>
            <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }} name='LogIn' component={LogIn}/>
            <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }} name='Main' component={Main}/>
            <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }} name='Transaction' component={Transaction}/>
            <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }}  name='Categories' component={Categories}/>
            <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }} name='TransactionInfo' component={TransactionInfo}/>
            <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }} name='CategoryForm' component={CategoryForm}/>
            <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }} name='Icons' component={Icons}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
}
import React, { useEffect, useState } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./pages/Main";
import Transaction from "./pages/Transaction";
import Categories from "./pages/Categories";
import TransactionInfo from "./pages/TransactionInfo";
import CategoryForm from "./pages/CategoryForm";
import Icons from "./pages/Icons";
import AuthPage from "./pages/AuthPage";
import LogIn from "./pages/LogIn";
import Target from "./pages/Target"
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../modules/FirebaseConfig";
const Stack = createStackNavigator();
const InsideStack = createStackNavigator();
function InsideLayout() {
  return (
    <InsideStack.Navigator screenOptions={{ headerShown: false }}>
      <InsideStack.Screen name="Main" component={Main} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Transaction' component={Transaction} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Categories' component={Categories} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='TransactionInfo' component={TransactionInfo} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='CategoryForm' component={CategoryForm} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Icons' component={Icons} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Target' component={Target} />
    </InsideStack.Navigator>
  )
}
export default function Navigation() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log("main")
        setUser(user)
      }
      else {
        console.log("auth")
      }
    });
  }, []);

    return(
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {user?(<Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS, headerLeft: null, gestureEnabled: false }} name='Inside' component={InsideLayout}/>)
            :
            (<>
            <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }} name='Auth' component={AuthPage}/>
            <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }} name='LogIn' component={LogIn}/>
            </>)}
  
          </Stack.Navigator>
        </NavigationContainer>
    );
}
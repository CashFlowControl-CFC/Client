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
import Registration from "./pages/Registration";
import TargetForm from "./TargetComponents/TargetForm";
import TargetInfo from "./pages/TargetInfo";
import { getAccessToken } from "../modules/storage";
import { ActivityIndicator } from "react-native";
import general from "../styles/general";
import ScheduledPayments from "./pages/SheduledPayments";
const Stack = createStackNavigator();
const InsideStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const InsideLayout = ()=> {

    return (
      <InsideStack.Navigator screenOptions={{ headerShown: false }}>
      <InsideStack.Screen name="Main" component={Main} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Transaction' component={Transaction} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Categories' component={Categories} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='TransactionInfo' component={TransactionInfo} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='CategoryForm' component={CategoryForm} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Icons' component={Icons} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='Target' component={Target} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='TargetForm' component={TargetForm} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='TargetInfo' component={TargetInfo} />
      <InsideStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name='ScheduledPayments' component={ScheduledPayments} />
    </InsideStack.Navigator>
    )
  
}
const RegisterLayout = ()=>{
return(
<RegisterStack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
      <RegisterStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }} name='Auth' component={AuthPage}/>
      <RegisterStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }} name='LogIn' component={LogIn}/>
      <RegisterStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS   }} name='Registration' component={Registration}/>
    </RegisterStack.Navigator>
)
}
const send = async(token)=>{
  console.log("send token:", token)
  const result = await fetch(`http://192.168.31.159:3000/user/check`,{
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
  body: JSON.stringify(token),
  })
    if(result.status === 200){
      console.log(result.status)
      return await (result.json());
    }
    else{
      return null;
    }
}
export default function Navigation() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setUser(user)
      }
      else {
        console.log("jwt check")
        setUser(await send(await getAccessToken()))
      }
      setLoading(false)
    });
  }, []);

  return (
    <NavigationContainer>
      {!loading ? <ActivityIndicator style={general.addAuthBtn} size="large" color="#fcbe53" /> 
      :!user ? <InsideLayout /> : <RegisterLayout />}
    </NavigationContainer>
  );
}
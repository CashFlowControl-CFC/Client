import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import general from "../../styles/general";
import TransactionType from "./TransactionType";
import getImage from "../../resources/imageComponent";

function Header(props){
    
    return(
        <View style={general.header}>
            
            <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: '90%'}}>
            <TouchableWithoutFeedback onPressIn={() => props.navigation.goBack()}>
                <View style={{position: 'absolute', zIndex: 1,width: '20%'}}>
                    {getImage(process.env.API_POINTER_URL, 23, 23, '#FFFFFF')}
                </View>
            </TouchableWithoutFeedback>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: '100%', zIndex: 0, gap: 10}}>
                        <Text style={[general.generalText, { fontSize: 20  }]}>{props.text}</Text>
                </View>
            </View>

            <TransactionType/>
        </View>       
    );
}

export default Header;
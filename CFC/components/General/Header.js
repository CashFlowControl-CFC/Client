import React from "react";
import { View, Text } from "react-native";
import general from "../../styles/general";
import TransactionType from "./TransactionType";

function Header(props){
    
    return(
        <View style={general.header}>
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={[general.generalText, { fontSize: 20  }]}>{props.text}</Text>
            </View>
            <TransactionType/>
        </View>       
    );
}

export default Header;
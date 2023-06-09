import React from "react";
import { View, TextInput, Text} from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import { useSelector } from "react-redux";

function MoneyInput(props){
  const current = useSelector(state => state.currency.current);
    return (
        <View style={{width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: "5%"}}>
                        <TextInput 
                                    placeholder='0'
                                    placeholderTextColor={'#D8D8D880'}
                                    keyboardType="numeric" 
                                    style={[general.inputMoney, {width: "50%"}]}
                                    value={props.object.value} 
                                    onChangeText={(text) => {
                                        if (/^[0-9]*[.,]?[0-9]*$/.test(text)) {
                                          props.object.setValue(text);
                                        }
                                      }}
                                      /> 
                          <Text style={[general.generalText, {fontSize: 20, position: 'absolute', right: 30}]}>{current}</Text>
                </View>     
    );
}

export default MoneyInput;
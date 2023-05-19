import React from "react";
import { View, TextInput} from "react-native";
import general from "../../styles/general";

function MoneyInput(props){
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
                </View>     
    );
}

export default MoneyInput;
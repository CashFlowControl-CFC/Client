import React, { useContext } from "react";
import { View, TextInput} from "react-native";
import general from "../../styles/general";
import { TransactionContext } from "../../modules/context";

function MoneyInput(){
    const {value, setValue} = useContext(TransactionContext)
    return (
        <View style={{width: "100%", alignItems: 'center', justifyContent: 'center', marginTop: "5%"}}>
                        <TextInput 
                                    placeholder='0'
                                    placeholderTextColor={'#D8D8D880'}
                                    keyboardType="numeric" 
                                    style={[general.inputMoney, {width: "50%"}]}
                                    value={value} 
                                    onChangeText={(text) => {
                                        if (/^[0-9]*[.,]?[0-9]*$/.test(text)) {
                                          setValue(text);
                                        }
                                      }}
                                      /> 
                </View>     
    );
}

export default MoneyInput;
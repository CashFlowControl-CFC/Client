import React, { useContext, useState } from "react";
import { View, TextInput, Text} from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import { CategoryFormContext } from "../../modules/context";

function CategoryInput(){
    const { catName, setCatName } = useContext(CategoryFormContext);
    return (
        <View style={{width: "90%", marginTop: "7%"}}>
                            <Text style={[general.generalText, {direction: 'rtl'}]}>Name of category</Text> 
                            <TextInput 
                                placeholder="Enter name"
                                placeholderTextColor={"#D8D8D880"}
                                style={[general.inputComment, {width: "100%"}]}
                                value={catName} 
                                onChangeText={(name) => {
                                    if(name.length < 15){
                                        setCatName(name)
                                    }
                                }
                                }/> 
                        </View> 
    );
}

export default CategoryInput;
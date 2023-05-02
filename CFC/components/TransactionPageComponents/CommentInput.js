import React, { useContext, useState } from "react";
import { View, TextInput, Text} from "react-native";
import general from "../../styles/general";
import { TransactionContext } from "../../modules/context";

function CommentInput(){
    const {comment, setIsMove, setComment} = useContext(TransactionContext);
    return (
        <View style={{width: "90%", marginTop: "5%"}}>
        <Text style={[general.generalText, {direction: 'rtl'}]}>Comment</Text>
        <TextInput 
                    onBlur={() =>setIsMove(false)}
                    onPressIn={() =>setIsMove(true)}
                    placeholder="Comment"
                    placeholderTextColor={"#D8D8D880"}
                    style={[general.inputComment, {width: "100%"}]}
                    value={comment} 
                    onChangeText={(comment) => setComment(comment)}/>    
    </View>     
    );
}

export default CommentInput;
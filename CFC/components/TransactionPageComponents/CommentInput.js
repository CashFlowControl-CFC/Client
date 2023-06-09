import React  from "react";
import { View, TextInput, Text} from "react-native";
import general from "../../styles/general";

function CommentInput(props){
    return (
        <View style={{width: "90%", marginTop: "5%"}}>
        <Text style={[general.generalText, {direction: 'rtl'}]}>Comment</Text>
        <TextInput 
                    onBlur={() =>props.object.setIsMove(false)}
                    onPressIn={() =>props.object.setIsMove(true)}
                    placeholder="Comment"
                    placeholderTextColor={"#D8D8D880"}
                    style={[general.inputComment, {width: "100%"}]}
                    value={props.object.comment} 
                    onChangeText={(comment) => {
                        if(comment.length < 30){
                            props.object.setComment(comment)
                        }
                    }
                    }/>    
    </View>     
    );
}

export default CommentInput;
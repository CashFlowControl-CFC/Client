import React, { useState } from "react";
import { TouchableWithoutFeedback, View, Text, TextInput,Button } from "react-native";
import general from "../../styles/general";
import generalLight from "../../styles/generalLight";
import { useSelector } from "react-redux";
import { updateData } from "../../modules/requests";
import { isAlphanumeric } from 'validator';
export default function UserInfo(props) {
    const user = useSelector(state => state.user.user);
    const [nickname, setNickname] = useState(user.name);
    
    const handleNicknameSubmit = async () => {
        if(isAlphanumeric(nickname) && /^[a-zA-Z]+$/.test(nickname)){
            const result = await updateData(`${process.env.API_URL}/user/${user.uid}`,{name:nickname})
            if(result.status==200){
                alert("Success")
                console.log('Nickname submitted:', nickname);
            }
        }else{
            alert("Not validate")
        }
    };
    return (
        <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center', marginTop: '15%' }}>
            <TouchableWithoutFeedback>
                <View style={{ width: '90%', marginTop: '5%', alignSelf: 'flex-start' }}>
                    <Text style={[general.generalText, { color: '#D8D8D8' }]}>Name</Text>
                    <TextInput
                        style={[general.generalText, { fontSize: 19, marginTop: 5 }]}
                        value={nickname}
                        onChangeText={setNickname}
                        onSubmitEditing={handleNicknameSubmit}
                    />
                </View>
            </TouchableWithoutFeedback>
            <View style={{ width: '90%', marginTop: '5%', alignSelf: 'flex-start' }}>
                <Text style={[general.generalText, { color: '#D8D8D8' }]}>E-mail</Text>
                <Text style={[general.generalText, { fontSize: 19, marginTop: 5 }]}>{user.email}</Text>
            </View>
        </View>
    );
}
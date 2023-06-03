import React from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";
import general from "../../styles/general";
import { useSelector } from "react-redux";

export default function UserInfo(props){
    const user = useSelector(state => state.user.user);
    return (
        <View style={{width: '90%', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableWithoutFeedback>
                <View style={{width: '90%', marginTop: '5%', alignSelf: 'flex-start'}}>
                    <Text style={[general.generalText, {color: '#D8D8D8'}]}>Name</Text>
                    <Text style={[general.generalText, {fontSize: 19, marginTop: 5}]}>Peter Peter</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={{width: '90%', marginTop: '5%', alignSelf: 'flex-start'}}>
                <Text style={[general.generalText, {color: '#D8D8D8'}]}>E-mail</Text>
                <Text style={[general.generalText, {fontSize: 19, marginTop: 5}]}>{user.email}</Text>
            </View>
        </View>
    );
}
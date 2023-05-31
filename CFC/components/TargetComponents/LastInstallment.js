import React from "react";
import { Text, View} from "react-native";
import general from "../../styles/general";
import moment from "moment";
import styles from "../../styles/MainPage";
import getImage from "../../resources/imageComponent";

function LastInstallment(props){
    return (
        <View style={{width: "95%", marginTop: '5%', gap: 10}}>
                         <><Text style={[general.generalText, {marginLeft: '5%', color: '#D8D8D8'}]}>Last installment</Text>
                        <Text style={[general.generalText, {marginLeft: '5%', color: '#D8D8D8'}]}>{moment(props.target.date_last_income).format('DD.MM.YYYY')}</Text></>
                        <View style={[styles.category, {backgroundColor: props.target.color + "20"}]}>
                                    <View style={[styles.circle, {backgroundColor: props.target.color}]}>
                                        {getImage(props.target.image_link, 25, 25, props.target.image_color)}
                                    </View>
                                    <View style={{width:"70%", flexDirection: "row", justifyContent: "space-between"}}>
                                            <Text style={styles.categoryText}>{props.target.name}</Text>
                                            <Text style={[styles.categoryText, {direction: 'ltr'}]}>{props.target.last_income}$</Text>
                                    </View>
                                </View> 
                    </View>     
    );
}

export default LastInstallment;
import React, { useEffect, useState } from "react";
import { View, Text} from "react-native";
import general from "../../styles/general";
import { useSelector } from "react-redux";
import IconsList from "../IconListComponents/IconsList";
import CommonHeader from "../General/CommonHeader";

function Icons({navigation}){
    const icons = useSelector(state => state.icon.icons);
    const iconType = useSelector(state => state.icon.iconType);
    const [data, setData] = useState([]);
    useEffect(()=>{
        filter();
    },[]);
    const filter = () =>{
        if(iconType){
           setData(icons.filter(item => item.category_id == iconType).sort((a,b) => a.category_id - b.category_id));
        }
        else{
           setData(icons.sort((a,b) => a.category_id - b.category_id));
        }
    }
    return (
            <View style={general.app}>
                <CommonHeader title={'Icons'} navigation={navigation}/>    

                    <View style={general.content} >
                        <IconsList data={data} navigation={navigation}/>
                    </View>
            </View>
    );
}

export default Icons;
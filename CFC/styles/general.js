import { StyleSheet, Dimensions  } from 'react-native';
const { width, height } = Dimensions.get('window');

const general = StyleSheet.create({
    app:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#1E1E1E',
       },
       content:{
        backgroundColor: '#2F2F2F',
        width: 0.9 * width,
        height: 0.8 * height,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        alignItems: "center"
       }, 
       header:{
        width: "100%",
        height: height * 0.14,
        alignItems: "center",
        justifyContent: 'space-around'
       }, 
       generalText:{
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 17,
       },
       selected:{
        color: "#FDCD81",
        textDecorationLine: 'underline'
       },
       inputMoney:{
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 1,
        width: "70%",
        textAlign: 'center',
        color: '#D8D8D8',
        fontSize: 25
       },
       addBtn:{
        width: 20,
        height: 20,
        borderRadius: 100,
        top: "60%",
        left: "60%",
        margin: "5%",
        backgroundColor: "#FECC7A",
        position: "absolute",
        alignItems: "center",
        justifyContent: 'center',
       },
});

export default general;
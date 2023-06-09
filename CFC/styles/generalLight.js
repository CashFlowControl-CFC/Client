import { StyleSheet, Dimensions  } from 'react-native';
const { width, height } = Dimensions.get('screen');

const generalLight = StyleSheet.create({
    app:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#C5F671',
        position: 'absolute',
        height: height,
        width: width
       },
       content:{
        backgroundColor: '#C5F671',
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
        color: '#000000',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 17,
       },
       selected:{
        color: "#000000",
        textDecorationLine: 'underline'
       },
       inputMoney:{
        borderBottomColor: "#000000",
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
        backgroundColor: "#92C142",
        position: "absolute",
        alignItems: "center",
        justifyContent: 'center',
        margin: "5%",
       },
       pieAddBtn:{
        top: "60%",
        left: "60%",
       },
       transAddBtn:{
        bottom: 35
       },
       inputComment:{
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
        width: "70%",
        color: '#D8D8D8',
        fontSize: 21,
        marginTop: '3%'
       },
       isMove: {
        paddingBottom: '40%',
       },
       removeText: {
        color: '#fa5050',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 23,
       },
       authContent:{
        width: 0.9 * width,
        height: height,
        alignItems: "center",
        justifyContent: 'center'
       },
        addAuthBtn: {
        width: width * 0.7, 
        height: height * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: '10%',
        marginBottom: '5%'
        },
        addText:{
            color: '#FFFFFF',
            fontSize: 19
        },
        errorText:{
            width:"100%", 
            fontSize: 15, 
        },
        deadlineText:{
            color: '#F9B233',
            fontSize: 17,
            fontWeight: 400,
            marginLeft: '5%'
        },
        avatar:{
            backgroundColor: '#92C142',
            width: width * 0.5,
            height: width * 0.5,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10%'
        },
        modalCurrency:{
            width: '40%', 
            marginTop: '5%', 
            padding: '5%', 
            alignSelf: 'flex-start',
            backgroundColor: '#393939',
            borderRadius: 20
        }
});

export default generalLight;
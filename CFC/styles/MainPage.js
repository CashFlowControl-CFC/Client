import { StyleSheet, Dimensions  } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
        borderTopStartRadius: "40%",
        borderTopEndRadius: "40%",
        alignItems: "center"
       },
       periodText:{
        color: '#D8D8D8',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 15,
       },
       categoryText:{
        color: '#FFFFFF',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 17,
       },
       periodBtns:{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "10%",
       },
       pieChart:{
        height: height * 0.25,
       },
       category:{
        width: "100%",
        height: height * 0.07,
        borderRadius: "100%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: "3%",
       },
       circle:{
        width: 40,
        height: 40,
        borderRadius: "100%",
        margin: "5%",
        alignItems: 'center',
        justifyContent: 'center'
       },
       addBtn:{
        width: 20,
        height: 20,
        borderRadius: "100%",
        top: "60%",
        left: "60%",
        margin: "5%",
        backgroundColor: "#FECC7A",
        position: "absolute",
        alignItems: "center",
        justifyContent: 'center',
       },
       header:{
        width: "100%",
        height: height * 0.14,
        alignItems: "center",
        justifyContent: 'space-around'
       },
       totalMoney:{
           color: "#FFFFFF",
           fontSize: 23,
           fontWeight: 500,
           marginLeft: '1%'
       },
       flatList:{
        width: "100%",
        flexGrow: 1,
       },
       pModal:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#1E1E1E80",
       },
       sModal:{
        width: width * 0.7,
        height: height * 0.2,
        backgroundColor: "#2F2F2F",
        borderRadius: "30%",
        alignItems: 'center',
        justifyContent: 'space-around',
       },
       inputMoney:{
        borderBottomColor: "#FFFFFF",
        borderBottomWidth: 1,
        width: "70%",
        textAlign: 'center',
        color: '#D8D8D8',
        fontSize: 25
       }
    }
)

export default styles;
import { StyleSheet, Dimensions  } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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
        borderRadius: 100,
        margin: "5%",
        alignItems: 'center',
        justifyContent: 'center'
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
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-around',
       },
       date:{
        width: "100%",
        marginTop: "7%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
       },
    }
)

export default styles;
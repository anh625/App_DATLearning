import LineSign from "@/components/other/lineSign";
import { StyleSheet } from "react-native";

export const styleGlobal = StyleSheet.create({
    //main
    mainLayout: {
        flex:1,
    },
    //boxInput
    boxInput:{
        alignItems:"center"
    },

    //Input
    container: {
        position: 'relative',
        justifyContent:"center",
        marginTop: 26,
      },
    input: {
        width: 271,
        height: 52,
        borderRadius: 5,
        borderWidth: 1,
        fontSize:  20,
        paddingLeft: 15,
        paddingTop: 10,
        paddingRight: 45,
      },
    placeholderFocus: {
        position: 'absolute',
        left: 15,
        top: 3,
        color: '#A9A9A9', 
        fontSize: 12, 
        fontWeight: "400",
      },
      placeholderBlur: {
        position: 'absolute',
        left: 15,
        top: 10,
        color: '#A9A9A9', 
        fontSize: 23, 
        fontWeight: "400",
      },
    iconEye: {
        position: 'absolute',
        right: 14,
        top: 15,
      },
    errorMess: {
        marginLeft: 15,
        marginTop:5,
        fontSize: 12,
        color: "red",
    },

    // button
    button: {
        width: 271,
        height: 52,
        borderRadius: 5,
        backgroundColor: "#459DE4",
        justifyContent:"center",
        alignItems:"center",
        marginTop: 26
      },
    textButton: {
        fontSize: 14,                    
        lineHeight: 16.94,
        fontWeight: "700",
    },

    //lineSign:
    lineSign:{
        flexDirection: "row",
        alignItems: "center",
    },
    line: {
        height:2,
        width:62,
        backgroundColor: "#D9D9D9",
    },
    textSign: {
        fontSize:12,
        fontWeight: "700",
        lineHeight: 14.52,
        marginHorizontal: 1,
    },

    //google buttun
    viewGoogle: {
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:260,
        height:41,
        borderRadius: 10,
        borderWidth: 1,
    },
    logoGoogle: {
        width:18,
        height:18,
    },
    textGoogle: {
        fontSize:14,
        fontWeight: "700",
        lineHeight: 16.94,
        marginLeft: 20,
    },

    //haveAcc
    quizAns: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 30,
        marginBottom:55,
    },
    quiz: {
        fontSize:12,
        fontWeight: "500",
        lineHeight: 14.52,
    },
    ans: {
        fontSize:12,
        fontWeight: "500",
        lineHeight: 14.52,
        color: "#459DE4",
    },

    //header
    header: {
        height: 65,
        backgroundColor: "#459DE4",
        flexDirection:"row",
        alignItems:"center",
    },

    //bottonTap
    textBottomTap: {
        color: '#0EB1FC', 
        fontSize:10, 
        fontWeight:"400"
    }
})
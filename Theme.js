import { StyleSheet } from "react-native";
export default Theme = StyleSheet.create({
    Button: {
        borderRadius: 20,
        backgroundColor: '#ff0000'

    },
    inputBox: {
        backgroundColor: '#ebebeb',
        padding: 13,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        fontFamily:"Inter_500Medium"
    },
    wrongInput: {
        borderColor: '#284DD1',
        borderWidth: 1,
    },
    correctInput: {
        borderColor: '#307045',
        borderWidth: 1,
    }
})
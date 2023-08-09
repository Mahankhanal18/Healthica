import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

module.exports.APP_NAME = "It Matters";
module.exports.API_URL = "https://healthica.in/";

module.exports.Store = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        Alert.alert(e);
    }
}
module.exports.Retrive = async (key) => {
    try {
        await AsyncStorage.getItem(key).then((value) => {
            if (value != null) {
                return value;
            } else {
                return 'Empty';
            }
        });

    } catch (e) {
        Alert.alert(e);
    }
}
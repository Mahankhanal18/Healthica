import AppLoading from "expo-app-loading";
import { Component } from "react";
import { ActivityIndicator } from "react-native";
import Login from "./components/Login";
import Splash from "./components/Splash";
import Welcome from "./components/Welcome";
import Route from "./Route";
import { useFont } from "./useFont";
import 'react-native-gesture-handler';
import { Provider } from "react-redux";
import { store } from "./redux/store"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IsReady: false,
      component: <Splash />
    }
  }
  componentDidMount = async () => {
    await useFont();
    this.setState({ IsReady: true });
  };
  render() {
    return (

      this.state.IsReady ?
        <Provider store={store}>
          <Route />
        </Provider>
        : <ActivityIndicator />

    )
  }
}
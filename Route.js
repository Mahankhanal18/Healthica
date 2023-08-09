import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react'
import { Alert, Text, ToastAndroid, View } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import Login from './components/Login';
import DoctorDashboard from "./components/Doctor/DoctorDashboard"
import Patients from './components/Doctor/Patients'
import NewPatient from './components/Doctor/NewPatient'
import NewPrescription from './components/Doctor/NewPrescription'
import Support from './components/Doctor/Support'
import Appointments from './components/Doctor/Appointments'
import { Image } from 'react-native';
import EditProfile from "./components/Doctor/EditProfile"
import { API_URL } from "./Init"
import { TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"
import { Button } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { checkLogin, logout } from './redux/actions';
import PatientDetailsScreen from './components/Doctor/PatientDetailsScreen';
import PrescriptionDetails from './components/Doctor/PrescriptionDetails';

export class Route extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systemReady: false,
    }
  }
  componentDidMount = async () => {
    this.setState({ systemReady: false });
    await this.props.checkLogin();
    if(this.props.isLogin===true){
      this.showToast();
    }
    this.setState({ systemReady: true });
  }
  showToast = ()=>{
    ToastAndroid.show("Logged in Successfully!",ToastAndroid.LONG,ToastAndroid.CENTER)
  }
  SideNavigation = ({ navigation }) => {
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 15, paddingHorizontal: 10 }}>
        {
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
              <View style={{ flex: 0.2, justifyContent: 'center' }}>
                <Image style={{ height: 60, width: 60, borderRadius: 60 }} source={{ uri: this.props.doctorLoginDetails.photo === "default" ? API_URL + 'images/default.webp' : this.props.doctorLoginDetails.photo }} />
              </View>
              <View style={{ flex: 0.8, paddingHorizontal: 30, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: "Inter_600SemiBold" }} numberOfLines={1}>{this.props.doctorLoginDetails.name}</Text>
                <Text style={{ fontSize: 10, fontFamily: "Inter_400Regular" }}>{this.props.doctorLoginDetails.speciality}</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('editprofile'); }}>
                  <Text style={{ color: '#284DD1', marginTop: 2, fontSize: 12, fontFamily: "Inter_500Medium" }}>Edit Profile  <Icon name={'rightcircle'} size={12} /></Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 9 }}>
              <Button onPress={() => navigation.navigate('patients')} buttonStyle={{ width: '100%', justifyContent: 'flex-start', borderRadius: 5 }} titleStyle={{ color: '#284DD1', fontFamily: "Inter_500Medium" }} containerStyle={{ alignItems: 'flex-start', padding: 8, borderRadius: 5 }} type='clear'><Icon color={'#284DD1'} name='team' size={18} style={{ marginRight: 5 }} />Patients</Button>
              <Button onPress={() => navigation.navigate('newpatient')} buttonStyle={{ width: '100%', justifyContent: 'flex-start', borderRadius: 5 }} titleStyle={{ color: '#284DD1', fontFamily: "Inter_500Medium" }} containerStyle={{ alignItems: 'flex-start', padding: 8, borderRadius: 5 }} type='clear'><Icon color={'#284DD1'} name='pluscircleo' size={18} style={{ marginRight: 5 }} />New patient</Button>
              <Button onPress={() => navigation.navigate('newprescription')} buttonStyle={{ width: '100%', justifyContent: 'flex-start', borderRadius: 5 }} titleStyle={{ color: '#284DD1', fontFamily: "Inter_500Medium" }} containerStyle={{ alignItems: 'flex-start', padding: 8, borderRadius: 5 }} type='clear'><Icon color={'#284DD1'} name='staro' size={18} style={{ marginRight: 5 }} />New Prescription</Button>
              <Button onPress={() => navigation.navigate('appointments')} buttonStyle={{ width: '100%', justifyContent: 'flex-start', borderRadius: 5 }} titleStyle={{ color: '#284DD1', fontFamily: "Inter_500Medium" }} containerStyle={{ alignItems: 'flex-start', padding: 8, borderRadius: 5 }} type='clear'><Icon color={'#284DD1'} name='sharealt' size={18} style={{ marginRight: 5 }} />Appointments</Button>
              <Button onPress={() => navigation.navigate('support')} buttonStyle={{ width: '100%', justifyContent: 'flex-start', borderRadius: 5 }} titleStyle={{ color: '#284DD1', fontFamily: "Inter_500Medium" }} containerStyle={{ alignItems: 'flex-start', padding: 8, borderRadius: 5 }} type='clear'><Icon color={'#284DD1'} name='bulb1' size={18} style={{ marginRight: 5 }} />Support</Button>
              <Button onPress={() => {
                Alert.alert(
                  'Logout Confirmation',
                  'Are you sure want to logout?', // <- this part is optional, you can pass an empty string
                  [
                    {
                      text: 'Yes', onPress: () => {
                        this.props.logout();
                        navigation.navigate("login")
                      }
                    },
                    { text: 'No', onPress: () => { } },
                  ],
                  { cancelable: false },
                );
              }} buttonStyle={{ width: '100%', justifyContent: 'flex-start', borderRadius: 5 }} titleStyle={{ color: '#ae2222', fontFamily: "Inter_500Medium" }} containerStyle={{ alignItems: 'flex-start', padding: 8, borderRadius: 5 }} type='clear'><Icon color={'#ae2222'} name='logout' size={18} style={{ marginRight: 5 }} />Logout</Button>
            </View>
          </View>
        }
      </SafeAreaView>
    )
  }
  render() {
    const Drawer = createDrawerNavigator();
    if (this.state.systemReady) {
      return (
        <>
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName={this.props.isLogin ? 'doctordashboard' : 'login'}
              // initialRouteName={'newprescription'}
              screenOptions={{
                headerShown: false,
                swipeEdgeWidth: 100,
              }}
              drawerContent={({ navigation }) => <this.SideNavigation navigation={navigation} />}>
              <Drawer.Screen name="doctordashboard" component={DoctorDashboard} />
              <Drawer.Screen name="login" component={Login} />
              <Drawer.Screen name='patients' component={Patients} />
              <Drawer.Screen name='appointments' component={Appointments} />
              <Drawer.Screen name='newpatient' component={NewPatient} />
              <Drawer.Screen name='newprescription' component={NewPrescription} />
              <Drawer.Screen name='support' component={Support} />
              <Drawer.Screen name='editprofile' component={EditProfile} />
              <Drawer.Screen name='patientdetails' component={PatientDetailsScreen} />
              <Drawer.Screen name='prescriptiondetails' component={PrescriptionDetails} />
              {/* <Drawer.Screen name='home' component={Home} />
              <Drawer.Screen name='medicines' component={Medicines} /> */}
            </Drawer.Navigator>
          </NavigationContainer>
        </>
      )
    } else {
      return (
        <Spinner visible={this.state.systemReady} />
      )
    }
  }
}
const mapStateToProps = state => ({
  isLogin: state.isLogin,
  doctorLoginDetails: state.doctorLoginDetails
})
export default connect(mapStateToProps, { checkLogin, logout })(Route);

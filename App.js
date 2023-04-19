import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform, ActivityIndicator, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location'
import axios from 'axios'


export default function App() {

  const [location, setLocation] = useState([])
  const [prayer, setPrayer] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)
  const baseUrl = 'http://api.aladhan.com/v1/timings/17-07-2007?latitude=51.508515&longitude=-0.1254872&method=1'
  const date = new Date()
  const dateToString = date.toLocaleString();
  const fullDate = dateToString.split(',')[0]
  const actualDate = fullDate.replace(/\//g, '-')
  

  const requestLocationPermission = async () =>{
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted'){
      setErrorMsg('Permission To access location was denied');
      return;
    }
    Location.getCurrentPositionAsync().then(location => {
      setLocation(location)
    })
  }

  const fetchAzaan = async () => {
    const {data} = await axios.get(`http://api.aladhan.com/v1/timings/${actualDate}?latitude=${location?.coords?.latitude}&longitude=${location?.coords?.longitude}.1254872&method=1`);
    setPrayer(data?.data?.timings)
    console.log(prayer)
  }
  console.log(location)

  useEffect(()=>{
    if(!location.coords){
      requestLocationPermission()
    }
      fetchAzaan()
  },[location])

 

  return (
    <View style={styles.container}>
     {location?.length !== 0 ?  (
      <>
        <Text>Altitude {location?.coords?.altitude}</Text>
        <Text> Latitude {location?.coords?.latitude}</Text>
        <Text> Logitude {location?.coords?.longitude}</Text>
       
      </>
     ) : (
      <>
      <ActivityIndicator size='large'/>
        <Text>Getting Location....</Text>
      </>
     )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

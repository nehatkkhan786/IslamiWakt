import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location'


export default function App() {

  const [location, setLocation] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)

  const requestLocationPermission = async () =>{
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted'){
      setErrorMsg('Permission To access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location)
    console.log(location)
  }

  useEffect(()=>{
    requestLocationPermission();
  }, [])

  return (
    <View style={styles.container}>
     
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

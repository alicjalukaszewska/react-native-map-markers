/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends React.Component {
  state = {
    userLocation: null,
    userPlaces: []
  }
  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,

        }
      });
      fetch('https://reactnativenauka.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }, err => console.log(err));
  }

  getUserPlacesHandler = () => {
    fetch('https://reactnativenauka.firebaseio.com/places.json')
    .then(res => res.json())
    .then(parsedRes => {
      const placesArray = [];
      for (const key in parsedRes) {
        placesArray.push({
          latitude: parsedRes[key].latitude,
          longitude: parsedRes[key].longitude,
          id: key
        })
      }
      this.setState({
        userPlaces: placesArray
      })
    })
    .catch(err => console.log(err))
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={{marginBottom: 20}}>
        <Button title="Get User Places" onPress={this.getUserPlacesHandler}/>
      </View>
      
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <UsersMap userLocation={this.state.userLocation} userPlaces={this.state.userPlaces}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

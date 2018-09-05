import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const usersMap = props => {
    let userLocationMarker = null;
    
    console.log(props);

    if (props.userLocation) {
        userLocationMarker = <MapView.Marker coordinate={props.userLocation}/>
    }

    const usersMarkers = props.userPlaces.map(userPlace => <MapView.Marker coordinate={userPlace} key={userPlace.id}/>)


    return (
        <View style={styles.mapContainer}>
            <MapView 
                style={styles.map} 
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                region={props.userLocation}
              >
                {userLocationMarker}
                {usersMarkers}
              </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        marginTop: 20,
        width: '100%',
        height: '100%'
    }
})

export default usersMap;
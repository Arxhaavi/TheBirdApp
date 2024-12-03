import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Button, Image, StyleSheet, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function CameraPage() {
    const [photo, setPhoto] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [location, setLocation] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);

    // Ask permissions for camera and location when CameraPage is loaded
    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
            if (cameraStatus === 'granted')
                setHasPermission(true);

            const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
            if (locationStatus === 'granted') {
                try {
                    const currentLocation = await Location.getCurrentPositionAsync({});
                    setLocation(currentLocation.coords);
                } catch (error) {
                    console.error('Error fetching location:', error);
                    setLocation(null);
                }
            }
        })();
    }, []);
    //Reset photo and camera reference when coming back to camera page
    useFocusEffect(
        useCallback(() => {
            setPhoto(null);
            setCameraRef(null);
        }, [])
    );

    // Take photo using cameraref then save to photo data
    const takePhoto = async () => {
        if (cameraRef) {
            const photoData = await cameraRef.takePictureAsync();
            setPhoto(photoData);
        }
    };

    const handleCameraReady = () => {
        console.log("Camera is ready!");
    };

    const handleMountError = (error) => {
        console.error("Camera Mount Error:", error);
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting camera permissions...</Text>
            </View>
        );
    }

    // Message if no camera permission
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>Camera DENIED!</Text>
            </View>
        );
    }

    // Message if location hasn't been set
    if (!location) {
        return (
            <View style={styles.container}>
                <Text>Loading location...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {!photo ? (
                <Camera style={styles.camera}
                    type={Camera.Constants.Type.back}
                    onCameraReady={handleCameraReady}
                    onMountError={handleMountError}
                    ref={(ref) => {
                        if (ref && !cameraRef) {
                            setCameraRef(ref);
                        }
                    }}
                >
                    <View style={styles.cameraButton}>
                        <Button title="Take picture" onPress={takePhoto} />
                    </View>
                </Camera>
            ) : (
                <View style={styles.container}>
                    <Image source={{ uri: photo.uri }} style={styles.photo} />
                    {location && (
                        <MapView style={styles.map}
                            initialRegion={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
                        </MapView>
                    )}
                    <Button title="New Photo" onPress={() => {
                        setPhoto(null);
                        setCameraRef(null);
                    }} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    camera: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    map: {
        width: '100%',
        height: 250,
    },
    photo: {
        width: '100%',
        height: 300,
    }
}); 

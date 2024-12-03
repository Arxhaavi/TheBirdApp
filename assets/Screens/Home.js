import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function Home() {
    return (

        //Wrap view in imagebackground for background image on front "home" page
        <ImageBackground
            source={require('../BackgroundImages/background_img.jpg')}
            style={styles.background}
            resizeMode="cover">
            <View style={styles.overlay}>
                <Text style={{ fontSize: 36, fontWeight: 'bold', color: 'ivory' }}>The Bird App</Text>
                <Text style={{ fontSize: 22, color: 'ivory' }}>For all bird watching enthusiasts</Text>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 15,
        borderRadius: 10,
    }
});
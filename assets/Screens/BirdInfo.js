import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



export default function BirdInfo() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    //match bird names to image names and format the name
    //const getImage = (englishName) => {
    // const formattedName = englishName.replace(/\s+/g, '_').toLowerCase();

    //try {
    //  return require(`../assets/BirdImages/${formattedName}.jpg`);

    //} catch (error) {
    //  return require('../assets/BirdImages/default_image.jpg');
    //}
    //};

    const handleCheckToggling = (id) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://atlas-api.2.rahtiapp.fi/api/v1/taxon');
                const result = await response.json();

                const filteredData = result.map((item) => ({
                    id: item.id,
                    englishName: item.vernacularName.en,
                    checked: false,
                    //image: getImage(item.vernacularName.en),
                }));
                setData(filteredData);

            } catch (error) {
                console.error('Error fetching data:', error);

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //Display a loading icon while the data isn't loaded yet
    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#00f" />
                <Text>Loading data...</Text>
            </View>
        );
    }


    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    {/* {item.image && <Image source={item.image} style={styles.image} />} */}
                    <Text style={styles.name}>{item.englishName}</Text>
                    <TouchableOpacity onPress={() => handleCheckToggling(item.id)}>
                        <Ionicons
                            name={item.checked ? 'checkmark-circle' : 'checkmark-circle-outline'}
                            size={24}
                            color={item.checked ? 'green' : 'gray'} />
                    </TouchableOpacity>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifContent: 'center',
        alignItems: 'center',
    },

    item: {
        padding: 8,
        borderBottomWidth: 1,
        borderbottomcolor: '#ccc',
    },

    name: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
    }
});
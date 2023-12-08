import React from 'react';
import { View, Text,StyleSheet, TouchableOpacity,Pressable,ScrollView } from 'react-native';

const HomeScreen = () => {

    return (
        <ScrollView style={styles.contenido}>
            <View>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "20%"
                }}
            >GlucoLife</Text>
        </View>

        <Pressable style={styles.btnRegistrar} onPress={() => setModalVisible(true)}>
            <Text style={styles.btnRegistrarText}>Nuevo registro</Text>
        </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenido:{
        backgroundColor:'#000080',
        flex:1,
    },
    btnRegistrar: {
        marginTop: '50',
        backgroundColor: '#00FF00',
        padding: 15,
        paddingVertical:15,
        marginTop: 100,
        marginBottom:100,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnRegistrarText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 18,
        fontWeight: '900',
        textTransform: 'uppercase'
    },
});

export default HomeScreen;
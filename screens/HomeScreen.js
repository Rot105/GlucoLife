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
                    marginTop: "10%",
                    color:"#FFF"
                }}
            >Gluco<Text style={styles.tituloBold}>Life</Text>
            </Text>
            
        </View>

        <View>
            <Text
                style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginTop: "33%",
                    color:"#FFF",
                    fontWeight:'900',
                    fontSize:70
                }}>120
            </Text>
            <Text
                style={{
                    textAlign:"center",
                    color:"#fff",
                }}
            >Última prueba de glucosa</Text>
            <Text style={{textAlign:'center',color:'#FFF'}} >20/12/2023 - 17:15</Text>
        </View>

        <Pressable style={styles.btnHistorial}>
            <Text style={styles.btnHistorialText}>Historial Glucosa</Text>
        </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenido:{
        backgroundColor:'#000080',
        flex:1,
    },
    btnHistorial: {
        marginTop: '50',
        backgroundColor: '#e32f45',
        padding: 15,
        paddingVertical:15,
        marginTop: 160,
        marginBottom:100,
        marginHorizontal: 30,
        borderRadius: 30
    },
    btnHistorialText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 18,
        fontWeight: '900',
        textTransform: 'uppercase'
    },
    tituloBold:{
        fontWeight:'900',
        color:'#ff0000'
    },
});

export default HomeScreen;
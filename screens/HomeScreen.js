import React,{ useEffect, useState,useCallback  } from 'react';
import { View, Text,StyleSheet, TouchableOpacity,Pressable,ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [ultimoRegistro, setUltimoRegistro] = useState(null);
    const actualizarUltimoRegistro = (nuevoRegistro) => {
        setUltimoRegistro(nuevoRegistro);
      };

    useEffect(() => {
        obtenerUltimoRegistro();
    }, []);

  const obtenerUltimoRegistro = () => {
    const db = SQLite.openDatabase({ name: 'glucosaDB.db', location: 'default' });

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM glucosa ORDER BY id DESC LIMIT 1',
        [],
        (tx, results) => {
          const len = results.rows.length;
          if (len > 0) {
            const ultimoRegistro = results.rows.item(0);
            setUltimoRegistro(ultimoRegistro);
          }
        }
      );
    });
  };
  useFocusEffect(
    useCallback(() => {
      obtenerUltimoRegistro();
    }, [])
  );

  const onPressHistorial = () => {
    navigation.navigate('Registro');
    
  };

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
        {ultimoRegistro && (
          <>
            <Text
              style={{
                fontSize: 30,
                textAlign: 'center',
                marginTop: '33%',
                color: '#FFF',
                fontWeight: '900',
                fontSize: 70,
              }}
            >
              {ultimoRegistro.valor}
            </Text>
            <Text style={{ textAlign: 'center', color: '#fff' }}>
              Última prueba de glucosa
            </Text>
            <Text style={{ textAlign: 'center', color: '#FFF' }}>
              {ultimoRegistro.fecha} - {ultimoRegistro.hora}
            </Text>
          </>
        )}
      </View>

        <Pressable style={styles.btnHistorial} onPress={onPressHistorial}>
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
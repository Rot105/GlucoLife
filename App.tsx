import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import Registro from './Components/Registro'

function App(): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false)
  const [nombUsu,setNombUsu] = useState('')
  return (
    <SafeAreaView style={styles.contenedor}>
      <ScrollView>
        <Text style={styles.titulo}>GlucoLife</Text>
        <View style={styles.campo}>
                  <Text style={styles.label}>Nombre</Text>
                  <TextInput 
                      style={styles.input}
                      placeholder='Nombre del usuario'
                      placeholderTextColor={"#666"}
                      value={nombUsu}
                      onChangeText={setNombUsu}
                  />
        </View>
        
        <View style={styles.campo}>
                  <Text style={styles.label}>Contraseña</Text>
                  <TextInput 
                      style={styles.input}
                      placeholder='Contraseña'
                      placeholderTextColor={"#666"}
                      value={nombUsu}
                      onChangeText={setNombUsu}
                  />
        </View>
        <Pressable style={styles.btnIniciar}>
          <Text style={styles.btnIniciarText}>Iniciar</Text>
        </Pressable>

        <Registro
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        
        <View style={{marginTop:100}}>
          <Text style={{
                        textAlign:'center', 
                        color:'#FFF', 
                        fontWeight: '600', 
                        marginBottom:20
                      }}
            >¿No tienes usuario aún?</Text>
        </View>

        <Pressable style={styles.btnRegistrar} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.btnIniciarText}>REGISTRARSE</Text>
        </Pressable>
        
      </ScrollView>
    </SafeAreaView> 

  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor:'#000080',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#00FF00',
    fontWeight: '900',
    marginTop:100
  },

  btnIniciar: {
    backgroundColor: '#00FF00',
    padding: 15,
    marginTop: 100,
    marginHorizontal: 30,
    borderRadius: 10
  },

  btnRegistrar: {
    backgroundColor: '#00FF00',
    padding: 15,
    marginBottom:90,
    marginHorizontal: 30,
    borderRadius: 10
  },

  btnIniciarText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  campo:{
    marginTop:20,
    marginHorizontal:30
  },
  label:{
    color:'#FFF',
    marginBottom:10,
    marginTop:15,
    fontSize:20,
    fontWeight:'600'
  },
  input:{
      backgroundColor:'#FFF',
      padding:15,
      borderRadius:10,
  }
});

export default App;

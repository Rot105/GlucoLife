import React, { useState } from 'react'
import{ Modal, Text, StyleSheet, SafeAreaView, TextInput, View, ScrollView, Pressable} from 'react-native'

const Registro = ({modalVisible,setModalVisible}) => {
    const [usuario,setUsuario] = useState('')
    const [password,setPassword] = useState('')
    const [repeatpass,setRepeatpass] = useState('')
    const [email,setEmail] = useState('')
  return (
    <Modal animationType='slide' visible={modalVisible}>
    <SafeAreaView style={styles.contenido}>
        <ScrollView>
            
            <Text style={styles.titulo}>Registrar{' '}
                <Text style={styles.tituloBold}>Usuario</Text>
            </Text>

            <Pressable style={styles.btnCancelar} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.btnCancelarText}>Cancelar</Text>
            </Pressable>

            <View style={styles.campo}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Nombre del usuario'
                    placeholderTextColor={"#666"}
                    value={usuario}
                    onChangeText={setUsuario}
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Introduce un cuenta de correo'
                    placeholderTextColor={"#666"}
                    keyboardType='email-address'
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Introduce una contraseña'
                    placeholderTextColor={"#666"}
                    onChangeText={setPassword}
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Repetir contraseña</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Introducir nuevamente la contraseña'
                    placeholderTextColor={"#666"}
                    onChangeText={setRepeatpass}
                />
            </View>

            <Pressable style={styles.btnRegistrar} onPress={() => setModalVisible(true)}>
                <Text style={styles.btnRegistrarText}>Registrar usuario</Text>
            </Pressable>

        </ScrollView>
    </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
    contenido:{
        backgroundColor:'#000080',
        flex:1,

    },
    titulo:{
        fontSize: 30,
        fontWeight:'600',
        textAlign:'center',
        marginTop:30,
        color:'#FFF'
    },
    tituloBold:{
        fontWeight:'900'
    },
    campo:{
        marginTop:10,
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
    btnCancelar: {
        backgroundColor: '#00FF00',
        marginVertical: 30,
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
    btnCancelarText: {
        color:'#FFF',
        textAlign: 'center',
        fontWeight:'900',
        fontSize:15,
        textTransform:'uppercase'
    }
})

export default Registro

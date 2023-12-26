import React, { useState } from 'react'
import{ FlatList,Button,Modal, Text, StyleSheet, SafeAreaView, TextInput, View, ScrollView, Pressable} from 'react-native'
import DatePicker from 'react-native-date-picker'

const Registro = ({ modalVisible,setModalVisible }) => {
    const [glucosa,setGlucosa] = useState('')
    const [fecha,setFecha] = useState(new Date())
    const [hora,setHora] = useState(new Date())
    const [comentario,setComentario] = useState('')
    const[dosis,setDosis] = useState('')
    const [btnFecha, setBtnFecha] = useState(false)
    const [btnHora, setBtnHora] = useState(false)

    const fechaMaxima = new Date()
    const buttonText = fecha ? new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(fecha) : 'Elegir fecha';

    const horaButtonText = hora
    ? hora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    : 'Elegir hora';

    const [data, setData] = useState([
        {
          id: '1',
          glucosa: '120',
          fecha: '20/12/2023',
          hora: '17:15',
          comentario: 'Después de la comida',
          dosis: '5',
        },
        {
          id: '2',
          glucosa: '110',
          fecha: '19/12/2023',
          hora: '08:30',
          comentario: 'Antes del desayuno',
          dosis: '7',
        },
        {
            id: '3',
            glucosa: '90',
            fecha: '15/12/2023',
            hora: '10:30',
            comentario: 'Después del desayuno',
            dosis: '7',
          },
          {
            id: '4',
            glucosa: '100',
            fecha: '10/12/2023',
            hora: '22:30',
            comentario: 'Antes de dormir',
            dosis: '7',
          },
      ]);
    
      const renderItem = ({ item }) => (
        <View style={styles.row}>
          <Text style={styles.cell}>{item.glucosa}</Text>
          <Text style={styles.cell}>{item.fecha}</Text>
          <Text style={styles.cell}>   {item.hora}</Text>
          <Text style={styles.cell}>{item.comentario}</Text>
          <Text style={[styles.cell]}>                 {item.dosis}</Text>
        </View>
      );

  return (
    <SafeAreaView style={styles.contenido}>
        <View style={styles.header}>
            <Text style={styles.heading}>Glucosa</Text>
            <Text style={styles.heading}>Fecha</Text>
            <Text style={styles.heading}>Hora</Text>
            <Text style={styles.heading}>Comentario</Text>
            <Text style={styles.heading}>Dosis</Text>
        </View>

        <View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    <Modal animationType='slide' visible={modalVisible}>
    <SafeAreaView style={styles.contenido}>
        <ScrollView style={styles.contenido}>
            
            <Text style={styles.titulo}>Glucosa{' '}
                <Text style={styles.tituloBold}>Diaria</Text>
            </Text>

            <Pressable style={styles.btnCancelar} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.btnCancelarText}>Cancelar</Text>
            </Pressable>

            <View style={styles.campo}>
                <Text style={styles.label}>Glucosa</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Valor de glucosa'
                    placeholderTextColor={"#666"}
                    keyboardType='number-pad'
                    value={glucosa}
                    onChangeText={setGlucosa}
                    maxLength={3}
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Fecha</Text>
                <View style={styles.fechaContenedor}>
                <Button title={buttonText} onPress={() => setBtnFecha(true)} color={'#e32f45'}/>
                    <DatePicker
                        modal
                        title={'Elegir fecha'}
                        open={btnFecha}
                        date={fecha}
                        locale='es'
                        mode='date'
                        confirmText="Confirmar"
                        cancelText="Cancelar"
                        maximumDate={fechaMaxima}
                        onConfirm={(date) => {
                        setBtnFecha(false)
                        setFecha(date)
                        }}
                        onCancel={() => {
                        setBtnFecha(false)
                        }}
                    />
                </View>  
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Hora</Text>
                <View style={styles.fechaContenedor}>
                <Button title={horaButtonText} onPress={() => setBtnHora(true)} color={'#e32f45'} />
                    <DatePicker
                        modal
                        title={'Elegir hora'}
                        open={btnHora}
                        date={hora}
                        mode='time'
                        locale='es'
                        confirmText="Confirmar"
                        cancelText="Cancelar"
                        onConfirm={(date) => {
                        setBtnHora(false)
                        setHora(date)
                        }}
                        onCancel={() => {
                        setBtnHora(false)
                        }}
                    />
                </View>  
            </View>

            <View  style={styles.campo}>
                <Text style={styles.label}>Comentario</Text>
                    <TextInput 
                        style={[styles.input,styles.comentariosInput]}
                        placeholder='Agregar un comentario'
                        placeholderTextColor={"#666"}
                        multiline={true}
                        value={comentario}
                        onChangeText={setComentario}
                    />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Dosis</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Valor de dosis suministrada'
                    placeholderTextColor={"#666"}
                    keyboardType='number-pad'
                    value={dosis}
                    onChangeText={setDosis}
                    maxLength={3}
                />
            </View>

            <Pressable style={styles.btnRegistrar} onPress={() => setModalVisible(false)}>
                <Text style={styles.btnRegistrarText}>Registrar</Text>
            </Pressable>

        </ScrollView>
    </SafeAreaView>
    </Modal>
    </SafeAreaView>
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
    comentariosInput:{
        height:80
    },  
    btnRegistrar: {
        marginTop: '50',
        backgroundColor: '#e32f45',
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
        backgroundColor: '#e32f45',
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
    },
    fechaContenedor:{
        backgroundColor:'#ffffff',
        borderRadius: 10
    },
      item: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 8,
      },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15,
    },
    heading:{
        fontSize:14,
        fontWeight:'bold',
        color:'#fff'
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:8,
        marginHorizontal:2,
        elevation:1,
        borderRadius:3,
        borderColor:'#fff',
        padding:10,
        backgroundColor:'#fff'
    },
    cell:{
        fontSize: 12,
        textAlign: 'left',
        flex: 1,
        color:'black',
        fontWeight:'bold'
    }
})

export default Registro

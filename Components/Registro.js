import React, { useEffect, useState,useRef  } from 'react'
import{ Alert,Animated ,Button,Modal, Text, StyleSheet, SafeAreaView, TextInput, View, ScrollView, Pressable} from 'react-native'
import DatePicker from 'react-native-date-picker'
import { useNavigation } from '@react-navigation/native'
import SQLite from 'react-native-sqlite-storage';
import SwipeableFlatList from 'rn-gesture-swipeable-flatlist';

const Registro = ({ modalVisible,setModalVisible }) => {
    const [valor,setGlucosa] = useState('')
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

    const navigation = useNavigation();

    const onPressInicio = () => {
        navigation.navigate('Inicio');
        setModalVisible(!modalVisible)
    };

    const [data, setData] = useState('')
      useEffect(() => {
        const db = SQLite.openDatabase({ name: 'glucosaDB.db', location: 'default' });
        db.transaction((tx) => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS glucosa (id INTEGER PRIMARY KEY AUTOINCREMENT, valor TEXT, fecha TEXT, hora TEXT, comentario TEXT, dosis TEXT)'
            );
          });
        obtenerRegistros()
      }, [])

      const obtenerRegistros = () => {
        const db = SQLite.openDatabase({ name: 'glucosaDB.db', location: 'default' });
    
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM glucosa',
            [],
            (tx, results) => {
              const len = results.rows.length;
              const registros = [];
              for (let i = 0; i < len; i++) {
                const row = results.rows.item(i);
                registros.push(row);
              }
              setData(registros);
            }
          );
        });
      };
      
      const guardarRegistro = () => {
        const db = SQLite.openDatabase({ name: 'glucosaDB.db', location: 'default' });
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO glucosa (valor, fecha, hora, comentario, dosis) VALUES (?, ?, ?, ?, ?)',
              [valor, Intl.DateTimeFormat('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).format(fecha), hora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), comentario, dosis],
              (tx, results) => {
                if (results.rowsAffected > 0) {
                  console.log('Registro insertado con éxito');
                  // Actualizar la lista de registros después de insertar
                  obtenerRegistros();
                  // Cerrar el modal después de insertar el registro
                  setModalVisible(false)
                } else {
                  console.log('Error al insertar el registro');
                }
              }
            );
          });
      };

       // Función para eliminar un registro por ID
  const eliminarRegistro = (id) => {
    const db = SQLite.openDatabase({ name: 'glucosaDB.db', location: 'default' });
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM glucosa WHERE id = ?',
        [id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Registro eliminado con éxito');
            // Actualizar la lista después de eliminar
            obtenerRegistros();
          } else {
            console.log('Error al eliminar el registro');
            console.log('DELETE FROM glucosa WHERE id = ?', id);
            Alert.alert('Error', 'No se pudo eliminar el registro.');
          }
        }
      );
    });
  };

  const actualizarRegistro = () => {
    const db = SQLite.openDatabase({ name: 'glucosaDB.db', location: 'default' });
    
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE glucosa SET valor = ?, fecha = ?,hora = ?, comentario = ?, dosis = ? WHERE id = ?',
        [valor, Intl.DateTimeFormat('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(fecha),  hora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), comentario, dosis],
        (tx,results) => {
          if (results.rowsAffected > 0) {
            console.log('Registro actualizado con éxito');
            obtenerRegistros();
            setModalVisible(false);
            toggleModificado();
          } else {
            console.log('Error al actualizar el registro');
          }
        }
      );
    })
  }
 
      const renderItem = ({ item }) => (
        <View style={styles.row}>
          <Text style={styles.cell}>       {item.valor}</Text>
          <Text style={styles.cell}>{item.fecha}</Text>
          <Text style={styles.cell}>   {item.hora}</Text>
          <Text style={styles.cell}>{item.comentario}</Text>
          <Text style={[styles.cell]}>                 {item.dosis}</Text>
        </View>
      );
      
      const renderLeftActions = (item) => {
        const trans = new Animated.Value(0);
        return (
          <Pressable
            onPress={() => {console.log('modificar')}}
            style={styles.leftAction}
          >
            <Animated.Text
              style={[
                styles.actionText,
                {
                  transform: [
                    {
                      translateX: trans.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-100, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              Modificar
            </Animated.Text>
          </Pressable>
        );
      };
      
      const trans = new Animated.Value(0);
      const renderRightActions = (item) => {
        return (
          <Pressable
            onPress={() => {
              // Muestra un cuadro de diálogo de confirmación antes de eliminar
              Alert.alert(
                'Eliminar Registro',
                '¿Estás seguro de que deseas eliminar este registro?',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Eliminar',
                    onPress: () => {
                      eliminarRegistro(item.id);
                    },
                    style: 'destructive',
                  },
                ]
              );
            }}
            style={styles.rightAction}
          >
            <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 100],
              }) }],
            },
          ]}
        >
          Eliminar
        </Animated.Text>
          </Pressable>
        );
      };
      

  return (
    <SafeAreaView style={{backgroundColor:'#000080',
    flex:0.88,}}>
        <View style={styles.header}>
            <Text style={styles.heading}>Glucosa</Text>
            <Text style={styles.heading}>Fecha</Text>
            <Text style={styles.heading}>Hora</Text>
            <Text style={styles.heading}>Comentario</Text>
            <Text style={styles.heading}>Dosis</Text>
        </View>
        
        <SwipeableFlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        style={{ zIndex: 1 }}
      />
    <Modal animationType='slide' visible={modalVisible}>
        <ScrollView style={styles.contenido} keyboardShouldPersistTaps="always">
            
            <Text style={styles.titulo}>Glucosa{' '}
                <Text style={styles.tituloBold}>Diaria</Text>
            </Text>

            <Pressable style={styles.btnCancelar} onPress={onPressInicio}>
                <Text style={styles.btnCancelarText}>Cancelar</Text>
            </Pressable>

            <View style={styles.campo}>
                <Text style={styles.label}>Glucosa</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Valor de glucosa'
                    placeholderTextColor={"#666"}
                    keyboardType='number-pad'
                    value={valor}
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

            <Pressable style={styles.btnRegistrar} onPress={() => guardarRegistro()}>
                <Text style={styles.btnRegistrarText}>REGISTRAR</Text>
            </Pressable>

        </ScrollView>
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
    },
    leftAction: {
      backgroundColor: '#32a852',
      justifyContent: 'center',
      flex: 1,
      alignItems: 'flex-end',
      paddingRight: 20,
    },
    rightAction: {
      backgroundColor: '#ff4444',
      justifyContent: 'center',
      flex: 1,
      alignItems: 'flex-start',
      paddingLeft: 20,
    },
    actionText: {
      color: '#fff',
      fontWeight: '600',
      padding: 10,
    }
})

export default Registro

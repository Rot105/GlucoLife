import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking, ScrollView } from 'react-native';

const InformationScreen = () => {
  const enlaces = [
    { url: 'https://www.diabetes.org/', titulo: 'Asociación Americana de Diabetes', imagen: require('../assets/imagenes/asociacion-americana.jpg') },
    { url: 'https://www.who.int/es/news-room/fact-sheets/detail/diabetes', titulo: 'Organización Mundial de la Salud - Diabetes', imagen: require('../assets/imagenes/oms-diabetes.jpg')},
    { url: 'https://medlineplus.gov/spanish/diabetes.html', titulo: 'MedlinePlus - Información sobre la Diabetes y tratamientos', imagen: require('../assets/imagenes/medline-diabetes.jpeg')},
  ];

  const abrirEnlace = async (url) => {
    const urlValida = await Linking.canOpenURL(url);

    if (urlValida) {
      await Linking.openURL(url);
    } else {
      console.error(`URL no válida: ${url}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contenedorScroll}>
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Más sobre la <Text styles={styles.tituloBold}>Diabetes</Text>
      </Text>
      {enlaces.map((enlace, index) => (
        <TouchableOpacity
          key={index}
          style={styles.enlaceContenedor}
          onPress={() => abrirEnlace(enlace.url)}
        >
          <Image source={enlace.imagen} style={styles.imagenEnlace} />
          <Text style={styles.enlaceTexto}>{enlace.titulo}</Text>
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

contenedorScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    },
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor:'#000080',
  },
  titulo: {
    fontSize: 25,
    fontWeight:'600',
    textAlign:'center',
    marginTop:30,
    color:'#FFF',
    paddingBottom: 30,
  },
  tituloBold:{
    fontWeight:'900',
    color:'#ff0000'
},
  enlaceContenedor: {
    marginBottom: 70,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#e32f45',
    borderRadius: 10,
    alignItems: 'center',
  },
  imagenEnlace: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
  enlaceTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InformationScreen;
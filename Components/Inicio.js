import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Inicio = ({ nivelGlucosa }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nivel de Glucosa</Text>
      <Svg height="100" width="100">
        <SvgText
          x="50%"
          y="50%"
          fontSize="20"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {nivelGlucosa}
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default Inicio;
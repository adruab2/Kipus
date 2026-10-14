import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function BotonAccion({
  titulo,
  onPress,
  variante = 'primary',
  cargando = false,
  deshabilitado = false,
  estiloPersonalizado,
  estiloTexto
}) {
  const obtenerEstiloBoton = () => {
    switch (variante) {
      case 'secondary':
        return estilos.botonSecundario;
      case 'danger':
        return estilos.botonPeligro;
      case 'outline':
        return estilos.botonOutline;
      case 'admin':
        return estilos.botonAdmin;
      case 'success':
        return estilos.botonExito;
      case 'primary':
      default:
        return estilos.botonPrimario;
    }
  };

  const obtenerEstiloTexto = () => {
    switch (variante) {
      case 'secondary':
        return estilos.textoSecundario;
      case 'danger':
        return estilos.textoPeligro;
      case 'outline':
        return estilos.textoOutline;
      case 'admin':
      case 'success':
      case 'primary':
      default:
        return estilos.textoBlanco;
    }
  };

  return (
    <TouchableOpacity
      style={[
        estilos.base,
        obtenerEstiloBoton(),
        deshabilitado && estilos.deshabilitado,
        estiloPersonalizado
      ]}
      onPress={onPress}
      disabled={deshabilitado || cargando}
      activeOpacity={0.8}
    >
      {cargando ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={[estilos.textoBase, obtenerEstiloTexto(), estiloTexto]}>
          {titulo}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  deshabilitado: {
    opacity: 0.6,
  },
  textoBase: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  botonPrimario: {
    backgroundColor: '#2C8C99',
  },
  botonSecundario: {
    backgroundColor: '#F4F6F8',
    borderWidth: 1,
    borderColor: '#D5DBE1',
  },
  botonPeligro: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  botonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2C8C99',
  },
  botonAdmin: {
    backgroundColor: '#1A1A1A',
  },
  botonExito: {
    backgroundColor: '#1E8E3E',
  },
  textoBlanco: {
    color: '#FFFFFF',
  },
  textoSecundario: {
    color: '#1A1A1A',
  },
  textoPeligro: {
    color: '#C62828',
  },
  textoOutline: {
    color: '#2C8C99',
  },
});

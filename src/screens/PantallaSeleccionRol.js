import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EventoContext } from '../context/EventoContext';

export default function PantallaSeleccionRol({ navigation }) {
  const { cambiarRol } = useContext(EventoContext);

  const seleccionarYNavegar = (rolElegido) => {
    // Aplicamos la asignación de rol en el estado global
    cambiarRol(rolElegido);
    // Aplicamos la redirección hacia la pantalla principal
    navigation.navigate('Inicio');
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.marca}>KIPUS</Text>
      <Text style={estilos.titulo}>Bienvenido al Sistema de Eventos</Text>
      <Text style={estilos.subtitulo}>Selecciona tu tipo de acceso para continuar:</Text>

      {/* Aplicamos selección de rol como Usuario */}
      <TouchableOpacity
        style={[estilos.tarjetaRol, estilos.tarjetaUsuario]}
        onPress={() => seleccionarYNavegar('usuario')}
        activeOpacity={0.85}
      >
        <Text style={estilos.iconoRol}>👤</Text>
        <Text style={estilos.textoRol}>Ingresar como Usuario</Text>
        <Text style={estilos.descripcionRol}>Podrás ver eventos e inscribirte a talleres.</Text>
      </TouchableOpacity>

      {/* Aplicamos selección de rol como Administrador */}
      <TouchableOpacity
        style={[estilos.tarjetaRol, estilos.tarjetaAdmin]}
        onPress={() => seleccionarYNavegar('admin')}
        activeOpacity={0.85}
      >
        <Text style={estilos.iconoRol}>🛠️</Text>
        <Text style={estilos.textoRol}>Ingresar como Administrador</Text>
        <Text style={estilos.descripcionRol}>Podrás registrar nuevos eventos y eliminar existentes.</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { 
    flex: 1, 
    padding: 24, 
    justifyContent: 'center', 
    backgroundColor: '#F5EFEB' 
  },
  marca: {
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    color: '#8B1E1E',
    letterSpacing: 4,
    marginBottom: 4,
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: '900', 
    textAlign: 'center', 
    marginBottom: 8, 
    color: '#1A1A1A',
    letterSpacing: 0.5,
  },
  subtitulo: { 
    fontSize: 14, 
    textAlign: 'center', 
    color: '#555555', 
    marginBottom: 32,
    fontWeight: '600'
  },
  tarjetaRol: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  tarjetaUsuario: { 
    borderColor: '#2C8C99',
  },
  tarjetaAdmin: { 
    borderColor: '#8B1E1E',
  },
  iconoRol: { 
    fontSize: 36, 
    marginBottom: 8 
  },
  textoRol: { 
    fontSize: 18, 
    fontWeight: '900', 
    color: '#1A1A1A', 
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  descripcionRol: { 
    fontSize: 13, 
    color: '#666666', 
    textAlign: 'center',
    lineHeight: 18,
  },
});
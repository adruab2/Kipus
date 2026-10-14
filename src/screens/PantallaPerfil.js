import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { EventoContext } from '../context/EventoContext';
import BotonAccion from '../components/BotonAccion';

export default function PantallaPerfil() {
  const { usuarioActual, setUsuarioActual, eventos, usuarios } = useContext(EventoContext);

  if (!usuarioActual) return null;

  const esAdmin = usuarioActual.rol === 'admin';
  const totalInscripciones = usuarioActual.inscripciones?.length || 0;

  const confirmarCerrarSesion = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas salir de tu cuenta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: () => setUsuarioActual(null),
        },
      ]
    );
  };

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.tarjetaUsuario}>
        <View style={estilos.avatarContenedor}>
          <Text style={estilos.avatarTexto}>
            {usuarioActual.nombre ? usuarioActual.nombre.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>

        <Text style={estilos.nombre}>{usuarioActual.nombre}</Text>
        <Text style={estilos.correo}>📧 {usuarioActual.correo}</Text>

        <View style={[estilos.badgeRol, esAdmin ? estilos.badgeAdmin : estilos.badgeUsuario]}>
          <Text style={[estilos.textoRol, esAdmin ? estilos.textoRolAdmin : estilos.textoRolUsuario]}>
            ROL: {usuarioActual.rol.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={estilos.tarjetaMetricas}>
        <Text style={estilos.tituloSeccion}>Resumen de Actividad</Text>
        
        <View style={estilos.filaMetricas}>
          <View style={estilos.cajaMetrica}>
            <Text style={estilos.numeroMetrica}>{eventos.length}</Text>
            <Text style={estilos.etiquetaMetrica}>Talleres Activos</Text>
          </View>

          <View style={estilos.cajaMetrica}>
            <Text style={estilos.numeroMetrica}>
              {esAdmin ? usuarios.length : totalInscripciones}
            </Text>
            <Text style={estilos.etiquetaMetrica}>
              {esAdmin ? 'Usuarios Registrados' : 'Mis Inscripciones'}
            </Text>
          </View>
        </View>
      </View>

      <View style={estilos.seccionCerrar}>
        <BotonAccion
          titulo="Cerrar Sesión"
          variante="danger"
          onPress={confirmarCerrarSesion}
        />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F5EFEB',
    padding: 16,
  },
  tarjetaUsuario: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatarContenedor: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#8B1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarTexto: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  correo: {
    fontSize: 14,
    color: '#5F6B7A',
    marginBottom: 12,
  },
  badgeRol: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  badgeAdmin: {
    backgroundColor: '#FEE2E2',
  },
  badgeUsuario: {
    backgroundColor: '#E0F2FE',
  },
  textoRol: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  textoRolAdmin: {
    color: '#8B1E1E',
  },
  textoRolUsuario: {
    color: '#0369A1',
  },
  tarjetaMetricas: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tituloSeccion: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  filaMetricas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cajaMetrica: {
    alignItems: 'center',
    flex: 1,
  },
  numeroMetrica: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C8C99',
  },
  etiquetaMetrica: {
    fontSize: 13,
    color: '#5F6B7A',
    marginTop: 4,
    textAlign: 'center',
  },
  seccionCerrar: {
    marginTop: 'auto',
    marginBottom: 12,
  },
});

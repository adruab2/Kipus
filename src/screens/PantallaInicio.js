import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { EventoContext } from '../context/EventoContext';
import TarjetaEvento from '../components/TarjetaEvento';
import BotonAccion from '../components/BotonAccion';

export default function PantallaInicio({ navigation }) {
  const { eventos, eliminarEvento, alternarInscripcion, usuarioActual } = useContext(EventoContext);
  
  const [filtro, setFiltro] = useState('todos');
  const [modalVisible, setModalVisible] = useState(false);
  const [eventoAEliminar, setEventoAEliminar] = useState(null);

  if (!usuarioActual) return null;
  const rol = usuarioActual.rol; 

  const eventosConInscripcion = eventos.map(evento => ({
    ...evento,
    inscrito: usuarioActual.inscripciones?.includes(evento.id) || false
  }));

  const eventosFiltrados = eventosConInscripcion.filter((evento) => {
    if (rol === 'usuario' && filtro === 'inscritos') {
      return evento.inscrito;
    }
    return true;
  });

  const confirmarEliminacion = (id) => {
    setEventoAEliminar(id);
    setModalVisible(true);
  };

  const ejecutarEliminacion = () => {
    if (eventoAEliminar) {
      eliminarEvento(eventoAEliminar);
    }
    setModalVisible(false);
    setEventoAEliminar(null);
  };

  return (
    <View style={estilos.contenedor}>
      {rol === 'admin' ? (
        <View style={estilos.barraAdmin}>
          <BotonAccion
            titulo="+ Registrar Nuevo Taller"
            variante="primary"
            onPress={() => navigation.navigate('CrearEvento')}
            estiloPersonalizado={{ marginBottom: 10 }}
          />
        </View>
      ) : (
        <View style={estilos.contenedorFiltros}>
          <TouchableOpacity
            style={[estilos.filtro, filtro === 'todos' && estilos.filtroActivo]}
            onPress={() => setFiltro('todos')}
          >
            <Text style={[estilos.textoFiltro, filtro === 'todos' && estilos.textoFiltroActivo]}>
              Todos los Talleres
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.filtro, filtro === 'inscritos' && estilos.filtroActivo]}
            onPress={() => setFiltro('inscritos')}
          >
            <Text style={[estilos.textoFiltro, filtro === 'inscritos' && estilos.textoFiltroActivo]}>
              Mis Inscripciones
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={eventosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarjetaEvento
            evento={item}
            rol={rol}
            onPressDetalle={() => navigation.navigate('DetalleEvento', { id: item.id })}
            onPressInscribir={() => alternarInscripcion(item.id)}
            onPressEditar={() => navigation.navigate('EditarEvento', { id: item.id })}
            onPressEliminar={() => confirmarEliminacion(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={estilos.textoVacio}>No hay talleres disponibles en este momento.</Text>
        }
      />

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={estilos.fondoModal}>
          <View style={estilos.cajaModal}>
            <Text style={estilos.tituloModal}>¿Eliminar Evento?</Text>
            <Text style={estilos.textoModal}>Esta acción eliminará el taller permanentemente.</Text>
            <View style={estilos.botonesModal}>
              <BotonAccion
                titulo="Cancelar"
                variante="secondary"
                onPress={() => setModalVisible(false)}
                estiloPersonalizado={{ marginRight: 10 }}
              />
              <BotonAccion
                titulo="Eliminar"
                variante="danger"
                onPress={ejecutarEliminacion}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F5EFEB',
    padding: 16,
  },
  barraAdmin: {
    marginBottom: 8,
  },
  contenedorFiltros: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2C8C99',
  },
  filtro: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  filtroActivo: {
    backgroundColor: '#2C8C99',
  },
  textoFiltro: {
    color: '#2C8C99',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textoFiltroActivo: {
    color: '#FFFFFF',
  },
  textoVacio: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#5F6B7A',
  },
  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cajaModal: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 12,
    width: '85%',
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  textoModal: {
    fontSize: 15,
    color: '#5F6B7A',
    marginBottom: 20,
  },
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

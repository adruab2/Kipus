import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { EventoContext } from '../context/EventoContext';

export default function PantallaInicio({ navigation }) {
  const { eventos, eliminarEvento, alternarInscripcion, usuarioActual, setUsuarioActual } = useContext(EventoContext);
  
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

  const cerrarSesion = () => {
    setUsuarioActual(null);
  };

  const renderItem = ({ item }) => (
    <View style={estilos.tarjetaEvento}>
      <Image 
        source={{ uri: item.imagen || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800' }} 
        style={estilos.imagenTarjeta} 
      />
      
      <View style={estilos.cuerpoTarjeta}>
        <Text style={estilos.tituloEvento}>{item.titulo}</Text>
        <Text style={estilos.detalleEvento}>📅 {item.fecha} | 🏷️ {item.categoria}</Text>

        {rol === 'admin' ? (
          <View style={estilos.botonesAdmin}>
            <TouchableOpacity 
              style={estilos.botonEditar} 
              onPress={() => navigation.navigate('EditarEvento', { id: item.id })}
            >
              <Text style={estilos.textoBotonSecundario}>✏️ Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={estilos.botonEliminar} 
              onPress={() => confirmarEliminacion(item.id)}
            >
              <Text style={estilos.textoBotonEliminar}>🗑️ Eliminar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={estilos.botonesUsuario}>
            <TouchableOpacity 
              style={[estilos.botonInscribir, item.inscrito && estilos.botonInscrito]}
              onPress={() => alternarInscripcion(item.id)}
            >
              <Text style={estilos.textoBotonPrincipal}>
                {item.inscrito ? '✅ Inscrito' : '📝 Inscribirse'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={estilos.botonDetalles} 
              onPress={() => navigation.navigate('DetalleEvento', { id: item.id })}
            >
              <Text style={estilos.textoBotonSecundario}>👁️ Ver más</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.barraSuperior}>
        <Text style={estilos.bienvenida}>¡Hola, {usuarioActual.nombre}!</Text>
        <TouchableOpacity onPress={cerrarSesion}>
          <Text style={estilos.textoCerrarSesion}>🚪 Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {rol === 'admin' ? (
        <View style={{ marginBottom: 15 }}>
          <TouchableOpacity style={estilos.botonAgregar} onPress={() => navigation.navigate('CrearEvento')}>
            <Text style={estilos.textoBotonPrincipal}>+ Registrar Nuevo Evento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={estilos.botonUsuariosAdmin} onPress={() => navigation.navigate('GestionUsuarios')}>
            <Text style={estilos.textoBotonUsuarios}>👥 Gestionar Cuentas de Usuarios</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={estilos.contenedorFiltros}>
          <TouchableOpacity style={[estilos.filtro, filtro === 'todos' && estilos.filtroActivo]} onPress={() => setFiltro('todos')}>
            <Text style={[estilos.textoFiltro, filtro === 'todos' && estilos.textoFiltroActivo]}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[estilos.filtro, filtro === 'inscritos' && estilos.filtroActivo]} onPress={() => setFiltro('inscritos')}>
            <Text style={[estilos.textoFiltro, filtro === 'inscritos' && estilos.textoFiltroActivo]}>Mis Inscripciones</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={eventosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={estilos.textoVacio}>No hay eventos para mostrar.</Text>}
      />

      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={estilos.fondoModal}>
          <View style={estilos.cajaModal}>
            <Text style={estilos.tituloModal}>¿Eliminar Evento?</Text>
            <Text style={estilos.textoModal}>Esta acción no se puede deshacer.</Text>
            <View style={estilos.botonesModal}>
              <TouchableOpacity style={estilos.botonCancelarModal} onPress={() => setModalVisible(false)}>
                <Text style={estilos.textoCancelarModal}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.botonEliminarModal} onPress={ejecutarEliminacion}>
                <Text style={estilos.textoEliminarModal}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#F5EFEB', padding: 15 },
  barraSuperior: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#D5DBE1' },
  bienvenida: { fontSize: 18, fontWeight: 'bold', color: '#2C8C99' },
  textoCerrarSesion: { fontSize: 16, color: '#8B1E1E', fontWeight: 'bold' },
  botonAgregar: { backgroundColor: '#2C8C99', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  botonUsuariosAdmin: { backgroundColor: '#1A1A1A', padding: 12, borderRadius: 8, alignItems: 'center' },
  textoBotonPrincipal: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  textoBotonUsuarios: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  contenedorFiltros: { flexDirection: 'row', marginBottom: 15 },
  filtro: { flex: 1, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#2C8C99', backgroundColor: 'transparent' },
  filtroActivo: { backgroundColor: '#2C8C99' },
  textoFiltro: { color: '#2C8C99', fontWeight: 'bold' },
  textoFiltroActivo: { color: '#FFFFFF' },
  tarjetaEvento: { backgroundColor: '#FFFFFF', borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#D5DBE1', overflow: 'hidden' },
  imagenTarjeta: { width: '100%', height: 140, resizeMode: 'cover' },
  cuerpoTarjeta: { padding: 15 },
  tituloEvento: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 5 },
  detalleEvento: { fontSize: 14, color: '#5F6B7A', marginBottom: 15 },
  botonesAdmin: { flexDirection: 'row', justifyContent: 'space-between' },
  botonEditar: { flex: 1, backgroundColor: '#F4F6F8', padding: 10, borderRadius: 5, alignItems: 'center', marginRight: 5, borderWidth: 1, borderColor: '#D5DBE1' },
  botonEliminar: { flex: 1, backgroundColor: '#FFF5F5', padding: 10, borderRadius: 5, alignItems: 'center', marginLeft: 5, borderWidth: 1, borderColor: '#FF6B6B' },
  botonesUsuario: { flexDirection: 'row', justifyContent: 'space-between' },
  botonInscribir: { flex: 1, backgroundColor: '#2C8C99', padding: 10, borderRadius: 5, alignItems: 'center', marginRight: 5 },
  botonInscrito: { backgroundColor: '#1E8E3E' },
  botonDetalles: { flex: 1, backgroundColor: '#F4F6F8', padding: 10, borderRadius: 5, alignItems: 'center', marginLeft: 5, borderWidth: 1, borderColor: '#D5DBE1' },
  textoBotonSecundario: { color: '#1A1A1A', fontWeight: 'bold' },
  textoBotonEliminar: { color: '#C62828', fontWeight: 'bold' },
  textoVacio: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#5F6B7A' },
  fondoModal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  cajaModal: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, width: '80%' },
  tituloModal: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 10 },
  textoModal: { fontSize: 16, color: '#5F6B7A', marginBottom: 20 },
  botonesModal: { flexDirection: 'row', justifyContent: 'flex-end' },
  botonCancelarModal: { padding: 10, marginRight: 10 },
  textoCancelarModal: { fontSize: 16, color: '#5F6B7A', fontWeight: 'bold' },
  botonEliminarModal: { backgroundColor: '#C62828', padding: 10, borderRadius: 5 },
  textoEliminarModal: { fontSize: 16, color: '#FFF', fontWeight: 'bold' }
});
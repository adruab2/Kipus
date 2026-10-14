import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput, Alert, ScrollView } from 'react-native';
import { EventoContext } from '../context/EventoContext';

export default function PantallaGestionUsuarios() {
  const { usuarios, registrarUsuario, editarUsuarioAdmin, eliminarUsuarioAdmin, usuarioActual } = useContext(EventoContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('usuario');

  const abrirModalCrear = () => {
    setModoEdicion(false);
    setNombre('');
    setCorreo('');
    setPassword('');
    setRol('usuario');
    setModalVisible(true);
  };

  const abrirModalEditar = (usuario) => {
    setModoEdicion(true);
    setIdEditando(usuario.id);
    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setPassword(usuario.password);
    setRol(usuario.rol);
    setModalVisible(true);
  };

  const guardarUsuario = () => {
    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (modoEdicion) {
      editarUsuarioAdmin(idEditando, {
        nombre: nombre.trim(),
        correo: correo.trim().toLowerCase(),
        password: password.trim(),
        rol
      });
      Alert.alert('Éxito', 'Usuario actualizado correctamente.');
    } else {
      const existe = usuarios.find(u => u.correo.toLowerCase() === correo.trim().toLowerCase());
      if (existe) {
        Alert.alert('Error', 'Ya existe un usuario con este correo.');
        return;
      }
      registrarUsuario({
        id: Date.now().toString(),
        nombre: nombre.trim(),
        correo: correo.trim().toLowerCase(),
        password: password.trim(),
        rol
      });
      Alert.alert('Éxito', 'Usuario creado correctamente.');
    }

    setModalVisible(false);
  };

  const confirmarEliminacion = (id, correoUsuario) => {
    if (correoUsuario === 'admin@kipus.com') {
      Alert.alert('Acción denegada', 'No puedes eliminar al administrador principal.');
      return;
    }
    if (usuarioActual.id === id) {
      Alert.alert('Acción denegada', 'No puedes eliminar tu propia cuenta mientras estás logueado.');
      return;
    }

    Alert.alert(
      '¿Eliminar Usuario?',
      'Esta acción eliminará la cuenta del sistema.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => eliminarUsuarioAdmin(id) }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={estilos.tarjetaUsuario}>
      <View style={{ flex: 1 }}>
        <Text style={estilos.nombreUsuario}>{item.nombre}</Text>
        <Text style={estilos.correoUsuario}>📧 {item.correo}</Text>
        <Text style={estilos.rolUsuario}>Rol: <Text style={{ fontWeight: 'bold', color: item.rol === 'admin' ? '#8B1E1E' : '#2C8C99' }}>{item.rol.toUpperCase()}</Text></Text>
        <Text style={estilos.inscritosUsuario}>Inscripciones activas: {item.inscripciones?.length || 0}</Text>
      </View>

      <View style={estilos.botonesAccion}>
        <TouchableOpacity style={estilos.botonEditar} onPress={() => abrirModalEditar(item)}>
          <Text style={estilos.textoBotonSecundario}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botonEliminar} onPress={() => confirmarEliminacion(item.id, item.correo)}>
          <Text style={estilos.textoBotonEliminar}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={estilos.contenedor}>
      <TouchableOpacity style={estilos.botonAgregar} onPress={abrirModalCrear}>
        <Text style={estilos.textoBotonPrincipal}>+ Registrar Nuevo Usuario</Text>
      </TouchableOpacity>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={estilos.fondoModal}>
          <View style={estilos.cajaModal}>
            <ScrollView>
              <Text style={estilos.tituloModal}>{modoEdicion ? 'Editar Usuario' : 'Nuevo Usuario'}</Text>

              <Text style={estilos.etiqueta}>Nombre completo:</Text>
              <TextInput style={estilos.input} placeholder="Ej: Juan Pérez" placeholderTextColor="#999" value={nombre} onChangeText={setNombre} />

              <Text style={estilos.etiqueta}>Correo electrónico:</Text>
              <TextInput style={estilos.input} placeholder="Ej: juan@correo.com" placeholderTextColor="#999" keyboardType="email-address" autoCapitalize="none" value={correo} onChangeText={setCorreo} />

              <Text style={estilos.etiqueta}>Contraseña:</Text>
              <TextInput style={estilos.input} placeholder="Contraseña" placeholderTextColor="#999" secureTextEntry value={password} onChangeText={setPassword} />

              <Text style={estilos.etiqueta}>Rol en el sistema:</Text>
              <View style={estilos.contenedorRoles}>
                <TouchableOpacity 
                  style={[estilos.opcionRol, rol === 'usuario' && estilos.rolSeleccionado]} 
                  onPress={() => setRol('usuario')}
                >
                  <Text style={[estilos.textoRol, rol === 'usuario' && estilos.textoRolSeleccionado]}>Usuario</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[estilos.opcionRol, rol === 'admin' && estilos.rolSeleccionado]} 
                  onPress={() => setRol('admin')}
                >
                  <Text style={[estilos.textoRol, rol === 'admin' && estilos.textoRolSeleccionado]}>Admin</Text>
                </TouchableOpacity>
              </View>

              <View style={estilos.botonesModalAccion}>
                <TouchableOpacity style={stylesBoton.cancelar} onPress={() => setModalVisible(false)}>
                  <Text style={{ color: '#5F6B7A', fontWeight: 'bold' }}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesBoton.guardar} onPress={guardarUsuario}>
                  <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const stylesBoton = StyleSheet.create({
  cancelar: { padding: 12, marginRight: 10, justifyContent: 'center' },
  guardar: { backgroundColor: '#2C8C99', padding: 12, borderRadius: 8, justifyContent: 'center', paddingHorizontal: 20 }
});

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#F5EFEB', padding: 15 },
  botonAgregar: { backgroundColor: '#2C8C99', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  textoBotonPrincipal: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  tarjetaUsuario: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#D5DBE1', flexDirection: 'row', alignItems: 'center' },
  nombreUsuario: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 3 },
  correoUsuario: { fontSize: 13, color: '#5F6B7A', marginBottom: 2 },
  rolUsuario: { fontSize: 13, color: '#1A1A1A', marginBottom: 2 },
  inscritosUsuario: { fontSize: 12, color: '#888' },
  botonesAccion: { flexDirection: 'row' },
  botonEditar: { backgroundColor: '#F4F6F8', padding: 10, borderRadius: 5, marginRight: 8, borderWidth: 1, borderColor: '#D5DBE1' },
  botonEliminar: { backgroundColor: '#FFF5F5', padding: 10, borderRadius: 5, borderWidth: 1, borderColor: '#FF6B6B' },
  textoBotonSecundario: { fontSize: 14 },
  textoBotonEliminar: { fontSize: 14 },
  fondoModal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  cajaModal: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, width: '85%', maxHeight: '80%' },
  tituloModal: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 15 },
  etiqueta: { fontSize: 13, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#D5DBE1', borderRadius: 8, padding: 10, marginBottom: 15, fontSize: 14, backgroundColor: '#FAFAFA', color: '#1A1A1A' },
  contenedorRoles: { flexDirection: 'row', marginBottom: 20 },
  opcionRol: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#2C8C99', alignItems: 'center', borderRadius: 6, marginRight: 5 },
  rolSeleccionado: { backgroundColor: '#2C8C99' },
  textoRol: { color: '#2C8C99', fontWeight: 'bold' },
  textoRolSeleccionado: { color: '#FFF' },
  botonesModalAccion: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }
});

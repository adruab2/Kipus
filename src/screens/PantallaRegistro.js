import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { EventoContext } from '../context/EventoContext';
import BotonAccion from '../components/BotonAccion';

export default function PantallaRegistro({ navigation }) {
  const { usuarios, registrarUsuario } = useContext(EventoContext);
  
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarRegistro = () => {
    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const existe = usuarios.find(u => u.correo.toLowerCase() === correo.trim().toLowerCase());
    if (existe) {
      setError('Este correo ya está registrado.');
      return;
    }

    const rolAsignado = correo.trim().toLowerCase() === 'admin@kipus.com' ? 'admin' : 'usuario';

    const nuevoUsuario = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      correo: correo.trim().toLowerCase(),
      password: password.trim(),
      rol: rolAsignado
    };

    registrarUsuario(nuevoUsuario);
    
    Alert.alert('¡Éxito!', 'Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesión.');
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear Cuenta en Kipus</Text>
      
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#999999"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#999999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <BotonAccion
          titulo="Registrarme"
          variante="admin"
          onPress={manejarRegistro}
          estiloPersonalizado={{ marginBottom: 12 }}
        />

        <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
          <Text style={styles.textoVolver}>¿Ya tienes cuenta? Iniciar Sesión.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5EFEB', justifyContent: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 25, textAlign: 'center' },
  formulario: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#D5DBE1', elevation: 2 },
  input: { borderWidth: 1, borderColor: '#D5DBE1', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 15, backgroundColor: '#FAFAFA', color: '#1A1A1A' },
  errorText: { color: '#8B1E1E', marginBottom: 15, textAlign: 'center', fontWeight: '600' },
  botonVolver: { padding: 10, alignItems: 'center' },
  textoVolver: { color: '#2C8C99', fontWeight: 'bold', fontSize: 14 }
});

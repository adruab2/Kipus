import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { EventoContext } from '../context/EventoContext';

export default function PantallaLogin({ navigation }) {
  const { usuarios, setUsuarioActual } = useContext(EventoContext);
  
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const manejarLogin = () => {
    if (!correo.trim() || !password.trim()) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    // Buscamos si existe un usuario con ese correo y contraseña exactos
    const usuarioEncontrado = usuarios.find(
      u => u.correo === correo.trim().toLowerCase() && u.password === password.trim()
    );

    if (usuarioEncontrado) {
      setError('');
      setUsuarioActual(usuarioEncontrado); // Guardamos quién inició sesión
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido a Kipus</Text>
      
      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.botonEntrar} onPress={manejarLogin}>
          <Text style={styles.textoBoton}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonRegistro} onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.textoRegistro}>¿No tienes cuenta? Regístrate aquí.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5EFEB', justifyContent: 'center' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: '#8B1E1E', marginBottom: 30, textAlign: 'center' },
  formulario: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#D5DBE1' },
  input: { borderWidth: 1, borderColor: '#D5DBE1', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  errorText: { color: '#8B1E1E', marginBottom: 15, textAlign: 'center', fontWeight: '600' },
  botonEntrar: { backgroundColor: '#2C8C99', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  textoBoton: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  botonRegistro: { padding: 15, alignItems: 'center' },
  textoRegistro: { color: '#8B1E1E', fontWeight: 'bold', fontSize: 15 }
});
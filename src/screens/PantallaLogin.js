import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { EventoContext } from '../context/EventoContext';
import BotonAccion from '../components/BotonAccion';

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

    const usuarioEncontrado = usuarios.find(
      u => u.correo === correo.trim().toLowerCase() && u.password === password.trim()
    );

    if (usuarioEncontrado) {
      setError('');
      setUsuarioActual(usuarioEncontrado);
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>KIPUS</Text>
      <Text style={styles.sublogo}>Gestión & Talleres Culturales</Text>
      <Text style={styles.titulo}>Iniciar Sesión</Text>
      
      <View style={styles.formulario}>
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
          titulo="Ingresar a la Plataforma"
          variante="primary"
          onPress={manejarLogin}
          estiloPersonalizado={{ marginBottom: 12 }}
        />

        <TouchableOpacity style={styles.botonRegistro} onPress={() => navigation.navigate('Registro')}>
          <Text style={styles.textoRegistro}>¿No tienes cuenta? Regístrate aquí.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5EFEB', justifyContent: 'center' },
  logo: { fontSize: 32, fontWeight: '900', color: '#8B1E1E', textAlign: 'center', letterSpacing: 3 },
  sublogo: { fontSize: 13, color: '#5F6B7A', textAlign: 'center', fontWeight: '600', marginBottom: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 20, textAlign: 'center' },
  formulario: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#D5DBE1', elevation: 2 },
  input: { borderWidth: 1, borderColor: '#D5DBE1', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 15, backgroundColor: '#FAFAFA', color: '#1A1A1A' },
  errorText: { color: '#8B1E1E', marginBottom: 15, textAlign: 'center', fontWeight: '600' },
  botonRegistro: { padding: 10, alignItems: 'center' },
  textoRegistro: { color: '#8B1E1E', fontWeight: 'bold', fontSize: 14 }
});

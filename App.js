import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { EventoProvider, EventoContext } from './src/context/EventoContext';

import PantallaLogin from './src/screens/PantallaLogin';
import PantallaRegistro from './src/screens/PantallaRegistro';
import PantallaInicio from './src/screens/PantallaInicio';
import PantallaCrearEvento from './src/screens/PantallaCrearEvento';
import PantallaEditarEvento from './src/screens/PantallaEditarEvento';
import PantallaDetalleEvento from './src/screens/PantallaDetalleEvento';
import PantallaGestionUsuarios from './src/screens/PantallaGestionUsuarios'; // <--- NUEVA PANTALLA

const Stack = createNativeStackNavigator();

function EnrutadorPrincipal() {
  const { usuarioActual, loaded } = useContext(EventoContext);

  if (!loaded) {
    return (
      <View style={styles.pantallaCarga}>
        <ActivityIndicator size="large" color="#8B1E1E" />
        <Text style={styles.textoCarga}>Cargando Kipus...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#8B1E1E' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {usuarioActual == null ? (
          <>
            <Stack.Screen name="Login" component={PantallaLogin} options={{ headerShown: false }} />
            <Stack.Screen name="Registro" component={PantallaRegistro} options={{ title: 'Registro de Usuario' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Inicio" component={PantallaInicio} options={{ title: 'Kipus | Panel Principal' }} />
            <Stack.Screen name="CrearEvento" component={PantallaCrearEvento} options={{ title: 'Nuevo Taller' }} />
            <Stack.Screen name="EditarEvento" component={PantallaEditarEvento} options={{ title: 'Editar Taller' }} />
            <Stack.Screen name="DetalleEvento" component={PantallaDetalleEvento} options={{ title: 'Detalles del Taller' }} />
            <Stack.Screen name="GestionUsuarios" component={PantallaGestionUsuarios} options={{ title: 'Gestión de Usuarios' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <EventoProvider>
      <EnrutadorPrincipal />
    </EventoProvider>
  );
}

const styles = StyleSheet.create({
  pantallaCarga: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5EFEB' },
  textoCarga: { marginTop: 15, color: '#1A1A1A', fontWeight: 'bold', fontSize: 16 }
});
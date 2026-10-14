import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { EventoProvider, EventoContext } from './src/context/EventoContext';

import PantallaLogin from './src/screens/PantallaLogin';
import PantallaRegistro from './src/screens/PantallaRegistro';
import PantallaInicio from './src/screens/PantallaInicio';
import PantallaCrearEvento from './src/screens/PantallaCrearEvento';
import PantallaEditarEvento from './src/screens/PantallaEditarEvento';
import PantallaDetalleEvento from './src/screens/PantallaDetalleEvento';
import PantallaGestionUsuarios from './src/screens/PantallaGestionUsuarios';
import PantallaInscripciones from './src/screens/PantallaInscripciones';
import PantallaPerfil from './src/screens/PantallaPerfil';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function NavegacionPrincipalTabs() {
  const { usuarioActual } = useContext(EventoContext);
  const esAdmin = usuarioActual?.rol === 'admin';

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#8B1E1E' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarActiveTintColor: '#8B1E1E',
        tabBarInactiveTintColor: '#5F6B7A',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
          marginBottom: 4,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          height: 70,
          paddingTop: 6,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="TabInicio"
        component={PantallaInicio}
        options={{
          title: 'Kipus | Talleres',
          tabBarLabel: 'Explorar',
          tabBarIcon: () => (
            <Text style={{ fontSize: 20 }}>🏛️</Text>
          ),
        }}
      />

      {esAdmin ? (
        <Tab.Screen
          name="TabGestion"
          component={PantallaGestionUsuarios}
          options={{
            title: 'Gestión de Usuarios',
            tabBarLabel: 'Usuarios',
            tabBarIcon: () => (
              <Text style={{ fontSize: 20 }}>👥</Text>
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="TabInscripciones"
          component={PantallaInscripciones}
          options={{
            title: 'Mis Inscripciones',
            tabBarLabel: 'Inscripciones',
            tabBarIcon: () => (
              <Text style={{ fontSize: 20 }}>📋</Text>
            ),
          }}
        />
      )}

      <Tab.Screen
        name="TabPerfil"
        component={PantallaPerfil}
        options={{
          title: 'Mi Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: () => (
            <Text style={{ fontSize: 20 }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

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
            <Stack.Screen
              name="Login"
              component={PantallaLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Registro"
              component={PantallaRegistro}
              options={{ title: 'Registro de Usuario' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Principal"
              component={NavegacionPrincipalTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CrearEvento"
              component={PantallaCrearEvento}
              options={{ title: 'Nuevo Taller' }}
            />
            <Stack.Screen
              name="EditarEvento"
              component={PantallaEditarEvento}
              options={{ title: 'Editar Taller' }}
            />
            <Stack.Screen
              name="DetalleEvento"
              component={PantallaDetalleEvento}
              options={{ title: 'Detalles del Taller' }}
            />
            <Stack.Screen
              name="GestionUsuarios"
              component={PantallaGestionUsuarios}
              options={{ title: 'Gestión de Usuarios' }}
            />
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
  pantallaCarga: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5EFEB',
  },
  textoCarga: {
    marginTop: 15,
    color: '#1A1A1A',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

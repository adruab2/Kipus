import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { EventoContext } from '../context/EventoContext';
import TarjetaEvento from '../components/TarjetaEvento';

export default function PantallaInscripciones({ navigation }) {
  const { eventos, usuarioActual, alternarInscripcion } = useContext(EventoContext);

  if (!usuarioActual) return null;

  const eventosInscritos = eventos
    .filter((e) => usuarioActual.inscripciones?.includes(e.id))
    .map((e) => ({ ...e, inscrito: true }));

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.encabezado}>
        <Text style={estilos.titulo}>Mis Inscripciones</Text>
        <Text style={estilos.subtitulo}>
          Talleres a los que estás registrado ({eventosInscritos.length})
        </Text>
      </View>

      <FlatList
        data={eventosInscritos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TarjetaEvento
            evento={item}
            rol={usuarioActual.rol}
            onPressDetalle={() => navigation.navigate('DetalleEvento', { id: item.id })}
            onPressInscribir={() => alternarInscripcion(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={estilos.cajaVacia}>
            <Text style={estilos.iconoVacio}>📋</Text>
            <Text style={estilos.textoVacio}>Aún no te has inscrito en ningún taller.</Text>
            <Text style={estilos.subtextoVacio}>
              Explora los talleres disponibles en la pestaña "Inicio" y únete al que más te interese.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F5EFEB',
    padding: 16,
  },
  encabezado: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D5DBE1',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitulo: {
    fontSize: 14,
    color: '#5F6B7A',
    marginTop: 4,
  },
  cajaVacia: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    marginTop: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconoVacio: {
    fontSize: 48,
    marginBottom: 12,
  },
  textoVacio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtextoVacio: {
    fontSize: 14,
    color: '#5F6B7A',
    textAlign: 'center',
    lineHeight: 20,
  },
});

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BotonAccion from './BotonAccion';

export default function TarjetaEvento({
  evento,
  rol,
  onPressDetalle,
  onPressInscribir,
  onPressEditar,
  onPressEliminar
}) {
  return (
    <View style={estilos.tarjeta}>
      <Image
        source={{ uri: evento.imagen || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800' }}
        style={estilos.imagen}
      />

      <View style={estilos.cuerpo}>
        <View style={estilos.filaEtiquetas}>
          <Text style={estilos.tagCategoria}>{evento.categoria || 'General'}</Text>
          <Text style={estilos.tagFecha}>📅 {evento.fecha}</Text>
        </View>

        <Text style={estilos.titulo}>{evento.titulo}</Text>

        {evento.acercaDe ? (
          <Text style={estilos.descripcion} numberOfLines={2}>
            {evento.acercaDe}
          </Text>
        ) : null}

        {rol === 'admin' ? (
          <View style={estilos.filaBotones}>
            <BotonAccion
              titulo="Editar"
              variante="secondary"
              onPress={onPressEditar}
              estiloPersonalizado={estilos.botonFlex}
            />
            <BotonAccion
              titulo="Eliminar"
              variante="danger"
              onPress={onPressEliminar}
              estiloPersonalizado={estilos.botonFlex}
            />
          </View>
        ) : (
          <View style={estilos.filaBotones}>
            <BotonAccion
              titulo={evento.inscrito ? 'Inscrito' : 'Inscribirse'}
              variante={evento.inscrito ? 'success' : 'primary'}
              onPress={onPressInscribir}
              estiloPersonalizado={estilos.botonFlex}
            />
            <BotonAccion
              titulo="Ver detalles"
              variante="secondary"
              onPress={onPressDetalle}
              estiloPersonalizado={estilos.botonFlex}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  imagen: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cuerpo: {
    padding: 16,
  },
  filaEtiquetas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagCategoria: {
    backgroundColor: '#E6F4FE',
    color: '#006699',
    fontSize: 12,
    fontWeight: '700',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    textTransform: 'uppercase',
  },
  tagFecha: {
    fontSize: 13,
    color: '#5F6B7A',
    fontWeight: '600',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  descripcion: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    marginBottom: 14,
  },
  filaBotones: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  botonFlex: {
    flex: 1,
  },
});

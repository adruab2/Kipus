import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { EventoContext } from '../context/EventoContext';
import BotonAccion from '../components/BotonAccion';

export default function PantallaDetalleEvento({ route, navigation }) {
  const { id } = route.params;
  const { eventos, alternarInscripcion, usuarioActual } = useContext(EventoContext);
  
  const eventoBase = eventos.find((e) => e.id === id);

  if (!eventoBase) {
    return (
      <View style={estilos.contenedorCentrado}>
        <Text style={estilos.textoError}>El taller no existe o fue eliminado.</Text>
        <BotonAccion
          titulo="Volver"
          variante="admin"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  const estaInscrito = usuarioActual?.inscripciones?.includes(eventoBase.id) || false;

  return (
    <View style={estilos.contenedorBase}>
      <ScrollView style={estilos.scrollContainer} contentContainerStyle={{ paddingBottom: 30 }}>
        
        <View style={estilos.contenedorImagenCabecera}>
          <Image 
            source={{ uri: eventoBase.imagen || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800' }} 
            style={estilos.imagenCabecera} 
          />
        </View>

        <View style={estilos.tarjetaPrincipal}>
          <View style={estilos.filaBadge}>
            <Text style={estilos.badgeCategoria}>{eventoBase.categoria}</Text>
            <Text style={estilos.textoFecha}>📅 {eventoBase.fecha}</Text>
          </View>

          <Text style={estilos.tituloEvento}>{eventoBase.titulo}</Text>
          
          <Text style={estilos.etiquetaSeccion}>Acerca de este evento</Text>
          <Text style={estilos.textoParrafo}>{eventoBase.acercaDe}</Text>
        </View>

        {eventoBase.consejo ? (
          <View style={estilos.tarjetaMotivacional}>
            <Text style={estilos.tituloMotivacional}>Lectura Recomendada</Text>
            <Text style={estilos.textoConsejo}>
              {eventoBase.consejo.replace('📚 Lectura recomendada: ', '')}
            </Text>
          </View>
        ) : null}

        {eventoBase.secciones && eventoBase.secciones.length > 0 && (
          <View style={estilos.contenedorSecciones}>
            {eventoBase.secciones.map((seccion, index) => (
              <View key={index} style={estilos.bloqueSeccion}>
                <Text style={estilos.subtituloSteam}>{seccion.subtitulo.toUpperCase()}</Text>
                {seccion.imagenFija ? (
                  <Image source={{ uri: seccion.imagenFija }} style={estilos.imagenSeccion} />
                ) : null}
                <Text style={estilos.textoParrafo}>{seccion.texto}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {usuarioActual && (
        <View style={estilos.pieFijo}>
          {usuarioActual.rol === 'usuario' ? (
            <BotonAccion
              titulo={estaInscrito ? 'Inscrito (Tocar para cancelar)' : 'Inscribirme ahora'}
              variante={estaInscrito ? 'success' : 'primary'}
              onPress={() => alternarInscripcion(eventoBase.id)}
            />
          ) : (
            <BotonAccion
              titulo="Editar Taller"
              variante="primary"
              onPress={() => navigation.navigate('EditarEvento', { id: eventoBase.id })}
            />
          )}
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorBase: { flex: 1, backgroundColor: '#F5EFEB' },
  scrollContainer: { flex: 1 },
  contenedorCentrado: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  textoError: { fontSize: 18, color: '#8B1E1E', marginBottom: 20 },
  contenedorImagenCabecera: { height: 210, backgroundColor: '#1A1A1A' },
  imagenCabecera: { width: '100%', height: '100%', resizeMode: 'cover' },
  tarjetaPrincipal: { backgroundColor: '#FFFFFF', padding: 20, borderBottomWidth: 1, borderColor: '#D5DBE1' },
  filaBadge: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  badgeCategoria: { backgroundColor: '#E6F4FE', color: '#006699', fontSize: 12, fontWeight: '700', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, textTransform: 'uppercase' },
  textoFecha: { fontSize: 13, color: '#5F6B7A', fontWeight: 'bold' },
  tituloEvento: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 15 },
  etiquetaSeccion: { fontSize: 12, color: '#5F6B7A', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 1 },
  textoParrafo: { fontSize: 15, color: '#2D3748', lineHeight: 24, marginBottom: 10 },
  tarjetaMotivacional: { backgroundColor: '#EBF4F6', margin: 16, padding: 18, borderRadius: 10, borderWidth: 1, borderColor: '#2C8C99' },
  tituloMotivacional: { fontSize: 16, fontWeight: 'bold', color: '#2C8C99', marginBottom: 8 },
  textoConsejo: { fontSize: 15, color: '#1A1A1A', fontWeight: '500', lineHeight: 22 },
  contenedorSecciones: { padding: 20 },
  bloqueSeccion: { marginBottom: 24 },
  subtituloSteam: { fontSize: 20, fontWeight: '800', color: '#1A1A1A', marginBottom: 12 },
  imagenSeccion: { width: '100%', height: 180, resizeMode: 'cover', marginBottom: 12, borderRadius: 8 },
  pieFijo: { padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#D5DBE1' }
});

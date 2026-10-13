import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { EventoContext } from '../context/EventoContext';

export default function PantallaDetalleEvento({ route, navigation }) {
  const { id } = route.params;
  const { eventos, alternarInscripcion, usuarioActual } = useContext(EventoContext);
  
  const eventoBase = eventos.find((e) => e.id === id);

  if (!eventoBase) {
    return (
      <View style={estilos.contenedorCentrado}>
        <Text style={estilos.textoError}>El evento no existe.</Text>
        <TouchableOpacity style={estilos.botonVolver} onPress={() => navigation.goBack()}>
          <Text style={estilos.textoBoton}>Volver</Text>
        </TouchableOpacity>
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
          <Text style={estilos.tituloEvento}>{eventoBase.titulo}</Text>
          <Text style={estilos.textoMeta}>📅 {eventoBase.fecha}   |   🏷️ {eventoBase.categoria}</Text>
          
          <Text style={estilos.etiquetaSeccion}>Acerca de este evento</Text>
          <Text style={estilos.textoParrafo}>{eventoBase.acercaDe}</Text>
        </View>

        {/* TARJETA DE LECTURA RECOMENDADA (SIN TEXTO REDUNDANTE Y CON LETRA MÁS GRANDE) */}
        {eventoBase.consejo ? (
          <View style={estilos.tarjetaMotivacional}>
            <Text style={estilos.tituloMotivacional}>📚 Lectura Recomendada</Text>
            <Text style={estilos.textoConsejo}>{eventoBase.consejo.replace('📚 Lectura recomendada: ', '')}</Text>
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

      {usuarioActual && usuarioActual.rol === 'usuario' && (
        <View style={estilos.pieFijo}>
          <TouchableOpacity 
            style={[estilos.botonPrincipal, estaInscrito && estilos.botonInscrito]} 
            onPress={() => alternarInscripcion(eventoBase.id)}
          >
            <Text style={estilos.textoBotonPrincipal}>
              {estaInscrito ? '✅ Ya estás inscrito (Toca para cancelar)' : '📝 Inscribirse ahora'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorBase: { flex: 1, backgroundColor: '#F5EFEB' },
  scrollContainer: { flex: 1 },
  contenedorCentrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textoError: { fontSize: 18, color: '#8B1E1E', marginBottom: 20 },
  botonVolver: { backgroundColor: '#1A1A1A', padding: 15, borderRadius: 8 },
  textoBoton: { color: '#FFFFFF', fontWeight: 'bold' },
  
  contenedorImagenCabecera: { height: 200, backgroundColor: '#1A1A1A' },
  imagenCabecera: { width: '100%', height: '100%', resizeMode: 'cover' },
  
  tarjetaPrincipal: { backgroundColor: '#FFFFFF', padding: 20, borderBottomWidth: 1, borderColor: '#D5DBE1' },
  tituloEvento: { fontSize: 26, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 5 },
  textoMeta: { fontSize: 14, color: '#2C8C99', fontWeight: 'bold', marginBottom: 20 },
  
  etiquetaSeccion: { fontSize: 12, color: '#5F6B7A', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 10, letterSpacing: 1 },
  textoParrafo: { fontSize: 15, color: '#1A1A1A', lineHeight: 24, marginBottom: 15 },
  
  // Estilos limpios, sin "Tip Profesional" y con tipografía más grande
  tarjetaMotivacional: { backgroundColor: '#EBF4F6', margin: 15, padding: 18, borderRadius: 10, borderWidth: 1, borderColor: '#2C8C99' },
  tituloMotivacional: { fontSize: 16, fontWeight: 'bold', color: '#2C8C99', marginBottom: 8 },
  textoConsejo: { fontSize: 16, color: '#1A1A1A', fontWeight: '500', lineHeight: 22 },
  
  contenedorSecciones: { padding: 20 },
  bloqueSeccion: { marginBottom: 30 },
  subtituloSteam: { fontSize: 22, fontWeight: '900', color: '#1A1A1A', marginBottom: 15, letterSpacing: 0.5 },
  imagenSeccion: { width: '100%', height: 180, resizeMode: 'cover', marginBottom: 15, borderRadius: 4, borderWidth: 1, borderColor: '#D5DBE1' },
  
  pieFijo: { padding: 15, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderColor: '#D5DBE1' },
  botonPrincipal: { backgroundColor: '#2C8C99', padding: 16, borderRadius: 8, alignItems: 'center' },
  botonInscrito: { backgroundColor: '#1E8E3E' },
  textoBotonPrincipal: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }
});
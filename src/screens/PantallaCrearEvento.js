import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import { EventoContext } from '../context/EventoContext';
import { useLibroRecomendado } from '../hooks/useLibroRecomendado';
import BotonAccion from '../components/BotonAccion';

export default function PantallaCrearEvento({ navigation }) {
  const { agregarEvento } = useContext(EventoContext);
  const { cargandoApi, errorApi, buscarLibroPorCategoria } = useLibroRecomendado();

  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');
  const [acercaDe, setAcercaDe] = useState('');
  const [consejo, setConsejo] = useState('');
  const [errorFormulario, setErrorFormulario] = useState('');

  const manejarBusquedaLibro = async () => {
    if (!categoria.trim()) {
      Alert.alert('Aviso', 'Primero escribe una categoría (ej: Programación, Liderazgo, Diseño) para buscar un libro relacionado.');
      return;
    }

    const resultado = await buscarLibroPorCategoria(categoria);
    if (resultado) {
      setConsejo(resultado);
    }
  };

  const manejarGuardar = () => {
    if (!titulo.trim() || !fecha.trim() || !categoria.trim() || !acercaDe.trim()) {
      setErrorFormulario('Por favor, completa los campos principales y la descripción.');
      return;
    }

    const nuevoEvento = {
      titulo: titulo.trim(),
      fecha: fecha.trim(),
      categoria: categoria.trim(),
      imagen: imagen.trim() || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      acercaDe: acercaDe.trim(),
      consejo: consejo.trim(),
      secciones: []
    };

    agregarEvento(nuevoEvento);
    Alert.alert('¡Éxito!', 'El taller ha sido creado correctamente.');
    navigation.goBack();
  };

  return (
    <ScrollView style={estilos.contenedor} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={estilos.tituloPantalla}>Registrar Nuevo Taller o Evento</Text>

      <View style={estilos.formulario}>
        <Text style={estilos.etiqueta}>Título del Evento:</Text>
        <TextInput
          style={estilos.campoTexto}
          placeholder="Ej: Taller de React Native"
          placeholderTextColor="#999999"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text style={estilos.etiqueta}>Fecha:</Text>
        <TextInput
          style={estilos.campoTexto}
          placeholder="Ej: 30 de Octubre"
          placeholderTextColor="#999999"
          value={fecha}
          onChangeText={setFecha}
        />

        <Text style={estilos.etiqueta}>Categoría:</Text>
        <TextInput
          style={estilos.campoTexto}
          placeholder="Ej: Programación"
          placeholderTextColor="#999999"
          value={categoria}
          onChangeText={setCategoria}
        />

        <Text style={estilos.etiqueta}>URL de la Imagen de Cabecera:</Text>
        <TextInput
          style={estilos.campoTexto}
          placeholder="Ej: https://images.unsplash.com/..."
          placeholderTextColor="#999999"
          value={imagen}
          onChangeText={setImagen}
        />

        <Text style={estilos.etiqueta}>Descripción (Acerca de):</Text>
        <TextInput
          style={[estilos.campoTexto, { height: 90, textAlignVertical: 'top' }]}
          placeholder="Escribe los detalles principales..."
          placeholderTextColor="#999999"
          multiline
          value={acercaDe}
          onChangeText={setAcercaDe}
        />

        <Text style={estilos.etiqueta}>Lectura recomendada:</Text>
        <TextInput
          style={[estilos.campoTexto, { height: 70, textAlignVertical: 'top' }]}
          placeholder="Ej: Nombre del libro o sugerencia de lectura..."
          placeholderTextColor="#999999"
          multiline
          value={consejo}
          onChangeText={setConsejo}
        />

        {errorApi ? (
          <View style={estilos.cajaErrorApi}>
            <Text style={estilos.textoErrorApi}>{errorApi}</Text>
          </View>
        ) : null}

        <BotonAccion
          titulo="Buscar sugerencia de libro"
          variante="secondary"
          cargando={cargandoApi}
          onPress={manejarBusquedaLibro}
          estiloPersonalizado={{ marginBottom: 16 }}
        />

        {errorFormulario ? <Text style={estilos.textoError}>{errorFormulario}</Text> : null}

        <BotonAccion
          titulo="Guardar Evento"
          variante="primary"
          onPress={manejarGuardar}
        />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#F5EFEB', padding: 20 },
  tituloPantalla: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 20, textAlign: 'center' },
  formulario: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#D5DBE1' },
  etiqueta: { fontSize: 14, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 5, marginTop: 5 },
  campoTexto: { borderWidth: 1, borderColor: '#D5DBE1', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 15, backgroundColor: '#FAFAFA', color: '#1A1A1A' },
  cajaErrorApi: { backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5', padding: 10, borderRadius: 8, marginBottom: 12 },
  textoErrorApi: { color: '#B91C1C', fontSize: 13, fontWeight: '600', textAlign: 'center' },
  textoError: { color: '#8B1E1E', marginBottom: 15, textAlign: 'center', fontWeight: '600' }
});

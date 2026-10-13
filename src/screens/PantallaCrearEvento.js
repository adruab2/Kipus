import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { EventoContext } from '../context/EventoContext';

export default function PantallaCrearEvento({ navigation }) {
  const { agregarEvento } = useContext(EventoContext);

  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');
  const [acercaDe, setAcercaDe] = useState('');
  const [consejo, setConsejo] = useState('');
  const [cargandoApi, setCargandoApi] = useState(false);
  const [error, setError] = useState('');

  // CONSUMO DE LA API EXTERNA REAL DE OPEN LIBRARY (Libros por categoría)
  const buscarLibroExterno = async () => {
    if (!categoria.trim()) {
      Alert.alert('Aviso', 'Primero escribe una categoría (ej: Programación, Liderazgo) para buscar un libro relacionado.');
      return;
    }

    setCargandoApi(true);
    try {
      // Hacemos el fetch real a la API pública mundial de Open Library
      const query = encodeURIComponent(categoria.trim());
      const respuesta = await fetch(`https://openlibrary.org/search.json?q=${query}`);
      const datosJson = await respuesta.json();

      if (datosJson && datosJson.docs && datosJson.docs.length > 0) {
        // Seleccionamos un libro al azar de los resultados devueltos por el servidor externo
        const libros = datosJson.docs;
        const libroAleatorio = libros[Math.floor(Math.random() * Math.min(libros.length, 15))];
        
        const nombreLibro = libroAleatorio.title || 'Libro especializado';
        const autorLibro = libroAleatorio.author_name ? libroAleatorio.author_name[0] : 'Autor desconocido';
        
        setConsejo(`📚 Lectura recomendada: "${nombreLibro}" por ${autorLibro}.`);
      } else {
        setConsejo(`📚 Explora bibliografía recomendada sobre ${categoria.trim()} para profundizar.`);
      }
    } catch (err) {
      console.log('Error conectando a la API de Open Library:', err);
      setConsejo('📚 Consulta fuentes bibliográficas actualizadas para este taller.');
    } finally {
      setCargandoApi(false);
    }
  };

  const manejarGuardar = () => {
    if (!titulo.trim() || !fecha.trim() || !categoria.trim() || !acercaDe.trim()) {
      setError('Por favor, completa los campos principales y la descripción.');
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
    Alert.alert('¡Éxito!', 'El evento ha sido creado correctamente.');
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

        <Text style={estilos.etiqueta}>Recomendación Bibliográfica (Opcional):</Text>
        <TextInput
          style={[estilos.campoTexto, { height: 70, textAlignVertical: 'top' }]}
          placeholder="Escribe o busca un libro con la API..."
          placeholderTextColor="#999999"
          multiline
          value={consejo}
          onChangeText={setConsejo}
        />

        <TouchableOpacity 
          style={estilos.botonApi} 
          onPress={buscarLibroExterno}
          disabled={cargandoApi}
        >
          {cargandoApi ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={estilos.textoBotonApi}>📚 Buscar Libro Relacionado (API)</Text>
          )}
        </TouchableOpacity>

        {error ? <Text style={stylesError.textoError}>{error}</Text> : null}

        <TouchableOpacity style={estilos.botonGuardar} onPress={manejarGuardar}>
          <Text style={estilos.textoBoton}>Guardar Evento</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const stylesError = StyleSheet.create({
  textoError: { color: '#8B1E1E', marginBottom: 15, textAlign: 'center', fontWeight: '600' }
});

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#F5EFEB', padding: 20 },
  tituloPantalla: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 20, textAlign: 'center' },
  formulario: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#D5DBE1' },
  etiqueta: { fontSize: 14, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 5, marginTop: 5 },
  campoTexto: { borderWidth: 1, borderColor: '#D5DBE1', borderRadius: 8, padding: 12, marginBottom: 10, fontSize: 15, backgroundColor: '#FAFAFA', color: '#1A1A1A' },
  
  botonApi: { backgroundColor: '#5F6B7A', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  textoBotonApi: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 },

  botonGuardar: { backgroundColor: '#2C8C99', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 5 },
  textoBoton: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }
});
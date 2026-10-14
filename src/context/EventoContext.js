import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EventoContext = createContext();

const EVENTOS_KEY = 'kipus_eventos';
const USUARIOS_KEY = 'kipus_usuarios';

export const EventoProvider = ({ children }) => {
  const [rol, setRol] = useState(null); 
  const [eventos, setEventos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null); 
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const eventosGuardados = await AsyncStorage.getItem(EVENTOS_KEY);
        const usuariosGuardados = await AsyncStorage.getItem(USUARIOS_KEY);

        if (eventosGuardados !== null) {
          setEventos(JSON.parse(eventosGuardados));
        } else {
          setEventos([
            { 
              id: '1', 
              titulo: 'Taller de Node.js', 
              fecha: '25 de Octubre', 
              categoria: 'Programación', 
              imagen: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
              acercaDe: 'Construye un mundo más conectado en este taller inmersivo de backend.',
              consejo: '"Node.js Web Development" por David Herron.',
              secciones: []
            },
            { 
              id: '2', 
              titulo: 'Taller de Liderazgo', 
              fecha: '28 de Octubre', 
              categoria: 'Psicología', 
              imagen: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
              acercaDe: 'Toma el control de tu entorno profesional.',
              consejo: '"Liderazgo: El poder de la inteligencia emocional" por Daniel Goleman.',
              secciones: []
            }
          ]);
        }

        if (usuariosGuardados !== null) {
          setUsuarios(JSON.parse(usuariosGuardados));
        } else {
          setUsuarios([
            { id: '101', nombre: 'Administrador Kipus', correo: 'admin@kipus.com', password: '123', rol: 'admin', inscripciones: [] },
            { id: '102', nombre: 'Jorge Peres', correo: 'usuario@kipus.com', password: '123', rol: 'usuario', inscripciones: [] }
          ]);
        }
      } catch (error) {
        console.log('[LOAD] Error leyendo datos:', error);
      } finally {
        setLoaded(true); 
      }
    };
    cargarDatos();
  }, []); 

  useEffect(() => {
    if (!usuarioActual) return;
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((u) => (u.id === usuarioActual.id ? usuarioActual : u))
    );
  }, [usuarioActual]);

  useEffect(() => {
    if (!loaded) return; 

    const guardarDatos = async () => {
      try {
        await AsyncStorage.setItem(EVENTOS_KEY, JSON.stringify(eventos));
        await AsyncStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
      } catch (error) {
        console.log('[SAVE] Error guardando datos:', error);
      }
    };
    guardarDatos();
  }, [eventos, usuarios, loaded]);

  const cambiarRol = (nuevoRol) => setRol(nuevoRol);

  const agregarEvento = (nuevoEvento) => {
    const eventoConId = {
      ...nuevoEvento,
      id: Date.now().toString(),
      imagen: nuevoEvento.imagen || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      acercaDe: nuevoEvento.acercaDe || 'Descripción general del evento...',
      consejo: nuevoEvento.consejo || '',
      secciones: [] 
    };
    setEventos((prev) => [eventoConId, ...prev]); 
  };

  const editarEvento = (id, datosActualizados) => {
    setEventos((prev) =>
      prev.map((evento) => (evento.id === id ? { ...evento, ...datosActualizados } : evento))
    );
  };

  const eliminarEvento = (id) => {
    setEventos((prev) => prev.filter((evento) => evento.id !== id));
  };

  const alternarInscripcion = (eventoId) => {
    if (!usuarioActual) return;

    const yaInscrito = usuarioActual.inscripciones?.includes(eventoId);
    const nuevasInscripciones = yaInscrito
      ? usuarioActual.inscripciones.filter((id) => id !== eventoId)
      : [...(usuarioActual.inscripciones || []), eventoId];

    setUsuarioActual({
      ...usuarioActual,
      inscripciones: nuevasInscripciones
    });
  };

  const registrarUsuario = (nuevoUsuario) => {
    const usuarioConEstructura = {
      ...nuevoUsuario,
      inscripciones: []
    };
    setUsuarios((prev) => [...prev, usuarioConEstructura]);
  };

  const editarUsuarioAdmin = (id, datosActualizados) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...datosActualizados } : u))
    );
    if (usuarioActual && usuarioActual.id === id) {
      setUsuarioActual((prev) => ({ ...prev, ...datosActualizados }));
    }
  };

  const eliminarUsuarioAdmin = (id) => {
    setUsuarios((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <EventoContext.Provider
      value={{
        rol, cambiarRol, eventos, agregarEvento, editarEvento, eliminarEvento, alternarInscripcion,
        usuarios, setUsuarios, registrarUsuario, usuarioActual, setUsuarioActual, loaded,
        editarUsuarioAdmin, eliminarUsuarioAdmin
      }}
    >
      {children}
    </EventoContext.Provider>
  );
};

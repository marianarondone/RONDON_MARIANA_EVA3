'use client'
import { useState, useEffect } from "react"
import { Evento } from "./Interfaces/IEvento"
import MostrarEventos from "./Componentes/MostrarEventos"


// estado inicial del formulario
let initialStateEvento:Evento = {
  nombreEvento: "",
  participantes: 0,
  descripcion: "",
  tipoEvento: "",
  fechaEvento:""

}


export default function Home() {
  const [eventoForm, setEventoForm] = useState<Evento>(initialStateEvento) // estado del formulario (lo que el usuario escribe)
  const [eventos, setEventos] = useState<Evento[]>([]); // lista de eventos registrados
  const [eventoActual, setEventoActual] = useState<{evento: Evento, index: number} | null>(null) // guarda el evento y su posicion mientras se esta editando
  const [errores, setErrores] = useState<{[ key: string ]: string}>({}) // errores de validacion
  const [reg, setReg] = useState(false) // estado que asegura que las validaciones se ejecuten una vez que se intente registrar un evento


  // lee los eventos guardados en el navegador una vez que se carga la pagina
  useEffect(() => {
  const eventosReg = JSON.parse(localStorage.getItem("eventos") || '[]')
  if (eventosReg){
    setEventos(eventosReg)
    console.log(eventosReg)
  }
  
}, [])

// funcion que guarda la lista de eventos cada vez que cambia
  useEffect(() => {
  localStorage.setItem("eventos", JSON.stringify(eventos))
}, [eventos])

  //maneja los cambios del formulario
   const handleEvento = (name: string, value: string | number) => {
    setEventoForm(prev =>
      ({...prev, [name]: value}))
    setErrores(prev => ({...prev, [name]: ""}))
}

  // valida el input de cada campo
  const validarFormulario = () => {
    const errores: { [key:string]: string} = {}

  if (!eventoForm.nombreEvento.trim()){
    errores.nombreEvento = "Este campo es obligatorio."
  }

  if (!eventoForm.participantes || eventoForm.participantes <= 5){
    errores.participantes = "Un evento debe tener mas de 5 participantes."
  }
  if (eventoForm.descripcion.trim().length < 25 || eventoForm.descripcion.trim().length > 200){
    errores.descripcion = "La descripción debe tener minimo 25 caracteres y no mas de 200."
  }
  if (!eventoForm.tipoEvento) {
    errores.tipoEvento = "Este campo es obligatorio."
  }
  if (!eventoForm.fechaEvento){
    errores.fechaEvento = "Este campo es obligatorio."
  }
  else{
    const hoy = new Date()
    hoy.setHours(0,0,0,0)
    const fecha = new Date(eventoForm.fechaEvento)
    if (fecha < hoy){
      errores.fechaEvento = "Fecha no valida"
    }
  }
  setErrores(errores)
  return Object.keys(errores).length === 0 // verifica que no haya errores para asi continuar
  }

  // maneja la accion de guardar un evento
  const handleGuardarForm = (evento: Evento) => {
    setReg(true)
    if (!validarFormulario()) return
    // actualiza el evento si se esta editando
    if (eventoActual !== null){
      const actualizarEventos = [...eventos];
      actualizarEventos[eventoActual.index] = evento;
      setEventos(actualizarEventos)
    }
    // si el evento es nuevo lo agrega al final
    else {
      setEventos([...eventos,evento])
    }
    // limpia todos los campos
    setEventoActual(null)
    setEventoForm(initialStateEvento);
    setErrores({})
    setReg(false)

  }

  // funcion para editar los eventos
  const handleEditar = (evento: Evento, index: number) => {
    setEventoActual({ evento: evento, index:index});
    setEventoForm(evento)
    setErrores({})
  }
  
  // funcion para eliminar un evento
  const handleEliminar = ( index: number) =>{
    setEventos(eventos.filter((e, indice) => indice !== index));
    if (eventoActual && eventoActual.index === index) { //cancela el evento que se estaba editando
      setEventoActual(null);
      setEventoForm(initialStateEvento);
      setErrores({})
    }
  }
  return (
    <>
    <form onSubmit={(e) => {
      e.preventDefault()
      handleGuardarForm(eventoForm)
    }}>
      <br/>
      <label>Nombre del Evento</label>
      <br/>
      <input
        name="nombreEvento"
        type="text"
        value={eventoForm.nombreEvento}
        onChange={(e) => handleEvento(e.currentTarget.name, e.currentTarget.value)}/>
        {errores.nombreEvento && <div style={{ color: 'red' }}>{errores.nombreEvento}</div>}
      
      <br/>
      <label>Cantidad de Participantes</label>
      <br/>
      <input
      name="participantes"
      type="number"
      value={eventoForm.participantes}
      onChange={(e) => {handleEvento(e.currentTarget.name, Number(e.currentTarget.value))}}/>
      {errores.participantes && <div style={{ color: 'red' }}>{errores.participantes}</div>}

      <br/>
      <label>Descripción</label>
      <br/>
      <textarea
      name="descripcion"
      placeholder="Descripción del Evento"
      value={eventoForm.descripcion}
      onChange={(e) => handleEvento(e.currentTarget.name, e.currentTarget.value)}/>
      {errores.descripcion && <div style={{ color: 'red' }}>{errores.descripcion}</div>}

      <br/>
      <label>Tipo de Evento</label>
      <br/>
      <select
      name="tipoEvento"
      value={eventoForm.tipoEvento}
      onChange={(e) => handleEvento(e.currentTarget.name, e.currentTarget.value)}> 

      <option value="">Selecciona un tipo</option>
      <option value="Educativo">Educativo</option>
      <option value = "Cultural">Cultural</option>
      <option value="Deportivo">Deportivo</option>
      <option value="Otro">Otro</option>
      </select>
      {errores.tipoEvento && <div style={{ color: 'red' }}>{errores.tipoEvento}</div>}
      <br/>
      <label>Fecha de Evento</label>
      <br/>
      <input
      name="fechaEvento"
      type="date"
      value={eventoForm.fechaEvento}
      onChange={(e) => handleEvento(e.currentTarget.name, e.currentTarget.value)}/>
      {errores.fechaEvento && <div style={{ color: 'red' }}>{errores.fechaEvento}</div>}
      <span></span><br/>
      {/* boton que actualiza o registra */}
      <button type="submit">
        {eventoActual ? 'Actualizar Evento' : 'Registrar Evento'}
        </button>
        {/* boton para cancelar la edicion */}
        {eventoActual && <button type="button" onClick={() => {setEventoActual(null); setEventoForm(initialStateEvento);}}>Cancelar Edición</button>}
      </form>
      {/* lista de eventos registrados */}
      <MostrarEventos eventos={eventos} editar={handleEditar} eliminar={handleEliminar}/>
    </>
  )
}
'use client'
import { useState, useEffect } from "react"
import { Evento } from "./Interfaces/IEvento"
import MostrarEventos from "./MostrarEventos"


let initialStateEvento:Evento = {
  nombreEvento: "",
  participantes: 0,
  descripcion: "",
  tipoEvento: "",
  fechaEvento:""

}


export default function Home() {
  const [eventoForm, setEventoForm] = useState<Evento>(initialStateEvento)
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [eventoActual, setEventoActual] = useState<{evento: Evento, index: number} | null>(null)

  useEffect(() => {
  const eventosReg = JSON.parse(localStorage.getItem("eventos") || '[]')
  if (eventosReg){
    setEventos(eventosReg)
    console.log(eventosReg)
  }
  
}, [])

  useEffect(() => {
  localStorage.setItem("eventos", JSON.stringify(eventos))
}, [eventos])

   const handleEvento = (name: string, value: string | number) => {
    console.log(name)
    console.log(value)
    setEventoForm(prev =>
      ({...prev, [name]: value}
    )
  )}

  const handleGuardarForm = (evento: Evento) => {
    if (eventoActual !== null){
      const actualizarEventos = [...eventos];
      actualizarEventos[eventoActual.index] = evento;
      setEventos(actualizarEventos)
    }
    else {
      setEventos([...eventos,evento])
    }
    setEventoActual(null)
    setEventoForm(initialStateEvento);

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
      
      <br/>
      <label>Cantidad de Participantes</label>
      <br/>
      <input
      name="participantes"
      type="number"
      value={eventoForm.participantes}
       onChange={(e) => {
        const { name, value } = e.currentTarget
        handleEvento(name, Number(value))}}/>

      <br/>
      <label>Descripción</label>
      <br/>
      <textarea
      name="descripcion"
      placeholder="Descripción del Evento"
      value={eventoForm.descripcion}
      onChange={(e) => handleEvento(e.currentTarget.name, e.currentTarget.value)}/>

      <br/>
      <label>Tipo de Evento</label>
      <br/>
      <select
      name="tipoEvento"
      value={eventoForm.tipoEvento}
      onChange={(e) => handleEvento(e.currentTarget.name, e.currentTarget.value)}>

      <option value="">Selecciona un tipo</option>
      <option value="educativo">Educativo</option>
      <option value = "cultural">Cultural</option>
      <option value="deportivo">Deportivo</option>
      <option value="otro">Otro</option>
      </select>
      <br/>
      <label>Fecha de Evento</label>
      <br/>
      <input
      name="fechaEvento"
      type="date"
      value={eventoForm.fechaEvento}
      onChange={(e) => handleEvento(e.currentTarget.name, e.currentTarget.value)}/>
      <span></span><br/>
      <button type="submit">
          </button>
      </form>
      <MostrarEventos eventos={eventos}/>
    </>
  )
}
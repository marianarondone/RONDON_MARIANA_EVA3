'use client'
import { useState } from "react"
import { Evento } from "./Interfaces/IEvento"

let initialStateEvento:Evento = {
  nombreEvento: "",
  participantes: 0,
  descripcion: "",
  tipoEvento: "",
  fechaEvento:""

}


export default function Home() {
  const [evento, setEvento] = useState(initialStateEvento)


  const handleEvento = (name: string, value: string | number) => {
    console.log(name)
    console.log(value)
    setEvento(prev =>
      ({...prev, [name]: value}
    )
  )}
  return (
    <>
    <form>
      <br/>
      <label>Nombre del Evento</label>
      <br/>
      <input
        name="nombreEvento"
        type="text"
        onChange={(e) => handleEvento(e.currentTarget.name, e.currentTarget.value)}/>
      
      <br/>
      <label>Cantidad de Participantes</label>
      <br/>
      <input
      name="participantes"
      type="number"
      onChange={(e) => handleEvento(e.currentTarget.name, e.currentTarget.value)}/>

      <br/>
      <label>Descripción</label>
      <br/>
      <textarea
      name="descripcion"
      onChange={(e) => handleEvento(e.currentTarget.name, e.currentTarget.value)}/>

      <br/>
      <label>Tipo de Evento</label>
      <br/>
      <select
      name="tipoEvento"
      onChange={(e) => handleEvento(e.currentTarget.name, e.currentTarget.value)}>

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
      onChange={(e) => handleEvento(e.currentTarget.name, e.currentTarget.value)}/>
      <span></span><br/>
      <button>Guardar</button>
    </form>
    </>
  )
}

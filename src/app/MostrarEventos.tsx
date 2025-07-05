import React from 'react'
import { Evento } from './Interfaces/IEvento'

interface Props {
  eventos: Evento[]
}

const MostrarEventos: React.FC<Props> = ({ eventos }) => {
  return (
    <>
      <h1>LISTA DE EVENTOS</h1>
      {eventos.length === 0 ? (
        <p>NO HAY EVENTOS REGISTRADOS</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>NOMBRE DEL EVENTO</th>
              <th>PARTICIPANTES</th>
              <th>DESCRIPCIÓN</th>
              <th>TIPO</th>
              <th>FECHA</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((e, index) => (
              <tr key={index}>
                <td>{e.nombreEvento}</td>
                <td>{e.participantes}</td>
                <td>{e.descripcion}</td>
                <td>{e.tipoEvento}</td>
                <td>{e.fechaEvento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default MostrarEventos

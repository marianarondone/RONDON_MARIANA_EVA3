import React from 'react'
import { Evento } from '../Interfaces/IEvento'

interface Props {
  eventos: Evento[];
  editar: (evento: Evento, index: number) => void;
  eliminar: (index: number) => void;
}

export const MostrarEventos = (props: Props) => {

  const queEditar = (evento: Evento, index: number) => {
    props.editar(evento, index)
  }

  return (
    <>
      <h1>LISTA DE EVENTOS</h1>
      {props.eventos.length === 0 ? (
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
            {props.eventos.map((e, index) => (
              <tr key={index}>
                <td>{e.nombreEvento}</td>
                <td>{e.participantes}</td>
                <td>{e.descripcion}</td>
                <td>{e.tipoEvento}</td>
                <td>{e.fechaEvento}</td>
                <td>
                  <button onClick={() => queEditar(e, index)}>Editar</button>
                  <button onClick={() => props.eliminar(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default MostrarEventos

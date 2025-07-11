import React from 'react'
import { Evento } from '../Interfaces/IEvento'

interface Props { //se definen los datos que este componente recibe desde el componente principal
  eventos: Evento[]; //lista de eventos
  editar: (evento: Evento, index: number) => void; //funcion de editar
  eliminar: (index: number) => void; //funcion de eliminar
}

export const MostrarEventos = (props: Props) => { //recibe las propiedades desde el componente principal

  const queEditar = (evento: Evento, index: number) => { //llama a la funcion editar con el evento y su respectivo indice
    props.editar(evento, index)
  }

  return (
    <>
      <h1>LISTA DE EVENTOS</h1>
      {props.eventos.length === 0 ? ( //verifica que haya eventos, si no hay muestra el mensaje de no hay eventos registrados
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
            {props.eventos.map((e, index) => ( //usando el indice identifica cada fila que la funcion map extrae
              <tr key={index}>
                <td>{e.nombreEvento}</td>
                <td>{e.participantes}</td>
                <td>{e.descripcion}</td>
                <td>{e.tipoEvento}</td>
                <td>{e.fechaEvento}</td>
                <td>
                  <button onClick={() => queEditar(e, index)}>Editar</button> {/*llama a queEditar que a la vez llama a la funcion editar*/}
                  <button onClick={() => props.eliminar(index)}>Eliminar</button> {/*llama directamente a la funcion eliminar*/}
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

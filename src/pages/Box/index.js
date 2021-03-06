import React, { Component } from 'react'
import api from '../../services/api'
import { distanceInWords } from 'date-fns'
import pt from 'date-fns/locale/pt'
import socket from 'socket.io-client'

import Dropzone from 'react-dropzone'
import { MdInsertDriveFile } from 'react-icons/md'

import logo from '../../assets/logo.svg'
import './styles.css'

export default class Box extends Component {
  state = {
    box: {}
  }

  async componentDidMount () {
    this.subscribeToNewFiles()

    const boxId = this.props.match.params.id
    const response = await api.get(`/boxes/${boxId}`)

    this.setState({
      box: response.data
    })
  }

  subscribeToNewFiles = () => {
    const boxId = this.props.match.params.id
    const io = socket('https://tibola-omnistack-backend.herokuapp.com')

    io.emit('connectRoom', boxId)

    io.on('file', (data) => {
      this.setState({
        box: { ...this.state.box, files: [data, ...this.state.box.files] }
      })
    })
  }

  handleUpload = (files) => {
    files.forEach(file => {
      // simula o envio de arquivos por um formulário
      const data = new FormData()
      const boxId = this.props.match.params.id

      data.append('file', file)
      api.post(`/boxes/${boxId}/files`, data)
    });
  }

  render() {
    const {box} = this.state

    let filesList = box.files && box.files.map(file => (
      <li key={file._id}>
        <a className='fileInfo' href={file.url} target='_blank' rel='noopener noreferrer'>
          <MdInsertDriveFile size={24} color='#a5cfff' />
          <strong>{file.title}</strong>
        </a>
        <span>há {distanceInWords(file.createdAt, new Date(), { locale: pt })}</span>
      </li>
    ))

    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="Logo"/>
          <h1>{box.title}</h1>
        </header>

        <Dropzone onDropAccepted={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()}/>

              <p>Arraste arquivos ou clique aqui.</p>
            </div>
          )}
        </Dropzone>

        <ul>
          {filesList}
        </ul>
      </div>
    )
  }
}

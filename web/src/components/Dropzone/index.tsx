import './styles.css'
import React, { useCallback, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { useDropzone } from 'react-dropzone'

interface DropzoneProps {
  onFileUploaded: ( file: File ) => void
}

const Dropzone: React.FC<DropzoneProps> = ( { onFileUploaded } ) => {
  const [ selectedFileUrl, setSelectedFileUrl ] = useState( '' )

  const onDrop = useCallback( ( acceptedFiles ) => {
    const [ file ] = acceptedFiles
    const fileUrl = URL.createObjectURL( file )

    onFileUploaded( file )
    setSelectedFileUrl( fileUrl )
  }, [ onFileUploaded ] )
  const { getRootProps, getInputProps } = useDropzone( {
    accept: 'image/*',
    onDrop
  } )

  return <div className="dropzone" {...getRootProps()}>
    <input {...getInputProps()} accept="image/*"/>

    {
      selectedFileUrl
        ? <img src={selectedFileUrl} alt="Thumbnail"/>
        : <p>
          <FiUpload/>
          Imagem do estabelecimento
        </p>
    }

  </div>
}

export default Dropzone

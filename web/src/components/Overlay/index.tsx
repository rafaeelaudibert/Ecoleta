import React, { MouseEvent } from 'react'

import AnimatedErrorSvg from '../AnimatedSvg/error'
import AnimatedSuccessSvg from '../AnimatedSvg/success'

import FormState from '../../models/formState'

import './styles.css'

interface OverlayProps {
    formState: FormState,
    onClick?: ( event: MouseEvent<HTMLButtonElement> ) => void
  }

const Overlay = ( props: OverlayProps ): JSX.Element => {
  const { formState, onClick } = props

  if ( formState === FormState.Completed ) {
    return <div id="overlay">
      <AnimatedSuccessSvg/>
      <h2>Cadastro concluído</h2>

      <button onClick={onClick}>Voltar</button>
    </div>
  } else if ( formState === FormState.Error ) {
    return <div id="overlay">
      <AnimatedErrorSvg/>
      <h2>Aconteceu um erro, tente novamente mais tarde</h2>

      <button onClick={onClick}>Voltar</button>
    </div>
  }

  return <></>
}

export default Overlay

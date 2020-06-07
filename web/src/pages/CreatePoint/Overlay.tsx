import './styles.css'
import React, { MouseEvent } from 'react'
import ErrorTick from './ErrorTick'
import FormState from './formState'
import SuccessTick from './SuccessTick'


interface OverlayProps {
    formState: FormState,
    onClick?: ( event: MouseEvent<HTMLButtonElement> ) => void
  }

const Overlay = ( props: OverlayProps ): JSX.Element => {
  const { formState, onClick } = props

  if ( formState === FormState.Completed ) {
    return <div id="overlay">
      <SuccessTick/>
      <h2>Cadastro concluído</h2>

      <button onClick={onClick}>Voltar</button>
    </div>
  } else if ( formState === FormState.Error ) {
    return <div id="overlay">
      <ErrorTick/>
      <h2>Aconteceu um erro, tente novamente mais tarde</h2>

      <button onClick={onClick}>Voltar</button>
    </div>
  }

  return <></>
}

export default Overlay

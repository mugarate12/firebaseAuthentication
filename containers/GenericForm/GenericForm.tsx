import { SetStateAction, Dispatch } from 'react'

import styles from './GenericForm.module.css'

interface GenericFormInterface {
  arrayOfStates?: Array<{
    state: any,
    setState: Dispatch<SetStateAction<any>>,
    placeholder?: string,
    type: 'text' | 'password' | 'date' | 'number'
  }>,
  arrayOfButtonsInformations?: Array<{
    textButton: string,
    onClick?: Function
  }>
}

export default function GenericForm({ arrayOfStates, arrayOfButtonsInformations }: GenericFormInterface) {
  function renderInputs() {
    return arrayOfStates?.map((stateInformation, index) => {
      return (
        <input
          key={String(index)}
          className={styles.input}
          type={stateInformation.type}
          value={stateInformation.state}
          placeholder={stateInformation.placeholder}
          onChange={(e) => {
              stateInformation.setState(
                stateInformation.type === 'number' ? Number(e.target.value) : String(e.target.value)
              )
            }
          }
        />
      )
    })
  }

  function executeFunction(e: any, buttonFunction: Function) {
    e.preventDefault()

    buttonFunction()
  }

  function renderButtons() {
    return arrayOfButtonsInformations?.map((buttonInformation, index) => {
      return (
        <button
          key={String(index)}
          className={styles.button}
          onClick={(e) => !!buttonInformation.onClick ? executeFunction(e, buttonInformation.onClick) : {}}
        >
          {buttonInformation.textButton}
        </button>
      )
    })
  }
  
  return (
    <form className={styles.container}>
      {renderInputs()}
      {renderButtons()}
    </form>
  )
}
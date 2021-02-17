import { SetStateAction, Dispatch } from 'react'

import styles from './GenericForm.module.css'

interface GenericFormInterface {
  arrayOfStates: Array<{
    state: any,
    setState: Dispatch<SetStateAction<any>>,
    type: 'text' | 'password' | 'date' | 'number'
  }>,
  textButton: string
  onClick?: Function,
}

export default function GenericForm({ arrayOfStates, onClick, textButton }: GenericFormInterface) {
  function renderInputs() {
    return arrayOfStates.map((stateInformation, index) => {
      return (
        <input
          key={String(index)}
          className={styles.input}
          type={stateInformation.type}
          value={stateInformation.state}
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

  function executeFunction(e: any) {
    e.preventDefault()

    onClick()
  }
  
  return (
    <>
      <form className={styles.container}>
        {renderInputs()}

        <button
        onClick={(e) => !!onClick ? executeFunction(e) : {}}
        >
          {textButton}
        </button>
      </form>
    </>
  )
}
"use client"
import { FiTrash2 } from 'react-icons/fi'

import { DeleteingGame } from '../../../components/GameCard/card.Actions';

export default function DeleteGame( { id } : { id : string } ) {


   async function handleDeleteGame()
    {
      const res =   await DeleteingGame( id )

   

    }

  return (
    <>

<button
onClick={handleDeleteGame}
          type="button"
          className="ml-[12px] mr-[5px] flex h-7 w-7 items-center justify-center text-[#F32646] transition hover:text-[#ff526c]"
        >
          <FiTrash2 size={14} strokeWidth={2} />
        </button>

    </>
  )
}

import React from 'react'
import { removeSessionCokkies } from 'src/modules/authentication/adapters/out/storage'

function SignOut() {
    removeSessionCokkies
  return (
    <div onClick={removeSessionCokkies}>SignOut</div>
  )
}

export default SignOut
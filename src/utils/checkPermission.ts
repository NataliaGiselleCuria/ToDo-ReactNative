import { Alert } from 'react-native'
import React from 'react'
import { User } from '../types/types'


export const CheckPermission = (editedObject: string, allowedUsers: User[], currentUser: User, onAuthorized: () => void) => {
  if (allowedUsers.some(user => user.id === currentUser.id)) {
    onAuthorized()
  } else {
    Alert.alert(`No tienes permiso para editar esta ${editedObject}.`)
  }
}

export default CheckPermission
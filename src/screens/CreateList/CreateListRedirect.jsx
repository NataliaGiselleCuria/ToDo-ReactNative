import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function CreateListRedirect() {
  const navigation = useNavigation();

  useEffect(() => {
    // Navegar al stack Root, pantalla "CreateList"
    navigation.getParent()?.navigate('CreateList');
  }, []);

  return null;
}
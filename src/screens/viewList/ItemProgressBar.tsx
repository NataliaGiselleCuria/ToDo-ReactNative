import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ItemState } from '../../types/types';


type Props = {
  state: ItemState;
};

const ItemProgressBar: React.FC<Props> = ({ state }) => {
  const progress = {
    'no completado': 0.05,
    'en proceso': 0.5,
    'completado': 1,
  }[state];

  const color = {
    'no completado': '#ccc',
    'en proceso': '#f0ad4e', // naranja
    'completado': '#5cb85c', // verde
  }[state];

  return (
    <View style={styles.container}>
      <View style={styles.backgroundBar}>
        <View style={[styles.progressBar, { width: `${progress * 100}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:100,
    marginVertical: 8,
    alignItems: 'center',
  },
  backgroundBar: {
    width: '100%',
    height: 15,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 1,  
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
    textTransform: 'capitalize',
  },
});

export default ItemProgressBar;
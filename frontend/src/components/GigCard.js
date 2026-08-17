import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function GigCard({title, price}) {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.price}>{price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    margin: 8,
    minHeight: 120,
    justifyContent: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  price: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default GigCard;
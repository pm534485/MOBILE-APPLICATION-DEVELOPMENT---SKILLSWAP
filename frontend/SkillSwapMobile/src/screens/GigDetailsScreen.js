import React from 'react';

import {
  View,
 Text,
 StyleSheet,
} from 'react-native';

function GigDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Gig Details
      </Text>

      <Text style={styles.heading}>
        Web Development
      </Text>

      <Text style={styles.description}>
        Build a college event website.
      </Text>

      <Text style={styles.price}>
        Budget: ₹1500
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  description: {
    fontSize: 18,
    marginBottom: 15,
  },

  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default GigDetailsScreen;
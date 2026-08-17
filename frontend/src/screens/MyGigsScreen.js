import React from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

function MyGigsScreen() {
  const gigs = [
    'Logo Design',
    'Video Editing',
    'Content Writing',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        My Gigs
      </Text>

      {gigs.map((gig, index) => (
        <Text
          key={index}
          style={styles.gig}>
          {gig}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  gig: {
    fontSize: 18,
    borderWidth: 1,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default MyGigsScreen;
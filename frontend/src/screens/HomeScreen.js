import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

function HomeScreen() {
  const gigs = [
    {id: '1', title: 'Graphic Design'},
    {id: '2', title: 'Content Writing'},
    {id: '3', title: 'Web Development'},
    {id: '4', title: 'Campus Help'},
    {id: '5', title: 'Video Editing'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Available Services
      </Text>

      <FlatList
        data={gigs}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },

  cardText: {
    fontSize: 18,
  },
});

export default HomeScreen;
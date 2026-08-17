import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SkillSwap</Text>

      <Text style={styles.subtitle}>
        Campus Student Freelancing Platform
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },

  button: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 18,
  },
});

export default WelcomeScreen;
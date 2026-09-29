import React, {useState} from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

function RegisterScreen({onRegister, onSignIn}) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [course, setCourse] = useState('MCA');

  const handleRegister = () => {
    Alert.alert(
      'SkillSwap',
      'Registration form submitted successfully!',
    );

    if (onRegister) {
      onRegister();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.kicker}>
          JOIN THE COMMUNITY
        </Text>

        <Text style={styles.title}>
          Build your circle.
        </Text>

        <Text style={styles.subtitle}>
          Create a profile and turn what you know into your next opportunity.
        </Text>

        <View style={styles.card}>

          <Text style={styles.label}>
            Full Name
          </Text>

          <TextInput
            placeholder="Enter your full name"
            placeholderTextColor="#8A9995"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>
            University Email
          </Text>

          <TextInput
            placeholder="student@university.edu"
            placeholderTextColor="#8A9995"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>
            Phone Number
          </Text>

          <TextInput
            placeholder="Enter phone number"
            placeholderTextColor="#8A9995"
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>
            Course
          </Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={course}
              onValueChange={value => setCourse(value)}
            >
              <Picker.Item label="MCA" value="MCA" />
              <Picker.Item label="BCA" value="BCA" />
              <Picker.Item label="B.Tech" value="B.Tech" />
              <Picker.Item label="M.Tech" value="M.Tech" />
              <Picker.Item label="MBA" value="MBA" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          <Text style={styles.label}>
            Create Password
          </Text>

          <TextInput
            placeholder="Create a password"
            placeholderTextColor="#8A9995"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>
            Confirm Password
          </Text>

          <TextInput
            placeholder="Confirm your password"
            placeholderTextColor="#8A9995"
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            style={styles.primary}
            onPress={handleRegister}
          >
            <Text style={styles.primaryText}>
              Create account  →
            </Text>
          </TouchableOpacity>

          <Text style={styles.legal}>
            By joining, you agree to our Terms and Privacy Policy.
          </Text>

        </View>

        <TouchableOpacity
          onPress={onSignIn}
          style={styles.signInButton}
        >
          <Text style={styles.footer}>
            Already have an account?{' '}
            <Text style={styles.footerAction}>
              Sign in
            </Text>
          </Text>
        </TouchableOpacity>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F8F7',
  },

  content: {
    padding: 25,
    paddingTop: 58,
    paddingBottom: 35,
  },

  kicker: {
    color: '#D47C43',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
  },

  title: {
    color: '#123B43',
    fontSize: 35,
    fontWeight: '900',
    marginTop: 9,
  },

  subtitle: {
    color: '#647773',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 22,
  },

  card: {
    backgroundColor: '#FFFDF8',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#DCE8E4',
  },

  label: {
    color: '#123B43',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 7,
  },

  input: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE8E4',
    borderRadius: 13,
    paddingHorizontal: 16,
    marginBottom: 15,
    color: '#123B43',
    fontSize: 15,
  },

  pickerContainer: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE8E4',
    borderRadius: 13,
    overflow: 'hidden',
    marginBottom: 15,
  },

  primary: {
    height: 56,
    backgroundColor: '#D47C43',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  primaryText: {
    color: '#FFFDF8',
    fontSize: 15,
    fontWeight: '900',
  },

  legal: {
    color: '#8A9995',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 17,
  },

  signInButton: {
    paddingVertical: 20,
  },

  footer: {
    color: '#71827D',
    textAlign: 'center',
    fontSize: 14,
  },

  footerAction: {
    color: '#123B43',
    fontWeight: '900',
  },

});

export default RegisterScreen;
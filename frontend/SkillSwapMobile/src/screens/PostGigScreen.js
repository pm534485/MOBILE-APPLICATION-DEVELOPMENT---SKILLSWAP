import React, { useState } from 'react';
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
import { Picker } from '@react-native-picker/picker';

function PostGigScreen({ onPostSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Graphic Design');
  const [price, setPrice] = useState('');
  const [delivery, setDelivery] = useState('');

  const handlePostGig = () => {
    if (!title || !price) {
      Alert.alert('Validation', 'Please provide at least a title and price.');
      return;
    }
    Alert.alert('SkillSwap', 'Your gig has been posted successfully!');
    if (onPostSuccess) onPostSuccess();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        
        <Text style={styles.kicker}>OFFER A SERVICE</Text>
        <Text style={styles.title}>Post a New Gig.</Text>
        <Text style={styles.subtitle}>
          Detail your service so other students know exactly what they are getting.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Gig Title</Text>
          <TextInput
            placeholder="e.g., I will design a campus event poster"
            placeholderTextColor="#8A9995"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Picker.Item label="Graphic Design" value="Graphic Design" />
              <Picker.Item label="Content Writing" value="Content Writing" />
              <Picker.Item label="Web Development" value="Web Development" />
              <Picker.Item label="Tutoring" value="Tutoring" />
              <Picker.Item label="Campus Help" value="Campus Help" />
            </Picker>
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Describe what you will do..."
            placeholderTextColor="#8A9995"
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Price (₹)</Text>
              <TextInput
                placeholder="e.g., 250"
                placeholderTextColor="#8A9995"
                style={styles.input}
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />
            </View>
            <View style={styles.halfWidth}>
              <Text style={styles.label}>Delivery Time</Text>
              <TextInput
                placeholder="e.g., 2 Days"
                placeholderTextColor="#8A9995"
                style={styles.input}
                value={delivery}
                onChangeText={setDelivery}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.primary} onPress={handlePostGig}>
            <Text style={styles.primaryText}>Publish Gig  →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8F7' },
  content: { padding: 24, paddingBottom: 40 },
  kicker: { color: '#D47C43', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#123B43', fontSize: 32, fontWeight: '900', marginTop: 8 },
  subtitle: { color: '#647773', fontSize: 15, lineHeight: 22, marginTop: 8, marginBottom: 20 },
  card: { backgroundColor: '#FFFDF8', borderRadius: 18, padding: 18, borderWidth: 1, borderColor: '#DCE8E4' },
  label: { color: '#123B43', fontSize: 13, fontWeight: '800', marginBottom: 7 },
  input: { height: 54, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DCE8E4', borderRadius: 13, paddingHorizontal: 16, marginBottom: 15, color: '#123B43', fontSize: 15 },
  textArea: { height: 100, paddingTop: 14, textAlignVertical: 'top' },
  pickerContainer: { height: 54, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DCE8E4', borderRadius: 13, overflow: 'hidden', marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfWidth: { width: '48%' },
  primary: { height: 56, backgroundColor: '#123B43', borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  primaryText: { color: '#FFFDF8', fontSize: 15, fontWeight: '900' },
});

export default PostGigScreen;
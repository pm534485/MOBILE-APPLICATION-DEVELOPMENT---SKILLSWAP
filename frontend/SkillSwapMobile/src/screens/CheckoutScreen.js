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

function CheckoutScreen({ onConfirm, onCancel }) {
  const [notes, setNotes] = useState('');

  const handleCheckout = () => {
    Alert.alert('Booking Confirmed', 'Your request has been sent to the freelancer!');
    if (onConfirm) onConfirm();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        
        <TouchableOpacity onPress={onCancel} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.kicker}>SECURE CHECKOUT</Text>
        <Text style={styles.title}>Review & Book</Text>
        
        <View style={styles.summaryCard}>
          <Text style={styles.gigTitle}>Brand design & Logo creation</Text>
          <Text style={styles.freelancer}>By Aarav Mehta</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Fee</Text>
            <Text style={styles.priceValue}>₹ 500</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Platform Fee</Text>
            <Text style={styles.priceValue}>₹ 0 (Campus Demo)</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total to Pay</Text>
            <Text style={styles.totalValue}>₹ 500</Text>
          </View>
        </View>

        <Text style={styles.label}>Requirements or Notes (Optional)</Text>
        <TextInput
          placeholder="E.g., Please use the university colors..."
          placeholderTextColor="#8A9995"
          style={styles.textArea}
          multiline
          numberOfLines={3}
          value={notes}
          onChangeText={setNotes}
        />

        <TouchableOpacity style={styles.primary} onPress={handleCheckout}>
          <Text style={styles.primaryText}>Confirm Booking</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F8F7' },
  content: { padding: 24, paddingTop: 10 },
  backBtn: { marginBottom: 15 },
  backText: { color: '#8A9995', fontSize: 16, fontWeight: '700' },
  kicker: { color: '#D47C43', fontSize: 11, fontWeight: '900', letterSpacing: 1.5 },
  title: { color: '#123B43', fontSize: 32, fontWeight: '900', marginTop: 4, marginBottom: 20 },
  summaryCard: { backgroundColor: '#FFFDF8', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#DCE8E4', marginBottom: 24 },
  gigTitle: { color: '#123B43', fontSize: 18, fontWeight: '800' },
  freelancer: { color: '#647773', fontSize: 14, marginTop: 4 },
  divider: { height: 1, backgroundColor: '#E0E9E6', marginVertical: 16 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  priceLabel: { color: '#647773', fontSize: 15 },
  priceValue: { color: '#274B4D', fontSize: 15, fontWeight: '600' },
  totalLabel: { color: '#123B43', fontSize: 16, fontWeight: '900' },
  totalValue: { color: '#D47C43', fontSize: 18, fontWeight: '900' },
  label: { color: '#123B43', fontSize: 13, fontWeight: '800', marginBottom: 8 },
  textArea: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DCE8E4', borderRadius: 13, padding: 16, paddingTop: 16, color: '#123B43', fontSize: 15, height: 100, textAlignVertical: 'top', marginBottom: 24 },
  primary: { height: 56, backgroundColor: '#D47C43', borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#FFFDF8', fontSize: 16, fontWeight: '900' },
});

export default CheckoutScreen;
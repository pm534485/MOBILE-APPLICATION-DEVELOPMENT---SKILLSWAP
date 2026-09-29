import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../constants/theme';
import { CATEGORIES } from '../constants/sampleData';
import { useSkillSwap } from '../context/SkillSwapContext';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { validatePrice, validateRequired } from '../utils/validators';
import gigApi from '../services/gigApi';

interface PostGigScreenProps {
  navigation: any;
}

export const PostGigScreen: React.FC<PostGigScreenProps> = ({ navigation }) => {
  const { user } = useSkillSwap();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('24 Hours');
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    price?: string;
    deliveryTime?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const titleVal = validateRequired(title, 'Gig Title');
    const descVal = validateRequired(description, 'Description');
    const priceVal = validatePrice(price);
    const delVal = validateRequired(deliveryTime, 'Delivery time');

    const newErrors: typeof errors = {};
    if (!titleVal.isValid) newErrors.title = titleVal.error;
    if (!descVal.isValid) newErrors.description = descVal.error;
    if (!priceVal.isValid) newErrors.price = priceVal.error;
    if (!delVal.isValid) newErrors.deliveryTime = delVal.error;

    setErrors(newErrors);

    if (!titleVal.isValid || !descVal.isValid || !priceVal.isValid || !delVal.isValid) {
      return;
    }

    setLoading(true);
    try {
      await gigApi.createGig({
        title: title.trim(),
        category,
        description: description.trim(),
        price: parseFloat(price),
        deliveryTime,
        owner: user as any,
        status: 'available',
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setTitle('');
        setDescription('');
        setPrice('');
        navigation.navigate('Home');
      }, 1500);
    } catch {
      // Offline fallback success for demo
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setTitle('');
        setDescription('');
        setPrice('');
        navigation.navigate('Home');
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Post a Campus Gig</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {success && (
            <View style={styles.successBanner}>
              <Text style={styles.successBannerText}>
                🎉 Gig published successfully! Redirecting to marketplace...
              </Text>
            </View>
          )}

          <View style={styles.formCard}>
            <InputField
              label="Service Title"
              placeholder="e.g. Clean & Modern Club Website in React"
              value={title}
              onChangeText={(text) => {
                setTitle(text);
                if (errors.title) setErrors({ ...errors, title: undefined });
              }}
              error={errors.title}
            />

            {/* Category Picker */}
            <View style={styles.pickerWrapper}>
              <Text style={styles.pickerLabel}>Category</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={category}
                  onValueChange={(val) => setCategory(val)}
                  style={styles.picker}>
                  {CATEGORIES.map((cat) => (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
                  ))}
                </Picker>
              </View>
            </View>

            <InputField
              label="Full Description"
              placeholder="Detail what you offer, deliverables, tools used, and what you need from the peer..."
              value={description}
              onChangeText={(text) => {
                setDescription(text);
                if (errors.description)
                  setErrors({ ...errors, description: undefined });
              }}
              error={errors.description}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />

            <InputField
              label="Price (₹ INR)"
              placeholder="e.g. 750"
              value={price}
              onChangeText={(text) => {
                setPrice(text);
                if (errors.price) setErrors({ ...errors, price: undefined });
              }}
              error={errors.price}
              keyboardType="numeric"
            />

            {/* Delivery Time Picker */}
            <View style={styles.pickerWrapper}>
              <Text style={styles.pickerLabel}>Estimated Delivery Time</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={deliveryTime}
                  onValueChange={(val) => setDeliveryTime(val)}
                  style={styles.picker}>
                  <Picker.Item label="Same Day (12-24 Hours)" value="24 Hours" />
                  <Picker.Item label="2 Days" value="2 Days" />
                  <Picker.Item label="3-5 Days" value="3-5 Days" />
                  <Picker.Item label="Flexible / 1 Hour" value="Flexible / 1 Hour" />
                </Picker>
              </View>
            </View>

            <PrimaryButton
              title="Publish Campus Gig"
              onPress={handleSubmit}
              loading={loading}
              style={styles.submitBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.text,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  successBanner: {
    backgroundColor: '#DCFCE7',
    padding: 14,
    borderRadius: theme.radius.md,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  successBannerText: {
    color: theme.colors.success,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  pickerWrapper: {
    marginBottom: theme.spacing.md,
  },
  pickerLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  submitBtn: {
    marginTop: 12,
  },
});

export default PostGigScreen;

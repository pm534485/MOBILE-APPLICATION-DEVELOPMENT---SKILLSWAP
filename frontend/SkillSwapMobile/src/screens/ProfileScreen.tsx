import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../constants/theme';
import { useSkillSwap } from '../context/SkillSwapContext';
import Rating from '../components/Rating';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import InputField from '../components/InputField';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, updateUserProfile } = useSkillSwap();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Aarav Sharma');
  const [department, setDepartment] = useState(user?.department || 'MCA Computer Applications');
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState<string[]>(
    user?.skills || ['React Native', 'Node.js', 'UI/UX Design', 'MongoDB']
  );

  const handleSaveProfile = async () => {
    await updateUserProfile({
      name,
      department,
      skills,
    });
    setIsEditing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus Profile</Text>
        <TouchableOpacity
          style={styles.editHeaderBtn}
          onPress={() => setIsEditing(!isEditing)}>
          <Text style={styles.editHeaderText}>
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.avatar || (name ? name.slice(0, 2).toUpperCase() : 'AS')}
            </Text>
          </View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.userDept}>{department}</Text>
          <View style={styles.ratingRow}>
            <Rating score={user?.rating || 4.9} reviewsCount={28} />
          </View>

          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user?.gigsCompleted || 14}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user?.gigsPosted || 3}</Text>
              <Text style={styles.statLabel}>Posted</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>On Time</Text>
            </View>
          </View>
        </View>

        {isEditing ? (
          /* Edit Mode Form */
          <View style={styles.editCard}>
            <Text style={styles.editCardTitle}>Edit Campus Information</Text>
            <InputField
              label="Full Name"
              value={name}
              onChangeText={setName}
            />
            <InputField
              label="Campus Department / Program"
              value={department}
              onChangeText={setDepartment}
            />

            <Text style={styles.skillsSectionTitle}>Add / Manage Skills</Text>
            <View style={styles.addSkillRow}>
              <View style={{ flex: 1 }}>
                <InputField
                  label=""
                  placeholder="e.g. Kotlin, Figma..."
                  value={newSkill}
                  onChangeText={setNewSkill}
                  containerStyle={{ marginBottom: 0 }}
                />
              </View>
              <TouchableOpacity style={styles.addSkillBtn} onPress={addSkill}>
                <Text style={styles.addSkillBtnText}>+ Add</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.skillsPills}>
              {skills.map((skill) => (
                <View key={skill} style={styles.skillEditBadge}>
                  <Text style={styles.skillEditText}>{skill}</Text>
                  <TouchableOpacity onPress={() => removeSkill(skill)}>
                    <Text style={styles.skillRemoveIcon}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            <PrimaryButton
              title="Save Changes"
              onPress={handleSaveProfile}
              style={{ marginTop: 16 }}
            />
          </View>
        ) : (
          /* Display Skills */
          <View style={styles.skillsCard}>
            <Text style={styles.skillsCardTitle}>Verified Campus Skills</Text>
            <View style={styles.skillsRow}>
              {skills.map((skill) => (
                <View key={skill} style={styles.skillPill}>
                  <Text style={styles.skillPillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Quick Links Card */}
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.menuItemIcon}>⚙️</Text>
            <Text style={styles.menuItemLabel}>Settings & Preferences</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Help')}>
            <Text style={styles.menuItemIcon}>❓</Text>
            <Text style={styles.menuItemLabel}>Help & Campus Support</Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
          <View style={styles.menuDivider} />
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Logout')}>
            <Text style={styles.menuItemIcon}>🚪</Text>
            <Text style={[styles.menuItemLabel, { color: theme.colors.error }]}>
              Sign Out of SkillSwap
            </Text>
            <Text style={styles.menuItemArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.text,
  },
  editHeaderBtn: {
    padding: 6,
  },
  editHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.chip,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.primaryDark,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 4,
  },
  userDept: {
    fontSize: 13,
    color: theme.colors.mutedText,
    marginBottom: 8,
  },
  ratingRow: {
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: theme.radius.md,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 17,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: theme.colors.mutedText,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: theme.colors.border,
    alignSelf: 'center',
  },
  skillsCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  skillsCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 12,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillPill: {
    backgroundColor: theme.colors.chip,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.radius.pill,
  },
  skillPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primaryDark,
  },
  editCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  editCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 14,
  },
  skillsSectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 6,
    marginBottom: 6,
  },
  addSkillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  addSkillBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
  },
  addSkillBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  skillsPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillEditBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.chip,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.pill,
    gap: 6,
  },
  skillEditText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primaryDark,
  },
  skillRemoveIcon: {
    fontSize: 12,
    color: theme.colors.error,
    fontWeight: '800',
  },
  menuCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  menuItemLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  menuItemArrow: {
    fontSize: 16,
    color: theme.colors.mutedText,
  },
  menuDivider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: 16,
  },
});

export default ProfileScreen;

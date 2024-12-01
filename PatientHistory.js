import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  Modal,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const PatientRecordScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const [patientData, setPatientData] = useState({
    photo: null,
    name: 'John Doe',
    registrationNumber: 'REG2024001',
    aadharNumber: '1234 5678 9012',
    phoneNumber: '+91 9876543210',
    emailId: 'john.doe@email.com',
    dateOfBirth: new Date('1990-01-01'),
    age: '34',
    parentName: 'Robert Doe',
    bloodGroup: 'O+',
    sex: 'Male', // Biological sex
    gender: 'Male', // Gender identity
    height: '175',
    weight: '70',
    bmi: '22.9',
    occupation: 'Software Engineer',
    maritalStatus: 'Single',
    address: '123 Main Street, City, State - 123456',
    emergencyContact: {
      name: 'Jane Doe',
      relation: 'Spouse',
      phone: '+91 9876543211',
    },
    insuranceDetails: {
      provider: 'Health Insurance Co.',
      policyNumber: 'POL123456',
      validUntil: '2025-12-31',
      coverageAmount: '500000',
    },
    medicalHistory: [
      {
        condition: 'Hypertension',
        diagnosedDate: '2020-01-15',
        status: 'Ongoing',
        medications: ['Amlodipine 5mg'],
      },
      {
        condition: 'Type 2 Diabetes',
        diagnosedDate: '2019-06-20',
        status: 'Ongoing',
        medications: ['Metformin 500mg'],
      },
    ],
    familyHistory: [
      {
        relation: 'Father',
        condition: 'Hypertension',
        age: '60',
      },
      {
        relation: 'Mother',
        condition: 'Diabetes',
        age: '55',
      },
    ],
    surgicalHistory: [
      {
        procedure: 'Appendectomy',
        date: '2015-03-10',
        hospital: 'City Hospital',
        surgeon: 'Dr. Smith',
      },
    ],
    allergies: ['Penicillin', 'Peanuts'],
    immunizations: [
      {
        vaccine: 'COVID-19',
        date: '2021-05-15',
        nextDue: '2022-05-15',
      },
      {
        vaccine: 'Influenza',
        date: '2023-10-01',
        nextDue: '2024-10-01',
      },
    ],
  });

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'person' },
    { id: 'medical', label: 'Medical History', icon: 'medical-services' },
    { id: 'family', label: 'Family History', icon: 'family-restroom' },
    { id: 'insurance', label: 'Insurance', icon: 'shield' },
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genderOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];

  const handleSave = () => {
    if (!validateForm()) return;
    setIsEditing(false);
    Alert.alert('Success', 'Patient record updated successfully');
  };

  const validateForm = () => {
    // Add your validation logic here
    return true;
  };

  const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const InfoField = ({ label, value, editable, field, keyboardType = 'default' }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={(text) => setPatientData({ ...patientData, [field]: text })}
          keyboardType={keyboardType}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
    </View>
  );

  const renderPersonalInfo = () => (
    <View style={styles.tabContent}>
      <View style={styles.profileSection}>
        <View style={styles.photoContainer}>
          <Image
           // source={patientData.photo || require('./AkgecHealthLogo.png')}
            style={styles.profilePhoto}
          />
          {isEditing && (
            <TouchableOpacity style={styles.changePhotoButton}>
              <MaterialIcons name="camera-alt" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <InfoField
        label="Full Name"
        value={patientData.name}
        editable={true}
        field="name"
      />

      <InfoField
        label="Registration Number"
        value={patientData.registrationNumber}
        editable={false}
        field="registrationNumber"
      />

      <InfoField
        label="Aadhar Number"
        value={patientData.aadharNumber}
        editable={true}
        field="aadharNumber"
        keyboardType="numeric"
      />

      <View style={styles.rowContainer}>
        <View style={styles.halfField}>
          <InfoField
            label="Sex"
            value={patientData.sex}
            editable={true}
            field="sex"
          />
        </View>
        <View style={styles.halfField}>
          <InfoField
            label="Gender"
            value={patientData.gender}
            editable={true}
            field="gender"
          />
        </View>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.halfField}>
          <InfoField
            label="Height (cm)"
            value={patientData.height}
            editable={true}
            field="height"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.halfField}>
          <InfoField
            label="Weight (kg)"
            value={patientData.weight}
            editable={true}
            field="weight"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.bmiContainer}>
        <Text style={styles.bmiLabel}>BMI</Text>
        <Text style={styles.bmiValue}>{patientData.bmi}</Text>
      </View>

      <InfoField
        label="Blood Group"
        value={patientData.bloodGroup}
        editable={true}
        field="bloodGroup"
      />

      <View style={styles.dateContainer}>
        <Text style={styles.fieldLabel}>Date of Birth</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {patientData.dateOfBirth.toLocaleDateString()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMedicalHistory = () => (
    <View style={styles.tabContent}>
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Current Medical Conditions</Text>
        {patientData.medicalHistory.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.historyItem}
            onPress={() => {
              setSelectedHistory(item);
              setShowHistoryModal(true);
            }}
          >
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>{item.condition}</Text>
              <Text style={[
                styles.historyStatus,
                { color: item.status === 'Ongoing' ? '#007AFF' : '#4CAF50' }
              ]}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.historyDate}>
              Diagnosed: {new Date(item.diagnosedDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Surgical History</Text>
        {patientData.surgicalHistory.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.historyTitle}>{item.procedure}</Text>
            <Text style={styles.historyDate}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
            <Text style={styles.historyDetail}>{item.hospital}</Text>
            <Text style={styles.historyDetail}>{item.surgeon}</Text>
          </View>
        ))}
      </View>

      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Allergies</Text>
        <View style={styles.allergyContainer}>
          {patientData.allergies.map((allergy, index) => (
            <View key={index} style={styles.allergyTag}>
              <Text style={styles.allergyText}>{allergy}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderFamilyHistory = () => (
    <View style={styles.tabContent}>
      {patientData.familyHistory.map((item, index) => (
        <View key={index} style={styles.familyHistoryItem}>
          <View style={styles.familyMemberIcon}>
            <MaterialIcons name="person" size={24} color="#007AFF" />
          </View>
          <View style={styles.familyHistoryContent}>
            <Text style={styles.familyMemberRelation}>{item.relation}</Text>
            <Text style={styles.familyMemberCondition}>{item.condition}</Text>
            <Text style={styles.familyMemberAge}>Age: {item.age}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderInsurance = () => (
    <View style={styles.tabContent}>
      <View style={styles.insuranceCard}>
        <View style={styles.insuranceHeader}>
          <Text style={styles.insuranceProvider}>
            {patientData.insuranceDetails.provider}
          </Text>
          <Text style={styles.insuranceValidity}>
            Valid until: {patientData.insuranceDetails.validUntil}
          </Text>
        </View>
        <View style={styles.insuranceDetails}>
          <Text style={styles.insurancePolicy}>
            Policy Number: {patientData.insuranceDetails.policyNumber}
          </Text>
          <Text style={styles.insuranceCoverage}>
            Coverage: ₹{patientData.insuranceDetails.coverageAmount}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Patient Record</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
        >
          <MaterialIcons
            name={isEditing ? 'check' : 'edit'}
            size={24}
            color="#007AFF"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <MaterialIcons
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? '#007AFF' : '#666'}
            />
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'personal' && renderPersonalInfo()}
        {activeTab === 'medical' && renderMedicalHistory()}
        {activeTab === 'family' && renderFamilyHistory()}
        {activeTab === 'insurance' && renderInsurance()}
      </ScrollView>

      <Modal
        visible={showHistoryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowHistoryModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setShowHistoryModal(false)}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
            {selectedHistory && (
              <View>
                <Text style={styles.modalTitle}>{selectedHistory.condition}</Text>
                <Text style={styles.modalDetail}>
                  Diagnosed: {new Date(selectedHistory.diagnosedDate).toLocaleDateString()}
                </Text>
                <Text style={styles.modalDetail}>Status: {selectedHistory.status}</Text>
                <Text style={styles.modalSubtitle}>Current Medications:</Text>
                {selectedHistory.medications.map((med, index) => (
                  <Text key={index} style={styles.modalMedication}>• {med}</Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Modal>

      {showDatePicker && (
        <DateTimePicker
          value={patientData.dateOfBirth}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setPatientData({ ...patientData, dateOfBirth: selectedDate });
            }
          }}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    padding: 8,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tabLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeTabLabel: {
    color: '#007AFF',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photoContainer: {
    position: 'relative',
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
  },
  changePhotoButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f8f8f8',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfField: {
    width: '48%',
  },
  bmiContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  bmiLabel: {
    fontSize: 14,
    color: '#666',
  },
  bmiValue: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  historySection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  historyStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  historyDate: {
    fontSize: 14,
    color: '#666',
  },
  historyDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  allergyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  allergyTag: {
    backgroundColor: '#FFE5E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  allergyText: {
    color: '#FF4444',
    fontSize: 14,
  },
  familyHistoryItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  familyMemberIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  familyHistoryContent: {
    flex: 1,
  },
  familyMemberRelation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  familyMemberCondition: {
    fontSize: 14,
    color: '#666',
  },
  familyMemberAge: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  insuranceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  insuranceHeader: {
    marginBottom: 15,
  },
  insuranceProvider: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  insuranceValidity: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  insuranceDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  insurancePolicy: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  insuranceCoverage: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalClose: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  modalDetail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 8,
  },
  modalMedication: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default PatientRecordScreen;
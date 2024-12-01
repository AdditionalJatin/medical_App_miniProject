import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  Linking,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const EmergencyScreen = () => {
  const [loading, setLoading] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [pulseAnimation] = useState(new Animated.Value(1));

  // Emergency contacts and services data
  const emergencyServices = [
    {
      id: '1',
      type: 'Ambulance',
      number: '102',
      icon: 'ambulance',
      available: true,
      eta: '10 mins',
    },
    {
      id: '2',
      type: 'Fire',
      number: '101',
      icon: 'fire-truck',
      available: true,
      eta: '15 mins',
    },
    {
      id: '3',
      type: 'Police',
      number: '100',
      icon: 'police-badge',
      available: true,
      eta: '12 mins',
    },
  ];

  const nearbyHospitals = [
    {
      id: '1',
      name: 'City General Hospital',
      distance: '2.5 km',
      contact: '+91 9876543210',
      address: '123 Hospital Road, City Center',
      specialties: ['Emergency Care', 'Trauma Center', 'ICU'],
      available_beds: 15,
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Medicare Super Specialty',
      distance: '3.8 km',
      contact: '+91 9876543211',
      address: '456 Health Avenue, New Town',
      specialties: ['Emergency Care', 'Cardiac Care', 'Neurology'],
      available_beds: 8,
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Life Care Hospital',
      distance: '4.2 km',
      contact: '+91 9876543212',
      address: '789 Medical Lane, Old City',
      specialties: ['Emergency Care', 'Pediatrics'],
      available_beds: 12,
      rating: 4.3,
    },
  ];

  const emergencyTypes = [
    {
      id: '1',
      type: 'Cardiac Emergency',
      symptoms: ['Chest Pain', 'Shortness of Breath', 'Sweating'],
      instructions: [
        'Stay calm and sit down',
        'Take prescribed medication if available',
        'Loosen tight clothing',
        'Call emergency services immediately',
      ],
      priority: 'Critical',
    },
    {
      id: '2',
      type: 'Accident & Trauma',
      symptoms: ['Severe Bleeding', 'Fractures', 'Head Injury'],
      instructions: [
        'Do not move the patient',
        'Apply pressure to bleeding areas',
        'Keep patient warm',
        'Wait for professional help',
      ],
      priority: 'Critical',
    },
    {
      id: '3',
      type: 'Breathing Difficulty',
      symptoms: ['Wheezing', 'Blue Lips', 'Rapid Breathing'],
      instructions: [
        'Help patient sit upright',
        'Ensure fresh air flow',
        'Use inhaler if available',
        'Call emergency services',
      ],
      priority: 'High',
    },
  ];

  useEffect(() => {
    // Start pulse animation for emergency button
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleEmergencyCall = (number) => {
    const phoneNumber = number;
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone number is not available');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.error(err));
  };

  const EmergencyButton = () => (
    <Animated.View
      style={[
        styles.sosButton,
        { transform: [{ scale: pulseAnimation }] },
      ]}
    >
      <TouchableOpacity
        onPress={() => setShowEmergencyModal(true)}
        style={styles.sosButtonInner}
      >
        <MaterialIcons name="emergency" size={40} color="#fff" />
        <Text style={styles.sosButtonText}>SOS</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  const EmergencyTypeModal = () => (
    <Modal
      visible={showEmergencyModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowEmergencyModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Emergency Type</Text>
            <TouchableOpacity
              onPress={() => setShowEmergencyModal(false)}
              style={styles.modalCloseButton}
            >
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {emergencyTypes.map((emergency) => (
              <TouchableOpacity
                key={emergency.id}
                style={styles.emergencyTypeItem}
                onPress={() => {
                  setSelectedEmergency(emergency);
                  setShowEmergencyModal(false);
                  Alert.alert(
                    'Emergency Services Notified',
                    'Help is on the way. Stay calm and follow the instructions.',
                    [{ text: 'OK' }]
                  );
                }}
              >
                <View style={styles.emergencyTypeHeader}>
                  <Text style={styles.emergencyTypeTitle}>{emergency.type}</Text>
                  <View style={[
                    styles.priorityTag,
                    { backgroundColor: emergency.priority === 'Critical' ? '#FF4444' : '#FF9800' }
                  ]}>
                    <Text style={styles.priorityText}>{emergency.priority}</Text>
                  </View>
                </View>
                <Text style={styles.emergencyTypeSubtitle}>
                  Symptoms: {emergency.symptoms.join(', ')}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <EmergencyButton />
      
      <ScrollView style={styles.content}>
        {/* Quick Action Buttons */}
        <View style={styles.quickActions}>
          {emergencyServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.quickActionButton}
              onPress={() => handleEmergencyCall(service.number)}
            >
              <FontAwesome5 name={service.icon} size={24} color="#007AFF" />
              <Text style={styles.quickActionText}>{service.type}</Text>
              <Text style={styles.quickActionNumber}>{service.number}</Text>
              {service.available && (
                <Text style={styles.etaText}>ETA: {service.eta}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Nearby Hospitals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Hospitals</Text>
          {nearbyHospitals.map((hospital) => (
            <TouchableOpacity
              key={hospital.id}
              style={styles.hospitalCard}
              onPress={() => handleEmergencyCall(hospital.contact)}
            >
              <View style={styles.hospitalHeader}>
                <Text style={styles.hospitalName}>{hospital.name}</Text>
                <View style={styles.ratingContainer}>
                  <MaterialIcons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{hospital.rating}</Text>
                </View>
              </View>
              
              <View style={styles.hospitalInfo}>
                <View style={styles.infoRow}>
                  <MaterialIcons name="location-on" size={16} color="#666" />
                  <Text style={styles.hospitalDistance}>{hospital.distance}</Text>
                </View>
                <View style={styles.infoRow}>
                  <MaterialIcons name="local-hospital" size={16} color="#666" />
                  <Text style={styles.hospitalBeds}>
                    {hospital.available_beds} beds available
                  </Text>
                </View>
              </View>

              <Text style={styles.hospitalAddress}>{hospital.address}</Text>
              
              <View style={styles.specialtiesContainer}>
                {hospital.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency Instructions */}
        {selectedEmergency && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Emergency Instructions</Text>
            <View style={styles.instructionsCard}>
              <Text style={styles.instructionsTitle}>
                {selectedEmergency.type}
              </Text>
              {selectedEmergency.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <Text style={styles.instructionNumber}>{index + 1}</Text>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <EmergencyTypeModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  sosButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
  sosButtonInner: {
    backgroundColor: '#FF4444',
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#FF8888',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    borderWidth: 2,
    borderColor: '#FF7777',
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '31%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  quickActionNumber: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  etaText: {
    marginTop: 4,
    fontSize: 12,
    color: '#007AFF',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  hospitalCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  hospitalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
  },
  hospitalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospitalDistance: {
    marginLeft: 4,
    color: '#666',
  },
  hospitalBeds: {
    marginLeft: 4,
    color: '#666',
  },
  hospitalAddress: {
    color: '#666',
    marginBottom: 10,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialtyTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    color: '#007AFF',
    fontSize: 12,
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
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseButton: {
    padding: 5,
  },
  emergencyTypeItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  emergencyTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  priorityTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emergencyTypeSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  instructionsCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  instructionNumber: {
    backgroundColor: '#007AFF',
    color: '#fff',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 10,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default EmergencyScreen;
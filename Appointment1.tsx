import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AppointmentScreen = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    email: '',
    age: '',
    description: '',
  });
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('regular');

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM'
  ];

  const appointmentTypes = [
    { id: 'regular', title: 'Regular Visit', price: '$100', duration: '30 min' },
    { id: 'consultation', title: 'Consultation', price: '$150', duration: '45 min' },
    { id: 'emergency', title: 'Emergency', price: '$200', duration: '60 min' },
  ];

  const handleDateChange = (event : any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const validateForm = () => {
    if (!formData.patientName.trim()) {
      Alert.alert('Error', 'Please enter patient name');
      return false;
    }
    if (!formData.phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter phone number');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter email');
      return false;
    }
    if (!selectedTimeSlot) {
      Alert.alert('Error', 'Please select a time slot');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert(
        'Success',
        'Appointment booked successfully! You will receive a confirmation email shortly.',
        [{ text: 'OK', onPress: () => resetForm() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      patientName: '',
      phoneNumber: '',
      email: '',
      age: '',
      description: '',
    });
    setSelectedTimeSlot(null);
    setDate(new Date());
  };

  return (
    <ScrollView style={styles.container}>
      
      
      <View style={styles.doctorCard}>
        <Image
          source={{ uri: 'https://placekitten.com/200/200' }} // Replace with actual doctor image
          style={styles.doctorImage}
        />
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>Dr. Sarah Johnson</Text>
          <Text style={styles.specialization}>Cardiologist</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <MaterialIcons key={star} name="star" size={20} color="#FFD700" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>
          <Text style={styles.experience}>15 years experience</Text>
        </View>
      </View>

      
      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Select Appointment Type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {appointmentTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                selectedType === type.id && styles.selectedTypeCard,
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <Text style={[
                styles.typeTitle,
                selectedType === type.id && styles.selectedTypeText
              ]}>
                {type.title}
              </Text>
              <Text style={[
                styles.typeDetails,
                selectedType === type.id && styles.selectedTypeText
              ]}>
                {type.price} • {type.duration}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      
      
      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Patient Information</Text>
        
        <TextInput
          style={styles.input}
          value={formData.patientName}
          onChangeText={(text) => setFormData({...formData, patientName: text})}
          placeholder="Patient Name"
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          value={formData.phoneNumber}
          onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#666"
        />

        <TextInput
          style={styles.input}
          value={formData.age}
          onChangeText={(text) => setFormData({...formData, age: text})}
          placeholder="Age"
          keyboardType="numeric"
          placeholderTextColor="#666"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(text) => setFormData({...formData, description: text})}
          placeholder="Describe your symptoms (optional)"
          multiline
          numberOfLines={4}
          placeholderTextColor="#666"
        />

        
        
        <Text style={styles.sectionTitle}>Select Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialIcons name="calendar-today" size={24} color="#007AFF" />
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

       
        
        <Text style={styles.sectionTitle}>Available Time Slots</Text>
        <View style={styles.timeSlotContainer}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[
                styles.timeSlot,
                selectedTimeSlot === slot && styles.selectedTimeSlot,
              ]}
              onPress={() => setSelectedTimeSlot(slot)}
            >
              <Text style={[
                styles.timeSlotText,
                selectedTimeSlot === slot && styles.selectedTimeSlotText
              ]}>
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

       
        
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Book Appointment</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  doctorCard: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 15,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  doctorInfo: {
    marginLeft: 15,
    flex: 1,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  specialization: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: '#666',
  },
  experience: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  sectionContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  typeCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    minWidth: width * 0.4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedTypeCard: {
    backgroundColor: '#007AFF',
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  typeDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  selectedTypeText: {
    color: '#fff',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  timeSlot: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    margin: 5,
    minWidth: 100,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  selectedTimeSlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  timeSlotText: {
    color: '#333',
    fontSize: 14,
  },
  selectedTimeSlotText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AppointmentScreen;
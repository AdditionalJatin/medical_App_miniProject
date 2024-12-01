import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';

// Define TypeScript interface for Doctor
interface Doctor {
  id: string;
  name: string;
  expertise: string;
  experience: string;
  rating: number;
  imageUrl: string;
  availability: string;
}

// Sample doctors data
const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    expertise: 'Cardiologist',
    experience: '15 years',
    rating: 4.8,
    imageUrl: 'https://example.com/doctor1.jpg',
    availability: 'Mon - Fri',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    expertise: 'Neurologist',
    experience: '12 years',
    rating: 4.7,
    imageUrl: 'https://example.com/doctor2.jpg',
    availability: 'Mon - Sat',
  },
  // Add more doctors as needed
];

const DoctorList = () => {
  const renderDoctorCard = ({ item }: { item: Doctor }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.doctorInfo}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.doctorImage}
            defaultSource={{uri : ''}} // Add a default image
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.doctorName}>{item.name}</Text>
          <Text style={styles.expertise}>{item.expertise}</Text>
          <Text style={styles.experience}>Experience: {item.experience}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {item.rating}</Text>
            <Text style={styles.availability}>{item.availability}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Available Doctors</Text>
      </View>
      <FlatList
        data={doctors}
        renderItem={renderDoctorCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1E90FF',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  doctorInfo: {
    flexDirection: 'row',
  },
  imageContainer: {
    marginRight: 16,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E1E1E1',
  },
  textContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 4,
  },
  expertise: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
  experience: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  availability: {
    fontSize: 14,
    color: '#4CAF50',
  },
});

export default DoctorList;

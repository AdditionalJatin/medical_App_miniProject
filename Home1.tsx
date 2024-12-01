import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";


const HomePage = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello, User!</Text>
          <Text style={styles.subHeader}>How can we help you today?</Text>
        </View>
        <TouchableOpacity>
          <Icon name="notifications-none" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Quick Navigation */}
      <View style={styles.quickNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="calendar-today" size={28} color="#fff" />
          <Text style={styles.navText}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="description" size={28} color="#fff" />
          <Text style={styles.navText}>Records</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="local-hospital" size={28} color="#fff" />
          <Text style={styles.navText}>Doctors</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Icon name="help-outline" size={28} color="#fff" />
          <Text style={styles.navText}>Emergency</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Services */}
      <Text style={styles.sectionHeader}>Our Services</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.services}>
        <View style={styles.serviceCard}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceTitle}>Cardiology</Text>
        </View>
        <View style={styles.serviceCard}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceTitle}>Orthopedics</Text>
        </View>
        <View style={styles.serviceCard}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.serviceImage}
          />
          <Text style={styles.serviceTitle}>Pediatrics</Text>
        </View>
      </ScrollView>

      {/* Health Reminders */}
      <Text style={styles.sectionHeader}>Health Reminders</Text>
      <View style={styles.reminderCard}>
        <Icon name="medication" size={40} color="#2575fc" />
        <View style={styles.reminderText}>
          <Text style={styles.reminderTitle}>Take Medication</Text>
          <Text style={styles.reminderSubtitle}>8:00 AM | Blood Pressure Pills</Text>
        </View>
      </View>
      <View style={styles.reminderCard}>
        <Icon name="fitness-center" size={40} color="#2575fc" />
        <View style={styles.reminderText}>
          <Text style={styles.reminderTitle}>Morning Exercise</Text>
          <Text style={styles.reminderSubtitle}>6:30 AM | Yoga</Text>
        </View>
      </View>

      <View style={styles.reminderCard}>
        <Icon name="chess-king" size={30} color="#2575fc"/>
        <View style={styles.reminderText}>
          <Text style={styles.reminderTitle}>Play Online Games</Text>
          <Text style={styles.reminderSubtitle}>6:30 PM | Chess</Text>
        </View>
        </View>

       
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subHeader: {
    fontSize: 16,
    color: "#666",
  },
  quickNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  navItem: {
    backgroundColor: "#2575fc",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    width: "22%",
  },
  navText: {
    marginTop: 8,
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  services: {
    flexDirection: "row",
  },
  serviceCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    alignItems: "center",
    width: 120,
    elevation: 5,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  reminderCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  reminderText: {
    marginLeft: 15,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  reminderSubtitle: {
    fontSize: 14,
    color: "#666",
  },
});

export default HomePage;
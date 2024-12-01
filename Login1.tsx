import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  useColorScheme,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

const LoginScreen = ({ }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });

  // Theme colors
  const theme = {
    background: isDarkMode ? '#1A1A2E' : '#F5F5F7',
    card: isDarkMode ? '#262640' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#333333',
    primary: '#6C63FF',
    error: '#FF5252',
    inputBg: isDarkMode ? '#2D2D4A' : '#F7F7F7',
    border: isDarkMode ? '#404060' : '#E1E1E1',
  };

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedCredentials = await AsyncStorage.getItem('userCredentials');
      if (savedCredentials) {
        const { username, password, rememberMe } = JSON.parse(savedCredentials);
        if (rememberMe) {
          setUsername(username);
          setPassword(password);
          setRememberMe(true);
        }
      }
    } catch (error) {
      console.error('Error loading credentials:', error);
    }
  };

  const validateUsername = (username: string) => {
    if (!username) return 'Username is required';
    if (username.length < 4) return 'Username must be at least 4 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return 'Username can only contain letters, numbers and underscores';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password)) {
      return 'Password must contain uppercase, lowercase, number and special character';
    }
    return '';
  };

  const handleLogin = async () => {
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    setErrors({
      username: usernameError,
      password: passwordError,
    });

    if (!usernameError && !passwordError) {
      setIsLoading(true);
      try {
        if (rememberMe) {
          await AsyncStorage.setItem('userCredentials', 
            JSON.stringify({ username, password, rememberMe })
          );
        } else {
          await AsyncStorage.removeItem('userCredentials');
        }
        // Add your login logic here
        setTimeout(() => {
          setIsLoading(false);
          // Navigate to home screen
        }, 1500);
      } catch (error) {
        setIsLoading(false);
        console.error('Login error:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Image
             source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
            style={styles.logo}
          />
          <Text style={[styles.appName, { color: theme.text }]}>
            Medical App
          </Text>
        </View>

        <View style={[styles.formContainer, { backgroundColor: theme.card }]}>
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Ionicons 
                name="person-outline" 
                size={20} 
                color={theme.text} 
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { 
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: errors.username ? theme.error : theme.border
                }]}
                placeholder="Username"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setErrors(prev => ({ ...prev, username: '' }));
                }}
              />
            </View>
            {errors.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={theme.text} 
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { 
                  backgroundColor: theme.inputBg,
                  color: theme.text,
                  borderColor: errors.password ? theme.error : theme.border
                }]}
                placeholder="Password"
                placeholderTextColor={isDarkMode ? '#888' : '#999'}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors(prev => ({ ...prev, password: '' }));
                }}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={theme.text}
                />
              </TouchableOpacity>
            </View>
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <View style={styles.optionsContainer}>
            <View style={styles.rememberMe}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: '#767577', true: theme.primary }}
                thumbColor={rememberMe ? '#fff' : '#f4f3f4'}
              />
              <Text style={[styles.rememberMeText, { color: theme.text }]}>
                Remember me
              </Text>
            </View>
            <TouchableOpacity onPress={() => {/* Handle forgot password */}}>
              <Text style={[styles.forgotPassword, { color: theme.primary }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: theme.primary }]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={[styles.signupText, { color: theme.text }]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => {/* Navigate to signup */}}>
              <Text style={[styles.signupLink, { color: theme.primary }]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
  },
  formContainer: {
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 45,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  errorText: {
    color: '#FF5252',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 8,
    fontSize: 14,
  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
  },
  signupLink: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

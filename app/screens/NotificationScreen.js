import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

export default function NotificationsScreen() {
    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    })();
  }, []);

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Przypomnienie!",
        body: "Czas na zakupy!",
        sound: true,
      },
      trigger: {
        hour: time.getHours(),
        minute: time.getMinutes(),
      },
    });

    alert(`Powiadomienie ustawione na ${time.toLocaleTimeString()}`);
   };

  const onTimeChange = (event, selectedTime) => {
    setShowPicker();
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.buttonText}>Wybierz godzinę</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onTimeChange}
        />
      )}

      <TouchableOpacity 
        style={[styles.button, styles.confirmButton]}
        onPress={scheduleNotification}
      >
        <Text style={styles.buttonText}>Ustaw przypomnienie</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    backgroundColor: '#f5f5f5',
  },

  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },

  confirmButton: {
    backgroundColor: '#27ae60',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});

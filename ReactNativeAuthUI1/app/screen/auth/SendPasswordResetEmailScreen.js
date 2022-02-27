import { View, Text, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { styles, toastConfig } from '../../../style';
import { useSendPasswordResetEmailMutation } from '../../../services/userAuthApi';

const SendPasswordResetEmailScreen = () => {
  const [email, setEmail] = useState("")
  const clearTextInput = () => {
    setEmail('')
  }
  const [sendPasswordResetEmail] = useSendPasswordResetEmailMutation();

  const handleFormSubmit = async () => {
    if (email) {
      const formdata = { email }
      const res = await sendPasswordResetEmail(formdata)
      if (res.data.status === "success") {
        clearTextInput()
        Toast.show({
          type: 'done',
          position: 'top',
          topOffset: 0,
          text1: "Password Reset Email Sent. Please Check Your Email..."
        });
      }
      if (res.data.status === "failed") {
        clearTextInput()
        Toast.show({
          type: 'warning',
          position: 'top',
          topOffset: 0,
          text1: res.data.message
        });
      }
    } else {
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
        text1: "Email is required"
      });
    }
  }
  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <View style={{ marginHorizontal: 30 }}>
        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Write Your Email"
            keyboardType='email-address'
          />
        </View>
        <View style={{ width: 200, alignSelf: 'center', margin: 20 }}>
          <Button title="Send" onPress={handleFormSubmit} color='purple' />
        </View>
      </View >
    </SafeAreaView>
  )
}

export default SendPasswordResetEmailScreen
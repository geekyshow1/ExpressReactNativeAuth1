import { View, Text, Button, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, toastConfig } from '../../../style';
import Toast from 'react-native-toast-message';
import { useChangeUserPasswordMutation } from '../../../services/userAuthApi';
import { getToken } from '../../../services/AsyncStorageService'

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState("")
  const [password_confirmation, setPassword_confirmation] = useState("")
  const [userLToken, setUserLToken] = useState()

  const clearTextInput = () => {
    setPassword('')
    setPassword_confirmation('')
  }

  const [changeUserPassword] = useChangeUserPasswordMutation()

  useEffect(() => {
    (async () => {
      const token = await getToken() // Getting Token from Storage
      setUserLToken(token)          // Store Token in Local State
    })();
  })

  const handleFormSubmit = async () => {
    if (password && password_confirmation) {
      if (password === password_confirmation) {
        const formdata = { password, password_confirmation }
        const res = await changeUserPassword({ formdata, userLToken })
        console.log(res)
        if (res.data.status === "success") {
          clearTextInput()
          Toast.show({
            type: 'done',
            position: 'top',
            topOffset: 0,
            text1: 'Password Changed Successfully'
          });
        }
        if (res.data.status === "failed") {
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
          text1: "New Password and Confirm New Password doesn't match"
        });
      }
    } else {
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
        text1: 'All Fields are Required'
      });
    }
  }
  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={{ marginHorizontal: 30 }}>
          <View style={[styles.inputWithLabel, { marginBottom: 15 }]}>
            <Text style={styles.labelText}>New Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Write Your New Password"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputWithLabel}>
            <Text style={styles.labelText}>Confirm New Password</Text>
            <TextInput
              style={styles.input}
              value={password_confirmation}
              onChangeText={setPassword_confirmation}
              placeholder="Write Your New Confirm Password"
              secureTextEntry={true}
            />
          </View>
          <View style={{ width: 200, alignSelf: 'center', margin: 20 }}>
            <Button title="Save" onPress={handleFormSubmit} color='purple' />
          </View>
        </View >
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChangePasswordScreen
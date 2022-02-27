import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getToken } from '../../services/AsyncStorageService'
import { useGetLoggedUserQuery } from '../../services/userAuthApi'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../../features/userSlice'
import { setUserToken } from '../../features/authSlice'
const DashboardScreen = () => {
  const [userLToken, setUserLToken] = useState()

  useEffect(() => {
    (async () => {
      const token = await getToken() // Getting Token from Storage
      setUserLToken(token)          // Store Token in Local State
      dispatch(setUserToken({ token: token })) // Store Token in Redux Store
    })();
  })

  const { data, isSuccess } = useGetLoggedUserQuery(userLToken)

  // Store User Data in Redux Store
  const dispatch = useDispatch()
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ email: data.user.email, name: data.user.name }))
    }
  })

  return (
    <View>
      <Text>Dashboard Screen</Text>
      <Text>{userLToken}</Text>
    </View>
  )
}

export default DashboardScreen
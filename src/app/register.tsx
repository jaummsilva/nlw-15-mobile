import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Image, StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { colors } from '@/styles/colors'

export default function Register() {
  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />
      <Image
        source={require('@/assets/logo.png')}
        className="h-16"
        resizeMode="contain"
        alt="Logo"
      />
      <View className="w-full gap-3 mt-12">
        <Input>
          <Input.Field placeholder="Nome Completo" />
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
        </Input>
        <Input>
          <Input.Field placeholder="Email" keyboardType="email-address" />
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
        </Input>
        <Button title="Realizar inscrição" />
        <Link
          href="/"
          className="text-gray-100 text-base font-bold mt-8 text-center"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  )
}

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { Image, StatusBar, View } from 'react-native'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { colors } from '@/styles/colors'

export default function Home() {
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
          <Input.Field placeholder="Código do ingresso" />
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            color={colors.green[200]}
            size={20}
          />
        </Input>

        <Button title="Acessar credencial" />
        <Link
          href="/register"
          className="text-gray-100 text-base font-bold mt-8 text-center"
        >
          Ainda não possui ingresso?
        </Link>
      </View>
    </View>
  )
}

import { Feather } from '@expo/vector-icons'
import { Image, ImageBackground, Pressable, Text, View } from 'react-native'

import { colors } from '@/styles/colors'

import { QRCode } from './qrcode'

type Props = {
  image?: string
  onChangeAvatar?: () => void
  onExpandQRCode?: () => void
}

export function Credential({ onChangeAvatar, onExpandQRCode, image }: Props) {
  return (
    <View className="w-full items-center self-stretch">
      <Image
        source={require('@/assets/ticket/band.png')}
        alt="Band"
        className="w-24 h-52 z-10"
      />
      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={require('@/assets/ticket/header.png')}
          className="px-6 py-8 h-40 self-stretch items-center  border border-white/10 overflow-hidden"
        >
          <View className="w-full items-center justify-between flex-row">
            <Text className="text-zinc-50 text-sm font-bold">Unite Summit</Text>
            <Text className="text-zinc-50 text-sm font-bold">#123</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {image ? (
          <Pressable onPress={onChangeAvatar}>
            <Image
              source={{ uri: image }}
              alt="Band"
              className="w-36 h-36 rounded-full -mt-24"
            />
          </Pressable>
        ) : (
          <Pressable
            className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
            onPress={onChangeAvatar}
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </Pressable>
        )}

        <Text className="font-bold text-2xl text-zinc-50 mt-4">João Silva</Text>
        <Text className="font-regular text-base text-zinc-300 mb-4">
          jaumm.silva.04@gmail.com
        </Text>
        <QRCode size={120} value="testeewqe2q" />
        <Pressable onPress={onExpandQRCode} className="mt-6">
          <Text className="text-orange-500 text-sm font-body">
            Aplicar QRCode
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

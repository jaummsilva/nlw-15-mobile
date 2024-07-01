import { Feather } from '@expo/vector-icons'
import { MotiView } from 'moti'
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'

import { useBadgeStore } from '@/store/badge-store'
import { colors } from '@/styles/colors'

import { QRCode } from './qrcode'

type Props = { onChangeAvatar?: () => void; onExpandQRCode?: () => void }

export function Credential({ onChangeAvatar, onExpandQRCode }: Props) {
  const { height } = useWindowDimensions()
  const { data } = useBadgeStore()

  console.log(data)
  return (
    <MotiView
      className="w-full items-center self-stretch"
      from={{
        opacity: 0,
        translateY: -height,
        rotateZ: '50deg',
        rotateY: '30deg',
        rotateX: '30deg',
      }}
      animate={{
        opacity: 1,
        translateY: 0,
        rotateZ: '0deg',
        rotateY: '0deg',
        rotateX: '0deg',
      }}
      transition={{
        type: 'spring',
        damping: 20,
        rotateZ: {
          damping: 15,
          mass: 3,
        },
      }}
    >
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
            <Text className="text-zinc-50 text-sm font-bold">
              {data?.eventTitle}
            </Text>
            <Text className="text-zinc-50 text-sm font-bold">#{data?.id}</Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {data?.image ? (
          <Pressable onPress={onChangeAvatar}>
            <Image
              source={{ uri: data.image }}
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

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          {data?.name}
        </Text>
        <Text className="font-regular text-base text-zinc-300 mb-4">
          {data?.email}
        </Text>
        <QRCode size={120} value="testeewqe2q" />
        <Pressable onPress={onExpandQRCode} className="mt-6">
          <Text className="text-orange-500 text-sm font-body">
            Aplicar QRCode
          </Text>
        </Pressable>
      </View>
    </MotiView>
  )
}

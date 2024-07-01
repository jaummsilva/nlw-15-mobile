import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Link, router } from 'expo-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Image, StatusBar, View } from 'react-native'
import { z } from 'zod'

import { accessCredentials } from '@/api/access-credentials'
import { registerEvent } from '@/api/register-event'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useBadgeStore } from '@/store/badge-store'
import { colors } from '@/styles/colors'

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string(),
})

type RegisterFormInputs = z.infer<typeof registerSchema>

export default function Register() {
  const badgeStore = useBadgeStore()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  })

  const { mutateAsync: registerEventFn } = useMutation({
    mutationFn: registerEvent,
  })

  const { mutateAsync: accessCredentialsFn } = useMutation({
    mutationFn: accessCredentials,
  })

  async function handleRegister(data: RegisterFormInputs) {
    try {
      const response = await registerEventFn({
        email: data.email,
        name: data.name,
      })

      if (response.data.attendeeId) {
        const attendeeId = response.data.attendeeId
        const responseAccess = await accessCredentialsFn({
          code: attendeeId,
        })

        badgeStore.save(responseAccess.data.badge)

        Alert.alert('Inscrição', 'Inscrição realizada com sucesso!', [
          {
            text: 'OK!',
            onPress: () => {
              router.push('/ticket')
            },
          },
        ])
      }
    } catch (error) {
      console.log(error)

      if (axios.isAxiosError(error)) {
        if (
          String(error.response?.data.message).includes('already registered')
        ) {
          return Alert.alert('Inscrição', 'Este email já esta cadastrado!')
        }
        Alert.alert('Inscrição', 'Não foi possivel realizar inscrição!')
      }
    }
  }

  useEffect(() => {
    register('name')
    register('email')
  }, [register])

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
          <Input.Field
            placeholder="Nome Completo"
            onChangeText={(text) => setValue('name', text)}
          />
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
        </Input>
        <Input>
          <Input.Field
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => setValue('email', text)}
          />
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
        </Input>
        <Button
          title="Realizar inscrição"
          onPress={handleSubmit(handleRegister)}
          isLoading={isSubmitting}
        />
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

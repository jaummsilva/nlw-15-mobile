import { MaterialCommunityIcons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link, Redirect } from 'expo-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Image, StatusBar, View } from 'react-native'
import { z } from 'zod'

import { accessCredentials } from '@/api/access-credentials'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useBadgeStore } from '@/store/badge-store'
import { colors } from '@/styles/colors'

const acessCredentialsSchema = z.object({
  code: z.string(),
})

type AccessCredentialsFormInputs = z.infer<typeof acessCredentialsSchema>

export default function Home() {
  const badgeStore = useBadgeStore()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<AccessCredentialsFormInputs>({
    resolver: zodResolver(acessCredentialsSchema),
    defaultValues: {
      code: '',
    },
  })

  const { mutateAsync: accessCredentialsFn } = useMutation({
    mutationFn: accessCredentials,
  })

  async function handleAccessCredentials(
    dataAccess: AccessCredentialsFormInputs,
  ) {
    try {
      const response = await accessCredentialsFn({
        code: dataAccess.code,
      })

      badgeStore.save(response.data.badge)
    } catch (error) {
      console.log(error)

      Alert.alert('Inscrição', 'Ingresso não encontrado!')
    }
  }

  useEffect(() => {
    register('code')
  }, [register])

  if (badgeStore.data?.checkInURL) {
    return <Redirect href="/ticket" />
  }

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
            placeholder="Código do ingresso"
            onChangeText={(text) => setValue('code', text)}
          />
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            color={colors.green[200]}
            size={20}
          />
        </Input>

        <Button
          title="Acessar credencial"
          onPress={handleSubmit(handleAccessCredentials)}
          disabled={isSubmitting}
        />
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

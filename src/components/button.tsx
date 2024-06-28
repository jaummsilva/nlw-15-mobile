import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

type Props = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      activeOpacity={0.7}
      style={{
        backgroundColor: '#f9822e',
        width: '100%',
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      }}
      className="w-full h-14 items-center justify-center"
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator className="text-green-500" />
      ) : (
        <Text className="text-white font-bold text-base uppercase">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}

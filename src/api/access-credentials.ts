import { api } from '@/server/api'

export interface AccessCredentialsParam {
  code: string
}

export async function accessCredentials({ code }: AccessCredentialsParam) {
  const response = await api.get(`/attendees/${code}/badge`)

  return response
}

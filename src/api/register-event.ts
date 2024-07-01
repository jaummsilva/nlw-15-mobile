import { api } from '@/server/api'

export interface RegisterEventBody {
  email: string
  name: string
}

// Testes
const EVENT_ID = '9e9bd979-9d10-4915-b339-3786b1634f33'

export async function registerEvent({ email, name }: RegisterEventBody) {
  const response = await api.post(`/events/${EVENT_ID}/attendees`, {
    email,
    name,
  })

  return response
}

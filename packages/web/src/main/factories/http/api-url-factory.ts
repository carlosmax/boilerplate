import { Enviroment } from '@/main/constants'

export const makeApiUrl = (path: string): string => `${Enviroment.API_URL}/${path}`

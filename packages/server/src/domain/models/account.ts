export interface Account {
  id: string
  name: string
  email: string
  password: string
  phone: string
  token: string
  resetPasswordToken: string
  createdAt: Date
  updatedAt: Date
}

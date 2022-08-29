export interface Account {
  id: string
  name: string
  email: string
  password: string
  phone: string
  token: string
  resetPasswordToken: string
  resetPasswordExpires: Date
  createdAt: Date
  updatedAt: Date
}

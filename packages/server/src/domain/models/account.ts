export interface Account {
  id: string
  name: string
  email: string
  password: string
  phone: string
  token: string
  role: string
  resetPasswordToken: string
  resetPasswordExpires: Date
  createdAt: Date
  updatedAt: Date
}

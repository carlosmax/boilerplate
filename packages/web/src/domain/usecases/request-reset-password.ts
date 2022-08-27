export interface RequestResetPassword {
  reset: (email: string) => Promise<void>
}

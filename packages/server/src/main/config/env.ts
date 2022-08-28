export default {
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==7H',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000'
}

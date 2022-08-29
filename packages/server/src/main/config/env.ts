export default {
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==7H',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  brandName: process.env.BRAND_NAME,
  brandPrimaryColor: process.env.BRAND_PRIMARY_COLOR,
  logoUrl: `${process.env.CLIENT_URL}/${process.env.LOGO_URL}`,
  supportEmail: process.env.SUPPORT_EMAIL
}

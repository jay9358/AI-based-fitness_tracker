export default {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  clientURL: process.env.CLIENT_URL || 'http://localhost:3000'
}; 
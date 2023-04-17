module.exports = {
    secret: `${process.env.JWT_SECRET}`,
    refreshSecret: `${process.env.JWT_REFRESH_SECRET}`,
    expiresIn: '7d',
}

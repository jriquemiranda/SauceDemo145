const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({
    use: {
        baseURL:    'https://www.saucedemo.com',
        headless:   false,
        launchOptions:{
            slowMo: 1000
        }
    }
})
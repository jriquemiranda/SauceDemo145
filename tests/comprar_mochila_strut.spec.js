import {test,expect} from '../utils/logger.js'
import {snap} from '../utils/snap.js'

test.describe('SauceDemo - Fluxo Principal de compra', () => {
    test('Login, adicionar mochila no carinho e verificações', async({page}, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 15000)

        await test.step('Acessar o site SauceDemo', async() => {
            await page.goto('/')

            // Verificação
            await expect(page).toHaveURL('/')
            await page.waitForLoadState('load') // Esperar a página carregar por completo

            await page.waitForResponse(response => response.url() === '/' && response.status() === 200) 

            await expect(page.locator('[data-test="username"]')).toHaveText('Login')
            // Snap
            await snap(page, testInfo, 'TCPasso01-Home')
        })

        await test.step('Efetuar login com sucesso', async() => {
            await page.locator('[data-test="username"]').fill('standard_user')
            await page.locator('[data-test="password"]').fill('secret_sauce')
            await snap(page, testInfo, 'TCPasso02-Login')
            await page.locator('[data-test="login-button"]').click()

            // Verificação
            await expect(page).toHaveURL(/inventory\.html/)
            await expect(page.locator('[data-test="title"]')).toHaveText('Products')
            // Snap
            await snap(page, testInfo, 'TCPasso02-Inventory')

        })

        await test.step('Adicionar mochila no carrinho', async() => {
            // const produto = page.locator('.inventory_item').filter({hasText:'Backpack'})
            const produto = page.locator('.inventory_item', {hasText:'Backpack'})
            await produto.locator('button').toHaveText('Add to cart')

            await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
            await snap(page, testInfo, 'TCPasso03-Produto-Adicionado')

        })
    })
})
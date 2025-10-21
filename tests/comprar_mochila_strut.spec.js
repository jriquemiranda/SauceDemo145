import {test,expect} from '../utils/logger.js'
import {snap} from '../utils/snap.js'

// Funções de apoio
async function acessarSauceDemo(page) {
    // Ação
    await page.goto('/')
    // Verificação
    await expect(page).toHaveURL('/')
    // await page.waitForLoadState('load') // Esperar a página carregar por completo
    // await page.waitForResponse(response => response.url() === '/' && response.status() === 200) 
    await expect(page.locator('[data-test="login-button"]')).toHaveText('Login')
}

async function preecherLogin(page) {
    // Ação
    await page.locator('[data-test="username"]').fill('standard_user')
    await page.locator('[data-test="password"]').fill('secret_sauce')
}

async function loginSucesso(page) {
    // Ação
    await page.locator('[data-test="login-button"]').click()
    // Verificação
    await expect(page).toHaveURL(/inventory\.html/)
    await expect(page.locator('[data-test="title"]')).toHaveText('Products')
}

async function acessarCarrinho(page) {
    // Ação
    await page.locator('[data-test="shopping-cart-link"]').click()
    // Verificação
    await expect(page).toHaveURL(/cart\.html/)
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart')
    await expect(page.locator('[data-test="item-quantity"]')).toHaveText('1')
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack')
    await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('29.99')
}

test.describe('SauceDemo - Fluxo Principal de compra', () => {
    test('Comprar Mochila Direto', async({page}, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 15000)

        await test.step('Acessar o site SauceDemo', async() => {
            // Função
            await acessarSauceDemo(page)
            // Snap
            await snap(page, testInfo, 'TC1Passo01-Home')
        })

        await test.step('Efetuar login com sucesso', async() => {
            // Função
            await preecherLogin(page)
            // Snap
            await snap(page, testInfo, 'TC1Passo02a-Login')
            // Função
            await loginSucesso(page)
            // Snap
            await snap(page, testInfo, 'TC1Passo02b-Inventory')  
        })

        await test.step('Adicionar mochila no carrinho', async() => {
            // const produto = page.locator('.inventory_item').filter({hasText:'Backpack'})
            // const produto = page.locator('.inventory_item', {hasText:'Backpack'})
            // await expect(produto.locator('button')).toHaveText('Add to cart')
            // Ação
            const seletor_mochila = page.locator('.inventory_item').filter({ hasText: /Backpack/ })
            await seletor_mochila.getByRole('button', { name: /Add to cart/ }).click()
            // Verificação
            await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
            // Snap
            await snap(page, testInfo, 'TC1Passo03-Produto-Adicionado')
        })

        await test.step('Acessar o carrinho', async() => {
            // Função
            await acessarCarrinho(page)
            // Snap
            await snap(page, testInfo, 'TC1Passo04-Carrinho-Conferido')
        })
    })
    
    test('Compra Mochila Detalhe', async({page}, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 15000)

        await test.step('Acessar o site SauceDemo', async() => {
            // Função
            await acessarSauceDemo(page)
            // Snap
            await snap(page, testInfo, 'TC2Passo01-Home')
        })

        await test.step('Efetuar login com sucesso', async() => {
            // Função
            await preecherLogin(page)
            // Snap
            await snap(page, testInfo, 'TC2Passo02a-Login')
            // Função
            await loginSucesso(page)
            // Snap
            await snap(page, testInfo, 'TC2Passo02b-Inventory')  
        })

        await test.step('Detalhar produto e adicionar produto', async() => {
            // Ação
            const seletor_mochila = page.locator('.inventory_item').filter({ hasText: 'Backpack' })
            await seletor_mochila.locator('[data-test="inventory-item-name"]').click()
            // Verificação
            await expect(page).toHaveURL(/inventory-item\.html/)
            await expect(page.locator('[data-test="back-to-products"]')).toHaveText('Back to products')
            await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Backpack')
            await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('29.99')
            // Snap
            await snap(page, testInfo, 'TC2Passo03a-Produto-Detalhe')
            // Ação
            await page.locator('[data-test="add-to-cart"]').click()
            //Verificação
            await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
            // Snap
            await snap(page, testInfo, 'TC2Passo03b-Produto-Adicionado')
        })
        
        await test.step('Acessar o carrinho', async() => {
            // Função
            await acessarCarrinho(page)
            // Snap
            await snap(page, testInfo, 'TC2Passo04-Carrinho-Conferido')
        })
    })
})
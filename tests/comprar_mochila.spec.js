// 1 - Referências e biblioteca

// Declara um objeto chamado test vindo da biblioteca Playwright
const { test, expect } = require('@playwright/test')


// 2 - Classe, Funcçõe ou Métodos
test('Realizar a compra de uma mochila', async({page}) => {
    
    // Acessar o site saucedemo.com
    await page.goto('https://www.saucedemo.com')

    // Verificar tá na página correta
    await expect(page).toHaveURL('https://www.saucedemo.com')
    await expect(page.locator('[data-test="login-button"]')).toHaveText('Login')

    // Submeter o login com o usuário e senha preenchidos
    await page.fill('#user-name', 'standard_user')
    await page.fill('[name="password"]', 'secret_sauce')
    await page.click('.submit-button.btn_action')

    // Verificar tá na página correta
    await expect(page).toHaveURL(/.*inventory/)
    await expect(page.locator('.title')).toHaveText('Products')

    // Adicionar a mochila no carrinho de compras
    const btn_add_mochila = 'xpath=/html/body/div/div/div/div[2]/div/div/div/div[1]/div[2]/div[2]/button'
    await page.locator(btn_add_mochila).click()

    // Verificar se tem um produto no carrinho
    // const ico_qtd_cart = 'span.shopping_cart_badge'
    const ico_qtd_cart = '#shopping_cart_container > a'
    await expect(page.locator(ico_qtd_cart)).toHaveText('1')

    // Clicar no icone do carrinho
    await page.locator(ico_qtd_cart).click()

    // Verificar tá na página correta
    await expect(page).toHaveURL(/.*cart/)
    await expect(page.locator('.title')).toHaveText('Your Cart')

    // Verificar dados do produto
    await expect(page.locator('.cart_quantity')).toHaveText('1')
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack')
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99')

    // Clicar no botão de checkout
    await page.locator('#checkout').click()

    // Verificar tá na página correta
    await expect(page).toHaveURL(/.*checkout-step-one/)
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information')

    // Preencher o formulário de chekout
    await page.fill('[name="firstName"]', 'Otto')
    await page.fill('[placeholder="Last Name"]', 'Mação')
    await page.fill('[data-test="postalCode"]', '12345678')
    
    // Clicar no botão
    await page.click('#continue')

    // Verificar tá na página correta
    await expect(page).toHaveURL(/.*checkout-step-two/)
    await expect(page.locator('.title')).toHaveText('Checkout: Overview')

    // Verificar dados do produto
    await expect(page.locator('.cart_quantity')).toHaveText('1')
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack')
    await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99')
    await expect(page.locator('[data-test="payment-info-value"]')).toHaveText('SauceCard #31337')
    await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $29.99')
    await expect(page.locator('[data-test="tax-label"]')).toHaveText('Tax: $2.40')
    await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $32.39')

    // Clicar no botão
    await page.click('#finish')

    // Verificar tá na página correta
    await expect(page).toHaveURL(/.*checkout-complete/)
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!')

    // Verificar se aparece a mensagem de agradecimento
    await expect(page.locator('h2.complete-header')).toHaveText('Thank you for your order!')

})
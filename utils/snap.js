const fs = require('fs')
const path = require('path')
const playwrightConfig = require('../playwright.config')

// Armazenamento local para os snapshots
const SHOTS_DIR = process.env.SCREENSHOTS_DIR

function safe_name(name){
    // return String(name).replace(/[^\w\d-_.]+/g,'_').slice(0,120)
    return String(name).replace(/[^\w_.-]+/g, '_').slice(0,120)
}

/**
 * Salvar o screenshot quando solicitado, com nome amigável
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').TestInfo} test_info
 * @param {string} label
*/

async function snap(page, test_info, label){
    const file = `${safe_name(test_info.title)}/${safe_name(label)}.png`
    const dest = path.join(SHOTS_DIR, file)

    fs.mkdirSync(SHOTS_DIR, {recursive:true})
    await page.screenshot({path:dest, fullPage:true})   // o fullPage:true vai pegar toda a página, mesmo que não dê pra ver todo na tela
    return dest
}

module.exports={snap}   // visibilidade para todo o projeto
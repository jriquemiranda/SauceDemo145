const {defineConfig, devices} = require('@playwright/test')
const path = require('path')
const {computeRunFolder, ensureSubDirs} = require('./utils/path_tools_prof')         //  Ver aula anterior, para ajustar

// Diretórios onde ficam os artefatos
const ARTIFACTS_ROOT = path.join(__dirname, 'artifacts')    // Nome da pasta raíz
const runDir = computeRunFolder(ARTIFACTS_ROOT) //  Ver aula anterior, para ajustar
const {resultsDir, screenshotsDir} = ensureSubDirs(runDir)    //  Ver aula anterior, para ajustar

// Expõe caminhos de diretórios com variáveis de ambiente
process.env.RUN_DIR         = runDir
process.env.SCREENSHOTS_DIR = screenshotsDir

module.exports = defineConfig({
    testDir:        '.tests',   // Diretório dos testes
    timeout:        30000,  // 
    fullyParallel:  true,   // Execução em paralelo
    outputDir:      resultsDir,
    use: {
        baseURL:    'https://www.saucedemo.com',
        headless:   false,  // Exibe o browser
        
        // Politicas globais de artefatos automáticos
        screenshot: 'only-on-failure',  // Gera imagem apenas quando houver erro
        video:      'retain-on-failure',    // Mantem o vídeo apenas se houver erro
        trace:      'retain-on-failure',    // Mantem o trace apenas se houver erro
        
        // Tipos de timeout
        actionTimeout: 1500, // Aborta se nada acontecer em ms
        navigationTimeout: 20000,   // Aborta se parar o navegador

        launchOptions:{
            slowMo: 0    // espera a cada ação em ms
        }
    },
    
    projects:[
        {
            name:   'chromium',
            use:    {...devices['Desktop Chrome']}
        }
    ]
})
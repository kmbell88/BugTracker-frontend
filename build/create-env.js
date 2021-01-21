const fs = require('fs')
fs.writeFileSync('./.env', `VUE_APP_PROD_URL=${process.env.VUE_APP_PROD_URL}\nVUE_APP_WEATHERKEY=${process.env.VUE_APP_WEATHERKEY}`)
const { convertCssToScss } = require('../handlers/cssParser')

const translate = (req, res) => {
    const { css } = req.body;
    const translated = convertCssToScss(css)
    return res.status(200).json(translated)
}

module.exports = {
    translate
}


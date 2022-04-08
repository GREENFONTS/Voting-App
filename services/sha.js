const sha1 = require('sha-1')

export function sha1Generator(payload_to_sign) {
    console.log(process.env.API_SECRET, 'enetred')
    var signature = sha1(payload_to_sign, process.env.API_SECRET)
    return signature
}
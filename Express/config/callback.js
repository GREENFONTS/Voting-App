var rp = require('request-promise');

module.exports = (url, cb) => {
    if(url != 'http://localhost:4000/'){
        cb(Error('url is wrong'))
    }
    else{
        rp(url).then(data => {
            cb(null, done)
        })
        .catch(err => cb(err))
    }
}
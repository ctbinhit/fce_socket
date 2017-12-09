function config(fs) {
    return {
        url: 'https://binhcao.com',
        port: 7777,
        username: '',
        password: '',
        database: {
            host: '127.0.0.1',
            username: '',
            password: '',
            port: '',
        },
        allow_url: [
            'https://binhcao.com',
            'https://firstcoinexchange.com',
            'https://thietkewebtn.com'
        ],
        ssl_options: {
            key: fs.readFileSync('./certificate/private.key'),
            cert: fs.readFileSync('./certificate/certificate.crt'),
            ca: fs.readFileSync('./certificate/ca_bundle.crt'),
            //requestCert: true
        }
    }
}
module.exports = config;
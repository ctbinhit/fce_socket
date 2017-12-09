

 async function coinmarketcap(request) {
    var fc_url = 'https://api.coinmarketcap.com/v1/ticker/firstcoin/';
    var result = null;
    await request(fc_url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            result = JSON.parse(body);
        } else {
            console.log("Got an error: ", error, ", status code: ", response.statusCode);
            result = null;
        }
    });
    return result;
}

module.exports = coinmarketcap;
function getIpData (ip) {
  const axios = require('axios')
    axios
            .get(`http://httpServer:8081/test?ip=${ip}`)
            .then(res => {
                console.log(ip)
                console.log(`statusCode: ${res.status}`)
                console.table(res.data)
                return res.data
            })
            .catch(error => {
                console.error(error)
            })
}

module.exports = getIpData;
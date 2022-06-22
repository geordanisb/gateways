const ping = require('ping');

module.exports = class Tools{
    /*

var hosts = ['192.168.1.1', 'google.com', 'yahoo.com'];

for(let host of hosts){
     // WARNING: -i 2 argument may not work in other platform like windows
    let res = await ping.promise.probe(host, {
           timeout: 10,
           extra: ['-i', '2'],
       });
    console.log(res);
}*/
    static async PING(ipv4, timeout){
        return await ping.promise.probe(ipv4, {
            timeout            
        });
    }
}


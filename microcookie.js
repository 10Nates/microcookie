const MicroCookie = {

    /**
     * @description Get a cookie
     * @param {string} key 
     * @returns {string|undefined} value of key
     */
    get: function (key) {
        //split cookie string into separate cookies
        let cparse = document.cookie ? document.cookie.split(';') : []
        for (i=0; i<cparse.length; i++) {
            //detect desired cookie
            if (cparse[i].startsWith(key + '=')) {
                return decodeURIComponent(cparse[i].split('=')[1])
            }
        }
        return undefined
    },

    /**
     * @description Set a cookie
     * @param {string} key to prevent issues, only use alphanumeric characters
     * @param {string} value the value the key will be set to
     * @param {number} expiration Unix timestamp (seconds)
     * @returns {string} the encoded cookie string (does not need to be used)
     */
    set: function (key, value, expiration) {
        //convert timestamp to RSC spec
        let d = new Date()
        d.setTime(expiration * 1000)
        let exp = d.toUTCString()
        //encode value of key to prevent issues
        let setval = encodeURIComponent(value)
        //put it together
        let cookiestring = key + "=" + setval + "; expires=" + exp
        document.cookie = cookiestring
        return cookiestring
    },

    /**
     * @description Remove a cookie
     * @param {string} key key to be removed
     */
    remove: function (key) {
        //set cookie to expired date
        document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        return true
    },

    /**
     * @description craft a unix timestamp usable with the add function
     * @param {number} days from current date
     * @param {number} weeks from current date (7 days)
     * @param {number} months from current date (30.4375 days)
     * @param {number} years from current date (365.25 days) (going beyond 2038 is incompatible with 32 bit devices)
     * @returns {number} The calculated unix timestamp
     */
    makeExpiration: function (days, weeks, months, years) {
        //milliseconds -> seconds
        let nowsecs = Math.floor(Date.now() / 1000)
        //                                          secs in a day                secs in a week              secs in 30.4375 days             secs in 365.25 days
        let newtime = nowsecs + (days ? days * 86400 : 0) + (weeks ? weeks * 604800 : 0) + (months ? months * 2629800 : 0) + (years ? years * 31557600 : 0)
        return Math.floor(newtime)
    }
    
}
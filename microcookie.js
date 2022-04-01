/**@preserve https://github.com/10Nates/microcookie MIT*/

//Against my better judgement to use const or let, It doesn't recieve 100% compatibility on https://seedmanc.github.io/jscc/
var MicroCookie = {

    /**
     * @description Get a cookie
     * @param {string} k key
     * @returns {string|undefined} value of key
     */
    get: function (k) {
        //split cookie string into separate cookies
        var cparse = document.cookie ? document.cookie.split(/; ?/g) : []
        for (i = 0; i < cparse.length; i++) {
            //detect desired cookie
            if (cparse[i].startsWith(k + '=')) {
                return decodeURIComponent(cparse[i].split('=')[1])
            }
        }
        return undefined
    },

    /**
     * @description Set a cookie
     * @param {string} k key - to prevent issues, only use alphanumeric characters
     * @param {string} v value - what the key will be set to
     * @param {number} e expiration - Unix timestamp (seconds)
     * @param {string} p path (optional) - restricts cookie to path
     * @param {string} d domain (optional) - restricts (or loosens) cookie to subdomain
     * @param {true} s secure (optional) - only allow cookie on HTTPS connection
     * @returns {string} the encoded cookie string (does not need to be used)
     */
    set: function (k, v, e, p, d, s) {
        //convert timestamp to RSC spec
        var dt = new Date()
        dt.setTime(e * 1000)
        var expString = dt.toUTCString()
        //encode value of key to prevent issues
        var setval = encodeURIComponent(v)
        //put it together
        var cookiestring = k + "=" + setval + "; expires=" + expString + (p ? "; path=" + p : "") + (d ? "; domain=" + d : "") + (s ? "; secure" : "")
        document.cookie = cookiestring
        return cookiestring
    },

    /**
     * @description Remove a cookie
     * @param {string} k key of cookie to be removed
     * @param {string} p path (optional) - path cookie is stored to
     * @param {string} d domain (optional) - domain cookie is stored to
     */
    remove: function (k, p, d) {
        //set cookie to expired date
        this.set(k, "", 0, p, d)
    },

    /**
     * @description craft a unix timestamp usable with the add function
     * @param {number} d days from current date
     * @param {number} w weeks from current date (7 days)
     * @param {number} m months from current date (30.4375 days)
     * @param {number} y years from current date (365.25 days) (going beyond 2038 is incompatible with 32 bit devices)
     * @returns {number} The calculated unix timestamp
     */
    makeExpiration: function (d, w, m, y) {
        //milliseconds -> seconds, not using Date.now() for compatibility
        var nowsecs = Math.floor(new Date().getTime() / 1000)
        //                         secs in a day            secs in a week     secs in 30.4375 days      secs in 365.25 days
        var newtime = nowsecs + (d ? d * 86400 : 0) + (w ? w * 604800 : 0) + (m ? m * 2629800 : 0) + (y ? y * 31557600 : 0)
        return Math.floor(newtime)
    }

}
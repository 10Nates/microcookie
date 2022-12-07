/**@preserve https://github.com/10Nates/microcookie MIT*/

//Against my better judgement to use const or let, It doesn't recieve 100% compatibility on https://seedmanc.github.io/jscc/
var MicroCookie = {

    /**
     * @description Get a cookie
     * @param {string} k key
     * @returns {string|undefined} value of key
     */
    get: function (k) {
        //Simultaneously search cookies and extract value using RegEx
        var cookieRegExp = new RegExp(k + '=(.+?)(;|$)') // example=something%20something; OR example=something%20something EOS

        var find = document.cookie.match(cookieRegExp)
        return find ? decodeURIComponent(find[1]) : undefined // capture group 1
    },

    /**
     * @description Set a cookie
     * @param {string} k key - to prevent issues, only use alphanumeric characters
     * @param {string} v value - what the key will be set to
     * @param {number} e expiration - Unix timestamp (ms)
     * @param {string} p path (optional) - restricts cookie to path
     * @param {string} d domain (optional) - restricts (or loosens) cookie to subdomain
     * @param {true} s secure (optional) - only allow cookie on HTTPS connection
     * @returns {string} the encoded cookie string (does not need to be used)
     */
    set: function (k, v, e, p, d, s) {
        //convert timestamp to RSC spec
        var dt = new Date()
        dt.setTime(e)
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
     * @returns {number} The calculated unix timestamp (ms)
     */
    makeExpiration: function (d=0, w=0, m=0, y=0) { // by default 0s on everything
        //milliseconds -> seconds, not using Date.now() for compatibility
        //                current seconds                ms in a day      ms in a week    ms in 30.4375 days   ms in 365.25 days
        var newtime = Math.floor(new Date().getTime() + (d * 86400000) + (w * 604800000) + (m * 2629800000) + (y * 31557600000))
        return newtime
    }

}

/*
This is only necessary when using this as a module. 
When imported in HTML, this is not necessary and could cause compatibility issues with very old browsers.
As such, this is removed in the minified export version.
*/
module.exports = MicroCookie
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
        //var cookieRegExp = new RegExp(k + '=(.+?)(;|$)') // example=something%20something; OR example=something%20something EOS

        var find; // Combine everything in a way that Uglify couldn't figure out, reduces size
            // find = match(cookieRegExp), if find, then return decoded value of find, else return undefined
        return (find = document.cookie.match(new RegExp(k + '=(.+?)(;|$)'))) ? decodeURIComponent(find[1]) : undefined // capture group 1
    },

    /**
     * @description Set a cookie
     * @param {string} k key - to prevent issues, only use alphanumeric characters
     * @param {string} v value - what the key will be set to
     * @param {number|string|null} e expiration - Unix timestamp (ms) or date string, removed after session if initialized null
     * @param {object} o optional configuration for path, domain, secure, httpOnly, & sameSite
     * @param {string} o.path - restricts (or loosens) cookie to path
     * @param {string} o.domain - restricts (or loosens) cookie to subdomain
     * @param {true} o.secure - only allow cookie on HTTPS connection
     * @param {"None"|"Lax"|"Strict"} o.sameSite - cookie cross-site options, "None" typically requires "secure"
     * @param {true} o.httpOnly - throw out the cookie and do nothing, not recommended but has niche uses
     * @returns {string} the encoded cookie string as a receipt
     */
    set: function (k, v, e, o = {}) {
        //encode value of key to prevent issues
        var setval = encodeURIComponent(v)
        //put it together
        var cookiestring = k + "=" + setval
        // No expire is defined behavior
        //              Convert timestamp to RSC spec
        o.expires = e==null ? e : new Date(e).toUTCString()
        for (var item in o) {
            // for every objet in the array add the key value pair to the cookie string
            //                                 Does not have a value pair if boolean
            cookiestring += o[item] ? "; " + (typeof o[item] === "boolean" ? item : item + "=" + o[item]) : ""
        }
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
        this.set(k, "", 0, {path: p, domain: d})
    },

    /**
     * @description craft a unix timestamp usable with the add function
     * @param {number} d days from current date
     * @param {number} w weeks from current date (7 days)
     * @param {number} m months from current date (30.4375 days)
     * @param {number} y years from current date (365.25 days) (going beyond 2038 is incompatible with 32 bit devices)
     * @returns {number} The calculated unix timestamp (ms)
     */
    makeExpiration: function (d = 0, w = 0, m = 0, y = 0) { // by default 0s on everything
        //milliseconds -> seconds, not using Date.now() for compatibility
        //                current seconds                ms in a day      ms in a week    ms in 30.4375 days   ms in 365.25 days
        var newtime = Math.floor(new Date().getTime() + (d * 86400000) + (w * 604800000) + (m * 2629800000) + (y * 31557600000))
        return newtime
    }

}

/*
This is only necessary when using this as a module. 
When imported in HTML, this is not necessary and could cause compatibility issues with very old browsers.
As such, this is removed in the minified html version.
*/
module.exports = MicroCookie
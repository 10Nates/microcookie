/**@preserve https://github.com/10Nates/microcookie MIT*/
var MicroCookie={
/**
     * @description Get a cookie
     * @param {string} k key
     * @returns {string|undefined} value of key
     */
get:function(k){return(k=document.cookie.match(new RegExp(k+"=(.+?)(;|$)")))?decodeURIComponent(k[1]):undefined},
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
set:function(k,v,e,o={}){var n,t=k+"="+encodeURIComponent(v);for(n in o.expires=null==e?e:new Date(e).toUTCString(),o)t+=o[n]?"; "+("boolean"==typeof o[n]?n:n+"="+o[n]):"";return document.cookie=t},
/**
     * @description Remove a cookie
     * @param {string} k key of cookie to be removed
     * @param {string} p path (optional) - path cookie is stored to
     * @param {string} d domain (optional) - domain cookie is stored to
     */
remove:function(k,p,d){this.set(k,"",0,{path:p,domain:d})},
/**
     * @description craft a unix timestamp usable with the add function
     * @param {number} d days from current date
     * @param {number} w weeks from current date (7 days)
     * @param {number} m months from current date (30.4375 days)
     * @param {number} y years from current date (365.25 days) (going beyond 2038 is incompatible with 32 bit devices)
     * @returns {number} The calculated unix timestamp (ms)
     */
makeExpiration:function(d=0,w=0,m=0,y=0){return Math.floor((new Date).getTime()+864e5*d+6048e5*w+26298e5*m+315576e5*y)}};module.exports=MicroCookie;
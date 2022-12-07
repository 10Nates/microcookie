/**@preserve https://github.com/10Nates/microcookie MIT*/
var MicroCookie={
/**
     * @description Get a cookie
     * @param {string} k key
     * @returns {string|undefined} value of key
     */
get:function(k){k=new RegExp(k+"=(.+?)(;|$)"),k=document.cookie.match(k);return k?decodeURIComponent(k[1]):undefined},
/**
     * @description Set a cookie
     * @param {string} k key - to prevent issues, only use alphanumeric characters
     * @param {string} v value - what the key will be set to
     * @param {number} e expiration - Unix timestamp (ms)
     * @param {string} p path (optional) - restricts cookie to path
     * @param {string} d domain (optional) - restricts (or loosens) cookie to subdomain
     * @param {true} s secure (optional) - only allow cookie on HTTPS connection
     * @param {true} h httpOnly (optional) - do not allow cookie to be read & written to using JS after invocation
     * @param {"None"|"Lax"|"Strict"} x sameSite (optional) - cookie cross-site options, "None" typically requires "secure"
     * @returns {string} the encoded cookie string (does not need to be used)
     */
set:function(k,v,e,p,d,s,h,x){e=new Date(e).toUTCString(),k=k+"="+encodeURIComponent(v)+"; expires="+e+(p?"; path="+p:"")+(d?"; domain="+d:"")+(s?"; secure":"")+(h?"; httpOnly":"")+(x?"; sameSite="+x:"");return document.cookie=k},
/**
     * @description Remove a cookie
     * @param {string} k key of cookie to be removed
     * @param {string} p path (optional) - path cookie is stored to
     * @param {string} d domain (optional) - domain cookie is stored to
     */
remove:function(k,p,d){this.set(k,"",0,p,d)},
/**
     * @description craft a unix timestamp usable with the add function
     * @param {number} d days from current date
     * @param {number} w weeks from current date (7 days)
     * @param {number} m months from current date (30.4375 days)
     * @param {number} y years from current date (365.25 days) (going beyond 2038 is incompatible with 32 bit devices)
     * @returns {number} The calculated unix timestamp (ms)
     */
makeExpiration:function(d=0,w=0,m=0,y=0){return Math.floor((new Date).getTime()+864e5*d+6048e5*w+26298e5*m+315576e5*y)}};module.exports=MicroCookie;
/**@preserve https://github.com/10Nates/microcookie MIT*/
var MicroCookie={get:function(k){return(k=document.cookie.match(new RegExp(k+"=(.+?)(;|$)")))?decodeURIComponent(k[1]):undefined},set:function(k,v,e,o={}){var n,t=k+"="+encodeURIComponent(v);for(n in o.expires=null==e?e:new Date(e).toUTCString(),o)t+=o[n]?"; "+("boolean"==typeof o[n]?n:n+"="+o[n]):"";return document.cookie=t},remove:function(k,p,d){this.set(k,"",0,{path:p,domain:d})},makeExpiration:function(d=0,w=0,m=0,y=0){return Math.floor((new Date).getTime()+864e5*d+6048e5*w+26298e5*m+315576e5*y)}};
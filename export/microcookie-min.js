/**@preserve https://github.com/10Nates/microcookie MIT*/
var MicroCookie={get:function(k){k=new RegExp(k+"=(.+?)(;|$)"),k=document.cookie.match(k);return k?decodeURIComponent(k[1]):undefined},set:function(k,v,e,p,d,s,h,x){e=new Date(e).toUTCString(),k=k+"="+encodeURIComponent(v)+"; expires="+e+(p?"; path="+p:"")+(d?"; domain="+d:"")+(s?"; secure":"")+(h?"; httpOnly":"")+(x?"; sameSite="+x:"");return document.cookie=k},remove:function(k,p,d){this.set(k,"",0,p,d)},makeExpiration:function(d=0,w=0,m=0,y=0){return Math.floor((new Date).getTime()+864e5*d+6048e5*w+26298e5*m+315576e5*y)}};
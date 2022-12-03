# MicroCookie

[About MicroCookie](#about-microcookie) | [Installing MicroCookie](#installing-microcookie) | [Using MicroCookie](#using-microcookie) | [Npm Pmn Mnp](https://www.npmjs.com/package/microcookiepkg)

---

<br>

## About MicroCookie

<br>

### What is MicroCookie?

MicroCookie is a desert-bone-dry cookie management package (just 591 bytes minimized!) designed to be so small you don't even notice it's there. It's also [100% compatible.](https://seedmanc.github.io/jscc/)

<br>

### Why another cookie manager?

Every "simple" cookie manager I could find was much bigger than it needed to be. Additionally, the compatibility metric of all of them was ridiculously bad. 

<br>

### Why do you use "expires" instead of "max-age"?

It boils down to compatibility. Not every browser supports max-age, and some browsers throw a fit if both are given. Does it really matter in this day and age? Not really, but I've already made my decision unless something big happens.

<br>

### <span style="color:red">NOTICE</span>

- It does not currently support paths.
- npm is probably the least convenient way to use this library.
- All instructions assume you are running a Unix-based operating system. This probably won't matter if you aren't using npm.
- UglifyJS used to change reserved variable names if they were optimized out. It may reappear in the future, but it does not affect usage.

<br>

## Installing MicroCookie

<br>

### Note for npm users

MicroCookie is not currently designed for browserify, webpack, or similar programs because it is already designed for the web. As such, you cannot import MicroCookie as a module.

<br>

### Standard

Either download microcookie-min.js in the [releases tab](https://github.com/10Nates/microcookie/releases), or use one of the external sources already provided.

[Including MicroCookie in your project](#including-microcookie-in-your-project)

<br>

### Using npm

```shell
npm install uglify-js -g
npm install microcookiepkg
```

npm will automatically run the minimizing script, but if it doesn't, refer to [Minimizing MicroCookie](#minimizing-microcookie)

[Including MicroCookie in your project](#including-microcookie-in-your-project)

<br>

### Minimizing MicroCookie

The arguments used in `npm run-script ugly` are

> ```shell
> echo needed -> npm install uglify-js -g
> if [ ! -d  export ]; then mkdir export; fi
> uglifyjs microcookie.js -o export/microcookie-min.js -m reserved=\\[k,v,p,e,s,d,w,m,y\\] --comments -c passes=3
> ```

If you are using npm, it is recommended you simply run the script if it hasn't already.

[Conditional directory from pcambra](https://stackoverflow.com/questions/4906579/how-to-use-bash-to-create-a-folder-if-it-doesnt-already-exist)

<br>

### Including MicroCookie in your project

Using HTML

```html
<!-- Stored locally -->
<script src="path/to/src/microcookie-min.js"></script>

<!-- Stored locally using npm -->
<script src="node_modules/microcookiepkg/export/microcookie-min.js"></script>

<!-- Stored on my website (no garunteed reliability) -->
<script src="https://almostd.one/pkg/microcookie-min.js"></script>

<!-- Stored on jsDelivr -->
<script src="https://cdn.jsdelivr.net/gh/10Nates/microcookie@main/export/microcookie-min.js"></script>
```

Using JavaScript

```js
//https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file
//I am not using the ES6 module/CommonJS system because I intend for this package to be as compatible as possible.
var script = document.createElement("script"); // create a script DOM node
script.src = "whatever you picked for HTML but here in javascript because javascript is the future";
document.head.appendChild(script);
```

<br>

## Using MicroCookie

<br>

### Fetching a cookie

```js
/**
 * @description Get a cookie
 * @param {string} k key
 * @returns {string|undefined} value of key
 */
MicroCookie.get(k);

//example - get cookie "test"
MicroCookie.get("test");
```

<br>

### Making an expiration timestamp

```js
/**
 * @description craft a unix timestamp usable with the add function
 * @param {number} d days from current date
 * @param {number} w weeks from current date (7 days)
 * @param {number} m months from current date (30.4375 days)
 * @param {number} y years from current date (365.25 days) (going beyond 2038 is incompatible with 32 bit devices)
 * @returns {number} The calculated unix timestamp (ms)
 */
MicroCookie.makeExpiration(d, w, m, y);

//example - expiration date for 1 month and 2 weeks
MicroCookie.makeExpiration(undefined, 2, 1);
```

<br>

### Setting a cookie

```js
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
MicroCookie.set(k, v, e, p, d, s);

//example - set cookie "test" with value "This is a test!" expiring in 1 day
let expiration = MicroCookie.makeExpiration(1);
MicroCookie.set("test", "This is a test!", expiration);

//example - set cookie "test" with value "This is a test!" expiring in 1 day for all subdomains on example.com over HTTPS
MicroCookie.set("test", "This is a test!", expiration, "/", "example.com", true);
```

<br>

### Removing a cookie

```js
/**
 * @description Remove a cookie
 * @param {string} k key of cookie to be removed
 * @param {string} p path (optional) - path cookie is stored to
 * @param {string} d domain (optional) - domain cookie is stored to
 */
MicroCookie.remove(k, p, d);

//example - remove cookie "test"
MicroCookie.remove("test");
```

<br>

### Full examples

At the time of writing, there is one full example, which is available in the [`test/`](./test/) folder as [`test/testpage.html`](./test/testpage.html)

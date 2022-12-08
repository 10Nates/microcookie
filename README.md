![](https://img.shields.io/npm/v/microcookiepkg)
![](https://img.shields.io/github/size/10nates/microcookie/dist/microcookie-min.js)
![](https://img.shields.io/bundlephobia/minzip/microcookiepkg)
![](https://img.shields.io/jsdelivr/gh/hy/10nates/microcookie)

# MicroCookie

[About MicroCookie](#about-microcookie) | [Installing MicroCookie](#installing-microcookie) | [Using MicroCookie](#using-microcookie) | [NPM Package](https://www.npmjs.com/package/microcookiepkg)

---

<br>

## About MicroCookie

<br>

### What is MicroCookie?

MicroCookie is a desert-bone-dry cookie management package (just 572 bytes minimized!) designed to be so small you don't even notice it's there. It's also [100% compatible.](https://seedmanc.github.io/jscc/)

<br>

### Why another cookie manager?

Every "simple" cookie manager I could find was much bigger than it needed to be. Additionally, the compatibility metric of all of them was ridiculously bad.

<br>

### Why do you use "expires" instead of "max-age"?

It boils down to compatibility. Not every browser supports max-age, and some browsers throw a fit if both are given. Does it really matter in this day and age? Not really, but I've already made my decision unless something big happens.

<br>

### <span style="color:red">NOTICE</span>

- Only the value of the primary key of the cookie is encoded. Everything else is assumed to be clean input.
- There is no internal namespace conflict management
- This does not support HttpOnly assignment due to the limitation of being client-side JavaScript.
- This is not guaranteed to be RFC 6265 compliant. However, if you find an incompliant section, it is considered a bug.
- npm is probably the clunkiest way of using this library. It does work, though.
- All instructions assume you are running a Unix-based operating system. This probably won't matter if you aren't using npm.
- UglifyJS used to change reserved variable names if they were optimized out. It may reappear in the future, but it does not affect usage.

<br>

## Installing MicroCookie

<br>

### Note for npm users

MicroCookie is not intentionally deigned for npm as it is already designed for the web.
However, it is exported CJS-style with JSDocs excluded from minimization and should work as long as `document.cookie` is valid.

<br>

### Standard

Either download microcookie-min.js in the [releases tab](https://github.com/10Nates/microcookie/releases), or use one of the external sources already provided.

[Including MicroCookie in your project](#including-microcookie-in-your-project)

<br>

### Using npm

```shell
npm install microcookiepkg
```

This will install the pre-processed package ready for use. If you would like to make changes or contribute, view [Minimizing MicroCookie.](#minimizing-microcookie)

Otherwise, you can proceed to [Including MicroCookie in your project.](#including-microcookie-in-your-project)

<br>

### Minimizing MicroCookie

A number of npm scripts are set up in order to automate minimization and modification. The following precursors will be necessary:

```
echo "You need to install Stream EDitor using the package manager on your os if it isn't already installed, ie."
sudo apt-get install sed
echo "Uglify is necessary to minimize the package"
npm install uglify-js -g
```

Once this is installed, the following script can be run:

> ```shell
> npm run-script prepublishOnly
> ```

This will run a chain of commands that create the dist folder, minimize with separate settings for HTML and NPM,
and modify the HTML result to remove NPM-specific code. If you would like to view this in detail, it is in the [package.json](./package.json).

[Conditional directory from pcambra](https://stackoverflow.com/questions/4906579/how-to-use-bash-to-create-a-folder-if-it-doesnt-already-exist)

<br>

### Including MicroCookie in your project

Using HTML

```html
<!-- Stored locally -->
<script src="path/to/src/microcookie-min.js"></script>

<!-- Stored locally using npm -->
<script src="node_modules/microcookiepkg/dist/microcookie-min.js"></script>

<!-- Stored on my website (no garunteed reliability) -->
<script src="https://almostd.one/pkg/microcookie-min.js"></script>

<!-- Stored on jsDelivr -->
<script src="https://cdn.jsdelivr.net/gh/10Nates/microcookie@main/dist/microcookie-min.js"></script>
```

Using JavaScript directly in browser

```js
//https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file
var script = document.createElement("script"); // create a script DOM node
script.src = "path/to/microcookie-min.js";
document.head.appendChild(script);
```

Using NPM / Webpack / Browserify

```js
// This is not fully minified and as such will be larger pre-packing (but also far more commented)
const MicroCookie = require("microcookiepkg");
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
 * @param {object} o optional configuration for path, domain, secure, httpOnly, & sameSite
 * @param {string} o.path - restricts cookie to path
 * @param {string} o.domain - restricts (or loosens) cookie to subdomain
 * @param {true} o.secure - only allow cookie on HTTPS connection
 * @param {"None"|"Lax"|"Strict"} o.sameSite - cookie cross-site options, "None" typically requires "secure"
 * @returns {string} the encoded cookie string as a receipt
 */
MicroCookie.set(k, v, e, {o.path, o.domain, o.secure, o.sameSite});

//example - set cookie "test" with value "This is a test!" expiring in 1 day
let expiration = MicroCookie.makeExpiration(1);
MicroCookie.set("test", "This is a test!", expiration);

//example - set cookie "test" with value "This is a test!" expiring in 1 day for all subdomains on example.com over HTTPS only
MicroCookie.set("test", "This is a test!", expiration, {
    path: "/",
    domain: "example.com",
    secure: true
});
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

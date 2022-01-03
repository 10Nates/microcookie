# MicroCookie

[About MicroCookie](#about-microcookie) | [Installing MicroCookie](#installing-microcookie) | [Using MicroCookie](#using-microcookie) | [No More Noodles](https://www.npmjs.com/package/microcookiepkg)

---

<br>

## About MicroCookie

<br>

### What is MicroCookie?

MicroCookie is a desert-bone-dry cookie management package (just 622 bytes minimized!) designed to be so small you don't even notice it's there. It's also [100% compatible.](https://seedmanc.github.io/jscc/)

<br>

### Why another cookie manager?

Every "simple" cookie manager I could find was kilobytes in size with a bunch of quality of life features that seem to miss the mark. The hardest part about managing cookies is the jump from string to storage. If that's taken care of, everything else is a breeze.

<br>

### Why do you use "expires" instead of "max-age"?

It boils down to compatibility. Not every browser supports max-age, and some browsers throw a fit if both are given. Does it really matter in this day and age? Not really, but I've already made my decision unless something big happens.

<br>

### <span style="color:red">NOTICE</span>

- MicroCookie does not currently support paths. It may or may not support paths in the future.
- npm is probably the least convenient way to use this library.
- All instructions assume you are running a Unix-based operating system. This probably won't matter if you aren't using npm.

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
> npm install uglify-js -g
> if [ ! -d  export ]; then mkdir export
> uglifyjs microcookie.js -o export/microcookie-min.js -m reserved=\[k,v,p,e,d,w,m,y\] --comments -c passes=3
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
<script src="node_modules/microcookie/export/microcookie-min.js"></script>

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
 * @param {string} key the cookie's identifier
 * @returns {string|undefined} value of key
 */
MicroCookie.get(key);

//example - get cookie "test"
MicroCookie.get("test");
```

<br>

### Making an expiration timestamp

```js
/**
 * @description craft a unix timestamp usable with the add function
 * @param {number} days from current date
 * @param {number} weeks from current date (7 days)
 * @param {number} months from current date (30.4375 days)
 * @param {number} years from current date (365.25 days) (going beyond 2038 is incompatible with 32 bit devices)
 * @returns {number} The calculated unix timestamp
 */
MicroCookie.makeExpiration(days, weeks, months, years);

//example - expiration date for 1 month and 2 weeks
MicroCookie.makeExpiration(undefined, 2, 1);
```

<br>

### Setting a cookie

```js
/**
 * @description Set a cookie
 * @param {string} key to prevent issues, only use alphanumeric characters
 * @param {string} value the value the key will be set to
 * @param {number} expiration Unix timestamp (seconds)
 * @returns {string} the encoded cookie string (does not need to be used)
 */
MicroCookie.set(key, value, expiration);

//example - set cookie "test" with value "This is a test!" expiring in 1 day
let expiration = MicroCookie.makeExpiration(1);
MicroCookie.set("test", "This is a test!", expiration);
```

<br>

### Removing a cookie

```js
/**
 * @description Remove a cookie
 * @param {string} key key to be removed
 */
MicroCookie.remove(key);

//example - remove cookie "test"
MicroCookie.remove("test");
```

<br>

### Full examples

At the time of writing, there is one full example, which is available in the [`test/`](./test/) folder as [`test/testpage.html`](./test/testpage.html)

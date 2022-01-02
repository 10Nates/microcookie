# MicroCookie

[About MicroCookie](#about-microcookie) | [Installing MicroCookie](#installing-microcookie) | [Using MicroCookie](#using-microcookie)

-----

<br>

## About MicroCookie

<br>

### What is MicroCookie?

MicroCookie is a desert-bone-dry cookie management library designed to be so small you don't even notice it's there.

<br>

### Why another cookie manager?

Every "simple" cookie manager I could find was kilobytes in size with a bunch of quality of life features that seem to miss the mark. The hardest part about managing cookies is the jump from string to storage. If that's taken care of, everything else is a breeze.

<br>

### NOTICE

MicroCookie does not currently support paths. It may or may not support paths in the future.

<br>

## Installing MicroCookie

<br>

### Adding to your project

MicroCookie is not currently designed for npm (even though I have the package.json) so the only way to import it normally.

```html
<!-- Stored locally -->
<script src="microcookie.js"></script>

<!-- Stored on my website (no garunteed reliability) -->
<script src="https://almostd.one/pkg/microcookie-min.js"></script>

<!-- jsDelivr (if I set it up properly) -->
<script src="https://cdn.jsdelivr.net/gh/10Nates/microcookie@1.0.0/microcookie-min.js"></script>
```

<br>

### Minimize MicroCookie yourself

The arguments I used for uglifyjs were

> `uglifyjs microcookie.js -o export/microcookie-min.js -m reserved=\[key,value,path,expiration,days,weeks,months,years\]`

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
MicroCookie.remove(key)

//example - remove cookie "test"
MicroCookie.remove("test")
```

### Full examples

A the time of writing, there is one full example, which is available in the [`test/`](./test/testpage.html) folder as [`test/testpage.html`](./test/testpage.html)
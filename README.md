# cooparser

[![npm version](https://img.shields.io/npm/v/cooparser.svg?style=flat-square)](https://www.npmjs.org/package/cooparser)
[![install size](https://packagephobia.com/badge?p=cooparser)](https://packagephobia.com/result?p=cooparser)
[![npm downloads](https://img.shields.io/npm/dm/cooparser.svg?style=flat-square)](https://npm-stat.com/charts.html?package=cooparser)
[![Open Source Helpers](https://www.codetriage.com/cookie-parking/cooparser/badges/users.svg)](https://www.codetriage.com/cookie-parking/cooparser)

Sites information parser for the browser and node.js
## Table of Contents
  - [Features](#features)
  - [Installing](#installing)
  - [How to use](#how-to-use)
  - [Credits](#credits)
  - [License](#license)

## Features

- When you give the site's url to cooparser and then, cooparser will give you the object has some information about that URL
- The information from URL is title, content, link(URL), favicon, thumbnail, provider

## Installing

Using npm:

```bash
$ npm install cooparser
```

Using yarn:

```bash
$ yarn add cooparser
```

## How to use

### note
We use axios for getting data from the site.

So you should use ***async/await*** for this library.

```js
import cooparser from 'cooparser';

const getDataAboutURL = async () => {
    const data = await cooparser.parse("https://google.com");
    // You can see the object here.
    console.log(data);
}

getDataAboutURL();
```

**The response is as follows:**

```ts
{
    title: string
    content: string
    link: string
    favicon: string
    thumbnail: string
    provider: string
}
```

## Credits

The 'cooparser' could be completed with the help of **[@jhaemin](https://github.com/jhaemin).** Thank you very much to ***Haemin***.

## Contributors
-  [H.J.Lee](https://github.com/hyundang)
-  [J.W.Song](https://github.com/bluayer)


## License

[MIT](LICENSE)

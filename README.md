# regl-nwjs
Generate WebGL content with regl in nw.js and output an image

## Use

Download [nwjs](https://nwjs.io/downloads/) and put `nwjs` into `/Applications` (OS X), then

```
git clone https://github.com/monfera/regl-nwjs.git`
cd regl-nwjs
npm install
/Applications/nwjs.app/Contents/MacOS/nwjs .
```
It should bring up a nwjs window with the image, and save that image to `image.png` too.

Created to test how regl works inside nwjs for [`Plotly`](https://plot.ly/) when implementing Plotly's first `regl` based plot, [parcoords](https://github.com/plotly/plotly.js/issues/1071).
Analogous to [Étienne Tétreault-Pinard](https://github.com/etpinard)'s [mapbox-gl-in-nwjs](https://gist.github.com/etpinard/5d58ef47d65d65cd1e93d825659936af) test.

![image](https://raw.githubusercontent.com/monfera/regl-nwjs/master/image.png)
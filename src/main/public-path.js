// Because we switch on the domain name on the server to decide which
// bundle to load, we need to dynamically update the Webpack public
// path. This needs to happen before doing anything else, so this
// should be loaded right at the top of the index file. Or, perhaps
// should be an additional entrypoint?
if (window.publicPath) {
  __webpack_public_path__ = window.publicPath
}
console.debug('Setting public path to: ', window.publicPath)

import {setConfig} from 'react-hot-loader'

console.debug = (...args) => console.log(...args)

setConfig({logLevel: 'debug'})

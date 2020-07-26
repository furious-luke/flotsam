let $
let api = {}

const apiSettings = {
  headers: {
    'Content-Type': 'application/json'
  }
}

function setBearer(token) {
  if (token) {
    console.debug('Set bearer token: ', token)
    apiSettings.headers['Authorization'] = `Bearer ${token}`
  } else {
    console.debug('Clearing bearer token')
    delete apiSettings.headers['Authorization']
  }
}

function createApi(chain, $_) {
  $ = $_
  api.api = new Proxy({}, {
    get(target, prop) {
      console.debug(`Calling API.${prop} with settings: `, apiSettings)
      return chain('/graphql/', apiSettings)[prop]
    }
  })
  return api.api
}

export default api
export {
  $,
  createApi,
  setBearer
}

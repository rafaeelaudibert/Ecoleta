// eslint-disable-next-line no-process-env
const { REACT_APP_API_ENDPOINT, REACT_APP_ASSETS_PATH } = process.env

const config = {
  apiEndpoint: REACT_APP_API_ENDPOINT as string,
  assetsPath: REACT_APP_ASSETS_PATH as string
}

export default config

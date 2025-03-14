export function getAssetURL(url) {
  return new URL('../../' + url, import.meta.url).href
  
}
import { isSafari } from './detector'

const itemRarity = [3, 3, 4, 4, 5, 5]
const meteorList = [
  'bg.webm',
  '3star-single.mp4',
  '4star-single.mp4',
  '4star-multi.mp4',
  '5star-single.mp4',
  '5star-multi.mp4'
]

export const safariMeteorLoaded = () => {
  let arr = []
  meteorList.forEach((vid) => arr.push({ url: `/videos/${vid}`, name: vid }))
  return arr
}

export const loadAnimation = async (rarity, progress, tolItem, itemIndex) => {
  const results = []
  const totalItem = meteorList.length
  for (let i = 0; i < totalItem; i++) {
    // set
    rarity.value = itemRarity[i]
    progress.value = 0
    tolItem.value = totalItem
    itemIndex.value = i

    const response = await fetch(`/videos/${meteorList[i]}`)
    const data = new Response(streamResponse(response, progress))
    const blob = await data.blob()

    // save to index db
    // wait indexedDB.put

    const DOMURL = window.URL || window.webkitURL
    const blobUrl = DOMURL.createObjectURL(blob)
    const resultObj = { url: blobUrl, name: meteorList[i] }
    results.push(resultObj)
  }

  return results
}

const streamResponse = (response, progress) => {
  const contentLength = response.headers.get('content-length')
  return new ReadableStream({
    start(controller) {
      const reader = response.body.getReader()
      readStream(controller, reader, contentLength, progress)
    }
  })
}

let loaded = 0
const readStream = (controller, reader, contentLength, progress) => {
  reader.read().then((progressEvent) => {
    if (progressEvent.done) {
      controller.close()
      loaded = 0
      return
    }

    loaded += progressEvent.value.byteLength
    progress.value = Math.round((loaded / contentLength) * 100)
    controller.enqueue(progressEvent.value)
    readStream(controller, reader, contentLength, progress)
  })
}

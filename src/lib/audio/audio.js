import { Howl } from 'howler'

import bookflip from './bookflip'
import changebanner from './changebanner'
import close from './close'
import click from './click'
import click2 from './click2'
import collectionitem from './collectionitem'
import exchange from './exchange'
import modal from './modal'
import obtain from './obtain'
import roll from './roll'
import inventory from './inventory'
import history from './history'
import camera from './camera'
import shopopen from './shopopen'
import shopnav from './shopnav'
import shopsubnav from './shopsubnav'
import prevbanner from './prevbanner'

const source = {
  bookflip,
  changebanner,
  close,
  click,
  click2,
  collectionitem,
  exchange,
  modal,
  obtain,
  roll,
  inventory,
  history,
  camera,
  shopopen,
  shopnav,
  shopsubnav,
  prevbanner,
  wishBacksound: '/sfx/wish-backsound.ogg',
  resultList: '/sfx/result-list.ogg',
  reveal3Star: '/sfx/reveal-3star.ogg',
  reveal4Star: '/sfx/reveal-4star.ogg',
  reveal5Star: '/sfx/reveal-5star.ogg'
}

const sounds = {}
const soundInit = () => {
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return
  Object.keys(source).forEach((key) => {
    sounds[key] = new Howl({
      src: [source[key]],
      loop: key === 'wishBacksound'
    })
  })
}

soundInit()

export const play = (sfxName = 'click') => {
  try {
    if (!sounds[sfxName]) throw new Error('no sound effect for ' + sfxName)
    if (sfxName === 'wishBacksound' && sounds[sfxName].playing()) return
    return sounds[sfxName].play()
  } catch (e) {
    console.error('unable to play sfx: ', e.message)
  }
}

export const pause = (sfxName) => {
  try {
    if (sfxName.includes('reveal')) return sounds[sfxName].stop()
    sounds[sfxName].pause()
    return
  } catch (e) {
    console.log('unable to pause sfx: ', sfxName)
  }
}

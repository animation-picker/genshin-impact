import { w as writable } from "./index2.js";
const version = "4.3";
const wishPhase = 2;
const initialAmount = {
  primogem: 1e4,
  fates: 1e4,
  genesis: 1e4,
  shareReward: 1e4
};
const probabilityRates = {
  "character-event": {
    baseRate5: 0.6,
    max5: 90,
    hard5: 74,
    baseRate4: 5.1,
    max4: 10,
    hard4: 9,
    winRate: 50,
    charRate: 50
  },
  "weapon-event": {
    baseRate5: 0.7,
    max5: 80,
    hard5: 63,
    baseRate4: 6.6,
    max4: 10,
    hard4: 9,
    winRate: 75,
    charRate: 50,
    selectedRate: 50
  },
  standard: {
    baseRate5: 0.6,
    max5: 90,
    hard5: 74,
    baseRate4: 5.1,
    max4: 10,
    hard4: 9,
    charRate: 50
  }
};
const { fates, genesis: igen, primogem: ipri } = initialAmount;
const preloadVersion = writable({ patch: version, phase: wishPhase });
const activeVersion = writable({ patch: version, phase: wishPhase });
const bannerList = writable([]);
const activeBanner = writable(0);
const showBeginner = writable(true);
const beginnerRemaining = writable(20);
const isFatepointSystem = writable(false);
const course = writable({ selected: null, point: 0 });
const primogem = writable(ipri);
const acquaint = writable(fates);
const intertwined = writable(fates);
const stardust = writable(0);
const starglitter = writable(0);
const wishAmount = writable("default");
const multipull = writable(10);
const proUser = writable(false);
const mobileMode = writable(false);
const isMobile = writable(false);
const isPWA = writable(false);
const viewportHeight = writable(0);
const viewportWidth = writable(0);
const notice = writable([]);
const assets = writable([]);
const toastMsg = writable([]);
const editorMode = writable(false);
const editID = writable(0);
const customData = writable({});
const isCustomBanner = writable(false);
const memberList = writable([]);
export {
  multipull as A,
  preloadVersion as B,
  proUser as C,
  customData as D,
  initialAmount as E,
  viewportHeight as a,
  isPWA as b,
  memberList as c,
  assets as d,
  beginnerRemaining as e,
  activeBanner as f,
  bannerList as g,
  activeVersion as h,
  isMobile as i,
  course as j,
  isFatepointSystem as k,
  acquaint as l,
  mobileMode as m,
  notice as n,
  intertwined as o,
  probabilityRates as p,
  editorMode as q,
  starglitter as r,
  showBeginner as s,
  toastMsg as t,
  stardust as u,
  viewportWidth as v,
  wishAmount as w,
  primogem as x,
  isCustomBanner as y,
  editID as z
};

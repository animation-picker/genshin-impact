import { c as create_ssr_component, a as subscribe, f as createEventDispatcher, o as onDestroy, e as escape, d as add_attribute, v as validate_component, h as compute_slots, g as getContext, j as null_to_empty, k as each, s as setContext, l as is_promise, n as noop, p as set_store_value, m as missing_component } from "../../chunks/index.js";
import { p as page } from "../../chunks/stores.js";
import { w as writable } from "../../chunks/index2.js";
import hotkeys from "hotkeys-js";
import { p as probabilityRates, t as toastMsg, n as notice, d as assets, e as beginnerRemaining, s as showBeginner, f as activeBanner, g as bannerList, h as activeVersion, j as course, k as isFatepointSystem, a as viewportHeight, m as mobileMode, w as wishAmount, l as acquaint, o as intertwined, q as editorMode, b as isPWA, i as isMobile, r as starglitter, u as stardust, x as primogem, y as isCustomBanner, z as editID, A as multipull, B as preloadVersion, C as proUser, D as customData, v as viewportWidth } from "../../chunks/app-stores.js";
import { l as localrate, p as playSfx, a as localPity, r as rollCounter, o as owneditem, I as Icon$1, b as positionToStyle, i as isNewOutfitReleased, S as SVGIcon, c as Item_info, f as fatepointManager, d as localConfig, e as localBalance, W as WishResult, g as pauseSfx, h as dailyWelkin } from "../../chunks/WishResult.js";
import { m as memberDB } from "../../chunks/member-loader.js";
import { a as API_HOST, A as APP_TITLE } from "../../chunks/env.js";
import "idb";
import { Y, D, o as oe } from "../../chunks/runtime.esm.js";
import "overlayscrollbars";
import { B as ButtonModal } from "../../chunks/ButtonModal.js";
import { B as ButtonGeneral } from "../../chunks/ButtonGeneral.js";
import "howler";
import "zoomist";
import "html-to-image";
const onlyStandard = [
  "amber",
  "kaeya",
  "lisa"
];
const data$1 = [
  {
    itemID: 164,
    name: "chevreuse",
    vision: "pyro",
    rarity: 4,
    release: "4.3-2",
    offset: {
      splashArt: {
        x: -0.49195710455764075,
        y: -10.837801608579088,
        scale: 1.09
      },
      wishCard: {
        x: 7.69894534995206,
        y: 21.16331096196868,
        scale: 7.91
      }
    }
  },
  {
    itemID: 162,
    name: "navia",
    vision: "geo",
    rarity: 5,
    offset: {
      splashArt: {
        x: -5.14436090225564,
        y: -0.968421052631579,
        scale: 1.48
      },
      wishCard: {
        x: -82.53611556982344,
        y: 68.28539325842696,
        scale: 10.9
      },
      button: {
        l: 55,
        w: 110,
        t: 35
      }
    }
  },
  {
    itemID: 160,
    name: "furina",
    vision: "hydro",
    rarity: 5,
    offset: {
      splashArt: {
        x: -3.4444444444444446,
        y: -11.197368421052632,
        scale: 2.08
      },
      wishCard: {
        x: -69.38581608415338,
        y: 31.947743467933492,
        scale: 13.73
      },
      button: {
        l: 52,
        w: 130,
        t: 35
      }
    }
  },
  {
    itemID: 159,
    name: "charlotte",
    vision: "cryo",
    rarity: 4,
    release: "4.2-1",
    offset: {
      splashArt: {
        x: 0.1495956873315364,
        y: -3.9474393530997305,
        scale: 1.1
      },
      wishCard: {
        x: -2.2293858160841533,
        y: 39.605700712589076,
        scale: 7.9
      }
    }
  },
  {
    itemID: 71,
    name: "wriothesley",
    vision: "cryo",
    rarity: 5,
    offset: {
      splashArt: {
        x: -3.888888888888889,
        y: 2.038011695906433,
        scale: 1.56
      },
      wishCard: {
        x: -62.076688157448245,
        y: 80.78859857482186,
        scale: 12.43
      },
      button: {
        l: 50,
        w: 120,
        t: 25
      }
    }
  },
  {
    itemID: 70,
    name: "neuvillette",
    vision: "hydro",
    rarity: 5,
    offset: {
      splashArt: {
        x: -2.5891812865497075,
        y: -1.637426900584795,
        scale: 1.45
      },
      wishCard: {
        x: -12.846963013233797,
        y: 71.27553444180522,
        scale: 12.02
      },
      button: {
        l: 54,
        w: 105,
        t: 20
      }
    }
  },
  {
    itemID: 69,
    name: "freminet",
    vision: "cryo",
    rarity: 4,
    release: "4.0-2",
    offset: {
      splashArt: {
        x: -4.552631578947368,
        y: 3.0877192982456143,
        scale: 1.5
      },
      wishCard: {
        x: -106.73566338649474,
        y: 54.09738717339667,
        scale: 9.56
      }
    }
  },
  {
    itemID: 68,
    name: "lynette",
    vision: "anemo",
    rarity: 4,
    release: "4.0-1",
    offset: {
      splashArt: {
        x: 1.1023391812865497,
        y: 0.10964912280701754,
        scale: 1.36
      },
      wishCard: {
        x: 2.646759416355616,
        y: 47.96199524940617,
        scale: 8.03
      }
    }
  },
  {
    itemID: 67,
    name: "lyney",
    vision: "pyro",
    rarity: 5,
    offset: {
      splashArt: {
        x: -1.8581871345029242,
        y: 2.621345029239766,
        scale: 1.76
      },
      wishCard: {
        x: -37.45164574143197,
        y: 65,
        scale: 12.4
      },
      button: {
        l: 55,
        w: 105,
        t: 20
      }
    }
  },
  {
    itemID: 66,
    name: "kirara",
    vision: "dendro",
    rarity: 4,
    release: "3.7-1",
    offset: {
      splashArt: {
        x: -0.5701754385964912,
        y: 10.7953216374269,
        scale: 1.52
      },
      wishCard: {
        x: 52.96572785883949,
        y: 87.36579572446556,
        scale: 10.5
      }
    }
  },
  {
    itemID: 65,
    name: "baizhu",
    vision: "dendro",
    rarity: 5,
    offset: {
      splashArt: {
        x: 0.381578947368421,
        y: 9.837719298245615,
        scale: 1.51
      },
      wishCard: {
        x: 64.92704445198507,
        y: 75.93824228028502,
        scale: 11.26
      },
      button: {
        l: 50,
        w: 105,
        t: 35
      }
    }
  },
  {
    itemID: 64,
    name: "kaveh",
    vision: "dendro",
    rarity: 4,
    release: "3.6-2",
    offset: {
      splashArt: {
        x: -0.618421052631579,
        y: -1.752923976608187,
        scale: 1.24
      },
      wishCard: {
        x: -5.039022734984731,
        y: 84.58669833729216,
        scale: 10.12
      }
    }
  },
  {
    itemID: 63,
    name: "mika",
    vision: "cryo",
    rarity: 4,
    release: "3.5-2",
    offset: {
      splashArt: {
        x: 0.638888888888889,
        y: -1.6944444444444442,
        scale: 1.09
      },
      wishCard: {
        x: 37.90973871733967,
        y: 52.26128266033254,
        scale: 7.23
      }
    }
  },
  {
    itemID: 62,
    name: "dehya",
    vision: "pyro",
    rarity: 5,
    offset: {
      splashArt: {
        x: -2.3304093567251463,
        y: -0.3494152046783626,
        scale: 1.72
      },
      wishCard: {
        x: -10.831353919239906,
        y: 74.64133016627078,
        scale: 13.16
      },
      button: {
        w: 130,
        t: 24,
        l: 55
      }
    }
  },
  {
    itemID: 61,
    name: "alhaitham",
    vision: "dendro",
    rarity: 5,
    offset: {
      splashArt: {
        x: 0.09502923976608187,
        y: -1.4181286549707601,
        scale: 1.28
      },
      wishCard: {
        x: -6.65761791652528,
        y: 77.5059382422803,
        scale: 9.98
      },
      button: {
        w: 130,
        t: 24,
        l: 55
      }
    }
  },
  {
    itemID: 60,
    name: "yaoyao",
    vision: "dendro",
    rarity: 4,
    release: "3.4-1",
    offset: {
      splashArt: {
        x: -2.118421052631579,
        y: -2.416666666666667,
        scale: 1.2
      },
      wishCard: {
        x: -21.072276891754328,
        y: 34.06175771971496,
        scale: 5.94
      }
    }
  },
  {
    itemID: 59,
    name: "wanderer",
    vision: "anemo",
    rarity: 5,
    offset: {
      splashArt: {
        x: 2.8084795321637426,
        y: -0.9035087719298245,
        scale: 1.33
      },
      wishCard: {
        x: -10.851713607058025,
        y: 57.80522565320665,
        scale: 9.34
      },
      button: {
        w: 120,
        t: 27
      }
    }
  },
  {
    itemID: 58,
    name: "faruzan",
    vision: "anemo",
    rarity: 4,
    release: "3.3-1",
    offset: {
      splashArt: {
        x: 0.7763157894736842,
        y: -3.3362573099415203,
        scale: 1.32
      },
      wishCard: {
        x: 29.27723108245674,
        y: 52.073634204275535,
        scale: 7.97
      }
    }
  },
  {
    itemID: 57,
    name: "layla",
    vision: "cryo",
    rarity: 4,
    release: "3.2-2",
    offset: {
      splashArt: {
        x: 2.103801169590643,
        y: -2.5350877192982457,
        scale: 1.19
      },
      wishCard: {
        x: 2.9216152019002375,
        y: 42.89786223277909,
        scale: 6.7
      }
    }
  },
  {
    itemID: 56,
    name: "nahida",
    vision: "dendro",
    rarity: 5,
    offset: {
      splashArt: {
        x: 0.7383040935672515,
        y: -1.6695906432748537,
        scale: 1.53
      },
      wishCard: {
        x: 41.136749236511704,
        y: 35.771971496437054,
        scale: 9.94
      },
      button: {
        w: 130,
        t: 30
      }
    }
  },
  {
    itemID: 55,
    name: "nilou",
    vision: "hydro",
    rarity: 5,
    offset: {
      splashArt: {
        x: -2.320175438596491,
        y: -1.6754385964912282,
        scale: 1.44
      },
      wishCard: {
        x: -18.50695622667119,
        y: 59.363420427553436,
        scale: 9.74
      },
      button: {
        w: 145,
        t: 35,
        l: 55
      }
    }
  },
  {
    itemID: 54,
    name: "cyno",
    vision: "electro",
    rarity: 5,
    offset: {
      splashArt: {
        x: 3.491228070175439,
        y: -9.956140350877192,
        scale: 1.36
      },
      wishCard: {
        x: -0.01017984390906006,
        y: 42.16627078384798,
        scale: 9.55
      },
      button: {
        w: 160,
        t: 35,
        l: 55
      }
    }
  },
  {
    itemID: 53,
    name: "candace",
    vision: "hydro",
    rarity: 4,
    release: "3.1-1",
    offset: {
      splashArt: {
        x: -1.3814016172506738,
        y: -1.04177897574124,
        scale: 1.44
      },
      wishCard: {
        x: -21.004815409309792,
        y: 46.05842696629214,
        scale: 9.3
      }
    }
  },
  {
    itemID: 52,
    name: "dori",
    vision: "electro",
    rarity: 4,
    release: "3.0-2",
    offset: {
      splashArt: {
        scale: 1.36
      },
      wishCard: {
        x: -27.02748557855446,
        y: 49.93586698337292,
        scale: 7.46
      }
    }
  },
  {
    itemID: 51,
    name: "tighnari",
    vision: "dendro",
    rarity: 5,
    offset: {
      splashArt: {
        x: -1.5555555555555556,
        y: -1.3362573099415207,
        scale: 1.2
      },
      wishCard: {
        x: 1.170682049541907,
        y: 61.194774346793345,
        scale: 7.84
      },
      button: {
        w: 95,
        t: 35,
        l: 30
      }
    }
  },
  {
    itemID: 50,
    name: "collei",
    vision: "dendro",
    rarity: 4,
    release: "3.0-1",
    offset: {
      splashArt: {
        x: -0.31725146198830406,
        y: -4.959064327485381,
        scale: 1.31
      },
      wishCard: {
        x: 66.53545978961655,
        y: 38.87648456057007,
        scale: 8.42
      }
    }
  },
  {
    itemID: 49,
    name: "shikanoin-heizou",
    vision: "anemo",
    rarity: 4,
    release: "2.8-1",
    offset: {
      splashArt: {
        x: 3.675438596491228,
        y: -1.1140350877192984,
        scale: 1.21
      },
      wishCard: {
        x: -2.3006447234475735,
        y: 44.09263657957245,
        scale: 7.27
      }
    }
  },
  {
    itemID: 48,
    name: "kuki-shinobu",
    vision: "electro",
    rarity: 4,
    release: "2.7-2",
    offset: {
      splashArt: {
        x: 1.5526315789473684,
        y: -0.12719298245614036,
        scale: 1.28
      },
      wishCard: {
        x: -29.491007804547,
        y: 48.66270783847981,
        scale: 8.03
      }
    }
  },
  {
    itemID: 47,
    name: "yelan",
    vision: "hydro",
    rarity: 5,
    offset: {
      splashArt: {
        x: 0.43713450292397665,
        y: -5.400584795321637,
        scale: 1.24
      },
      wishCard: {
        x: 22.212419409569055,
        y: 59.54394299287411,
        scale: 9.19
      },
      button: {
        w: 100,
        t: 32,
        l: 50
      }
    }
  },
  {
    itemID: 46,
    name: "kamisato-ayato",
    vision: "hydro",
    rarity: 5,
    offset: {
      splashArt: {
        x: 5.092105263157895,
        y: 0.9590643274853801,
        scale: 1.41
      },
      wishCard: {
        x: 35.41567695961995,
        y: 74.40380047505938,
        scale: 10.5
      },
      button: {
        w: 140,
        t: 35,
        l: 50
      }
    }
  },
  {
    itemID: 45,
    name: "yae-miko",
    vision: "electro",
    rarity: 5,
    offset: {
      splashArt: {
        x: -3.988304093567251,
        y: -1.3157894736842104,
        scale: 1.21
      },
      wishCard: {
        x: -33.15575161180862,
        y: 62.634204275534444,
        scale: 8.44
      },
      button: {
        w: 170,
        t: 24,
        l: 50
      }
    }
  },
  {
    itemID: 44,
    name: "shenhe",
    vision: "cryo",
    rarity: 5,
    offset: {
      splashArt: {
        x: -6.16812865497076,
        y: -4.779239766081871,
        scale: 1.44
      },
      wishCard: {
        x: -62.544960977265006,
        y: 58.826603325415675,
        scale: 9.93
      },
      button: {
        w: 170,
        t: 20,
        l: 30
      }
    }
  },
  {
    itemID: 43,
    name: "yun-jin",
    vision: "geo",
    rarity: 4,
    release: "2.4-1",
    offset: {
      splashArt: {
        x: 0.3669590643274853,
        y: -1.6871345029239766,
        scale: 1.2
      },
      wishCard: {
        x: 9.100780454699695,
        y: 49.19239904988124,
        scale: 6.53
      }
    }
  },
  {
    itemID: 42,
    name: "arataki-itto",
    vision: "geo",
    rarity: 5,
    offset: {
      splashArt: {
        x: 2.3187134502923974,
        y: -1.5526315789473684,
        scale: 1.38
      },
      wishCard: {
        x: 29.98982015609094,
        y: 66.81710213776722,
        scale: 9.98
      },
      button: {
        w: 190,
        t: 30,
        l: 50
      }
    }
  },
  {
    itemID: 41,
    name: "gorou",
    vision: "geo",
    rarity: 4,
    release: "2.3-2",
    offset: {
      splashArt: {
        x: 3.1052631578947367,
        y: -0.9312865497076023,
        scale: 1.28
      },
      wishCard: {
        x: 35.54801493043773,
        y: 49.82422802850356,
        scale: 8.36
      }
    }
  },
  {
    itemID: 40,
    name: "thoma",
    vision: "pyro",
    rarity: 4,
    release: "2.2-2",
    offset: {
      splashArt: {
        x: -1.2514619883040936,
        y: 0.8391812865497077,
        scale: 1.36
      },
      wishCard: {
        x: 40.6277570410587,
        y: 58.20902612826604,
        scale: 8.41
      }
    }
  },
  {
    itemID: 39,
    name: "sangonomiya-kokomi",
    vision: "hydro",
    rarity: 5,
    offset: {
      splashArt: {
        x: 2.7222222222222223,
        y: 2.41812865497076,
        scale: 1.21
      },
      wishCard: {
        x: 20.746521886664404,
        y: 53.70071258907364,
        scale: 7.460000000000001
      },
      button: {
        w: 180,
        t: 25,
        l: 55
      }
    }
  },
  {
    itemID: 38,
    name: "raiden-shogun",
    vision: "electro",
    rarity: 5,
    offset: {
      splashArt: {
        x: 2.3406432748538015,
        y: -2.334795321637427,
        scale: 1.29
      },
      wishCard: {
        x: 13.172718018323717,
        y: 54.24228028503564,
        scale: 8.77
      },
      button: {
        w: 160,
        t: 5
      }
    }
  },
  {
    itemID: 37,
    name: "kujou-sara",
    vision: "electro",
    rarity: 4,
    release: "2.1-1",
    offset: {
      splashArt: {
        x: 4.29093567251462,
        y: -0.3421052631578947,
        scale: 1.31
      },
      wishCard: {
        x: 28.22870715982355,
        y: 73.31591448931117,
        scale: 9.45
      }
    }
  },
  {
    itemID: 36,
    name: "yoimiya",
    vision: "pyro",
    rarity: 5,
    offset: {
      splashArt: {
        x: -3.887426900584795,
        y: -5.245614035087719,
        scale: 1.5
      },
      wishCard: {
        x: -14.211062097047847,
        y: 40.53681710213777,
        scale: 8.27
      },
      button: {
        w: 150,
        t: 20,
        l: 40
      }
    }
  },
  {
    itemID: 35,
    name: "sayu",
    vision: "anemo",
    rarity: 4,
    release: "2.0-2",
    offset: {
      splashArt: {
        x: -2.3596491228070176,
        y: -6.853801169590644,
        scale: 1.5
      },
      wishCard: {
        x: -71.29962673905668,
        y: 42.02612826603326,
        scale: 8.87
      }
    }
  },
  {
    itemID: 34,
    name: "kamisato-ayaka",
    vision: "cryo",
    rarity: 5,
    offset: {
      splashArt: {
        x: 1.8669590643274854,
        y: -3.818713450292398,
        scale: 1.61
      },
      wishCard: {
        x: 14.292500848320325,
        y: 51.496437054631826,
        scale: 12.67
      },
      button: {
        w: 82,
        t: 32
      }
    }
  },
  {
    itemID: 33,
    name: "kaedehara-kazuha",
    vision: "anemo",
    rarity: 5,
    offset: {
      splashArt: {
        x: -1.4853801169590644,
        y: 2.1505847953216377,
        scale: 1.33
      },
      wishCard: {
        x: 21.418391584662366,
        y: 70.61520190023754,
        scale: 9.52
      },
      button: {
        w: 110,
        t: 32
      }
    }
  },
  {
    itemID: 32,
    name: "eula",
    vision: "cryo",
    rarity: 5,
    offset: {
      splashArt: {
        x: 3.56140350877193,
        y: -1.8128654970760234,
        scale: 1.34
      },
      wishCard: {
        x: 6.118086189345096,
        y: 64.99287410926365,
        scale: 9.74
      },
      button: {
        w: 140,
        t: 32
      }
    }
  },
  {
    itemID: 31,
    name: "yanfei",
    vision: "pyro",
    rarity: 4,
    release: "1.5-1",
    offset: {
      splashArt: {
        x: 7.014619883040934,
        y: -0.15789473684210528,
        scale: 1.46
      },
      wishCard: {
        x: 169.04648795385137,
        y: 59.320665083135395,
        scale: 8.9
      }
    }
  },
  {
    itemID: 30,
    name: "rosaria",
    vision: "cryo",
    rarity: 4,
    release: "1.4-2",
    offset: {
      splashArt: {
        x: -0.608187134502924,
        y: -5.552631578947368,
        scale: 1.24
      },
      wishCard: {
        x: 11.309806582965727,
        y: 64.11163895486936,
        scale: 8.95
      }
    }
  },
  {
    itemID: 29,
    name: "hu-tao",
    vision: "pyro",
    rarity: 5,
    offset: {
      splashArt: {
        x: -3.0453216374269,
        y: 2.6067251461988303,
        scale: 1.64
      },
      wishCard: {
        x: -139.93213437393962,
        y: 55.42992874109264,
        scale: 11.75
      },
      button: {
        w: 160,
        t: 22
      }
    }
  },
  {
    itemID: 28,
    name: "xiao",
    vision: "anemo",
    rarity: 5,
    offset: {
      splashArt: {
        x: -0.4035087719298246,
        y: -17.27777777777778,
        scale: 1.56
      },
      wishCard: {
        x: 14.475738038683408,
        y: 17.52256532066508,
        scale: 9.55
      },
      button: {
        w: 120,
        t: 30,
        l: 50
      }
    }
  },
  {
    itemID: 27,
    name: "ganyu",
    vision: "cryo",
    rarity: 5,
    offset: {
      splashArt: {
        x: 2.703216374269006,
        y: -2.995614035087719,
        scale: 1.36
      },
      wishCard: {
        x: 14.577536477774009,
        y: 54.7790973871734,
        scale: 8.03
      },
      button: {
        w: 200,
        t: 25
      }
    }
  },
  {
    itemID: 26,
    name: "albedo",
    vision: "geo",
    rarity: 5,
    offset: {
      splashArt: {
        x: 0.35233918128654973,
        y: -3.8289473684210527,
        scale: 1.59
      },
      wishCard: {
        x: -44.16016287750254,
        y: 57.07600950118764,
        scale: 11.09
      },
      button: {
        w: 170,
        t: 28,
        l: 50
      }
    }
  },
  {
    itemID: 25,
    name: "zhongli",
    vision: "geo",
    rarity: 5,
    offset: {
      splashArt: {
        x: 4.168128654970761,
        y: -8.782163742690058,
        scale: 1.61
      },
      wishCard: {
        x: 41.58466236851035,
        y: 43.56294536817102,
        scale: 8.92
      },
      button: {
        w: 120,
        t: 25,
        l: 70
      }
    }
  },
  {
    itemID: 24,
    name: "xinyan",
    vision: "pyro",
    rarity: 4,
    release: "1.1-2",
    offset: {
      splashArt: {
        x: -2.2017543859649122,
        y: -3.8976608187134505,
        scale: 1.6
      },
      wishCard: {
        x: -8.245673566338649,
        y: 48.96912114014252,
        scale: 11.1
      }
    }
  },
  {
    itemID: 23,
    name: "tartaglia",
    vision: "hydro",
    rarity: 5,
    offset: {
      splashArt: {
        x: 9.15204678362573,
        y: -13.576023391812866,
        scale: 1.73
      },
      wishCard: {
        x: 67.8486596538853,
        y: 43.60095011876485,
        scale: 13.21
      },
      button: {
        w: 160,
        t: 22
      }
    }
  },
  {
    itemID: 22,
    name: "diona",
    vision: "cryo",
    rarity: 4,
    release: "1.1-1",
    offset: {
      splashArt: {
        scale: 1
      },
      wishCard: {
        x: 53.44418052256532,
        y: 39.942992874109265,
        scale: 5.48
      }
    }
  },
  {
    itemID: 21,
    name: "klee",
    vision: "pyro",
    rarity: 5,
    offset: {
      splashArt: {
        scale: 1
      },
      wishCard: {
        x: -3.37970817780794,
        y: 20.831353919239906,
        scale: 5.18
      },
      button: {
        w: 110,
        t: 32
      }
    }
  },
  {
    itemID: 20,
    name: "venti",
    vision: "anemo",
    rarity: 5,
    offset: {
      splashArt: {
        x: -2.776315789473684,
        y: -3.442982456140351,
        scale: 1.35
      },
      wishCard: {
        x: 33.0335934848999,
        y: 43.27553444180523,
        scale: 7.8
      },
      button: {
        w: 180,
        t: 30,
        l: 50
      }
    }
  },
  {
    itemID: 19,
    name: "keqing",
    vision: "electro",
    rarity: 5,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -7.773391812865498,
        y: -3.5029239766081877,
        scale: 1.4
      },
      wishCard: {
        x: -52.00882253138786,
        y: 55.12351543942992,
        scale: 8.41
      },
      button: {
        w: 150,
        t: 22,
        l: 50
      }
    }
  },
  {
    itemID: 18,
    name: "mona",
    vision: "hydro",
    rarity: 5,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -1.1023391812865497,
        y: -0.4473684210526315,
        scale: 1.6
      },
      wishCard: {
        x: 10.902612826603326,
        y: 52.65320665083135,
        scale: 10.88
      }
    }
  },
  {
    itemID: 17,
    name: "qiqi",
    vision: "cryo",
    rarity: 5,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: 1.7865497076023393,
        y: -6.584795321637427,
        scale: 1.31
      },
      wishCard: {
        x: 0.1526976586359009,
        y: 32.69121140142518,
        scale: 7.84
      },
      button: {
        w: 100,
        t: 30
      }
    }
  },
  {
    itemID: 16,
    name: "diluc",
    vision: "pyro",
    rarity: 5,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -7.963450292397662,
        y: -22.713450292397663,
        scale: 1.93
      },
      wishCard: {
        x: -75.45300305395317,
        y: 17.840855106888363,
        scale: 11.36
      }
    }
  },
  {
    itemID: 15,
    name: "jean",
    vision: "anemo",
    rarity: 5,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: 2.7412280701754383,
        y: -3.0804093567251463,
        scale: 1.36
      },
      wishCard: {
        x: 32.412623006447234,
        y: 61.74109263657957,
        scale: 9.17
      },
      button: {
        w: 90,
        t: 35,
        l: 55
      }
    }
  },
  {
    itemID: 14,
    name: "sucrose",
    vision: "anemo",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -0.9181286549707602,
        y: -4.638888888888889,
        scale: 1.19
      },
      wishCard: {
        x: -4.886325076348829,
        y: 55.403800475059384,
        scale: 8
      }
    }
  },
  {
    itemID: 13,
    name: "chongyun",
    vision: "cryo",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -9.397660818713451,
        y: -2.641812865497076,
        scale: 1.33
      },
      wishCard: {
        x: -58.33050559891415,
        y: 52.65320665083135,
        scale: 8.6
      }
    }
  },
  {
    itemID: 12,
    name: "noelle",
    vision: "geo",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -1.2266081871345031,
        y: -2.2002923976608186,
        scale: 1.2
      },
      wishCard: {
        x: -40.84153376314896,
        y: 56.8978622327791,
        scale: 7.08
      },
      button: {
        w: 100,
        t: 30
      }
    }
  },
  {
    itemID: 11,
    name: "bennett",
    vision: "pyro",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -1.196765498652291,
        y: -6.913746630727763,
        scale: 1.2
      },
      wishCard: {
        x: -73.58908507223114,
        y: 34.95505617977528,
        scale: 7.19
      }
    }
  },
  {
    itemID: 10,
    name: "fischl",
    vision: "electro",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -0.10818713450292397,
        y: -13.786549707602338,
        scale: 1.3
      },
      wishCard: {
        x: -41.808618934509674,
        y: 31.313539192399055,
        scale: 7.32
      }
    }
  },
  {
    itemID: 9,
    name: "ningguang",
    vision: "geo",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -4.739766081871346,
        y: -3.9356725146198834,
        scale: 1.56
      },
      wishCard: {
        x: -83.59687818120123,
        y: 60.17577197149644,
        scale: 10.49
      }
    }
  },
  {
    itemID: 8,
    name: "xingqiu",
    vision: "hydro",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -0.10526315789473684,
        y: -3.628654970760234,
        scale: 1.09
      },
      wishCard: {
        x: -17.051238547675602,
        y: 65.82660332541568,
        scale: 7.65
      }
    }
  },
  {
    itemID: 7,
    name: "beidou",
    vision: "electro",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -2.570080862533693,
        y: 8.859838274932613,
        scale: 1.49
      },
      wishCard: {
        x: -22.468699839486355,
        y: 76.61123595505617,
        scale: 10.08
      }
    }
  },
  {
    itemID: 6,
    name: "xiangling",
    vision: "pyro",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -3.4415204678362574,
        y: -2.9517543859649122,
        scale: 1.5
      },
      wishCard: {
        x: 60.73294876145232,
        y: 59.62470308788599,
        scale: 9.16
      }
    }
  },
  {
    itemID: 5,
    name: "razor",
    vision: "electro",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -3.8377192982456143,
        y: -14.513157894736842,
        scale: 1.24
      },
      wishCard: {
        x: -75.56498133695284,
        y: 29.57007125890736,
        scale: 8.22
      }
    }
  },
  {
    itemID: 4,
    name: "barbara",
    vision: "hydro",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: -1.9663072776280326,
        y: -0.6037735849056605,
        scale: 1.3
      },
      wishCard: {
        x: -0.8042076688157448,
        y: 52.12351543942992,
        scale: 7.75
      }
    }
  },
  {
    itemID: 3,
    name: "lisa",
    vision: "electro",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        scale: 1
      },
      wishCard: {
        x: 7.695961995249406,
        y: 68.85748218527316,
        scale: 7.29
      }
    }
  },
  {
    itemID: 2,
    name: "kaeya",
    vision: "cryo",
    rarity: 4,
    release: "1.0-0",
    offset: {
      splashArt: {
        x: 1.8786549707602338,
        y: -0.3508771929824561,
        scale: 1.28
      },
      wishCard: {
        x: -33.07431286053614,
        y: 76.2541567695962,
        scale: 9.2
      }
    }
  },
  {
    itemID: 1,
    name: "amber",
    rarity: 4,
    vision: "pyro",
    release: "1.0-0",
    offset: {
      splashArt: {
        x: 1.62,
        y: -5.56,
        scale: 1.46
      },
      wishCard: {
        x: 66,
        y: 37.80674157303371,
        scale: 7.71
      }
    }
  }
];
const charsDB = {
  onlyStandard,
  data: data$1
};
const data = [
  {
    itemID: 163,
    name: "verdict",
    rarity: 5,
    weaponType: "claymore",
    limited: true,
    offset: {
      button: {
        t: 1,
        w: 70,
        l: 38
      }
    }
  },
  {
    itemID: 161,
    name: "splendor-of-tranquil-waters",
    rarity: 5,
    weaponType: "sword",
    limited: true,
    offset: {
      button: {
        t: -15,
        w: 90,
        l: 30
      }
    }
  },
  {
    itemID: 158,
    name: "prospector-drill",
    rarity: 4,
    weaponType: "polearm",
    limited: true
  },
  {
    itemID: 157,
    name: "range-gauge",
    rarity: 4,
    weaponType: "bow",
    limited: true
  },
  {
    itemID: 156,
    name: "cashflow-supervision",
    rarity: 5,
    weaponType: "catalyst",
    limited: true,
    offset: {
      button: {
        t: 35,
        w: 70,
        l: 35
      }
    }
  },
  {
    itemID: 155,
    name: "portable-power-saw",
    rarity: 4,
    weaponType: "claymore",
    limited: true
  },
  {
    itemID: 154,
    name: "the-dockhands-assistant",
    rarity: 4,
    weaponType: "sword",
    limited: true
  },
  {
    itemID: 153,
    name: "tome-of-the-eternal-flow",
    rarity: 5,
    weaponType: "catalyst",
    limited: true,
    offset: {
      button: {
        t: 15,
        w: 80,
        l: 35
      }
    }
  },
  {
    itemID: 152,
    name: "the-first-great-magic",
    rarity: 5,
    limited: true,
    weaponType: "bow",
    offset: {
      button: {
        t: 10,
        w: 75,
        l: 30
      }
    }
  },
  {
    itemID: 151,
    name: "jadefall-splendor",
    rarity: 5,
    limited: true,
    weaponType: "catalyst",
    offset: {
      button: {
        w: 65,
        t: 35,
        l: 65
      }
    }
  },
  {
    itemID: 150,
    name: "beacon-of-the-reed-sea",
    rarity: 5,
    limited: true,
    weaponType: "claymore",
    offset: {
      button: {
        t: 10,
        w: 70,
        l: 30
      }
    }
  },
  {
    itemID: 149,
    name: "light-of-foliar-incision",
    rarity: 5,
    limited: true,
    weaponType: "sword",
    offset: {
      button: {
        t: -15,
        w: 90,
        l: 30
      }
    }
  },
  {
    itemID: 148,
    name: "tulaytullah_s-remembrance",
    rarity: 5,
    limited: true,
    weaponType: "catalyst",
    offset: {
      button: {
        w: 70,
        t: 30,
        l: 35
      }
    }
  },
  {
    itemID: 147,
    name: "a-thousand-floating-dreams",
    rarity: 5,
    weaponType: "catalyst",
    limited: true,
    offset: {
      button: {
        w: 70,
        t: 30,
        l: 65
      }
    }
  },
  {
    itemID: 146,
    name: "key-of-khaj-nisut",
    rarity: 5,
    weaponType: "sword",
    limited: true,
    offset: {
      button: {
        t: -10,
        w: 90,
        l: 30
      }
    }
  },
  {
    itemID: 145,
    name: "xiphos-moonlight",
    rarity: 4,
    weaponType: "sword",
    limited: true
  },
  {
    itemID: 144,
    name: "wandering-evenstar",
    rarity: 4,
    weaponType: "catalyst",
    limited: true
  },
  {
    itemID: 143,
    name: "staff-of-the-scarlet-sands",
    rarity: 5,
    weaponType: "polearm",
    limited: true,
    offset: {
      button: {
        w: 80,
        t: 15,
        l: 60
      }
    }
  },
  {
    itemID: 142,
    name: "makhaira-aquamarine",
    rarity: 4,
    weaponType: "claymore",
    limited: true
  },
  {
    itemID: 141,
    name: "hunter_s-path",
    rarity: 5,
    weaponType: "bow",
    limited: true,
    offset: {
      button: {
        w: 70,
        l: 35,
        t: 0
      }
    }
  },
  {
    itemID: 140,
    name: "aqua-simulacra",
    rarity: 5,
    weaponType: "bow",
    limited: true,
    offset: {
      button: {
        t: 5,
        w: 80,
        l: 35
      }
    }
  },
  {
    itemID: 139,
    name: "redhorn-stonethresher",
    rarity: 5,
    weaponType: "claymore",
    limited: true,
    offset: {
      button: {
        t: 10,
        w: 80,
        l: 60
      }
    }
  },
  {
    itemID: 138,
    name: "haran-geppaku-futsu",
    rarity: 5,
    weaponType: "sword",
    limited: true,
    offset: {
      button: {
        t: -35,
        w: 120,
        l: 55
      }
    }
  },
  {
    itemID: 137,
    name: "kagura_s-verity",
    rarity: 5,
    weaponType: "catalyst",
    limited: true,
    offset: {
      button: {
        w: 70,
        t: 25,
        l: 37
      }
    }
  },
  {
    itemID: 136,
    name: "calamity-queller",
    rarity: 5,
    weaponType: "polearm",
    limited: true,
    offset: {
      button: {
        w: 80,
        t: 10,
        l: 60
      }
    }
  },
  {
    itemID: 135,
    name: "mouun_s-moon",
    rarity: 4,
    weaponType: "bow",
    limited: true
  },
  {
    itemID: 134,
    name: "wavebreaker_s-fin",
    rarity: 4,
    weaponType: "polearm",
    limited: true
  },
  {
    itemID: 133,
    name: "polar-star",
    rarity: 5,
    weaponType: "bow",
    limited: true,
    offset: {
      button: {
        w: 70,
        t: 2,
        l: 35
      }
    }
  },
  {
    itemID: 132,
    name: "akuoumaru",
    rarity: 4,
    weaponType: "claymore",
    limited: true
  },
  {
    itemID: 131,
    name: "everlasting-moonglow",
    rarity: 5,
    weaponType: "catalyst",
    limited: true,
    offset: {
      button: {
        w: 70,
        t: 40,
        l: 60
      }
    }
  },
  {
    itemID: 130,
    name: "engulfing-lightning",
    rarity: 5,
    weaponType: "polearm",
    limited: true,
    offset: {
      button: {
        w: 80,
        t: 20,
        l: 30
      }
    }
  },
  {
    itemID: 129,
    name: "thundering-pulse",
    rarity: 5,
    limited: true,
    weaponType: "bow",
    offset: {
      button: {
        w: 70,
        t: 10,
        l: 35
      }
    }
  },
  {
    itemID: 128,
    name: "mistsplitter-reforged",
    rarity: 5,
    weaponType: "sword",
    limited: true,
    offset: {
      button: {
        w: 90,
        t: -22,
        l: 30
      }
    }
  },
  {
    itemID: 127,
    name: "freedom-sworn",
    rarity: 5,
    weaponType: "sword",
    limited: true,
    offset: {
      button: {
        w: 100,
        t: -20,
        l: 30
      }
    }
  },
  {
    itemID: 126,
    name: "mitternachts-waltz",
    rarity: 4,
    weaponType: "bow",
    limited: true
  },
  {
    itemID: 125,
    name: "song-of-broken-pines",
    rarity: 5,
    weaponType: "claymore",
    limited: true,
    offset: {
      button: {
        w: 80,
        t: 10,
        l: 35
      }
    }
  },
  {
    itemID: 124,
    name: "alley-hunter",
    rarity: 4,
    weaponType: "bow",
    limited: true
  },
  {
    itemID: 123,
    name: "elegy-for-the-end",
    rarity: 5,
    weaponType: "bow",
    limited: true,
    offset: {
      button: {
        w: 70,
        t: 10,
        l: 35
      }
    }
  },
  {
    itemID: 122,
    name: "the-alley-flash",
    rarity: 4,
    weaponType: "sword",
    limited: true
  },
  {
    itemID: 121,
    name: "wine-and-song",
    rarity: 4,
    weaponType: "catalyst",
    limited: true
  },
  {
    itemID: 120,
    name: "staff-of-homa",
    rarity: 5,
    weaponType: "polearm",
    limited: true,
    offset: {
      button: {
        w: 90,
        t: 15,
        l: 60
      }
    }
  },
  {
    itemID: 119,
    name: "lithic-blade",
    rarity: 4,
    weaponType: "claymore",
    limited: true
  },
  {
    itemID: 118,
    name: "lithic-spear",
    rarity: 4,
    weaponType: "polearm",
    limited: true
  },
  {
    itemID: 117,
    name: "primordial-jade-cutter",
    rarity: 5,
    weaponType: "sword",
    limited: true,
    offset: {
      button: {
        w: 100,
        t: -14,
        l: 60
      }
    }
  },
  {
    itemID: 116,
    name: "primordial-jade-winged-spear",
    rarity: 5,
    weaponType: "polearm",
    offset: {
      button: {
        w: 80,
        t: 10,
        l: 30
      }
    }
  },
  {
    itemID: 115,
    name: "summit-shaper",
    rarity: 5,
    weaponType: "sword",
    limited: true,
    offset: {
      button: {
        w: 90,
        t: -10,
        l: 30
      }
    }
  },
  {
    itemID: 114,
    name: "vortex-vanquisher",
    rarity: 5,
    weaponType: "polearm",
    limited: true,
    offset: {
      button: {
        w: 90,
        t: 20,
        l: 30
      }
    }
  },
  {
    itemID: 113,
    name: "the-unforged",
    rarity: 5,
    weaponType: "claymore",
    limited: true,
    offset: {
      button: {
        w: 60,
        t: 20,
        l: 60
      }
    }
  },
  {
    itemID: 112,
    name: "memory-of-dust",
    rarity: 5,
    weaponType: "catalyst",
    limited: true,
    offset: {
      button: {
        w: 65,
        t: 30,
        l: 65
      }
    }
  },
  {
    itemID: 111,
    name: "eye-of-perception",
    rarity: 4,
    weaponType: "catalyst"
  },
  {
    itemID: 110,
    name: "rainslasher",
    rarity: 4,
    weaponType: "claymore"
  },
  {
    itemID: 109,
    name: "rust",
    rarity: 4,
    weaponType: "bow"
  },
  {
    itemID: 108,
    name: "lost-prayer-to-the-sacred-winds",
    rarity: 5,
    weaponType: "catalyst",
    offset: {
      button: {
        w: 55,
        t: 40,
        l: 40
      }
    }
  },
  {
    itemID: 107,
    name: "wolf_s-gravestone",
    rarity: 5,
    weaponType: "claymore",
    offset: {
      button: {
        w: 80,
        t: 15,
        l: 65
      }
    }
  },
  {
    itemID: 106,
    name: "amos-bow",
    rarity: 5,
    weaponType: "bow",
    offset: {
      button: {
        w: 70,
        t: 0,
        l: 35
      }
    }
  },
  {
    itemID: 105,
    name: "aquila-favonia",
    rarity: 5,
    weaponType: "sword",
    offset: {
      button: {
        w: 80,
        t: -10,
        l: 65
      }
    }
  },
  {
    itemID: 104,
    name: "skyward-pride",
    rarity: 5,
    weaponType: "claymore",
    offset: {
      button: {
        w: 80,
        t: 10,
        l: 65
      }
    }
  },
  {
    itemID: 103,
    name: "skyward-atlas",
    rarity: 5,
    weaponType: "catalyst",
    offset: {
      button: {
        w: 65,
        t: 40,
        l: 70
      }
    }
  },
  {
    itemID: 102,
    name: "skyward-harp",
    rarity: 5,
    weaponType: "bow",
    offset: {
      button: {
        w: 70,
        t: 10,
        l: 35
      }
    }
  },
  {
    itemID: 101,
    name: "skyward-spine",
    rarity: 5,
    weaponType: "polearm",
    offset: {
      button: {
        w: 80,
        t: 10,
        l: 60
      }
    }
  },
  {
    itemID: 100,
    name: "skyward-blade",
    rarity: 5,
    weaponType: "sword",
    offset: {
      button: {
        w: 90,
        t: -10,
        l: 60
      }
    }
  },
  {
    itemID: 99,
    name: "the-flute",
    rarity: 4,
    weaponType: "sword"
  },
  {
    itemID: 98,
    name: "the-widsith",
    rarity: 4,
    weaponType: "catalyst"
  },
  {
    itemID: 97,
    name: "dragon_s-bane",
    rarity: 4,
    weaponType: "polearm"
  },
  {
    itemID: 96,
    name: "lion_s-roar",
    rarity: 4,
    weaponType: "sword"
  },
  {
    itemID: 95,
    name: "sacrificial-bow",
    rarity: 4,
    weaponType: "bow"
  },
  {
    itemID: 94,
    name: "sacrificial-fragments",
    rarity: 4,
    weaponType: "catalyst"
  },
  {
    itemID: 93,
    name: "sacrificial-greatsword",
    rarity: 4,
    weaponType: "claymore"
  },
  {
    itemID: 92,
    name: "sacrificial-sword",
    rarity: 4,
    weaponType: "sword"
  },
  {
    itemID: 91,
    name: "favonius-greatsword",
    rarity: 4,
    weaponType: "claymore"
  },
  {
    itemID: 90,
    name: "favonius-sword",
    rarity: 4,
    weaponType: "sword"
  },
  {
    itemID: 89,
    name: "favonius-warbow",
    rarity: 4,
    weaponType: "bow"
  },
  {
    itemID: 88,
    name: "favonius-codex",
    rarity: 4,
    weaponType: "catalyst"
  },
  {
    itemID: 87,
    name: "favonius-lance",
    rarity: 4,
    weaponType: "polearm"
  },
  {
    itemID: 86,
    name: "the-bell",
    rarity: 4,
    weaponType: "claymore"
  },
  {
    itemID: 85,
    name: "the-stringless",
    rarity: 4,
    weaponType: "bow"
  },
  {
    itemID: 84,
    name: "black-tassel",
    rarity: 3,
    weaponType: "polearm"
  },
  {
    itemID: 83,
    name: "bloodtained-greatsword",
    rarity: 3,
    weaponType: "claymore"
  },
  {
    itemID: 82,
    name: "cool-steel",
    rarity: 3,
    weaponType: "sword"
  },
  {
    itemID: 81,
    name: "debate-club",
    rarity: 3,
    weaponType: "claymore"
  },
  {
    itemID: 80,
    name: "emerald-orb",
    rarity: 3,
    weaponType: "catalyst"
  },
  {
    itemID: 79,
    name: "ferrous-shadow",
    rarity: 3,
    weaponType: "claymore"
  },
  {
    itemID: 78,
    name: "harbinger-of-dawn",
    rarity: 3,
    weaponType: "sword"
  },
  {
    itemID: 77,
    name: "magic-guide",
    rarity: 3,
    weaponType: "catalyst"
  },
  {
    itemID: 76,
    name: "raven-bow",
    rarity: 3,
    weaponType: "bow"
  },
  {
    itemID: 75,
    name: "sharpshooter_s-oath",
    rarity: 3,
    weaponType: "bow"
  },
  {
    itemID: 74,
    name: "skyrider-sword",
    rarity: 3,
    weaponType: "sword"
  },
  {
    itemID: 73,
    name: "slingshot",
    rarity: 3,
    weaponType: "bow"
  },
  {
    itemID: 72,
    name: "thrilling-tales-of-dragon-slayers",
    rarity: 3,
    weaponType: "catalyst"
  }
];
let IndexedDB;
const createEvent = () => {
  const event = new Event("storageUpdate");
  document.dispatchEvent(event);
};
const HistoryManager = {
  async historyCount() {
    return (await IndexedDB).count("history");
  },
  async getListByBanner(banner) {
    return (await IndexedDB).getAllFromIndex("history", "banner", banner);
  },
  async countItem(name) {
    return (await IndexedDB).countFromIndex("history", "name", name);
  },
  async getByID(itemID) {
    return (await IndexedDB).getAllFromIndex("history", "itemID", itemID);
  },
  async clearHistory(banner) {
    try {
      const idb2 = await IndexedDB;
      const keys = await idb2.getAllKeysFromIndex("history", "banner", banner);
      for (let i = 0; i < keys.length; i++) {
        await idb2.delete("history", keys[i]);
      }
      return "success";
    } catch (e) {
      return "failed";
    }
  },
  async clearIDB() {
    const idb2 = await IndexedDB;
    const clear = await idb2.clear("history");
    createEvent();
    return clear;
  },
  async getAllHistories() {
    return (await IndexedDB).getAll("history");
  },
  async addHistory(data2) {
    if (!data2.hasOwnProperty("banner"))
      return;
    const idb2 = await IndexedDB;
    const put = await idb2.put("history", data2);
    return put;
  },
  async delete(id) {
    if (!id)
      return;
    const idb2 = await IndexedDB;
    const remove = await idb2.delete("history", id);
    return remove;
  }
};
const AssetManager = {
  async put(data2) {
    if (!data2.hasOwnProperty("key"))
      return;
    return (await IndexedDB).put("assets", data2);
  },
  async get(key) {
    if (!key)
      return null;
    return (await IndexedDB).get("assets", key);
  },
  async delete(key) {
    if (!key)
      return;
    return (await IndexedDB).delete("assets", key);
  }
};
const BannerManager = {
  async getAll() {
    return (await IndexedDB).getAll("custombanner");
  },
  async put(data2 = {}) {
    if (!("itemID" in data2))
      return;
    const lastModified = new Date().toISOString();
    const idb2 = await IndexedDB;
    const put = await idb2.put("custombanner", { lastModified, ...data2 });
    createEvent();
    return put;
  },
  async get(itemID) {
    if (!itemID)
      return null;
    return (await IndexedDB).get("custombanner", itemID);
  },
  async getListByStatus(status) {
    return (await IndexedDB).getAllFromIndex("custombanner", "status", status);
  },
  async delete(key) {
    if (!key)
      return;
    const idb2 = await IndexedDB;
    const remove = idb2.delete("custombanner", key);
    createEvent();
    return remove;
  },
  async clear() {
    const idb2 = await IndexedDB;
    const remove = idb2.clear("custombanner");
    createEvent();
    return remove;
  }
};
const _getAllCookies = () => {
  const splitted = document.cookie.split("; ");
  const cuuid = splitted.find((row) => row.startsWith(`WishSimulator=`));
  return cuuid ? JSON.parse(cuuid.split("=")[1]) : {};
};
const _setCookies = (value) => {
  const stringToSet = JSON.stringify(value);
  const d = new Date();
  d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1e3);
  let expires = "expires=" + d.toUTCString();
  document.cookie = `WishSimulator=${stringToSet};${expires};SameSite=Lax; Secure;path=/`;
};
const cookie = {
  get(cname) {
    const result = _getAllCookies();
    return result[cname];
  },
  set(cname, cvalue) {
    const cookieNow = _getAllCookies();
    cookieNow[cname] = cvalue;
    _setCookies(cookieNow);
  },
  remove(cname) {
    const cookieNow = _getAllCookies();
    delete cookieNow[cname];
    _setCookies(cookieNow);
  },
  clean() {
    const d = new Date();
    d.setTime(d.getTime() - 1 * 24 * 60 * 60 * 1e3);
    let expires = "expires=" + d.toUTCString();
    document.cookie = `WishSimulator=;${expires};SameSite=Lax; Secure;path=/`;
  }
};
const rates = ({
  currentPity = 0,
  maxPity = 90,
  baseRate = 0.6,
  rateIncreasedAt = 74
} = {}) => {
  if (baseRate <= 0 && currentPity < maxPity)
    return 0;
  if (currentPity < rateIncreasedAt)
    return baseRate;
  if (currentPity >= maxPity)
    return 100;
  const rateIncreasedBy = (100 - baseRate) / (maxPity + 1 - rateIncreasedAt);
  const rateBeforeCurrentPity = (currentPity + 1 - rateIncreasedAt) * rateIncreasedBy;
  const increasedRate = rateBeforeCurrentPity + baseRate;
  return increasedRate;
};
const prob = (items) => {
  let chances = [];
  for (let i = 0; i < items.length; i++) {
    chances[i] = items[i].chance + (chances[i - 1] || 0);
  }
  const random = Math.random() * chances[chances.length - 1];
  const result = items[chances.findIndex((chance) => chance > random)];
  return result;
};
const getRate = (banner, key) => {
  if (banner === "beginner") {
    const initial2 = probabilityRates["character-event"];
    return initial2[key];
  }
  const initial = probabilityRates[banner];
  const local = localrate.get(banner);
  if (!(local[key] || local[key] >= 0))
    return initial[key];
  const val = parseFloat(local[key]);
  if (isNaN(val))
    return local[key];
  return val;
};
const getCharDetails = (charName) => {
  if (!charName)
    return {};
  const findChar = data$1.find(({ name }) => charName === name);
  return findChar || {};
};
const getWpDetails = (weaponName) => {
  if (!weaponName)
    return {};
  const findWP = data.find(({ name }) => name === weaponName);
  return findWP || {};
};
const idb = BannerManager;
const localBanner = {
  isComplete: async (itemID) => {
    const { character, images, rateup = [], bannerName } = await idb.get(itemID) || {};
    const { artURL } = images || {};
    const complete = !!artURL && !!character && rateup.length > 0 && !!bannerName;
    return complete;
  },
  isHostedBanner: async (itemID) => {
    const data2 = await idb.get(itemID);
    return "hostedImages" in data2;
  },
  renewImage: async ({ id = 0, newData = {}, key = "" }) => {
    const { data: data2 = {} } = newData;
    const { url: imageURL, delete_url } = data2;
    const [, , , imgID, hash] = delete_url.split("/");
    const idbData = await idb.get(id);
    const { hostedImages = {}, imageHash = {}, imgChanged = {} } = idbData;
    const hashList = Object.keys(imageHash).map((k) => imageHash[k].id);
    idbData.hostedImages = hostedImages;
    idbData.imageHash = imageHash;
    idbData.imgChanged = imgChanged;
    const dontRemoveImage = hashList.filter((id2) => id2 === imageHash[key]?.id).length > 1;
    if (!dontRemoveImage) {
      await onlineBanner.deleteImage(imageHash[key] || {});
    }
    idbData.hostedImages[key] = imageURL;
    idbData.imageHash[key] = { id: imgID, hash };
    idbData.imgChanged[key] = false;
    return idb.put(idbData);
  }
};
const onlineBanner = {
  async _postData({ action, data: data2 = {}, id }) {
    const body = { app: "genshin", action, data: data2, id };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const request = await fetch(API_HOST + "/storage", {
      method: "POST",
      body: JSON.stringify(body),
      headers
    });
    const result = await request.json();
    return result;
  },
  async getData(shareID, multi = false) {
    try {
      if (!shareID)
        throw new Error();
      const response = await fetch(`${API_HOST}/storage?app=genshin&id=${shareID}`);
      const parsed = await response.json() || {};
      const { data: data2 = [] } = parsed;
      if (multi === "multi")
        return parsed;
      parsed.data = { ...data2[0] };
      return parsed;
    } catch (e) {
      console.log(e);
      return { success: false, message: "error" };
    }
  },
  async updateData(localID) {
    try {
      if (!localID)
        throw new Error("no ID");
      const date = new Date().toISOString();
      const idbData = await idb.get(localID);
      const localData = { ...idbData };
      const { shareID = null, images, character, isChanged } = localData;
      const { thumbnail } = images;
      if (!isChanged)
        return { status: "ok", shareID, thumbnail, character };
      delete localData.images;
      delete localData.imgChanged;
      delete localData.status;
      delete localData.isChanged;
      delete localData.shareID;
      localData.lastModified = date;
      const onlineData = await this._postData({ id: shareID, action: "put", data: localData });
      const { success, id, message } = onlineData;
      if (!success)
        throw new Error("Failed to Update");
      idbData.shareID = id;
      idbData.lastModified = date;
      idbData.isChanged = false;
      await idb.put(idbData);
      return { status: "ok", shareID: id, thumbnail, message, character };
    } catch (e) {
      console.error(e);
      return { status: "error" };
    }
  },
  async deleteBanner(itemID) {
    try {
      const { shareID, status, imageHash = {} } = await idb.get(itemID) || {};
      if (status === "cloud" || !shareID) {
        await idb.delete(itemID);
        return { status: "ok" };
      }
      const keys = Object.keys(imageHash);
      for (let i = 0; i < keys.length; i++) {
        const hashID = imageHash[keys[i]];
        await this.deleteImage(hashID);
      }
      const { success } = await this._postData({ action: "delete", id: shareID });
      if (!success)
        throw new Error("Failed to Remove");
      await idb.delete(itemID);
      return { status: "ok" };
    } catch (e) {
      return { status: "error" };
    }
  },
  async deleteImage({ hash, id } = {}) {
    if (!(hash && id))
      return;
    try {
      const formdata = new FormData();
      formdata.append("action", "delete");
      formdata.append("delete", "image");
      formdata.append("deleting[id]", id);
      formdata.append("deleting[hash]", hash);
      const data2 = await fetch("https://ibb.co/json", { method: "POST", body: formdata });
      const { status_code } = await data2.json();
      console.log(id, hash, status_code);
      return status_code === 200;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
  async block(id) {
    if (!id)
      return;
    try {
      const { success } = await this._postData({ action: "block", id });
      return success;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
};
const pushToast = ({
  type = "info",
  dismissible = false,
  autoclose = true,
  timeout = 3e3,
  message = ""
}) => {
  const id = Math.floor(Math.random() * 1e4);
  const toastData = { id, dismissible, autoclose, timeout, type, message };
  toastMsg.update((all) => [toastData, ...all]);
  if (autoclose && timeout > 1)
    setTimeout(() => dismissToast(id), timeout);
};
const dismissToast = (id) => {
  toastMsg.update((all) => all.filter((t) => t.id !== id));
};
const browserState = {
  set(page2) {
    history.pushState({ page: page2 }, null, null);
  },
  back() {
    const currentPage = history.state?.page;
    if (!currentPage)
      return;
    history.back();
  }
};
const getNotices = () => cookie.get("notice") || [];
const setNotices = (data2 = []) => cookie.set("notice", data2);
const noticeMark = {
  openNotice(key) {
    const openedNotice = getNotices();
    const isAlreadyOpen = openedNotice.includes(key);
    if (isAlreadyOpen)
      return;
    openedNotice.push(key);
    setNotices(openedNotice);
    notice.set(openedNotice);
    return;
  },
  onLoadCheck() {
    const openedNotice = getNotices();
    notice.set(openedNotice);
  }
};
const ModalTpl_svelte_svelte_type_style_lang = "";
const css$A = {
  code: ".modal.svelte-1fzyohs.svelte-1fzyohs{position:fixed;top:0;left:0;width:100vw;height:var(--screen-height);background-color:rgba(0, 0, 0, 0.5);z-index:997;display:flex;justify-content:center;align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.modal-content.svelte-1fzyohs.svelte-1fzyohs{width:35rem;max-width:90%;background-color:#fbf6ee;padding:8px;text-align:center;color:#383b40;position:relative;border-radius:0.8rem}.dark.svelte-1fzyohs .modal-content.svelte-1fzyohs{background-color:#4a5265}.mobile .modal-content.svelte-1fzyohs.svelte-1fzyohs{max-width:110vh}.container.svelte-1fzyohs.svelte-1fzyohs{width:100%;height:100%;border:2px solid #ddd5c8;background-image:var(--bg-icon);background-repeat:no-repeat;background-size:50%;background-position:50%}.corner.svelte-1fzyohs.svelte-1fzyohs{background-image:url('data:image/webp;base64,UklGRkgFAABXRUJQVlA4WAoAAAAQAAAANgAAMQAAQUxQSAUDAAABCbRt2wYS0Kny/w+3P0T0fwL4Fh3ZUFn3RQqxyZuhoG0bpuZPuzsQImICIhX+jrAkyW7bzKp0//s6YRwAcOH8GTEBE0C5tm1FknPu+xCQWdBiZpZGclsGyAB0QONmZkqIiB/vDRpNiIgJIP6144LOBIQAaStmAqCN0E4AUphAwoCQXtEIPIiISeCiIWUUwkwECbAXfA0Pj8BSW4GwsJqTeU7uMjoa3Qtdmtt8nIH4ELgYhOx9U1hpxZw2KNQFUH23+mFBoKxI326+3UyLToG6iejNu6E8X7f3/vKHwywQsRchX96fP/74Yy5GQCVFkDI10f/wh55IHwDhYnjcvvP7u2dPao+ZXFFiTVoiVtWf/32Gvrdv/nw2/qLTFCsERiDhJu+QevH4duXe83Khb94AUskCw7CM6KmtwbiZl7ufnLJiHiJBKNy5i/gQDWjL9pu4++6wu1ffxRMEO0SsT5gHuql7P3386+P7bbPsvxodw6MRWtYVEOryej6c2/hOd9fL8vF7KfvRD4hCCMsoIKvjeH5Sx/fKbvlshHUvmlAQiJkaYNuuH8ahnPLSaYI5KDXjbNCNfS2lppc9DdRCQQcIgFrEVAsphfTCwzufEEh21t/gaCgwRfbCi7fyHtDqJAABRIvUkOV56/YCPHUpzPWC0BewVmDqEbx7e9gn97BYhGVUME+hECJcpMfD/+4W7B8PE6GsgnT0dvQzgy59fnU44EGrgQAQta4/Lq65LA+r0dZ4GLckwgMQALVsWMZ5fmZT6QDbPP/w3k0aVg3CQeWTPO8X2hNqlqVuyc82d06KUghnNjFNd8szSxF9l3Uy5/7Kb6ZIAKIm5eTH3f5xZlLe1FF9/e6mcracJaglyQ/Xdm32VopsSKUrwztD/37RcVDg7PJwHd1CRk5Zdfs8n6xr/+nzAQcleRzdBCAJcmbl0vjJnc8HTVQBwlcBBAjApnlu7//3/bCIjniLa5uu3v+m9i9m6iAKGIYHDzTgK4YUUsz0eWLQCyE0gz4NAAlfMRR7+jR/bwBWUDggHAIAAHAKAJ0BKjcAMgA+KQ6FQqGHfAYAoSygDgHbI3I4tdhHQL88A1kA2ozja3RezMIbWU3XuF8+/h9ILAYHndhrUbZy5B81xTHr3sWw+e1DsBqahnwk8nvegFg3CiwAAP7/KvhRIfulyVvAM+kd25h7/f9q48lj/8TP6ceUoTF8V1L0D7kxK/RYzWsE2gM84nd8zXc9QGLEFOT/sLorw3Yjn9KVTdhjeYf/JPghddPdW0LE5XY55VYd6No1Np9IqEu9k4ZHiHsClwKB9XL+sZKxaOfPkAx9tBWSX/EaPi0L0FT+Ia2LsLUt7Gv/94HKXgfgqAY3Dc3mrgA9914RrLuW9+/4muOcWZqBrbww2hfhuvV6OzfAOs9mDbeSCYCL8K3CPHvdT0wItSZ53JuxG9FLZCIfp0b8LJkq1OMW6TeGE5KKpvYCamNksDv1s+pAa2J18XKje5sj8hSQhZjIqh9uPJX7FZXFqLIxObNJPebhHE3gvZWar0ojALZ+1hmoJKVuJVetIsSw8Nqfb9drEU81Na8myzoyvPFjWzeCiZoWF+PHkNkeaySoSlxjDHlbQS8zky28ygG5RGkzIURZol88xyDcVVvHW05Bq5d79tZ9Nbk/ofOfzl0+Un6lPuZpn0zhr9YSAvne330OxW3f5DbKZyT+YPZstc2H5QaDYWBcyVMJ2TCXOSCq+L28GLxA8V82mMeS122MP/qzwAAAAA==');background-size:cover;width:2.35rem;aspect-ratio:1/1;font-size:1.5rem;display:inline-block;position:absolute}.top-left.svelte-1fzyohs.svelte-1fzyohs{top:-0.9rem;left:-0.9rem;transform:rotate(-90deg)}.top-right.svelte-1fzyohs.svelte-1fzyohs{top:-0.9rem;right:-0.9rem}.bottom-left.svelte-1fzyohs.svelte-1fzyohs{bottom:-0.9rem;left:-0.9rem;transform:rotate(-180deg)}.bottom-right.svelte-1fzyohs.svelte-1fzyohs{bottom:-0.9rem;right:-0.9rem;transform:rotate(90deg)}.pop-header.svelte-1fzyohs.svelte-1fzyohs{font-size:130%;margin:0.4rem 7%;padding-bottom:0.4rem;border-bottom:0.2rem solid #ddd5c8;position:relative;z-index:+1}.dark.svelte-1fzyohs .pop-header.svelte-1fzyohs{color:rgba(210, 198, 156, 1)}.mobile .pop-header.svelte-1fzyohs.svelte-1fzyohs{font-size:1rem}.pop-body.svelte-1fzyohs.svelte-1fzyohs{height:15rem;max-height:45vh;position:relative;z-index:+1;font-size:1.1rem;display:flex;justify-content:center}.dark.svelte-1fzyohs .pop-body.svelte-1fzyohs{color:#fbf6ee}.mobile .pop-body.svelte-1fzyohs.svelte-1fzyohs{height:12rem;font-size:0.9rem}.pop-footer.svelte-1fzyohs.svelte-1fzyohs{display:flex;padding:0.7rem 0;justify-content:space-around;position:relative;z-index:+1}.pop-footer.svelte-1fzyohs.svelte-1fzyohs::before{width:80%;content:'';display:block;border-top:0.2rem solid #ddd5c8;position:absolute;top:0;left:50%;transform:translateX(-50%)}.dark.svelte-1fzyohs .container.svelte-1fzyohs,.dark.svelte-1fzyohs .pop-header.svelte-1fzyohs,.dark.svelte-1fzyohs .pop-footer.svelte-1fzyohs::before{border-color:rgba(210, 198, 156, 0.6)}",
  map: null
};
const ModalTpl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$slots = compute_slots(slots);
  let $assets, $$unsubscribe_assets;
  let $t, $$unsubscribe_t;
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let { title = "" } = $$props;
  let { dark = false } = $$props;
  let { blank = false } = $$props;
  let { disabled = false } = $$props;
  let { confirmOnly = false } = $$props;
  let { noDimiss = false } = $$props;
  let content;
  const dispatch = createEventDispatcher();
  const confirmClick = () => dispatch("confirm");
  const cancelClik = () => dispatch("cancel");
  hotkeys("enter", "modal", (e) => {
    e.preventDefault();
    if (disabled)
      return;
    confirmClick();
  });
  hotkeys("esc", "modal", (e) => {
    e.preventDefault();
    cancelClik();
  });
  const currentScope = hotkeys.getScope();
  hotkeys.setScope("modal");
  onDestroy(() => hotkeys.deleteScope("modal", currentScope));
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.dark === void 0 && $$bindings.dark && dark !== void 0)
    $$bindings.dark(dark);
  if ($$props.blank === void 0 && $$bindings.blank && blank !== void 0)
    $$bindings.blank(blank);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.confirmOnly === void 0 && $$bindings.confirmOnly && confirmOnly !== void 0)
    $$bindings.confirmOnly(confirmOnly);
  if ($$props.noDimiss === void 0 && $$bindings.noDimiss && noDimiss !== void 0)
    $$bindings.noDimiss(noDimiss);
  $$result.css.add(css$A);
  $$unsubscribe_assets();
  $$unsubscribe_t();
  return `<div class="${["modal svelte-1fzyohs", dark ? "dark" : ""].join(" ").trim()}"><div class="${"modal-content svelte-1fzyohs"}"><span class="${"corner top-left svelte-1fzyohs"}"></span>
		<span class="${"corner top-right svelte-1fzyohs"}"></span>
		<span class="${"corner bottom-left svelte-1fzyohs"}"></span>
		<span class="${"corner bottom-right svelte-1fzyohs"}"></span>
		<div class="${"container svelte-1fzyohs"}" style="${"--bg-icon:url(" + escape($assets["modal-bg-icon.png"], true) + ")"}">${blank ? `${slots.default ? slots.default({}) : ``}` : `${title ? `<h1 class="${"pop-header svelte-1fzyohs"}">${escape(title)}</h1>` : ``}
				<div class="${"pop-body svelte-1fzyohs"}"${add_attribute("this", content, 0)}>${slots.default ? slots.default({}) : ``}</div>

				<div class="${"pop-footer svelte-1fzyohs"}">${!confirmOnly ? `${validate_component(ButtonModal, "ButtonModal").$$render($$result, { light: dark, type: "cancel" }, {}, {})}` : ``}

					${validate_component(ButtonModal, "ButtonModal").$$render($$result, { light: dark, type: "confirm", disabled }, {}, {
    default: () => {
      return `${$$slots.confirmtext ? `${slots.confirmtext ? slots.confirmtext({}) : ``}` : `${escape($t("confirmButton"))}`}`;
    }
  })}</div>`}</div></div>
</div>`;
});
const ModalInitBanner_svelte_svelte_type_style_lang = "";
const ModalWelcome_svelte_svelte_type_style_lang = "";
const WelkinCheckin_svelte_svelte_type_style_lang = "";
const css$z = {
  code: "section.svelte-1x1789m{position:fixed;top:0;left:0;width:100%;height:100%;z-index:99;color:#000}.container.svelte-1x1789m{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.bg.svelte-1x1789m{min-width:100vw;min-height:100%;position:absolute;z-index:-1;left:0;background-image:linear-gradient(-30deg, rgba(0, 0, 0, 0.75) 80%, rgba(0, 0, 0, 0.6))}.content.svelte-1x1789m{display:flex;flex-direction:column;max-width:80%;width:80%;text-align:center}.mobile .content.svelte-1x1789m{transform:scale(0.85)}h3.svelte-1x1789m{color:#e9e4d9;font-weight:100;padding:0.5rem}h4.svelte-1x1789m{color:#d0ba98;font-weight:100}.msg.svelte-1x1789m span{color:#e9e4d9}.milestone.svelte-1x1789m{display:flex;width:100%;justify-content:center}img.svelte-1x1789m{width:30%}",
  map: null
};
const WelkinCheckin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $assets, $$unsubscribe_assets;
  let $t, $$unsubscribe_t;
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  getContext("closeWelkin");
  getContext("openObtained");
  let dayRemaining;
  $$result.css.add(css$z);
  $$unsubscribe_assets();
  $$unsubscribe_t();
  return `<section class="${"svelte-1x1789m"}"><div class="${"container svelte-1x1789m"}"><div class="${"bg svelte-1x1789m"}"></div>
		<div class="${"content svelte-1x1789m"}"><div class="${"milestone svelte-1x1789m"}"><img${add_attribute("src", $assets["welkin-moon-girl.webp"], 0)} alt="${"Welkin Moon Girl"}" class="${"svelte-1x1789m"}"></div>

			<h3 class="${"title svelte-1x1789m"}">${escape($t("shop.recomended.claimingBlessing"))}</h3>
			<h4 class="${"msg svelte-1x1789m"}"><!-- HTML_TAG_START -->${$t("shop.recomended.dayRemaining", {
    values: { days: `<span>${dayRemaining}</span>` }
  })}<!-- HTML_TAG_END --></h4></div></div>
</section>`;
});
const itemRarity = [3, 3, 4, 4, 5, 5];
const meteorList = [
  "bg.webm",
  "3star-single.mp4",
  "4star-single.mp4",
  "4star-multi.mp4",
  "5star-single.mp4",
  "5star-multi.mp4"
];
const loadProggress = writable({ rarity: "", progress: 0, totalItem: 0, itemNumber: 0 });
const loadAnimation = async () => {
  const results = [];
  const totalItem = meteorList.length;
  for (let i = 0; i < totalItem; i++) {
    loadProggress.set({ rarity: itemRarity[i], progress: 0, totalItem, itemIndex: i });
    const response = await fetch(`/videos/${meteorList[i]}`);
    const data2 = new Response(streamResponse(response));
    const blob = await data2.blob();
    await AssetManager.put({ key: meteorList[i], blob });
    const DOMURL = window.URL || window.webkitURL;
    const blobUrl = DOMURL.createObjectURL(blob);
    const resultObj = { asset: meteorList[i], url: blobUrl };
    results.push(resultObj);
  }
  return results;
};
const streamResponse = (response) => {
  const contentLength = response.headers.get("content-length");
  return new ReadableStream({
    start(controller) {
      const reader = response.body.getReader();
      readStream(controller, reader, contentLength);
    }
  });
};
let loaded = 0;
const readStream = (controller, reader, contentLength) => {
  reader.read().then((progressEvent) => {
    if (progressEvent.done) {
      controller.close();
      loaded = 0;
      return;
    }
    loadProggress.update((v) => {
      loaded += progressEvent.value.byteLength;
      v.progress = Math.round(loaded / contentLength * 100);
      return v;
    });
    controller.enqueue(progressEvent.value);
    readStream(controller, reader, contentLength);
  });
};
const PreloadMeteor_svelte_svelte_type_style_lang = "";
const css$y = {
  code: "@media screen and (min-width: 900px){}@keyframes svelte-d5t2d5-dot{{content:'.'}{content:'..'}{content:'...'}{content:''}}",
  map: null
};
const PreloadMeteor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ready;
  let $readyToPull, $$unsubscribe_readyToPull;
  let $$unsubscribe_loadProggress;
  $$unsubscribe_loadProggress = subscribe(loadProggress, (value) => value);
  const readyToPull = getContext("readyToPull");
  $$unsubscribe_readyToPull = subscribe(readyToPull, (value) => $readyToPull = value);
  const preloadMeteor = async () => {
    playSfx();
    const data2 = await loadAnimation();
    assets.update((v) => {
      data2.forEach(({ asset, url }) => v[asset] = url);
      return v;
    });
    readyToPull.set(true);
  };
  if (!ready) {
    preloadMeteor();
  }
  $$result.css.add(css$y);
  ready = $readyToPull;
  $$unsubscribe_readyToPull();
  $$unsubscribe_loadProggress();
  return ``;
});
const { addHistory } = HistoryManager;
const roll = async (banner, WishInstance, indexOfBanner) => {
  if (banner === "member") {
    const randomItem2 = WishInstance.getItem(5, banner, indexOfBanner);
    let pity2 = 1;
    const isNew2 = false;
    const bonusType2 = randomItem2.rarity === 3 ? "stardust" : "starglitter";
    const bonusQty2 = 20;
    const result2 = { pity: pity2, isNew: isNew2, bonusType: bonusType2, bonusQty: bonusQty2, ...randomItem2 };
    return result2;
  }
  const pity5 = localPity.get(`pity5-${banner}`) + 1;
  const pity4 = localPity.get(`pity4-${banner}`) + 1;
  const maxPity = getRate(banner, "max5");
  const rate5star = () => {
    return rates({
      baseRate: getRate(banner, "baseRate5"),
      rateIncreasedAt: getRate(banner, "hard5"),
      currentPity: pity5,
      maxPity
    });
  };
  const rate4star = () => {
    return rates({
      baseRate: getRate(banner, "baseRate4"),
      currentPity: pity4,
      rateIncreasedAt: getRate(banner, "hard4"),
      maxPity: getRate(banner, "max4")
    });
  };
  let chance5star = rate5star();
  let chance4star = rate4star();
  let chance3star = 100 - chance4star - chance5star;
  if (chance3star < 0 && pity5 >= maxPity || chance5star === 100)
    chance4star = 0;
  if (chance3star < 0)
    chance3star = 0;
  if (chance4star === 100)
    chance5star = 0;
  const item = [
    {
      rarity: 3,
      chance: chance3star
    },
    {
      rarity: 4,
      chance: chance4star
    },
    {
      rarity: 5,
      chance: chance5star
    }
  ];
  const { rarity } = prob(item);
  let pity = 1;
  const rollQty = rollCounter.get(banner);
  rollCounter.set(banner, rollQty + 1);
  if (banner === "beginner") {
    beginnerRemaining.update((v) => v < 1 ? 0 : v - 1);
    if (rollQty >= 19)
      showBeginner.set(false);
  }
  if (rarity === 5) {
    localPity.set(`pity4-${banner}`, pity4);
    localPity.set(`pity5-${banner}`, 0);
    pity = pity5;
  }
  if (rarity === 4) {
    localPity.set(`pity4-${banner}`, 0);
    localPity.set(`pity5-${banner}`, pity5);
    pity = pity4;
  }
  if (rarity === 3) {
    localPity.set(`pity4-${banner}`, pity4);
    localPity.set(`pity5-${banner}`, pity5);
  }
  const randomItem = WishInstance.getItem(rarity, banner, indexOfBanner);
  const { manual, wish } = owneditem.put({ itemID: randomItem.itemID });
  const numberOfOwnedItem = manual + wish - 1;
  const isNew = numberOfOwnedItem < 1;
  await saveResult({ pity, ...randomItem });
  const isFullConstellation = numberOfOwnedItem > 6;
  if (randomItem.type === "character" && !isNew) {
    randomItem.stelaFortuna = !isFullConstellation;
  }
  const bonusType = randomItem.rarity === 3 ? "stardust" : "starglitter";
  const bonusQty = getMilestoneQty(randomItem.rarity, randomItem.type, isFullConstellation, isNew);
  const result = { pity, isNew, bonusType, bonusQty, ...randomItem };
  return result;
};
const saveResult = async (result) => {
  const data2 = { ...result };
  delete data2.release;
  delete data2.limited;
  delete data2.offset;
  await addHistory(data2);
};
const getMilestoneQty = (rarity, type, isFullConstellation, isNew) => {
  if (type === "weapon") {
    if (rarity === 3)
      return 15;
    if (rarity === 4)
      return 2;
    return 10;
  }
  if (isNew)
    return 0;
  if (rarity === 4)
    return isFullConstellation ? 5 : 2;
  return isFullConstellation ? 25 : 10;
};
const css$x = {
  code: ".primogem.svelte-19jgwr3 span.svelte-19jgwr3{width:1.2rem;height:1.2rem;color:rgba(0, 0, 0, 0.7);background-color:#e0ddd4;border-radius:100%;position:absolute;right:3px;top:50%;font-size:110%;line-height:0;display:inline-flex;justify-content:center;align-items:center;transform:translateY(-50%);transition:all 0.2s}.primogem.increament.svelte-19jgwr3.svelte-19jgwr3{padding-right:2rem !important}.primogem.svelte-19jgwr3:active span.svelte-19jgwr3{transform:translateY(-50%) scale(0.9);color:#fff;border-color:darkgray}.primogem.svelte-19jgwr3:hover span.svelte-19jgwr3{border-color:#fff;box-shadow:rgb(160 175 190 / 60%) 0px 0px 7px 5px}button.svelte-19jgwr3.svelte-19jgwr3{display:inline-block;height:25px;overflow:hidden;background-color:rgba(0, 0, 0, 0.3);border-radius:50px;color:#fff;vertical-align:middle;text-align:center;position:relative;margin:0 10px 0 0;padding:0 1rem 0 1.85rem;border:0.7px solid #656565}@media screen and (max-width: 900px){button.svelte-19jgwr3.svelte-19jgwr3{height:20px;margin:0 3px}}@media screen and (max-width: 400px){.primogem.svelte-19jgwr3.svelte-19jgwr3{margin-bottom:2px}.gi-plus.svelte-19jgwr3.svelte-19jgwr3{right:2px;transform:translateY(-50%) scale(0.9)}}",
  map: null
};
const MyFund = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { type = "primogem" } = $$props;
  let { plusbutton = false } = $$props;
  const allowAddition = type === "primogem" && plusbutton;
  getContext("openConvertModal");
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.plusbutton === void 0 && $$bindings.plusbutton && plusbutton !== void 0)
    $$bindings.plusbutton(plusbutton);
  $$result.css.add(css$x);
  return `<button class="${[
    escape(null_to_empty(type), true) + " svelte-19jgwr3",
    allowAddition ? "increament" : ""
  ].join(" ").trim()}">${validate_component(Icon$1, "Icon").$$render(
    $$result,
    {
      type,
      height: "80%",
      width: "auto",
      style: "position: absolute; left: 5px;top: 50%; transform: translateY(-50%);"
    },
    {},
    {}
  )}
	${slots.default ? slots.default({}) : ``}
	${allowAddition ? `<span class="${"svelte-19jgwr3"}"><i class="${"gi-plus svelte-19jgwr3"}"></i></span>` : ``}
</button>`;
});
const css$w = {
  code: ".notice.svelte-v7y2hv{position:absolute;right:0.5rem;z-index:+1}span.svelte-v7y2hv{color:#fff;background-color:#de2f22;display:inline-flex;justify-content:center;align-items:center;border-radius:100%;aspect-ratio:1/1;font-size:xx-small;padding:0.3rem;line-height:0}.mobile span.svelte-v7y2hv{font-size:0.4rem;padding:0.25rem}",
  map: null
};
const NoticeMark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $notice, $$unsubscribe_notice;
  $$unsubscribe_notice = subscribe(notice, (value) => $notice = value);
  let { name = "" } = $$props;
  let { style = "" } = $$props;
  let active = false;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  $$result.css.add(css$w);
  {
    {
      if (!Array.isArray(name)) {
        active = !$notice.includes(name);
      } else {
        const tmp = [];
        name.forEach((n) => tmp.push($notice.includes(n)));
        active = tmp.includes(false);
      }
    }
  }
  $$unsubscribe_notice();
  return `${active ? `<div class="${"notice svelte-v7y2hv"}"${add_attribute("style", style, 0)}><span class="${"svelte-v7y2hv"}">i</span></div>` : ``}`;
});
const css$v = {
  code: ".fatepoint-button.svelte-1vj2we9.svelte-1vj2we9{width:15vh}.mobile .fatepoint-button.svelte-1vj2we9.svelte-1vj2we9{width:18vh}.active.svelte-1vj2we9 svg.svelte-1vj2we9{filter:drop-shadow(0 0 0.5rem rgb(0, 183, 255))}@media screen and (max-width: 500px){.fatepoint-button.svelte-1vj2we9.svelte-1vj2we9{width:10vh}}.fil1.svelte-1vj2we9.svelte-1vj2we9{fill:#fefefe}.fil2.svelte-1vj2we9.svelte-1vj2we9{fill:#5f6e8b}.fil3.svelte-1vj2we9.svelte-1vj2we9{fill:transparent}.active.svelte-1vj2we9 .fil3.svelte-1vj2we9{fill:#62c5ff}.fil0.svelte-1vj2we9.svelte-1vj2we9{fill:#a0907d}",
  map: null
};
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { active = false } = $$props;
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  $$result.css.add(css$v);
  return `<div class="${["fatepoint-button svelte-1vj2we9", active ? "active" : ""].join(" ").trim()}"><svg xmlns="${"http://www.w3.org/2000/svg"}" xml:space="${"preserve"}" width="${"100%"}" height="${"100%"}" version="${"1.1"}" style="${"shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"}" viewBox="${"0 0 508847 506460"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" class="${"svelte-1vj2we9"}"><g id="${"Layer_x0020_1"}"><metadata id="${"CorelCorpID_0Corel-Layer"}"></metadata><circle class="${"fil0 svelte-1vj2we9"}" cx="${"254424"}" cy="${"253230"}" r="${"235000"}"></circle><path class="${"fil1 svelte-1vj2we9"}" d="${"M255693 0c13547,26247 28024,32190 42571,35155 86821,17695 155401,85552 174155,171983 3340,15397 8488,34162 36428,46862 -23707,12700 -32662,29168 -35212,42704 -17117,90856 -89026,162369 -180088,178895 -13076,2373 -26000,6154 -39547,30861 -11853,-20473 -28814,-28563 -42256,-31076 -92318,-17262 -164722,-91085 -179876,-184128 -1926,-11825 -6468,-24556 -31868,-35563 27093,-10160 29923,-25044 31812,-36761 14555,-90240 82951,-162462 171176,-182650 16150,-3695 39159,-5802 52705,-36282z"}"></path><path class="${"fil2 svelte-1vj2we9"}" d="${"M255542 30055c11940,23132 24698,28369 37519,30983 76516,15594 136957,75398 153485,151571 2944,13569 7481,30107 32104,41300 -20893,11192 -28785,25706 -31032,37635 -15086,80073 -78460,143098 -158714,157663 -11524,2091 -22915,5423 -34854,27198 -10446,-18043 -25394,-25173 -37240,-27388 -81362,-15213 -145172,-80274 -158528,-162274 -1697,-10422 -5700,-21642 -28085,-31342 23877,-8954 26371,-22072 28036,-32398 12828,-79530 73106,-143180 150860,-160972 14233,-3257 34511,-5114 46449,-31976z"}"></path><path class="${"fil1 svelte-1vj2we9"}" d="${"M330264 271900c123,-533 12562,-25081 10158,-32020 -1162,-1427 -2401,-2861 -3702,-5015 -10709,-2024 -12079,-25210 -13164,-33686 -14482,-47196 -72342,-40941 -75929,-52261 -358,-5588 -312,-4871 -670,-10459 -7941,-1020 -13237,1312 -15009,8106 -10178,3252 -5167,18577 -5501,26637 -1026,-642 -5493,-4403 -5588,-4447 -15337,-7251 -37943,31295 -36627,45876 -2865,18246 -4687,19434 -13733,25783 -2850,2000 -600,259 -2382,1933l565 8165c13533,41301 39679,48402 77665,53316 -1307,1383 991,2598 -2457,4085 -17607,7585 -16560,12591 -21001,31019 -1670,3686 -3464,12046 -2869,16028 -138,14893 63684,19907 79345,971 1836,-15767 -2789,-25064 -10248,-39071 -6148,-5850 -3857,-7275 -14719,-8437 -5230,-2021 -2896,1743 -3630,-4393 21183,67 46793,-11256 59496,-32130zm-57388 55269c4914,9251 4765,12192 14138,13865 -8154,-4650 -10703,-14461 -18651,-21822 -5039,-2075 -10340,-4118 -13672,-3026 -6579,2156 -10978,6676 -17718,15712 8536,-3503 10646,-9555 18301,-13067 7391,5619 -1300,14794 -3372,23823 -1079,4703 476,9454 2036,12648 -2369,-10300 409,-16090 6895,-17943 3642,6892 3606,8549 8908,12534 -3457,-7528 -12293,-20101 -7056,-29210 3890,-1154 4734,2232 10191,6486zm-30308 -71245c-9691,1465 -6106,3188 -12543,6960 -10988,6437 -14245,-5177 -25718,-6891 2209,18389 33672,21098 38261,-69zm30053 0c9691,1465 6106,3188 12543,6960 10987,6437 14245,-5177 25718,-6891 -2209,18389 -33672,21098 -38261,-69zm-15561 31599c6016,-1307 5913,-1191 7499,-6781 -3798,-269 -10937,-717 -14214,-158 1060,4275 2615,5911 6715,6939z"}"></path><path class="${"fil3 svelte-1vj2we9"}" d="${"M254424 68164c102209,0 185066,82857 185066,185066 0,102209 -82857,185066 -185066,185066 -102209,0 -185066,-82857 -185066,-185066 0,-102209 82857,-185066 185066,-185066zm0 28190c86640,0 156876,70236 156876,156876 0,86640 -70236,156876 -156876,156876 -86640,0 -156876,-70236 -156876,-156876 0,-86640 70236,-156876 156876,-156876z"}"></path><path class="${"fil1 svelte-1vj2we9"}" d="${"M329531 141779c3037,10634 9793,17203 20000,20000 -10634,3037 -17203,9793 -20000,20000 -3037,-10634 -9793,-17203 -20000,-20000 10634,-3037 17203,-9793 20000,-20000z"}"></path><path class="${"fil1 svelte-1vj2we9"}" d="${"M165200 297389c2278,7976 7345,12902 15000,15000 -7976,2278 -12902,7345 -15000,15000 -2278,-7976 -7345,-12902 -15000,-15000 7976,-2278 12902,-7345 15000,-15000z"}"></path><path class="${"fil1 svelte-1vj2we9"}" d="${"M362750 205788c1519,5317 4897,8602 10000,10000 -5317,1519 -8602,4897 -10000,10000 -1519,-5317 -4897,-8602 -10000,-10000 5317,-1519 8602,-4897 10000,-10000z"}"></path></g></svg>
</div>`;
});
const css$u = {
  code: "button.svelte-15mfo3k.svelte-15mfo3k{position:relative;pointer-events:initial}.point-number.svelte-15mfo3k.svelte-15mfo3k{border-radius:50px;background-color:#ece4d9;border:3px solid #fff;padding:0.2rem;width:100%;transition:all 0.2s;color:#a49a90;border:1px solid #a49a90;display:inline-flex;justify-content:center;align-items:center;position:absolute;bottom:5%;left:50%;transform:translateX(-50%)}.point-number.svelte-15mfo3k span.svelte-15mfo3k{color:#ff8700}.point-number.svelte-15mfo3k span.small.svelte-15mfo3k{font-size:calc(0.101 * var(--height));line-height:110%;display:inline-block;color:var(--text-color);padding:1% 10%}.mobile button.svelte-15mfo3k.svelte-15mfo3k{font-size:90%;padding:0 0.2rem;margin-top:auto;margin-bottom:10%}.mobile span.svelte-15mfo3k.svelte-15mfo3k:not(.small){font-size:120%}.mobile .point-number.svelte-15mfo3k.svelte-15mfo3k{padding:0.1rem}",
  map: null
};
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $activeBanner, $$unsubscribe_activeBanner;
  let $bannerList, $$unsubscribe_bannerList;
  let $activeVersion, $$unsubscribe_activeVersion;
  let $course, $$unsubscribe_course;
  let $t, $$unsubscribe_t;
  $$unsubscribe_activeBanner = subscribe(activeBanner, (value) => $activeBanner = value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_activeVersion = subscribe(activeVersion, (value) => $activeVersion = value);
  $$unsubscribe_course = subscribe(course, (value) => $course = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let buttonHeight;
  let patch, phase, type, fatepointsystem;
  const handleEpitomizedModal = getContext("handleEpitomizedModal");
  const handleClick = () => {
    playSfx("exchange");
    handleEpitomizedModal();
    noticeMark.openNotice(`fatepoint${patch}-${phase}`);
  };
  hotkeys("e", "index", (e) => {
    e.preventDefault();
    if (!fatepointsystem || type !== "weapon-event")
      return;
    handleClick();
  });
  $$result.css.add(css$u);
  ({ patch, phase } = $activeVersion);
  ({ fatepointsystem, type } = $bannerList[$activeBanner]);
  $$unsubscribe_activeBanner();
  $$unsubscribe_bannerList();
  $$unsubscribe_activeVersion();
  $$unsubscribe_course();
  $$unsubscribe_t();
  return `${fatepointsystem ? `<button class="${"container svelte-15mfo3k"}" style="${"--height:" + escape(buttonHeight, true) + "px"}">${validate_component(NoticeMark, "NoticeMark").$$render($$result, { name: "fatepoint" + patch + "-" + phase }, {}, {})}
		${validate_component(Icon, "EpitomizedIcon").$$render($$result, { active: $course.point === 2 }, {}, {})}
		<div class="${"point-number svelte-15mfo3k"}">${$course.selected !== null ? `<span class="${"svelte-15mfo3k"}">${escape($course.point)}</span>/2` : `<span class="${"small svelte-15mfo3k"}">${escape($t("wish.epitomizedPath.text"))}</span>`}</div></button>` : ``}`;
});
const css$t = {
  code: "button.svelte-1aipbo4.svelte-1aipbo4{display:block;background-color:var(--secondary-color);border-radius:0.25rem;width:90px;min-width:50px;aspect-ratio:2.4/1;margin:0.6em;position:relative;transition:all.2s}button.svelte-1aipbo4.svelte-1aipbo4::after,button.svelte-1aipbo4.svelte-1aipbo4::before{content:'';display:block;width:90%;height:75%;border:2.5px solid #6d8fbb;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);transition:all 0.2s}button.svelte-1aipbo4.svelte-1aipbo4::after{border-radius:0.4rem}button.svelte-1aipbo4.svelte-1aipbo4::before{border-radius:40px}button.active.svelte-1aipbo4.svelte-1aipbo4,button.svelte-1aipbo4.svelte-1aipbo4:hover{background-color:var(--tertiary-color)}button.active.svelte-1aipbo4.svelte-1aipbo4::before,button.active.svelte-1aipbo4.svelte-1aipbo4::after,button.svelte-1aipbo4.svelte-1aipbo4:hover::before,button.svelte-1aipbo4.svelte-1aipbo4:hover::after{border:2.5px solid #eee2c8}button.active.svelte-1aipbo4.svelte-1aipbo4,button.svelte-1aipbo4.svelte-1aipbo4:hover{transform:scale(1.1)}.gi-primo-star.svelte-1aipbo4.svelte-1aipbo4{left:15px;font-size:0.7rem}.gi-companion.svelte-1aipbo4.svelte-1aipbo4{right:5px;font-size:3rem;line-height:0;top:55% !important}.gi-primo-star.svelte-1aipbo4.svelte-1aipbo4,.gi-companion.svelte-1aipbo4.svelte-1aipbo4{position:absolute;top:50%;transform:translateY(-50%);color:#6d8fbb;transition:all 0.2s}.active.svelte-1aipbo4 .gi-primo-star.svelte-1aipbo4,.active.svelte-1aipbo4 .gi-companion.svelte-1aipbo4,button.svelte-1aipbo4:hover .gi-primo-star.svelte-1aipbo4,button.svelte-1aipbo4:hover .gi-companion.svelte-1aipbo4{color:#eee2c8}.picture.svelte-1aipbo4.svelte-1aipbo4{width:100%;height:150%;position:absolute;bottom:0;left:0;overflow:hidden;pointer-events:none;border-bottom-left-radius:7px;border-bottom-right-radius:7px}.wrapper.svelte-1aipbo4.svelte-1aipbo4{width:100%;height:100%;position:relative;z-index:+1;transition:all 0.2s;transform:translateY(-10%)}.mobile .wrapper.svelte-1aipbo4.svelte-1aipbo4{transform:translateY(0)}.active.svelte-1aipbo4 .wrapper.svelte-1aipbo4{transform:translateY(-25%)}.mobile .active.svelte-1aipbo4 .wrapper.svelte-1aipbo4{transform:translateY(-15%)}img.svelte-1aipbo4.svelte-1aipbo4{position:absolute;z-index:+1;left:50%;transform:translateX(-50%)}.discount.svelte-1aipbo4.svelte-1aipbo4{background-color:#8ab958;position:absolute;z-index:+2;left:50%;bottom:-5px;border-radius:20px;color:#fff;transform:scale(0.65) translateX(-50%);padding:0.2rem 0.5rem}@media screen and (min-width: 750px){.discount.svelte-1aipbo4.svelte-1aipbo4{font-size:0.7rem}}.mobile button.svelte-1aipbo4.svelte-1aipbo4{transform:scale(0.88);margin:2.5% 0;aspect-ratio:2.2/1}.mobile button.active.svelte-1aipbo4.svelte-1aipbo4{transform:scale(0.9)}",
  map: null
};
const Banner_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let baseNoticeName;
  let isWeapon;
  let noticeName;
  let $isFatepointSystem, $$unsubscribe_isFatepointSystem;
  let $activeVersion, $$unsubscribe_activeVersion;
  let $assets, $$unsubscribe_assets;
  $$unsubscribe_isFatepointSystem = subscribe(isFatepointSystem, (value) => $isFatepointSystem = value);
  $$unsubscribe_activeVersion = subscribe(activeVersion, (value) => $activeVersion = value);
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  let { active = false } = $$props;
  let { type = "beginner" } = $$props;
  let { featured = [] } = $$props;
  let { character = "" } = $$props;
  let { index = 0 } = $$props;
  const buttonOffset = (itemName, buttonPosition = {}) => {
    const data$2 = type === "weapon-event" ? data : data$1;
    const { offset = {} } = data$2.find(({ name }) => name === itemName) || {};
    const { button = {} } = offset;
    Object.keys(buttonPosition).forEach((key) => button[key] = buttonPosition[key]);
    return button;
  };
  let patch, phase;
  const setNotice = () => {
    if (!active || !type.match("event"))
      return;
    noticeMark.openNotice(baseNoticeName);
  };
  createEventDispatcher();
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.featured === void 0 && $$bindings.featured && featured !== void 0)
    $$bindings.featured(featured);
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  $$result.css.add(css$t);
  ({ patch, phase } = $activeVersion);
  baseNoticeName = `${patch}-${phase}-${index}`;
  isWeapon = type === "weapon-event" && $isFatepointSystem;
  noticeName = isWeapon ? `fatepoint${patch}-${phase}` : baseNoticeName;
  {
    setNotice();
  }
  $$unsubscribe_isFatepointSystem();
  $$unsubscribe_activeVersion();
  $$unsubscribe_assets();
  return `<button class="${["button " + escape(type, true) + " svelte-1aipbo4", active ? "active" : ""].join(" ").trim()}">${type.match("event") ? `${validate_component(NoticeMark, "NoticeMark").$$render(
    $$result,
    {
      name: noticeName,
      style: "transform: translateY(-130%) translateX(50%); z-index:+10"
    },
    {},
    {}
  )}` : ``}
	<i class="${"gi-primo-star svelte-1aipbo4"}"></i>
	<i class="${"gi-companion svelte-1aipbo4"}"></i>
	<div class="${"picture svelte-1aipbo4"}"><div class="${"wrapper svelte-1aipbo4"}">${type === "weapon-event" ? `${each(featured, ({ name, buttonPosition }) => {
    return `<img${add_attribute("src", $assets[name], 0)} alt="${"Weapon Wish"}"${add_attribute("style", positionToStyle(buttonOffset(name, buttonPosition)), 0)} crossorigin="${"anonymous"}" class="${"svelte-1aipbo4"}">`;
  })}` : `<img${add_attribute("src", $assets[`button/${character}`], 0)} alt="${escape(type, true) + " Wish"}"${add_attribute("style", positionToStyle(buttonOffset(character)), 0)} crossorigin="${"anonymous"}" class="${"svelte-1aipbo4"}">`}</div></div>
	${type === "beginner" ? `<div class="${"discount svelte-1aipbo4"}">-20%</div>` : ``}
</button>`;
});
const css$s = {
  code: "#header.svelte-10cweyq.svelte-10cweyq{position:relative;display:block;width:100%;padding:30px 2%;z-index:5}h1.svelte-10cweyq button.svelte-10cweyq{display:inline-flex;justify-content:center;align-items:center;color:#fff;margin-left:0.7rem;line-height:0;transition:all 0.2s}h1.svelte-10cweyq button.svelte-10cweyq:hover{background-color:var(--tertiary-color);color:#3a4156}.help.svelte-10cweyq.svelte-10cweyq{border-radius:50px;border:0.15rem solid #fff;width:1.7rem;height:1.7rem}.fullscreen.svelte-10cweyq.svelte-10cweyq{border-color:transparent;transform:scale(1.3);width:1.3rem;height:1.3rem}.bg.svelte-10cweyq.svelte-10cweyq{display:none}.top.svelte-10cweyq.svelte-10cweyq{display:flex;justify-content:space-between;width:100%;position:relative}.wish-title.svelte-10cweyq.svelte-10cweyq{color:#fff;text-transform:capitalize;display:flex;align-items:center;text-align:left;font-size:110%}.wish-title.svelte-10cweyq img.svelte-10cweyq{width:30px;margin-right:15px}.budget.svelte-10cweyq.svelte-10cweyq{text-align:right;display:flex;justify-content:flex-end;align-items:center}.banner-button.svelte-10cweyq.svelte-10cweyq{text-align:center;display:flex;justify-content:center;position:relative;z-index:10}.mobile #header.svelte-10cweyq.svelte-10cweyq{padding:0 !important}.mobile .top.svelte-10cweyq.svelte-10cweyq{position:fixed;top:0;right:2%;width:calc(100% - 100px);display:flex;justify-content:space-between;padding-right:4%}.mobile .wish-title.svelte-10cweyq img.svelte-10cweyq{display:none}.mobile .banner-button.svelte-10cweyq.svelte-10cweyq{flex-direction:column;align-items:center;width:120px;margin-top:0;height:100%;justify-content:flex-start;padding-top:2.5rem;z-index:-10}.mobile .bg.svelte-10cweyq.svelte-10cweyq{display:block;position:absolute;top:0;left:50%;width:40px;background-color:rgba(0, 0, 0, 0.4);z-index:-1;transform:translateX(-50%);text-align:center;border:solid rgba(207, 186, 143, 0.5);border-width:0 2px}.bg.svelte-10cweyq>img.svelte-10cweyq{width:60%;margin-top:3px}@media screen and (min-width: 975px){main:not(.mobile) .banner-button.svelte-10cweyq.svelte-10cweyq{position:absolute;max-width:50%;top:20px;left:50%;transform:translateX(-50%);margin-top:0}}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let event;
  let balance;
  let unlimitedWish;
  let headerHeightstyle;
  let fullscreen;
  let $onWish, $$unsubscribe_onWish;
  let $viewportHeight, $$unsubscribe_viewportHeight;
  let $mobileMode, $$unsubscribe_mobileMode;
  let $activeBanner, $$unsubscribe_activeBanner;
  let $wishAmount, $$unsubscribe_wishAmount;
  let $acquaint, $$unsubscribe_acquaint;
  let $intertwined, $$unsubscribe_intertwined;
  let $assets, $$unsubscribe_assets;
  let $editorMode, $$unsubscribe_editorMode;
  let $t, $$unsubscribe_t;
  let $isPWA, $$unsubscribe_isPWA;
  let $isMobile, $$unsubscribe_isMobile;
  let $starglitter, $$unsubscribe_starglitter;
  let $stardust, $$unsubscribe_stardust;
  let $primogem, $$unsubscribe_primogem;
  let $isCustomBanner, $$unsubscribe_isCustomBanner;
  let $bannerList, $$unsubscribe_bannerList;
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  $$unsubscribe_activeBanner = subscribe(activeBanner, (value) => $activeBanner = value);
  $$unsubscribe_wishAmount = subscribe(wishAmount, (value) => $wishAmount = value);
  $$unsubscribe_acquaint = subscribe(acquaint, (value) => $acquaint = value);
  $$unsubscribe_intertwined = subscribe(intertwined, (value) => $intertwined = value);
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  $$unsubscribe_editorMode = subscribe(editorMode, (value) => $editorMode = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_isPWA = subscribe(isPWA, (value) => $isPWA = value);
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => $isMobile = value);
  $$unsubscribe_starglitter = subscribe(starglitter, (value) => $starglitter = value);
  $$unsubscribe_stardust = subscribe(stardust, (value) => $stardust = value);
  $$unsubscribe_primogem = subscribe(primogem, (value) => $primogem = value);
  $$unsubscribe_isCustomBanner = subscribe(isCustomBanner, (value) => $isCustomBanner = value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  let { bannerType = "" } = $$props;
  getContext("chatToggle");
  const navigate = getContext("navigate");
  const previousClick = () => {
    navigate("allbanners");
    playSfx();
  };
  const handleMenu = getContext("handleMenu");
  const onWish = getContext("onWish");
  $$unsubscribe_onWish = subscribe(onWish, (value) => $onWish = value);
  hotkeys("esc", "index", (e) => {
    if ($onWish)
      return;
    e.preventDefault();
    previousClick();
  });
  hotkeys("m", "index", (e) => {
    if ($onWish)
      return;
    e.preventDefault();
    handleMenu();
  });
  if ($$props.bannerType === void 0 && $$bindings.bannerType && bannerType !== void 0)
    $$bindings.bannerType(bannerType);
  $$result.css.add(css$s);
  event = bannerType.match("event");
  balance = event ? $intertwined : $acquaint;
  unlimitedWish = $wishAmount === "unlimited";
  headerHeightstyle = $mobileMode ? `height: ${$viewportHeight}px` : "";
  fullscreen = $viewportHeight === window.screen.height;
  $$unsubscribe_onWish();
  $$unsubscribe_viewportHeight();
  $$unsubscribe_mobileMode();
  $$unsubscribe_activeBanner();
  $$unsubscribe_wishAmount();
  $$unsubscribe_acquaint();
  $$unsubscribe_intertwined();
  $$unsubscribe_assets();
  $$unsubscribe_editorMode();
  $$unsubscribe_t();
  $$unsubscribe_isPWA();
  $$unsubscribe_isMobile();
  $$unsubscribe_starglitter();
  $$unsubscribe_stardust();
  $$unsubscribe_primogem();
  $$unsubscribe_isCustomBanner();
  $$unsubscribe_bannerList();
  return `<div id="${"header"}"${add_attribute("style", headerHeightstyle, 0)} class="${"svelte-10cweyq"}"><div class="${"top svelte-10cweyq"}"><h1 class="${"wish-title svelte-10cweyq"}"><img${add_attribute("src", $assets["brand.png"], 0)} alt="${"Brand"}" crossorigin="${"anonymous"}" class="${"svelte-10cweyq"}">

			${!$editorMode ? `<span>${escape($t("wish.wishTitle"))}</span>` : `<span>${escape($t("customBanner.title"))}</span>`}

			<button class="${"help svelte-10cweyq"}" title="${"Setting"}" aria-label="${"Setting"}"><i class="${"gi-help"}"></i></button>
			

			${!$isPWA || !$isMobile ? `<button class="${"fullscreen svelte-10cweyq"}" title="${"FullScreen"}" aria-label="${"Fullscreen"}"><i class="${"gi-" + escape(!fullscreen ? "fullscreen" : "shrink", true)}"></i></button>` : ``}</h1>
		<div class="${"budget svelte-10cweyq"}">${!$editorMode ? `<div class="${"fates"}">${$mobileMode ? `${validate_component(MyFund, "MyFund").$$render($$result, { type: "starglitter" }, {}, {
    default: () => {
      return `${escape($starglitter)}`;
    }
  })}
						${validate_component(MyFund, "MyFund").$$render($$result, { type: "stardust" }, {}, {
    default: () => {
      return `${escape($stardust)}`;
    }
  })}` : ``}

					${validate_component(MyFund, "MyFund").$$render($$result, { type: "primogem", plusbutton: true }, {}, {
    default: () => {
      return `${escape(unlimitedWish ? "\u221E" : $primogem)}`;
    }
  })}
					${validate_component(MyFund, "MyFund").$$render($$result, { type: event ? "intertwined" : "acquaint" }, {}, {
    default: () => {
      return `${escape(unlimitedWish ? "\u221E" : balance)}`;
    }
  })}</div>

				<button class="${"close"}" title="${"Change Banner"}"><i class="${"gi-close"}"></i></button>
				<button class="${"close"}" title="${"close"}"><i class="${"gi-close"}"></i></button>` : `<button class="${"close"}" title="${"Cancel Edit"}"><i class="${"gi-close"}"></i></button>`}</div></div>

	${!$editorMode && !$isCustomBanner ? `<div class="${"banner-button svelte-10cweyq"}"><div class="${"bg svelte-10cweyq"}"${add_attribute("style", headerHeightstyle, 0)}><img${add_attribute("src", $assets["brand.png"], 0)} alt="${"Brand"}" crossorigin="${"anonymous"}" class="${"svelte-10cweyq"}"></div>

			${each($bannerList, ({ type, featured, character }, i) => {
    return `${validate_component(Banner_button, "BannerButton").$$render(
      $$result,
      {
        type,
        featured,
        character,
        index: i,
        active: $activeBanner === i
      },
      {},
      {}
    )}`;
  })}

			${$mobileMode && bannerType === "weapon-event" ? `${validate_component(Button, "EpitomizedButton").$$render($$result, {}, {}, {})}` : ``}</div>` : `<div class="${"banner-button svelte-10cweyq"}"></div>`}
</div>`;
});
const getBannerName = (banner) => {
  const split = banner.split("-");
  return { name: split.slice(0, -1).join("-"), number: split[split.length - 1] };
};
const highlightBannerName = (bannerName, vision) => {
  const name = bannerName;
  const splited = name.trim().split(" ");
  const wordCount = splited.length - 1;
  if (wordCount < 1)
    return `<span class="${vision}-flat">${bannerName}</span>`;
  const modulo = wordCount % 2;
  const halfOfTextIndex = (wordCount - modulo) / 2;
  const frontText = splited.filter((w, i) => i <= halfOfTextIndex).join(" ");
  const endText = splited.filter((w, i) => i > halfOfTextIndex).join(" ");
  return `<span class="${vision}-flat">${frontText}</span> ${endText}`;
};
const Publisher_svelte_svelte_type_style_lang = "";
const css$r = {
  code: ".publisher.svelte-ru4wkb.svelte-ru4wkb{position:fixed;z-index:+20;top:0;left:0;width:var(--screen-width);height:var(--screen-height);background-color:rgba(0, 0, 0, 0.2);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;justify-content:center;align-items:center}.load-text.svelte-ru4wkb span{color:#ff9615}.container.svelte-ru4wkb.svelte-ru4wkb{width:600px;max-width:90%;background-color:#fbf6ee;border:2px solid #ddd5c8;border-radius:0.5rem;padding:3% 1.5%}.load-text.svelte-ru4wkb.svelte-ru4wkb{display:inline-block}.load-text.svelte-ru4wkb.svelte-ru4wkb::after{content:'.';position:absolute;right:0;transform:translateX(100%);bottom:0;animation:svelte-ru4wkb-dot 3s infinite}.progress-bar.svelte-ru4wkb.svelte-ru4wkb{width:100%;height:0.2rem;background-color:#ccc;margin:3% 0;position:relative;border-radius:1rem}.progress-bar.svelte-ru4wkb span.svelte-ru4wkb{border-radius:inherit;position:absolute;left:0;top:50%;transform:translateY(-50%);width:var(--per);height:120%;background-image:linear-gradient(to left, #898e9d, #4a5265);box-shadow:0 0 0.1rem #fff;transition:width 0.05s}.content.svelte-ru4wkb.svelte-ru4wkb{text-align:center}.loader.svelte-ru4wkb.svelte-ru4wkb{margin:3% 0}.report.svelte-ru4wkb.svelte-ru4wkb{padding-top:0.5rem;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;font-style:italic}.report.svelte-ru4wkb button.svelte-ru4wkb{color:orange;font-weight:bold;font-style:inherit;transition:all 0.25s}.report.svelte-ru4wkb button.svelte-ru4wkb:hover{text-decoration:underline}@media screen and (max-width: 640px){.loader.svelte-ru4wkb.svelte-ru4wkb{margin:7% 0}}.copy-text.svelte-ru4wkb.svelte-ru4wkb,.loader.svelte-ru4wkb.svelte-ru4wkb{display:flex;align-items:center;text-align:center;justify-content:center;width:100%}.copy-text.svelte-ru4wkb label.svelte-ru4wkb{padding:2% 5%;background-color:#fff;border:1px solid #898e9d;border-radius:3rem;white-space:nowrap;width:80%;overflow:hidden;text-overflow:ellipsis}.copy-text.svelte-ru4wkb button.svelte-ru4wkb{background-color:#898e9d;color:#fff;line-height:0;padding:2% 2.5%;margin:1%;border-radius:3rem;font-size:80%;display:inline-flex;align-items:center;transition:all 0.25s}.copy-text.svelte-ru4wkb button.svelte-ru4wkb:hover{background-color:#4a5265}.shareable.svelte-ru4wkb.svelte-ru4wkb{padding:2%}.shareable.svelte-ru4wkb button.svelte-ru4wkb{padding:0;border-radius:100%;z-index:10;aspect-ratio:1 / 1;display:inline-flex;justify-content:center;align-items:center;line-height:0;margin:0 0.2rem;font-size:100%;opacity:0.75;width:2.2rem;transition:all 0.25s;color:#fff}.shareable.svelte-ru4wkb button.svelte-ru4wkb:hover{opacity:1}button.svelte-ru4wkb.svelte-ru4wkb:active{transform:scale(0.9)}.twitter.svelte-ru4wkb.svelte-ru4wkb{background-color:#1da1f2}.facebook.svelte-ru4wkb.svelte-ru4wkb{background-color:#4267b2}.save.svelte-ru4wkb.svelte-ru4wkb{background-color:#3f4349}.toast.svelte-ru4wkb.svelte-ru4wkb{position:fixed;z-index:+25;top:50%;left:50%;transform:translate(-50%, -50%);display:inline-block;padding:0.5rem 1rem;border-radius:0.5rem;background-color:rgba(173, 128, 65, 0.8);color:#fff;font-size:0.75rem}@keyframes svelte-ru4wkb-dot{0%{content:'.'}25%{content:'..'}50%{content:'...'}100%{content:''}}",
  map: null
};
const Publisher = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_editID;
  let $$unsubscribe_isMobile;
  let $t, $$unsubscribe_t;
  $$unsubscribe_editID = subscribe(editID, (value) => value);
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let percentage = 0;
  let itemInProccess = "";
  const itemName = {
    artURL: "SplashArt",
    faceURL: "Face",
    thumbnail: "Banner Preview"
  };
  getContext("chatToggle");
  getContext("publishError");
  getContext("publishDone");
  getContext("closePublisher");
  $$result.css.add(css$r);
  $t("customBanner.shareText");
  $$unsubscribe_editID();
  $$unsubscribe_isMobile();
  $$unsubscribe_t();
  return `${``}

<div class="${"publisher svelte-ru4wkb"}"><div class="${"container svelte-ru4wkb"}">${`<div class="${"content svelte-ru4wkb"}"><caption class="${"load-text svelte-ru4wkb"}" style="${"position: relative;"}"><!-- HTML_TAG_START -->${$t("customBanner.uploading", {
    values: {
      item: `<span>${itemName[itemInProccess]}</span>`
    }
  })}<!-- HTML_TAG_END --></caption>
				<div class="${"progress-bar svelte-ru4wkb"}" style="${"--per:" + escape(percentage, true) + "%"}"><span class="${"svelte-ru4wkb"}"></span></div></div>`}</div>
</div>`;
});
const _footer_svelte_svelte_type_style_lang = "";
const css$q = {
  code: "#footer.svelte-6g0x8w.svelte-6g0x8w{position:relative}.red.svelte-6g0x8w.svelte-6g0x8w{color:#de2f22 !important}.footer-info.svelte-6g0x8w.svelte-6g0x8w{position:absolute;left:5%;bottom:75%;align-items:center;display:flex;flex-direction:column;pointer-events:none}.wish.svelte-6g0x8w>div.svelte-6g0x8w{display:inline-flex;align-items:center;margin-right:5px;padding:2px 20px 2px 2px;font-size:0.9rem}.wish.svelte-6g0x8w span.svelte-6g0x8w{margin-left:10px;color:#fff;text-shadow:0 0 3px rgba(0, 0, 0, 0.5)}.wish-button.svelte-6g0x8w.svelte-6g0x8w{transform:scale(1);transition:all 0.2s;color:#4a5265;text-decoration:none;z-index:+5;position:relative}.wish-button.svelte-6g0x8w.svelte-6g0x8w:active{filter:brightness(85%)}button.svelte-6g0x8w.svelte-6g0x8w:active:not(:disabled){transform:scale(0.95)}.row.svelte-6g0x8w.svelte-6g0x8w{width:100%;height:100%;padding:0 5%;display:flex;justify-content:space-between;align-items:center}.roll-button.svelte-6g0x8w.svelte-6g0x8w{text-align:right}.roll-button.svelte-6g0x8w button.svelte-6g0x8w{background-image:var(--bg);background-size:contain;background-position:center;background-repeat:no-repeat;width:230px;aspect-ratio:355/88;margin:0 5px;display:inline-flex;justify-content:center;align-items:center;flex-direction:column;color:#a49a90;transition:all 0.2s}.roll-button.svelte-6g0x8w button.svelte-6g0x8w:disabled{filter:brightness(0.5)}.roll-button.svelte-6g0x8w button .bottom.svelte-6g0x8w{display:flex;align-items:center}.discount.svelte-6g0x8w.svelte-6g0x8w{background-color:#8ab958;position:absolute;z-index:+2;left:15%;top:-5%;border-radius:20px;color:#fff;transform:scale(0.8) translateX(-50%);padding:0.2rem 0.5rem}@media screen and (min-width: 750px){.discount.svelte-6g0x8w.svelte-6g0x8w{font-size:0.7rem}.roll-button.svelte-6g0x8w.svelte-6g0x8w{white-space:nowrap}}.mobile .row.svelte-6g0x8w.svelte-6g0x8w{padding:1rem 0;align-items:flex-end}.mobile .menu-button{padding-left:1%;white-space:nowrap}.mobile .roll-button.svelte-6g0x8w.svelte-6g0x8w{margin-right:40px !important;white-space:nowrap}.mobile .roll-button.svelte-6g0x8w button.svelte-6g0x8w{font-size:0.75rem}.mobile .roll-button.svelte-6g0x8w img{transform:scale(0.7)}.mobile .bottom.svelte-6g0x8w.svelte-6g0x8w{margin-top:-3px}@media screen and (max-width: 925px){button.svelte-6g0x8w.svelte-6g0x8w{padding:2px 15px;margin:2px 5px}.roll-button.svelte-6g0x8w button.svelte-6g0x8w{width:175px;margin:0}.roll-button.svelte-6g0x8w img{transform:scale(0.8)}}@media screen and (max-width: 700px){.roll-button.svelte-6g0x8w.svelte-6g0x8w{width:100%}}@media screen and (max-width: 550px){.menu-button.svelte-6g0x8w.svelte-6g0x8w{width:100%}.roll-button.svelte-6g0x8w.svelte-6g0x8w{width:auto}}@media screen and (max-width: 400px){.roll-button.svelte-6g0x8w button.svelte-6g0x8w{width:140px;margin:0}.roll-button.svelte-6g0x8w img{transform:scale(0.7)}.roll-button.svelte-6g0x8w .bottom.svelte-6g0x8w{margin-top:-3px}}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isBeginner;
  let isEvent;
  let currencyUsed;
  let fateType;
  let isUnlimited;
  let patch;
  let openedNotices;
  let hasNewOutfit;
  let $editorMode, $$unsubscribe_editorMode;
  let $onWish, $$unsubscribe_onWish;
  let $appReady, $$unsubscribe_appReady;
  let $t, $$unsubscribe_t;
  let $editID, $$unsubscribe_editID;
  let $multipull, $$unsubscribe_multipull;
  let $activeVersion, $$unsubscribe_activeVersion;
  let $wishAmount, $$unsubscribe_wishAmount;
  let $acquaint, $$unsubscribe_acquaint;
  let $intertwined, $$unsubscribe_intertwined;
  let $mobileMode, $$unsubscribe_mobileMode;
  let $starglitter, $$unsubscribe_starglitter;
  let $stardust, $$unsubscribe_stardust;
  let $assets, $$unsubscribe_assets;
  let $readyToPull, $$unsubscribe_readyToPull;
  $$unsubscribe_editorMode = subscribe(editorMode, (value) => $editorMode = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_editID = subscribe(editID, (value) => $editID = value);
  $$unsubscribe_multipull = subscribe(multipull, (value) => $multipull = value);
  $$unsubscribe_activeVersion = subscribe(activeVersion, (value) => $activeVersion = value);
  $$unsubscribe_wishAmount = subscribe(wishAmount, (value) => $wishAmount = value);
  $$unsubscribe_acquaint = subscribe(acquaint, (value) => $acquaint = value);
  $$unsubscribe_intertwined = subscribe(intertwined, (value) => $intertwined = value);
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  $$unsubscribe_starglitter = subscribe(starglitter, (value) => $starglitter = value);
  $$unsubscribe_stardust = subscribe(stardust, (value) => $stardust = value);
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  let { bannerType = "beginner" } = $$props;
  const onWish = getContext("onWish");
  $$unsubscribe_onWish = subscribe(onWish, (value) => $onWish = value);
  const readyToPull = getContext("readyToPull");
  $$unsubscribe_readyToPull = subscribe(readyToPull, (value) => $readyToPull = value);
  const navigate = getContext("navigate");
  const changePage = (page2) => {
    navigate(page2);
    if (["inventory", "history"].includes(page2))
      return playSfx(page2);
    if (page2 === "shop")
      return playSfx("shopopen");
    return playSfx();
  };
  const roll2 = getContext("doRoll");
  const handleSingleRollClick = () => {
    if (bannerType === "member") {
      if (!Array.isArray(memberDB) || memberDB.length == 0) {
        alert("\u8BF7\u70B9\u51FB\u5DE6\u4E0A\u89D2\u95EE\u53F7\u53BB\u4E0A\u4F20\u540D\u5355");
        return;
      }
    }
    playSfx("roll");
    roll2(1, bannerType);
  };
  const handleMultiRollClick = () => {
    if (bannerType === "member") {
      if (!Array.isArray(memberDB) || memberDB.length == 0) {
        alert("\u8BF7\u70B9\u51FB\u5DE6\u4E0A\u89D2\u95EE\u53F7\u53BB\u4E0A\u4F20\u540D\u5355");
        return;
      }
    }
    playSfx("roll");
    roll2(isBeginner ? 10 : $multipull, bannerType);
  };
  let showUploader = false;
  setContext("closePublisher", () => showUploader = false);
  setContext("publishDone", () => {
    preloadVersion.set({ patch: "Custom", phase: $editID });
    showUploader = false;
    playSfx("close");
  });
  setContext("publishError", () => {
    const toastMsg2 = $t("customBanner.networkError");
    pushToast({ message: toastMsg2, type: "error" });
    showUploader = false;
  });
  const appReady = getContext("appReady");
  $$unsubscribe_appReady = subscribe(appReady, (value) => $appReady = value);
  hotkeys("enter", "index", (e) => {
    if (!$appReady || $onWish || $editorMode)
      return;
    e.preventDefault();
    handleMultiRollClick();
  });
  hotkeys("shift+enter", "index", (e) => {
    if (!$appReady || $onWish || isBeginner || $editorMode)
      return;
    e.preventDefault();
    handleSingleRollClick();
  });
  hotkeys("s,c,h,d", "index", (e) => {
    if (!$appReady || $onWish || $editorMode)
      return;
    e.preventDefault();
    const [key] = hotkeys.getPressedKeyString();
    const to = key.toLocaleLowerCase();
    if (to === "s")
      return changePage("shop");
    if (to === "c")
      return changePage("inventory");
    if (to === "h")
      return changePage("history");
    if (to === "d")
      return changePage("details");
  });
  if ($$props.bannerType === void 0 && $$bindings.bannerType && bannerType !== void 0)
    $$bindings.bannerType(bannerType);
  $$result.css.add(css$q);
  isBeginner = bannerType === "beginner";
  isEvent = bannerType.match("event");
  currencyUsed = isEvent ? $intertwined : $acquaint;
  fateType = isEvent ? "intertwined" : "acquaint";
  isUnlimited = $wishAmount === "unlimited";
  patch = $activeVersion.patch;
  openedNotices = [`outfits-${patch}`, `recomended-${patch}`];
  hasNewOutfit = isNewOutfitReleased(patch);
  $$unsubscribe_editorMode();
  $$unsubscribe_onWish();
  $$unsubscribe_appReady();
  $$unsubscribe_t();
  $$unsubscribe_editID();
  $$unsubscribe_multipull();
  $$unsubscribe_activeVersion();
  $$unsubscribe_wishAmount();
  $$unsubscribe_acquaint();
  $$unsubscribe_intertwined();
  $$unsubscribe_mobileMode();
  $$unsubscribe_starglitter();
  $$unsubscribe_stardust();
  $$unsubscribe_assets();
  $$unsubscribe_readyToPull();
  return `${showUploader ? `${validate_component(Publisher, "BannerPublisher").$$render($$result, {}, {}, {})}` : ``}

<div id="${"footer"}" style="${"width: 100%; height: 100%"}" class="${"svelte-6g0x8w"}">${!$editorMode ? `<div class="${"footer-info svelte-6g0x8w"}">${!$mobileMode ? `${bannerType === "weapon-event" ? `${validate_component(Button, "EpitomizedButton").$$render($$result, {}, {}, {})}` : ``}
				<div class="${"wish svelte-6g0x8w"}"><div class="${"starglitter svelte-6g0x8w"}">${validate_component(Icon$1, "Icon").$$render($$result, { type: "starglitter" }, {}, {})}
						<span class="${"svelte-6g0x8w"}">${escape($starglitter)}</span></div>
					<div class="${"stardust svelte-6g0x8w"}">${validate_component(Icon$1, "Icon").$$render($$result, { type: "stardust" }, {}, {})}
						<span class="${"svelte-6g0x8w"}">${escape($stardust)}</span></div></div>` : ``}</div>` : ``}

	<div class="${"row svelte-6g0x8w"}" style="${"--bg:url(" + escape($assets["button.webp"], true) + ")"}">${!$editorMode ? `<div class="${"left menu-button svelte-6g0x8w"}">${validate_component(ButtonGeneral, "ButtonGeneral").$$render($$result, {}, {}, {
    default: () => {
      return `${hasNewOutfit ? `${validate_component(NoticeMark, "NoticeMark").$$render(
        $$result,
        {
          name: openedNotices,
          style: "transform: translateX(70%) translateY(-80%)"
        },
        {},
        {}
      )}` : ``}
					${escape($t("shop.text"))}`;
    }
  })}

				${validate_component(ButtonGeneral, "ButtonGeneral").$$render($$result, {}, {}, {
    default: () => {
      return `${escape($t("inventory.text"))}`;
    }
  })}
				${validate_component(ButtonGeneral, "ButtonGeneral").$$render($$result, {}, {}, {
    default: () => {
      return `${escape($t("history.text"))}`;
    }
  })}</div>

			<div class="${"right roll-button svelte-6g0x8w"}">${!isBeginner ? `<button class="${"single wish-button svelte-6g0x8w"}" ${$onWish || !$readyToPull ? "disabled" : ""}><div class="${"top"}">${escape($t("wish.rollButton", { values: { count: "\xD71" } }))}</div>
						<div class="${"bottom svelte-6g0x8w"}">${validate_component(Icon$1, "Icon").$$render($$result, { type: fateType }, {}, {})}
							<span style="${"margin-left: 7px"}" class="${["svelte-6g0x8w", currencyUsed < 1 && !isUnlimited ? "red" : ""].join(" ").trim()}">x 1
							</span></div></button>` : ``}

				<button class="${"ten wish-button svelte-6g0x8w"}" ${$onWish || !$readyToPull ? "disabled" : ""}>${bannerType === "beginner" ? `<span class="${"discount svelte-6g0x8w"}">-20%</span>` : ``}

					<div class="${"top"}">${escape($t("wish.rollButton", {
    values: {
      count: `\xD7${isBeginner ? 10 : $multipull}`
    }
  }))}</div>

					<div class="${"bottom svelte-6g0x8w"}">${validate_component(Icon$1, "Icon").$$render($$result, { type: fateType }, {}, {})}
						${isBeginner ? `<span style="${"margin-left: 7px"}" class="${["svelte-6g0x8w", currencyUsed < 8 && !isUnlimited ? "red" : ""].join(" ").trim()}">x 8
							</span>` : `<span style="${"margin-left: 7px"}" class="${["svelte-6g0x8w", currencyUsed < $multipull && !isUnlimited ? "red" : ""].join(" ").trim()}">x ${escape($multipull)}</span>`}</div></button></div>` : `<div class="${"left menu-button svelte-6g0x8w"}"></div>
			<div class="${"right roll-button svelte-6g0x8w"}"><button class="${"wish-button svelte-6g0x8w"}" style="${"flex-direction: row; line-height: 0;"}"><i class="${"gi-primo-star"}" style="${"transform: translateX(-50%);"}"></i>
					<span>${escape($t("customBanner.finishAndWish"))}</span></button>

				<button class="${"wish-button svelte-6g0x8w"}" style="${"flex-direction: row; line-height: 0;"}"><i class="${"gi-share"}" style="${"transform: translateX(-50%);"}"></i>
					${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
						<span>${escape($t("customBanner.publish"))}</span>
					`;
    }
    return function(isHosted) {
      return `
						${isHosted ? `<span>${escape($t("customBanner.updateAndShare"))}</span>` : `<span>${escape($t("customBanner.publish"))}</span>`}
					`;
    }(__value);
  }(localBanner.isHostedBanner($editID))}</button></div>`}</div>
</div>`;
});
const _outOfPrimogem_svelte_svelte_type_style_lang = "";
const css$p = {
  code: ".exchange.svelte-eojthv .red{color:#de2f22 !important}.exchange.svelte-eojthv .yellow{color:rgb(218, 177, 45) !important}.exchange.svelte-eojthv{width:100%;height:100%;display:flex;justify-content:center;align-items:center}",
  map: null
};
const Out_of_primogem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_multipull;
  let $primogem, $$unsubscribe_primogem;
  let $t, $$unsubscribe_t;
  let $acquaint, $$unsubscribe_acquaint;
  let $intertwined, $$unsubscribe_intertwined;
  $$unsubscribe_multipull = subscribe(multipull, (value) => value);
  $$unsubscribe_primogem = subscribe(primogem, (value) => $primogem = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_acquaint = subscribe(acquaint, (value) => $acquaint = value);
  $$unsubscribe_intertwined = subscribe(intertwined, (value) => $intertwined = value);
  let { isEventBanner = false } = $$props;
  let { rollCost = 0 } = $$props;
  getContext("closeModal");
  getContext("reroll");
  const currencyUsed = isEventBanner ? $intertwined : $acquaint;
  const currencyName = isEventBanner ? $t("shop.item.intertwined") : $t("shop.item.acquaint");
  const fateNeeded = rollCost - currencyUsed;
  const primoNeeded = fateNeeded * 160;
  const insufficientPrimo = $primogem < primoNeeded;
  if ($$props.isEventBanner === void 0 && $$bindings.isEventBanner && isEventBanner !== void 0)
    $$bindings.isEventBanner(isEventBanner);
  if ($$props.rollCost === void 0 && $$bindings.rollCost && rollCost !== void 0)
    $$bindings.rollCost(rollCost);
  $$result.css.add(css$p);
  $$unsubscribe_multipull();
  $$unsubscribe_primogem();
  $$unsubscribe_t();
  $$unsubscribe_acquaint();
  $$unsubscribe_intertwined();
  return `${validate_component(ModalTpl, "ModalTpl").$$render(
    $$result,
    {
      title: $t("shop.paimonBargains"),
      disabled: insufficientPrimo
    },
    {},
    {
      default: () => {
        return `<div class="${"exchange svelte-eojthv"}"><div><!-- HTML_TAG_START -->${$t("shop.fateNeeded", {
          values: {
            rollQty: `<span class="yellow">${fateNeeded}</span>`,
            currency: currencyName
          }
        })}<!-- HTML_TAG_END -->
			<br>

			<!-- HTML_TAG_START -->${$t("shop.primoNeeded", {
          values: {
            primoPrice: `
						<span class="${insufficientPrimo ? "red" : "yellow"}">
							${primoNeeded}
						</span>
					`
          }
        })}<!-- HTML_TAG_END -->

			${insufficientPrimo ? `<br>
				<br>
				<span class="${"red"}">${escape($t("shop.insufficient"))}</span>` : ``}</div></div>`;
      }
    }
  )}`;
});
const _frameBeginner_svelte_svelte_type_style_lang = "";
const css$o = {
  code: ".frame-content.svelte-7m46zd.svelte-7m46zd{width:100%;height:100%;position:relative;color:#565654;display:block;font-size:calc(1.8 / 100 * var(--content-width))}h1.svelte-7m46zd.svelte-7m46zd,.frame-content.svelte-7m46zd>div.svelte-7m46zd{text-align:left;position:absolute}h1.svelte-7m46zd span{color:#cba885;display:block}h1.svelte-7m46zd.svelte-7m46zd{bottom:73.5%;left:0;margin:0 4%;line-height:125%;font-size:calc(4.5 / 100 * var(--content-width))}.zh-CN h1.svelte-7m46zd.svelte-7m46zd,.ja-JP h1.svelte-7m46zd.svelte-7m46zd{font-size:calc(6 / 100 * var(--content-width))}.info.svelte-7m46zd.svelte-7m46zd{left:0;top:36%;width:40%;height:45%;display:block;padding-left:4%}.top.svelte-7m46zd.svelte-7m46zd{color:#fff;background-color:#e79649;padding:0.3% 1.4%;border-bottom-left-radius:2rem;border-top-left-radius:2rem;border-bottom-right-radius:4rem;top:0;left:0;transform:translate(-3%, -15%)}.set.svelte-7m46zd.svelte-7m46zd{font-size:calc(2.4 / 100 * var(--content-width))}.desc.svelte-7m46zd.svelte-7m46zd{color:#fff;min-height:calc(9 / 100 * var(--content-height));display:flex;align-items:center;margin:calc(0.7 / 100 * var(--content-width)) 0;background-color:rgba(224, 85, 94, 0.85)}.desc.svelte-7m46zd .text.svelte-7m46zd{width:calc(32.5 / 100 * var(--content-width));padding:calc(0.3 / 100 * var(--content-width));line-height:125%}.icon.svelte-7m46zd.svelte-7m46zd{display:flex;justify-content:center;align-items:center;padding:calc(1 / 100 * var(--content-width));font-size:calc(1.1 / 100 * var(--content-width))}.featured.svelte-7m46zd.svelte-7m46zd{top:65.6%;left:57.6%;color:#fff;font-size:calc(4.9 / 100 * var(--content-width));-webkit-text-stroke:0.05rem #565654;text-shadow:0 0 0.15rem #d2c69c}.ja-JP .featured.svelte-7m46zd.svelte-7m46zd,.zh-CN .featured.svelte-7m46zd.svelte-7m46zd{top:68%}.charName.svelte-7m46zd span.svelte-7m46zd:not(.up){filter:drop-shadow(0 0.3rem 0.5rem #000)}.charName.svelte-7m46zd span.up.svelte-7m46zd{color:#fff664;-webkit-text-stroke:0.05rem #e7a12e;font-size:calc(1.5 / 100 * var(--content-width));filter:drop-shadow(0 0.3rem 0.5rem #fff);position:absolute;top:0;right:0;transform:translateX(100%);text-transform:uppercase;text-shadow:0 0 0.4rem #f79c09}.char-title.svelte-7m46zd.svelte-7m46zd{left:57.6%;top:83.5%;color:#cfbc99;background-color:#39425d;padding:0.2% 1%}.chances.svelte-7m46zd.svelte-7m46zd{right:0;bottom:6.5%;color:#e7dfd0;background-color:#252d3a;padding:0.2% 2%}",
  map: null
};
const Frame_beginner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let char;
  let $t, $$unsubscribe_t;
  let $beginnerRemaining, $$unsubscribe_beginnerRemaining;
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_beginnerRemaining = subscribe(beginnerRemaining, (value) => $beginnerRemaining = value);
  let { character = "" } = $$props;
  let bannerInfo;
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  $$result.css.add(css$o);
  char = $t(`${character}.name`);
  $$unsubscribe_t();
  $$unsubscribe_beginnerRemaining();
  return `<div class="${"frame-content svelte-7m46zd"}"><div class="${"top svelte-7m46zd"}">${escape($t("wish.banner.novice"))}</div>
	<h1 class="${"card-stroke svelte-7m46zd"}"><!-- HTML_TAG_START -->${highlightBannerName($t(`banner.beginner`), "geo")}<!-- HTML_TAG_END --></h1>

	<div class="${"info svelte-7m46zd"}"${add_attribute("this", bannerInfo, 0)}><div class="${"content"}"><div class="${"set svelte-7m46zd"}">${escape($t("wish.banner.beginnerSet", { values: { character: char } }))}</div>
			<div class="${"desc svelte-7m46zd"}"><div class="${"icon svelte-7m46zd"}"><i class="${"gi-primo-star"}"></i></div>
				<p class="${"text svelte-7m46zd"}">${escape($t("wish.banner.wishDescription"))}</p></div>
			<div class="${"note"}">${escape($t("wish.banner.beginnerNote"))}</div></div></div>

	<div class="${"featured svelte-7m46zd"}"><div class="${"charName svelte-7m46zd"}" style="${"position: relative;"}"><span class="${"svelte-7m46zd"}">${escape(char)}</span>
			<span class="${"up svelte-7m46zd"}">${escape($t("wish.banner.up"))}</span></div></div>

	<div class="${"char-title svelte-7m46zd"}">${escape($t(`${character}.title`))}</div>

	<div class="${"chances svelte-7m46zd"}">${escape($t("wish.banner.beginnerChance", {
    values: { chances: `${$beginnerRemaining}/20` }
  }))}</div>
</div>`;
});
const _frameCharacter_svelte_svelte_type_style_lang = "";
const css$n = {
  code: ".frame-content.svelte-1b4k6p2.svelte-1b4k6p2{width:100%;height:100%;position:relative;color:#565654;display:block;font-size:calc(1.8 / 100 * var(--content-width));line-height:130%}h1.svelte-1b4k6p2 span{display:block}h1.svelte-1b4k6p2.svelte-1b4k6p2,.frame-content.svelte-1b4k6p2>div.svelte-1b4k6p2{text-align:left;position:absolute}h1.svelte-1b4k6p2.svelte-1b4k6p2{bottom:67%;left:0;margin:0 4%;line-height:125%;font-size:calc(4.5 / 100 * var(--content-width))}.zh-CN h1.svelte-1b4k6p2.svelte-1b4k6p2{font-size:calc(7 / 100 * var(--content-width))}.ja-JP h1.svelte-1b4k6p2.svelte-1b4k6p2{max-width:45%;font-size:calc(6 / 100 * var(--content-width));line-height:100%}.top.svelte-1b4k6p2.svelte-1b4k6p2{color:#fff;padding:0.3% 1.4%;border-bottom-left-radius:2rem;border-top-left-radius:2rem;border-bottom-right-radius:4rem;top:0;left:0;transform:translate(-3%, -15%)}.info.svelte-1b4k6p2.svelte-1b4k6p2{left:0;top:40%;width:40%;height:42%;display:block;padding-left:4%}.content.svelte-1b4k6p2.svelte-1b4k6p2{position:relative}.info.svelte-1b4k6p2 .content.svelte-1b4k6p2::after{content:'';display:block;width:calc(0.55 / 100 * var(--content-width));height:100%;background-color:#565654;position:absolute;left:calc(-3.045 / 100 * var(--content-width));top:0}.set.svelte-1b4k6p2.svelte-1b4k6p2{font-size:calc(2.4 / 100 * var(--content-width))}.desc.svelte-1b4k6p2.svelte-1b4k6p2{color:#fff;min-height:calc(9 / 100 * var(--content-height));display:flex;align-items:center;margin:calc(0.7 / 100 * var(--content-width)) 0}.icon.svelte-1b4k6p2.svelte-1b4k6p2{display:flex;justify-content:center;align-items:center;padding:calc(1 / 100 * var(--content-width));font-size:calc(1.1 / 100 * var(--content-width))}.desc.svelte-1b4k6p2 .text.svelte-1b4k6p2{width:calc(32.5 / 100 * var(--content-width));padding:calc(0.3 / 100 * var(--content-width))}.character.svelte-1b4k6p2.svelte-1b4k6p2{left:54%;bottom:8%;width:calc(27 / 100 * var(--content-width))}.character.svelte-1b4k6p2 .char-name.svelte-1b4k6p2{color:#fff;display:inline-block;-webkit-text-stroke:0.02rem #565654;text-shadow:0 0 0.15rem #d2c69c;line-height:100%;position:relative;font-size:calc(11 / 100 * var(--text-width))}.zh-CN .character.svelte-1b4k6p2 .char-name.svelte-1b4k6p2{font-size:calc(17 / 100 * var(--text-width))}.ja-JP .character.svelte-1b4k6p2 .char-name.svelte-1b4k6p2{font-size:calc(15 / 100 * var(--text-width))}.char-name.svelte-1b4k6p2 span.svelte-1b4k6p2{filter:drop-shadow(0 0.3rem 0.5rem #000)}.char-name.svelte-1b4k6p2 .up.svelte-1b4k6p2{color:#fff664;-webkit-text-stroke:0.05rem #e7a12e;font-size:calc(2 / 100 * var(--content-width));filter:drop-shadow(0 0.3rem 0.5rem #fff);position:absolute;top:0;right:0;transform:translateX(100%) translateY(-50%);text-transform:uppercase;text-shadow:0 0 0.4rem #f79c09}.character.svelte-1b4k6p2 .char-title.svelte-1b4k6p2{color:#cfbc99;background-color:#39425d;margin-top:calc(3.5 / 100 * var(--content-width));padding:1% 2%;white-space:nowrap;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}",
  map: null
};
const Frame_character = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let localeBannerName;
  let vision;
  let featuredC;
  let $t, $$unsubscribe_t;
  let $locale, $$unsubscribe_locale;
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_locale = subscribe(D, (value) => $locale = value);
  let { bannerName = "" } = $$props;
  let { character = "" } = $$props;
  let { textOffset = {} } = $$props;
  let { event2 = false } = $$props;
  let bannerInfo;
  if ($$props.bannerName === void 0 && $$bindings.bannerName && bannerName !== void 0)
    $$bindings.bannerName(bannerName);
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  if ($$props.textOffset === void 0 && $$bindings.textOffset && textOffset !== void 0)
    $$bindings.textOffset(textOffset);
  if ($$props.event2 === void 0 && $$bindings.event2 && event2 !== void 0)
    $$bindings.event2(event2);
  $$result.css.add(css$n);
  localeBannerName = $t(`banner.${getBannerName(bannerName).name}`);
  vision = getCharDetails(character).vision;
  featuredC = `--text-width: calc(${textOffset?.w || 30} / 100 * var(--content-width));`;
  $$unsubscribe_t();
  $$unsubscribe_locale();
  return `<div class="${"frame-content svelte-1b4k6p2"}"><div class="${"top bg-" + escape(vision, true) + " svelte-1b4k6p2"}">${escape($t("wish.banner.character-event"))}
		${escape(event2 ? $locale === "ja-JP" ? "2" : "\u2014 2" : "")}</div>
	<h1 class="${"card-stroke svelte-1b4k6p2"}"><!-- HTML_TAG_START -->${highlightBannerName(localeBannerName, vision)}<!-- HTML_TAG_END --></h1>

	<div class="${"info svelte-1b4k6p2"}"${add_attribute("this", bannerInfo, 0)}><div class="${"content svelte-1b4k6p2"}"><div class="${"set card-stroke svelte-1b4k6p2"}">${escape($t("wish.banner.probIncreased"))}</div>
			<div class="${"desc bg-" + escape(vision, true) + " svelte-1b4k6p2"}" style="${"opacity: 90%;"}"><div class="${"icon svelte-1b4k6p2"}"><i class="${"gi-primo-star"}"></i></div>
				<div class="${"text svelte-1b4k6p2"}">${escape($t("wish.banner.wishDescription"))}</div></div>
			<div class="${"note card-stroke"}">${escape($t("wish.banner.eventNote"))}
				${escape($t("wish.banner.viewDetails"))}</div></div></div>

	<div class="${"character svelte-1b4k6p2"}" style="${escape(featuredC, true) + escape(positionToStyle(textOffset), true)}"><div class="${"char-name svelte-1b4k6p2"}"><span class="${"svelte-1b4k6p2"}">${escape($t(`${character}.name`))}</span>
			<span class="${"up svelte-1b4k6p2"}">${escape($t("wish.banner.up"))}</span></div>
		<div class="${"char-title svelte-1b4k6p2"}">${escape($t(`${character}.title`))}</div></div>
</div>`;
});
const _frameWeapon_svelte_svelte_type_style_lang = "";
const css$m = {
  code: ".frame-content.svelte-8vngkj.svelte-8vngkj{width:100%;height:100%;position:relative;color:#565654;display:block;font-size:calc(1.8 / 100 * var(--content-width));line-height:130%}h1.svelte-8vngkj span{display:block}h1.svelte-8vngkj.svelte-8vngkj,.frame-content.svelte-8vngkj>div.svelte-8vngkj{text-align:left;position:absolute}h1.svelte-8vngkj.svelte-8vngkj{bottom:67%;left:0;margin:0 4%;line-height:125%;font-size:calc(4.5 / 100 * var(--content-width))}.zh-CN h1.svelte-8vngkj.svelte-8vngkj,.ja-JP h1.svelte-8vngkj.svelte-8vngkj{font-size:calc(7 / 100 * var(--content-width))}.top.svelte-8vngkj.svelte-8vngkj{color:#fff;padding:0.3% 1.4%;border-bottom-left-radius:2rem;border-top-left-radius:2rem;border-bottom-right-radius:4rem;top:0;left:0;transform:translate(-3%, -15%)}.info.svelte-8vngkj.svelte-8vngkj{left:4%;top:40%;width:36%;display:block}.info.svelte-8vngkj.svelte-8vngkj::after{content:'';display:block;width:calc(0.55 / 100 * var(--content-width));height:100%;background-color:#565654;position:absolute;left:calc(-3 / 100 * var(--content-width));top:0}.set.svelte-8vngkj.svelte-8vngkj{font-size:calc(2.4 / 100 * var(--content-width))}.desc.svelte-8vngkj.svelte-8vngkj{left:7.5%;top:49.7%;color:#fff;min-height:calc(9 / 100 * var(--content-height));display:flex;align-items:center;margin:calc(0.7 / 100 * var(--content-width)) 0}.icon.svelte-8vngkj.svelte-8vngkj{display:flex;justify-content:center;align-items:center;padding:calc(1 / 100 * var(--content-width));font-size:calc(1.1 / 100 * var(--content-width))}.desc.svelte-8vngkj .text.svelte-8vngkj{width:calc(32.5 / 100 * var(--content-width));padding:calc(0.3 / 100 * var(--content-width))}.note.svelte-8vngkj.svelte-8vngkj{width:85%}.featured.svelte-8vngkj.svelte-8vngkj{left:37%;top:64%;width:calc(22 / 100 * var(--content-width))}.rateup.svelte-8vngkj.svelte-8vngkj{left:70%;bottom:21%}.weapon-name.svelte-8vngkj.svelte-8vngkj{color:#fff;display:block;-webkit-text-stroke:0.015rem #000;letter-spacing:-0.05rem;line-height:100%;position:relative}.weapon-name.svelte-8vngkj span.svelte-8vngkj:not(.up){filter:drop-shadow(-0.2rem 0.2rem 0.5rem #000)}.first-wp.svelte-8vngkj.svelte-8vngkj{font-size:calc(8 / 100 * var(--text-width))}.second-wp.svelte-8vngkj.svelte-8vngkj{font-size:calc(8 / 100 * var(--text-width));margin-top:calc(0.6 / 100 * var(--content-width))}.zh-CN .first-wp.svelte-8vngkj.svelte-8vngkj,.zh-CN .second-wp.svelte-8vngkj.svelte-8vngkj,.ja-JP .first-wp.svelte-8vngkj.svelte-8vngkj,.ja-JP .second-wp.svelte-8vngkj.svelte-8vngkj{font-size:calc(11 / 100 * var(--text-width))}span.up.svelte-8vngkj.svelte-8vngkj{color:#fff664;-webkit-text-stroke:0.05rem #e7a12e;filter:drop-shadow(0 0.3rem 0.5rem #fff);font-size:calc(2 / 100 * var(--content-width));position:absolute;top:0;right:0;transform:translateX(100%) translateY(-80%);text-transform:uppercase;text-shadow:0 0 0.4rem #f79c09}.rateup.svelte-8vngkj .weapon-name.svelte-8vngkj{font-size:calc(2 / 100 * var(--content-width))}.zh-CN .rateup.svelte-8vngkj .weapon-name.svelte-8vngkj,.ja-JP .rateup.svelte-8vngkj .weapon-name.svelte-8vngkj{font-size:calc(3.5 / 100 * var(--content-width))}span.etc.svelte-8vngkj.svelte-8vngkj{font-size:calc(2 / 100 * var(--content-width));white-space:nowrap}.selected.svelte-8vngkj.svelte-8vngkj{position:absolute;bottom:0rem;right:0;max-width:80%;padding:0.2rem 1rem;color:#fff;background-color:rgba(0, 0, 0, 0.4);font-size:1rem;font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif}.selected.fill.svelte-8vngkj.svelte-8vngkj{background-color:#62c5ff}",
  map: null
};
const Frame_weapon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  let $course, $$unsubscribe_course;
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_course = subscribe(course, (value) => $course = value);
  let { featured = {} } = $$props;
  let { rateup = {} } = $$props;
  let { textOffset = {} } = $$props;
  const w = textOffset?.featured?.w || 29;
  const featuredW = `--text-width: calc(${w} / 100 * var(--content-width));`;
  if ($$props.featured === void 0 && $$bindings.featured && featured !== void 0)
    $$bindings.featured(featured);
  if ($$props.rateup === void 0 && $$bindings.rateup && rateup !== void 0)
    $$bindings.rateup(rateup);
  if ($$props.textOffset === void 0 && $$bindings.textOffset && textOffset !== void 0)
    $$bindings.textOffset(textOffset);
  $$result.css.add(css$m);
  $$unsubscribe_t();
  $$unsubscribe_course();
  return `<div class="${"frame-content svelte-8vngkj"}"><div class="${"top bg-epitome svelte-8vngkj"}">${escape($t("wish.banner.weapon-event"))}</div>
	<h1 class="${"svelte-8vngkj"}"><!-- HTML_TAG_START -->${highlightBannerName($t(`banner.epitome-invocation`), "epitome")}<!-- HTML_TAG_END --></h1>

	<div class="${"info svelte-8vngkj"}"><div class="${"set card-stroke svelte-8vngkj"}">${escape($t("wish.banner.probIncreased"))}</div>
		<div class="${"desc bg-epitome  svelte-8vngkj"}" style="${"opacity: 90%;"}"><div class="${"icon svelte-8vngkj"}"><i class="${"gi-primo-star"}"></i></div>
			<div class="${"text svelte-8vngkj"}">${escape($t("wish.banner.wishDescription"))}</div></div>
		<div class="${"note card-stroke svelte-8vngkj"}">${escape($t("wish.banner.viewDetails"))}</div></div>

	<div class="${"featured svelte-8vngkj"}" style="${escape(featuredW, true) + escape(positionToStyle(textOffset?.featured), true)}"><div class="${"weapon-name first-wp svelte-8vngkj"}"><span class="${"svelte-8vngkj"}">${escape($t(`${featured[0].name}`))}</span>
			<span class="${"up svelte-8vngkj"}">${escape($t("wish.banner.up"))}</span></div>
		<div class="${"weapon-name second-wp svelte-8vngkj"}">${escape($t(`${featured[1].name}`))}</div></div>

	<div class="${"rateup svelte-8vngkj"}"${add_attribute("style", positionToStyle(textOffset?.rateup), 0)}><div class="${"weapon-name svelte-8vngkj"}"><span class="${"svelte-8vngkj"}">${escape($t(`${rateup[0]}`))},</span>
			<span class="${"etc svelte-8vngkj"}">${escape($t("wish.banner.etc"))}</span>
			<span class="${"up svelte-8vngkj"}">${escape($t("wish.banner.up"))}</span></div></div>

	${$course.selected !== null ? `<div class="${["selected svelte-8vngkj", $course.point === 2 ? "fill" : ""].join(" ").trim()}">${escape($t("wish.epitomizedPath.courseSetFor", {
    values: {
      selectedCourse: $t(featured[$course.selected]?.name)
    }
  }))}</div>` : ``}
</div>`;
});
const _frameStandard_svelte_svelte_type_style_lang = "";
const css$l = {
  code: ".frame-content.svelte-1dimnlq.svelte-1dimnlq{width:100%;height:100%;position:relative;color:#565654;display:block;font-size:calc(1.8 / 100 * var(--content-width));line-height:120%}h1.svelte-1dimnlq span{display:block}h1.svelte-1dimnlq span.old{color:#c9a07b}h1.svelte-1dimnlq.svelte-1dimnlq,.frame-content.svelte-1dimnlq>div.svelte-1dimnlq{text-align:left;position:absolute}h1.svelte-1dimnlq.svelte-1dimnlq{bottom:73.5%;left:0;margin:0 4%;line-height:125%;font-size:calc(4.5 / 100 * var(--content-width))}.zh-CN h1.svelte-1dimnlq.svelte-1dimnlq,.ja-JP h1.svelte-1dimnlq.svelte-1dimnlq{font-size:calc(7 / 100 * var(--content-width))}.info.svelte-1dimnlq.svelte-1dimnlq{left:0;top:36%;width:40%;height:45%;display:block;padding-left:4%}.top.svelte-1dimnlq.svelte-1dimnlq{color:#fff;padding:0.3% 1.4%;border-bottom-left-radius:2rem;border-top-left-radius:2rem;border-bottom-right-radius:4rem;top:0;left:0;transform:translate(-3%, -15%)}.old.svelte-1dimnlq .top.svelte-1dimnlq{background-color:#c9a07b}.set.svelte-1dimnlq.svelte-1dimnlq{font-size:calc(2.4 / 100 * var(--content-width))}.desc.svelte-1dimnlq.svelte-1dimnlq{color:#fff;min-height:calc(9 / 100 * var(--content-height));display:flex;align-items:center;margin:calc(0.7 / 100 * var(--content-width)) 0;background-color:rgba(101, 107, 202, 0.9)}.old.svelte-1dimnlq .desc.svelte-1dimnlq{background-color:rgba(48, 143, 148, 0.9)}.desc.svelte-1dimnlq .text.svelte-1dimnlq{width:calc(32.5 / 100 * var(--content-width));padding:calc(0.3 / 100 * var(--content-width))}.icon.svelte-1dimnlq.svelte-1dimnlq{display:flex;justify-content:center;align-items:center;padding:calc(1 / 100 * var(--content-width));font-size:calc(1.1 / 100 * var(--content-width))}.group-content.svelte-1dimnlq.svelte-1dimnlq{position:relative}.item-name.svelte-1dimnlq.svelte-1dimnlq{color:#fff;-webkit-text-stroke:0.05rem #565654;text-shadow:0 0 0.15rem #d2c69c;filter:drop-shadow(0 0.3rem 0.5rem #000)}.char-title.svelte-1dimnlq.svelte-1dimnlq{color:#cfbc99;background-color:#39425d;margin-top:calc(2.8 / 100 * var(--content-width));padding:1% 7%;white-space:nowrap;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.qiqi.svelte-1dimnlq.svelte-1dimnlq{left:36.5%;top:78%}.mona.svelte-1dimnlq.svelte-1dimnlq{left:46%;top:21%}.keqing.svelte-1dimnlq.svelte-1dimnlq{left:61%;top:55%}.jean.svelte-1dimnlq.svelte-1dimnlq{left:44%;top:72.5%}.diluc.svelte-1dimnlq.svelte-1dimnlq{left:78%;top:10%}.keqing.svelte-1dimnlq .item-name.svelte-1dimnlq{font-size:calc(4.5 / 100 * var(--content-width));transform:translateY(-80%)}.qiqi.svelte-1dimnlq .item-name.svelte-1dimnlq,.mona.svelte-1dimnlq .item-name.svelte-1dimnlq{font-size:calc(3.3 / 100 * var(--content-width))}.jean.svelte-1dimnlq .item-name.svelte-1dimnlq,.diluc.svelte-1dimnlq .item-name.svelte-1dimnlq{font-size:calc(4 / 100 * var(--content-width));margin-bottom:calc(4 / 100 * var(--content-width))}.skyward.svelte-1dimnlq.svelte-1dimnlq{left:75.1%;bottom:4.5%;width:24%;line-height:170%}.skyward.svelte-1dimnlq .item-name.svelte-1dimnlq{font-size:calc(3.5 / 100 * var(--content-width))}.vi-VN .skyward.svelte-1dimnlq .item-name.svelte-1dimnlq{font-size:calc(3 / 100 * var(--content-width))}.item-name.svelte-1dimnlq span.svelte-1dimnlq{font-size:calc(2 / 100 * var(--content-width));white-space:nowrap}.all.svelte-1dimnlq.svelte-1dimnlq{color:#fff;background-color:#f7ab48;display:inline-block;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;font-size:calc(1.3 / 100 * var(--content-width));line-height:130%;padding:calc(0.2 / 100 * var(--content-width)) calc(2 / 100 * var(--content-width));margin-top:calc(3.8 / 100 * var(--content-width));transform:translateX(-5%)}",
  map: null
};
const Frame_standard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let { bannerName = "" } = $$props;
  const oldStd = bannerName === "wanderlust-invocation-1";
  const chars = oldStd ? ["jean", "diluc"] : ["qiqi", "mona", "keqing"];
  const weap = oldStd ? "skyward-blade" : "skyward-spine";
  const highlightBannerName2 = (bannerName2) => {
    const oldClass = oldStd ? "old" : "wanderlust-flat";
    const splited = bannerName2.split(" ");
    return `${splited[0]} <span class="${oldClass}"> ${splited.slice(1).join(" ")}</span>`;
  };
  let bannerInfo;
  if ($$props.bannerName === void 0 && $$bindings.bannerName && bannerName !== void 0)
    $$bindings.bannerName(bannerName);
  $$result.css.add(css$l);
  $$unsubscribe_t();
  return `<div class="${["frame-content svelte-1dimnlq", oldStd ? "old" : ""].join(" ").trim()}"><div class="${"top bg-wanderlust svelte-1dimnlq"}">${escape($t("wish.banner.standard"))}</div>
	<h1 class="${"card-stroke svelte-1dimnlq"}"><!-- HTML_TAG_START -->${highlightBannerName2($t("banner.wanderlust"))}<!-- HTML_TAG_END --></h1>
	<div class="${"info svelte-1dimnlq"}"${add_attribute("this", bannerInfo, 0)}><div class="${"content"}"><div class="${"set card-stroke svelte-1dimnlq"}">${escape($t("wish.banner.standard"))}</div>

			<div class="${"desc svelte-1dimnlq"}"><div class="${"icon svelte-1dimnlq"}"><i class="${"gi-primo-star"}"></i></div>
				<div class="${"text svelte-1dimnlq"}">${escape($t("wish.banner.wishDescription"))}</div></div>
			<div class="${"note card-stroke"}">${escape($t("wish.banner.standardNote"))}
				${escape($t("wish.banner.viewDetails"))}</div></div></div>

	${each(chars, (char) => {
    return `<div class="${"group " + escape(char, true) + " svelte-1dimnlq"}"><div class="${"group-content svelte-1dimnlq"}"><div class="${"item-name svelte-1dimnlq"}">${escape($t(`${char}.name`))}</div>
				<div class="${"char-title svelte-1dimnlq"}">${escape($t(`${char}.title`))}
				</div></div>
		</div>`;
  })}
	<div class="${"group skyward svelte-1dimnlq"}"><div class="${"group-content svelte-1dimnlq"}"><div class="${"item-name svelte-1dimnlq"}">${escape($t(weap))}
				<span class="${"svelte-1dimnlq"}">${escape($t("wish.banner.etc"))}</span></div>
			<div class="${"all svelte-1dimnlq"}">${escape($t("wish.banner.allWeaponTypes"))}</div></div></div>
</div>`;
});
const _frameCustom_svelte_svelte_type_style_lang = "";
const css$k = {
  code: ".frame-content.svelte-10wsjyw.svelte-10wsjyw{width:100%;aspect-ratio:1080/533;position:absolute;color:#565654;display:block;font-size:calc(1.8 / 100 * var(--content-width));line-height:130%;bottom:0;left:0;z-index:+10}.frame-content.onBannerEdit.svelte-10wsjyw.svelte-10wsjyw{pointer-events:none;opacity:0.5}h1.svelte-10wsjyw span{display:block}h1.svelte-10wsjyw.svelte-10wsjyw,.frame-content.svelte-10wsjyw>div.svelte-10wsjyw{text-align:left;position:absolute}h1.svelte-10wsjyw.svelte-10wsjyw{bottom:67%;left:0;margin:0 4%;line-height:125%;font-size:calc(4.5 / 100 * var(--content-width));height:calc(0.23 * var(--content-height));display:flex;align-items:center}.zh-CN h1.svelte-10wsjyw.svelte-10wsjyw{font-size:calc(7 / 100 * var(--content-width))}.ja-JP h1.svelte-10wsjyw.svelte-10wsjyw{max-width:45%;font-size:calc(6 / 100 * var(--content-width));line-height:100%}.editorMode.svelte-10wsjyw h1.svelte-10wsjyw{bottom:70%}.action.svelte-10wsjyw.svelte-10wsjyw{position:absolute;top:0;right:0;opacity:0;transition:all 0.25s;display:flex;flex-direction:column;align-items:flex-end}.action.svelte-10wsjyw button.svelte-10wsjyw{color:rgba(255, 255, 255, 0.8);padding:calc(1.7 / 100 * var(--content-width)) calc(2.5 / 100 * var(--content-width));display:flex;align-items:center;line-height:0;border-radius:2%;font-size:calc(1.7 / 100 * var(--content-width));transition:all 0.25s}button.edit.svelte-10wsjyw.svelte-10wsjyw{background-color:rgba(0, 0, 0, 0.5)}button.edit.svelte-10wsjyw.svelte-10wsjyw:hover{background-color:rgba(0, 0, 0, 0.8)}button.delete.svelte-10wsjyw.svelte-10wsjyw{background-color:rgba(234, 37, 37, 0.5)}button.delete.svelte-10wsjyw.svelte-10wsjyw:hover{background-color:rgba(234, 37, 37, 1)}.action.svelte-10wsjyw i.svelte-10wsjyw{transform:translateX(-50%)}.frame-content.svelte-10wsjyw:hover .action.svelte-10wsjyw{opacity:1}.action.svelte-10wsjyw button.svelte-10wsjyw:active{transform:scale(0.9)}.top.svelte-10wsjyw.svelte-10wsjyw{color:#fff;padding:0.3% 1.4%;border-bottom-left-radius:2rem;border-top-left-radius:2rem;border-bottom-right-radius:4rem;top:0;left:0;transform:translate(-3%, -15%)}.info.svelte-10wsjyw.svelte-10wsjyw{left:0;top:40%;width:40%;height:42%;display:block;padding-left:4%}.onBannerEdit.svelte-10wsjyw .info.svelte-10wsjyw{overflow:hidden}.editorMode.svelte-10wsjyw .info.svelte-10wsjyw{top:32.5%}.content.svelte-10wsjyw.svelte-10wsjyw{position:relative}.info.svelte-10wsjyw .content.svelte-10wsjyw::after{content:'';display:block;width:calc(0.55 / 100 * var(--content-width));height:100%;background-color:#565654;position:absolute;left:calc(-3.045 / 100 * var(--content-width));top:0}.set.svelte-10wsjyw.svelte-10wsjyw{font-size:calc(2.4 / 100 * var(--content-width))}.desc.svelte-10wsjyw.svelte-10wsjyw{color:#fff;min-height:calc(9 / 100 * var(--content-height));display:flex;align-items:center;margin:calc(0.7 / 100 * var(--content-width)) 0}.icon.svelte-10wsjyw.svelte-10wsjyw{display:flex;justify-content:center;align-items:center;padding:calc(1 / 100 * var(--content-width));font-size:calc(1.1 / 100 * var(--content-width))}.desc.svelte-10wsjyw .text.svelte-10wsjyw{width:calc(32.5 / 100 * var(--content-width));padding:calc(0.3 / 100 * var(--content-width))}.character.svelte-10wsjyw.svelte-10wsjyw{--text-width:calc(30 / 100 * var(--content-width));width:calc(30 / 100 * var(--content-width));left:50%;bottom:8%}.character.svelte-10wsjyw .char-name.svelte-10wsjyw{color:#fff;display:inline-block;-webkit-text-stroke:0.02rem #565654;text-shadow:0 0 0.15rem #d2c69c;line-height:100%;position:relative;font-size:calc(11 / 100 * var(--text-width));white-space:nowrap}.zh-CN .character.svelte-10wsjyw .char-name.svelte-10wsjyw{font-size:calc(17 / 100 * var(--text-width))}.ja-JP .character.svelte-10wsjyw .char-name.svelte-10wsjyw{font-size:calc(15 / 100 * var(--text-width))}.char-name.svelte-10wsjyw span.svelte-10wsjyw{filter:drop-shadow(0 0.3rem 0.5rem #000)}.char-name.svelte-10wsjyw .up.svelte-10wsjyw{color:#fff664;-webkit-text-stroke:0.05rem #e7a12e;font-size:calc(2 / 100 * var(--content-width));filter:drop-shadow(0 0.3rem 0.5rem #fff);position:absolute;top:0;right:0;transform:translateX(100%) translateY(-50%);text-transform:uppercase;text-shadow:0 0 0.4rem #f79c09}.character.svelte-10wsjyw .char-title.svelte-10wsjyw{color:#cfbc99;background-color:#39425d;padding:1% 2%;white-space:nowrap;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.textbg.svelte-10wsjyw.svelte-10wsjyw{background-color:rgba(0, 0, 0, 0.55);width:calc(100% + (0.15 * var(--content-height)));transform:translateX(calc(7.5 / 100 * var(--content-height) * -1));height:calc(9 / 100 * var(--content-height));margin-top:calc(-3 / 100 * var(--content-height));filter:drop-shadow(0 0 calc(0.02 * var(--content-height)) #000);position:relative;z-index:-2}.stars.svelte-10wsjyw.svelte-10wsjyw{position:absolute;left:calc(7.5 / 100 * var(--content-height));bottom:-10%}.gi-star.svelte-10wsjyw.svelte-10wsjyw{color:#f7cf33;display:inline-block;font-size:calc(3.5 / 100 * var(--content-height))}.icon-vision.svelte-10wsjyw.svelte-10wsjyw{width:calc(9 / 100 * var(--content-height));transform:translate(-45%, -40%);position:absolute;left:0;top:0}.icon-vision.svelte-10wsjyw svg{width:100%;height:100%}.watermark.svelte-10wsjyw.svelte-10wsjyw{right:2%;bottom:2%;font-style:italic;color:#fff;font-size:calc(3 / 100 * var(--content-height));font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif}",
  map: null
};
const Frame_custom = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let disableEdit;
  let $proUser, $$unsubscribe_proUser;
  let $customData, $$unsubscribe_customData;
  let $t, $$unsubscribe_t;
  let $isCustomBanner, $$unsubscribe_isCustomBanner;
  $$unsubscribe_proUser = subscribe(proUser, (value) => $proUser = value);
  $$unsubscribe_customData = subscribe(customData, (value) => $customData = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_isCustomBanner = subscribe(isCustomBanner, (value) => $isCustomBanner = value);
  let { bannerName = "" } = $$props;
  let { character = "" } = $$props;
  let { charTitle = "" } = $$props;
  let { vision = "" } = $$props;
  let { editorMode: editorMode$1 = false } = $$props;
  let { onBannerEdit = false } = $$props;
  let { watermark = "" } = $$props;
  getContext("deleteBanner");
  let infoContainer;
  let myBannerCount = 0;
  if ($$props.bannerName === void 0 && $$bindings.bannerName && bannerName !== void 0)
    $$bindings.bannerName(bannerName);
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  if ($$props.charTitle === void 0 && $$bindings.charTitle && charTitle !== void 0)
    $$bindings.charTitle(charTitle);
  if ($$props.vision === void 0 && $$bindings.vision && vision !== void 0)
    $$bindings.vision(vision);
  if ($$props.editorMode === void 0 && $$bindings.editorMode && editorMode$1 !== void 0)
    $$bindings.editorMode(editorMode$1);
  if ($$props.onBannerEdit === void 0 && $$bindings.onBannerEdit && onBannerEdit !== void 0)
    $$bindings.onBannerEdit(onBannerEdit);
  if ($$props.watermark === void 0 && $$bindings.watermark && watermark !== void 0)
    $$bindings.watermark(watermark);
  $$result.css.add(css$k);
  disableEdit = !$proUser && myBannerCount > 3;
  $$unsubscribe_proUser();
  $$unsubscribe_customData();
  $$unsubscribe_t();
  $$unsubscribe_isCustomBanner();
  return `<div class="${[
    "frame-content svelte-10wsjyw",
    (editorMode$1 ? "editorMode" : "") + " " + (onBannerEdit ? "onBannerEdit" : "")
  ].join(" ").trim()}"><div class="${"top bg-" + escape(vision, true) + " svelte-10wsjyw"}">${escape($t("wish.banner.character-event"))}</div>
	<h1 class="${"card-stroke svelte-10wsjyw"}"><div class="${"wrap"}"><!-- HTML_TAG_START -->${highlightBannerName(bannerName || $t("customBanner.bannerName"), vision)}<!-- HTML_TAG_END --></div></h1>

	${$isCustomBanner ? `<div class="${"action svelte-10wsjyw"}">${$customData.status === "owned" && !editorMode$1 && !disableEdit ? `<button class="${"edit svelte-10wsjyw"}"><i class="${"gi-pen svelte-10wsjyw"}"></i> <span>${escape($t("customBanner.edit"))}</span></button>` : ``}

			<button class="${"delete svelte-10wsjyw"}"><i class="${"gi-delete svelte-10wsjyw"}"></i>
				${escape($t("customBanner.delete"))}</button></div>` : ``}

	<div class="${"info svelte-10wsjyw"}"${add_attribute("this", infoContainer, 0)}><div class="${"content svelte-10wsjyw"}"><div class="${"set card-stroke svelte-10wsjyw"}">${escape($t("wish.banner.probIncreased"))}</div>
			<div class="${"desc bg-" + escape(vision, true) + " svelte-10wsjyw"}" style="${"opacity: 90%;"}"><div class="${"icon svelte-10wsjyw"}"><i class="${"gi-primo-star svelte-10wsjyw"}"></i></div>
				<div class="${"text svelte-10wsjyw"}">${escape($t("wish.banner.wishDescription"))}</div></div>
			<div class="${"note card-stroke"}">${escape($t("wish.banner.eventNote"))}
				${escape($t("wish.banner.viewDetails"))}</div></div></div>

	<div class="${"character svelte-10wsjyw"}"><div class="${"char-name svelte-10wsjyw"}"><span class="${"svelte-10wsjyw"}">${escape(character || $t("customBanner.charName"))}</span>
			<span class="${"up svelte-10wsjyw"}">${escape($t("wish.banner.up"))}</span>

			<div class="${"textbg svelte-10wsjyw"}"><div class="${"icon-vision " + escape(vision, true) + " filter-drop svelte-10wsjyw"}">${validate_component(SVGIcon, "SvgIcon").$$render($$result, { name: vision }, {}, {})}</div>
				<div class="${"stars svelte-10wsjyw"}">${each(Array(5), (_) => {
    return `<i class="${"gi-star svelte-10wsjyw"}"></i>`;
  })}</div></div></div>

		<div class="${"char-title svelte-10wsjyw"}">${escape(charTitle || $t("customBanner.charTitle"))}</div></div>

	<div class="${"watermark svelte-10wsjyw"}">${escape(watermark || "")}</div>
</div>`;
});
const BannerArt_svelte_svelte_type_style_lang = "";
const css$j = {
  code: ".main-art.svelte-1oo1z35.svelte-1oo1z35{--zoomist-slider-bar-side:calc(0.003 * var(--content-width));--zoomist-slider-bar-size:calc(0.4 * var(--content-height));--zoomist-slider-button-size:calc(0.015 * var(--content-width));--zoomist-slider-bar-color:#e9a540}img.svelte-1oo1z35.svelte-1oo1z35{width:100%;height:100%;display:block;-o-object-fit:contain;object-fit:contain;-o-object-position:center;object-position:center}.main-art.svelte-1oo1z35.svelte-1oo1z35,.zoomist-wrapper.svelte-1oo1z35.svelte-1oo1z35,.zoomist-image.svelte-1oo1z35.svelte-1oo1z35{width:100%;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;aspect-ratio:1080/533}.main-art.svelte-1oo1z35.svelte-1oo1z35{position:absolute;bottom:0;left:0}.zoomist-wrapper.svelte-1oo1z35.svelte-1oo1z35{cursor:move;background-color:unset;-webkit-mask-image:linear-gradient(to right, transparent 15%, black 40%, black 75%, transparent 85%);mask-image:linear-gradient(to right, transparent 15%, black 40%, black 75%, transparent 85%)}.zoom-slider.svelte-1oo1z35.svelte-1oo1z35{position:absolute;bottom:0;left:0;background-color:rgba(0, 0, 0, 0.75);padding:2.5%;z-index:+20;display:none}.zoomer.svelte-1oo1z35.svelte-1oo1z35{position:absolute;z-index:+20;top:0;right:0;display:flex;flex-direction:column;display:none}.zoomer.svelte-1oo1z35 button.svelte-1oo1z35,.setpos.svelte-1oo1z35.svelte-1oo1z35{font-size:calc(0.02 * var(--content-width));width:calc(0.06 * var(--content-width));display:inline-flex;justify-content:center;align-items:center;aspect-ratio:1/1;background-color:rgba(0, 0, 0, 0.75);color:#fff;opacity:0.75;transition:all 0.25s}.setpos.svelte-1oo1z35.svelte-1oo1z35:hover,.zoomer.svelte-1oo1z35 button.svelte-1oo1z35:hover:not(.zoomer-disabled){opacity:1}.setpos.svelte-1oo1z35.svelte-1oo1z35:active,.zoomer.svelte-1oo1z35 button.svelte-1oo1z35:active:not(.zoomer-disabled){opacity:1;transform:scale(0.9)}.zoomer.svelte-1oo1z35 button.zoomer-disabled{opacity:0.6;color:rgba(255, 255, 255, 0.5)}.setpos.svelte-1oo1z35.svelte-1oo1z35{position:absolute;right:0;bottom:0;z-index:+20;display:none}.onBannerEdit.svelte-1oo1z35 .zoomer.svelte-1oo1z35{display:flex}.onBannerEdit.svelte-1oo1z35 .zoom-slider.svelte-1oo1z35,.onBannerEdit.svelte-1oo1z35 .setpos.svelte-1oo1z35{display:unset}",
  map: null
};
const BannerArt = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { onBannerEdit = false } = $$props;
  let { artURL = "" } = $$props;
  let { bannerPosition = { scale: 2, x: 0, y: 0 } } = $$props;
  let mainArt;
  ({
    initScale: bannerPosition.scale || 2,
    maxScale: 5,
    slider: {
      el: ".zoom-slider",
      direction: "vertical"
    },
    zoomer: {
      inEl: ".zoomin",
      outEl: ".zoomout",
      resetEl: null,
      disabledClass: "zoomer-disabled"
    }
  });
  getContext("editBanner");
  getContext("setPosition");
  if ($$props.onBannerEdit === void 0 && $$bindings.onBannerEdit && onBannerEdit !== void 0)
    $$bindings.onBannerEdit(onBannerEdit);
  if ($$props.artURL === void 0 && $$bindings.artURL && artURL !== void 0)
    $$bindings.artURL(artURL);
  if ($$props.bannerPosition === void 0 && $$bindings.bannerPosition && bannerPosition !== void 0)
    $$bindings.bannerPosition(bannerPosition);
  $$result.css.add(css$j);
  return `<div class="${["main-art svelte-1oo1z35", onBannerEdit ? "onBannerEdit" : ""].join(" ").trim()}"><div class="${"zoom-slider svelte-1oo1z35"}"></div>
	<div class="${"zoomer svelte-1oo1z35"}"><button class="${"zoomin svelte-1oo1z35"}"><i class="${"gi-zoom-in"}"></i></button>
		<button class="${"zoomout svelte-1oo1z35"}"><i class="${"gi-zoom-out"}"></i></button></div>
	<button class="${"setpos svelte-1oo1z35"}"><i class="${"gi-check"}"></i></button>

	<div class="${"zoomist-container"}"${add_attribute("this", mainArt, 0)}><div class="${"zoomist-wrapper svelte-1oo1z35"}"><div class="${"zoomist-image svelte-1oo1z35"}"><img${add_attribute("src", artURL, 0)} alt="${"Uploaded Splash Art"}" crossorigin="${"anonymous"}" class="${"svelte-1oo1z35"}"></div></div></div>
</div>`;
});
const _bannerImage_svelte_svelte_type_style_lang = "";
const css$i = {
  code: "picture.svelte-1f4lu7l,img.svelte-1f4lu7l{width:100%;display:block}.art-bg.svelte-1f4lu7l{position:absolute;bottom:0;left:0}.image-error.svelte-1f4lu7l{background-image:linear-gradient(to top, #eee8e3 50%, #f7f5f4)}",
  map: null
};
const Banner_image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $assets, $$unsubscribe_assets;
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  let { src = "" } = $$props;
  let { alt = "" } = $$props;
  let { wrapperClass = "" } = $$props;
  let { isError = false } = $$props;
  let { custom = false } = $$props;
  let { vision = "" } = $$props;
  let { artPosition = {} } = $$props;
  getContext("imageError");
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.wrapperClass === void 0 && $$bindings.wrapperClass && wrapperClass !== void 0)
    $$bindings.wrapperClass(wrapperClass);
  if ($$props.isError === void 0 && $$bindings.isError && isError !== void 0)
    $$bindings.isError(isError);
  if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0)
    $$bindings.custom(custom);
  if ($$props.vision === void 0 && $$bindings.vision && vision !== void 0)
    $$bindings.vision(vision);
  if ($$props.artPosition === void 0 && $$bindings.artPosition && artPosition !== void 0)
    $$bindings.artPosition(artPosition);
  $$result.css.add(css$i);
  $$unsubscribe_assets();
  return `<div class="${[
    "wrapper " + escape(wrapperClass, true) + " svelte-1f4lu7l",
    isError ? "image-error" : ""
  ].join(" ").trim()}" style="${"min-height: 100px; width: 100%;"}">${!isError ? `${custom ? `<img${add_attribute("src", $assets[`blank/${vision}`], 0)} alt="${"background banner"}" crossorigin="${"anonymous"}" class="${"art-bg svelte-1f4lu7l"}">
			${validate_component(BannerArt, "BannerArt").$$render(
    $$result,
    {
      artURL: src,
      bannerPosition: artPosition?.banner
    },
    {},
    {}
  )}` : `<div style="${"position: relative; width: 100%;"}"><div style="${"position: relative; overflow: hidden;"}"><picture class="${"svelte-1f4lu7l"}"><img${add_attribute("src", src, 0)}${add_attribute("alt", alt, 0)} crossorigin="${"anonymous"}" class="${"svelte-1f4lu7l"}"></picture></div></div>`}` : ``}
</div>`;
});
const _probabilityEditor_svelte_svelte_type_style_lang = "";
const css$h = {
  code: ".editor.svelte-cbzzf0.svelte-cbzzf0{background-image:linear-gradient(to top, #eee8e3 50%, #f7f5f4);display:flex;flex-direction:column;min-height:100%;width:100%;font-size:80%;position:relative}.editor.fullscreenEditor.svelte-cbzzf0.svelte-cbzzf0{width:75%;height:85%;min-height:unset}.header.svelte-cbzzf0.svelte-cbzzf0{background-color:rgba(20, 18, 15, 0.85);color:#fff;padding:1rem}.fullscreenEditor.svelte-cbzzf0 .header.svelte-cbzzf0{padding:0.75rem 1rem}.standard.svelte-cbzzf0 .header.svelte-cbzzf0{background-color:#5b61c4}.weapon-event.svelte-cbzzf0 .header.svelte-cbzzf0{background-color:#c86612}.body.svelte-cbzzf0.svelte-cbzzf0{padding:0 1% 1%;width:100%}.fullscreenEditor.svelte-cbzzf0 .body.svelte-cbzzf0{height:100%;overflow-y:auto}.footer.svelte-cbzzf0.svelte-cbzzf0{margin-top:auto;padding:0 1% 1%;text-align:right}.item.svelte-cbzzf0.svelte-cbzzf0{display:flex;align-items:center;width:100%;padding:0.2% 0 0.2% 1%;border-bottom:rgba(20, 18, 15, 0.5) 1px solid;transition:background 0.25s}.fullscreenEditor.svelte-cbzzf0 .item.svelte-cbzzf0{font-size:100%}.item.svelte-cbzzf0.svelte-cbzzf0:hover,.item.disabled.svelte-cbzzf0.svelte-cbzzf0{background-color:rgba(20, 18, 15, 0.075)}.item.disabled.svelte-cbzzf0.svelte-cbzzf0{opacity:0.3;cursor:not-allowed}input.svelte-cbzzf0.svelte-cbzzf0:disabled{cursor:not-allowed}.col.svelte-cbzzf0.svelte-cbzzf0{position:relative;display:block}.col.svelte-cbzzf0.svelte-cbzzf0:nth-child(1){flex-basis:90%;width:90%}.col.svelte-cbzzf0.svelte-cbzzf0:nth-child(2){height:1.8rem;flex-basis:10%;min-width:5rem}.fullscreenEditor.svelte-cbzzf0 .col.svelte-cbzzf0:nth-child(2){height:1.5rem}.col.percent.svelte-cbzzf0.svelte-cbzzf0:nth-child(2)::after{content:'%';background-color:#dbd7d0;height:100%;aspect-ratio:1/1;display:flex;justify-content:center;align-items:center;aspect-ratio:1/1;color:#787269;position:absolute;top:0;right:0;border-top-right-radius:3rem;border-bottom-right-radius:3rem}.select.svelte-cbzzf0 button.selected.svelte-cbzzf0,input.svelte-cbzzf0.svelte-cbzzf0{background-color:#fff;width:100%;padding:0 15%;margin-bottom:2%;font-size:80%;height:100%;display:block;border-radius:3rem;border:#c3b8a5 1px solid;outline:none;transition:all 0.2s}.percent.svelte-cbzzf0 input.svelte-cbzzf0{padding-right:35%}input.svelte-cbzzf0.svelte-cbzzf0:focus,.selection.svelte-cbzzf0.svelte-cbzzf0{box-shadow:0 0 0.4rem rgba(227, 149, 48, 0.7)}.selection.svelte-cbzzf0.svelte-cbzzf0{position:absolute;bottom:100%;left:0;width:100%;z-index:+10;background-color:#fff;border-radius:0.25rem;border:#c3b8a5 1px solid}.select.svelte-cbzzf0 button.selected.svelte-cbzzf0{font-size:90%}.selection.svelte-cbzzf0 button.svelte-cbzzf0{font-size:100%;display:block;padding:10% 15%;width:100%;text-align:left;border-bottom:#c5bcac 1px solid}button.selected.svelte-cbzzf0.svelte-cbzzf0,.selection.svelte-cbzzf0 button.svelte-cbzzf0{transition:background 0.25s}button.selected.svelte-cbzzf0.svelte-cbzzf0:hover,.selection.svelte-cbzzf0 button.svelte-cbzzf0:hover{background-color:#e8e5e0}",
  map: null
};
const Probability_editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let baseRate4;
  let baseRate5;
  let charRate;
  let winRate;
  let selectedRate;
  let hard4;
  let hard5;
  let max4;
  let max5;
  let guaranteed;
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let { type = "character-event" } = $$props;
  let { fullscreenEditor = false } = $$props;
  getContext("editprob");
  getContext("showModalReset");
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.fullscreenEditor === void 0 && $$bindings.fullscreenEditor && fullscreenEditor !== void 0)
    $$bindings.fullscreenEditor(fullscreenEditor);
  $$result.css.add(css$h);
  baseRate4 = getRate(type, "baseRate4");
  baseRate5 = getRate(type, "baseRate5");
  charRate = getRate(type, "charRate");
  winRate = getRate(type, "winRate");
  selectedRate = getRate(type, "selectedRate");
  hard4 = getRate(type, "hard4");
  hard5 = getRate(type, "hard5");
  max4 = getRate(type, "max4");
  max5 = getRate(type, "max5");
  guaranteed = getRate(type, "guaranteed") || "default";
  $$unsubscribe_t();
  return `<div class="${[
    "editor " + escape(type, true) + " svelte-cbzzf0",
    fullscreenEditor ? "fullscreenEditor" : ""
  ].join(" ").trim()}"><div class="${"header svelte-cbzzf0"}">${escape($t("editor.bannerConfig", {
    values: { banner: $t(`wish.banner.${type}`) }
  }))}</div>
	<div class="${"body svelte-cbzzf0"}"><div class="${"item svelte-cbzzf0"}"><div class="${"col svelte-cbzzf0"}">${escape($t("editor.baseRate", { values: { rarity: 5 } }))}</div>
			<div class="${"col percent svelte-cbzzf0"}"><input type="${"number"}"${add_attribute("value", baseRate5, 0)} class="${"svelte-cbzzf0"}"></div></div>

		<div class="${["item svelte-cbzzf0", baseRate5 >= 100 ? "disabled" : ""].join(" ").trim()}"><div class="${"col svelte-cbzzf0"}">${escape($t("editor.maxPity", { values: { rarity: 5 } }))}</div>
			<div class="${"col svelte-cbzzf0"}"><input type="${"number"}"${add_attribute("value", max5, 0)} ${baseRate5 >= 100 ? "disabled" : ""} class="${"svelte-cbzzf0"}"></div></div>

		<div class="${["item svelte-cbzzf0", baseRate5 >= 100 || !max5 || max5 <= 1 ? "disabled" : ""].join(" ").trim()}"><div class="${"col svelte-cbzzf0"}">${escape($t("editor.hardPity", { values: { rarity: 5 } }))}</div>
			<div class="${"col svelte-cbzzf0"}"><input type="${"number"}"${add_attribute("value", hard5, 0)} ${baseRate5 >= 100 || !max5 || max5 <= 1 ? "disabled" : ""} class="${"svelte-cbzzf0"}"></div></div>

		<div class="${"item svelte-cbzzf0"}"><div class="${"col svelte-cbzzf0"}">${escape($t("editor.currentPity", { values: { rarity: 5 } }))}</div>
			<div class="${"col svelte-cbzzf0"}"><input type="${"number"}"${add_attribute("value", localPity.get(`pity5-${type}`), 0)} class="${"svelte-cbzzf0"}"></div></div>

		<div class="${["item svelte-cbzzf0", baseRate5 >= 100 || max5 <= 1 ? "disabled" : ""].join(" ").trim()}"><div class="${"col svelte-cbzzf0"}">${escape($t("editor.baseRate", { values: { rarity: 4 } }))}</div>
			<div class="${"col percent svelte-cbzzf0"}"><input type="${"number"}"${add_attribute("value", baseRate4, 0)} ${baseRate5 >= 100 || max5 <= 1 ? "disabled" : ""} class="${"svelte-cbzzf0"}"></div></div>

		<div class="${[
    "item svelte-cbzzf0",
    baseRate5 >= 100 || baseRate4 >= 100 || max5 <= 1 ? "disabled" : ""
  ].join(" ").trim()}"><div class="${"col svelte-cbzzf0"}">${escape($t("editor.maxPity", { values: { rarity: 4 } }))}</div>
			<div class="${"col svelte-cbzzf0"}"><input type="${"number"}"${add_attribute("value", max4, 0)} ${baseRate5 >= 100 || baseRate4 >= 100 || max5 <= 1 ? "disabled" : ""} class="${"svelte-cbzzf0"}"></div></div>

		<div class="${[
    "item svelte-cbzzf0",
    baseRate5 >= 100 || baseRate4 >= 100 || !max4 || max4 <= 1 || max5 <= 1 ? "disabled" : ""
  ].join(" ").trim()}"><div class="${"col svelte-cbzzf0"}">${escape($t("editor.hardPity", { values: { rarity: 4 } }))}</div>
			<div class="${"col svelte-cbzzf0"}"><input type="${"number"}"${add_attribute("value", hard4, 0)} ${baseRate5 >= 100 || baseRate4 >= 100 || !max4 || max4 <= 1 || max5 <= 1 ? "disabled" : ""} class="${"svelte-cbzzf0"}"></div></div>

		<div class="${"item svelte-cbzzf0"}"><div class="${"col svelte-cbzzf0"}">${escape($t("editor.currentPity", { values: { rarity: 4 } }))}</div>
			<div class="${"col svelte-cbzzf0"}"><input type="${"number"}"${add_attribute("value", localPity.get(`pity4-${type}`), 0)} class="${"svelte-cbzzf0"}"></div></div>

		${type !== "standard" ? `<div class="${["item svelte-cbzzf0", guaranteed === "always" ? "disabled" : ""].join(" ").trim()}"><div class="${"col svelte-cbzzf0"}">${escape($t("editor.winRate"))}</div>
				<div class="${"col percent svelte-cbzzf0"}"><input type="${"number"}"${add_attribute("value", winRate, 0)} ${guaranteed === "always" ? "disabled" : ""} class="${"svelte-cbzzf0"}"></div></div>` : ``}

		
		<div class="${[
    "item svelte-cbzzf0",
    baseRate5 >= 100 && type !== "standard" || guaranteed === "always" || winRate >= 100 ? "disabled" : ""
  ].join(" ").trim()}"><div class="${"col svelte-cbzzf0"}">${escape($t("editor.charRate"))}
				${type !== "standard" ? `<small>${escape($t("editor.nonRateup"))}</small>` : ``}
				:
			</div>
			<div class="${"col percent svelte-cbzzf0"}"><input type="${"number"}"${add_attribute("value", charRate, 0)} ${baseRate5 >= 100 && type !== "standard" || guaranteed === "always" || winRate >= 100 ? "disabled" : ""} class="${"svelte-cbzzf0"}"></div></div>

		${type.match("weapon") ? `<div class="${"item svelte-cbzzf0"}"><div class="${"col svelte-cbzzf0"}">${escape($t("editor.selectedRate"))}</div>
				<div class="${"col percent svelte-cbzzf0"}"><input type="${"number"}"${add_attribute("value", selectedRate, 0)} class="${"svelte-cbzzf0"}"></div></div>` : ``}

		${type !== "standard" ? `<div class="${"item svelte-cbzzf0"}"><div class="${"col svelte-cbzzf0"}"><!-- HTML_TAG_START -->${$t("editor.guaranteedSystem")}<!-- HTML_TAG_END --></div>
				<div class="${"col select svelte-cbzzf0"}"><button class="${"selected svelte-cbzzf0"}">${escape($t(`editor.${guaranteed}`))}</button>
					${``}</div></div>` : ``}</div>
	<div class="${"footer svelte-cbzzf0"}">${validate_component(ButtonGeneral, "ButtonGeneral").$$render($$result, {}, {}, {
    default: () => {
      return `${escape($t("editor.backToDefault"))}`;
    }
  })}
		${validate_component(ButtonModal, "ButtonModal").$$render($$result, {}, {}, {})}</div>
</div>`;
});
const BannerCard_svelte_svelte_type_style_lang = "";
const css$g = {
  code: ".card.svelte-xg8c82.svelte-xg8c82,.front.svelte-xg8c82.svelte-xg8c82,.back.svelte-xg8c82.svelte-xg8c82,.frame.svelte-xg8c82.svelte-xg8c82{width:100%;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;aspect-ratio:27/14}.back.svelte-xg8c82.svelte-xg8c82{position:absolute;transform:rotateX(180deg);z-index:+999;transition:all 0.5s}.editor.fullscreenEditor.svelte-xg8c82 .back.svelte-xg8c82{position:fixed;transform:unset;aspect-ratio:unset;left:0;top:0;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.25);display:flex;justify-content:center;align-items:center;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}.front.svelte-xg8c82.svelte-xg8c82,.back.svelte-xg8c82.svelte-xg8c82{-webkit-backface-visibility:hidden;backface-visibility:hidden}.frame.skeleton-event.svelte-xg8c82.svelte-xg8c82,.card.svelte-xg8c82 .card-image.skeleton-event{aspect-ratio:1080/533}.frame.skeleton.svelte-xg8c82.svelte-xg8c82,.card.svelte-xg8c82 .card-image.skeleton{aspect-ratio:738.55/382.95}.card.svelte-xg8c82.svelte-xg8c82{position:relative}.card.svelte-xg8c82.svelte-xg8c82:not(.fullscreenEditor){transition:transform 0.5s;transform-style:preserve-3d}.card.editor.svelte-xg8c82.svelte-xg8c82:not(.fullscreenEditor){transform:rotateX(180deg)}.editor.svelte-xg8c82 .front.svelte-xg8c82{pointer-events:none}.frame.svelte-xg8c82.svelte-xg8c82,.card.svelte-xg8c82 .card-image{position:absolute;bottom:0;left:0}.character.svelte-xg8c82.svelte-xg8c82{position:absolute;height:100%;right:0;top:0;overflow:hidden}img.splash-art.svelte-xg8c82.svelte-xg8c82{height:150%}.info.svelte-xg8c82.svelte-xg8c82{position:absolute;left:5%;bottom:8%;display:flex;align-items:center;z-index:+10}.info.svelte-xg8c82 button.svelte-xg8c82{background-color:#eee8e3;color:rgba(0, 0, 0, 0.5);border-radius:20px;border:#e2d7b6 0.1rem solid;font-size:calc(1.5 / 100 * var(--content-width));transition:background 0.25s, color 0.25s}.info.svelte-xg8c82 button.svelte-xg8c82:hover{background-color:#e0ddd4;color:rgba(0, 0, 0, 1)}.info.svelte-xg8c82 button.gear.svelte-xg8c82{width:calc(3 / 100 * var(--content-width));font-size:calc(2 / 100 * var(--content-width));aspect-ratio:1/1;display:inline-flex;justify-content:center;align-items:center;line-height:0;margin-left:calc(1 / 100 * var(--content-width))}.info.svelte-xg8c82 button.detail.svelte-xg8c82{padding:calc(0.5 / 100 * var(--content-width)) calc(2.5 / 100 * var(--content-width))}",
  map: null
};
const BannerCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let watermark;
  let $isCustomBanner, $$unsubscribe_isCustomBanner;
  let $assets, $$unsubscribe_assets;
  let $t, $$unsubscribe_t;
  $$unsubscribe_isCustomBanner = subscribe(isCustomBanner, (value) => $isCustomBanner = value);
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let { data: data2 = {} } = $$props;
  let { index = -1 } = $$props;
  let { fullscreenEditor = false } = $$props;
  let { editor = false } = $$props;
  let type, featured, character, bannerName, rateup, textOffset, charTitle, vision, images, artPosition;
  let clientWidth;
  let clientHeight;
  let imageError = false;
  setContext("imageError", () => imageError = true);
  getContext("editprob");
  getContext("navigate");
  if ($$props.data === void 0 && $$bindings.data && data2 !== void 0)
    $$bindings.data(data2);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.fullscreenEditor === void 0 && $$bindings.fullscreenEditor && fullscreenEditor !== void 0)
    $$bindings.fullscreenEditor(fullscreenEditor);
  if ($$props.editor === void 0 && $$bindings.editor && editor !== void 0)
    $$bindings.editor(editor);
  $$result.css.add(css$g);
  ({ type, featured, character, bannerName, rateup, textOffset, charTitle, vision, images, artPosition, watermark } = data2);
  $$unsubscribe_isCustomBanner();
  $$unsubscribe_assets();
  $$unsubscribe_t();
  return `<div class="${[
    "card svelte-xg8c82",
    (editor ? "editor" : "") + " " + (fullscreenEditor ? "fullscreenEditor" : "")
  ].join(" ").trim()}" style="${"--content-width:" + escape(clientWidth, true) + "px; --content-height:" + escape(clientHeight, true) + "px"}"><div class="${"back svelte-xg8c82"}">${editor ? `${validate_component(Probability_editor, "ProbEditor").$$render($$result, { type, fullscreenEditor }, {}, {})}` : ``}</div>
	<div class="${"front svelte-xg8c82"}">${$isCustomBanner ? `${validate_component(Banner_image, "BannerImage").$$render(
    $$result,
    {
      custom: true,
      src: images?.artURL,
      alt: bannerName,
      wrapperClass: "card-image skeleton",
      artPosition,
      vision
    },
    {},
    {}
  )}
			<div class="${"frame skeleton svelte-xg8c82"}">${validate_component(Frame_custom, "FrameCustom").$$render(
    $$result,
    {
      bannerName,
      character,
      charTitle,
      vision,
      watermark
    },
    {},
    {}
  )}</div>` : `${type === "beginner" ? `${validate_component(Banner_image, "BannerImage").$$render(
    $$result,
    {
      src: $assets["beginner"],
      isError: imageError,
      alt: "Weapon Banner",
      wrapperClass: "card-image skeleton"
    },
    {},
    {}
  )}
			<div class="${"frame skeleton svelte-xg8c82"}">${validate_component(Frame_beginner, "FrameBeginner").$$render($$result, { character }, {}, {})}</div>` : `${type === "weapon-event" ? `${validate_component(Banner_image, "BannerImage").$$render(
    $$result,
    {
      isError: imageError,
      src: $assets[bannerName],
      alt: "Weapon Banner",
      wrapperClass: "card-image skeleton-event"
    },
    {},
    {}
  )}
			<div class="${"frame skeleton-event svelte-xg8c82"}">${validate_component(Frame_weapon, "FrameWeapon").$$render($$result, { featured, rateup, textOffset }, {}, {})}</div>` : `${type === "character-event" ? `${validate_component(Banner_image, "BannerImage").$$render(
    $$result,
    {
      isError: imageError,
      src: $assets[bannerName],
      alt: "Character Event Banner",
      wrapperClass: "card-image skeleton-event"
    },
    {},
    {}
  )}
			${!bannerName || imageError ? `<div class="${"character svelte-xg8c82"}"><img class="${"splash-art svelte-xg8c82"}"${add_attribute("src", $assets[`splash-art/${character}`], 0)} alt="${"character"}" crossorigin="${"anonymous"}"></div>` : ``}
			<div class="${"frame skeleton-event svelte-xg8c82"}">${validate_component(Frame_character, "FrameCharacter").$$render(
    $$result,
    {
      character,
      textOffset,
      bannerName,
      event2: index === 2
    },
    {},
    {}
  )}</div>` : `${type === "standard" ? `${validate_component(Banner_image, "BannerImage").$$render(
    $$result,
    {
      isError: imageError,
      src: $assets[bannerName],
      alt: "Standard Banner",
      wrapperClass: "card-image " + (imageError ? "skeleton" : "")
    },
    {},
    {}
  )}
			<div class="${"frame svelte-xg8c82"}">${validate_component(Frame_standard, "FrameStandard").$$render($$result, { bannerName }, {}, {})}</div>` : `${type === "member" ? `${validate_component(Banner_image, "BannerImage").$$render(
    $$result,
    {
      isError: imageError,
      src: $assets[bannerName],
      alt: "Member Banner",
      wrapperClass: "card-image " + (imageError ? "skeleton" : "")
    },
    {},
    {}
  )}
			<div class="${"frame svelte-xg8c82"}">${validate_component(Frame_standard, "FrameStandard").$$render($$result, { bannerName }, {}, {})}</div>` : ``}`}`}`}`}`}

		<div class="${"info svelte-xg8c82"}"><button class="${"detail svelte-xg8c82"}">${escape($t("details.text"))}</button>
			${type !== "beginner" ? `<button class="${"gear svelte-xg8c82"}"><i class="${"gi-gear"}"></i></button>` : ``}</div></div>
</div>`;
});
const _infoFaceButton_svelte_svelte_type_style_lang = "";
const css$f = {
  code: ".info.svelte-1q3ualb.svelte-1q3ualb{position:absolute;z-index:+11;left:5%;bottom:5%;display:flex;align-items:center}.info.onBannerEdit.svelte-1q3ualb.svelte-1q3ualb{pointer-events:none;opacity:0.5}.face.svelte-1q3ualb.svelte-1q3ualb{display:flex;aspect-ratio:1/1;background-color:#efeeee;border:#c5b894 calc(0.005 * var(--content-height)) solid;border-radius:5%;width:calc(0.18 * var(--content-height));position:relative}.inputFile.svelte-1q3ualb.svelte-1q3ualb{position:absolute;height:100%;width:100%;opacity:0;top:0;left:0;pointer-events:none}.overlay.svelte-1q3ualb.svelte-1q3ualb{width:100%;height:100%;background-color:rgba(0, 0, 0, 0.5);border:#e7e4de 0.1rem dashed;position:absolute;z-index:+2;top:0;left:0;display:flex;flex-direction:column;justify-content:center;text-align:center;align-items:center;opacity:0;transition:all 0.25s}.overlay.svelte-1q3ualb i.svelte-1q3ualb{color:rgba(255, 255, 255, 0.5);line-height:0;font-size:calc(2.5 / 100 * var(--content-width))}.overlay.svelte-1q3ualb span.svelte-1q3ualb{color:#fff;font-size:calc(1.3 / 100 * var(--content-width));margin-top:10%}.face.svelte-1q3ualb:hover .overlay.svelte-1q3ualb{opacity:1}.face.svelte-1q3ualb img.svelte-1q3ualb{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}img.placeholder.svelte-1q3ualb.svelte-1q3ualb{opacity:0.5}.customize.svelte-1q3ualb.svelte-1q3ualb{transform:translateX(calc(0.02 * var(--content-height)))}.customize.svelte-1q3ualb button.svelte-1q3ualb{background-color:#efeeee;color:rgba(0, 0, 0, 0.5);border-radius:20px;border:#e2d7b6 0.1rem solid;font-size:calc(1.5 / 100 * var(--content-width));transition:background 0.25s, color 0.25s;padding:calc(0.5 / 100 * var(--content-width)) calc(2.5 / 100 * var(--content-width));transition:all 0.25s}.customize.svelte-1q3ualb button.svelte-1q3ualb:hover{background-color:#e0ddd4;color:rgba(0, 0, 0, 1)}.customize.svelte-1q3ualb button.svelte-1q3ualb:active{transform:scale(0.95)}",
  map: null
};
const allowedType$1 = "image/png, image/webp, image/jpeg";
const Info_face_button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  let $assets, $$unsubscribe_assets;
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  let { onBannerEdit = false } = $$props;
  let { faceURL = "" } = $$props;
  getContext("editInfo");
  getContext("changeFace");
  getContext("editSplashArt");
  if ($$props.onBannerEdit === void 0 && $$bindings.onBannerEdit && onBannerEdit !== void 0)
    $$bindings.onBannerEdit(onBannerEdit);
  if ($$props.faceURL === void 0 && $$bindings.faceURL && faceURL !== void 0)
    $$bindings.faceURL(faceURL);
  $$result.css.add(css$f);
  $$unsubscribe_t();
  $$unsubscribe_assets();
  return `<div class="${["info svelte-1q3ualb", onBannerEdit ? "onBannerEdit" : ""].join(" ").trim()}"><div class="${"pic"}"><label class="${"face svelte-1q3ualb"}" for="${"faceInput"}"><div class="${"overlay svelte-1q3ualb"}"><i class="${"gi-picture svelte-1q3ualb"}"></i>
				<span class="${"svelte-1q3ualb"}">${escape($t("customBanner.faceIcon"))}</span></div>

			${faceURL ? `<img${add_attribute("src", faceURL, 0)} alt="${"Face"}" crossorigin="${"anonymous"}" class="${"svelte-1q3ualb"}">` : `<img class="${"placeholder svelte-1q3ualb"}"${add_attribute("src", $assets["face-placeholder.webp"], 0)} alt="${"face placeholder"}" crossorigin="${"anonymous"}">`}</label>

		<input class="${"inputFile svelte-1q3ualb"}" type="${"file"}" id="${"faceInput"}"${add_attribute("accept", allowedType$1, 0)}></div>

	<div class="${"customize svelte-1q3ualb"}"><button class="${"detail svelte-1q3ualb"}"><i class="${"gi-pen"}"></i>
			${escape($t("customBanner.editInfo"))}</button>
		<br>
		<button class="${"splashart svelte-1q3ualb"}"><i class="${"gi-pen"}"></i>
			${escape($t("customBanner.adjustSplashArt"))}</button></div>
</div>`;
});
const _splashartForm_svelte_svelte_type_style_lang = "";
const css$e = {
  code: ".hoverable.svelte-nxdi6f.svelte-nxdi6f{position:absolute;top:0;right:0;width:100%;height:100%;z-index:+11;transition:all 0.25s;opacity:0;display:flex;justify-content:flex-end}.hoverable.onBannerEdit.svelte-nxdi6f.svelte-nxdi6f{pointer-events:none;opacity:0}.hoverable.svelte-nxdi6f.svelte-nxdi6f:hover:not(.onBannerEdit),.hoverable.onDrag.svelte-nxdi6f.svelte-nxdi6f,.hoverable.isMobile.svelte-nxdi6f.svelte-nxdi6f:not(.onBannerEdit),.wrapper.svelte-nxdi6f.svelte-nxdi6f:hover,.isMobile.svelte-nxdi6f .wrapper.svelte-nxdi6f{opacity:1}.hoverable.onDrag.svelte-nxdi6f.svelte-nxdi6f{z-index:20}.wrapper.svelte-nxdi6f.svelte-nxdi6f{width:50%;height:100%;position:relative;display:flex;align-items:flex-end;flex-direction:column;background-image:linear-gradient(45deg, transparent 50%, rgba(0, 0, 0, 0.5));opacity:0;transition:all 0.25s}.button.svelte-nxdi6f.svelte-nxdi6f{color:rgba(255, 255, 255, 0.8);background-color:rgba(0, 0, 0, 0.5);border:#e7e4de 0.1rem dashed;padding:2% 3%;display:flex;align-items:center;line-height:0;border-radius:2%;margin:1%;font-size:calc(1.5 / 100 * var(--content-width));transition:all 0.25s}.button.move.svelte-nxdi6f.svelte-nxdi6f{border-style:solid;padding:1%}.button.svelte-nxdi6f i.svelte-nxdi6f{font-size:calc(2.5 / 100 * var(--content-width));margin-right:calc(1 / 100 * var(--content-width))}.button.svelte-nxdi6f.svelte-nxdi6f:active{transform:scale(0.95)}.inputFile.svelte-nxdi6f.svelte-nxdi6f{position:absolute;height:100%;width:100%;opacity:0;top:0;left:0;pointer-events:none}.onDrag.svelte-nxdi6f .inputFile.svelte-nxdi6f{pointer-events:unset}.drophere.svelte-nxdi6f.svelte-nxdi6f{pointer-events:none;width:100%;height:100%;position:absolute;top:0;left:0;background-color:rgba(0, 0, 0, 0.5);display:flex;justify-content:center;align-items:center}",
  map: null
};
const allowedType = "image/png, image/webp, image/jpeg";
const Splashart_form = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  let $isMobile, $$unsubscribe_isMobile;
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => $isMobile = value);
  let { onBannerEdit = false } = $$props;
  getContext("editBanner");
  getContext("changeArt");
  if ($$props.onBannerEdit === void 0 && $$bindings.onBannerEdit && onBannerEdit !== void 0)
    $$bindings.onBannerEdit(onBannerEdit);
  $$result.css.add(css$e);
  $$unsubscribe_t();
  $$unsubscribe_isMobile();
  return `<div class="${[
    "hoverable svelte-nxdi6f",
    ($isMobile ? "isMobile" : "") + " " + (onBannerEdit ? "onBannerEdit" : "") + " "
  ].join(" ").trim()}"><div class="${"wrapper svelte-nxdi6f"}">${`<label class="${"mainart button svelte-nxdi6f"}" for="${"uploadFile"}"><i class="${"gi-picture svelte-nxdi6f"}"></i>
				<span>${escape($t("customBanner.changeSplashArt"))}</span></label>

			<button class="${"button move svelte-nxdi6f"}"><i class="${"gi-move svelte-nxdi6f"}"></i> <span>${escape($t("customBanner.move"))}</span></button>`}</div>
	${``}

	<input class="${"inputFile svelte-nxdi6f"}" type="${"file"}" id="${"uploadFile"}"${add_attribute("accept", allowedType, 0)}>
</div>`;
});
const _visionPicker_svelte_svelte_type_style_lang = "";
const css$d = {
  code: ".vision-picker.svelte-1dh2206{position:absolute;top:0;right:0;transform:translateY(-100%);display:flex;width:100%;justify-content:flex-end;z-index:+10}button.svelte-1dh2206{font-size:150%;display:inline-flex;justify-content:center;align-items:center;line-height:0;padding:1%;border:1px solid #ccc;transition:all 0.25s}button.active.svelte-1dh2206{color:#fff;border-color:transparent}button.svelte-1dh2206:not(.active){background-color:#fff}button.svelte-1dh2206:hover:not(.active){background-color:#ecedda}button.svelte-1dh2206:active:not(.active){transform:scale(0.9)}",
  map: null
};
const Vision_picker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { selected = "" } = $$props;
  const visionList = ["pyro", "hydro", "anemo", "electro", "dendro", "cryo", "geo"];
  getContext("setVision");
  if ($$props.selected === void 0 && $$bindings.selected && selected !== void 0)
    $$bindings.selected(selected);
  $$result.css.add(css$d);
  return `<div class="${"vision-picker svelte-1dh2206"}">${each(visionList, (vision) => {
    let isActive = selected === vision;
    return `
		<button class="${[
      escape(null_to_empty(isActive ? `bg-${vision}` : ""), true) + " svelte-1dh2206",
      isActive ? "active" : ""
    ].join(" ").trim()}"><i class="${"gi-" + escape(vision, true) + " " + escape(!isActive ? `${vision}-flat` : "", true) + " svelte-1dh2206"}"></i>
		</button>`;
  })}
</div>`;
});
const _inventoryItem_svelte_svelte_type_style_lang = "";
const css$c = {
  code: ".content.svelte-brfwbj.svelte-brfwbj{border-radius:calc(3.5 / 100 * var(--item-width));width:100%;height:100%;display:flex;flex-direction:column;text-align:center;background-color:#fff;color:#3a4156;position:relative}.content.svelte-brfwbj.svelte-brfwbj::after{content:'';position:absolute;z-index:-1;top:50%;left:50%;transform:translate(-50%, -50%);width:100%;height:100%;border-radius:calc(5 / 100 * var(--item-width));opacity:0;transition:opacity 0.15s}.content.svelte-brfwbj.svelte-brfwbj:hover::after{opacity:1;border:0.1rem solid #fff}.content.owned.svelte-brfwbj.svelte-brfwbj:hover::after{border:0.3rem solid #eac343}.overlay.svelte-brfwbj.svelte-brfwbj{top:0;left:0;position:absolute;z-index:+1;width:100%;height:100%;background-color:#000;opacity:0.5;border-radius:calc(3.5 / 100 * var(--item-width))}picture.svelte-brfwbj.svelte-brfwbj{width:100%;aspect-ratio:1/1;display:flex;justify-content:center;background-size:cover;position:relative;overflow:hidden;border-top-left-radius:calc(3.5 / 100 * var(--item-width));border-top-right-radius:calc(3.5 / 100 * var(--item-width));border-bottom-right-radius:calc(20 / 100 * var(--item-width))}picture.weapon.svelte-brfwbj.svelte-brfwbj{justify-content:flex-end;align-items:flex-start}picture.character.svelte-brfwbj img.svelte-brfwbj{height:100%;width:100%}picture.weapon.svelte-brfwbj img.svelte-brfwbj{width:100%}picture.svelte-brfwbj span.svelte-brfwbj{position:absolute;top:0}.element.svelte-brfwbj.svelte-brfwbj{left:0;font-size:2rem}.qty.svelte-brfwbj.svelte-brfwbj{right:0;background-color:#a36b5e;border-bottom-left-radius:0.5rem;font-size:0.9rem;padding:0.1rem 0.3rem;color:#f0c882}.star.svelte-brfwbj.svelte-brfwbj{position:absolute;left:50%;top:calc(-8 / 100 * var(--item-width));transform:translateX(-50%)}.gi-star.svelte-brfwbj.svelte-brfwbj{color:#eac343;font-size:calc(15 / 100 * var(--item-width))}.caption.svelte-brfwbj.svelte-brfwbj{display:flex;justify-content:center;align-items:center;width:100%;padding:calc(4 / 100 * var(--item-width));position:relative;font-size:calc(9 / 100 * var(--item-width))}.caption.svelte-brfwbj span.svelte-brfwbj{display:block;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-transform:capitalize}img.claymore.svelte-brfwbj.svelte-brfwbj{transform:rotate(18deg) scale(1.15) translateX(-1.5em)}img.bow.svelte-brfwbj.svelte-brfwbj{transform:rotate(10deg) scale(1.25) translateX(-0.5em)}img.polearm.svelte-brfwbj.svelte-brfwbj{transform:rotate(10deg) scale(1.5) translate(-12%, 12%)}img.sword.svelte-brfwbj.svelte-brfwbj{transform:rotate(10deg) scale(1.2) translateY(-1em) translateX(-0.7em)}",
  map: null
};
const Inventory_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $assets, $$unsubscribe_assets;
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  let { itemdata = {} } = $$props;
  const { rarity = 3, type = "character", itemID = 0, name = "", localName = "", vision = "", weaponType = "", qty = 0, isOwned = true, custom = false } = itemdata;
  const bg = custom ? $assets[`${rarity}star-special.webp`] : $assets[`${rarity}star-bg.webp`];
  let countInfo = `R${qty > 5 ? `5 + ${qty - 5}` : qty}`;
  if (type === "character") {
    countInfo = `C${qty > 7 ? `6 + ${qty - 7}` : qty - 1}`;
  }
  getContext("showDetail");
  if ($$props.itemdata === void 0 && $$bindings.itemdata && itemdata !== void 0)
    $$bindings.itemdata(itemdata);
  $$result.css.add(css$c);
  $$unsubscribe_assets();
  return `<div class="${["content svelte-brfwbj", isOwned ? "owned" : ""].join(" ").trim()}">${!isOwned ? `<div class="${"overlay svelte-brfwbj"}"></div>` : ``}
	<picture class="${"star" + escape(rarity, true) + " " + escape(type, true) + " svelte-brfwbj"}" style="${"background-image:url('" + escape(bg, true) + "');"}">${custom ? `<img${add_attribute("data-placeholder", $assets["face-placeholder.webp"], 0)}${add_attribute("alt", localName, 0)} crossorigin="${"anonymous"}" class="${"svelte-brfwbj"}">
			<span class="${"gi-" + escape(vision, true) + " " + escape(vision, true) + " icon-gradient element svelte-brfwbj"}"></span>` : `${type === "character" ? (() => {
    return `
			<img${add_attribute("data-placeholder", $assets["face-placeholder.webp"], 0)}${add_attribute("alt", localName, 0)} crossorigin="${"anonymous"}" class="${"svelte-brfwbj"}">
			<span class="${"gi-" + escape(vision, true) + " " + escape(vision, true) + " icon-gradient element svelte-brfwbj"}"></span>`;
  })() : `<img loading="${"lazy"}" crossorigin="${"anonymous"}"${add_attribute("src", $assets[name], 0)}${add_attribute("alt", localName, 0)} class="${escape(null_to_empty(weaponType), true) + " svelte-brfwbj"}">`}`}
		${qty > 1 ? `<span class="${"qty svelte-brfwbj"}">${escape(countInfo)}</span>` : ``}</picture>
	<div class="${"caption svelte-brfwbj"}"><div class="${"star svelte-brfwbj"}">${each(Array(rarity), (_) => {
    return `<i class="${"gi-star svelte-brfwbj"}"></i>`;
  })}</div>
		<span class="${"svelte-brfwbj"}">${escape(localName)}</span></div>
</div>`;
});
const getAllChars = (star) => charsDB.data.filter(({ rarity }) => rarity === star).map((arr) => {
  arr.type = "character";
  return arr;
});
getAllChars(4).filter(({ name }) => {
  return !charsDB.onlyStandard.includes(name);
});
const _rateupPicker_svelte_svelte_type_style_lang = "";
const css$b = {
  code: ".picker.svelte-1eit2lp{width:100%;height:100%;position:absolute;top:0;left:0;background-color:#e2dbce;z-index:+1;overflow-y:auto;padding:1% 0 5%}.row.svelte-1eit2lp{display:flex;flex-wrap:wrap}.item.svelte-1eit2lp{margin:calc(0.025 * var(--item-width));aspect-ratio:8.75 / 10;width:23.5%}",
  map: null
};
const Rateup_picker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_viewportHeight;
  let $t, $$unsubscribe_t;
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let { exclude = [] } = $$props;
  const chars = getAllChars(4).filter(({ name }) => !exclude.includes(name));
  getContext("selectChar");
  if ($$props.exclude === void 0 && $$bindings.exclude && exclude !== void 0)
    $$bindings.exclude(exclude);
  $$result.css.add(css$b);
  $$unsubscribe_viewportHeight();
  $$unsubscribe_t();
  return `<div class="${"picker svelte-1eit2lp"}"><div class="${"row svelte-1eit2lp"}">${each(chars, (char) => {
    return `<button class="${"item svelte-1eit2lp"}">${validate_component(Inventory_item, "InventoryItem").$$render(
      $$result,
      {
        itemdata: {
          ...char,
          localName: $t(`${char.name}.name`)
        }
      },
      {},
      {}
    )}
			</button>`;
  })}</div>
</div>`;
});
const _previewGenerator_svelte_svelte_type_style_lang = "";
const css$a = {
  code: ".row.svelte-17c1xc4{display:flex;width:100%;align-items:center;margin-bottom:2%}img.svelte-17c1xc4{max-width:100%;height:auto}",
  map: null
};
const Preview_generator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let { preview = "" } = $$props;
  getContext("changeThumbnail");
  if ($$props.preview === void 0 && $$bindings.preview && preview !== void 0)
    $$bindings.preview(preview);
  $$result.css.add(css$a);
  $$unsubscribe_t();
  return `<div class="${"row svelte-17c1xc4"}"><label for="${"bannerdesign"}">${escape($t("customBanner.preview"))}</label>
	${validate_component(ButtonGeneral, "ButtonGeneral").$$render($$result, {}, {}, {
    default: () => {
      return `${escape($t("customBanner.generateImage"))}`;
    }
  })}</div>
<div class="${"row svelte-17c1xc4"}">${preview ? `<img${add_attribute("src", preview, 0)} alt="${"Preview Banner"}" crossorigin="${"anonymous"}" class="${"svelte-17c1xc4"}">` : ``}
</div>`;
});
const _infoEditor_svelte_svelte_type_style_lang = "";
const css$9 = {
  code: "section.svelte-a9gf4v.svelte-a9gf4v{position:fixed;z-index:+20;top:0;left:0;width:var(--screen-width);height:var(--screen-height);background-color:rgba(0, 0, 0, 0.1);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);display:flex;justify-content:flex-end}.wrapper.svelte-a9gf4v.svelte-a9gf4v{height:100%;width:500px;max-width:100%;padding:1%;background-color:#fbf6ee;background-image:var(--bg-icon);background-repeat:no-repeat;background-size:75%;background-position:50% 60%;color:var(--text-color)}.mobile .wrapper.svelte-a9gf4v.svelte-a9gf4v{width:350px}.header.svelte-a9gf4v.svelte-a9gf4v{display:flex;width:100%;justify-content:space-between;align-items:center;margin-bottom:2%}h1.svelte-a9gf4v.svelte-a9gf4v{font-size:calc(0.2 * var(--item-width))}.body.svelte-a9gf4v.svelte-a9gf4v{height:calc(100% - var(--header-height));padding-bottom:2%;position:relative}.body-wrapper.svelte-a9gf4v.svelte-a9gf4v{overflow-y:auto;width:100%;height:100%}.field-group.svelte-a9gf4v.svelte-a9gf4v{padding:1%}input.svelte-a9gf4v.svelte-a9gf4v{width:100%;padding:0 1.5rem;margin-bottom:2%;height:3rem;display:block;border-radius:3rem;border:#c3b8a5 2px solid;background-color:var(--tertiary-color);outline:none;transition:all 0.2s}input.svelte-a9gf4v.svelte-a9gf4v:focus{box-shadow:0 0 0.4rem rgba(227, 149, 48, 0.7)}input.svelte-a9gf4v.svelte-a9gf4v:disabled{background-color:transparent;opacity:0.7}.row.svelte-a9gf4v.svelte-a9gf4v{display:flex;width:100%;align-items:center;margin-bottom:2%}.rateup-item.svelte-a9gf4v.svelte-a9gf4v{margin:1%;aspect-ratio:8.75 / 10;width:25%;max-width:135px;position:relative}.rateup-item.svelte-a9gf4v .item-wrapper.svelte-a9gf4v{width:100%;height:100%}.rateup-item.svelte-a9gf4v .remove.svelte-a9gf4v{position:absolute;top:0;right:0;transform:translate(25%, -25%);z-index:+1;background-color:#ff1c1c;color:#fff;line-height:0;padding:7%;border-radius:100%;opacity:0.8;transition:all 0.25s}.rateup-item.svelte-a9gf4v .remove.svelte-a9gf4v:hover{opacity:1;background-color:#cb1717}.remove.svelte-a9gf4v.svelte-a9gf4v:active{transform:translate(25%, -25%) scale(0.9)}.rateup-item.blank.svelte-a9gf4v.svelte-a9gf4v{border:2px dashed #c3b8a5;border-radius:5%;transition:all 0.25s}.rateup-item.blank.svelte-a9gf4v.svelte-a9gf4v:hover{border-color:#857d71}.add.svelte-a9gf4v.svelte-a9gf4v{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#c3b8a5;line-height:0;font-size:calc(0.25 * var(--item-width));transition:all 0.25s}.add.svelte-a9gf4v.svelte-a9gf4v:hover{color:#857d71}",
  map: null
};
const Info_editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let itemWidth;
  let $assets, $$unsubscribe_assets;
  let $t, $$unsubscribe_t;
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let { rateup = [] } = $$props;
  let { bannerName = "" } = $$props;
  let { character = "" } = $$props;
  let { charTitle = "" } = $$props;
  let { preview = "" } = $$props;
  let { watermark = "" } = $$props;
  let showCharPicker = false;
  let headerHeight;
  let rowWidth;
  getContext("editInfo");
  getContext("setBannerName");
  getContext("setCharName");
  getContext("setCharTitle");
  const setRateup = getContext("setRateup");
  getContext("setWatermark");
  const selectChar = (charName) => {
    showCharPicker = false;
    if (!charName)
      return;
    if (rateup.includes(charName))
      return;
    if (rateup.length >= 3)
      return;
    setRateup([...rateup, charName]);
  };
  setContext("selectChar", selectChar);
  if ($$props.rateup === void 0 && $$bindings.rateup && rateup !== void 0)
    $$bindings.rateup(rateup);
  if ($$props.bannerName === void 0 && $$bindings.bannerName && bannerName !== void 0)
    $$bindings.bannerName(bannerName);
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  if ($$props.charTitle === void 0 && $$bindings.charTitle && charTitle !== void 0)
    $$bindings.charTitle(charTitle);
  if ($$props.preview === void 0 && $$bindings.preview && preview !== void 0)
    $$bindings.preview(preview);
  if ($$props.watermark === void 0 && $$bindings.watermark && watermark !== void 0)
    $$bindings.watermark(watermark);
  $$result.css.add(css$9);
  itemWidth = rowWidth / 4;
  $$unsubscribe_assets();
  $$unsubscribe_t();
  return `<section class="${"svelte-a9gf4v"}"><div class="${["wrapper vision-picker svelte-a9gf4v", showCharPicker ? "pickerActive" : ""].join(" ").trim()}" style="${"--bg-icon:url('" + escape($assets["modal-bg-icon.png"], true) + "'); --header-height:" + escape(headerHeight, true) + "px;"}"><div class="${"header svelte-a9gf4v"}"><h1 class="${"svelte-a9gf4v"}">${escape($t("customBanner.editBanner"))}</h1>
			<div class="${"close-button"}"><button class="${"close"}"><i class="${"gi-close"}"></i></button></div></div>

		<div class="${"body svelte-a9gf4v"}" style="${"--item-width:" + escape(itemWidth, true) + "px"}"><div class="${"body-wrapper svelte-a9gf4v"}"><div class="${"field-group svelte-a9gf4v"}"><label for="${"bannerName"}">${escape($t("customBanner.bannerName"))}: *</label>
					<div class="${"col"}"><input type="${"text"}" autocomplete="${"off"}" id="${"bannerName"}"${add_attribute("placeholder", $t("customBanner.bannerName"), 0)}${add_attribute("value", bannerName, 0)} class="${"svelte-a9gf4v"}"></div></div>

				<div class="${"field-group svelte-a9gf4v"}"><label for="${"charName"}">${escape($t("customBanner.charName"))}: *</label>
					<div class="${"col"}"><input type="${"text"}" autocomplete="${"off"}" id="${"charName"}"${add_attribute("placeholder", $t("customBanner.charName"), 0)}${add_attribute("value", character, 0)} class="${"svelte-a9gf4v"}"></div></div>

				<div class="${"field-group svelte-a9gf4v"}"><label for="${"charTitle"}">${escape($t("customBanner.charTitle"))}:</label>
					<div class="${"col"}"><input type="${"text"}" autocomplete="${"off"}" id="${"charTitle"}"${add_attribute("placeholder", $t("customBanner.charTitle"), 0)}${add_attribute("value", charTitle, 0)} class="${"svelte-a9gf4v"}"></div></div>

				<div class="${"field-group svelte-a9gf4v"}"><label for="${"watermark"}">${escape($t("customBanner.watermark"))}:</label>
					<div class="${"col"}"><input type="${"text"}" autocomplete="${"off"}" id="${"watermark"}" placeholder="${"Banner By @Traveler"}"${add_attribute("value", watermark, 0)} class="${"svelte-a9gf4v"}"></div></div>

				<div class="${"field-group svelte-a9gf4v"}"><div class="${"row svelte-a9gf4v"}"><label for="${"rateup"}">${escape($t("customBanner.rateupChar"))}: *</label></div>
					<div class="${"row svelte-a9gf4v"}">${each(Array(3), (_, i) => {
    let { name, vision } = getCharDetails(rateup[i]) || {};
    return `
							<div class="${["rateup-item svelte-a9gf4v", !name ? "blank" : ""].join(" ").trim()}">${name ? `<button class="${"remove svelte-a9gf4v"}"><i class="${"gi-delete"}"></i></button>
									<button class="${"item-wrapper svelte-a9gf4v"}">${validate_component(Inventory_item, "InventoryItem").$$render(
      $$result,
      {
        itemdata: {
          localName: $t(`${name}.name`),
          name,
          vision,
          rarity: 4
        }
      },
      {},
      {}
    )}
									</button>` : `<button class="${"add svelte-a9gf4v"}"><i class="${"gi-plus"}"></i>
									</button>`}
							</div>`;
  })}</div></div>

				<div class="${"field-group svelte-a9gf4v"}">${validate_component(Preview_generator, "PreviewGenerator").$$render($$result, { preview }, {}, {})}</div></div>
			${showCharPicker ? `${validate_component(Rateup_picker, "RateupPicker").$$render($$result, { exclude: rateup }, {}, {})}` : ``}</div></div>
</section>`;
});
const _resultCard_svelte_svelte_type_style_lang = "";
const SplashArt_svelte_svelte_type_style_lang = "";
const css$8 = {
  code: ".splash-art.svelte-iiacim.svelte-iiacim{--zoomist-slider-bar-side:calc(0.003 * var(--screen-width));--zoomist-slider-bar-size:calc(0.35 * var(--screen-height));--zoomist-slider-button-size:calc(0.025 * var(--screen-height));--zoomist-slider-bar-color:#e9a540;--zoomist-slider-track-color:#999;--zoomist-slider-button-color:#fff}.close.svelte-iiacim.svelte-iiacim{position:fixed;top:30px;right:2%;z-index:10}button.svelte-iiacim.svelte-iiacim:active:not(.zoomer-disabled){transform:scale(0.9)}.mobile .close.svelte-iiacim.svelte-iiacim{top:0.3rem;right:6%}.overlay.svelte-iiacim.svelte-iiacim{position:absolute;top:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;text-align:center;z-index:+10;font-size:calc(0.1 * var(--screen-height));color:var(--tertiary-color);opacity:0.5}.not-owned.svelte-iiacim.svelte-iiacim{max-width:var(--screen-height);transform:rotate(-30deg);line-height:0.9}.notOwned.svelte-iiacim.svelte-iiacim{filter:brightness(40%)}.splash-art.svelte-iiacim.svelte-iiacim{background-image:var(--bg);background-size:cover;background-position:center;position:fixed;top:0;left:0;z-index:+15}.zoomist-container.svelte-iiacim.svelte-iiacim{aspect-ratio:1/1;opacity:1;transition:opacity 0.25s}.splash-art.svelte-iiacim.svelte-iiacim,.zoomist-wrapper.svelte-iiacim.svelte-iiacim,.zoomist-image.svelte-iiacim.svelte-iiacim{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.zoomist-wrapper.svelte-iiacim.svelte-iiacim{--scale:1.5;--translate-x:0px;--translate-y:0px;cursor:move;background-color:unset;position:relative}.zoomist-wrapper.weapon.svelte-iiacim.svelte-iiacim{--scale:1.1}.dragable.svelte-iiacim.svelte-iiacim{position:absolute;width:var(--screen-width);height:var(--screen-height);top:50%;left:50%;transform:translate(-50%, -50%)}.zoomist-wrapper.svelte-iiacim.svelte-iiacim::after{position:absolute;content:'Best Visible Area';text-align:right;font-size:100%;color:#fff;filter:drop-shadow(0 0 0.1rem #000);top:50%;left:50%;transform:translate(-50%, -50%);width:calc(100% - 4px);height:calc(100% - 4px);border:2px dashed #fff;opacity:0;transition:opacity 0.25s}.splash-art.svelte-iiacim:not(.preview) .zoomist-wrapper.svelte-iiacim:hover::after{opacity:1}.zoomist-image.svelte-iiacim.svelte-iiacim{transform:translate(var(--translate-x, 0px), var(--translate-y, 0px)) scale(var(--scale, 0))}img.svelte-iiacim.svelte-iiacim{width:100%;height:100%;display:block;-o-object-fit:contain;object-fit:contain;-o-object-position:center;object-position:center}.weapon.svelte-iiacim img.svelte-iiacim{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}.weapon.svelte-iiacim img.svelte-iiacim:not(.weaponbg){filter:drop-shadow(0.6rem 0.6rem 0.05rem rgba(0, 0, 0, 0.9))}.weapon.svelte-iiacim img.weaponbg.svelte-iiacim{height:80%}.catalyst.svelte-iiacim img.svelte-iiacim:not(.weaponbg){height:40%}.polearm.svelte-iiacim img.svelte-iiacim:not(.weaponbg){transform:translate(-53%, -35%) scale(1.2) !important}.slider.svelte-iiacim.svelte-iiacim{display:grid;background-color:rgba(255, 255, 255, 0.75);padding:1rem 0;transition:background 0.25s, opacity 0.25s}.slider.svelte-iiacim.svelte-iiacim:hover{background-color:#fff}.zoomSlider.svelte-iiacim.svelte-iiacim{padding:2%;display:flex;justify-self:center}.zoomer.svelte-iiacim.svelte-iiacim{position:absolute;z-index:+20;bottom:50%;right:2%;transform:translateY(50%);display:flex;flex-direction:column}.zoomer.svelte-iiacim button.svelte-iiacim{font-size:calc(0.035 * var(--screen-height));width:calc(0.075 * var(--screen-height));display:inline-flex;justify-content:center;align-items:center;aspect-ratio:1/1;background-color:#fff;color:#000;opacity:0.75;transition:all 0.25s;line-height:0}.zoomer.svelte-iiacim button.svelte-iiacim:hover:not(.zoomer-disabled){opacity:1}.zoomer.svelte-iiacim button.svelte-iiacim:active:not(.zoomer-disabled){opacity:1;transform:scale(0.9)}.zoomer.svelte-iiacim button.zoomer-disabled{opacity:0.6;color:rgba(0, 0, 0, 0.5)}.confirm.svelte-iiacim.svelte-iiacim{position:absolute;z-index:+5;bottom:7.5%;right:5%}.mobile .confirm.svelte-iiacim.svelte-iiacim{transform:scale(0.8)}.uid.svelte-iiacim.svelte-iiacim{left:unset;right:5%;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;font-size:x-large;font-family:var(--gi-font)}.hideInfo.svelte-iiacim .slider.svelte-iiacim,.hideInfo.svelte-iiacim .art-zoomin.svelte-iiacim,.hideInfo.svelte-iiacim .art-zoomout.svelte-iiacim{opacity:0}",
  map: null
};
const SplashArt = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let wrapperHeight;
  let $viewportHeight, $$unsubscribe_viewportHeight;
  let $viewportWidth, $$unsubscribe_viewportWidth;
  let $assets, $$unsubscribe_assets;
  let $t, $$unsubscribe_t;
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$unsubscribe_viewportWidth = subscribe(viewportWidth, (value) => $viewportWidth = value);
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let { character } = $$props;
  let { rarity = 5 } = $$props;
  let { vision } = $$props;
  let { artURL = "" } = $$props;
  let { position = {} } = $$props;
  let { preview = false } = $$props;
  let { onshot = false } = $$props;
  let { isOwned = false } = $$props;
  let { weaponType = "" } = $$props;
  let { localName = "" } = $$props;
  let { hideInfo = false } = $$props;
  let mainArt;
  const { splashArt: artPosition = { scale: 1.5, x: 0, y: 0 } } = position;
  const bg = preview ? $assets["detailbg.webp"] : $assets["splash-background.webp"];
  const calculateWrapperHeight = (vw, vh) => {
    if (vw < vh)
      return "85vw";
    if (vw < vh * 1.5)
      return "65vw";
    return "100%";
  };
  createEventDispatcher();
  getContext("toggleInfoHide");
  getContext("setPosition");
  ({
    initScale: artPosition.scale || 1,
    maxScale: 5,
    bounds: false,
    slider: { el: ".zoomSlider", direction: "vertical" },
    zoomer: {
      inEl: ".art-zoomin",
      outEl: ".art-zoomout",
      resetEl: null,
      disabledClass: "zoomer-disabled"
    }
  });
  if ($$props.character === void 0 && $$bindings.character && character !== void 0)
    $$bindings.character(character);
  if ($$props.rarity === void 0 && $$bindings.rarity && rarity !== void 0)
    $$bindings.rarity(rarity);
  if ($$props.vision === void 0 && $$bindings.vision && vision !== void 0)
    $$bindings.vision(vision);
  if ($$props.artURL === void 0 && $$bindings.artURL && artURL !== void 0)
    $$bindings.artURL(artURL);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.preview === void 0 && $$bindings.preview && preview !== void 0)
    $$bindings.preview(preview);
  if ($$props.onshot === void 0 && $$bindings.onshot && onshot !== void 0)
    $$bindings.onshot(onshot);
  if ($$props.isOwned === void 0 && $$bindings.isOwned && isOwned !== void 0)
    $$bindings.isOwned(isOwned);
  if ($$props.weaponType === void 0 && $$bindings.weaponType && weaponType !== void 0)
    $$bindings.weaponType(weaponType);
  if ($$props.localName === void 0 && $$bindings.localName && localName !== void 0)
    $$bindings.localName(localName);
  if ($$props.hideInfo === void 0 && $$bindings.hideInfo && hideInfo !== void 0)
    $$bindings.hideInfo(hideInfo);
  $$result.css.add(css$8);
  wrapperHeight = calculateWrapperHeight($viewportWidth, $viewportHeight);
  $$unsubscribe_viewportHeight();
  $$unsubscribe_viewportWidth();
  $$unsubscribe_assets();
  $$unsubscribe_t();
  return `<div class="${[
    "splash-art wish-result svelte-iiacim",
    (preview ? "preview" : "") + " " + (hideInfo ? "hideInfo" : "")
  ].join(" ").trim()}" style="${"--bg: url(" + escape(bg, true) + ");"}">${onshot ? `<div class="${"uid svelte-iiacim"}">WishSimulator.App</div>` : ``}

	${preview && !isOwned ? `<div class="${"overlay svelte-iiacim"}"><div class="${"not-owned svelte-iiacim"}"><span>${escape($t("inventory.notOwned"))}</span></div></div>` : ``}

	<button class="${"close svelte-iiacim"}"><i class="${"gi-close"}"></i></button>

	${`${!(preview && !isOwned) ? `<div class="${"zoomer svelte-iiacim"}"><div class="${"slider svelte-iiacim"}"><div class="${"zoomSlider svelte-iiacim"}"></div></div>
				<button class="${"art-zoomin svelte-iiacim"}"><i class="${"gi-zoom-in"}"></i></button>
				<button class="${"art-zoomout svelte-iiacim"}"><i class="${"gi-zoom-out"}"></i></button>
				${preview ? `<button class="${"svelte-iiacim"}"><i class="${"gi-eye" + escape(!hideInfo ? "" : "-slash", true)}"></i></button>` : ``}</div>` : ``}

		${!preview ? `<div class="${"confirm svelte-iiacim"}">${`${validate_component(ButtonModal, "ButtonModal").$$render($$result, { light: true }, {}, {
    default: () => {
      return `${escape($t("customBanner.next"))} \xBB`;
    }
  })}`}</div>` : ``}

		<div class="${"zoomist-container svelte-iiacim"}" style="${"height: " + escape(wrapperHeight, true) + ";"}"${add_attribute("this", mainArt, 0)}><div class="${[
    "zoomist-wrapper " + escape(weaponType, true) + " svelte-iiacim",
    (preview && !isOwned ? "notOwned" : "") + " " + (weaponType ? "weapon" : "")
  ].join(" ").trim()}" style="${"overflow: visible;"}"><div class="${"zoomist-image svelte-iiacim"}">${weaponType ? `<img${add_attribute("src", $assets[`bg-${weaponType}.webp`], 0)}${add_attribute("alt", weaponType, 0)} class="${"weaponbg svelte-iiacim"}">` : ``}

					<img${add_attribute("src", artURL, 0)}${add_attribute("alt", localName || character, 0)} crossorigin="${"anonymous"}" class="${"svelte-iiacim"}"></div>
				<div class="${"dragable svelte-iiacim"}"></div></div>

			${!hideInfo ? `${validate_component(Item_info, "ItemInfo").$$render(
    $$result,
    {
      custom: true,
      staticMode: true,
      itemName: localName || character,
      type: "character",
      rarity,
      vision,
      weaponType
    },
    {},
    {}
  )}` : ``}</div>`}
</div>`;
});
const CustomEditor_svelte_svelte_type_style_lang = "";
const css$7 = {
  code: ".card.svelte-1kja6fh{position:relative}.card.svelte-1kja6fh{width:100%;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;aspect-ratio:1080/533}img.svelte-1kja6fh{width:100%;height:100%;display:block;-o-object-fit:contain;object-fit:contain;-o-object-position:center;object-position:center}.loading.svelte-1kja6fh{position:absolute;top:50%;left:50%;width:100%;height:100%;transform:translate(-50%, -50%);z-index:+20;display:flex;justify-content:center;align-items:center;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);background-color:rgba(0, 0, 0, 0.2)}.loader.svelte-1kja6fh{--text-color:rgba(248, 184, 22, 0.7);aspect-ratio:1/1;display:flex;justify-content:center;align-items:center}",
  map: null
};
const CustomEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let bannerData;
  let $bannerList, $$unsubscribe_bannerList;
  let $activeVersion, $$unsubscribe_activeVersion;
  let $editID, $$unsubscribe_editID;
  let $assets, $$unsubscribe_assets;
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_activeVersion = subscribe(activeVersion, (value) => $activeVersion = value);
  $$unsubscribe_editID = subscribe(editID, (value) => $editID = value);
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  let clientHeight;
  let clientWidth;
  let onBannerEdit = false;
  let isInfoEdit = false;
  let isSplashArtEdit = false;
  let isLoaded = false;
  let isEdited = false;
  let bannerID = $editID;
  let dataToEdit = {};
  let bannerName = "";
  let character = "";
  let charTitle = "";
  let vision = "";
  let watermark = "";
  let rateup = [];
  let imgChanged = {
    artURL: false,
    faceURL: false,
    thumbnail: false
  };
  let artPosition = { banner: {}, splashArt: {}, wishCard: {} };
  let images = {};
  const idb2 = BannerManager;
  const readIDB = async (id) => {
    if (isLoaded)
      return;
    isLoaded = true;
    dataToEdit = await idb2.get(id);
    ({ bannerName = "", character = "", charTitle = "", watermark = "", vision = "pyro", rateup = [], artPosition = {}, images = {}, imgChanged = {} } = dataToEdit);
  };
  const autoSave = async (data2) => {
    if (!isLoaded)
      return;
    if (!isEdited)
      return isEdited = true;
    const editedData = {
      ...dataToEdit,
      isChanged: true,
      itemID: $editID,
      ...data2
    };
    delete editedData.lastModified;
    await idb2.put(editedData);
    const { phase: activeID, patch } = $activeVersion;
    if (!(patch.match("local") && activeID === bannerID))
      return;
    set_store_value(bannerList, $bannerList[0] = { ...editedData, type: "character-event" }, $bannerList);
    return;
  };
  const editSplashArt = (val) => isSplashArtEdit = val;
  setContext("editSplashArt", editSplashArt);
  const setPosition = (type, pos) => artPosition[type] = pos;
  setContext("setPosition", setPosition);
  const editBanner = (val) => onBannerEdit = val;
  setContext("editBanner", editBanner);
  const editInfo = (val) => isInfoEdit = val;
  setContext("editInfo", editInfo);
  const setVision = (vi) => vision = vi;
  setContext("setVision", setVision);
  const setRateup = (chars) => rateup = chars;
  setContext("setRateup", setRateup);
  const setCharName = (name) => character = name;
  setContext("setCharName", setCharName);
  const setCharTitle = (title) => charTitle = title;
  setContext("setCharTitle", setCharTitle);
  const setBannerName = (name) => bannerName = name;
  setContext("setBannerName", setBannerName);
  const setWatermark = (text) => watermark = text;
  setContext("setWatermark", setWatermark);
  const changeArt = (file) => {
    if (!file)
      return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      images.artURL = reader.result;
      imgChanged.artURL = true;
      onBannerEdit = true;
    });
  };
  setContext("changeArt", changeArt);
  const changeFace = (file) => {
    if (!file)
      return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      images.faceURL = reader.result;
      imgChanged.faceURL = true;
    });
  };
  setContext("changeFace", changeFace);
  const changeThumbnail = (file) => {
    if (!file)
      return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      images.thumbnail = reader.result;
      imgChanged.thumbnail = true;
    });
  };
  setContext("changeThumbnail", changeThumbnail);
  $$result.css.add(css$7);
  bannerData = {
    bannerName,
    character,
    charTitle,
    watermark,
    vision,
    rateup,
    artPosition,
    images,
    imgChanged
  };
  {
    autoSave(bannerData);
  }
  $$unsubscribe_bannerList();
  $$unsubscribe_activeVersion();
  $$unsubscribe_editID();
  $$unsubscribe_assets();
  return `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
	<div class="${"loading svelte-1kja6fh"}"><div class="${"loader svelte-1kja6fh"}">${validate_component(Icon$1, "Icon").$$render($$result, { type: "loader", width: "40px" }, {}, {})}</div></div>
`;
    }
    return function() {
      return ``;
    }();
  }(readIDB(bannerID))}

<div class="${["card svelte-1kja6fh", isLoaded ? "isLoaded" : ""].join(" ").trim()}" id="${"cardEditor"}" style="${"--content-width:" + escape(clientWidth, true) + "px; --content-height:" + escape(clientHeight, true) + "px"}"><img${add_attribute("src", $assets[`blank/${vision}`], 0)} alt="${"Background Banner"}" crossorigin="${"anonymous"}" class="${"art-bg svelte-1kja6fh"}">

	${validate_component(Vision_picker, "VisionPicker").$$render($$result, { selected: vision }, {}, {})}
	${validate_component(BannerArt, "MainArt").$$render(
    $$result,
    {
      onBannerEdit,
      artURL: images?.artURL,
      bannerPosition: artPosition?.banner
    },
    {},
    {}
  )}
	${validate_component(Splashart_form, "SplashartForm").$$render($$result, { onBannerEdit }, {}, {})}
	${validate_component(Frame_custom, "FrameCustom").$$render(
    $$result,
    {
      editorMode: true,
      onBannerEdit,
      vision,
      bannerName,
      character,
      charTitle,
      watermark
    },
    {},
    {}
  )}
	${validate_component(Info_face_button, "InfoButton").$$render($$result, { faceURL: images?.faceURL, onBannerEdit }, {}, {})}</div>

${isInfoEdit ? `${validate_component(Info_editor, "InfoEditor").$$render(
    $$result,
    {
      preview: images?.thumbnail,
      rateup,
      bannerName,
      character,
      charTitle,
      watermark
    },
    {},
    {}
  )}` : ``}

${isSplashArtEdit ? `${validate_component(SplashArt, "SplashArtEditor").$$render(
    $$result,
    {
      artURL: images?.artURL,
      position: artPosition,
      character,
      vision
    },
    {},
    {}
  )}` : ``}`;
});
const ModalDelete_svelte_svelte_type_style_lang = "";
const css$6 = {
  code: ".confirmation.svelte-1vkbej6.svelte-1vkbej6{padding:5%;height:100%;align-items:center;justify-content:center;display:flex}.confirmation.svelte-1vkbej6 small.svelte-1vkbej6{display:block}.selectedToDelete.svelte-1vkbej6.svelte-1vkbej6{width:45%;margin-top:3%}.row.loader.svelte-1vkbej6.svelte-1vkbej6{display:flex;justify-content:center;align-items:center;flex-direction:column;height:100%;width:100%;position:absolute;top:0;left:0}",
  map: null
};
const ModalDelete = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_activeVersion;
  let $$unsubscribe_editID;
  let $t, $$unsubscribe_t;
  $$unsubscribe_activeVersion = subscribe(activeVersion, (value) => value);
  $$unsubscribe_editID = subscribe(editID, (value) => value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  let { idToDelete = 0 } = $$props;
  let showDeleteLoader = false;
  createEventDispatcher();
  if ($$props.idToDelete === void 0 && $$bindings.idToDelete && idToDelete !== void 0)
    $$bindings.idToDelete(idToDelete);
  $$result.css.add(css$6);
  $$unsubscribe_activeVersion();
  $$unsubscribe_editID();
  $$unsubscribe_t();
  return `${validate_component(ModalTpl, "ModalTpl").$$render(
    $$result,
    {
      title: "Remove Banner",
      disabled: showDeleteLoader
    },
    {},
    {
      default: () => {
        return `<div class="${"confirmation svelte-1vkbej6"}">${`<div class="${"wrapper"}"><span>${escape($t("customBanner.deletePrompt"))}</span>
				${`<small class="${"svelte-1vkbej6"}">${escape($t("customBanner.userDeleteNote"))}</small>`}

				${``}</div>`}</div>`;
      }
    }
  )}`;
});
const _bannerItem_svelte_svelte_type_style_lang = "";
const css$5 = {
  code: ".modal-content.svelte-1fztub0.svelte-1fztub0{display:flex;justify-content:center;align-items:center;width:100%;height:100%;font-family:var(--genshin-font);padding:3%}.banner-container.svelte-1fztub0.svelte-1fztub0{width:100%;height:100%;display:flex;align-items:center;justify-content:center}.mobile .banner-container.svelte-1fztub0.svelte-1fztub0{align-items:flex-end;padding:0}.banner-item.svelte-1fztub0.svelte-1fztub0{max-width:900px;width:80%;max-height:75vh;aspect-ratio:27/14;perspective:1000px}.editMode.svelte-1fztub0 .banner-item.svelte-1fztub0{aspect-ratio:1080/533;perspective:unset;position:relative}.fullscreen.banner-item.svelte-1fztub0.svelte-1fztub0{perspective:unset}.banner-item.editorOpen.svelte-1fztub0.svelte-1fztub0{z-index:+10}.navigate.svelte-1fztub0.svelte-1fztub0{position:absolute;top:50%;left:50%;width:85%;transform:translate(-50%, -50%);display:flex;justify-content:space-between;transition:all 0.2s;pointer-events:none}@media screen and (max-width: 1200px){.navigate.svelte-1fztub0.svelte-1fztub0{width:90%}}@media screen and (max-width: 800px){.navigate.svelte-1fztub0.svelte-1fztub0{width:95%}}.navigate.svelte-1fztub0 button.svelte-1fztub0{color:#ece5d8;font-size:2rem;line-height:0;pointer-events:initial}.mobile .navigate.svelte-1fztub0.svelte-1fztub0{display:none}",
  map: null
};
const Banner_item = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let landscape;
  let tabletBannerStyle;
  let mobileBannerStyle;
  let style;
  let banner;
  let $bannerList, $$unsubscribe_bannerList;
  let $onWish, $$unsubscribe_onWish;
  let $activeBanner, $$unsubscribe_activeBanner;
  let $viewportWidth, $$unsubscribe_viewportWidth;
  let $viewportHeight, $$unsubscribe_viewportHeight;
  let $mobileMode, $$unsubscribe_mobileMode;
  let $editBanner, $$unsubscribe_editBanner;
  let $$unsubscribe_editID;
  let $isMobile, $$unsubscribe_isMobile;
  let $t, $$unsubscribe_t;
  let $customData, $$unsubscribe_customData;
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_activeBanner = subscribe(activeBanner, (value) => $activeBanner = value);
  $$unsubscribe_viewportWidth = subscribe(viewportWidth, (value) => $viewportWidth = value);
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$unsubscribe_mobileMode = subscribe(mobileMode, (value) => $mobileMode = value);
  $$unsubscribe_editBanner = subscribe(editorMode, (value) => $editBanner = value);
  $$unsubscribe_editID = subscribe(editID, (value) => value);
  $$unsubscribe_isMobile = subscribe(isMobile, (value) => $isMobile = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_customData = subscribe(customData, (value) => $customData = value);
  const navigateBanner = (target) => {
    if (target === "right") {
      if ($activeBanner >= $bannerList.length - 1)
        return;
      playSfx("changebanner");
      return activeBanner.update((n) => n + 1);
    }
    if (target === "left") {
      if ($activeBanner <= 0)
        return;
      playSfx("changebanner");
      return activeBanner.update((n) => n - 1);
    }
  };
  let editor = false;
  const editProb = () => {
    playSfx("bookflip");
    editor = !editor;
  };
  setContext("editprob", editProb);
  let showModalReset = false;
  let ModalDeleteCustom = false;
  setContext("showModalReset", () => {
    showModalReset = true;
  });
  setContext("deleteBanner", () => {
    ModalDeleteCustom = true;
    playSfx();
  });
  const onWish = getContext("onWish");
  $$unsubscribe_onWish = subscribe(onWish, (value) => $onWish = value);
  hotkeys("right,left,up,down", "index", (e) => {
    if ($onWish)
      return;
    e.preventDefault();
    const [to] = hotkeys.getPressedKeyString();
    if (to === "up")
      return navigateBanner("left");
    if (to === "down")
      return navigateBanner("right");
    navigateBanner(to);
  });
  hotkeys("1,2,3,4,5", "index", (e) => {
    if ($onWish)
      return;
    e.preventDefault();
    const to = hotkeys.getPressedKeyString();
    const bannerIndex = parseInt(to) - 1;
    if (to > $bannerList.length)
      return;
    activeBanner.set(bannerIndex);
    playSfx("changebanner");
  });
  $$result.css.add(css$5);
  landscape = $viewportWidth / 2.1 > $viewportHeight;
  tabletBannerStyle = landscape ? "width: 90vh" : "";
  mobileBannerStyle = $mobileMode ? `max-width: ${150 / 100 * $viewportHeight}px;` : tabletBannerStyle;
  style = $viewportHeight > 800 || $viewportHeight > $viewportWidth || $viewportHeight / $viewportWidth > 0.5 ? "align-items:center;" : "";
  banner = $bannerList[$activeBanner]?.type;
  {
    if (banner === "beginner")
      editor = false;
  }
  $$unsubscribe_bannerList();
  $$unsubscribe_onWish();
  $$unsubscribe_activeBanner();
  $$unsubscribe_viewportWidth();
  $$unsubscribe_viewportHeight();
  $$unsubscribe_mobileMode();
  $$unsubscribe_editBanner();
  $$unsubscribe_editID();
  $$unsubscribe_isMobile();
  $$unsubscribe_t();
  $$unsubscribe_customData();
  return `<div class="${["banner-container svelte-1fztub0", $editBanner ? "editMode" : ""].join(" ").trim()}"${add_attribute("style", style, 0)}>${$editBanner ? `<div class="${"banner-item svelte-1fztub0"}"${add_attribute("style", mobileBannerStyle, 0)}>${validate_component(CustomEditor, "CustomEditor").$$render($$result, {}, {}, {})}</div>` : `${each($bannerList, (data2, index) => {
    return `${$activeBanner === index ? `<div class="${[
      "banner-item svelte-1fztub0",
      (editor ? "editorOpen" : "") + " " + ($isMobile && $mobileMode ? "fullscreen" : "")
    ].join(" ").trim()}"${add_attribute("style", mobileBannerStyle, 0)}>${validate_component(BannerCard, "BannerCard").$$render(
      $$result,
      {
        data: data2,
        editor,
        index,
        fullscreenEditor: $isMobile && $mobileMode
      },
      {},
      {}
    )}
				</div>` : ``}`;
  })}

		<div class="${"navigate svelte-1fztub0"}">${$activeBanner > 0 ? `<button class="${"left svelte-1fztub0"}" style="${"margin-right: auto;"}"><i class="${"gi-arrow-left"}"></i></button>` : ``}

			${$activeBanner < $bannerList.length - 1 ? `<button class="${"left svelte-1fztub0"}" style="${"margin-left: auto;"}"><i class="${"gi-arrow-right"}"></i></button>` : ``}</div>`}</div>

${showModalReset ? `${validate_component(ModalTpl, "ModalTpl").$$render($$result, { title: "Back to Default" }, {}, {
    default: () => {
      return `<div class="${"modal-content svelte-1fztub0"}"><p><!-- HTML_TAG_START -->${$t("editor.resetPrompt", {
        values: { banner: $t(`wish.banner.${banner}`) }
      })}<!-- HTML_TAG_END --></p></div>`;
    }
  })}` : ``}

${ModalDeleteCustom ? `${validate_component(ModalDelete, "ModalDelete").$$render($$result, { idToDelete: $customData.itemID }, {}, {})}` : ``}`;
});
const _svgBackground_svelte_svelte_type_style_lang = "";
const css$4 = {
  code: "svg.svelte-1n1ouqa.svelte-1n1ouqa{width:100%}.fil0.svelte-1n1ouqa.svelte-1n1ouqa{fill:#a0907d}.fil1.svelte-1n1ouqa.svelte-1n1ouqa{fill:#d7d0c7}.bg.svelte-1n1ouqa .fil1.svelte-1n1ouqa{fill:#e1ddd4}.filled.svelte-1n1ouqa.svelte-1n1ouqa{fill:#5b9ee2}.full.svelte-1n1ouqa .fil1.svelte-1n1ouqa{fill:#d5d9df}",
  map: null
};
const Svg_background = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fatepoint;
  let $course, $$unsubscribe_course;
  $$unsubscribe_course = subscribe(course, (value) => $course = value);
  let { mode = "" } = $$props;
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  $$result.css.add(css$4);
  fatepoint = $course.point;
  $$unsubscribe_course();
  return `<svg class="${escape(mode, true) + " " + escape(fatepoint > 1 ? "full" : "", true) + " svelte-1n1ouqa"}" xmlns="${"http://www.w3.org/2000/svg"}" xml:space="${"preserve"}" width="${"100%"}" height="${"100%"}" version="${"1.1"}" style="${"shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"}" viewBox="${"0 0 1500001 1500018"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}"><defs></defs><g id="${"Layer_x0020_1"}"><metadata id="${"CorelCorpID_0Corel-Layer"}"></metadata><path class="${escape(fatepoint > 0 ? "filled" : "", true) + " " + escape(mode === "bg" ? "fil1" : "fil0", true) + " svelte-1n1ouqa"}" d="${"M1237835 754784c-41627,24154 -57713,54476 -62457,79583 -33219,176299 -172756,315073 -349462,347141 -25370,4606 -50457,11941 -76748,59882 -22997,-39721 -55914,-55418 -81993,-60308 -179134,-33502 -319645,-176741 -349037,-357292 -3738,-22943 -12543,-47658 -61831,-69006l107099 0c804,211542 172526,382804 384273,382804 211731,0 383470,-171245 384274,-382804l105882 0z"}"></path><path class="${escape(fatepoint === 2 ? "filled" : "", true) + " " + escape(mode === "bg" ? "fil1" : "fil0", true) + " svelte-1n1ouqa"}" d="${"M752463 258628c26291,50936 54372,62469 82613,68209 168468,34335 301555,166006 337946,333729 6484,29871 16476,66296 70689,90940 -2014,1079 -3971,2172 -5876,3278l-105882 0c2,-498 19,-991 19,-1489 0,-212228 -172047,-384292 -384293,-384292 -212228,0 -384292,172047 -384292,384292 0,498 17,991 19,1489l-107099 0c52566,-19719 58058,-48597 61725,-71328 28241,-175111 160956,-315250 332170,-354422 31341,-7175 75987,-11250 102279,-70406l-18 0z"}"></path><path class="${"fil1 svelte-1n1ouqa"}" d="${"M751489 18l60785 226720c6804,25370 40501,32740 68298,39260l-8486 39544 -1293 -691c-55223,2374 -121395,-68493 -112714,-91276l13146 -34495 -24644 -45992 -19719 54213 12845 22996c7600,13606 -8132,48987 -38357,73595 -21508,17504 -51112,28807 -80983,26788l-6307 -41971c27957,-4412 56694,-213 66792,-33768l70637 -234941 0 18zm479803 614060c4411,27957 212,56693 33768,66792l234941 70636 -226721 60786c-25370,6803 -32740,40500 -39260,68298l-39544 -8486 691 -1294c-2374,-55223 68493,-121394 91277,-112713l34494 13145 45993 -24643 -54213 -19719 -22997 12844c-13606,7601 -48986,-8131 -73595,-38356 -17504,-21508 -28807,-51113 -26787,-80983l41970 -6307 -17 0zm-345352 617231c-27957,4412 -56693,213 -66791,33768l-70637 234941 -60786 -226720c-6803,-25371 -40500,-32741 -68298,-39260l8487 -39544 1293 691c55223,-2374 121395,68493 112713,91276l-13145 34495 24644 45992 19718 -54213 -12844 -22996c-7601,-13607 8132,-48987 38356,-73595 21508,-17504 51113,-28808 80983,-26788l6307 41971 0 -18zm-617231 -345351c-4412,-27957 -213,-56693 -33768,-66792l-234941 -70636 226720 -60786c25371,-6803 32741,-40501 39261,-68298l39543 8486 -691 1294c2374,55222 -68492,121394 -91276,112713l-34495 -13146 -45992 24644 54213 19719 22996 -12845c13607,-7600 48987,8132 73595,38357 17504,21508 28808,51112 26788,80983l-41971 6307 18 0z"}"></path><path class="${"fil1 svelte-1n1ouqa"}" d="${"M820743 133283c91099,116664 206594,101800 284937,176298l3207 2534 -9726 50864 -22306 -17716c-61264,-58253 -147261,-57066 -223124,-121501l-32988 -90497 0 0 0 18zm375186 249185c95121,112625 59138,196106 170523,288675l-77794 -19896c-69839,-75951 -50049,-148040 -131847,-242506l-13589 -10789 52707 -15502 0 18zm170807 438293c-116665,91099 -101800,206594 -176299,284937l-2533 3207 -50865 -9727 17717 -22305c58252,-61264 57065,-147261 121501,-223124l90496 -32988 0 0 -17 0zm-249185 375186c-112625,95121 -196106,59138 -288676,170523l19896 -77794c75951,-69839 148040,-50050 242506,-131848l10789 -13588 15502 52707 -17 0zm-438293 170806c-91100,-116664 -206595,-101800 -284938,-176298l-3207 -2534 9727 -50865 22305 17717c61265,58253 147261,57066 223124,121501l32989 90497 0 0 0 -18zm-375187 -249185c-95120,-112625 -59138,-196106 -170523,-288675l77794 19895c69839,75952 50050,148041 131848,242506l13589 10790 -52708 15502 0 -18zm-170806 -438293c116664,-91099 101800,-206594 176299,-284937l2533 -3207 50865 9727 -17717 22305c-58252,61264 -57065,147261 -121501,223124l-90497 32988 0 0 18 0zm249185 -375186c112625,-95121 196106,-59138 288676,-170523l-19896 77794c-75952,69839 -148041,50050 -242506,131847l-10790 13589 -15502 -52707 18 0z"}"></path><path class="${"fil1 svelte-1n1ouqa"}" d="${"M1128694 1220874c26841,2374 67359,15608 98576,36975 -9850,-34495 -10559,-79052 -8539,-110269 -28843,0 -65393,-24449 -114681,-60591 21367,50936 24644,105042 24644,133903l0 -18zm-762845 -948267c-26840,-2375 -67358,-15609 -98575,-36975 9850,34494 10559,79052 8539,110268 28843,0 65393,24449 114680,60591 -21366,-50935 -24644,-105042 -24644,-133902l0 18zm762845 0c26841,-2375 67359,-15609 98576,-36975 -9850,34494 -10559,79052 -8539,110268 -28843,0 -65393,24449 -114681,60591 21367,-50935 24644,-105042 24644,-133902l0 18zm-762845 948267c-26840,2374 -67358,15608 -98575,36975 9850,-34495 10559,-79052 8539,-110269 28843,0 65393,-24449 114680,-60591 -21366,50936 -24644,105042 -24644,133903l0 -18z"}"></path><path class="${"fil1 svelte-1n1ouqa"}" d="${"M738201 377613l-31748 28878c21348,14794 32864,29871 44362,52867 11498,-24644 24644,-39721 44363,-49589l-34371 -32191c21385,602 42326,3029 62664,7087l22465 22464c-73754,65074 -83623,116151 -91825,226225 32864,-294221 335164,-220290 179080,-77351 42715,-116647 -96928,-114999 -175785,110073l-4164 69272c45515,-77935 86316,-197416 152027,-139908 65711,57508 -64081,113369 -139731,150521l66774 -4961c234941,-77227 236730,-207533 110375,-172808 126497,-154437 241213,144887 -75881,174456 90037,-4447 154437,3295 228670,-85944l19878 19878c4004,20020 6395,40625 7051,61672l-28878 -31748c-14794,21348 -29871,32864 -52867,44362 24644,11498 39721,24644 49589,44363l32191 -34371c-602,21385 -3029,42326 -7086,62664l-22465 22465c-65073,-73754 -116151,-83623 -226224,-91825 294221,32864 220289,335164 77351,179080 116646,42715 114999,-96928 -110074,-175785l-69272 -4164c77935,45515 197417,86316 139908,152027 -57508,65711 -113369,-64081 -150521,-139731l4961 66774c77227,234941 207533,236730 172809,110375 154436,126497 -144887,241212 -174457,-75881 4447,90037 -3295,154437 85944,228670l-19878 19878c-20020,4004 -40624,6395 -61672,7051l31748 -28878c-21348,-14794 -32864,-29871 -44362,-52867 -11498,24644 -24644,39721 -44363,49589l34371 32191c-21384,-602 -42325,-3029 -62664,-7086l-22465 -22465c73755,-65073 83623,-116151 91826,-226224 -32865,294221 -335165,220289 -179081,77351 -42715,116646 96928,114999 175785,-110074l4164 -69272c-45514,77935 -86316,197417 -152027,139908 -65711,-57508 64081,-113369 139731,-150521l-66774 4961c-234941,77227 -236730,207533 -110375,172809 -126497,154436 -241212,-144887 75881,-174457 -90036,4447 -154437,-3295 -228669,85944l-19879 -19878c-4004,-20020 -6395,-40624 -7051,-61672l28878 31748c14794,-21348 29871,-32864 52867,-44362 -24644,-11498 -39721,-24644 -49589,-44363l-32191 34371c602,-21384 3029,-42325 7086,-62664l22465 -22465c65074,73755 116151,83623 226225,91826 -294221,-32865 -220290,-335165 -77352,-179081 -116646,-42715 -114999,96928 110074,175785l69272 4164c-77935,-45514 -197417,-86316 -139908,-152027 57508,-65711 113369,64081 150521,139731l-4961 -66774c-77227,-234941 -207533,-236730 -172808,-110375 -154437,-126497 144887,-241212 174456,75881 -4447,-90036 3295,-154436 -85944,-228669l19878 -19878c20020,-4004 40625,-6396 61672,-7052z"}"></path></g></svg>`;
});
const EpitomizedPath_svelte_svelte_type_style_lang = "";
const css$3 = {
  code: ".modal.svelte-mpifkm.svelte-mpifkm{position:fixed;top:0;left:0;width:100vw;background-color:rgba(0, 0, 0, 0.7);z-index:10;display:flex;justify-content:center;align-items:center;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px)}.modal-content.svelte-mpifkm.svelte-mpifkm{width:1000px;max-width:90%;min-width:250px;text-align:center;position:relative;border-radius:1.2rem;overflow:hidden}.mobile .modal-content.svelte-mpifkm.svelte-mpifkm{max-width:140vh;border-radius:0.8rem}.modal-content.svelte-mpifkm img.svelte-mpifkm{position:relative;width:100%}.close-modal.svelte-mpifkm.svelte-mpifkm{position:absolute;top:1.5rem;right:-0.2rem;z-index:+10}.gi-close.svelte-mpifkm.svelte-mpifkm{font-size:1.3rem;background-color:transparent;color:#383b40}.container.svelte-mpifkm.svelte-mpifkm{width:100%;height:100%;display:flex;position:absolute;top:0;left:0}.container.svelte-mpifkm h1.svelte-mpifkm{text-align:left;padding-left:10%;padding-top:5%;font-size:calc(3 / 100 * var(--modal-width));color:#7c613f}.container.svelte-mpifkm>div.svelte-mpifkm{flex-basis:50%;flex-grow:1;padding:3% 7%}.description.svelte-mpifkm.svelte-mpifkm{padding-right:5.5% !important;font-size:calc(2 / 100 * var(--modal-width))}.container.svelte-mpifkm .content.svelte-mpifkm{width:100%;height:82%;overflow:hidden;margin:8% 0 0;text-align:left;color:#aa8e77}.weapon-selector.svelte-mpifkm.svelte-mpifkm{display:flex;flex-direction:column;height:100%;color:#383b40}.weapon-selector.svelte-mpifkm.svelte-mpifkm,.weapon-selector.svelte-mpifkm>div.svelte-mpifkm{position:relative;padding:5%}.weapon-selector.svelte-mpifkm .bg.svelte-mpifkm{position:absolute;width:90%;top:50%;left:50%;transform:translate(-50%, -50%)}.counter.weapon-selector.svelte-mpifkm .bg.svelte-mpifkm{width:110%;top:48%}.top.svelte-mpifkm.svelte-mpifkm{font-size:calc(3 / 100 * var(--modal-width));white-space:nowrap}.weapon-item.svelte-mpifkm.svelte-mpifkm{display:flex;flex-direction:column;height:100%;border:solid #dcd8cd;border-width:3px 0;font-size:x-large;padding-left:0 !important;padding-right:0 !important}.counter.svelte-mpifkm .weapon-item.svelte-mpifkm{border:0}.weapon-list.svelte-mpifkm.svelte-mpifkm{height:100%;width:100%;padding:0 10%;background-color:#dcd8cd;display:flex;justify-content:center;align-items:center;overflow:hidden;text-align:center;color:#3a4156;line-height:1.2rem}.counter.svelte-mpifkm .weapon-list.svelte-mpifkm{background-color:transparent}.weapon-content.svelte-mpifkm.svelte-mpifkm{display:inline-block;padding:5%;width:50%}.weapon-content.svelte-mpifkm button.svelte-mpifkm{font-size:small;aspect-ratio:8.75 / 10;position:relative;vertical-align:middle;width:100%}.mobile .weapon-content.svelte-mpifkm button.svelte-mpifkm{font-size:xx-small}.weapon-content.active.svelte-mpifkm button.svelte-mpifkm::after,.weapon-content.active.svelte-mpifkm button.svelte-mpifkm::before{position:absolute;right:0;top:0}.weapon-content.active.svelte-mpifkm button.svelte-mpifkm::after{display:block;content:'';width:100%;height:calc(100% - 0.4rem);border:solid #bed634;border-width:0.2rem 0;border-radius:0.3rem}.weapon-content.active.svelte-mpifkm button.svelte-mpifkm::before{content:'\u2714';font-size:1.2rem;color:#759a28;display:flex;justify-content:center;align-items:center;background-color:#bed634;width:20%;height:20%;z-index:+1;border-top-right-radius:0.5em}.text.svelte-mpifkm.svelte-mpifkm{margin-top:auto;height:40%;display:flex;justify-content:center;align-items:center}span.svelte-mpifkm.svelte-mpifkm,p.svelte-mpifkm span,.text.svelte-mpifkm span{color:#f0b164}.counter.svelte-mpifkm .text.svelte-mpifkm{height:unset;margin-bottom:-1rem}button.svelte-mpifkm i.svelte-mpifkm{width:2rem;height:2rem;background-color:#353533;border-radius:100%;display:inline-flex;justify-content:center;align-items:center;font-size:1rem;margin-right:2rem}@media screen and (max-width: 800px) and (min-width: 500px){.weapon-item.svelte-mpifkm.svelte-mpifkm{font-size:medium}}.mobile .text.svelte-mpifkm.svelte-mpifkm{height:30%}.mobile .counter.svelte-mpifkm .text.svelte-mpifkm{height:unset;margin-bottom:-1rem}.mobile .weapon-item.svelte-mpifkm.svelte-mpifkm{font-size:small}",
  map: null
};
const EpitomizedPath = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let half;
  let defaultItemWidth;
  let $activeVersion, $$unsubscribe_activeVersion;
  let $viewportHeight, $$unsubscribe_viewportHeight;
  let $activeBanner, $$unsubscribe_activeBanner;
  let $bannerList, $$unsubscribe_bannerList;
  let $viewportWidth, $$unsubscribe_viewportWidth;
  let $t, $$unsubscribe_t;
  let $assets, $$unsubscribe_assets;
  let $json, $$unsubscribe_json;
  let $$unsubscribe_course;
  $$unsubscribe_activeVersion = subscribe(activeVersion, (value) => $activeVersion = value);
  $$unsubscribe_viewportHeight = subscribe(viewportHeight, (value) => $viewportHeight = value);
  $$unsubscribe_activeBanner = subscribe(activeBanner, (value) => $activeBanner = value);
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_viewportWidth = subscribe(viewportWidth, (value) => $viewportWidth = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  $$unsubscribe_json = subscribe(oe, (value) => $json = value);
  $$unsubscribe_course = subscribe(course, (value) => value);
  const weapons = $bannerList[$activeBanner].featured.map(({ name }) => getWpDetails(name));
  let itemWidth;
  let clientWidth;
  let content;
  let targetActive = null;
  const handleClose = getContext("handleEpitomizedModal");
  const closePath = () => {
    handleClose();
    playSfx("close");
    playSfx("bookflip");
  };
  const setCourse = () => {
    if (targetActive === null)
      return;
    playSfx("click");
    const { patch, phase } = $activeVersion;
    const localFate = fatepointManager.init({ version: patch, phase });
    localFate.set(0, targetActive);
    course.set({ selected: targetActive, point: 0 });
    handleClose();
  };
  hotkeys("left,right", "epipath", (e) => {
    e.preventDefault();
    playSfx("click2");
    const [key] = hotkeys.getPressedKeyString();
    const to = key.toLocaleLowerCase();
    if (to === "left") {
      targetActive = targetActive <= 0 ? 1 : targetActive - 1;
    }
    if (to === "right") {
      targetActive = targetActive >= 1 ? 0 : targetActive + 1;
    }
  });
  hotkeys("enter", "epipath", (e) => {
    e.preventDefault();
    if (targetActive === null)
      return;
    setCourse();
  });
  hotkeys("esc,e", "epipath", (e) => {
    e.preventDefault();
    closePath();
  });
  hotkeys.setScope("epipath");
  onDestroy(() => hotkeys.deleteScope("epipath", "index"));
  $$result.css.add(css$3);
  half = $viewportWidth < 500;
  defaultItemWidth = 16.5 / 100 * $viewportHeight;
  {
    if (itemWidth < 150)
      itemWidth = 150;
    else
      itemWidth = defaultItemWidth;
  }
  $$unsubscribe_activeVersion();
  $$unsubscribe_viewportHeight();
  $$unsubscribe_activeBanner();
  $$unsubscribe_bannerList();
  $$unsubscribe_viewportWidth();
  $$unsubscribe_t();
  $$unsubscribe_assets();
  $$unsubscribe_json();
  $$unsubscribe_course();
  return `${``}

<section class="${"modal svelte-mpifkm"}" style="${"height:" + escape($viewportHeight, true) + "px"}"><div class="${"modal-content svelte-mpifkm"}" style="${"--modal-width: " + escape(clientWidth, true) + "px"}"><img${add_attribute("src", $assets[`fatepointbook${half ? "-half" : ""}.webp`], 0)} alt="${"Fatepoint Background"}" class="${"svelte-mpifkm"}">
		<button class="${"close-modal svelte-mpifkm"}"><i class="${"gi-close svelte-mpifkm"}"></i></button>
		<div class="${"container svelte-mpifkm"}">${!half ? `<div class="${"description svelte-mpifkm"}"><h1 class="${"svelte-mpifkm"}">${escape($t("wish.epitomizedPath.text"))}</h1>
					<div class="${"content svelte-mpifkm"}"${add_attribute("this", content, 0)}>${each($json("wish.epitomizedPath.description"), (desc) => {
    return `<p class="${"svelte-mpifkm"}">\xB7 <!-- HTML_TAG_START -->${desc}<!-- HTML_TAG_END -->
							</p>`;
  })}</div></div>` : ``}
			<div class="${["weapon-selector svelte-mpifkm", ""].join(" ").trim()}"><div class="${"bg svelte-mpifkm"}">${validate_component(Svg_background, "FatepointSVG").$$render($$result, { mode: "bg" }, {}, {})}</div>
				<div class="${"top svelte-mpifkm"}">${escape($t("wish.epitomizedPath.selectWeapon"))}</div>
				<div class="${"weapon-item svelte-mpifkm"}"><div class="${"weapon-list svelte-mpifkm"}" style="${"--item-width: " + escape(itemWidth, true) + "px"}">${`${each(weapons, ({ name, weaponType }, i) => {
    return `<div class="${["weapon-content svelte-mpifkm", targetActive === i ? "active" : ""].join(" ").trim()}"><button class="${"svelte-mpifkm"}">${validate_component(Inventory_item, "InventoryItem").$$render(
      $$result,
      {
        itemdata: {
          name,
          weaponType,
          type: "weapon",
          rarity: 5
        }
      },
      {},
      {}
    )}</button>
								</div>`;
  })}`}</div>
					<div class="${"text svelte-mpifkm"}"><div>${`${targetActive === null ? `${escape($t("wish.epitomizedPath.selectWeapon"))}` : `<!-- HTML_TAG_START -->${$t("wish.epitomizedPath.chartCourseOf", {
    values: {
      target: `<span> ${$t(weapons[targetActive].name)} </span>`
    }
  })}<!-- HTML_TAG_END -->`}`}</div></div></div>
				<div class="${"button svelte-mpifkm"}">${`${validate_component(ButtonModal, "ButtonModal").$$render($$result, { disabled: targetActive === null }, {}, {
    default: () => {
      return `${escape($t("wish.epitomizedPath.chartCourse"))}`;
    }
  })}`}</div></div></div></div>
</section>`;
});
const _meteor_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".meteor-wrapper.svelte-n0dhm5{width:100vw;height:var(--screen-height);position:absolute;top:0;left:0}.meteor-wrapper.show.svelte-n0dhm5{display:block;background-color:#fff}.video.svelte-n0dhm5{position:relative;width:100vw;height:100%}.skip.svelte-n0dhm5{position:absolute;top:30px;right:2%;color:#fff;font-size:1.2rem;z-index:10}.gi-caret-up.svelte-n0dhm5{display:inline-block;transform:rotate(90deg) translateX(-0.1rem);vertical-align:middle;margin-left:-0.5em}.mobile .skip.svelte-n0dhm5{font-size:0.8rem;top:0.3rem;right:6%}video.svelte-n0dhm5{display:none;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);width:105%;height:105%;-o-object-fit:cover;object-fit:cover}",
  map: null
};
const Meteor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  let $assets, $$unsubscribe_assets;
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  let { rarity = 3 } = $$props;
  let { show = false } = $$props;
  let { isSingle = false } = $$props;
  let v3star;
  let v4starSingle;
  let v4star;
  let v5starSingle;
  let v5star;
  let showSkipButton = false;
  const showSplashArt = getContext("showSplashArt");
  const meteorEnd = ({ skip: skip2 = false } = {}) => {
    showSplashArt({ skip: skip2 });
    showSkipButton = false;
  };
  const skip = () => {
    playSfx();
    const videoDOMS = [v3star, v4starSingle, v4star, v5starSingle, v5star];
    meteorEnd({ skip: true });
    videoDOMS.forEach((video) => {
      video.load();
      video.style.display = "none";
    });
  };
  const showVideoHandle = async (rarity2, single = true) => {
    const muted = localConfig.get("muted");
    let videoContent = v3star;
    if (single && rarity2 !== 3) {
      videoContent = rarity2 === 5 ? v5starSingle : v4starSingle;
    }
    if (!single && rarity2 !== 3) {
      videoContent = rarity2 === 5 ? v5star : v4star;
    }
    if (!videoContent || videoContent.error || isNaN(videoContent.duration)) {
      const message = $t("wish.result.meteorFailed");
      pushToast({ message });
      console.error("Can't play Meteor Animation because it cannot be loaded", videoContent.error);
      return meteorEnd();
    }
    videoContent.style.display = "unset";
    videoContent.muted = !!muted;
    await videoContent.play();
    return;
  };
  hotkeys("esc", "index", (e) => {
    if (!show)
      return;
    e.preventDefault();
    skip();
  });
  hotkeys("enter", "index", (e) => {
    if (!show)
      return;
    e.preventDefault();
    if (showSkipButton)
      return skip();
    showSkipButton = true;
  });
  if ($$props.rarity === void 0 && $$bindings.rarity && rarity !== void 0)
    $$bindings.rarity(rarity);
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.isSingle === void 0 && $$bindings.isSingle && isSingle !== void 0)
    $$bindings.isSingle(isSingle);
  $$result.css.add(css$2);
  {
    if (show)
      showVideoHandle(rarity, isSingle);
  }
  $$unsubscribe_t();
  $$unsubscribe_assets();
  return `<div class="${["meteor-wrapper svelte-n0dhm5", show ? "show" : ""].join(" ").trim()}"><div class="${"video svelte-n0dhm5"}"><video${add_attribute("src", $assets["3star-single.mp4"], 0)} type="${"video/mp4"}" class="${"svelte-n0dhm5"}"${add_attribute("this", v3star, 0)}><track kind="${"captions"}"></video>

		<video${add_attribute("src", $assets["4star-single.mp4"], 0)} type="${"video/mp4"}" class="${"svelte-n0dhm5"}"${add_attribute("this", v4starSingle, 0)}><track kind="${"captions"}"></video>

		<video${add_attribute("src", $assets["4star-multi.mp4"], 0)} type="${"video/mp4"}" class="${"svelte-n0dhm5"}"${add_attribute("this", v4star, 0)}><track kind="${"captions"}"></video>

		<video${add_attribute("src", $assets["5star-single.mp4"], 0)} type="${"video/mp4"}" class="${"svelte-n0dhm5"}"${add_attribute("this", v5starSingle, 0)}><track kind="${"captions"}"></video>

		<video${add_attribute("src", $assets["5star-multi.mp4"], 0)} type="${"video/mp4"}" class="${"svelte-n0dhm5"}"${add_attribute("this", v5star, 0)}><track kind="${"captions"}"></video>

		${showSkipButton ? `<button class="${"skip svelte-n0dhm5"}">${escape($t("wish.result.skip"))} <i class="${"gi-caret-up svelte-n0dhm5"}"></i></button>` : ``}</div>
</div>`;
});
const index_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "section.svelte-lltch{width:100%;height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;overflow:hidden;background-repeat:no-repeat;background-position:center;background-size:cover;background-position:20%}.overlay.svelte-lltch{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:block;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.08);box-shadow:0 0 50vh rgba(0, 0, 0, 0.4) inset}.wish-container.svelte-lltch{position:fixed;width:100%;height:100%;z-index:15;top:0;left:0;pointer-events:none}.wish-container.show.svelte-lltch{pointer-events:unset}.top.svelte-lltch,.banner.svelte-lltch,.button.svelte-lltch,.item.svelte-lltch{display:block;width:100%}.top.svelte-lltch{min-height:70px}.banner.svelte-lltch,.item.svelte-lltch{height:100%}.item.svelte-lltch{position:relative}.banner.svelte-lltch{display:flex;justify-content:center;flex-direction:column}.button.svelte-lltch{height:120px}.mobile section.svelte-lltch{flex-direction:row}.mobile .top.svelte-lltch{height:100%;width:-webkit-min-content;width:-moz-min-content;width:min-content}.mobile .banner.svelte-lltch{width:120%;margin-left:-20px}.mobile .button.svelte-lltch{height:50px;margin-bottom:0.2rem}",
  map: null
};
const Wish = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let nowBanner;
  let bannerType;
  let isEvent;
  let currencyUsed;
  let isUnlimited;
  let $bannerList, $$unsubscribe_bannerList;
  let $$unsubscribe_customData;
  let $wishAmount, $$unsubscribe_wishAmount;
  let $acquaint, $$unsubscribe_acquaint;
  let $intertwined, $$unsubscribe_intertwined;
  let $activeBanner, $$unsubscribe_activeBanner;
  let $t, $$unsubscribe_t;
  let $assets, $$unsubscribe_assets;
  $$unsubscribe_bannerList = subscribe(bannerList, (value) => $bannerList = value);
  $$unsubscribe_customData = subscribe(customData, (value) => value);
  $$unsubscribe_wishAmount = subscribe(wishAmount, (value) => $wishAmount = value);
  $$unsubscribe_acquaint = subscribe(acquaint, (value) => $acquaint = value);
  $$unsubscribe_intertwined = subscribe(intertwined, (value) => $intertwined = value);
  $$unsubscribe_activeBanner = subscribe(activeBanner, (value) => $activeBanner = value);
  $$unsubscribe_t = subscribe(Y, (value) => $t = value);
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  let rollCount = 0;
  let result = [];
  let WishInstance;
  let type;
  const getIndexOfCharBanner = () => {
    const events = $bannerList.filter(({ type: type2 }) => type2 === "character-event");
    const index = events.findIndex(({ character }) => character === nowBanner.character);
    return index;
  };
  let openEpitomized = false;
  const handleEpitomizedModal = () => openEpitomized = !openEpitomized;
  setContext("handleEpitomizedModal", handleEpitomizedModal);
  let multi = false;
  let rollCost;
  let showConvertModal = false;
  let onWish = getContext("onWish");
  const doRoll = async (count, bannerToRoll) => {
    rollCount = count;
    multi = count > 1;
    const tmp = [];
    rollCost = bannerToRoll === "beginner" ? 8 : count;
    if (!isUnlimited && rollCost > currencyUsed)
      return showConvertModal = true;
    const indexOfCharBanner = bannerToRoll === "character-event" ? getIndexOfCharBanner() : 0;
    onWish.set(true);
    for (let i = 0; i < count; i++) {
      const result2 = await roll(bannerToRoll, WishInstance, indexOfCharBanner);
      tmp.push(result2);
    }
    result = tmp;
    handleMeteorAnimation();
    if (isUnlimited)
      return;
    updateMilestones();
    updateFatesBalance(bannerToRoll);
  };
  setContext("doRoll", doRoll);
  const updateFatesBalance = (banner) => {
    const isAcquaint = ["beginner", "standard", "member"].includes(banner);
    const funds = isAcquaint ? acquaint : intertwined;
    funds.update((n) => {
      const afterUpdate = n - (banner === "beginner" && rollCount > 1 ? 8 : rollCount);
      localBalance.set(isAcquaint ? "acquaint" : "intertwined", afterUpdate);
      return afterUpdate;
    });
  };
  const updateMilestones = () => {
    const update = (type2) => {
      const qty = result.reduce(
        (prev, { bonusQty, bonusType }) => {
          return prev + (bonusType === type2 ? bonusQty : 0);
        },
        0
      );
      const milestone = type2 === "stardust" ? stardust : starglitter;
      milestone.update((n) => {
        const afterUpdate = n + qty;
        localBalance.set(type2, afterUpdate);
        return afterUpdate;
      });
    };
    update("starglitter");
    update("stardust");
  };
  let skipSplashArt = false;
  let showWishResult = false;
  let showMeteor = false;
  let single = true;
  let meteorStar = 3;
  const closeResult = () => {
    showWishResult = false;
    onWish.set(false);
    checkObtained();
  };
  setContext("closeResult", closeResult);
  const showSplashArt = ({ skip = false } = {}) => {
    skipSplashArt = skip;
    showMeteor = false;
    showWishResult = true;
  };
  setContext("showSplashArt", showSplashArt);
  const handleMeteorAnimation = () => {
    const autoSkip = localConfig.get("autoskip");
    if (autoSkip)
      return showSplashArt({ skip: true });
    if (bannerType === "member") {
      meteorStar = Math.floor(Math.random() * 3) + 3;
    } else {
      const stars = result.map(({ rarity }) => rarity);
      single = stars.length === 1;
      meteorStar = 3;
      if (stars.includes(4))
        meteorStar = 4;
      if (stars.includes(5))
        meteorStar = 5;
    }
    showMeteor = true;
  };
  const closeModal = () => {
    playSfx("close");
    showConvertModal = false;
  };
  setContext("closeModal", closeModal);
  const reroll = (amount) => {
    playSfx();
    const multiAmount = bannerType === "beginner" ? 10 : amount;
    doRoll(multi ? multiAmount : 1, bannerType);
    showConvertModal = false;
  };
  setContext("reroll", reroll);
  const countMilestone = (masterless) => {
    return result.reduce(
      (a, { bonusType, bonusQty }) => {
        return a + (bonusType === masterless ? bonusQty : 0);
      },
      0
    );
  };
  const showObtained = getContext("openObtained");
  const checkObtained = () => {
    const stardustQty = countMilestone("stardust");
    const starglitterQty = countMilestone("starglitter");
    const obtainedItems = [
      { item: "stardust", qty: stardustQty },
      { item: "starglitter", qty: starglitterQty }
    ];
    if (!stardustQty && !starglitterQty)
      return;
    showObtained(obtainedItems);
  };
  $$result.css.add(css$1);
  nowBanner = $bannerList[$activeBanner] || {};
  ({ type } = nowBanner);
  bannerType = type || "";
  isEvent = bannerType.match("event");
  currencyUsed = isEvent ? $intertwined : $acquaint;
  isUnlimited = $wishAmount === "unlimited";
  $$unsubscribe_bannerList();
  $$unsubscribe_customData();
  $$unsubscribe_wishAmount();
  $$unsubscribe_acquaint();
  $$unsubscribe_intertwined();
  $$unsubscribe_activeBanner();
  $$unsubscribe_t();
  $$unsubscribe_assets();
  return `${$$result.head += `${$$result.title = `<title>${escape($t("title", { default: APP_TITLE }))}</title>`, ""}`, ""}

<div class="${"overlay svelte-lltch"}"></div>

<div class="${["wish-container svelte-lltch", showMeteor || showWishResult ? "show" : ""].join(" ").trim()}">${validate_component(Meteor, "Meteor").$$render(
    $$result,
    {
      show: showMeteor,
      isSingle: single,
      rarity: meteorStar
    },
    {},
    {}
  )}
	${showWishResult ? `${validate_component(WishResult, "WishResult").$$render(
    $$result,
    {
      list: result,
      skip: skipSplashArt,
      bannerType
    },
    {},
    {}
  )}` : ``}</div>

<section style="${"background-image: url('" + escape($assets["wish-background.webp"], true) + "');"}" class="${"svelte-lltch"}"><div class="${"col top svelte-lltch"}">${validate_component(Header, "Header").$$render($$result, { bannerType }, {}, {})}</div>

	<div class="${"col banner svelte-lltch"}"><div class="${"item svelte-lltch"}">${validate_component(Banner_item, "BannerItem").$$render($$result, {}, {}, {})}</div>

		<div class="${"col button svelte-lltch"}">${validate_component(Footer, "Footer").$$render($$result, { bannerType }, {}, {})}</div></div></section>

${openEpitomized ? `${validate_component(EpitomizedPath, "EpitomizedModal").$$render($$result, {}, {}, {})}` : ``}

${showConvertModal ? `${validate_component(Out_of_primogem, "OutOfPrimogem").$$render($$result, { isEventBanner: isEvent, rollCost }, {}, {})}` : ``}`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "video.svelte-1r57nh7{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-o-object-position:20%;object-position:20%}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  let $onWish, $$unsubscribe_onWish;
  let $assets, $$unsubscribe_assets;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_assets = subscribe(assets, (value) => $assets = value);
  let pageActive = "index";
  let showWelcomeModal = true;
  let appReady = writable(false);
  let onWish = writable(false);
  $$unsubscribe_onWish = subscribe(onWish, (value) => $onWish = value);
  setContext("onWish", onWish);
  setContext("appReady", appReady);
  setContext("query", writable(""));
  setContext("readyToPull", writable(true));
  let animatedBG = localConfig.get("animatedBG");
  const animatebg = () => animatedBG = localConfig.get("animatedBG");
  setContext("animateBG", animatebg);
  let showWelkinScreen = false;
  const welkinCheckin = () => {
    const { remaining, diff, latestCheckIn } = dailyWelkin.getData();
    showWelkinScreen = remaining > 0 && remaining - diff >= 0 && diff > 0;
    if (latestCheckIn)
      return dailyWelkin.checkin();
  };
  setContext("closeWelkin", () => showWelkinScreen = false);
  const startApp = () => {
    appReady.set(true);
    hotkeys.setScope("index");
    showWelcomeModal = false;
    welkinCheckin();
    playSfx();
  };
  setContext("startApp", startApp);
  let showMenu = false;
  const handleMenu = (act) => {
    showMenu = !showMenu;
    if (act === "mute")
      return;
    playSfx(!showMenu ? "close" : "click");
  };
  setContext("handleMenu", handleMenu);
  const navigate = (page2) => {
    let beforeNavigate = pageActive;
    pageActive = page2;
    showMenu = false;
    hotkeys.setScope(page2);
    if (beforeNavigate === pageActive)
      return;
    hotkeys.deleteScope(beforeNavigate);
    if (beforeNavigate !== "index")
      return browserState.back();
    browserState.set(page2);
  };
  setContext("navigate", navigate);
  getContext("bannerLoaded");
  let showObtained = false;
  let obtainedData = {};
  const openObtained = (data2) => {
    obtainedData = data2;
    showObtained = true;
  };
  const closeObtained = () => {
    showObtained = false;
    obtainedData = {};
    playSfx("close");
  };
  setContext("openObtained", openObtained);
  setContext("closeObtained", closeObtained);
  let showConvertModal = false;
  setContext("openConvertModal", () => showConvertModal = true);
  setContext("closeConvertModal", () => showConvertModal = false);
  let showChat = false;
  const chatToggle = () => {
    showChat = !showChat;
    playSfx(showChat ? "shopnav" : "close");
  };
  setContext("chatToggle", chatToggle);
  $$result.css.add(css);
  {
    if (!showWelcomeModal) {
      if (pageActive !== "index" || $onWish)
        pauseSfx("wishBacksound");
      else
        playSfx("wishBacksound");
    }
  }
  {
    hotkeys("o", pageActive, chatToggle);
  }
  $$unsubscribe_page();
  $$unsubscribe_onWish();
  $$unsubscribe_assets();
  return `${`error bos`}

${animatedBG && pageActive.match(/(index|detail|history)/) && !$onWish ? `<video muted loop autoplay type="${"video/webm"}"${add_attribute("src", $assets["bg.webm"], 0)}${add_attribute("poster", $assets["wish-background.webp"], 0)} class="${"svelte-1r57nh7"}"><track kind="${"captions"}"></video>` : ``}


${pageActive === "index" ? `${validate_component(Wish, "MainWish").$$render($$result, {}, {}, {})}

	${showMenu ? `${validate_component(missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : ``}

	` : `${pageActive === "allbanners" ? `${validate_component(missing_component, "svelte:component").$$render($$result, {}, {}, {})}

	` : `${pageActive === "details" ? `${validate_component(missing_component, "svelte:component").$$render($$result, { page: "details" }, {}, {})}

	` : `${pageActive === "history" ? `${validate_component(missing_component, "svelte:component").$$render($$result, { page: "history" }, {}, {})}

	` : `${pageActive === "inventory" ? `${validate_component(missing_component, "svelte:component").$$render($$result, {}, {}, {})}

	` : `${pageActive === "shop" ? `${validate_component(missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : ``}`}`}`}`}`}

${showObtained ? `${validate_component(missing_component, "svelte:component").$$render($$result, { data: obtainedData }, {}, {})}` : ``}


${showConvertModal ? `${validate_component(missing_component, "svelte:component").$$render($$result, {}, {}, {})}` : ``}



${showWelkinScreen ? `${validate_component(WelkinCheckin, "WelkinCheckin").$$render($$result, {}, {}, {})}` : ``}



${validate_component(PreloadMeteor, "PreloadMeteor").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

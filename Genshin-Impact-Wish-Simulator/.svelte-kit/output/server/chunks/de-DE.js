const title = "Genshin Impact Gebets-Simulator";
const character = "Charakter";
const weapon = "Waffe";
const vision = "G\xF6ttliches Auge";
const anemo = "Anemo";
const cryo = "Kryo";
const dendro = "Dendro";
const electro = "Elektro";
const hydro = "Hydro";
const geo = "Geo";
const pyro = "Pyro";
const bow = "Bogen";
const catalyst = "Katalysator";
const claymore = "Zweih\xE4nder";
const sword = "Schwert";
const polearm = "Stangenwaffe";
const extra = "Extra";
const obtained = "Erhalten";
const waiting = "Warten";
const connectionFailed = "Verbindung fehlgeschlagen!";
const confirmButton = "Best\xE4tigen";
const cancelButton = "Abbrechen";
const disclaimer = "Alle Medien, die auf dieser Seite benutzt wurden, geh\xF6ren miHoYo.";
const fanmade = "Dies ist eine reine Fananwendung, viel Spa\xDF damit!";
const pressToContinue = "Klicke in den leeren Bereich um fortzufahren!";
const installInstruction = "Anleitung zum Installieren auf dem Startbildschirm/Desktop";
const share = "Teilen";
const screenshot = "Foto machen";
const capturing = "Erfassen";
const rewardFirstShare = "Belohnung f\xFCr erstes Mal teilen: {qty}";
const version = "Version";
const donate = "Spenden";
const banner = {
  beginner: "Anf\xE4ngergebet",
  wanderlust: "Wanderlust",
  "epitome-invocation": "G\xF6ttliches Werk",
  "adrift-in-the-harbor": "Fl\xFCchtige Bekanntschaft",
  "auric-blaze": "Sengende Sonne und gl\xFChendes Gold",
  "azure-excursion": "Fluss der blassen Bl\xE4tter",
  "ballad-in-goblets": "Balladen in Bechern",
  "born-of-ocean-swell": "Stunde der Wogen",
  "caution-in-confidence": "Verhaltene Zuversicht",
  "chanson-of-many-waters": "Chanson der Str\xF6me",
  "conjuring-chiaroscuro": "Conjuring Chiaroscuro",
  "dance-of-lantern": "Tanz der Laternen",
  "decree-of-the-deeps": "Gebot \xFCber die Meerestiefen",
  "discerner-of-enigmas": "L\xFCftung himmlischer Geheimnisse",
  "drifting-luminescence": "Treibende Perle",
  "everbloom-violet": "Violette Bl\xFCtenwolken",
  "farewell-of-snezhnaya": "Lebe wohl, winterliche Stadt",
  "from-ashes-reborn": "Aus der Glut wiedergeboren",
  "gentry-of-hermitage": "Abgeschiedener Adel",
  "immaculate-pulse": "Pulsierendes Leben",
  "in-the-name-of-the-rosula": "Im Namen der Rosula",
  "invitation-to-mundane-life": "Bombastische Einladung",
  "leaves-in-the-wind": "Bl\xE4tter im Wind",
  "moment-of-bloom": "Augenblick des Erbl\xFChens",
  "oni_s-royale": "Onibankett",
  "reign-of-serenity": "Im Schatten der Welt",
  "secretum-secretorum": "R\xE4tselhafte Worte",
  "sparkling-steps": "Flammende Schritte",
  "tapestry-of-golden-flames": "Flammengalaxie",
  "tempestuous-destiny": "St\xFCrmisches Schicksal",
  "the-heron_s-court": "Kranichhof",
  "the-moongrass-enlightenment": "Erleuchtung des Mondgrases",
  "the-transcendent-one-returns": "R\xFCckkehr aus der Abgeschiedenheit",
  "twilight-arbiter": "Schiedsspruch der D\xE4mmerung",
  "twirling-lotus": "Wirbelnder Lotos",
  "viridescent-vigil": "Wachgang im Dickicht"
};
const editor = {
  bannerConfig: "{banner} Configuration",
  baseRate: "{rarity}-Star Base Rate:",
  maxPity: "{rarity}-Star Max Pity:",
  hardPity: "Boost {rarity}-Star rate starts from pity:",
  currentPity: "{rarity}-Star Current Pity",
  winRate: "Chance to get Featured Item:",
  charRate: "Chance to get Character instead of Weapon",
  nonRateup: "(When losing 4-Star Item)",
  selectedRate: "Selected Weapon Rate:",
  guaranteedSystem: "Guaranteed System",
  backToDefault: "Back to Default",
  resetPrompt: 'Are you sure to Reset <b>"{banner}"</b> probabilities back to default?',
  "default": "Default",
  never: "Never",
  always: "Always"
};
const customBanner = {
  title: "Customize Banner",
  deletePrompt: "Are You Sure to delete this banner ?",
  ownerDeleteNote: "If you've shared this banner publicly, The Travelers who have made wishes on your banner will no longer be able to access it.",
  userDeleteNote: "The Wishing History on this banner will not be deleted, but you will not be able to pull on this banner again.",
  retry: "Retry",
  findBanner: "Looking for a Banner..",
  networkError: "Network Error, Please check your Connection!",
  bannerNotFound: "Banner not found, wrong <u>Banner ID</u> or maybe the author has removed it.",
  invalidBanner: "Invalid Banner ID",
  identifying: "Identifying Banner",
  loadOwnedBanner: `You're the owner of "{ownedBanner}" banner, your local data will be used instead of the data you've shared online.`,
  loadReady: '"{banner}" is ready to Wish',
  uploading: "Uploading {item}",
  uploadFailed: "Image Upload Failed, please try again later!",
  close: "Close",
  almostDone: "Almost Done",
  shareText: "Come and Try Your Luck on my {character} Banner Simulator",
  setPosition: "Set Position",
  next: "Next",
  move: "Move",
  changeSplashArt: "Change Splash Art",
  adjustSplashArt: "Adjust Splash Art",
  dropHere: "Drop Here!",
  preview: "Banner Preview",
  generateImage: "Generate Image",
  notAnImage: "Not an Image",
  imageTooLarge: "Image is too Large, max size: {maxSize}",
  faceIcon: "Face Icon",
  addBanner: "Add Banner",
  "delete": "Delete",
  deleteFailed: "Failed to Remove",
  bannerRemoved: "Banner Removed",
  edit: "Edit",
  editInfo: "Edit Info",
  editBanner: "Edit Banner Information",
  bannerName: "Banner Name",
  charName: "Character Name",
  charTitle: "Character Title",
  watermark: "Watermark",
  completeAllField: "Please Complete All Required Field!",
  finishAndWish: "Finish and Wish",
  publish: "Publish Banner",
  updateAndShare: "Update & Share",
  rateupChar: "Rate Up Characters",
  yourBanners: "Your Banners",
  createBanner: "Create a Custom Banner",
  limitation: "You are not a member, please delete some banners to activate the editor",
  memberToUnlock: "Become a Member to Add More Banner",
  incomplete: "Incomplete",
  inappropriate: "Inappropriate Content!"
};
const backupRestore = {
  cloudSync: "Cloud Sync",
  localSync: "Local Backup/Restore",
  "import": "Import Data",
  "export": "Export Data",
  importAction: "{fileInfo} will be added to the App, please choose what action you want to perform!",
  mergeAction: "Merge Data <small>Automatically remove duplicate item(s) and insert new item(s)</small>",
  replaceAction: "Replace Data <small> Erase the current App Data and replace it with the imported one. </small>",
  dropFiles: "Drop Your File Here",
  autoExport: "Auto Export",
  destination: "Destination",
  lastExport: "Last Export",
  desNotFound: "Cannot find backup file location, please try to Export again"
};
const wish = {
  wishTitle: "Gebet",
  rollButton: "Gebet {count}",
  stellaFortuna: "Stella Fortuna",
  loadFailed: "Laden des Banners fehlgeschlagen! <br /> Bitte wechsel zu einem anderen Banner oder \xFCberpr\xFCfe deine Internetverbindung, um Fehler zu verhindern!",
  loadMeteor: "Load Animation",
  skipMeteor: "Skip Animation",
  loadMeteorMsg: "Loading <span>{star} Star Meteor Animation </span>",
  meteorNotLoaded: "Cannot find Meteor Animation in your storage, please <span> Load the Meteor Animation</span> first before pulling, or <span> Turn ON </span> the option to skip Animation!",
  preloadFilesMsg: "* The loaded files will be stored in the Browser Storage, so you don't need to load them again until the site is updated.",
  banner: {
    text: "Banner",
    allBanner: "Alle Banner",
    previous: "Vorheriger Banner",
    findBanner: "Finde einen Banner",
    group: "Gruppe",
    beginner: "Anf\xE4ngergebet",
    "character-event": "Figurenaktionsgebet",
    "weapon-event": "Waffenaktionsgebet",
    standard: "Standardgebet",
    wishDescription: "Alle 10 Ziehungen erh\xE4ltst du sicher Objekte mit mindestens vier Sternen",
    novice: "Gebet f\xFCr Anf\xE4nger",
    up: "UP!",
    beginnerSet: "20% Rabatt auf 10er-Set. Bei erster Zehnerziehung erh\xE4ltst du sicher folgende Figur: {character}.",
    beginnerNote: '"Ich wei\xDF genau wie man sich als Magd zu verhalten hat"',
    beginnerChance: "Verbleibende M\xF6glichkeiten: {chances}",
    standardNote: "Standardgebet haben kein Zeitlimit.",
    allWeaponTypes: "Alle Waffentypen",
    etc: "etc.",
    probIncreased: "H\xF6here Wahrscheinlichkeit!",
    eventNote: "Die limitierten Figuren mit f\xFCnft Sternen gibt es nur w\xE4hrend des jeweiligen Aktionszeitraums \xFCber das entsprechende Gebet.",
    viewDetails: "W\xE4hle 'Details', um mehr zu erfahren."
  },
  epitomizedPath: {
    text: "G\xF6ttlicher Kurs",
    fatePoint: "Schicksalspunkte",
    cancelPrompt: "Willst du den aktuellen Kurs abbrechen?",
    cancelDesc: "Nach dem Abbrechen werden deine gesammelten Schicksalspunkte zur\xFCckgesetzt.",
    selectWeapon: "Gew\xE4hlte Waffe",
    chartCourseOf: "Kurs zu {target} setzen",
    cancelCourse: "Kurs abbrechen",
    chartCourse: "Kurs setzen",
    courseSetFor: "Aktueller Kurs: {selectedCourse}",
    description: [
      '"G\xF6ttlicher Kurs" ist ein besonderer Gebetsmechanismus des neusten Aktionsgebets "G\xF6ttliches Werk".',
      "Sobald du einen Kurs zu deiner gew\xE4hlten Waffe gesetzt hast, erh\xE4ltst du einen Schicksalspunkt, <span> wenn du eine 5-Sterne-Waffe erh\xE4ltst, die nicht von dir gew\xE4hlt ist</span>.",
      'Sobald du genug Schicksalspunkte gesammelt hast, wird deine n\xE4chste 5-Sterne-Waffe diejenige sein, du die durch "G\xF6ttlicher Kurs" gew\xE4hlt hast.',
      '<span>Deine Schicksalspunkte werden zur\xFCckgesetzt</span>, wenn du eine Waffe von "G\xF6ttlicher Kurs" w\xE4hrend des Aktionsgebets "G\xF6ttliches Werk" erh\xE4ltst.',
      "Wenn du keine Waffe ausw\xE4hlst, werden deine Gebete keine Schicksalspunkte ansammeln.",
      "Du kannst deine Auswahl \xE4ndern oder abbrechen. Dadurch werden deine gesammelten Schicksalspunkte zur\xFCckgesetzt.",
      'Wenn das Aktionsgebet "G\xF6ttliches Werk" beendet ist, werden auch deine gesammelten Schicksalspunkte zur\xFCckgesetzt.'
    ]
  },
  result: {
    skip: "\xDCberspringen",
    meteorFailed: "Meteor Animation l\xE4dt nicht",
    "new": "Neu",
    convertion: "Umgewandelt",
    title: "Ergebnis des Gebets f\xFCr {item} und andere"
  }
};
const outfit = {
  heading: "Figurenzierde",
  "default": "Standart",
  setOutfit: "Outfit ausw\xE4hlen",
  owned: "Bereits vorhanden",
  purchasePrompt: "Du hast die Figur f\xFCr dieses Outfit nicht, bist du sicher das du es kaufen m\xF6chtest?",
  promptInfo: "Du kannst dieses Outfit verwenden, nachdem du die Figur freigeschaltet hast",
  obtained: "Neues Outfit erhalten",
  unlocked: "{character}: Outfit freigeschaltet",
  item: {
    "5-star-outrider": {
      name: "5-Sterne-Kundschafter"
    },
    "favonian-fevotion": {
      name: "Ritterliche Hingabe"
    },
    "flowing-fate": {
      name: "Flie\xDFendes Schicksal"
    },
    "executor_s-thorns": {
      name: "Vollstreckerdornen"
    },
    "sea-breeze-dandelion": {
      name: "Traum von der Meeresbrise",
      description: "Jeans Sommerkleidung. Leicht und k\xFChl, aber deswegen nicht weniger elegant. Die perfekte Wahl f\xFCr einen Ausflug ans Meer."
    },
    "summertime-sparkle": {
      name: "Gl\xE4nzende Darbietung",
      description: "Barbaras Strandmode. Dieser h\xFCbsche Rock strotzt vor sommerlicher Lebensfreude und tr\xE4gt eine k\xFChle Meeresbrise mit sich."
    },
    "opulent-splendor": {
      name: "\xDCppige Pracht",
      description: "Keqings formelle Kleidung. Inmitten der wundersch\xF6nen Morgend\xE4mmerung des Laternenrituals verflechten sich die in tagelanger harter Arbeit gewebten F\xE4den zu einer leichten und doch pr\xE4chtigen Erscheinung."
    },
    "orchid_s-evening-gown": {
      name: "Orchideen-Abendkleid",
      description: "Ningguangs formelle Kleidung. Der lange t\xFCrkisfarbene Rock umspielt ihre eleganten Kurven, und die Schmetterlingsfl\xFCgel an ihren Kn\xF6cheln verleihen dem Outfit einen Hauch von leichter Anmut."
    },
    "ein-immernachtstraum": {
      name: "Ein Immernachtstraum",
      description: "Ein festliches Gewand f\xFCr die Prinzessin. M\xF6ge sie, die Edle, f\xFCr immer ihren Mut, ihre Aufrichtigkeit und ihre G\xFCte bewahren, so dass kein \xDCbel sie je \xFCberw\xE4ltigen kann."
    },
    "red-dead-of-night": {
      name: "Blutrote Nacht",
      description: "Eines der Outfits, die Diluc bei verdeckten Aktionen tr\xE4gt, gleicht einer Flamme, die in den Schatten tanzt. Die purpurroten Spuren, die sie an den R\xE4ndern der Sicht des Feindes hinterl\xE4sst, werden ihn f\xFCr immer in seinen Albtr\xE4umen verfolgen."
    },
    "a-sobriquet-under-shade": {
      name: "Weisheit unter dem Gr\xFCn",
      description: "Die Kleidung, die Lisa eigens bestellt hat, als sie Sumeru wieder besuchte. Das Kleid ist praktisch, aber auch elegant und hat eine leichte \xC4hnlichkeit mit ihrer Studentenuniform."
    },
    "springbloom-missive": {
      name: "Botschaft der Bl\xFCtezeit",
      description: "Kamisato Ayakas Kleidung. Das Kleid orientiert sich an der Kleidung der Frauen in Fontaine, welche auf den Illustrationen einer kurzen Erz\xE4hlung zu sehen ist, und gibt einen kurzen Einblick ins Leben der dortigen Adeligen."
    },
    "blossoming-starlight": {
      name: "Bl\xFCtenreines Sternenlicht",
      description: "Klees exquisites Kost\xFCm, welches sie nur zu den wichtigsten Auff\xFChrungen tr\xE4gt. Mit seinen leuchtenden Farben erinnert es an eine mit cremefarbenen Blumen und roten Kerzen verzierte Torte. Hiermit tr\xE4gt Klee Freude und ein L\xE4cheln in jede Ecke dieser Welt, wohin ihr Abenteuer sie auch f\xFChren mag."
    },
    "sailwind-shadow": {
      name: "Schatten flatternder Segel",
      description: "Kaeyas Kost\xFCm aus seiner Darbietung als \u201EGro\xDFer R\xE4uber Kurzklinge\u201C. Ein pr\xE4chtiges Kleidungsst\xFCck, das als absoluter \u201EHingucker\u201C entworfen wurde. Das Kost\xFCm selbst ist nicht aufwendig anzuziehen; ganz anders sieht es da allerdings mit den Accessoires und dem Messer aus."
    }
  }
};
const details = {
  text: "Detailierte Erl\xE4uterung",
  promotional: "H\xF6here Wahrscheinlichkeit",
  itemlist: "Objektliste",
  increasedRate: "Bessere Wahrscheinlichkeiten!",
  percentageDrop: "Wahrscheinlichkeit f\xFCr {rarity}-Sterne-Objekte: {percentage}",
  wishDetails: "Details",
  probInfo: "Basiswahrscheinlichkeit f\xFCr {rarity}-Sterne-Objekte: {singlePercentage} (Garantie: {avgPercentage})",
  itemWishFor: "Objekte, die bei den Gebeten zu erhalten sind:",
  itemType: "Kategorie",
  itemName: "Name",
  beginnerInfo: "Kein Zeitlimit (Endet nach 20 Gebeten)",
  limited: "Zeitlich begrenzte Aktion",
  permanent: "Permanent",
  alert: "\u203B Dies ist ein {wishName}. Die Anzahl der W\xFCnsche, die garantiert werden, wird nur innerhalb dieses Ereignisses kumuliert und ist unabh\xE4ngig von der Garantie bei anderen Gebeten.",
  beginner: [
    "Das Anf\xE4ngergebet hat keine zeitliche Begrenzung und richtet sich an Reisende, die k\xFCrzlich in Teyvat gelandet sind. Nur Nicht-exklusive Figuren und Waffen sind hier erh\xE4ltlich. <br /> In Anf\xE4ngerwunsch kosten 10-Wunsch-Sets <span> 20%</span> weniger Vorbestimmtes Schicksal, und dein erstes 10-W\xFCnsche-Set enth\xE4lt garantiert {character}, und dein zweites 10-W\xFCnsche-Set enth\xE4lt garantiert einen <span> anderen </span> min. 4-Sterne Charakter! <br/> Das Anf\xE4ngergebet endet nach <span> 20 </span> Gebeten. Nachdem es geendet hat, wird das Gebet verschwinden.",
    "\u203BIm Normalfall besteht dieselbe Basiswahrscheinlichkeit f\xFCr alle Figuren oder Waffen. Richte dich bei erh\xF6hten Wahrscheinlichkeiten, Garantien oder \xC4hnlichem bitte nach den jeweiligen Regeln.",
    " Regeln ",
    "Basiswahrscheinlichkeit zum Ziehen von 5-Sterne-Objekten = <span> 0.600%</span> <br /> Basiswahrscheinlichkeit zum Ziehen von 4-Sterne-Objekten = <span> 5.100%</span>; Gesamtwahrscheinlichkeit (inkl. Garantie) = <span> 13.000%</span>;"
  ],
  standard: [
    'Das Standardwgebet "{bannerName}" ist immer verf\xFCgbar. Hier k\xF6nnen Reisende nicht limitierte Figuren und Waffen ziehen.<br/> Alle 10 Ziehungen bei diesem Gebet gibt es <span>auf jeden Fall</span> mindestens 1 Objekt mit 4 oder mehr Sternen.',
    "\u203BIm Normalfall besteht dieselbe Basiswahrscheinlichkeit f\xFCr alle Figuren oder Waffen. Richte dich bei erh\xF6hten Wahrscheinlichkeiten, Garantien oder \xC4hnlichem bitte nach den jeweiligen Regeln.",
    "\u3013Regeln\u3013",
    "Basiswahrscheinlichkeit zum Ziehen von 5-Sterne-Objekten = <span>0.600%</span>; Basiswahrscheinlichkeit zum Ziehen von 5-Sterne-Figuren = <span>0.300%</span>, und die Basiswahrscheinlichkeit zum Ziehen von 5-Sterne-Waffen = <span>0.300%</span>; Gesamtwahrscheinlichkeit (inkl. Garantie) f\xFCr Ziehen von 5-Sterne Gegenstand = <span>1.600%</span>; Nach h\xF6chstens <span>90</span> Gebeten erh\xE4ltst du aufgrund der Garantie auf jeden Fall ein 5-Sterne-Objekt. <br> Basiswahrscheinlichkeit zum Ziehen von 4-Sterne-Objekten = <span>5.100%</span>; Basiswahrscheinlichkeit zum Ziehen von 4-Sterne-Figuren = <span>2.550%</span>, und Basiswahrscheinlichkeit zum Ziehen von 4-Sterne-Waffen = <span>2.550%</span>; Gesamtwahrscheinlichkeit (inkl. Garantie) f\xFCr Ziehen von 4-Sterne-Gegenst\xE4nden  = <span>13.000%</span>; Nach h\xF6chstens <span>10</span> Gebeten erh\xE4ltst du aufgrund der Garantie auf jeden Fall ein 4-Sterne-Objekt.; Wahrscheinlichkeit ein 4-Sterne-Objekt durch die Garantie zu erhalten = <span>99.400%</span>, und Wahrscheinlichkeit ein 5-Sterne-Objekt durch die Garantie zu erhalten = <span>0.600%</span>. "
  ],
  events: [
    'Das Aktionsgebet "{bannerName}" ist jetzt verf\xFCgbar. W\xE4hrend des Aktionszeitraums, steigt die Wahrscheinlichkeit zum Ziehen der <span>limitierten</span> 5-Sterne-Figur {featuredCharacter} sowie der 4-Sterne-Figuren {rateupCharacters} <span>stark an</span>! <br/> <span> \u203B Hinweis: Die limitierten Figuren dieser Aktion werden nicht im Standartgebet "Wanderlust" verf\xFCgbar sein.</span>',
    "\u203B Im Normalfall besteht dieselbe Basiswahrscheinlichkeit f\xFCr alle Figuren oder Waffen. Richte dich bei erh\xF6hten Wahrscheinlichkeiten, Garantien oder \xC4hnlichem bitte nach den jeweiligen Regeln.",
    "\u3013Regeln\u3013",
    "5-Sterne-Objekte",
    'F\xFCr Aktionsgebet "{bannerName}": Basiswahrscheinlichkeit eine 5-Sterne-Figur zu erhalten = <span> 0.600% </span>; Gesamtwahrscheinlichkeit (inkl. Garantie) = <span>1.600%</span>; e-Figuren = <span>0.300%</span>, und die Basiswahrscheinlichkeit zum Ziehen von 5-Sterne-Waffen = <span>0.300%</span>; Gesamtwahrscheinlichkeit (inkl. Garantie) f\xFCr Ziehen von 5-Sterne Gegenstand = <span>1.600%</span>; Nach h\xF6chstens <span>90</span> Gebeten erh\xE4ltst du aufgrund der Garantie auf jeden Fall ein 5-Sterne-Objekt.<br/> Sobald du bei einem Gebet eine 5-Sterne-Figur ziehst, besteht die Wahrscheinlichkeit von <span> 50.000%</span>, die Aktionsfigur {featuredCharacter} zu erhalten. Wenn du bei diesem Gebet eine 5-Sterne-Figure ziehst, die keine Aktionsfigur ist, bekommst du beim n\xE4chsten Ziehen einer 5-Sterne-Figur <span>auf jeden Fall</span> eine Aktionsfigur.',
    "4-Sterne-Objekte",
    'F\xFCr das Aktionsgebet "{bannerName}": Basiswahrscheinlichkeit ein 4-Sterne-Objekt zu erhalten = <span> 5.100%</span>; Basiswahrscheinlichkeit eine 4-Sterne-Figur zu erhalten = <span>2.550%</span>, und Basiswahrscheinlichkeit eine 4-Sterne-Waffe zu erhalten = <span>2.550%</span>; Basiswahrscheinlichkeit einen 4-Sterne-Gegenstand zu erhalten = <span> 13.000%</span>; Nach h\xF6chsten <span>10<span> Gebeten erh\xE4ltst du aufgrund der Garantie mindestens 1 4-Sterne-Objekt.; Wahrscheinlichkeit ein 4-Sterne-Objekt durch die Garantie zu erhalten = <span>99.400%</span>, und Wahrscheinlichkeit ein 5-Sterne-Objekt durch die Garantie zu erhalten = <span>0.600%</span>. <br/> Sobald du bei einem Gebet eine 5-Sterne-Figur ziehst, besteht die Wahrscheinlichkeit von <span>50.000%</span> eine der Aktionsfiguren {rateupCharacters} zu erhalten. Wenn du bei diesem Gebet ein 4-Sterne-Objekt ziehst, das keine Aktionsfigur ist, bekommst du beim n\xE4chsten Ziehen eines 4-Sterne-Objektes <span>auf jeden Fall</span> eine Aktionsfigur. Wenn du beim Gebet ein 4-Sterne-Aktionsobjekt erh\xE4ltst, ist die Wahrscheinlichkeit zum Erhalten aller 4-Sterne-Aktionsfiguren bei diesem Gebet identisch.'
  ],
  weapons: [
    'Das Aktionsgebet "{bannerName}" ist nun verf\xFCgbar. W\xE4hrend des Aktionszeitraums, steigt die Wahrscheinlichkeit zum Ziehen der <span>limitierten</span> 5-Sterne-Waffen {featuredWeapon1} und {featuredWeapon2} sowie der <span>limitierten</span> 4-Sterne-Waffen {rateupWeapons} <span>stark an</span>! <br/> <span> \u203B Hinweis: Die limitierten Waffen dieser Aktion werden nicht im Standartgebet "Wanderlust" verf\xFCgbar sein.</span>',
    "\u203B Im Normalfall besteht dieselbe Basiswahrscheinlichkeit f\xFCr alle Figuren oder Waffen. Richte dich bei erh\xF6hten Wahrscheinlichkeiten, Garantien oder \xC4hnlichem bitte nach den jeweiligen Regeln.",
    " Regeln ",
    "5-Sterne-Objekte",
    'F\xFCr Aktionsgebet "{bannerName}": Basiswahrscheinlichkeit eine 5-Sterne-Waffe zu erhalten = <span>0.700%</span>; Gesamtwahrscheinlichkeit (inkl. Garantie) = <span>1.850%</span>; Nach h\xF6chstens <span>80</span> Gebeten erh\xE4ltst du aufgrund der Garantie auf jeden Fall eine 5-Sterne-Waffe<br/> Sobald du beim Gebet eine 5-Sterne-Waffe ziehst, besteht die Wahrscheinlichkeit von <span>75.000%</span>, eine der 5-Sterne-Aktionswaffen {featuredWeapon1} oder {featuredWeapon2} zu bekommen. Wenn du eine 5-Sterne-Waffe ziehst die keine Aktionswaffe ist, bekommst du beim n\xE4chsten Ziehen einer 5-Sterne-Waffe <span>auf jeden Fall</span> eine 5-Sterne-Aktionswaffe. Wenn du beim Aktionsgebet "G\xF6ttliches Werk" nach dem Setzen eines Kurses auf eine Waffe mithilfe von "G\xF6ttlicher Kurs" eine 5-Sterne-Waffe erh\xE4ltst, die nicht die ist, auf die du den Kurs gesetzt hast, erh\xE4ltst du 1 Schicksalspunkt. Sobald du die <span>maximale</span> Menge an Schicksalspunkten gesammelt hast, wird die n\xE4chste 5-Sterne-Waffe, die du bei dem Gebet ziehst, <span>auf jeden Fall</span> die Waffe sein, auf die du den Kurs gesetzt hast. Sobald du beim Gebet die Waffe erh\xE4ltst, auf die du den Kurs gesetzt hast, werden alle Schicksalspunkte wieder auf <span>0</span> gesetzt, egal ob du bereits die maximale Menge an Schicksalspunkten erreicht hast oder nicht. Danach kannst du erneut Schicksalspunkte sammeln. Wenn du nicht mithilfe von "G\xF6ttlicher Kurs" auf eine bestimmte Waffe setzt, sammelst du auch <span>keine</span> Schicksalspunkte an.<br/> Die Waffe, auf die du den Kurs gesetzt hast, kannst du wechseln oder komplett zur\xFCcksetzen. Bei beiden Vorg\xE4ngen werden die bisher gesammelten Schicksalspunkte auf <span>0</span> zur\xFCckgesetzt. Danach kannst du erneut Schicksalspunkte sammeln.<br/> \u203B Hinweis: Die Schicksalspunkte dieses Gebets sind nur f\xFCr das aktuelle Aktionsgebet "G\xF6ttliches Werk" g\xFCltig. Sobald das Gebet endet, werden die Schicksalspunkte wieder auf <span>0</span> gesetzt und du kannst sie erneut sammeln.',
    "4-Sterne-Objekte",
    'F\xFCr Aktionsgebet "{bannerName}": Basiswahrscheinlichkeit ein 4-Sterne-Objekt zu erhalten = <span>6.000%</span>; Basiswahrscheinlichkeit ein 4-Sterne-Charakter zu erhalten = <span>3.000%</span>, und Basiswahrscheinlichkeit eine 4-Sterne-Waffe zu erhalten = <span>3.000%</span>; Gesamtwahrscheinlichkeit (inkl. Garantie) f\xFCr Ziehen von 4-Sterne Gegenstand = <span>14.500%</span>; Nach h\xF6chsten <span>10<span> Gebeten erh\xE4ltst du aufgrund der Garantie mindestens 1 4-Sterne-Objekt.; Wahrscheinlichkeit ein 4-Sterne-Objekt durch die Garantie zu erhalten = <span>99.300%</span>, und Wahrscheinlichkeit ein 5-Sterne-Objekt durch die Garantie zu erhalten = <span>0.700%</span>. <br/> Sobald du bei einem Gebet ein 4-Sterne-Gegenstand ziehst, besteht die Wahrscheinlichkeit von <span>75.000%</span> eine der Aktionswaffen {rateupWeapons} zu erhalten. Wenn du bei diesem Gebet ein 4-Sterne-Objekt ziehst, das keine Aktionswaffe ist, bekommst du beim n\xE4chsten Ziehen eines 4-Sterne-Objektes <span>auf jeden Fall</span> eine Aktionswaffe. Wenn du beim Gebet eine 4-Sterne-Aktionswaffe erh\xE4ltst, ist die Wahrscheinlichkeit zum Erhalten aller 4-Sterne-Aktionswaffen bei diesem Gebet identisch.'
  ],
  convertion: {
    fiveStar: "Wenn du 5-Sterne-Waffen bei diesem Gebet erh\xE4ltst, bekommst du zus\xE4tzlich {starglitter} x10;",
    fourStar: "Wenn du 4-Sterne-Waffen bei diesem Gebet erh\xE4ltst, bekommst du zus\xE4tzlich {starglitter} x2;",
    threeStar: "Wenn du 3-Sterne-Waffen bei diesem Gebet erh\xE4ltst, bekommst du zus\xE4tzlich {stardust} x15."
  },
  duplicate: {
    heading: " Vorhandene Characters\u3013",
    text: "Sobald du eine {rarity}-Sterne Figur das zweite bis siebte Mal, auf welche Weise auch immer, erh\xE4ltst, wird diese Figur in je 1 {stellaFortuna} der jeweiligen Figur und {starglitter} {constBonus} umgewandelt; Beim achten Mal wird die Figur in {starglitter} {fullConstBonus} umgewandelt."
  }
};
const history = {
  title: "Gebetsverlauf",
  text: "Verlauf",
  resetButton: "L\xF6schen",
  resetPromptTitle: "Verlauf l\xF6schen?",
  resetPrompt: 'Es werden auch alle Figuren und Waffen des "{bannerName}" Banners aus deinem Inventar gel\xF6scht. <br /> Bist du sicher, dass du alles zur\xFCcksetzen m\xF6chtest?',
  resetSuccess: "Erfolgreich zur\xFCckgesetzt!",
  keepPity: "Don't reset Pity and Guaranteed Status",
  selectWish: "Gebetskategorie:",
  disclaimer: "Wir speichern niemals Daten im Cloudspeicher. Alle Daten werden bei IndexedDB gespeichert, das hei\xDFt die Daten werden in deinem Browserspeicher gespeichert. Sie gehen niemals verloren, au\xDFer du l\xF6schst sie manuell durch den L\xF6schen/Zur\xFCcksetzen Knopf oder leerst deinen Browserspeicher.",
  currentPity: "Aktuelle Pity:",
  totalPull: "Zuge insgesamt:",
  totalSpend: "Insgesamt ausgegeben:",
  filterTxt: "Filter",
  filter: "{rarity} Sterne",
  filterAll: "Alle",
  pity: "Pity",
  timeReceived: "Erhalten am",
  waiting: "Warte",
  noData: "Keine Daten verf\xFCgbar.",
  untracked: "Kein Verlauf",
  item: "Item",
  win: "Gewonnenes 50/50",
  lose: "Verlorenes 50/50",
  guaranteed: "Garantiert",
  selected: "Ausgew\xE4hlte Waffe",
  olderLayout: "Altes Layout",
  switchv2: "Wechsel zum neuen Layout"
};
const shop = {
  text: "Shop",
  paimonBargains: "Rares f\xFCr Staub und Glanz",
  fateNeeded: "{rollQty} {currency} zu wenig.",
  primoNeeded: "Mit {primoPrice} Urgestein kaufen?",
  purchaseUpto: "1x erh\xE4ltlich",
  purchaseConfirm: "Kauf best\xE4tigen",
  exchangeHeading: "Items umwandeln",
  purchaseHeading: "Items kaufen",
  purchaseButton: "Kaufen",
  pay: "Zahlen",
  product: "Produkt",
  consume: "Verbrauchen",
  selectPayment: "Zahlungsart w\xE4hlen",
  unrealWallet: "Keine reale W\xE4hrung",
  convertPrimo: "Automatisch in Urgestein umwandeln?",
  proceedPayment: "Zahlung abschlie\xDFen",
  qty: "Anzahl",
  insufficient: "Unzureichende Zahlmittel",
  crystalTopup: "Kristalle aufladen",
  initialBonus: "Inklusive Bonus",
  bonus: "Bonus",
  buyGenesisHeading: "Kaufe Sch\xF6pfungskristalle",
  recomendedHeading: "Empfohlene Waren",
  paimonHeading: "H\xE4ndler",
  welkinNote: "Kann mehrmals gekauft werden",
  limitedOffer: "Zeitlich begrenztes Angebot",
  noLimitTime: "Keine limitierten Angebote verf\xFCgbar",
  paymentChilde: "Childe",
  paymentTears: "Tears",
  paymentWakaranai: "Wakaranai",
  recomended: {
    welkin: "Mondsegen",
    newOutfit: "Neue Figurenzierde",
    dayRemaining: "Tage verbleibend: {days}",
    alreadyClaimed: "Heute bereits gekauft",
    instantlyGet: "Sofort erh\xE4ltlich",
    dailyGift: "T\xE4gliches Geschenk",
    obtainTotal: "Erhalte insgesamt {totalGenesis} Sch\xF6pfungskristalle und {totalPrimo} Urgestein \xFCber 30 Tage verteilt",
    claimingBlessing: "Klicke um deinen t\xE4glichen Mondsegen abzuholen!",
    issuedPurchase: "Fehler beim Kauf",
    collect: "Sammle f\xFCr 30 Tage t\xE4gliche Login-Belohnungen"
  },
  exchange: {
    starglitter: "Mit Sternenglanz kaufen",
    stardust: "Mit Sternenstaub kaufen",
    primogem: "Mit Urgestein kaufen"
  },
  item: {
    genesis: "Sch\xF6pfungskristalle",
    primogem: "Urgestein",
    intertwined: "Verwobenes Schicksal",
    acquaint: "Vorbestimmtes Schicksal",
    starglitter: "Herrenloser Sternenglanz",
    stardust: "Herrenloser Sternenstaub"
  },
  description: {
    intertwined: "Ein Samen des Schicksals, der Tr\xE4ume verbindet. Sein Glanz kann Schicksale miteinander verflechten und die Tr\xE4ume von Menschen zusammenf\xFChren. Es ist dieser Glanz, der die Sterne Bilder des Herzens formen l\xE4sst.",
    acquaint: "Ein Samen, des Hoffnung zwischen den Sternen aufblinken l\xE4sst. Egal wie weit Menschen voneinander entfernt sind, so wird dieser Schein den Menschen, die f\xFCreinander bestimmt sind, den Weg weisen, sodass sie sich unter dem Sternenhimmel treffen."
  }
};
const inventory = {
  text: "Inventar",
  unsetOutfit: "Outfit ablegen",
  setOutfit: "Outfit anlegen",
  refinement: "Verfeinerung {count}",
  constellation: "Konstellation {count}",
  extra: "{count} Zus\xE4tzlich",
  firstSummon: "Erstmals erhalten am: {date}",
  notOwned: "Noch nicht erhalten",
  sort: "Sortieren",
  rarity: "Seltenheit",
  name: "Name",
  quantity: "Menge",
  element: "Element",
  release: "Erscheinungsdatum",
  type: "Typ",
  owned: "In Besitz",
  showAllOption: "Zeige alle {item}s"
};
const menu = {
  no: "Nein",
  yes: "Ja",
  text: "Men\xFC",
  feedback: "Feedback",
  options: "Optionen",
  updates: "Updateverlauf",
  customBanner: "Custom Banner",
  backupRestore: "Backup & Restore",
  language: "Sprache",
  currency: "W\xE4hrung",
  fates: "Anzahl der Gebete",
  unlimited: "Unbegrenzt",
  manual: "Benutzerdefiniert",
  mute: "Audio & Soundeffekte stummschalten",
  switchBanner: "Banner wechseln",
  showAllitems: "Alle Gegenst\xE4nde im Inventar zeigen",
  autoskip: "Splash Art automatisch \xFCberspringen",
  animatedbg: "Animierter Hintergrund",
  multiRoll: "Number per multi-roll",
  factoryReset: "Daten l\xF6schen und Startzustand herstellen",
  resetTitle: "Auf Werkseinstellungen zur\xFCcksetzen",
  rotate: "Drehen f\xFCr ein besseres Erlebnis",
  keepSetting: "Keep Settings? <small> Current Pity, Balance and the Settings will not be deleted </small>",
  clearCache: "Zwischenspeicher leeren ( {size} )? <small>Zwischengespeicherten Dateien werden danach erneut heruntergeladen! </small>",
  resetButton: "Jetzt Zur\xFCcksetzen",
  resetPrompt: "Bist du dir sicher dass du <strong> alle Daten </strong> l\xF6schen willst and zu den Standarteinstellungen zur\xFCckkehren m\xF6chtest?",
  resetSuccess: "Erfolgreich zur\xFCckgesetzt!",
  proAccess: "Pro Access",
  getpro: "Get Pro Access",
  removeKey: "Remove Key",
  removeKeyConfirm: "Are you sure to delete the current Key? You will lose all of these benefits until you re-enter the new key!",
  getNewKey: "Neuen Schl\xFCssel hier erhalten!",
  noKey: "Du hast keinen Schl\xFCssel?",
  verifyFail: "Verifizierung des AdKeys fehlgeschlagen, \xDCberpr\xFCfe deine Verbindung!",
  invalidKey: "Dein Schl\xFCssel ist ung\xFCltig",
  keyExpired1: "Schl\xFCssel abgelaufen!",
  keyExpired2: 'Dein Schl\xFCssel: "{key}" ist seit dem {date} abgelaufen!',
  adFreeUser: "You already have access to the pro features!",
  inputKeyPlaceholder: "Schl\xFCssel eingeben",
  inputKeyTxt: "Input a Key to get more Benefits !",
  checkingKey: "Verifying Stored Access Key",
  authorNotes: "* Ich entschuldige mich f\xFCr die Werbung. Eigentlich m\xF6chte ich dir dein Wunscherlebnis nicht verderben, aber ich habe kein Team oder Sponsor, um diese App am Leben zu erhalten. Wenn ihr nichts ausgeben wollt, k\xF6nnt ihr immer noch den Werbeblocker einschalten oder einfach eine benutzerdefinierte DNS verwenden, ich werde es euch nicht verbieten."
};
const deDE = {
  title,
  character,
  weapon,
  vision,
  anemo,
  cryo,
  dendro,
  electro,
  hydro,
  geo,
  pyro,
  bow,
  catalyst,
  claymore,
  sword,
  polearm,
  extra,
  obtained,
  waiting,
  connectionFailed,
  confirmButton,
  cancelButton,
  disclaimer,
  fanmade,
  pressToContinue,
  installInstruction,
  share,
  screenshot,
  capturing,
  rewardFirstShare,
  version,
  donate,
  banner,
  editor,
  customBanner,
  backupRestore,
  wish,
  outfit,
  details,
  history,
  shop,
  inventory,
  menu
};
export {
  anemo,
  backupRestore,
  banner,
  bow,
  cancelButton,
  capturing,
  catalyst,
  character,
  claymore,
  confirmButton,
  connectionFailed,
  cryo,
  customBanner,
  deDE as default,
  dendro,
  details,
  disclaimer,
  donate,
  editor,
  electro,
  extra,
  fanmade,
  geo,
  history,
  hydro,
  installInstruction,
  inventory,
  menu,
  obtained,
  outfit,
  polearm,
  pressToContinue,
  pyro,
  rewardFirstShare,
  screenshot,
  share,
  shop,
  sword,
  title,
  version,
  vision,
  waiting,
  weapon,
  wish
};

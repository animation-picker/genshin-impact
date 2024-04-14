const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const path = require("path");
const iconv = require("iconv-lite");

let inFullScreen = true;

const port = 9989;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var win;
let e = express();

e.use(express.json());
e.use(cors());

e.delete("/api/shutdown", (req, res) => {
  const magicNumber = req.body.magicNumber;
  const correctMagicNumber = "9987"; // Replace with your actual magic number

  if (magicNumber === correctMagicNumber) {
    res.send("Server shutting down...");
    process.exit();
  } else {
    res.status(403).send("Incorrect magic number");
  }
});

e.post("/api/fullscreen", (req, res) => {
  const magicNumber = req.body.magicNumber;
  const correctMagicNumber = "9987"; // Replace with your actual magic number

  if (magicNumber === correctMagicNumber) {
    res.send("Toggling fullscreen...");

    if (win) {
      win.setFullScreen(!win.isFullScreen());
    }
  } else {
    res.status(403).send("Incorrect magic number");
  }
});

e.get("/api/members", (req, res) => {
  let text;
  // let userDataPath = app.getPath('userData');
  let appPath = app.getAppPath();
  let filePath = path.join(appPath, 'names.txt');
  try {
    const data = fs.readFileSync(filePath);
    // const data = fs.readFileSync("./names.txt");
    text = iconv.decode(data, "utf8");
    if (!text) {
      text = iconv.decode(data, "gbk");
    }
  } catch (err) {
    console.error("Error reading file:", err);
    res.json({name: "aaa", chineseChar: filePath});
    // res.status(500).json("Error reading file: ", filePath);
  }

  console.log("text: ", text);
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== "");
  console.log("lines: ", lines);

  const jsonData = lines.map((line, index) => {
    const name = `a01-${index + 1}`;
    return { name, chineseChar: line };
  });

  res.json(jsonData);
});

// e.use(express.static('./static'))
e.use(express.static(path.join(__dirname, "static")));

let s = e.listen(port, "localhost");

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 1080, height: 1920, frame: false });
  win.setFullScreen(inFullScreen);

  // and load the index.html of the app.
  // const port = s.address().port;
  win.loadURL(`http://localhost:${port}`);

  // win.once('ready-to-show', () => {
  //     win.show()
  // })

  // Open the DevTools.
  // win.webContents.openDevTools()
  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should devare the corresponding element.
    win = null;
  });
  // require('electron').webFrame.setZoomLevelLimits(1,1);
}
app.on("ready", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // startServer();

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

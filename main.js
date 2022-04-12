const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    title: "UTSC Notes",
    icon: path.join(__dirname, "pics/notes_icon.ico"),
  });

  mainWindow.maximize();
  mainWindow.show();

  mainWindow.on("minimize", function (event) {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on("close", function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }

    return false;
  });

  mainWindow.loadURL("https://rlqyl.github.io/");

  let tray = new Tray(path.join(__dirname, "pics/notes_icon.ico"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show App",
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "Quit",
      click: () => {
        app.isQuiting = true;
        app.quit();
      },
    },
  ]);

  tray.setContextMenu(contextMenu);
});

const cmd = `mono /Users/arao5/Downloads/MinecraftClient.exe`;
var pty = require("node-pty");

var shell = "bash";
var ptyProcess = pty.spawn(shell, [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env,
});

ptyProcess.write(`${cmd}\r`);
ptyProcess.on("data", function (data) {
  if (data.includes("Alienologist")) {
    ptyProcess.write("/sv DR-1\r");
    setTimeout(() => {
      ptyProcess.write("i am testing software please no worry about me\r");
      ptyProcess.write("/list\r");
    }, 5000);
  }

  if (
    data.includes("[MCC] PlayerList") &&
    !data.includes("Carl") &&
    !data.includes("Creeper")
  ) {
    console.log("THE DATA: ", data);
    const list = data.substring(16, data.length).split(",");
    console.log(list);
    ptyProcess.write(`${list.join()}\r`);
    setTimeout(() => {
      ptyProcess.write(
        `experiment concluded. self destruction imminent. goodbye!\r`
      );
    }, 5000);
  }
});
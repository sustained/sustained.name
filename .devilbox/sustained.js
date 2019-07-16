const { spawn } = require("child_process");

spawn("npm", ["run", "dev", "--", "--port", "8001"], { stdio: "inherit" });

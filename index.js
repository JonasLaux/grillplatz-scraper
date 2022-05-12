const { chromium } = require("playwright-core");
const bundledChromium = require("chrome-aws-lambda");
const fs = require("fs");

const main = async () => {
    const url = "https://google.com/";
    
  // remove all PNGs (debug)
  fs.readdirSync(".")
    .filter((file) => file.endsWith(".png"))
    .forEach((file) => fs.unlinkSync(file));

  const browser = await Promise.resolve(bundledChromium.executablePath).then(
    (executablePath) => {
      if (!executablePath) {
        // local execution
        return chromium.launch({});
      }
      return chromium.launch({ executablePath });
    }
  );
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ fullPage: true, path: "screenshot.png" });
  await browser.close();
};

main();

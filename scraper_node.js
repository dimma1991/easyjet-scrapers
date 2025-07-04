const puppeteer = require("puppeteer");

const [,, origin, destination, date] = process.argv;

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto("https://www.easyjet.com/en", { waitUntil: "networkidle2" });

  try {
    try {
      await page.click('#ensCloseBanner', { timeout: 3000 });
    } catch {}

    await page.type("#originStation", origin);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1000);

    await page.type("#destinationStation", destination);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1000);

    await page.click("#submitSearch");
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    await page.waitForSelector(".flight-card", { timeout: 10000 });

    const result = await page.evaluate(() => {
      const flight = document.querySelector(".flight-card");
      const time = flight?.querySelector(".time")?.innerText?.trim();
      const price = flight?.querySelector(".price")?.innerText?.trim();
      return { departureTime: time, price };
    });

    console.log(JSON.stringify(result));
    await browser.close();
  } catch (err) {
    console.log(JSON.stringify({ error: err.message }));
    await browser.close();
  }
})();
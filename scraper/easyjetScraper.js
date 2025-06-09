const puppeteer = require("puppeteer");

async function scrapeEasyJetPrice(originCity, destinationCity, departureDate) {
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

    await page.type("#originStation", originCity);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1000);

    await page.type("#destinationStation", destinationCity);
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

    await browser.close();
    return result;
  } catch (err) {
    await browser.close();
    return { error: err.message };
  }
}

module.exports = { scrapeEasyJetPrice };
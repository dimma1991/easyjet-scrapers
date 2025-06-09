const puppeteer = require('puppeteer');

async function scrape(origin, destination, date) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto('https://www.easyjet.com/en', { waitUntil: 'networkidle2' });

  try {
    try { await page.click('#ensCloseBanner'); } catch (e) {}

    await page.type('#originStation', origin);
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');

    await page.type('#destinationStation', destination);
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');

    await page.click('#submitSearch');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    await page.waitForSelector('.flight-card', { timeout: 15000 });

    const result = await page.evaluate(() => {
      const flight = document.querySelector('.flight-card');
      const time = flight?.querySelector('.time')?.innerText?.trim();
      const price = flight?.querySelector('.price')?.innerText?.trim();
      return { departureTime: time, price };
    });

    await browser.close();
    console.log(JSON.stringify(result));
  } catch (err) {
    await browser.close();
    console.log(JSON.stringify({ error: err.message }));
  }
}

const [,, origin, destination, date] = process.argv;
scrape(origin, destination, date);
console.log("Scraper started");

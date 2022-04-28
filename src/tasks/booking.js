const puppeteer = require('puppeteer');

const booking = async (id, pass) => {
  const targetDay = '#calendar > tbody > tr > td.clickAble:not(.applyDated)';

  const currentdate = new Date();

  const datetime = "Last Sync: "
    + currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes();

  try {
    console.log(`[${datetime}] [Try to booking for] [${id}]`);

    const browser = await puppeteer.launch({
      args: ['--incognito',],
      headless: false
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    await page.goto(process.env.LOGIN_PAGE, {
      waitUntil: 'networkidle0'
    });

    await page.type('input[name="username"]', id);
    await page.type('input[name="password"]', pass);

    await page.click('input[type="submit"]');

    await page.goto(process.env.ORDER_PAGE, {
      waitUntil: 'networkidle0'
    });

    try {
      await page.waitForSelector(targetDay, { timeout: 60000 });
      if (await page.$(targetDay) !== null) {
        await page.click(targetDay);
      }
    } catch (error) {
      console.log(error);
    }

    await page.waitForSelector('#btnSaveCrmContact', { timeout: 60000 });

    await page.click('#btnSaveCrmContact');

    console.log(`[${id}] : [Success]`);

    await browser.close();

  } catch (error) {
    await browser.close();

    console.log(error);
    console.log(`[${id}] : [Failed]`);
  }
};

module.exports = booking;

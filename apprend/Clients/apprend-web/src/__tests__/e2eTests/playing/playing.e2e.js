const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe(`Playing`, () => {
  let browser, page

  beforeAll(async () => {
    browser = await puppeteer.launch({
	    headless: false,
      slowMo: 300,
      args: [`--window-size=800,800`, `--window-position=0,0`]
    })
    page = await browser.newPage()
  });

  afterAll(async () => {
    await browser.close()
  });

  test(`Page loads in the browser`, async () => {
    await page.goto(`http://localhost:3000`)
  	await page.waitFor(`title`)
    const title = await page.title()
  	expect(title).toBe(`Apprend | Flashcard learning platform`)
  });

  test(`Click on an author`, async () => {
    const authorButton = await page.$(`[id="creator"]`)
    expect(authorButton).toBeDefined()
    await authorButton.click()
  });

  test(`Choose a deck from the author`, async () => {
    await page.waitFor(`[id="card-0-link"]`);
    const deckButton = await page.$(`button[id="card-0-link"]`)
    expect(deckButton).toBeDefined()
    await deckButton.click()
  });

  test(`Click play button`, async () => {
    await page.waitFor(`[id="play"]`);
    const playButton = await page.$(`button[id="play"]`)
    expect(playButton).toBeDefined()
    await playButton.click()
  });

  test(`The card is correct`, async () => {
    await page.waitFor(`[id="correct"]`);
    const correctButton = await page.$(`button[id="correct"]`)
    expect(correctButton).toBeDefined()
    await correctButton.click()
  });

  test(`Flip the card at click`, async () => {
    const card = await page.$(`div[id="card"]`)
    expect(card).toBeDefined()
    await card.click()
  });

  test(`Flip the card at click`, async () => {
    const card = await page.$(`div[id="card"]`)
    expect(card).toBeDefined()
    await card.click()
  });

  for (let i = 0; i < 4; i++) {
    test(`The card is wrong`, async () => {
      const wrongButton = await page.$(`button[id="wrong"]`)
      expect(wrongButton).toBeDefined()
      await wrongButton.click()
    });
  }

  test(`Click the back to homepage button`, async () => {
    const backButton = await page.$(`[id="back"]`)
    expect(backButton).toBeDefined()
    await backButton.click()
  });
});

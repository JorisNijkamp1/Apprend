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
    await page.goto(`http://localhost:3000/login`)
    await page.waitFor(`title`)
    const title = await page.title()
  	expect(title).toBe(`Apprend | Flashcard learning platform`)
  })

  test(`Click cookie`, async () => {
    const cookie = await page.$(`[id="cookie"]`)
    expect(cookie).toBeDefined()
    await cookie.click()
  })

  test(`Fill username`, async () => {
    await page.type(`input#loginUsernameInput`, `Aaron`, {delay: 15});
  })
  
  test(`Fill in password`, async () => {
    await page.type(`input#loginPasswordInput`, `ica`, {delay: 15});
  })

  test(`Login and redirect`, async () => {
    const loginButton = await page.$(`form[name="login"] button`)
    expect(loginButton).toBeDefined()
    await loginButton.click()
  })

  test(`Go to deck overview`, async () => {
    await page.goto(`http://localhost:3000/decks/5ddfadab612b09570c6f3a34`)
  });

  test(`Click play button`, async () => {
    await page.waitFor(`[id="play-deck-button"]`);
    const playButton = await page.$(`button[id="play-deck-button"]`)
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
      await page.waitFor(`[id="wrong"]`);
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

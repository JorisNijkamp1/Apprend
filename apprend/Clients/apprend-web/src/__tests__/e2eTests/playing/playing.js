// const puppeteer = require('puppeteer')
//
// jest.setTimeout(30000)
//
// describe(`Playing`, () => {
//   let browser, page
//
//   beforeAll(async () => {
//     browser = await puppeteer.launch({
// 	    headless: false,
//       slowMo: 200,
//       args: [`--window-size=800,800`, `--window-position=0,0`]
//     })
//     page = await browser.newPage()
//   })
//
//   afterAll(async () => {
//     await browser.close()
//   })
//
//   test(`Page loads in the browser`, async () => {
//     await page.goto(`http://localhost:3000/play`)
//   	await page.waitFor(`title`)
//     const title = await page.title()
//   	expect(title).toBe(`React App`)
//   })
//
//   test(`The card is correct`, async () => {
//     const correctButton = await page.$(`button.btn-green`)
//     expect(correctButton).toBeDefined()
//     await correctButton.click()
//   })
//
//   test(`Flip the card at click`, async () => {
//     const card = await page.$(`div[id="card"]`)
//     expect(card).toBeDefined()
//     await card.click()
//   })
//
//   test(`The card is wrong`, async () => {
//     const wrongButton = await page.$(`button.btn-red`)
//     expect(wrongButton).toBeDefined()
//     await wrongButton.click()
//   })
//
//   test(`Click the back button`, async () => {
//     const backButton = await page.$(`.btn-blue`)
//     expect(backButton).toBeDefined()
//     await backButton.click()
//   })
// })

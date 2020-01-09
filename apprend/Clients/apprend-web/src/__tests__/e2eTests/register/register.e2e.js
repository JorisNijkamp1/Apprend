import {API_URL} from '../../../redux/urls';

const puppeteer = require('puppeteer');
const E2E_DELAY = 10;
jest.setTimeout(30000);

const registerUser = async function (user) {
    const url = `${API_URL}/users`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(user)
    };

    await fetch(url, options);
};

const deleteUser = async function (username) {
    const url = `${API_URL}/users/${username}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors'
    };

    await fetch(url, options);
};

describe('Register page', function () {
    let browser, page;

    beforeAll(async () => {
        await registerUser({
            'username': 'TestE2e',
            'email': 'e2eoeojeienfieh@gmail.com',
            'password': 'Test123'
        });

        browser = await puppeteer.launch({
            headless: false,
            slowMo: E2E_DELAY,
            args: [`--window-size=800,800`, `--window-position=0,0`]
        });

        page = await browser.newPage();
    });

    afterAll(async () => {
        await deleteUser('TestE2e');
        await browser.close();
    });

    test('Load register page', async () => {
        await page.goto('http://localhost:3000/register');
        await page.waitFor(`title`);

        const theTitle = await page.title();
        expect(theTitle).toBe(`Apprend | Flashcard learning platform`);
    });

    test(`Click cookie`, async () => {
        const cookie = await page.$(`[id="cookie"]`)
        expect(cookie).toBeDefined()
        await cookie.click()
    })

    test('Can not register due to existing username and E-mail', async () => {
        const username = 'TestE2e';
        const email = 'e2eoeojeienfieh@gmail.com';
        const password = 'Test123';

        await page.goto('http://localhost:3000/register');

        await page.waitFor('#registerUsernameInput');
        const registerUsernameInput = await page.$('#registerUsernameInput');
        await registerUsernameInput.click({clickCount: 3});
        await registerUsernameInput.type(username);

        await page.waitFor('#registerEmailInput');
        const registerEmailInput = await page.$('#registerEmailInput');
        await registerEmailInput.click({clickCount: 3});
        await registerEmailInput.type(email);

        await page.waitFor('#registerPasswordInput');
        const registerPasswordInput = await page.$('#registerPasswordInput');
        await registerPasswordInput.click({clickCount: 3});
        await registerPasswordInput.type(password);

        await page.waitFor('#registerRepeatPasswordInput');
        const registerRepeatPasswordInput = await page.$('#registerRepeatPasswordInput');
        await registerRepeatPasswordInput.click({clickCount: 3});
        await registerRepeatPasswordInput.type(password);

        const usernameExistsWarning = await page.$('#usernameExistsWarning');
        const usernameExistsWarningText = await page.evaluate(usernameExistsWarning => {
            return usernameExistsWarning.textContent;
        }, usernameExistsWarning);

        const emailExistsWarning = await page.$('#emailExistsWarning');
        const emailExistsWarningText = await page.evaluate(emailExistsWarning => {
            return emailExistsWarning.textContent;
        }, emailExistsWarning);

        const registerUsernameInputInvalid = await page.$('#registerUsernameInput.is-invalid');
        const registerEmailInputInvalid = await page.$('#registerEmailInput.is-invalid');

        expect(registerUsernameInputInvalid).toBeDefined();
        expect(registerEmailInputInvalid).toBeDefined();
        expect(usernameExistsWarning).toBeDefined();
        expect(usernameExistsWarningText).toBe(`'${username}' is already in use!`);
        expect(emailExistsWarning).toBeDefined();
        expect(emailExistsWarningText).toBe(`'${email}' is already in use!`);
    });

    test('Can not register due to wrong username', async () => {
        const username = 'TestE2e#';
        const email = 'e2eoeojeienfieh@gmail.com';
        const password = 'Test123';

        await page.waitFor('#registerUsernameInput');
        const registerUsernameInput = await page.$('#registerUsernameInput');
        await registerUsernameInput.click({clickCount: 3});
        await registerUsernameInput.type(username);

        await page.waitFor('#registerEmailInput');
        const registerEmailInput = await page.$('#registerEmailInput');
        await registerEmailInput.click({clickCount: 3});
        await registerEmailInput.type(email);

        await page.waitFor('#registerPasswordInput');
        const registerPasswordInput = await page.$('#registerPasswordInput');
        await registerPasswordInput.click({clickCount: 3});
        await registerPasswordInput.type(password);

        await page.waitFor('#registerRepeatPasswordInput');
        const registerRepeatPasswordInput = await page.$('#registerRepeatPasswordInput');
        await registerRepeatPasswordInput.click({clickCount: 3});
        await registerRepeatPasswordInput.type(password);

        const registerUsernameInputValid = await page.$('#registerUsernameInput.is-valid');
        expect(registerUsernameInputValid).toBe(null);
    });

    test('Can not register due to wrong E-mail', async () => {
        const username = 'TestE2e';
        const email = 'e2eoeojeienfiehgmailcom';
        const password = 'Test123';

        await page.waitFor('#registerUsernameInput');
        const registerUsernameInput = await page.$('#registerUsernameInput');
        await registerUsernameInput.click({clickCount: 3});
        await registerUsernameInput.type(username);

        await page.waitFor('#registerEmailInput');
        const registerEmailInput = await page.$('#registerEmailInput');
        await registerEmailInput.click({clickCount: 3});
        await registerEmailInput.type(email);

        await page.waitFor('#registerPasswordInput');
        const registerPasswordInput = await page.$('#registerPasswordInput');
        await registerPasswordInput.click({clickCount: 3});
        await registerPasswordInput.type(password);

        await page.waitFor('#registerRepeatPasswordInput');
        const registerRepeatPasswordInput = await page.$('#registerRepeatPasswordInput');
        await registerRepeatPasswordInput.click({clickCount: 3});
        await registerRepeatPasswordInput.type(password);

        const registerEmailInputValid = await page.$('#registerEmailInput.is-valid');
        expect(registerEmailInputValid).toBe(null);
    });

    test('Can not register due to wrong repeated password', async () => {
        const username = 'TestE2e#';
        const email = 'e2eoeojeienfieh@gmail.com';
        const password = 'Test123';
        const repeatPassword = '321Test';

        await page.waitFor('#registerUsernameInput');
        const registerUsernameInput = await page.$('#registerUsernameInput');
        await registerUsernameInput.click({clickCount: 3});
        await registerUsernameInput.type(username);

        await page.waitFor('#registerEmailInput');
        const registerEmailInput = await page.$('#registerEmailInput');
        await registerEmailInput.click({clickCount: 3});
        await registerEmailInput.type(email);

        await page.waitFor('#registerPasswordInput');
        const registerPasswordInput = await page.$('#registerPasswordInput');
        await registerPasswordInput.click({clickCount: 3});
        await registerPasswordInput.type(password);

        await page.waitFor('#registerRepeatPasswordInput');
        const registerRepeatPasswordInput = await page.$('#registerRepeatPasswordInput');
        await registerRepeatPasswordInput.click({clickCount: 3});
        await registerRepeatPasswordInput.type(repeatPassword);

        const registerRepeatPasswordInputValid = await page.$('#registerRepeatPasswordInput.is-valid');
        expect(registerRepeatPasswordInputValid).toBe(null);
    });

    test('Can register', async () => {
        const username = 'TestE2e2';
        const email = 'e2eoeojeienfieh2@gmail.com';
        const password = 'Test123';

        await page.waitFor('#registerUsernameInput');
        const registerUsernameInput = await page.$('#registerUsernameInput');
        await registerUsernameInput.click({clickCount: 3});
        await registerUsernameInput.type(username);

        await page.waitFor('#registerEmailInput');
        const registerEmailInput = await page.$('#registerEmailInput');
        await registerEmailInput.click({clickCount: 3});
        await registerEmailInput.type(email);

        await page.waitFor('#registerPasswordInput');
        const registerPasswordInput = await page.$('#registerPasswordInput');
        await registerPasswordInput.click({clickCount: 3});
        await registerPasswordInput.type(password);

        await page.waitFor('#registerRepeatPasswordInput');
        const registerRepeatPasswordInput = await page.$('#registerRepeatPasswordInput');
        await registerRepeatPasswordInput.click({clickCount: 3});
        await registerRepeatPasswordInput.type(password);

        const registerButton = await page.$('#registerSubmitButton');
        expect(registerButton).toBeDefined();
        await registerButton.click();

        await deleteUser(username);
    });
});
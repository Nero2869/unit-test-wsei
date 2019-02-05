let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    element,
    element2,
    element3,
    actual,
    driver;

const waitUntilTime = 20000;
const rootURL = 'https://library-app.firebaseapp.com/';

async function getElementByClassName(className) {
    const element = await driver.wait(until.elementLocated(By.className(className)), waitUntilTime)

    return await driver.wait(until.elementIsVisible(element), waitUntilTime);
}

async function getElementById(id) {
    const element = await driver.wait(until.elementLocated(By.id(id)), waitUntilTime);

    return await driver.wait(until.elementIsVisible(element), waitUntilTime);
}

describe('Testy FireAppBase', () => {

    beforeEach(async () => {
        driver = new webdriver.Builder().forBrowser('chrome').build();
        await driver.get(rootURL);
    });

    afterEach(async () => {
        await driver.quit();
    });


    test('Jeśli mail jest wpisany nie poprawnie nie wysyłaj formularza', async () => {

        //element2 to guzik
        element2 = await getElementByClassName('btn-lg');
        // element to input
        element = await getElementById('ember14');
        await element.sendKeys('userail.pl');

        actual = await element2.isEnabled();

        expect(actual).toBeFalsy();
    });

    test('Jeśli mail jest wpisany poprawnie wyślij formularz i sprawdź czy api zwróciło alert-success', async () => {
        //element2 to guzik
        element2 = await getElementByClassName('btn-lg');
        // element to input
        element = await getElementById('ember14');
        await element.sendKeys('user@mail.pl');
        element2.click();
        // element3 to alert
        element3 = await getElementByClassName('alert-success');
        actual = await element3.isDisplayed();
        expect(actual).toBeTruthy();
    });


    test('Pobierz tekst z alert-success i sprawdź czy zwraca on komunikat "Thank you! We saved your email address with the following id:"', async () => {
        //element2 to guzik
        element2 = await getElementByClassName('btn-lg');
        // element to input
        element = await getElementById('ember14');
        await element.sendKeys('user@mail.pl');
        element2.click();
        // element3 to alert
        element3 = await getElementByClassName('alert-success');
        actual = await element3.getText().then((text) => {
            return text;
        });
        expect(actual).toMatch(/Thank you! We saved your email address with the following id:/);
    });

});


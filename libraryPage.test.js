let webdriver = require('selenium-webdriver'),
    { after, before} = require('selenium-webdriver/testing'),
    By = webdriver.By,
    until = webdriver.until,
    element,
    element2,
    element3,
    actual,
    expected,
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

// it('Uruchom driver', () => {
//     return d.then(_d => {
//         driver = _d
//     })
// });
//
// it('Zainicjalizuj kontekst strony', async () => {
//     await driver.get(rootURL);
// });


// //szukamy naszego inputa
// driver.findElement(By.css('#ember14'))
//     .sendKeys('user@testwsei.pl')
//     .then(() => {
//         console.log("Poprawnie wpisano dane do inputa")
//     })
//     .catch(() => {
//         console.log("Wystąpił problem z wpisaniem danych do inputa");
//     });
//
// //szukam guzika do zatwierdzania, guzik nie ma id więc biorę "copy selector" z konsoli
// driver.findElement(By.css('#ember3 > div > div > div > div.col-xs-10.col-xs-offset-1.col-sm-offset-0.col-sm-4.col-md-3 > button'))
//     .click()
//     .then(() => {
//         console.log("Pobrano guzik");
//     })
//     .catch(() => {
//         console.log("Wystąpił problem z pobraniem guzika");
//     });
//
// driver.wait(until.elementLocated(By.css('#ember3 > div > div > div.alert.alert-success')), 6500)
//     .getText()
//     .then((txt) => {
//         console.log("Udało się poprawnie wysłac zapytanie do api. api zwróciło następujący respone w alercie " + txt);
//     })
//     .catch((error) => {
//         console.log("Nie udało się pobrac elementu alert-success ponieważ: " + error);
//     });



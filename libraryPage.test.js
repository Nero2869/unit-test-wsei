let webdriver = require('selenium-webdriver'),
    {describe, after, before} = require('selenium-webdriver/testing'),
    By = webdriver.By,
    until = webdriver.until,
    element,
    element2,
    actual,
    expected,
    driver;
let d = new webdriver.Builder().forBrowser('chrome').build();
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

async function getElementByXPath(xpath) {
    const element = await driver.wait(until.elementLocated(By.xpath(xpath)), waitUntilTime);

    return await driver.wait(until.elementIsVisible(element), waitUntilTime);
}

it('Uruchom driver', () => {
    return d.then(_d => {
        driver = _d
    })
});

it('Zainicjalizuj kontekst strony', async () => {
    await driver.get(rootURL);
});

it('Sprawdzamy czy mail jest poprawny', async () => {

    //element2 to guzik
    element2 = await getElementByClassName('btn-lg');
    // element to input
    element = await getElementById('ember14');
    element.sendKeys('user@email.pl')
        .then(() => {
            console.log("Poprawnie wpisano dane do inputa")
        })
        .catch(() => {
            console.log("Wystąpił problem z wpisaniem danych do inputa");
        });

    driver.sleep(3000);
    actual = await element2.isEnabled()
        .then((value) => {
            // console.log(value);
            return value;
        });

    expect(actual).toBeTruthy();
});

// //pobieram wszystkie elementy navbara do poruszania się po aplikacji.
// driver.findElements(By.css('nav li')).then((elements) => {
//     elements.map((element) => {
//         element.getText().then((txt) => {
//             console.log("Pobrano element z navbara " + txt);
//         });
//     });
// }).catch(() => {
//     console.log("Nie udało się pobrać elementów navbara")
// });
//
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



let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

let driver = new webdriver.Builder().forBrowser('chrome').build();

// przechodzimy na stronke
driver.get('https://library-app.firebaseapp.com/');

//pobieram wszystkie elementy navbara do poruszania się po aplikacji.
driver.findElements(By.css('nav li')).then((elements) => {
    elements.map((element) => {
        element.getText().then((txt) => {
            console.log("Pobrano element z navbara " + txt);
        });
    });
}).catch(() => {
    console.log("Nie udało się pobrać elementów navbara")
});

//szukamy naszego inputa
driver.findElement(By.css('#ember14'))
    .sendKeys('user@testwsei.pl')
    .then(()=>{
        console.log("Poprawnie wpisano dane do inputa")
    })
    .catch(() => {
        console.log("Wystąpił problem z wpisaniem danych do inputa");
    });

//szukam guzika do zatwierdzania, guzik nie ma id więc biorę "copy selector" z konsoli
driver.findElement(By.css('#ember3 > div > div > div > div.col-xs-10.col-xs-offset-1.col-sm-offset-0.col-sm-4.col-md-3 > button'))
    .click()
    .then(()=>{
        console.log("Pobrano guzik");
    })
    .catch(() => {
        console.log("Wystąpił problem z pobraniem guzika");
    });

driver.wait(until.elementLocated(By.css('#ember3 > div > div > div.alert.alert-success')), 6500)
    .getText()
    .then((txt) => {
        console.log("Udało się poprawnie wysłac zapytanie do api. api zwróciło następujący respone w alercie " + txt);
    })
    .catch((error) => {
        console.log("Nie udało się pobrac elementu alert-success ponieważ: " + error);
    });



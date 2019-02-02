let webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

let driver = new webdriver.Builder().forBrowser('chrome').build();

// przechodzimy na stronke
driver.get('https://library-app.firebaseapp.com/');

//pobieram wszystkie elementy navbara do poruszania się po aplikacji.
driver.findElements(By.css('nav li')).then(()=>{
    console.log("Pobrano elementy navbara")
});

//szukamy naszego inputa
driver.findElement(By.css('#ember14')).then(()=>{
    console.log("pobrano element input");
});

//szukam guzika do zatwierdzania, guzik nie ma id więc biorę "copy selector" z konsoli
driver.findElement(By.css('#ember3 > div > div > div > div.col-xs-10.col-xs-offset-1.col-sm-offset-0.col-sm-4.col-md-3 > button')).then(()=>{
    console.log("Pobrano element buttton");
});




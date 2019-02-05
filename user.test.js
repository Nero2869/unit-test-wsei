const User = require('./user');

test('testy inicjalizacji obiektu', () => {
    expect(new User('Jan', 'Kowalski', 18, 'user')).toEqual({
        firstName: 'Jan',
        secondName: 'Kowalski',
        age: 18,
        aclType: 'user'
    });
});

test('sprawdzenie czy stworzony obiekt jest klasy User', () => {
    expect(new User('Adam', 'Nowak', 18, 'user')).toBeInstanceOf(User)
});

test('czy dziala isAdult', () => {
    const user = new User('Jan', 'Kowalski', 18, 'user');
    expect(user.isAdult()).toBeTruthy();
});
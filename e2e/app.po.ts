import {browser, element, by, protractor} from 'protractor';

export class HomePage {
    navigateTo() {
        return browser.get('/');
    }

    getServicesCount() {
        const EC = protractor.ExpectedConditions;
        const firstResult = element(by.css('.services__item'));

        return browser.wait(EC.presenceOf(firstResult), 500).then(() => {
            return element.all(by.css('.services__item')).count().then(count => count);
        });
    }
}

import {browser, element, by, protractor} from 'protractor';

export class HomePage {
    navigateTo() {
        return browser.get('/');
    }

    getServicesCount() {
        const EC = protractor.ExpectedConditions;
        const firstLi = element(by.css('.test'));

        return browser.wait(EC.presenceOf(firstLi), 500).then(() => {
            return element.all(by.css('.test')).count().then(count => count);
        });
    }
}

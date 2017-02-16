exports.config = {
    specs: ['../test/e2e/**/*.js'],
    onPrepare: function () {
        browser.get('http://localhost:3000').then(function () {
            browser.waitForAngular(); // adicionado para que o Selenium aguarde o load do Angular
            browser.driver.findElement(by.id('entrar')).click();
            browser.driver.findElement(by.id('login_field'))
                .sendKeys('everton0189@gmail.com');
            browser.driver.findElement(by.id('password'))
                .sendKeys('G1t2017');
            browser.driver.findElement(by.name('commit')).click();
        });
    }
};
describe('my angular app', function () {

  describe('visiting the home page', function () {

    beforeEach(function () {
      browser.get('/');
    });

    it('should go to the about link', function() {
      element(By.id('about-link')).click().then(function() {
        expect(browser.getCurrentUrl()).toMatch('/about');
      });
    });

    it('should show content from the about section', function() {
      element(By.id('about-link')).click().then(function() {
        expect(element(By.tagName('body')).getText()).toMatch('Iowa College Democrats');
      });
    });

  });
});
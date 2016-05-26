var jenkinsrequest = require('../index.js');
var expect = require('chai').expect;

describe("Test exception", function () {
    it("The 'toThrow' matcher is for testing if a function throws an exception", function () {
        function SendJenkinsRequest() {
            jenkinsrequest.SendJenkinsRequest('http://jenkins.dev:8080', 'NineYi.WebStore.MobileWebMall');
        }
        expect(SendJenkinsRequest).to.not.throw();
    });
});
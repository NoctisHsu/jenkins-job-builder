var rp = require('request-promise');
var pace = require('pace');
var spinner = require('text-spinner')({ interval: 50 });

exports.SendJenkinsRequest = function (jenkinsUrl, jobName) {
    var total = 100,
        count = 0,
        pa = pace(total);
    var timer;
    var lastbuildNumber;
    console.log('Send Job "' + jobName + '" to build.');
    rp(jenkinsUrl + '/job/' + jobName + '/api/json').then(function (res) {
        var cleaned = res.trim();
        var json = JSON.parse(cleaned);
        lastbuildNumber = json["lastBuild"]["number"];
        if (!json["inQueue"] && !CheckIsBuilding()) {
            SendBuildTrigger();
        } else {
            console.log('Same Job is building.');
        }
    }).catch(function () {
        console.log('Send build failed ,please check the jenkins server is runing and jenkins job is exist');
    });


    function SendBuildTrigger() {
        rp(jenkinsUrl + '/job/' + jobName + '/build')
            .then(function () {
                console.log('Please wait, process of executing can take some time!');
                timer = setInterval(function () {
                    if (count <= total) {
                        rp(jenkinsUrl + '/job/' + jobName + '/lastBuild/api/json?depth=1').then(function (res) {
                            var cleaned = res.trim();
                            var json = JSON.parse(cleaned);
                            if (lastbuildNumber == json["number"]) {
                                spinner.spin();
                            } else {
                                if (json["executor"] == null && json["building"] == false) {

                                    clearInterval(timer);
                                    var executeResult = json['result'] === 'SUCCESS' ? 'Build Job Success' : 'Build Job Failed';
                                    console.log('\n' + executeResult);
                                } else {
                                    if (json["executor"] && json["executor"]["progress"]) {
                                        count = json["executor"]["progress"];
                                        pa.op(count);
                                    }
                                }
                            }
                        })
                    }

                }, 2000);
            })
            .catch(function () {
                console.log('Send build failed ,please check the jenkins server is runing and jenkins job is exist');
            });
    }

    function CheckIsBuilding() {
        rp(jenkinsUrl + '/job/' + jobName + '/lastBuild/api/json?depth=1').then(function (res) {
            var cleaned = res.trim();
            var json = JSON.parse(cleaned);
            return json["building"];
        });
    }
};


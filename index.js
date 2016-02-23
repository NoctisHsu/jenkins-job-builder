var request = require('request');

exports.SendJenkinsRequest = function (jenkinsUrl, jobName, timeInterval, maxRepeatTimes) {
    var timer;
    request(jenkinsUrl + '/job/' + jobName + '/api/json', function (error, response, body) {
        var cleaned = body.trim();
        var json = JSON.parse(cleaned);
        var initbuildNumber = json["nextBuildNumber"];

        request(jenkinsUrl + '/job/' + jobName + '/build', function (error, response) {
            if (!error && response.statusCode == 201) {
                var repeatTimes = 0;
                console.log('Send Job "' + jobName + '" to build.');
                console.log('Please wait, process of executing can take some time!');

                timer = setInterval(function () {
                    console.log('executing...');
                    if (repeatTimes < maxRepeatTimes) {
                        request(jenkinsUrl + '/job/' + jobName + '/api/json', function (error, response, body) {
                            var cleaned = body.trim();
                            var json = JSON.parse(cleaned);
                            if (json["lastBuild"].number == initbuildNumber) {
                                if (json["lastBuild"].number == json["lastSuccessfulBuild"].number) {
                                    console.log('Job "' + jobName + '" build success!');
                                    clearInterval(timer);
                                }
                                else if (json["lastUnsuccessfulBuild"] && json["lastBuild"].number == json["lastUnsuccessfulBuild"].number) {
                                    console.log('Job "' + jobName + '"build fail');
                                    clearInterval(timer);
                                }
                                repeatTimes = repeatTimes + 1;
                            }
                        });
                    } else {
                        console.log('build timeout');
                        clearInterval(timer);
                    }
                }, timeInterval);

            } else {
                console.log('Send build request fail');
            }
        });
    });
};
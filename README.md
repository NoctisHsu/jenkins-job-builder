# jenkins-job-builder
Build jenkins job without jenkins website!

simple example：

open gulpfile.js 
than add:
```javascript
var jenkensJobBuilder = require('jenkins-job-builder');
var jenkinsUrl = 'http://jenkins.dev:8080';

//ci static file sync task
gulp.task('ci-static', function () {
var jobName = 'NineYi.Scm.StaticFile';
jenkensJobBuilder.SendJenkinsRequest(jenkinsUrl,jobName);
});

```
![Imgur](http://i.imgur.com/Xdq59Ya.png)

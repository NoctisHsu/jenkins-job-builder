# jenkins-job-builder
Build jenkins job without jenkins website!

simple example：

### Basic Usage

  ```javascript
  const jenkensJobBuilder = require('jenkins-job-builder');
  const jenkinsUrl = 'http://jenkins.dev:8080';
  const jobName = 'NineYi.Scm.StaticFile';
  jenkensJobBuilder.SendJenkinsRequest(jenkinsUrl,jobName);
  ```

### Use with Gulp
1. open gulpfile.js 
2. add gulp task

  ```javascript
  const jenkensJobBuilder = require('jenkins-job-builder');
  const jenkinsUrl = 'http://jenkins.dev:8080';

  //ci static file sync task
  gulp.task('ci-static', function () {
  const jobName = 'NineYi.Scm.StaticFile';
  jenkensJobBuilder.SendJenkinsRequest(jenkinsUrl,jobName);
  });
  ```
  
### Execution screenshot
![Imgur](http://i.imgur.com/Xdq59Ya.png)

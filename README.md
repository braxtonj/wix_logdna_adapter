# WIX Adapter for LogDNA
Middleware server to route your WIX logs to LogDNA
### Contents
  - [Setup](#setup)
    - [LogDNA](#logdna)
    - [Local Server](#local-server)
    - [AWS Elastic Beanstalk deployment](#aws-elastic-beanstalk-deployment)
    - [WIX Log Monitoring](#wix-log-monitoring)
  - [Support](#support)
  - [Contributing](#contributing)
  - [License](#license)
  - [All Contributors](#all-contributors)

## Setup

### LogDNA
Ensure you have a LogDNA account and an API key for your account.  Head over to [LogDNA.com](https://logdna.com) to sign up if you haven't yet.
### Local Server

0. Requirements on server
   * Node v14
   * git
1. Download the code and navigate there
```console
git clone https://github.com/braxtonj/wix_logdna_adapter
```
2. Navigate to the [code](src/) and install the system
```console
cd wix_logdna_adapter/src
npm install
```
3. Create an .env file with your LogDNA API key.  This **must** be defined to work
```console
echo "LOGDNA_API_KEY=YOUR_API_KEY" >> src/.env
```
4. Run
```console
npm start
```

### AWS Elastic Beanstalk deployment

You can read more about this process [here](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html).

0. Prerequisites
   * [Install the EB CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)
   * [Configure the EB CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-configuration.html)
1. Download the repo and cd to `src`
```console
git clone https://github.com/braxtonj/wix_logdna_adapter
cd wix_logdna_adapter/src
```
2. Initialize Elastic Beanstalk
```console
eb init --platform node.js --region us-west-2 wix_logdna_adapter
```
3. Create the EB environment
```console
eb create
```
4. Open in your browser to check the exposed url. Note that `/log` is the defined endpoint for WIX logs but this will take you to `/`
```console
eb open
```
### WIX Log Monitoring
1. Log in to your WIX account
2. Set up Site Monitoring with the appropriate endpoint for a running service
   * Within your WIX site's dashboard, navigate to `Setting`->`Developer Tools`->`Site Monitoring`->`Connect Monitoring Tools` and enter the server's external IP with the `/log` endpoint.
     * IE `https://myserver.com/log`
     * Once done, you should begin seeing all your WIX logs streaming into your LogDNA account.

### Next Steps
Chances are all your logs are not the same.  While LogDNA handles many logging formats, no system is a panacea.  Consider checking out LogDNA's [custom parsing](https://docs.logdna.com/docs/custom-parsing) before resorting to modifying this repo for special cases or refactoring your app's logs.

## Support
Note this is repo is not officially support by LogDNA.  Code is provided as-is.

However, if you have questions feel free to open Issues!

## Contributing
Always welcome.  All contributers will be recognized.  See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT license](LICENSE)
## All Contributors
* [@braxtonj](https://github.com/braxtonj)
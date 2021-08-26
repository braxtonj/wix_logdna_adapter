# WIX Adapter for LogDNA
Middleware server to route your WIX logs to LogDNA
### Contents
* [Setup](#setup)
* [Support](#support)
* [Contributing](#contributing)
* [License](#license)

## Setup

### LogDNA
Ensure you have a LogDNA account and an API key for your account.  Head over to [https://logdna.com](https://logdna.com) to sign up if you haven't yet.
### Server

1. Requirements on server
   * Node v14
   * git
2. Download the code and navigate there
```console
git clone https://github.com/braxtonj/wix_logdna_adapter
```
3. Navigate to the [code](src/) and install the system
```console
cd wix_logdna_adapter/src
npm install
```
4. Create an .env file with your LogDNA API key.  This **must** be defined to work
```console
echo "LOGDNA_KEY=YOUR_API_KEY" >> src/.env
```
5. Run
```console
npm start
```

### WIX Setup
1. Log in to your WIX account
2. Set up Site Monitoring with the appropriate endpoint for a running service
   * Within your WIX site's dashboard, navigate to `Setting`->`Developer Tools`->`Site Monitoring`->`Connect Monitoring Tools` and enter the server's external IP with the `/log` endpoint.
     * IE `https://myserver.com/log`
     * Once done, you should begin seeing all your WIX logs streaming into your LogDNA account.

## Support
Note this is repo is not officially support by LogDNA.  Code is provided as-is.

However, if you have questions feel free to open Issues!

## Contributing
Always welcome.  All contributers will be recognized.  See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT license](LICENSE)
## All Contributors
* [@braxtonj](https://github.com/braxtonj)
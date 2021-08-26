/* WIX Apadter for LogDNA

        Provided as-is :)

        LOGDNA_KEY environment variable is required
        See /log route for configuration of the log packet
*/


// Allows one to create a .env file in src/ and use those keys
//      env var LOGDNA_KEY is required for this to work
require('dotenv').config();


// Set up logging with LogDNA via pino-logdna integration
// Feel free to modify app and add other options found at
// https://github.com/logdna/pino-logdna
const pinoLogdna = require('pino-logdna');
const logdna_stream = pinoLogdna({
    key: process.env.LOGDNA_KEY // Required.
    , level: 'trace' // Ensures every pino level is grabbed (except secret)
    , app: 'logdna_wix_adapter'
    , indexMeta: true // Allows you to search any attached meta data that may be sent within LogDNA
});
logdna_stream.on('error', (err) => {
    console.error(err);
});


// Set up fastify instance
const fastify = require('fastify')({
    logger: {
        stream: logdna_stream // Attach LogDNA to fastify's built in logger
        , level: 'trace'
    }
});


// Here we set up the logging endpoint.  WIX will pass logs via Velo to us in JSON form.
//      As defined below, your log will show up in the message field within LogDNA.
//      Note that we are limiting the log to the request's body only.
//      You can easily modify the behavior though.
fastify.post('/log', async(rq, rp) => {
    // Add the following line if you are sending JSON logs from your WIX site
    // rq.body.jsonPayload.message = JSON.parse(rq.body.jsonPayload.message);

    // Bring the WIX payload (found in rq.body.jsonPayload.message)
    //   into rq.body.message to make it a first class citizen.  The original
    //   jsonPayload object is also deleted.
    rq.body.message = rq.body.jsonPayload.message;
    delete rq.body.jsonPayload;

    // Alternative, stripped down structure to be sent to LogDNA.  Drops all WIX context
    // rq.body = {message:rq.body.message}

    // Send the log to LogDNA
    await fastify.log.info(JSON.stringify(rq.body));

    // Return a succesful response
    return rp.code(200).send('success');
});


// Run it
const start = async() => {
    try {
        await fastify.listen(3000);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();

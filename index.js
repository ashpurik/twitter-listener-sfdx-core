global.exit = function exit(code, msg) { console.log(`ERROR: ${msg}`); process.exit(code || 1); }
global.missing = function missing(variable) { exit(1, `${variable} environment variable required.`); }

let { twitter, track } = require('./app/twitter');
let { org, force } = require('./app/salesforce');

let tweetStream = twitter.stream('statuses/filter', { track });

tweetStream.on('tweet', (tweet) => {
    if(!org.authenticated) { return; }
    
    let event = force.createSObject('Notification__e');
    event.set('Message__c', tweet.text);

    org.insert({ sobject: event }, (err) => {
        if(err) {
            console.error(err);
            process.exit(1);
        }
        else {
            console.log('Tweet published from', tweet.user.screen_name);
        }
    })
});

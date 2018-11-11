const functions = require('firebase-functions');
// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'pricetag-bce06cd';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.helloWord = functions.https.onRequest((request, response) => {
    response.send("Hello my world!");
});


exports.firstFunction = functions.https.onCall((data, ctx) => {
    var res = data.v1 + data.v2;
    if (ctx.auth) {
        console.log("firstFunction " + ctx.auth.uid);
    }
    return {
        result: res
    }
});

exports.translateText = functions.https.onCall((data, ctx) => {
    if (!(typeof data.text === 'string') || data.text.length === 0)
        throw new Error("Invalid argument 'text': not a string or string empty");
    
    if (!(data.lang === "EN"))
        throw new Error("Invalid argument 'lang': invalid language");
    
    // Translates some text into Russian
    var trans = "empty";
    translate.translate(data.text, data.lang).then(results => {
            trans = results[0];
            console.error(results);
            return results[0];
        }).catch(err => {
            trans = "error" + err;
            //throw Error("External service returned with error: " + err);
        });

    if (trans === "empty") throw new Error("no result");

    return {
        translatedText: trans
    }    
});
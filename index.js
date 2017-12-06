/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

const Alexa = require('alexa-sdk');

const APP_ID =  '[your app ID from the Developer Console] '; // This line is optional

const SKILL_NAME = 'Computer Science Facts';
const HELP_MESSAGE = 'You can say tell me a computer science fact, or, you can say exit... What would you like to do?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'See you next time!';


// Responses to the user before giving a fact
const responses = [
        'Sure! Did you know that',
        'Alright. Did you know that',
        'Okay. Did you know that',
        'Sure thing! Did you know that',
        'Absolutely. Did you know that',
        'Sure! Have you heard that',
        'Alright. Have you heard that',
        'Okay. Have you heard that',
        'Sure thing! Have you heard that',
        'Absolutely. Have you heard that',        
    ]


// Our list of facts to choose from
const data = [
		// Facts borrowed from http://www.kickassfacts.com/30-kickass-interesting-facts-about-computers/
        'Only 8% of the world’s currency is physical money, the rest only exists on computers..',
        'There was a computer worm that would gain access to Windows XP systems, download a patch from Microsoft to close the vulnerability that it used to infect the system, attempt to delete the infamous Blaster worm from the system if it was present, then delete itself.',
        'The worst breach of U.S. military computers in history happened when someone picked up a memory stick they found in the parking lot and plugged it into their computer, which was attached to United States Central Command. That memory stick was infected by a foreign intelligence agency and spread a virus throughout the network.',
        'Investigators missed incriminating Google searches done on Casey Anthony’s computer, including “fool-proof suffication”, because they checked her Internet Explorer history, but ignored Firefox.',
        'In 1978, Apple Corps, a company owned by The Beatles, sued Apple Computer for trademark infringement. The case settled for $80,000 along with the condition that Apple Computer should not enter the music business, and Apple Corps agreed not to enter the computer business.',
        'The Motion Picture Academy refused to nominate the original 1982 Tron movie for a special-effects award because, according to director Steven Lisberger, “The Academy thought we cheated by using computers”',
        'Mary Kenneth Keller, the first woman to earn a Ph.D. in Computer Science in the United States also earned a Master’s degree in Mathematics and Physics, helped develop computer programming languages and she was a Catholic nun.',
        'John Lasseter, the CEO of Pixar, was fired from Disney for promoting computer animation.',
        'Illegal prime numbers exist. An illegal prime is a prime number that represents information which is forbidden to possess or distribute. For example, when interpreted in a particular way, a certain prime describes a computer program that bypasses the digital rights management scheme used on DVDs.',
        'The new Texas Instrument calculators have ABC keyboards because if they had QWERTY keyboards, they would be considered computers and wouldn’t be allowed for standardized test taking.',
        '40 to 55% of all Wikipedia vandalism is caught by a single computer program called Clue Bot NG which has 90% accuracy.',
        'In 1936, the Russians made a computer that ran on water.',
        'Alan Turing, the father of computer science, artificial intelligence and who helped break German WW2 cyphers, committed suicide after being forced to undergo hormonal treatment for homosexuality and barred from continuing his cryptographic work.',
        'Big banks don’t process checks and debit card charges to your account in the order they’re received, but instead use a computer program that selects the biggest amounts first and charges them against your account; emptying your account faster and resulting in more overdraft fees.',
        'The Tandy TRS-80 Model one computer radiated so much interference that many games were designed so that an AM radio next to the computer could be used to provide sounds.',
        'In September 1956 IBM launched the 305 RAMAC, the first SUPER computer with a hard disk drive, or HDD. The HDD weighed over a ton and stored 5 megabytes of data.',
        'A computer as powerful as the human brain would be able to perform about 38 thousand trillion operations per second and hold about 3,584 terabytes of memory.',
        'The United States of America chose a sequence of eight zeros as the password for its computer controls of nuclear tipped missiles for eight years.',
        'Although 95% of mail is now sorted by computers, the U.S. Postal Service still employs clerks to decipher addresses that are too messy for the computers to understand. These clerks are expected to process 1,000 letters an hour, and upwards of 20% of them quit within the first 5 weeks.',
        'The first entirely computer generated movie sequence in cinema history was the Genesis Device demonstration video in Star Trek II: The Wrath of Khan. The studio that made the scene would later become Pixar.',
        'MIT has developed a computer software that can identify and distinguish a real smile from a smile of frustration.',  
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
         this.emit('GetNewCSFactIntent'); // Change this to match your GetNewFactIntent's name
    },
    'GetNewCSFactIntent': function () { // Change this to match your GetNewFactIntent's name
		// Choose a random fact and get ready to speak it
         const factArr = data;
         const preArr = responses;
         const factIndex = Math.floor(Math.random() * factArr.length);
         const respIndex = Math.floor(Math.random() * preArr.length);
         const randomFact = factArr[factIndex];
         const speechOutput = preArr[respIndex] + randomFact;

		 // Generate the response card, and speak the pre-response and the fact
         this.response.cardRenderer(SKILL_NAME, randomFact);
         this.response.speak(speechOutput);
         this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
         const speechOutput = HELP_MESSAGE;
         const reprompt = HELP_REPROMPT;

         this.response.speak(speechOutput).listen(reprompt);
         this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
         this.response.speak(STOP_MESSAGE);
         this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
         this.response.speak(STOP_MESSAGE);
         this.emit(':responseReady');
    },
};
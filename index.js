/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = "amzn1.ask.skill.13d7369e-c8d1-42a7-b41f-69d6b114e7aa";

const SKILL_NAME = 'Health Tips';
const GET_FACT_MESSAGE = "Here's your diet health tip: ";
const HELP_MESSAGE = 'You can say tell me a health tips, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
    'Consume a Variety of Foods : Not all the nutrients and other substances in foods that contribute to good health have been identified, so eating a wide assortment of foods helps ensure that you get all of the disease-fighting potential that foods offer. In addition, this will limit your exposure to any pesticides or toxic substances that may be present in a particular food.',
    'Keep an Eye on Portions: Sure, you can eat all the broccoli and spinach you want, but for higher-calorie foods, portion control is the key. In recent years, serving sizes have ballooned. In restaurants, choose an appetizer instead of an entree or split a dish with a friend. Don’t order anything that’s been “supersized.” When reading food labels, check serving sizes: some relatively small packages claim to contain more than one serving, so you have to double or triple the calories, grams of fat and milligrams of sodium if you’re planning to eat the whole thing.',
    'Get More Whole Grains: At least half your grains should be whole grains, such as whole wheat, barley and oats. Whole grains retain the bran and germ and thus all (or nearly all) of the nutrients and fiber of the grain. Look for a product labeled “100% whole wheat” or “100% whole grain.” If it doesn’t say that, look for a whole grain listed as the first ingredient, though there still may be lots of refined wheat (also called “white” or “enriched” flour) and/or sugar. Another option is to look for the voluntary “Whole Grain Stamp” from the Whole Grains Council.',
    'Eat Plenty of Produce: Aim for 2½ cups of vegetables and 2 cups of fruit a day, for a 2,000-calorie diet. If you consume more calories, aim for more; if you eat fewer than 2,000 calories, you can eat less. Include green, orange, red, blue/purple and yellow produce. The nutrients, fiber and other compounds in these foods may help protect against certain types of cancer and other diseases. Legumes, rich in fiber, count as vegetables, though are moderately high in calories. Choose whole fruits over juice for more fiber. Frozen and canned fruits and vegetables are good options.',
    'Limit Refined Grains, Added Sugar: The refined carbohydrates in white bread, regular pasta and most snack foods have little or no dietary fiber and have been stripped of many nutrients. On food labels, watch out for “wheat flour” (also called “white,” “refined” or “enriched” flour) on the ingredients list. Also, limit foods with added sugar, such as soda and candy. These are sources of empty calories that contribute to weight gain. Many sugary foods are also high in fat, so they’re even more calorie-dense. ',
    'Enjoy More Fish and Nuts: Nuts, fatty fish, avocados and vegetable oils supply healthy unsaturated fats. Recent research suggests these foods, though high in calories, tend not to promote weight gain because they are satisfying. Still, it’s best to eat them in place of other high-calorie foods. For instance, substitute olive or canola oil for butter. Fatty fish helps reduce heart disease risks and has other benefits, largely because of its omega-3 polyunsaturated fats.',
    'Cut Down on Animal Fat: Saturated fats, especially from red meat and processed meat, boost LDL (“bad”) cholesterol. To limit your intake, choose lean meats, skinless poultry and nonfat or low-fat dairy products. It’s also a good idea to replace saturated fats with “good” fats, found in nuts, fish and vegetable oils, not with refined carbohydrates such as white bread and snack foods.',
    'Don\'t Worry About Cholesterol: Though a 300-milligram daily cap on cholesterol intake has long been advised, there\'s abundant evidence that cholesterol in food has little, if any, effect on blood cholesterol in most people. Thus, many experts no longer recommend limiting dietary cholesterol (found only in animal foods, notably eggs and shrimp). The best way for most people to lower their blood cholesterol is to reduce saturated fats (as in meats) and trans fats (from partially hydrogenated oils in processed foods). A possible exception is people with diabetes, who should talk to their doctor about their overall diet.  ',
    'Keep Sodium Down, Potassium Up: Excess sodium raises blood pressure in many people and has other harmful effects. People over 50, black people, and those with hypertension, diabetes, or chronic kidney disease—that’s most adults—should limit sodium to 1,500 milligrams a day (about two-thirds of a teaspoon of salt). Everyone else should aim for less than 2,300 milligrams a day. At the same time, consume more potassium, which lowers blood pressure. Potassium-rich foods include citrus fruits, bananas, potatoes, beans and yogurt.',
    'Watch Your Calcium and Vitamin D: These nutrients are vital for bone health. Get calcium from low-fat or nonfat dairy products and fortified foods such as some orange juices and soy drinks. If you can’t get 1,000 to 1,200 mg a day from foods, take a calcium supplement. It’s hard to consume enough vitamin D from foods, and getting it from sunlight is risky. Many people—especially those who are over 60, live at northern latitudes or have darker skin—may need a D supplement (800 to 1,000 IU a day). ',
    'Choose Food Over Supplements: Supplements cannot substitute for a healthy diet, which supplies countless other potentially beneficial compounds besides vitamins and minerals. Foods also provide the “synergy” that many nutrients require to be efficiently used in the body. Still, for many people a basic multivitamin/mineral pill can provide some of the nutrients they may fall short on. In addition, many people need calcium as well as vitamin D supplements to meet recommended intakes.',
    'Be Aware of Liquid Calories: Beverages supply more than 20 percent of the calories in the average American’s diet. Some liquid calories come from healthy beverages, such as milk and 100 percent fruit juice. But most come from soda and other sweetened beverages and alcoholic drinks, which have lots of calories yet few, if any, nutrients. Soft drinks are a major source of sugar and calories for many Americans, especially children. Though juice is more nutritious than soft drinks, it’s also high in calories, so most people should drink no more than one cup a day.',
    'Limit Alcohol: If you drink, do so in moderation. That means no more than one drink a day for women, two a day for men. Older people should drink even less. A drink is defined as 12 ounces of beer, 5 ounces of wine, or 1½ ounces of 80-proof spirits. While alcohol in moderation has heart benefits, higher intakes can lead to a wide range of health problems. Even moderate drinking impairs your ability to drive and may increase the risk of certain cancers. Some people, including pregnant women and those who have certain medical conditions, should avoid alcohol altogether.',
];

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

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

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

# bus-mall
Providing bored transit passengers with amusing if unnecessary purchases since 2020.

The goal of this app is to gather user input regarding potential products for Bus Mall to offer.

Upon loading the page, the user will be presented with three of the twenty possible products along with a short description.

Once they click on one of the images, their vote will be tallied and a set of three new images will replace the current options.  This rotation of images will continue until 25 votes have been cast.  Images will never duplicate within a single voting round, and images will never repeat between two subsequent voting rounds.

After 25 votes have been cast, an UL will render to the left of the page describing how many times each item has been voted for as well has how many time that same item has been displayed.

In addition, a bar graph will replace the text content below the images which will visually display this same information (votes and number of times displayed)

Votes persist in local storage.  A future version of this app may include a reset button for users who wish to start fresh.

// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

// Take string input of digits, detect what type of credit card using prefix and length
var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long
  let prefix = cardNumber.slice(0,6);
  let len = cardNumber.length;

  // Diner's Club detect using validCard helper function
  if(validCard(len, [14], prefix, ['38', '39'])){
    return 'Diner\'s Club';
  }

  // American Express detect
  else if(validCard(len, [15], prefix, ['34', '37'])){
    return 'American Express';
  }

  // Switch detect - needs to remain above Visa to catch prefix conflicts
  else if(validCard(len, [16, 18, 19], prefix, ['4903', '4905', '4911', '4936', '564182', '633110', '6333', '6759'])){
    return 'Switch';
  }

  // Visa detect
  else if(validCard(len, [13, 16, 19], prefix, ['4'])){
    return 'Visa';
  }

  // MasterCard detect
  else if(validCard(len, [16], prefix, ['51', '52', '53', '54', '55'])){
    return 'MasterCard';
  }

  // Discover detect
  else if(validCard(len, [16, 19], prefix, ['6011', '644', '645', '646', '647', '648', '649', '65'])){
    return 'Discover';
  }

  // Maestro detect
  else if(validCard(len, [12, 13, 14, 15, 16, 17, 18, 19], prefix, ['5018', '5020', '5038', '6304'])){
    return 'Maestro';
  }

  // China UnionPay detect
  else if(validCard(len, [16, 17, 18, 19], prefix, [['622126','622925'], ['624', '626'], ['6282', '6288']])){
    return 'China UnionPay';
  }

  // Once you've read this, go ahead and try to implement this function, then return to the console.
};

// helper function takes inputs of number 'inputLength' and strings 'inputPrefix' and checks against valid arrays 
// of length and prefixes 
function validCard(inputLength, validLength, inputPrefix, validPrefix){
  var lengthCheck = false;

  for(var j = 0; j < validLength.length; j++){
    if(inputLength == validLength[j]){
      lengthCheck = true;
    }
  };

  for(var i = 0; i < validPrefix.length; i++){
    // check if index is an array - meaning range of prefix values
    if(Array.isArray(validPrefix[i])){
      let startNum = Number(validPrefix[i][0]);
      let endNum = Number(validPrefix[i][1]);

      for(var k = startNum; k <= endNum; k++){
        let currPrefix = k.toString();
        let prefixLen = currPrefix.length;
        let reformPrefixInput = inputPrefix.slice(0,prefixLen);

        if(lengthCheck == true && reformPrefixInput == currPrefix){
         return true;
        }
      }
    } else {
      // index is not an array, so single prefix value
      let prefixLen = validPrefix[i].length;
      let reformPrefixInput = inputPrefix.slice(0,prefixLen);

      if(lengthCheck == true && reformPrefixInput == validPrefix[i]){
        return true;
      }
    }
  };
  return false;
};
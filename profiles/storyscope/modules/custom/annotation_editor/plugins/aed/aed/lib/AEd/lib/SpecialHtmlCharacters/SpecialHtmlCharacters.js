/**
 * SpecialHtmlCharacters.js
 *
 * Contains AEd.libs.SpecialHtmlCharacters class definition. 
 *  
 * @author: Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.libs.SpecialHtmlCharacters 
// *****************************************************************************  



/**
 * This class is used to create special html characters instance (it stores lengths of special html characters e.g &amp; &gt;...).
 *   
 *       
 * @name SpecialHtmlCharacters
 * @memberOf AEd.libs       
 * @class 
 */
AEd.libs.SpecialHtmlCharacters = function() {

   this.specHtmlChars = [];   // Array contains lengths and values of special html characters values from http://www.utexas.edu/learn/html/spchar.html

   this.specHtmlChars.push({'regex' : "&", 'character' : '&amp;', 'len' : 5, 'code' : 38});
   this.specHtmlChars.push({'regex' : "\"", 'character' : '&quot;', 'len' : 6, 'code' : 34});
   this.specHtmlChars.push({'regex' : ">", 'character' : '&gt;', 'len' : 4, 'code' : 62});
   this.specHtmlChars.push({'regex' : "<", 'character' : '&lt;', 'len' : 4, 'code' : 60});
    
}

AEd.libs.SpecialHtmlCharacters.prototype.constructor = AEd.libs.SpecialHtmlCharacters;

// -------------------------------------------------------- Libs.isSpecialCharacter
/**
 * Detects if the character is special html character 
 *
 * @name isSpecialCharacter
 * @memberOf AEd.libs.isSpecialCharacter
 * @function   
 * @param {Int} charCode Character code
 * @return {Array} Array if character is special, else false
 */

AEd.libs.SpecialHtmlCharacters.prototype.isSpecialCharacter = function(charCode){

  for (var i in this.specHtmlChars){
   
     if (this.specHtmlChars[i].code == charCode){

       return this.specHtmlChars[i];
     }
  }

return false; 
}

// -------------------------------------------------------- Libs.isSpecialCharacter
/**

 * Replaces special characters
 *
 * @name replaceSpecialCharacters
 * @memberOf AEd.libs.replaceSpecialCharacters
 * @function   
 * @param {String} string string containing special characters
 * @return {String} newStr String with replaced special characters
 */

AEd.libs.SpecialHtmlCharacters.prototype.replaceSpecialCharacters = function(string){

  var newStr = string;

  for (var i = 0; i < this.specHtmlChars.length; i++){

      newStr = newStr.replace(new RegExp(this.specHtmlChars[i].regex, "g"), this.specHtmlChars[i].character);
  }

  return newStr;
}


// *****************************************************************************
// class AEd.libs.SpecialHtmlCharacters 
// ***************************************************************************** 

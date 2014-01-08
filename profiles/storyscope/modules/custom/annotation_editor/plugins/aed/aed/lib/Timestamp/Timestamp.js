/*
       Internet Timestamp Generator
       Copyright (c) 2009 Sebastiaan Deckers
       License: GNU General Public License version 3 or later
*/     
  
var Timestamp = {
      start: function (date){
         date = date ? date : new Date();
         var offset = date.getTimezoneOffset();
         return this.pad(date.getFullYear(), 4)
            + "-" + this.pad(date.getMonth() + 1, 2)
            + "-" + this.pad(date.getDate(), 2)
            + "T" + this.pad(date.getHours(), 2)
            + ":" + this.pad(date.getMinutes(), 2) 
            + ":" + this.pad(date.getSeconds(), 2)
            + "." + this.pad(date.getMilliseconds(), 3)
            + (offset > 0 ? "-" : "+")
            + this.pad(Math.floor(Math.abs(offset) / 60), 2)
            + ":" + this.pad(Math.abs(offset) % 60, 2);
      },

      pad: function (amount, width ){ 
         var padding = "";     
         while (padding.length < width - 1 && amount < Math.pow(10, width - padding.length - 1))
         padding += "0";      
         return padding + amount.toString(); 
      }

}


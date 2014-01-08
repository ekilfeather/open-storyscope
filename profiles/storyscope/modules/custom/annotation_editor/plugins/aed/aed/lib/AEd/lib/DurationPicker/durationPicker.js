/**
 * durationPicker.js
 *
 * Contains AEd.ui.libs.durationPicker class definition. 
 *  
 * @author: Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.libs.durationPicker
// *****************************************************************************  



/**
 * This class creates durationPicker.
 * @example   
 *  
 *    {Integer}  x                 - x coord, 
 *    {Integer}  y                 - y coord, 
 *    {Element} destinationI       - destination input,
 *    {Element} destinationF       - destination frame,
 * 
 * @name durationPicker
 * @memberOf AEd.libs     
 * @class 
 */

AEd.libs.durationPicker = function(x, y, destinationI, destinationF) {
  
  AEdlibsduration = this;  // Global variable 
  this.xCoord = x;         // Picker coordinates
  this.yCoord = y;
  this.destinationInput = destinationI;   // Destination element
  this.destinationFrame = destinationF;   // Destination frame
  this.durationPickerWindow = '';
  this.monthDay = new Array( 31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  this.fromDate = '';
  this.toDate = '';
  this.duration = '';  // User picked values
  this.years = '';
  this.months = '';
  this.days = '';
  this.hours = '';
  this.minutes = '';
  this.seconds = '';
}



AEd.libs.durationPicker.prototype.constructor = AEd.libs.durationPicker;

// --------------------------------------------------------------- SetFromDate
/**
 * Sets value from Date
 *
 * @name SetFromDate
 * @memberOf AEd.libs.durationPicker
 * @function 
 * @param {String} value Value to store.
 */

AEd.libs.durationPicker.prototype.SetFromDate = function(value){

  this.fromDate = new Date(value.toString().substring(0, 4), value.toString().substring(5, 7), value.toString().substring(8, 10), value.toString().substring(11, 13), value.toString().substring(14, 16), value.toString().substring(17, 19), 0);
  this.fromDate.setMonth(this.fromDate.getMonth() - 1);
}

// --------------------------------------------------------------- SetToDate
/**
 * Sets value to Date
 *
 * @name SetToDate
 * @memberOf AEd.libs.durationPicker
 * @function 
 * @param {String} value Value to store.
 */

AEd.libs.durationPicker.prototype.SetToDate = function(value){

  this.toDate = new Date(value.toString().substring(0, 4), value.toString().substring(5, 7).toString(), value.toString().substring(8, 10), value.toString().substring(11, 13), value.toString().substring(14, 16), value.toString().substring(17, 19), 0);
  this.toDate.setMonth(this.toDate.getMonth() - 1);
}

// --------------------------------------------------------------- SetDuration
/**
 * Sets value of duration + or -
 *
 * @name SetDuration
 * @memberOf AEd.libs.durationPicker
 * @function 
 * @param {String} value Value to store.
 */

AEd.libs.durationPicker.prototype.SetDuration = function(value){

  this.duration = value.toString();
}

// --------------------------------------------------------------- SetYears
/**
 * Sets value of years (number)
 *
 * @name SetYears
 * @memberOf AEd.libs.durationPicker
 * @function 
 * @param {String} value Value to store.
 */

AEd.libs.durationPicker.prototype.SetYears = function(value){

  if (this.isNumber(value)){

    this.years = value.toString();
  }

  else{

    this.years = '';
  }
}

// --------------------------------------------------------------- SetMonths
/**
 * Sets value of months (number)
 *
 * @name SetMonths
 * @memberOf AEd.libs.durationPicker
 * @function 
 * @param {String} value Value to store.
 */

AEd.libs.durationPicker.prototype.SetMonths = function(value){

  if (this.isNumber(value)){

    this.months = value.toString();
  }

  else{

    this.months = '';
  }
}

// --------------------------------------------------------------- SetDays
/**
 * Sets value of days (number)
 *
 * @name SetDays
 * @memberOf AEd.libs.durationPicker
 * @function 
 * @param {String} value Value to store.
 */

AEd.libs.durationPicker.prototype.SetDays = function(value){

  if (this.isNumber(value)){

    this.days = value.toString();
  }

  else{

    this.days = '';
  }
}

// --------------------------------------------------------------- SetHours
/**
 * Sets value of hours (number)
 *
 * @name SetHours
 * @memberOf AEd.libs.durationPicker
 * @function 
 * @param {String} value Value to store.
 */

AEd.libs.durationPicker.prototype.SetHours = function(value){

  if (this.isNumber(value)){

    this.hours = value.toString();
  }

  else{

    this.hours = '';
  }
}

// --------------------------------------------------------------- SetMinutes
/**
 * Sets value of minutes (number)
 *
 * @name SetMinutes
 * @memberOf AEd.libs.durationPicker
 * @function 
 * @param {String} value Value to store.
 */

AEd.libs.durationPicker.prototype.SetMinutes = function(value){

  if (this.isNumber(value)){

    this.minutes = value.toString();
  }

  else{

    this.minutes = '';
  }
}

// --------------------------------------------------------------- SetSeconds
/**
 * Sets value of seconds (number)
 *
 * @name SetSeconds
 * @memberOf AEd.libs.durationPicker
 * @function 
 * @param {String} value Value to store.
 */

AEd.libs.durationPicker.prototype.SetSeconds = function(value){

  if (this.isNumber(value)){

    this.seconds = value.toString();
  }

  else{

    this.seconds = '';
  }
}

// --------------------------------------------------------------- isNumber
/**
 * Checks if n is a number code from http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
 *
 * @name isNumber
 * @memberOf AEd.libs.durationPicker
 * @function 
 * @param {String} n Value to check.
 */

AEd.libs.durationPicker.prototype.isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// --------------------------------------------------------------- writeValues
/**
 * Checks and writes duration, years, months, days, hours, minutes, seconds values to input (see constructor)
 *
 * @name writeValues
 * @memberOf AEd.libs.durationPicker
 * @function 
 */

AEd.libs.durationPicker.prototype.writeValues = function(){

  if (this.years != '' || this.months != '' || this.days != '' || this.hours != '' || this.minutes != '' || this.seconds != '') {   // There is non empty value - make the period string
    
    var values = "";

    if (this.duration === "-"){

      values += "-";
    }  

    values += "P"; 

    this.years != '' ? values += this.years + "Y" : values += "";
    this.months != '' ? values += this.months + "M" : values += "";
    this.days != '' ? values += this.days + "D": values += "";

    if (this.hours != '' || this.minutes != '' || this.seconds != ''){   // Time is also defined

      values += "T";
      this.hours != '' ? values += this.hours + "H" : values += "";
      this.minutes != '' ? values += this.minutes + "M" : values += "";
      this.seconds != '' ? values += this.seconds + "S": values += "";

    }
      

    this.destinationInput.value = values;
  }

  else{  // All values are empty

    this.destinationInput.value = "";
  }
}

// --------------------------------------------------------------- changeInputsValues
/**
 * Channges duration picker inputs values after two date picking
 *
 * @name changeInputsValues
 * @memberOf AEd.libs.durationPicker
 * @function 
 */

AEd.libs.durationPicker.prototype.changeInputsValues = function(){
  
  this.destinationFrame.getElementById("aedDurationPickerDuration").value = this.duration;
  this.destinationFrame.getElementById("aedDurationPickerYears").value = this.years;
  this.destinationFrame.getElementById("aedDurationPickerMonths").value = this.months;
  this.destinationFrame.getElementById("aedDurationPickerDays").value = this.days;
  this.destinationFrame.getElementById("aedDurationPickerHours").value = this.hours;
  this.destinationFrame.getElementById("aedDurationPickerMinutes").value = this.minutes;
  this.destinationFrame.getElementById("aedDurationPickerSeconds").value = this.seconds;
}

// --------------------------------------------------------------- hidePicker
/**
 * Hides duration picker window
 *
 * @name hidePicker
 * @memberOf AEd.libs.durationPicker
 * @function 
 */

AEd.libs.durationPicker.prototype.hidePicker = function(){
  
  if (this.durationPickerWindow != undefined && this.durationPickerWindow.style != undefined){

    this.durationPickerWindow.style.display = 'none';
  }
}

// --------------------------------------------------------------- createPicker
/**
 * Creates duration picker window
 *
 * @name createPicker
 * @memberOf AEd.libs.durationPicker
 * @function 
 */

AEd.libs.durationPicker.prototype.createPicker = function(){
 
    var pickerHtml = "";

    // Opera support

    var operaWidth = " ";
    var operaPadding = " ";

    if (window.opera){

      operaWidth = "width:80%";
      operaPadding = "style='padding-right:10px'";
    }

    pickerHtml += "<span style='cursor:auto;'>";

    pickerHtml += "<table style='background-color:white; color:#cc0033; font-weight:bold; width:280px; padding:0'><tbody>";

    pickerHtml += "<tr><td colspan='4' style='text-align:center; padding-left:10px; padding-top:5px; padding-bottom:5px; color:#18861B'>" + AEd.I18n.t("DPicker_head") + "</td></tr>";

    pickerHtml += "<tr><td style='padding-left:10px; color:#ffbd35'>" + AEd.I18n.t("DPicker_from") + "</td><td colspan='3'><input id='aedDurationPickerFrom' style='margin-bottom:5px; width:70%' type='text' size='2' onchange='javascript: parent.AEdlibsduration.SetFromDate(this.value);  parent.AEdlibsduration.dateDiff()'><input type='button' value='...' onclick='javascript: parent.NewCssCal(10, 10, document.getElementById(\"aedDurationPickerFrom\"), document,  false, \"yyyyMMdd\", \"dropdown\", true, \"24\", true);'></td></tr>";

    pickerHtml += "<tr style='border-bottom:1px solid black'><td style='padding-left:10px; color:#ffbd35'>" + AEd.I18n.t("DPicker_to") + "</td><td colspan='3'><input id='aedDurationPickerTo' style='margin-bottom:10px; width:70%' type='text' size='2' onchange='javascript: parent.AEdlibsduration.SetToDate(this.value); parent.AEdlibsduration.dateDiff()'><input type='button' value='...' onclick='javascript: parent.NewCssCal(10, 10, document.getElementById(\"aedDurationPickerTo\"), document,  false, \"yyyyMMdd\", \"dropdown\", true, \"24\", true);'></td></tr>";

    pickerHtml += "<tr><td style='padding-left:10px'>" + AEd.I18n.t("DPicker_duration") + "</td><td style='padding-top:10px'><select id='aedDurationPickerDuration' style='margin-bottom:5px;" + operaWidth + "' onchange='javascript:parent.AEdlibsduration.SetDuration(this.value)'> <option>+</option> <option>-</option></select></td><td colspan='2'></td></tr>";

    pickerHtml += "<tr><td style='padding-left:10px'>" + AEd.I18n.t("DPicker_years") + "</td><td><input id='aedDurationPickerYears' style='margin-bottom:5px;" + operaWidth + "' type='text' size='2' onkeyup='javascript:parent.AEdlibsduration.SetYears(this.value)'></td><td style='padding-left:10px'>" + AEd.I18n.t("DPicker_hours") + "</td><td " + operaPadding + "><input  id='aedDurationPickerHours' style='margin-bottom:5px;" + operaWidth + "' type='text' size='2' onkeyup='javascript:parent.AEdlibsduration.SetHours(this.value)'></td></tr>";

    pickerHtml += "<tr><td style='padding-left:10px'>" + AEd.I18n.t("DPicker_months") + "</td><td><input id='aedDurationPickerMonths' style='margin-bottom:5px;" + operaWidth + "' type='text' size='2' onkeyup='javascript:parent.AEdlibsduration.SetMonths(this.value)'></td><td style='padding-left:10px'>" + AEd.I18n.t("DPicker_minutes") + "</td><td " + operaPadding + "><input id='aedDurationPickerMinutes' style='margin-bottom:5px;" + operaWidth + "' type='text' size='2' onkeyup='javascript:parent.AEdlibsduration.SetMinutes(this.value)'></td></tr>";

    pickerHtml += "<tr><td style='padding-left:10px'>" + AEd.I18n.t("DPicker_days") + "</td><td><input id='aedDurationPickerDays' style='margin-bottom:5px;" + operaWidth + "' type='text' size='2' onkeyup='javascript:parent.AEdlibsduration.SetDays(this.value)'></td><td style='padding-left:10px'>" + AEd.I18n.t("DPicker_seconds") + "</td><td " + operaPadding + "><input id='aedDurationPickerSeconds' style='margin-bottom:5px;" + operaWidth + "' type='text' size='2' onkeyup='javascript:parent.AEdlibsduration.SetSeconds(this.value)'></td></tr>";

    pickerHtml += "<tr style='text-align:center'><td colspan='4'><input style='width:60px; font-size:12px; margin-top:5px; margin-bottom:5px' onClick='javascript:parent.AEdlibsduration.writeValues(); parent.AEdlibsduration.hidePicker()'  type=\"button\" value=\"OK\">&nbsp;<input style='width:60px; font-size:12px; margin-top:5px; margin-bottom:5px' onClick='javascript: parent.AEdlibsduration.hidePicker()' type=\"button\" value=\"" + AEd.I18n.t("DPicker_cancel") + "\"></td></tr>";

    pickerHtml += "</tbody></table>\n</span>";
    pickerSpanID = "AEdlibsPickerSpan";

	if (!this.durationPickerWindow)
	{
		span = this.destinationFrame.createElement("span");
		span.id = pickerSpanID;
                span.style.background = "white";
		span.style.position = "absolute";
		span.style.left = (this.xCoord) + 'px';
		span.style.top = (this.yCoord) + 'px';
        	span.style.width = '280px';
 		span.style.border = "solid 1pt";
                span.style.boxShadow = '0 0 4px #444444';
                span.style.borderRadius = '4px 4px 4px 4px';
		span.style.padding = "0";
		span.style.cursor = "move";
		span.style.zIndex = 500000; 
		this.destinationFrame.body.appendChild(span);
		this.durationPickerWindow = this.destinationFrame.getElementById(pickerSpanID);
                this.durationPickerWindow.innerHTML = pickerHtml;
	}

        else {

          this.durationPickerWindow.style.height = '300px';
        }

     this.durationPickerWindow.style.display = 'block';

	

}

// --------------------------------------------------------------- isLeapYear
/**
 * Checks if the year is leap (code from http://www.sorcerers-isle.net/article/javascript_leap_year_check.html )
 *
 * @name isLeapYear
 * @memberOf AEd.libs.dateDiff
 * @function 
 * @param {Integer} year year.
 * @return {Boolean} True if the year is leap else False.
 */

AEd.libs.durationPicker.prototype.isLeapYear = function(year){

  return ((year%4 == 0) && (year%100 != 0 || year%400 == 0));
}

// --------------------------------------------------------------- dateDiff
/**
 * Calculates difference between two dates (code from http://www.codeproject.com/Articles/28837/Calculating-Duration-Between-Two-Dates-in-Years-Mo )
 *
 * @name dateDiff
 * @memberOf AEd.libs.dateDiff
 * @function 
 * @param {Date} fromDate form date and time (format YYYY/MM/DDTHH:MM:SS).
 * @param {Date} toDate to date and time (format YYYY/MM/DDTHH:MM:SS).
 */

AEd.libs.durationPicker.prototype.dateDiff = function(){


  if (this.fromDate != '' && this.toDate != ''){

     var TfromDate = new Date(this.fromDate.valueOf());

     var TtoDate = new Date(this.toDate.valueOf());

    
    if (TfromDate > TtoDate){
  
      var tmptoDate = new Date(TtoDate.valueOf());

      TtoDate.setFullYear(TfromDate.getFullYear());
      TtoDate.setMonth(TfromDate.getMonth());
      TtoDate.setDate(TfromDate.getDate());
      TtoDate.setHours(TfromDate.getHours());
      TtoDate.setMinutes(TfromDate.getMinutes());
      TtoDate.setSeconds(TfromDate.getSeconds());
      TtoDate.setMilliseconds(0);

      TfromDate.setFullYear(tmptoDate.getFullYear());
      TfromDate.setMonth(tmptoDate.getMonth());
      TfromDate.setDate(tmptoDate.getDate());
      TfromDate.setHours(tmptoDate.getHours());
      TfromDate.setMinutes(tmptoDate.getMinutes());
      TfromDate.setSeconds(tmptoDate.getSeconds());
      TfromDate.setMilliseconds(0);

      this.duration = '-';
    }
    
    else{

      this.duration = '+';
    }

    var increment = 0; 
    var dayIncrement = 0;


    // Seconds calculation

    this.seconds = Math.abs(TtoDate.getSeconds() - TfromDate.getSeconds());

    // Minutes calculation

    this.minutes = Math.abs(TtoDate.getMinutes() - TfromDate.getMinutes()); 

    // Hours calculation
    
    if (TfromDate.getHours() > TtoDate.getHours()){

      this.hours = Math.abs(24 - TfromDate.getHours() + TtoDate.getHours()); 
      dayIncrement = -1;
    }

    else{

      this.hours = Math.abs(TtoDate.getHours() - TfromDate.getHours());
    }

    // Days calculation


    if (TfromDate.getDate() > TtoDate.getDate())
    { 
      increment = this.monthDay[TfromDate.getMonth() - 1 + 1]; 
    }

    if (increment == -1)
    {
      if (this.isLeapYear(TfromDate.getFullYear()))
      {
        increment = 29;       
      } 
      
      else
      {
        increment = 28;
      }
    }
   
    if (increment != 0)
    {    
      this.days = (TtoDate.getDate() + increment) - TfromDate.getDate();
      increment = 0; 
    }

    else
    { 
      this.days = TtoDate.getDate() - TfromDate.getDate();
    }

    if (dayIncrement != 0){

      this.days = this.days + dayIncrement;
      dayIncrement = 0;

      if (TfromDate.getSeconds() > TtoDate.getSeconds() || TfromDate.getMinutes() > TtoDate.getMinutes()){

        this.hours--;
      }

      if (TfromDate.getSeconds() > TtoDate.getSeconds()){

        this.seconds = 60 - TfromDate.getSeconds() + TtoDate.getSeconds();
      }

      if (TfromDate.getMinutes() > TtoDate.getMinutes()){
     
        this.minutes = 60 - TfromDate.getMinutes() + TtoDate.getMinutes();
      }
    }
   
    // Months calculation

    if ((TfromDate.getMonth() + 1 + increment) > TtoDate.getMonth() + 1)
    {   
      this.months = (TtoDate.getMonth() + 1 + 12) - (TfromDate.getMonth() + 1 + increment);
      increment = 1;
    }

    else
    {
      
      if (TfromDate.getDate() > TtoDate.getDate()){

        increment = 1;
      }
       
      this.months = (TtoDate.getMonth() + 1) - (TfromDate.getMonth() + 1 + increment);
      increment = 0;
    }

    // Years calculation

    this.years = TtoDate.getFullYear() - (TfromDate.getFullYear() + increment); 

    this.changeInputsValues();
  }


}

// --------------------------------------------------------------- showPicker
/**
 * Shows duration picker window
 *
 * @name showPicker
 * @memberOf AEd.libs.durationPicker
 * @function 
 */

AEd.libs.durationPicker.prototype.showPicker = function(){

  if (this.durationPickerWindow != undefined && this.durationPickerWindow.style != undefined){

    this.durationPickerWindow.style.display = 'block';
  }
}


// *****************************************************************************
// class AEd.libs.durationPicker
// *****************************************************************************

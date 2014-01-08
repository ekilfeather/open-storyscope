/**
 * DlgTypeColors.js
 *
 * Contains AEd.ui.DlgTypeColors class definition. 
 *  
 * @authors: Petr Loukota, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.DlgTypeColors
// *****************************************************************************  



/**
 * This class creates DlgTypeColors.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *  
 *    {String}  title         - dialog title text, 
 *    {String}  width         - dialog width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height        - dialog height with or without units, e.g.: "300px" or "100%", default unit is px,  
 *    {String}  minWidth      - dialog minWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  minHeight     - dialog minHeight with or without units, e.g.: "300px" or "100%", default unit is px,   
 *    {String}  maxWidth      - dialog maxWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  maxHeight     - dialog maxHeight with or without units, e.g.: "300px" or "100%", default unit is px,    
 *    {String}  corners       - rounded dialog corners: "tl", "tr", "bl", "br", "top", "bottom", "right", "left", "all", "none", default is "all",  
 *    
 *    {Boolean} draggable     - will be dialog draggable?, 
 *    {Boolean} resizable     - will be dialog resizable?,  
 *    {Boolean} render        - determines wheteher dialog should be rendered after creating
 *    {Boolean} center        - determines wheteher dialog should be centered to screen after rendering
 *    {Boolean} allwaysOnTop  - will be this dialog allways in the front of other dialogs?,        
 *    
 *    {Boolean} showOverlay   - will the overlay layer be displayed?,    
 *    
 *    {Element} srcElement     - DOM element to create dialog from. 
 *    {Element} targetElement  - DOM element to render dialog to. Default is document.body. 
 *    {Element} contentElement - DOM element to place as a content of dialog. Default is none.
 * }
 * 
 * @name DlgTypeColors
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIDialog
 */
AEd.ui.DlgTypeColors = function(config) {
   
   var c = config || {};    
   
   c.title     = AEd.I18n.t("Dlg_typeColors_title");
   c.width     = AEd.CONFIG.DLG_TYPECOLORS_WIDTH;
   c.height    = AEd.CONFIG.DLG_TYPECOLORS_HEIGHT;    
   c.resizable = true;
   c.autoInit  = false;
   c.showOverlay = false;
   
   AEd.inheritFromObject(this, new AEd.ui.core.UIDialog(c));
   this.init(c);    
   
   this.addClass(AEd.CONFIG.CLASS_UI_DLG_TYPECOLORS);
   
   this.contentArea.loadFrom(AEd.CONFIG.DLG_TYPECOLORS_PATH);
    
   this.typeColors = null;
   this.trIndex = null;
   
   // *************************************************************************
   // EVENTS
   // *************************************************************************
   
   /**
    * Fires when key is up on aedTypeColorsType input element.
    * 
    * @event onInputTypeKeyUp                                                 
    */         
   this.onInputTypeKeyUp = new AEd.utils.Dispatcher();
   
   /**
    * Fires when btnBrowse is clicked.
    * 
    * @event onBrowseTypes                                                 
    */         
   this.onBrowseTypes = new AEd.utils.Dispatcher();
   
   
   // Buttons
   this.btnClose    = new AEd.ui.core.UIButton({icon: "close"});    
   this.btnOk       = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_typeColors_button_ok"), toggle: false});
   this.btnCancel   = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_typeColors_button_cancel"), toggle: false});      
   
   this.buttonsArea.addItem(this.btnOk);
   this.buttonsArea.addItem(this.btnCancel);
   this.headerButtonsArea.addItem(this.btnClose);

   if (!AEd.isAppleSafari){   // Safari has problem with context (document namespace)

     this.suggestionsBar = new AEd.ui.SuggestionsBar({render: false});
   }
   
   // Inputs
   this.iframe = this.contentArea.domElementIframe; 
   this.elementIframe = AEd.$(this.iframe);    
  
   this.onRender.addHandler(function() {   

       // Browsers compatibility
   
       var dstIframe;       

       if (window.opera){  // Opera compatibility
         
         dstIframe = this.iframe;
       }

       else {

         dstIframe  = this.iframe.contentWindow;
       }
        
       AEd.Events.addHandler(dstIframe, "load", function(e) {
           this.contentLoaded = true;
           
           this.setWidth(this.width);
           this.setHeight(this.height);   
           this.iframeDocument       = this.iframe.contentWindow.document;
           
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnDragStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnDragIframeMove, this);
           AEd.Events.addHandler(this.iframeDocument, "mouseup", this.fnOnResizeStop, this);
           AEd.Events.addHandler(this.iframeDocument, "mousemove", this.fnOnResizeIframeMove, this);
           
           if (AEd.isAppleSafari){  // Safari support - context parameter

              this.suggestionsBar = new AEd.ui.SuggestionsBar({render: false, context: this.iframeDocument});
           }

           this.domElementInputType       = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPECOLORS_ID_TYPE);     
           this.domElementSuggestions     = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPECOLORS_ID_SUGGESTIONS);                          
           this.domElementBtnBrowse       = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPECOLORS_ID_BTN_BROWSE);
           this.btnBrowse                 = new AEd.ui.core.UIButton({srcElement: this.domElementBtnBrowse});
           this.domElementInputColor      = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPECOLORS_ID_COLOR);
           this.domElementInputAlpha      = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPECOLORS_ID_ALPHA);
			  this.domElementInputFontColor      = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPECOLORS_ID_FONTCOLOR);
			  this.domElementInputBold      = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPECOLORS_ID_BOLD);
			  this.domElementInputItalic      = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPECOLORS_ID_ITALIC);
			  this.domElementInputUnderlined      = this.iframeDocument.getElementById(AEd.CONFIG.DLG_TYPECOLORS_ID_UNDERLINED);
           
           this.elementInputType          = AEd.$(this.domElementInputType);  
           this.elementSuggestions        = AEd.$(this.domElementSuggestions);
           this.elementInputColor         = AEd.$(this.domElementInputColor);
           this.elementInputAlpha         = AEd.$(this.domElementInputAlpha);             
			  this.elementInputFontColor         = AEd.$(this.domElementInputFontColor);          
			  this.elementInputBold         = AEd.$(this.domElementInputBold);          
			  this.elementInputItalic         = AEd.$(this.domElementInputItalic);          
			  this.elementInputUnderlined         = AEd.$(this.domElementInputUnderlined);          
			  
           this.suggestionsBar.render(this.domElementSuggestions);           
           this.suggestionsBar.hide();

           jscolor.setDocContext(this.iframeDocument);
           jscolor.setInput(this.domElementInputColor);
           jscolor.init();

           jscolor.setDocContext(this.iframeDocument);
           jscolor.setInput(this.domElementInputFontColor);
           jscolor.init();
           
           AEd.Events.addHandler(this.iframeDocument, "click", function(e) { 
               this.suggestionsBar.hide();
          },this);
          
          this.suggestionsBar.onClick.addHandler( function (item) {
               this.suggestionBarOnClick(item); 
           }, this);
           
           this.elementInputType.addEventHandler("keydown", function(e) {
              this.elementInputTypeKeyDown(e);               
           }, this);     
           
           this.elementInputType.addEventHandler("keyup", function(e) {
               this.elementInputTypeKeyUp(e);               
           }, this);
          
          this.btnBrowse.onClick.addHandler(function() {
              if (!this.btnBrowse.isDisabled) {
                  this.onBrowseTypes.fire();
              }                            
          }, this); 
          
          this.reset(); 
      }, this);
   },this );
}



AEd.ui.DlgTypeColors.prototype.constructor = AEd.ui.DlgTypeColors;

AEd.inheritFromPrototype(AEd.ui.DlgTypeColors, AEd.ui.core.UIDialog);



// -------------------------------------------------------------------- getType
/**
 * Gets value of "aedTypeColorsType" input in typeColors dialog.
 *
 * @name getType
 * @memberOf AEd.ui.DlgTypeColors 
 * @function   
 * @return {String} Value of aedTypeColorsType input.
 */
AEd.ui.DlgTypeColors.prototype.getType = function() {
    if (this.contentLoaded) {
        if (this.domElementInputType) {
            return this.domElementInputType.value;  
        }
        else {
            return null;
        }
    }
}



// -------------------------------------------------------------------- setType
/**
 * Sets value of "aedTypeColorsType" input in typeColors dialog.
 *
 * @name setType
 * @memberOf AEd.ui.DlgTypeColors 
 * @function  
 * @param {String} newValue New Value of aedTypeColorsType input.  
 */
AEd.ui.DlgTypeColors.prototype.setType = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputType) {
            this.domElementInputType.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setType(newValue);
        }, this);     
    }
}



// -------------------------------------------------------------------- getColor
/**
 * Gets value of "aedTypeColorsColor" input in typeColors dialog.
 *
 * @name getColor
 * @memberOf AEd.ui.DlgTypeColors 
 * @function   
 * @return {String} Value of aedTypeColorsColor input.
 */
AEd.ui.DlgTypeColors.prototype.getColor = function() {
    if (this.contentLoaded) {
        if (this.domElementInputColor) {
            return this.domElementInputColor.value;  
        }
        else {
            return null;
        }
    }
}
// -------------------------------------------------------------------- getFontColor
/**
 * Gets value of "aedTypeColorsFontColor" input in typeColors dialog.
 *
 * @name getFontColor
 * @memberOf AEd.ui.DlgTypeColors 
 * @function   
 * @return {String} Value of aedTypeColorsFontColor input.
 */
AEd.ui.DlgTypeColors.prototype.getFontColor = function() {
	  
    if (this.contentLoaded) {
        if (this.domElementInputFontColor) {
            return this.domElementInputFontColor.value;  
        }
        else {
            return null;
        }
    }
}
// -------------------------------------------------------------------- getFont
/**
 * Gets value of "aedTypeColorsFont" input in typeColors dialog.
 *
 * @name getFont
 * @memberOf AEd.ui.DlgTypeColors 
 * @function   
 * @return {String} Value of aedTypeColorsFont input.
 */
AEd.ui.DlgTypeColors.prototype.getFont = function() {
    if (this.contentLoaded) {
        if (this.domElementInputFont) {
            return this.domElementInputFont.value;  
        }
        else {
            return null;
        }
    }
}
// --------------------------------------------------------------------- getBold
/**
 * Gets value of "aedTypeColorsBold" input in typeColors dialog.
 *
 * @name getBold
 * @memberOf AEd.ui.DlgTypeColors 
 * @function   
 * @return {Boolean} true if input element is checked.
 */
AEd.ui.DlgTypeColors.prototype.getBold = function() {
    if (this.contentLoaded) {
        if (this.domElementInputBold) {
            return this.domElementInputBold.checked;  
        }
        else {
            return null;
        }
    }
}
// ------------------------------------------------------------------- getItalic
/**
 * Gets value of "aedTypeColorsItalic" input in typeColors dialog.
 *
 * @name getItalic
 * @memberOf AEd.ui.DlgTypeColors 
 * @function   
 * @return {Boolean} true if input element is checked.
 */
AEd.ui.DlgTypeColors.prototype.getItalic = function() {
    if (this.contentLoaded) {
        if (this.domElementInputItalic) {
            return this.domElementInputItalic.checked;  
        }
        else {
            return null;
        }
    }
}
// --------------------------------------------------------------- getUnderlined
/**
 * Gets value of "aedTypeColorsUnderlined" input in typeColors dialog.
 *
 * @name getUnderlined
 * @memberOf AEd.ui.DlgTypeUnderluned
 * @function   
 * @return {Boolean} true if input element is checked.
 */
AEd.ui.DlgTypeColors.prototype.getUnderlined = function() {
    if (this.contentLoaded) {
        if (this.domElementInputUnderlined) {
            return this.domElementInputUnderlined.checked;  
        }
        else {
            return null;
        }
    }
}


// -------------------------------------------------------------------- setColor
/**
 * Sets value of "aedTypeColorsColor" input in typeColors dialog.
 *
 * @name setColor
 * @memberOf AEd.ui.DlgTypeColors 
 * @function  
 * @param {String} newValue New Value of aedTypeColorsColor input.  
 */
AEd.ui.DlgTypeColors.prototype.setColor = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputColor) {
            this.domElementInputColor.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setColor(newValue);
        }, this);     
    }
}



// -------------------------------------------------------------------- setBold
/**
 * Sets value of "aedTypeColorsBold" input in typeColors dialog.
 *
 * @name setBold
 * @memberOf AEd.ui.DlgTypeColors 
 * @function  
 * @param {String} newValue New Value of aedTypeColorsBold input.  
 */
AEd.ui.DlgTypeColors.prototype.setBold = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputBold) {
            this.domElementInputBold.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setBold(newValue);
        }, this);     
    }
}


// ------------------------------------------------------------------- setItalic
/**
 * Sets value of "aedTypeColorsItalic" input in typeColors dialog.
 *
 * @name setItalic
 * @memberOf AEd.ui.DlgTypeColors 
 * @function  
 * @param {String} newValue New Value of aedTypeColorsItalic input.  
 */
AEd.ui.DlgTypeColors.prototype.setItalic = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputItalic) {
            this.domElementInputItalic.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setItalic(newValue);
        }, this);     
    }
}


//---------------------------------------------------------------- setUnderlined
/**
 * Sets value of "aedTypeColorsUnderlined" input in typeColors dialog.
 *
 * @name setBold
 * @memberOf AEd.ui.DlgTypeColors 
 * @function  
 * @param {String} newValue New Value of aedTypeColorsUnderlined input.  
 */
AEd.ui.DlgTypeColors.prototype.setUnderlined = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputUnderlined) {
            this.domElementInputUnderlined.checked = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setUnderlined(newValue);
        }, this);     
    }
}


// -------------------------------------------------------------------- setColor
/**
 * Sets value of "aedTypeColorsFontColor" input in typeColors dialog.
 *
 * @name setFontColor
 * @memberOf AEd.ui.DlgTypeColors 
 * @function  
 * @param {String} newValue New Value of aedTypeColorsFontColor input.  
 */
AEd.ui.DlgTypeColors.prototype.setFontColor = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputFontColor) {
            this.domElementInputFontColor.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setFontColor(newValue);
        }, this);     
    }
}


// -------------------------------------------------------------------- setColor
/**
 * Sets value of "aedTypeColorsFont" input in typeColors dialog.
 *
 * @name setFont
 * @memberOf AEd.ui.DlgTypeColors 
 * @function  
 * @param {String} newValue New Value of aedTypeColorsFont input.  
 */
AEd.ui.DlgTypeColors.prototype.setFont = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputFont) {
            this.domElementInputFont.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setFont(newValue);
        }, this);     
    }
}


// -------------------------------------------------------------------- getAlpha
/**
 * Gets value of "aedTypeColorsAlpha" input in typeColors dialog.
 *
 * @name getAlpha
 * @memberOf AEd.ui.DlgTypeColors 
 * @function   
 * @return {String} Value of aedTypeColorsAlpha input.
 */
AEd.ui.DlgTypeColors.prototype.getAlpha = function() {
    if (this.contentLoaded) {
        if (this.domElementInputAlpha) {
            return this.domElementInputAlpha.value;  
        }
        else {
            return null;
        }
    }
}



// -------------------------------------------------------------------- setAlpha
/**
 * Sets value of "aedTypeColorsAlpha" input in typeColors dialog.
 *
 * @name setAlpha
 * @memberOf AEd.ui.DlgTypeColors 
 * @function  
 * @param {String} newValue New Value of aedTypeColorsAlpha input.  
 */
AEd.ui.DlgTypeColors.prototype.setAlpha = function(newValue) {
    if (this.contentLoaded) {
        if (this.domElementInputAlpha) {
            this.domElementInputAlpha.value = newValue;
        }
    }
    else {
        AEd.Events.addHandler(this.iframe.contentWindow, "load", function(e) {
            this.setAlpha(newValue);
        }, this);     
    }
}



// ---------------------------------------------------------------- convertHexaToDec
/**
 * Converts number in hexadecimal to decimal.
 *
 * @name convertHexaToDec
 * @memberOf AEd.ui.DlgTypeColors 
 * @function  
 * @param {String} hexa Number in hexadecimal.
 * @return (String) hexa Number in decimal.    
 */
AEd.ui.DlgTypeColors.prototype.convertHexaToDec = function(hexa) {


     var dec = 0;
     var curDigit = null;
     var power = 0;
     
     while (hexa.length - power != 0) {
        curDigit = hexa[hexa.length - power - 1];
        if (curDigit == "A") { curDigit = "10"; }
        else if (curDigit == "B") { curDigit = "11"; }
        else if (curDigit == "C") { curDigit = "12"; }
        else if (curDigit == "D") { curDigit = "13"; }
        else if (curDigit == "E") { curDigit = "14"; }
        else if (curDigit == "F") { curDigit = "15"; }
        dec += parseInt(curDigit) * Math.pow(16, power);
        power++;
     }
     
     return dec;
}



// ---------------------------------------------------------------- convertDecToHexa
/**
 * Converts number in decimal to hexadecimal.
 *
 * @name convertDecToHexa
 * @memberOf AEd.ui.DlgTypeColors 
 * @function 
 * @param {Integer} dec Number in decaimal.
 * @return (String) hexa Number in hexadecimal.    
 */
AEd.ui.DlgTypeColors.prototype.convertDecToHexa = function(dec) {

     var hexa = "";
     var result = dec;
     var rem = null;
     
     if (result == 0) {
        hexa = result;
     }
     else {
        while (result != 0) {
            rem = result % 16;
            if (rem == 10) { rem = "A"; }
            else if (rem == 11) { rem = "B"; }
            else if (rem == 12) { rem = "C"; }
            else if (rem == 13) { rem = "D"; }
            else if (rem == 14) { rem = "E"; }
            else if (rem == 15) { rem = "F"; }
            hexa = rem + hexa;
            result = Math.floor(result / 16);   
        }
     }
     if (hexa.length < 2) {
        hexa = "0" + hexa;
     }
     
     return hexa;
}



// ---------------------------------------------------------------- setTypeColors
/**
 * Set type, color and alpha from table.
 *
 * @name setTypeColors
 * @memberOf AEd.ui.DlgTypeColors 
 * @function  
 * @param {String} name Type name from table.
 * @param {String} value Color value from table.   
 */
AEd.ui.DlgTypeColors.prototype.setTypeColors = function(name, value) {
    if (this.contentLoaded) {
		 var valueArray = value.split(';');
        if (name) {
            this.setType(name);
        }
		  //color
        if (valueArray[0] && valueArray[0].match(/^rgba\(\d+,\d+,\d+,\d+(\.\d+)?\)$/)) {
            
            var color = "";
            var alpha = "";
            var integers = valueArray[0].substr("rgba(".length, value.length);
            integers = integers.substr(0, integers.length - 1);
            integers = integers.split(",");
            for (var i in integers) {
                if (i < 3) { // rgb
                    if (integers[i] < 0 || integers[i] > 255) {
                        integers[i] = 0;
                    }
                    // decimal to hexadecimal
                    color += this.convertDecToHexa(integers[i]);
                }
                else { // alpha
                    if (integers[i] < 0.0 || integers[i] > 1.0) {
                        integers[i] = 1;
                    }
                    alpha = integers[i] * 100;
                }
            }
            this.setColor(color);
            this.domElementInputColor.style.background = "#" + color;
            this.domElementInputColor.color.fromString(color); // Update JSColor initial value
            this.setAlpha(alpha);                
        }
        else {
            this.setColor("8A8A8A");
            this.domElementInputColor.style.background = "#8A8A8A";
            this.domElementInputColor.color.fromString("8A8A8A"); // Update JSColor initial value
            this.setAlpha("100");
        }
		  // fontColor
		  if (valueArray[1] && valueArray[1].match(/^rgba\(\d+,\d+,\d+,\d+(\.\d+)?\)$/)) {
            
            var color = "";
            var integers = valueArray[1].substr("rgba(".length, value.length);
            integers = integers.substr(0, integers.length - 1);
            integers = integers.split(",");
            for (var i in integers) {
                if (i < 3) { // rgb
                    if (integers[i] < 0 || integers[i] > 255) {
                        integers[i] = 0;
                    }
                    // decimal to hexadecimal
                    color += this.convertDecToHexa(integers[i]);
                }               
            }
            this.setFontColor(color);
            this.domElementInputFontColor.style.background = "#" + color;
            this.domElementInputFontColor.color.fromString(color); // Update JSColor initial value
            this.setAlpha(alpha);
        }
        else {
            this.setFontColor("8A8A8A");
            this.domElementInputColor.style.background = "#8A8A8A";
            this.domElementInputFontColor.color.fromString("#8A8A8A"); // Update JSColor initial value
        }
		  //Bold
		  if(valueArray[2] == "true"){
			  this.domElementInputBold.checked = "checked";
		  } else {
			  this.domElementInputBold.checked = null;
		  }
		  //Italic
        if(valueArray[3] == "true"){
			  this.domElementInputItalic.checked = "checked";
		  } else {
			  this.domElementInputItalic.checked = null;
		  }
		  //underlined
		  if(valueArray[4] == "true"){
			  this.domElementInputUnderlined.checked = "checked";
		  } else {
			  this.domElementInputUnderlined.checked = null;
		  }
        this.storeTypeColors(this.typeColors);
    }
}



// ------------------------------------------------------------- storeTypeColors
/**
 * Stores changes in typeColors dialog.
 *
 * @name storeTypeColors
 * @memberOf AEd.ui.DlgTypeColors 
 * @function 
 * @param {Object} typeSettings Object of typeSettings   
 */
AEd.ui.DlgTypeColors.prototype.storeTypeColors = function(typeSettings) { 

    if (typeSettings) {
        typeSettings.typePath = this.getType();
        typeSettings.color = this.getColor();
        typeSettings.alpha = this.getAlpha(); 
		  typeSettings.fontColor = this.getFontColor();		  
		  typeSettings.italic = (this.getItalic()) ? true: false;
		  typeSettings.bold = (this.getBold()) ? true: false;
		  typeSettings.underlined = (this.getUnderlined()) ? true: false;;
    }
	
}



// ------------------------------------------------------------ checkTypeColors
/**
 * Checks typeColors before setting to table.
 *
 * @name checkTypeColors
 * @memberOf AEd.ui.DlgTypeColors 
 * @function 
 * @param {Object} typeColors Object of typeColors  
 * @return {Boolean} True / false   
 */
AEd.ui.DlgTypeColors.prototype.checkTypeColors = function(typeColors) {
 
 this.storeTypeColors(typeColors);
    // type - can be anything or empty
    
    // color - 000000-FFFFFF
    var color = typeColors.color;
    if (!color.match(/^([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])$/)) {
        return false;
    }
	 
	 var fontColor = typeColors.fontColor;
    if (!fontColor.match(/^([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])([0-9]|[a-fA-F])$/)) {
        return false;
    }

    // alpha - 0-100
    var regExpE = new RegExp("e", 'i');
    var alpha = typeColors.alpha;
    if (!alpha || !isFinite(alpha) || alpha.search(/\./) >= 0 || 
        alpha.search(regExpE) >= 0 || alpha < 0 || alpha > 100) {
        return false;
    }
    
    // hexadecimal to decimal
    aColor = new Array();
    aColor[0] = color[0] + color[1];
    aColor[1] = color[2] + color[3];
    aColor[2] = color[4] + color[5];

    typeColors.color = new Array();
    for (var i in aColor) {
        typeColors.color[i] = this.convertHexaToDec(aColor[i]);
    }
	 typeColors.alpha = typeColors.alpha / 100;
	 typeColors.colorRGB = "rgba(";
    for (var i in typeColors.color) {
        typeColors.colorRGB += typeColors.color[i] + ",";
    }
	 
	 typeColors.colorRGB += typeColors.alpha + ")";
	 
	 aFontColor = new Array();
    aFontColor[0] = fontColor[0] + fontColor[1];
    aFontColor[1] = fontColor[2] + fontColor[3];
    aFontColor[2] = fontColor[4] + fontColor[5];	 
	 
	 typeColors.fontColor = new Array();
    for (var i in aFontColor) {
        typeColors.fontColor[i] = this.convertHexaToDec(aFontColor[i]);
    }
	 	 typeColors.fontColorRGB = "rgba(";
    for (var i in typeColors.color) {
        typeColors.fontColorRGB += typeColors.fontColor[i] + ",";
    }
	 
	 typeColors.fontColorRGB += "1)";
	 
    return true;
}



// ---------------------------------------------------------------------- reset
/**
 * Resets the DlgTypeColors dialog
 *
 * @name reset
 * @memberOf AEd.ui.DlgTypeColors 
 * @function   
 */
AEd.ui.DlgTypeColors.prototype.reset = function() {

    
    this.typeColors = {};
    this.typeColors.typePath = "";
    this.typeColors.color = "";
    this.typeColors.alpha = "";
    
    this.setType("");
    this.setColor("");
    this.setAlpha("");    
    
}



// --------------------------------------------------------------- elementInputTypeKeyDown
/**
 * Suggestion bar control when key down
 *
 * @name elementInputTypeKeyDown
 * @memberOf AEd.ui.DlgTypeColors 
 * @function
 * @param {AEd.Events} e event
 */
AEd.ui.DlgTypeColors.prototype.elementInputTypeKeyDown = function(e) {  
    var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event); 
    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 40: // down arrow
            this.suggestionsBar.selectNextItem();
            this.suggestionsBar.show();
            AEd.Events.preventDefault(event);
        break;
                   
        case 38: // up arrow
            this.suggestionsBar.selectPreviousItem();
        break;                                
        default:
        break;
    }            
}



// --------------------------------------------------------------- elementInputTypeKeyUp
/**
 * Suggestion bar control when key up
 *
 * @name elementInputTypeKeyUp
 * @memberOf AEd.ui.DlgTypeColors 
 * @function
 * @param {AEd.Events} e event 
 */
AEd.ui.DlgTypeColors.prototype.elementInputTypeKeyUp = function(e) {  
    var event = AEd.Events.getEvent(e); 
    var target = AEd.Events.getTarget(event);
    var code = (event.charCode) ? event.charCode : ( (event.keyCode) ? event.keyCode : (event.which) ? event.which : 0);
    switch (code) { 
        case 13: // enter or right arrow
        case 39:
            if (!this.suggestionsBar.isHidden) {
                if (this.suggestionsBar.selectedItem) {
                    if (this.suggestionsBar.selectedItem.isSimpleType()) {
                        this.setType(this.suggestionsBar.selectedItem.getName());
                    }
                    else if (!this.suggestionsBar.selectedItem.isSimpleType()) {
                        this.setType(this.suggestionsBar.selectedItem.getText());
                    }        
                }
            this.suggestionsBar.hide();
            }
        break;
                                     
        default:
            if ( ((code > 31) && (code != 37) && (code != 38) && (code != 39) && (code != 40)) || (code == 8) )  {
                this.onInputTypeKeyUp.fire();
            }
            this.suggestionsBar.show();                       
        break;
    }    
}



// --------------------------------------------------------------- suggestionBarOnClick
/**
 * Suggestion bar control when clicked
 *
 * @name suggestionBarOnClick
 * @memberOf AEd.ui.DlgTypeColors 
 * @function
 * @param {Item} item of suggestion bar 
 */
AEd.ui.DlgTypeColors.prototype.suggestionBarOnClick = function(item) {
    if (this.suggestionsBar.selectedItem.isSimpleType()) {
        this.setType(this.suggestionsBar.selectedItem.getName());
    }
    else if (!this.suggestionsBar.selectedItem.isSimpleType()) {
        this.setType(this.suggestionsBar.selectedItem.getText());
    }
    this.suggestionsBar.hide();    
}



// *****************************************************************************
// class AEd.ui.DlgTypeColors
// *****************************************************************************

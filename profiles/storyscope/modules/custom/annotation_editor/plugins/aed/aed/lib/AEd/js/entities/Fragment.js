/**
 * Fragment.js
 *
 * Contains AEd.entities.Fragment class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota 
 * 
 */
 

// *****************************************************************************
// class AEd.entities.Fragment
// *****************************************************************************  



/**
 * This class represents Fragment entity.
 * 
 * @example
 * oParams {
 *        wFragmentPath : XPath (String),  
 *        wFragmentOffset : Number,
 *        wFragmentLength : Number,
 *        wFragmentText : (String),  
 *        fragmentID: (String),
 *        fragmentElement (DOM Element)
 *        targetElement (DOM Element) where to render annotation popups   
 *        
 *        wysiwyg: {AEd.wysiwyg.WysiwygEditor}                                         
 * }     
 *
 * @name Fragment
 * @memberOf AEd.entities      
 * @class 
 * @param {Object} oParams Fragment parameters. 	 
 * @param {AEd.entities.Annotation or AEd.entities.Suggestion} annotation Optional - Annotation or suggestion to assign to this fragment. 	  	  
 */
AEd.entities.Fragment = function(oParams, annotation) {
	if (!oParams) {
		throw new Error(AEd.I18n.t("Error_AEd_entites_Fragment_Missing_params_object_argument"));
	}

        this.wFragmentPath      = oParams.wFragmentPath;
	this.wFragmentOffset    = oParams.wFragmentOffset; 
	this.wFragmentLength    = oParams.wFragmentLength; 
	this.wFragmentText      = oParams.wFragmentText; 
    
	this.fragmentID         = oParams.fragmentID;    
        this.domElementFragment = oParams.fragmentElement;
	this.elementFragment    = AEd.$(this.domElementFragment);
	this.wysiwyg            = oParams.wysiwyg;
    
	// array of assigned annotations or suggestions
	this.annotations = new Array();
	this.dontHideAnnotations = false;
	this.dontShowAnnotations = false;
	this.isHighlighted       = false;
	this.modeAnnotationLink  = false;
    
	/**
     * Fires when annotation or suggestion is assigned or removed to this fragment
     * 
     * @event onAnnotationsChanged                                                  
     */   
	this.onAnnotationsChanged = new AEd.utils.Dispatcher();  
       
	/**
     * Fires before showAnnotations method is executed
     * 
     * @event onShowAnnotations    
     * @param {AEd.entities.Fragment} fragment Target fragment                                                   
     */   
	this.onShowAnnotations = new AEd.utils.Dispatcher(); 
       
	/**
     * Fires before hideAnnotations method is executed
     * 
     * @event onHideAnnotations    
     * @param {AEd.entities.Fragment} fragment Target fragment                                                   
     */   
	this.onHideAnnotations = new AEd.utils.Dispatcher();        
    
	/**
     * Fires when user clicks on fragment
     * 
     * @event onFragmentClicked    
     * @param {AEd.entities.Fragment} fragment Target fragment                                                   
     */   
	this.onFragmentClicked = new AEd.utils.Dispatcher();        
    
	/**
     * Fires when user clicks on fragment to selected annotation link
     * 
     * @event onFragmentAnnoLinkSelected    
     * @param {AEd.entities.Fragment} fragment Target fragment                                                   
     */   
	this.onFragmentAnnoLinkSelected = new AEd.utils.Dispatcher();      
     
    
	this.c = {};
	this.c.targetElement = oParams.targetElement;
	this.c.render = false;
	if (annotation instanceof AEd.entities.Annotation) {
		this.c.title = AEd.I18n.t("Annotations");
	}
	else if (annotation instanceof AEd.entities.Suggestion) {
		this.c.title = AEd.I18n.t("Suggestions");
	} 
	this.c.width = AEd.CONFIG.DLG_FRAGMENT_WIDTH;
	this.c.height = AEd.CONFIG.DLG_FRAGMENT_HEIGHT; 
   
	this.onAnnotationsChanged.addHandler(function(){ 
        if (this.annotations.length > 1) {
			this.elementFragment.removeClass(AEd.CONFIG.CLASS_UI_FRAGMENT_MULTI);
			this.elementFragment.addClass(AEd.CONFIG.CLASS_UI_FRAGMENT_MULTI);
		}
		else {
			this.elementFragment.removeClass(AEd.CONFIG.CLASS_UI_FRAGMENT_MULTI);
		}
       
        if (this.ui) {
            var annotationInstance = false;
		    var suggestionInstance = false;
		    for (var i = 0; i < this.annotations.length; i++) {
			    this.ui.contentArea.addItem(this.annotations[i].ui);
			    if (this.annotations[i] instanceof AEd.entities.Annotation) {
				    annotationInstance = true;
			    }
			    if (this.annotations[i] instanceof AEd.entities.Suggestion) {
				    suggestionInstance = true;
			    }
		    }    
        
		    var title = "";
		    if (annotationInstance && suggestionInstance) {
			    title = AEd.I18n.t("Annotations_and_suggestions");
		    }
		    else if (annotationInstance) {
			    title = AEd.I18n.t("Annotations");
		    }
		    else if (suggestionInstance) {
			    title = AEd.I18n.t("Suggestions");    
		    }
        
		    this.ui.setTitle(title + " (" + this.annotations.length + ")");
        }
        
		this.updateColor();
	}, this);    
    
	if (annotation instanceof AEd.entities.Annotation || annotation instanceof AEd.entities.Suggestion) {
		this.assignAnnotation(annotation);
	}

	this.elementFragment.addEventHandler("click", function (e) {
		this.onFragmentClicked.fire(this);
		if (this.modeAnnotationLink) {
			this.onFragmentAnnoLinkSelected.fire(this);
		}
		else if (!this.dontShowAnnotations) {
			var event = AEd.Events.getEvent(e);
			AEd.Events.stopPropagation(event);
			this.dontHideAnnotations = true;
		}      
	}, this);

	this.elementFragment.addEventHandler("mouseover", function (e) { 
		if (!this.ui) {
			var event = AEd.Events.getEvent(e);
			AEd.Events.stopPropagation(event);
			if (!this.dontShowAnnotations) {
				this.showAnnotations(annotation);
			}               
		}  
		this.elementFragment.addClass(AEd.CONFIG.CLASS_UI_FRAGMENT_HOVER);
        
		if (this.modeAnnotationLink) {
			this.elementFragment.addClass(AEd.CONFIG.CLASS_UI_FRAGMENT_ANNOLINK_HOVER);
		}                
	}, this);  
      
	this.elementFragment.addEventHandler("mouseout", function (e) {
		if (this.ui) {
			var event = AEd.Events.getEvent(e);
			AEd.Events.stopPropagation(event);        
			if (!this.dontHideAnnotations) {
				this.hideAnnotations();
			}             
		} 
		this.elementFragment.removeClass(AEd.CONFIG.CLASS_UI_FRAGMENT_HOVER); 
		this.elementFragment.removeClass(AEd.CONFIG.CLASS_UI_FRAGMENT_ANNOLINK_HOVER);          
	}, this);       
}


AEd.entities.Fragment.prototype.constructor = AEd.entities.Fragment;


// ----------------------------------------------------------- assignAnnotation
/**
 * Assigns specified annotation or suggestion to this fragment.
 *  
 * @name assignAnnotation
 * @memberOf AEd.editors.Fragment
 * @function
 * @param {AEd.entities.Annotation or AEd.entities.Suggestion} annotation Annotation or suggestion instance to asign 	
 */
AEd.entities.Fragment.prototype.assignAnnotation = function(annotation) {
	if (annotation instanceof AEd.entities.Annotation || annotation instanceof AEd.entities.Suggestion) {
		this.annotations.push(annotation);
		if (this.ui) {
			this.ui.contentArea.addItem(annotation.ui);
		}        
		this.onAnnotationsChanged.fire();
	}  
} 


// ----------------------------------------------------------- removeAnnotation
/**
 * Removes specified annotation or suggestion from this fragment.
 *  
 * @name removeAnnotation
 * @memberOf AEd.editors.Fragment
 * @function
 * @param {AEd.entities.Annotation or AEd.entities.Suggestion} annotation Annotation or suggestion instance to remove 	
 */
AEd.entities.Fragment.prototype.removeAnnotation = function(annotation) {
	if (annotation instanceof AEd.entities.Annotation || annotation instanceof AEd.entities.Suggestion) {
		for (var i = 0; i < this.annotations.length; i++) {
			if (annotation === this.annotations[i]) {
				if (this.ui) {
					this.ui.contentArea.removeItem(this.annotations[i].ui);
				}
				this.annotations.splice(i,1);                 
				this.onAnnotationsChanged.fire();
				break;
			}
		}
	}  
} 




// ----------------------------------------------------- getAssignedAnnotations
/**
 * Returns array of assigned annotations or suggestions.
 *  
 * @name getAssignedAnnotations
 * @memberOf AEd.editors.Fragment
 * @function
 * @return {Array} Array of assigned annotations or suggestions 	
 */
AEd.entities.Fragment.prototype.getAssignedAnnotations = function() {
	return this.annotations;
} 



// ------------------------------------------------------------ showAnnotations
/**
 * Shows ui dialog with assigned annotations or suggestions.
 *  
 * @name showAnnotations
 * @memberOf AEd.editors.Fragment
 * @function
 * @param {AEd.entities.Annotation or AEd.entities.Suggestion} annotation Annotation or suggestion instance to show 
 */
AEd.entities.Fragment.prototype.showAnnotations = function(annotation) {
	this.onShowAnnotations.fire(this);
	if (!this.ui) {
		this.ui = new AEd.ui.core.UIDialog(this.c);
		var btnClose = new AEd.ui.core.UIButton({
			icon: "close"
		}); 
		this.ui.headerButtonsArea.addItem(btnClose);
		btnClose.onClick.addHandler(this.hideAnnotations, this);
		this.ui.contentArea.addClass("aed-ui-dlg-overflowy");
        
		var annotationInstance = false;
		var suggestionInstance = false;
		for (var i = 0; i < this.annotations.length; i++) {
			this.ui.contentArea.addItem(this.annotations[i].ui);
			if (this.annotations[i] instanceof AEd.entities.Annotation) {
				annotationInstance = true;
			}
			if (this.annotations[i] instanceof AEd.entities.Suggestion) {
				suggestionInstance = true;
			}
		}    
        
		var title = "";
		if (annotationInstance && suggestionInstance) {
			title = AEd.I18n.t("Annotations_and_suggestions");
		}
		else if (annotationInstance) {
			title = AEd.I18n.t("Annotations");
		}
		else if (suggestionInstance) {
			title = AEd.I18n.t("Suggestions");    
		}
        
		this.ui.setTitle(title + " (" + this.annotations.length + ")");    
		this.ui.render(); 
        
        
		var x = 0;
		var y = 0;
		var offsetY = 10;
        
		var iframe = this.wysiwyg.getIFrameElement();
        
		if (iframe) {
			x += AEd.ElU.getAbsPosX(iframe);
			y += AEd.ElU.getAbsPosY(iframe);
            
			x -= AEd.DOM.getScrollX(this.wysiwyg.getDocument(), this.wysiwyg.getWindow());
			y -= AEd.DOM.getScrollY(this.wysiwyg.getDocument(), this.wysiwyg.getWindow());
		}        
    
		x += this.elementFragment.getAbsPosX();  
		y += this.elementFragment.getAbsPosY();     
		y += this.elementFragment.getMaxHeight() + offsetY;  
           
		if ((y + this.ui.elementRoot.getMaxHeight()) > (AEd.DOM.getClientHeight() + AEd.DOM.getScrollY())) {
			if ((y - this.elementFragment.getMaxHeight() - this.ui.elementRoot.getMaxHeight() - offsetY) < (0 + AEd.DOM.getScrollY()) )  {
			}
			else {
				y -= (this.elementFragment.getMaxHeight() + this.ui.elementRoot.getMaxHeight() + offsetY);
			}
		}
        
		if ((x + this.ui.elementRoot.getMaxWidth()) > (AEd.DOM.getClientWidth() + AEd.DOM.getScrollX())) {
			if ((x - this.ui.elementRoot.getMaxWidth()) < (0 + AEd.DOM.getScrollX()) )  {
			}
			else {
				x -= (this.ui.elementRoot.getMaxWidth());
			}
		}    
        
		this.ui.moveTo(x, y);        
	}     
} 



// ------------------------------------------------------------ hideAnnotations
/**
 * Hides ui dialog with assigned annotations or suggestions.
 *  
 * @name hideAnnotations
 * @memberOf AEd.editors.Fragment
 * @function
 */
AEd.entities.Fragment.prototype.hideAnnotations = function() {
	this.onHideAnnotations.fire(this);
	if (this.ui) {
		for (var i = 0; i < this.annotations.length; i++) {
			this.ui.contentArea.removeItem(this.annotations[i].ui);
		}       
        
		this.ui.remove();    
		this.ui = null;
		this.dontHideAnnotations = false;       
	}   
} 



// -------------------------------------------------------------------- destroy
/**
 * Deletes all references to created objects to be garbage collected.
 *  
 * @name destroy
 * @memberOf AEd.editors.Fragment
 * @function
 *  	
 */
AEd.entities.Fragment.prototype.destroy = function() {
	this.hideAnnotations();
} 


// ---------------------------------------------------------------- convertBackground
/**
 * Converts background for older Internet Explorer versions than 9
 *
 * @name convertBackground
 * @memberOf AEd.editors.Fragment
 * @function
 * @param {String} color color string
 */
AEd.entities.Fragment.prototype.convertBackground = function(color) {

    // IE < 9 doesn't support RGBA colors, so the generated PNG image with alpha channel will be used instead
    if (AEd.isIE && AEd.IEversion < 9) { // IE < 9
        var _color = new RGBColor(color);
        if (_color.ok) {
            // Alpha == 1
            if (_color.a == 1) {
                return "rgb(" + _color.r + "," + _color.g + "," + _color.b + ")";
            }
            // Alpha <> 1
            else {
                return "url(" + AEd.CONFIG.AED_ROOT_PATH + "rgba.php?r=" + _color.r + "&g=" + _color.g + "&b=" + _color.b + "&a=" + _color.a*100 + ") repeat";
            }
        }
        // Unable to parse color string => default will be used instead
        else {
            var _color = new RGBColor(AEd.CONFIG.DEFAULT_TYPE_BACKGROUND_COLOR);
            if (_color.ok) {
                // Alpha == 1
                if (_color.a == 1) {
                    return "rgb(" + _color.r + "," + _color.g + "," + _color.b + ")";
                }
                // Alpha <> 1
                else {
                    return "url(" + AEd.CONFIG.AED_ROOT_PATH + "rgba.php?r=" + _color.r + "&g=" + _color.g + "&b=" + _color.b + "&a=" + _color.a*100 + ") repeat";
                }
            }
            // Default background color corrupted - use it as it is without opacity
            else
                return AEd.CONFIG.DEFAULT_TYPE_BACKGROUND_COLOR.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d(.\d+){0,1})\)/, "rgb($1,$2,$3)");
        }
    }
    // Standard browsers don't need conversion
    else // IE >= 9 and other modern browsers
        return color;

}



// ---------------------------------------------------------------- convertFontColor
/**
 * Converts font color for older Internet Explorer versions than 9
 * WARNING: There is no way to support font color with alpha channel in IE8 => fallback to RGB
 *
 * @name convertFontColor
 * @memberOf AEd.editors.Fragment
 * @function
 *
 */
AEd.entities.Fragment.prototype.convertFontColor = function(color) {

    // IE < 9 doesn't support RGBA colors and there is no way around, so we need to fall back to RGB
    if (AEd.isIE && AEd.IEversion < 9) { // IE < 9
        var _color = new RGBColor(color);
        if (_color.ok) {
            return "rgb(" + _color.r + "," + _color.g + "," + _color.b + ")";
        }
        // Unable to parse color string => default will be used instead
        else
            return AEd.CONFIG.DEFAULT_TYPE_FONT_COLOR.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d(.\d+){0,1})\)/, "rgb($1,$2,$3)"); // Remove opacity from default font color
    }
    // Standard browsers don't need conversion
    else // IE >= 9 and other modern browsers
        return color;

}



// ---------------------------------------------------------------- updateColor
/**
 * Updates fragment color - if fragemnt has assigned more annotations or suggestions than one,
 * the color is computed from all type color of all annotations or suggestions
 *  
 * @name updateColor
 * @memberOf AEd.editors.Fragment
 * @function
 *  	
 */
AEd.entities.Fragment.prototype.updateColor = function() {
    
	if (this.annotations.length == 0) {
		this.elementFragment.setCssValue("background", this.convertBackground(AEd.CONFIG.DEFAULT_TYPE_BACKGROUND_COLOR));
		this.elementFragment.setCssValue("color", this.convertFontColor(AEd.CONFIG.DEFAULT_TYPE_FONT_COLOR));
	}
	if (this.annotations.length == 1) {
		var attrArray = this.annotations[0].annoType.color.split(';');
    this.elementFragment.setCssValue("background", this.convertBackground(attrArray[0]));
    if(attrArray.length > 1){
			this.elementFragment.setCssValue("color", this.convertFontColor(attrArray[1]));
			this.elementFragment.setCssValue("fontWeight", (attrArray[2] == "true") ? "bold" : "normal"); 
			this.elementFragment.setCssValue("fontStyle",(attrArray[3] == "true") ? "italic" : "normal"); 
			this.elementFragment.setCssValue("textDecoration", (attrArray[4] == "true") ? "underline" : "none"); 
		}
	}
	else {  
		//background color
		var a = 0;
		var r = 0;
		var g = 0;
		var b = 0;
		//font color 
		var fa = 0;
		var fr = 0;
		var fg = 0;
		var fb = 0;
		var fontColor = "#000000";
		var fontWeight = "normal";
		var fontStyle = "normal";
		var textDecoration = "none";
		
		for (var i = 0; i < this.annotations.length; i++) {
			attrArray = this.annotations[i].annoType.color.split(';');
			//background color
			var _color = new RGBColor(attrArray[0]);
			if (_color.ok) {
				var _a = _color.a;
				var _r = _color.r / 255;
				var _g = _color.g / 255;
				var _b = _color.b / 255;              
            
				a = _a + a*(1-_a);
				r = (_r * _a + r * a * (1 - _a)) / a;
				g = (_g * _a + g * a * (1 - _a)) / a;
				b = (_b * _a + b * a * (1 - _a)) / a;  
			}
			//font color
			_color = new RGBColor(attrArray[0]);
			if (_color.ok) {
				_a = _color.a;
				_r = _color.r / 255;
				_g = _color.g / 255;
				_b = _color.b / 255;              
            
				fa = _a + fa*(1-_a);
				fr = (_r * _a + fr * fa * (1 - _a)) / fa;
				fg = (_g * _a + fg * fa * (1 - _a)) / fa;
				fb = (_b * _a + fb * fa * (1 - _a)) / fa;
			}
			if(attrArray.length > 1){
				fontWeight = (attrArray[2] == "true")? "bold" : fontWeight;
				fontStyle = (attrArray[3] == "true")? "italic" : fontStyle;
				textDecoration = (attrArray[4] == "true")? "underline" : textDecoration;
			}     
		}
          
    /* Rounding for RGBColor library compatibility */
    a = Math.floor(1000 * a + 0.5)/1000;
    fa = Math.floor(1000 * fa + 0.5)/1000;

    var color = "rgba(" + Math.floor(255 * r + 0.5) + "," + Math.floor(255 * g + 0.5) + "," + Math.floor(255 * b + 0.5) + "," + a + ")";
		var fontcolor = "rgba(" + Math.floor(255 * fr + 0.5) + "," + Math.floor(255 * fg + 0.5) + "," + Math.floor(255 * fb + 0.5) + "," + fa + ")";
    
    this.elementFragment.setCssValue("background", this.convertBackground(color));
		this.elementFragment.setCssValue("color", this.convertFontColor(fontColor));
		this.elementFragment.setCssValue("fontWeight", fontWeight); 
		this.elementFragment.setCssValue("fontStyle", fontStyle); 
		this.elementFragment.setCssValue("textDecoration", textDecoration);                      
	} 
} 



// --------------------------------------------------------------- setHighlight
/**
 * Sets true/false - if fragment should be highlighted - fragment is highlighted
 * when user wants to select annotation to create annotation link attribute 
 *  
 * @name setHighlight
 * @memberOf AEd.editors.Fragment
 * @function
 * @param {Boolean} value Boolean value - fragment is highlighted or not 
 *  	
 */
AEd.entities.Fragment.prototype.setHighlight = function(value) {
	if (value) {
		this.isHighlighted = true;
		this.elementFragment.setCssValue("border", AEd.CONFIG.DEFAULT_ANNOTATIONS_LINK_BORDER);
        this.elementFragment.setCssValue("cursor", "pointer");
	}
	else {
		this.isHighlighted = false;
		this.elementFragment.setCssValue("border", "none");
        this.elementFragment.setCssValue("cursor", "auto");    
	}
} 



// ------------------------------------------------------ setModeAnnotationLink
/**
 * Sets true/false - if fragment should be in mode of selecting annotation link
 * when user wants to select fragment to create annotation link attribute 
 *  
 * @name setModeAnnotationLink
 * @memberOf AEd.editors.Fragment
 * @function
 * @param {Boolean} value Boolean value - fragment is in mode of selecting annotation link or not 
 *  	
 */
AEd.entities.Fragment.prototype.setModeAnnotationLink = function(value) {
	if (value) {
		this.modeAnnotationLink = true;
		this.elementFragment.addClass(AEd.CONFIG.CLASS_UI_FRAGMENT_ANNOLINK);
	}
	else {
		this.modeAnnotationLink = false;
		this.elementFragment.removeClass(AEd.CONFIG.CLASS_UI_FRAGMENT_ANNOLINK);    
	}
}



// ------------------------------------------------------ setSuggestionClass
/**
 * Sets class to suggestion 
 *  
 * @name setSuggestionClass
 * @memberOf AEd.editors.Fragment
 * @function
 * @param {Boolean} value Boolean value - True/false if set class to suggestion or not. 
 *  	
 */
AEd.entities.Fragment.prototype.setSuggestionClass = function(value) {
	if (value) {                                                     
		this.elementFragment.setCssValue("border", AEd.CONFIG.DEFAULT_SUGGESTIONS_BORDER); 
	}
	else {
		this.elementFragment.setCssValue("border", "none");    
	}
}
 


// *****************************************************************************
// class AEd.entities.Fragment
// ***************************************************************************** 

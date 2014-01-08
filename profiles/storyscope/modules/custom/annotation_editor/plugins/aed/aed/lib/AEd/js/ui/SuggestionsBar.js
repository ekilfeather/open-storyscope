/**
 * SuggestionsBar.js
 *
 * Contains AEd.ui.SuggestionsBar class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.SuggestionsBar
// *****************************************************************************  



/**
 * This class creates SuggestionsBar.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *    {String}  width           - button width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height          - button height with or without units, e.g.: "300px" or "100%", default unit is px, 
 *      
 *    {Element} srcElement      - DOM element to create button from.   
 *    {Element} targetElement   - DOM element to render button to. Default is document.body,    
 *    {Element} contentElement  - DOM element to place as a content of UIContainer. Default is none,      
 *    {Boolean} render          - determines wheteher UIContainer should be rendered after creating, 
 *    {Document} context        - safari support (ownerDocument of element)   
 * }
 *
 *        
 * @name SuggestionsBar
 * @memberOf AEd.ui.core      
 * @class 
 * @augments AEd.ui.core.UIContainer
 */
AEd.ui.SuggestionsBar = function(config) {
   var c = config || {};    
   AEd.inheritFromObject(this, new AEd.ui.core.UIContainer(c));    
 
   this.CLASS_SUGGESTIONS_BAR     = AEd.CONFIG.CLASS_UI_SUGGESTIONS_BAR;     
   
   // *************************************************************************
   // DEFAULTS
   // *************************************************************************  


   // *************************************************************************
   // CONFIG - OPTIONS
   // ************************************************************************* 


   // *************************************************************************
   // EVENTS
   // *************************************************************************        

   /**
    * Fires when item is selected.
    * 
    * @event onSelected
    * @param {AEd.ui.SuggestionBarItem} oSuggestionsBatITem Target item.                                                   
    */         
   this.onSelected = new AEd.utils.Dispatcher();  
   
   /**
    * Fires when item is deselected.
    * 
    * @event onDeselected
    * @param {AEd.ui.SuggestionBarIteme} oSuggestionsBatITem Target item.                                                   
    */         
   this.onDeselected = new AEd.utils.Dispatcher();     
   
   /**
    * Fires when item is clicked.
    * 
    * @event onClick
    * @param {AEd.ui.SuggestionBarItem} oSuggestionsBatITem Target item.                                                   
    */         
   this.onClick = new AEd.utils.Dispatcher();           
  
   // *************************************************************************
   // PROPERTIES
   // *************************************************************************   

   this.selectedItem = null;

   this.context = c.context;   // Safari support
   
   // *************************************************************************
   // CREATING HTML STRUCTURE
   // ************************************************************************* 
   
             
   this.elementRoot.addClass(this.CLASS_SUGGESTIONS_BAR);                      
    this.setResizable({
          height: c.height,
          width: c.width,
          resizeMinHeight: c.height,
          resizeMinWidth: c.width,
          resizeMaxHeight: '300px'
          
          
      });
           
   // *************************************************************************
   // HANDLERS SETUP
   // *************************************************************************  

   

   // *************************************************************************
   //  SETUP
   // *************************************************************************   

}



AEd.ui.SuggestionsBar.prototype.constructor = AEd.ui.SuggestionsBar;

AEd.inheritFromPrototype(AEd.ui.SuggestionsBar, AEd.ui.core.UIContainer);


// ------------------------------------------------------------------------ add
/**
 * Adds item.
 *
 * @name add
 * @memberOf AEd.ui.SuggestionsBar
 * @function   
 * @param {Object} item Item to add. 
 * @param {Number} index add to specified index
 */
AEd.ui.SuggestionsBar.prototype.add = function(item, index) {  
   
   if (item) {          
      item.onClick.addHandler(function(i) {
          this.onClick.fire(i);
      }, this);
      
      item.onSelected.addHandler(function(i) {
          this.onSelected.fire(i);
      }, this);
      
      item.onDeselected.addHandler(function(i) {
          this.onDeselected.fire(i);
      }, this);    
      
      item.onMouseOver.addHandler(function(i) {
          this.selectItem(i);          
      }, this);       
          
      this.addItem(item, index);
   }    
} 



// ----------------------------------------------------------------- selectItem
/**
 * Selects specified item
 *
 * @name selectItem
 * @memberOf AEd.ui.SuggestionsBar
 * @function    
 * @param {Number | AEd.ui.SuggestionsBarItem} i Index of item or item instance.    
 */
AEd.ui.SuggestionsBar.prototype.selectItem = function(i) {
    
    if (this.selectedItem) {
        this.deselectItem(this.selectedItem);
    } 
    
    
    if (this.selectedItem === i) {
        return;
    }
    
    // i is item
    if (i instanceof AEd.ui.SuggestionsBarItem) {
        i.setSelected(true);
        this.selectedItem = i;  
    }        
    // i is index
    else if (typeof i == "number") {
        if ((i >= 0) && (i < this.items.length)) {
           this.items[i].setSelected(true);
           this.selectedItem = this.items[i]; 
        }
    }
    
    if (this.selectedItem) {
        if ((this.selectedItem.elementRoot.getMaxHeight() + this.selectedItem.elementRoot.getRelPosY()) > (this.elementRoot.getMaxHeight() + this.elementRoot.domElement.scrollTop)) {
            this.elementRoot.domElement.scrollTop = this.selectedItem.elementRoot.getRelPosY();
        }
        else if ( (this.selectedItem.elementRoot.getRelPosY()) < (this.elementRoot.domElement.scrollTop) ) {
            this.elementRoot.domElement.scrollTop = this.selectedItem.elementRoot.getRelPosY();
        }         
    }
  

  
}



// ---------------------------------------------------------------- deselectItem
/**
 * Deselects specified item
 *
 * @name deselectItem
 * @memberOf AEd.ui.SuggestionsBar
 * @function 
 * @param {AEd.ui.SuggestionsBarItem} i item instance    
 */
AEd.ui.SuggestionsBar.prototype.deselectItem = function(i) {
    if (i) {
        i.setSelected(false);
        this.selectedItem = null;
    } 
}



// ------------------------------------------------------------- selectNextItem
/**
 * Selects next item
 *
 * @name selectNextItem
 * @memberOf AEd.ui.SuggestionsBar
 * @function      
 */
AEd.ui.SuggestionsBar.prototype.selectNextItem = function() {
    
    
    if (this.selectedItem) {
        var index = -1;
        for (var i = 0; i < this.items.length; i ++) {
             if (this.selectedItem === this.items[i]) {
                 index = i;
                 break;
             }
        }
        
        if (index != -1) {
            this.deselectItem(this.selectedItem);
            index++;
            if (index >= this.items.length) {
               index = 0;               
            }
            this.selectItem(this.items[index]);
        
        }
    } 
    else {
            this.selectItem(this.items[0]);
    }
}



// --------------------------------------------------------- selectPreviousItem
/**
 * Selects previous item
 *
 * @name selectPreviousItem
 * @memberOf AEd.ui.SuggestionsBar
 * @function      
 */
AEd.ui.SuggestionsBar.prototype.selectPreviousItem = function() {
    
    
    if (this.selectedItem) { 
        var index = -1;
        for (var i = 0; i < this.items.length; i ++) { // Find selected item index
             if (this.selectedItem === this.items[i]) {
                 index = i;
                 break;
             }
        }
        
        if (index != -1) {  // Index was found
            this.deselectItem(this.selectedItem);
            index--;
            if (index < 0) {
               index = this.items.length - 1;               
            }
            this.selectItem(this.items[index]);
        
        }
    } 
    else {
            this.selectItem(this.items[this.items.length - 1]);
    }    
}




// ---------------------------------------------------------------- addNewItems
/**
 * Creates new collection of items from input array of objects defined as:
 * @example
 * oObject {
 *    name: String,
 *    text: String,
 *    simpleType: Boolean,
 *    context: Document (Safari support)
 * }  
 *
 * @name addNewItems
 * @memberOf AEd.ui.SuggestionsBar
 * @function  
 * @param {Array} aObjects Array of input objects.     
 */
AEd.ui.SuggestionsBar.prototype.addNewItems = function(aObjects) {  
    
    if (aObjects) {         
        this.removeAllItems(); 
        this.selectedItem = null;           
        for (var i = 0; i < aObjects.length; i++) {
            var tmpItem = new AEd.ui.SuggestionsBarItem({name: aObjects[i].name, text: aObjects[i].text, simpleType: aObjects[i].simpleType, context: this.context});
            this.add(tmpItem);           
        }        
    } 
}


// ---------------------------------------------------------------- addNewItemsEntities
/**
 * Creates new collection of items from input array of objects defined as:
 * @example
 * oObject {
 *    name: String,
 *    visualRepresentation: String,
 *    type: String,
 *    context: Document (Safari support)
 * }  
 *
 * @name addNewItemsEntities
 * @memberOf AEd.ui.SuggestionsBar
 * @function  
 * @param {Array} aObjects Array of input objects.     
 */
AEd.ui.SuggestionsBar.prototype.addNewItemsEntities = function(aObjects)
{
    if (aObjects)
    {
        this.removeAllItems(); 
        this.selectedItem = null;           
        for (var i = 0; i < aObjects.length; i++)
        {
            var t = '';
            t += '<table class="' + AEd.CONFIG.DLG_ANNOTATE_CLASS_ENTITY_NAME_AUTOCOMPLETER + '">';
            t += '  <tr>';
            t += '    <td class="' + AEd.CONFIG.CLASS_UI_TABLE_COLUMN1 + '">';
            
            if(aObjects[i].visualRepresentation)
                t += '  <img src="' + aObjects[i].visualRepresentation + '"/>';
            
            t += '    </td>';
            t += '    <td class="' + AEd.CONFIG.CLASS_UI_TABLE_COLUMN2 + '">' + aObjects[i].name + '</td>';
            t += '    <td class="' + AEd.CONFIG.CLASS_UI_TABLE_COLUMN3 + '">(' + aObjects[i].type + ')</td>';
            t += '  </tr>';
            t += '</table>';
            aObjects[i].text = t;
            aObjects[i].context = this.context;

            var tmpItem = new AEd.ui.SuggestionsBarItem(aObjects[i]);
            this.add(tmpItem);           
        }
    }
}


// ---------------------------------------------------------------- addNewItemsPersons
/**
 * Creates new collection of items from input array of objects defined as:
 * @example
 * oObject {
 *    text: String
 * }  
 *
 * @name addNewItems
 * @memberOf AEd.ui.SuggestionsBar
 * @function  
 * @param {Array} aObjects Array of input objects.     
 */
AEd.ui.SuggestionsBar.prototype.addNewItemsPersons = function(aObjects)
{
    if (aObjects)
    {
        this.removeAllItems();
        this.selectedItem = null;
        for (var i = 0; i < aObjects.length; i++)
        {
            var tmpItem = new AEd.ui.SuggestionsBarItem({text: aObjects[i].name, context: this.context});
            this.add(tmpItem);
        }
    }
}

// ---------------------------------------------------------------- addNewItemsWithUris
/**
 * Creates new collection of items from input array of objects defined as:
 * @example
 * oObject {
 *    id: String,
 *    name: String
 * }  
 *
 * @name addNewItems
 * @memberOf AEd.ui.SuggestionsBar
 * @function  
 * @param {Array} aObjects Array of input objects.     
 */
AEd.ui.SuggestionsBar.prototype.addNewItemsPersonsWithUris = function(aObjects) {  
    
    if (aObjects) {         
        this.removeAllItems(); 
        this.selectedItem = null;           
        for (var i = 0; i < aObjects.length; i++) {
            var tmpItem = new AEd.ui.SuggestionsBarItem({text: aObjects[i].id + " (" + aObjects[i].name + ")", context: this.context});
            this.add(tmpItem);           
        }        
    } 
}

// ---------------------------------------------------------------- addNewItemsUris
/**
 * Creates new collection of items from input array of objects defined as:
 * @example
 * oObject {
 *    text: String,
 *    name: String
 * }  
 *
 * @name addNewItems
 * @memberOf AEd.ui.SuggestionsBar
 * @function  
 * @param {Array} aObjects Array of input objects.     
 */
AEd.ui.SuggestionsBar.prototype.addNewItemsGroupsUris = function(aObjects) {  
    
    if (aObjects) {         
        this.removeAllItems(); 
        this.selectedItem = null;           
        for (var i = 0; i < aObjects.length; i++) {
            var tmpItem = new AEd.ui.SuggestionsBarItem({text: aObjects[i].uri + " (" + aObjects[i].name + ")", context: this.context});
            this.add(tmpItem);           
        }        
    } 
}


// *****************************************************************************
// class AEd.ui.SuggestionsBar
// ***************************************************************************** 

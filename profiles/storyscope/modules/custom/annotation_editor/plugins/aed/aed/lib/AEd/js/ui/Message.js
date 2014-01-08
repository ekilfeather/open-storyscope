/**
 * Message.js
 *
 * Contains AEd.ui.Message class definition. 
 *  
 * @author: Martin Kleban 
 * 
 */
 

// *****************************************************************************
// class AEd.ui.Message
// *****************************************************************************  



/**
 * This class creates Message.
 * @example   
 * Config object settings (all are optional) :
 * var config = {
 *    {String}  title         - message title text, 
 *    {String}  subtitle      - message subtitle text,
 *    {String | Element | AEd.dom.Element}  headerContent - header content text or Element,
 *    {String | Element | AEd.dom.Element}  content - content text or Element,
 *     
 *    {String}  icon          - "none" | "anno" | "info" | "error" | "warning" | "ok" | "loading" | "close" | ...
 *    {String}  iconColor     - "#FFFFFF" | ...
 *      
 *    {String}  width         - dialog width with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  height        - dialog height with or without units, e.g.: "300px" or "100%", default unit is px,  
 *    {String}  minWidth      - dialog minWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  minHeight     - dialog minHeight with or without units, e.g.: "300px" or "100%", default unit is px,   
 *    {String}  maxWidth      - dialog maxWidth with or without units, e.g.: "300px" or "100%", default unit is px, 
 *    {String}  maxHeight     - dialog maxHeight with or without units, e.g.: "300px" or "100%", default unit is px,     
 *      
 *    {Boolean} render        - determines wheteher dialog should be rendered after creating   
 *    
 *    {Element} srcElement     - DOM element to create dialog from. 
 *    {Element} targetElement  - DOM element to render dialog to. Default is document.body. 
 *    {Element} contentElement - DOM element to place as a content of dialog. Default is none.
 *  
 * }
 * 
 * @name Message
 * @memberOf AEd.ui     
 * @class 
 * @augments AEd.ui.core.UIMessage 
 */
AEd.ui.Message = function(config) {
   
   var c = config || {};    

   AEd.inheritFromObject(this, new AEd.ui.core.UIMessage(c));
  
   this.btnDetails  = new AEd.ui.core.UIButton({icon: "show-details"}); 
   this.btnClose    = new AEd.ui.core.UIButton({icon: "close"});
 
   this.buttonsArea.addItem(this.btnDetails);      
   this.buttonsArea.addItem(this.btnClose);
   
   this.btnDetails.onClick.addHandler(function () {
       if (!this.btnDetails.isDisabled) {         
           if (this.isContentHidden) {
              this.showContent();
              this.btnDetails.setIcon("hide-details");
           }
           else {
              this.hideContent();
              this.btnDetails.setIcon("show-details");       
           }       
       }

   }, this ); 
   
   this.btnClose.onClick.addHandler(function () {
       this.close();
   }, this );    
   
   
   
   if (!this.content) {
      this.btnDetails.setDisabled(true);
   }  
   this.onContentChange.addHandler(function(content) {
       if (content) {
          this.btnDetails.setDisabled(false);
       }
       else {
          this.btnDetails.setDisabled(true);
       }
   }, this );
   
}



AEd.ui.Message.prototype.constructor = AEd.ui.Message;

AEd.inheritFromPrototype(AEd.ui.Message, AEd.ui.core.UIMessage);




// *****************************************************************************
// class AEd.ui.Message
// ***************************************************************************** 
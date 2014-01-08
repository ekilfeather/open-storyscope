/**
 * FragmentsManager.js
 *
 * Contains AEd.entities.FragmentsManager class definition. 
 *  
 * @authors: Martin Kleban, Petr Loukota, Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.entities.FragmentsManager
// *****************************************************************************  



/**
 * This class provides functionality for managing fragments.
 *      
 *
 * @name FragmentsManager
 * @memberOf AEd.entities      
 * @class   
 * @param {AEd.editors.Editor} editor Instance of editor.  
 * @property {Array} fragments array of fragments
 * @property {Array} fragmentsByID array indexed by fragments ID
 * @property {Array} openedFragments opened fragments array 
 */
AEd.entities.FragmentsManager = function(editor) {
   if ( (editor) && (editor instanceof AEd.editors.Editor)) {
       this.editor = editor;  
       
       this.fragments = new Array();
       this.fragmentsByID = {};    
       this.openedFragments = new Array();
       
       this.IdCounter = 0;
       this.IdPrefix  = AEd.CONFIG.FRAGMENT_ID_PREFIX;    
       
       this.modeAnnotationLink = false; 
       this.modeNestedAnnotations = false;
       this.annoLinkTypeUri = null;   
   }
   else {
       throw new Error(AEd.I18n.t("Error_AEd_entities_FragmentsManager_Missing_argument"));
   } 
}


AEd.entities.FragmentsManager.prototype.constructor = AEd.entities.FragmentsManager;


/**
 * Returns a substring while ignoring combining characters.
 * @name _selection
 * @memberOf AEd.entities.FragmentsManager  
 * @function
 * @param {String} nodeValue original string
 * @param {Number} fragmentOffset begin index of the selection
 * @param {Number} fragmentLength length of the selection
 * @return {String} selection substring
 */
AEd.entities.FragmentsManager.prototype._selection = function(nodeValue, fragmentOffset, fragmentLength)
{
    var len = this._strlenWithoutCombiningChars(nodeValue.substr(0, fragmentOffset));
    var selection = nodeValue.substr(2*fragmentOffset - len, fragmentLength);
    return selection;
}

/**
 * Sometimes, fragment offsets can be calculated badly due to unpleasant reasons. This function checks those offsets.
 * WARNING&NOTE: This function is a workaround how to get rid of annoying bugs like nodes with controversial properties.
 * @name _correctFragmentOffset
 * @memberOf AEd.entities.FragmentsManager  
 * @function
 * @param {String} nodeValue node value that the fragment selection is supposed to be cut from
 * @param {Number} fragmentOffset fragment offset that will be corrected
 * @param {Number} fragmentLength fragment length
 * @param {AEd.Entities.Fragment} fragment the fragment
 * @return {Number} fragmentOffset repaired fragment offset
 */
AEd.entities.FragmentsManager.prototype._correctFragmentOffset = function (nodeValue, fragmentOffset, fragmentLength, fragment)
{
    var fragmentText = fragment.fragmentText;
    var offsetShift = 0;
    
    while(true)
    {
        //get selection with the current offsetShift
        var selection = nodeValue.substr(fragmentOffset + offsetShift, fragmentLength);
        
        /**
         * Change offsetShift. It's changing this way:
         * 0, 1, -1, 2, -2, 3, -3, ...
         */
        //goal -- with this offsetShift fragment selection finally matches
        if(selection == fragmentText)
            break;
        //too far away - don't repair anything
        else if(offsetShift == 10)
        {
            offsetShift = 0;
            break;
        }
        //test the negative shift
        else if(offsetShift > 0)
            offsetShift = -offsetShift;
        //test next positive shift
        else if(offsetShift < 0)
            offsetShift = -offsetShift + 1;
        //test 1 after 0 was tested
        else if (offsetShift == 0)
            offsetShift = 1;
    }
    
    fragmentOffset = fragmentOffset + offsetShift;

    return fragmentOffset;
}


// ------------------------------------------------------------ createFragments
/**
 * Creates fragments from specified annotation or suggestion instance
 *  
 * @name createFragments
 * @memberOf AEd.entities.FragmentsManager
 * @function
 * @param {AEd.entities.Annotation or AEd.entities.Suggestion} annotation Annotation or suggestion instance to create fragments from.  
 *      
 */
AEd.entities.FragmentsManager.prototype.createFragments = function(annotation)
{
    if(!((annotation instanceof AEd.entities.Annotation || annotation instanceof AEd.entities.Suggestion) && annotation.fragments))
    {
        return;
    }

    //iterates all fragments
    for (var i = 0; i < annotation.fragments.length; i++)
    {
        var workXPath = AEd.XML.origToWorkingXPath(annotation.fragments[i].fragmentPath, this.editor.wysiwyg.getDocument());

        //There may be fragments without xpath (empty string) sometimes (It means origToWorkingXpath is calculated wrongly - empty)
        if (!workXPath)
        {
            continue;
        }

        var workEl    = AEd.XML.selectSingleNodeXPath(this.editor.wysiwyg.getDocument(), workXPath);

        var fragmentOffset = parseInt(annotation.fragments[i].fragmentOffset);

        var fragmentLength = parseInt(annotation.fragments[i].fragmentLength);

        var rootEl    = workEl;
        if (rootEl.nodeType == 3 )
        {
            rootEl = rootEl.parentNode; 
        }
        
        while(AEd.ElU.hasClass(rootEl, AEd.CONFIG.CLASS_ANNOTATION))
        {
            rootEl = rootEl.parentNode;
        }
        
        //try {
        var iterator;
        
        if (AEd.isIE && AEd.IEversion < 9) // IE < 9
            iterator = document.createTreeWalker(rootEl, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);
        
        else // IE >= 9 and other modern browsers
            iterator = document.createNodeIterator(rootEl, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, false);

        // Iterator will be malfunctioning after some kind of DOM changes so we must keep original way
        var iNCount = 0;
        var iNodesArray = new Array();
        var aNode = iterator.nextNode();
        while (aNode != null)
        {
            iNodesArray[iNCount] = aNode;
            iNCount++;
            aNode = iterator.nextNode();
        }
        iNodesArray[iNCount] = null;
        
        var actNode = 0;
        var node = iNodesArray[actNode];
        actNode++;

        // iterate to first node of fragment
        while ((node) && (node !== workEl))
        {
            node = iNodesArray[actNode];
            actNode++;
        }

        var nextNode = null;
        var completed = false;
        var insideFragment = false;
        
        if ((node.nodeType == 3) && (AEd.ElU.hasClass(node.parentNode, AEd.CONFIG.CLASS_ANNOTATION) ))
        {
            insideFragment = true;
        }

        var nextNodeFlag;
        while (!completed)
        {
            if (!node)
            {
                break;                    
            }

            nextNodeFlag = true;
            
            // need to save nextNode before dom modifications
            nextNode = iNodesArray[actNode];
            actNode++;
                                
            // --------------------------------------------------------
            // if it is a text node
            if (node.nodeType == 3)
            {
                //NOTE: string.strlen may not work properly if there is a combining character in the string
                var origNodeLength;
                
                //firefox doesn't count combining characters which is fine
                var isFF = !(window.mozInnerScreenX == null);
                if(isFF)
                {
                    origNodeLength = node.nodeValue.length;
                }
                else
                {
                    origNodeLength = this._strlenWithoutCombiningChars(node.nodeValue);
                }

                if (!AEd.ElU.hasClass(node.parentNode, AEd.CONFIG.CLASS_ANNOTATION))
                {
                    insideFragment = false;
                }
                
                // -----------------------------------------
                // NOT inside existing fragment
                // -----------------------------------------                         
                if (!insideFragment)
                {
                    // fragment starts in this node
                    if (fragmentOffset < origNodeLength)
                    {
                        // fragment ends in this node
                        if ((fragmentOffset + fragmentLength) <= origNodeLength)
                        {
                            //fragment offset could be calculated wrongly -- it should be corrected
                            fragmentOffset = this._correctFragmentOffset(node.nodeValue, fragmentOffset, fragmentLength, annotation.fragments[i]);
                            var f = this._createFragment({
                                wFragmentPath: AEd.XML.getElementWorkingDocXPath(node),
                                wFragmentOffset: fragmentOffset,
                                wFragmentLength: fragmentLength,
                                wFragmentText: node.nodeValue.substr(fragmentOffset, fragmentLength)                                
                            }, annotation);

                            completed = true;
                        }

                        // fragment doesnt end in this node
                        else
                        {
                            var f = this._createFragment({
                                wFragmentPath: AEd.XML.getElementWorkingDocXPath(node),
                                wFragmentOffset: fragmentOffset,
                                wFragmentLength: origNodeLength - fragmentOffset,
                                wFragmentText: this._selection(node.nodeValue, fragmentOffset, origNodeLength - fragmentOffset)
                            }, annotation);

                            fragmentLength = fragmentLength - (origNodeLength - fragmentOffset);
                            fragmentOffset = 0;
                        }

                        // Fix for IE < 9
                        if (AEd.isIE && AEd.IEversion < 9 
                            && AEd.ElU.hasClass(f.domElementFragment.parentNode, AEd.CONFIG.CLASS_ANNOTATION) 
                            && f.domElementFragment.nextSibling == null)
                        {
                            f.domElementFragment.parentNode.parentNode.insertBefore(f.domElementFragment, f.domElementFragment.parentNode.nextSibling);
                        }
                    }
                    
                    // fragment doesnt start in here
                    else
                    {
                        fragmentOffset = fragmentOffset - origNodeLength;
                    }
                }
                
                // -----------------------------------------
                // inside existing fragment
                // -----------------------------------------                        
                else
                {
                    // fragment starts in this node
                    if (fragmentOffset < origNodeLength)
                    {
                        // fragment ends in this node
                        if ((fragmentOffset + fragmentLength) <= origNodeLength)
                        {
                            // fragmentOffset > 0 
                            if (fragmentOffset > 0)
                            {
                                // DO BREAK OLD FRAGMENT
                                var f = this.getFragmentByID(node.parentNode.id);
                                var assignedAnnotations = f.getAssignedAnnotations();

                                // create fragment <>|..|TEXTTEXT</> - NOT for new annotation
                                // After it there will be <f><f1></f1>TEXTTEXT</f>
                                var f1 = this._createFragment({
                                    wFragmentPath: AEd.XML.getElementWorkingDocXPath(node),
                                    wFragmentOffset: 0, // == 0
                                    wFragmentLength: fragmentOffset,
                                    wFragmentText: this._selection(node.nodeValue, 0, fragmentOffset)                                
                                });

                                // Fix for IE < 9
                                if (AEd.isIE && AEd.IEversion < 9)
                                {
                                    f.domElementFragment.insertBefore(f1.domElementFragment, f.domElementFragment.firstChild);
                                }

                                // <><textnode>--empty--</textnode><span><textnode>...</textnode></span><textnode>...rest of original text node</textnode>
                                // node is now a reference to first and empty text node
                                // we need it to reference to right node
                                if (AEd.isIE)
                                    node = f1.domElementFragment.nextSibling;
                                else
                                    node = node.nextSibling.nextSibling;

                                // create fragment <>TEXTTEXT|..|TEXTTEXT</> 
                                // After it there will be <f><f1></f1><f2></f2>TEXTTEXT</f>
                                var f2 = this._createFragment({
                                    wFragmentPath: AEd.XML.getElementWorkingDocXPath(node),
                                    wFragmentOffset: 0,
                                    wFragmentLength: fragmentLength,
                                    wFragmentText: this._selection(node.nodeValue, 0, fragmentLength)
                                }, annotation);  

                                    // Fix for IE < 9
                                if (AEd.isIE && AEd.IEversion < 9)
                                {
                                    f.domElementFragment.insertBefore(f2.domElementFragment, f1.domElementFragment.nextSibling);
                                }

                                if (AEd.isIE)
                                    node = f2.domElementFragment.nextSibling;
                                else
                                    node = node.nextSibling.nextSibling;                      
                                var f3 = null;

                                // Create f3 with the rest of original fragment f
                                if ((fragmentOffset + fragmentLength) < origNodeLength)
                                {
                                    // create fragment <>TEXTTEXT|..|</>  - NOT for new annotation
                                    var f3 = this._createFragment({
                                        wFragmentPath: AEd.XML.getElementWorkingDocXPath(node),
                                        wFragmentOffset: 0,
                                        wFragmentLength: origNodeLength,
                                        wFragmentText: node.nodeValue
                                    });
                                    
                                    // Fix for IE < 9
                                    if (AEd.isIE && AEd.IEversion < 9)
                                    {
                                        f.domElementFragment.insertBefore(f3.domElementFragment);
                                    }

                                    if (AEd.isIE)
                                        node = f3.domElementFragment.nextSibling;
                                    else
                                        node = node.nextSibling.nextSibling;
                                }

                                if (assignedAnnotations)
                                {
                                    for (var a = 0; a < assignedAnnotations.length; a++)
                                    {
                                        f1.assignAnnotation(assignedAnnotations[a]);
                                        f2.assignAnnotation(assignedAnnotations[a]);
                                        
                                        if (f3)
                                        {
                                            f3.assignAnnotation(assignedAnnotations[a]);
                                        }
                                    }
                                }

                                this._destroyFragment(f);
                            }
                                                    
                            // fragmentOffset == 0                               
                            else
                            {
                                if (fragmentLength == origNodeLength)
                                {
                                    // ADD ANNOTATION TO EXISTING FRAGMENT
                                    var f = this.getFragmentByID(node.parentNode.id);
                                    f.assignAnnotation(annotation);
                                }
                                
                                else
                                {
                                    // DO BREAK OLD FRAGMENT
                                    var f = this.getFragmentByID(node.parentNode.id);
                                    
                                    var assignedAnnotations = f.getAssignedAnnotations();
                                    
                                    // create fragment <>|..|TEXTTEXT</>
                                    // After it there will be <f><f1></f1>TEXTTEXT</f>
                                    var f1 = this._createFragment({
                                        wFragmentPath: AEd.XML.getElementWorkingDocXPath(node),
                                        wFragmentOffset: fragmentOffset, // == 0
                                        wFragmentLength: fragmentLength,
                                        wFragmentText: this._selection(node.nodeValue, fragmentOffset, fragmentLength)                                 
                                    }, annotation);
                                    
                                    // Fix for IE < 9
                                    if (AEd.isIE && AEd.IEversion < 9)
                                    {
                                        f.domElementFragment.insertBefore(f1.domElementFragment, f.domElementFragment.firstChild);
                                    }

                                    // move to TEXTTEXT
                                    if (AEd.isIE)
                                        node = f1.domElementFragment.nextSibling;
                                    else
                                        node = node.nextSibling.nextSibling;
                                    
                                    // create fragment <>TEXTTEXT|..|</>  - NOT for new annotation
                                    // After it there will be <f><f1></f1><f2></f2></f>
                                    var f2 = this._createFragment({
                                        wFragmentPath: AEd.XML.getElementWorkingDocXPath(node),
                                        wFragmentOffset: 0,  
                                        wFragmentLength: origNodeLength,
                                        wFragmentText: node.nodeValue
                                    });         
                                    
                                    // Fix for IE < 9
                                    if (AEd.isIE && AEd.IEversion < 9)
                                    {
                                        f.domElementFragment.insertBefore(f2.domElementFragment, f1.domElementFragment.nextSibling);
                                    }

                                    // move to text node after f2
                                    if (AEd.isIE)
                                        node = f2.domElementFragment.nextSibling;
                                    else
                                        node = node.nextSibling.nextSibling;

                                    // assign original annotation to both fragments
                                    if (assignedAnnotations)
                                    {
                                        for (var a = 0; a < assignedAnnotations.length; a++)
                                        {
                                            f1.assignAnnotation(assignedAnnotations[a]);
                                            f2.assignAnnotation(assignedAnnotations[a]);
                                        }
                                    }
                                    
                                    // destroy original fragment
                                    this._destroyFragment(f);
                                }
                            }  // END: fragmentOffset == 0
                            completed = true;
                        }
                                                
                        // fragment doesnt end in this node
                        else
                        {
                            if (fragmentOffset > 0)
                            {
                                // DO BREAK OLD FRAGMENT
                                var f = this.getFragmentByID(node.parentNode.id);
                                var assignedAnnotations = f.getAssignedAnnotations();
                                
                                // create fragment <>|..|TEXTTEXT</>  - NOT for new annotation
                                var f1 = this._createFragment({
                                    wFragmentPath: AEd.XML.getElementWorkingDocXPath(node),
                                    wFragmentOffset: 0, // == 0
                                    wFragmentLength: fragmentOffset,
                                    wFragmentText: this._selection(node.nodeValue, 0, fragmentOffset)                                 
                                });
                                
                                /* In IE < 9 is the line 1 inserted as line 2 as follows...
                                    1) "<P>In 2010, <SPAN style="BACKGROUND-COLOR: #a0a0a0" id=aedFragment-1 class=aed-anno><SPAN id=aedFragment-2>Sir Denis </SPAN>Mahon</SPAN>, one of the most distinguished..."
                                    2) "<P>In 2010, <SPAN id=aedFragment-2>Sir Denis </SPAN><SPAN style="BACKGROUND-COLOR: #a0a0a0" id=aedFragment-1 class=aed-anno>Mahon</SPAN>, one of the most distinguished..."
                                */
                                
                                // Fix for IE < 9
                                if (AEd.isIE && AEd.IEversion < 9)
                                {
                                    f.domElementFragment.insertBefore(f1.domElementFragment, f.domElementFragment.firstChild);
                                }

                                if (AEd.isIE)
                                    node = f1.domElementFragment.nextSibling;
                                else
                                    node = node.nextSibling.nextSibling;
                                
                                // create fragment <>TEXTTEXT|..|</> 
                                var f2 = this._createFragment({
                                    wFragmentPath: AEd.XML.getElementWorkingDocXPath(node),
                                    wFragmentOffset: 0, // == 0
                                    wFragmentLength: origNodeLength,
                                    wFragmentText: node.nodeValue
                                }, annotation);
                                
                                /* In IE < 9 is the line 1 inserted as line 2 as follows...
                                    1) "<P>In 2010, <SPAN style="BACKGROUND-COLOR: #a0a0a0" id=aedFragment-1 class=aed-anno><SPAN id=aedFragment-2 class=aed-anno>Sir Denis </SPAN><SPAN style="BACKGROUND-COLOR: #a0a0a0" id=aedFragment-3 class=aed-anno>Mahon</SPAN></SPAN>, one of the most distinguished...</P>"
                                    2) "<P>In 2010, <SPAN style="BACKGROUND-COLOR: #a0a0a0" id=aedFragment-1 class=aed-anno><SPAN id=aedFragment-2 class=aed-anno>Sir Denis <SPAN style="BACKGROUND-COLOR: #a0a0a0" id=aedFragment-3 class=aed-anno>Mahon</SPAN></SPAN></SPAN>, one of the most distinguished...</P>"
                                */
                                
                                // Fix for IE < 9
                                if (AEd.isIE && AEd.IEversion < 9)
                                {
                                    f.domElementFragment.insertBefore(f2.domElementFragment);
                                }

                                if (AEd.isIE)
                                    node = f2.domElementFragment.nextSibling;
                                else
                                    node = node.nextSibling.nextSibling;

                                if (assignedAnnotations)
                                {
                                    for (var a = 0; a < assignedAnnotations.length; a++)
                                    {
                                        f1.assignAnnotation(assignedAnnotations[a]);
                                        f2.assignAnnotation(assignedAnnotations[a]);
                                    }
                                }
                                this._destroyFragment(f);
                                nextNodeFlag = false;
                            }
                            
                            else
                            {
                                // ADD ANNOTATION OR SUGGESTION TO EXISTING FRAGMENT
                                var f = this.getFragmentByID(node.parentNode.id);
                                f.assignAnnotation(annotation);
                            }
                            
                            fragmentLength = fragmentLength - (origNodeLength - fragmentOffset);
                            fragmentOffset = 0;
                        }
                    }
                    
                    // fragment doesnt start in here
                    else
                    {
                        fragmentOffset = fragmentOffset - origNodeLength;
                    }                         
                }
            }
            
            // --------------------------------------------------------
            // if there is another annotation or suggestion inserted
            else if (AEd.ElU.hasClass(node, AEd.CONFIG.CLASS_ANNOTATION))
            {
                insideFragment = true;
            }
            
            // --------------------------------------------------------
            // there is something else - element - THERE SHOULDNT BE ANY
            else
            {
            }
            
            // iterate to next node
            if(nextNodeFlag)
                node = nextNode;
        }
        

    }  // for (var i = 0; i < annotation.fragments.length


    if (window.opera){  // Opera has problem with tinymce setSelectionContent method (it is a tinymce bug - it creates a lot of unwanted ranges)

       var range = this.editor.wysiwyg.getDocument().createRange();

       range.selectNode(this.editor.wysiwyg.getDocument().body);
       this.editor.wysiwyg.setSelectionRange(range);
    }
}  // createFragments()


// ----------------------------------------------------------- getFragmentByID
/**
 * Returns Fragment instance with specified id
 *  
 * @name getFragmentByID
 * @memberOf AEd.entities.FragmentsManager
 * @function
 * @param {String} id ID of fragment
 * @return {AEd.entities.Fragment} Fragment instance with specified id.         
 */
AEd.entities.FragmentsManager.prototype.getFragmentByID = function(id) {
    if (id) {
        return this.fragmentsByID[id];
    }
    else {
        return null;
    }   
} 



// ----------------------------------------------------------- destroyFragments
/**
 * Removes fragments of specified annotation or suggestion instance
 *  
 * @name destroyFragments
 * @memberOf AEd.entities.FragmentsManager
 * @function
 * @param {AEd.entities.Annotation or AEd.entities.Suggestion} annotation Annotation or suggestion instance to remove fragments from.   
 */
AEd.entities.FragmentsManager.prototype.destroyFragments = function(annotation) {
    if (annotation instanceof AEd.entities.Annotation || annotation instanceof AEd.entities.Suggestion) {
        var i = 0;
        while (i < this.fragments.length) {        
        
            this.fragments[i].removeAnnotation(annotation);
            var assignedAnnotations = this.fragments[i].getAssignedAnnotations();

            if (assignedAnnotations && (assignedAnnotations.length > 0)) {
                i++;
            }  
            else {
                this._destroyFragment(this.fragments[i]);
            }         
        }
    }
} 



// ------------------------------------------------------ updateFragmentsColors
/**
 * Updates color of all fragments.
 *  
 * @name updateFragmentsColors
 * @memberOf AEd.entities.FragmentsManager
 * @function    
 */
AEd.entities.FragmentsManager.prototype.updateFragmentsColors = function() {
    for (var i = 0 ; i < this.fragments.length; i++) {
        this.fragments[i].updateColor(); 
    }   
} 



// --------------------------------------------------------- setShowAnnotations
/**
 * Sets dontShowAnnotations property of each fragment.
 *  
 * @name setShowAnnotations
 * @memberOf AEd.entities.FragmentsManager
 * @function
 * @param {Boolean} value New value.    
 */
AEd.entities.FragmentsManager.prototype.setShowAnnotations = function(value) {
    for (var i = 0 ; i < this.fragments.length; i++) {
        this.fragments[i].dontShowAnnotations = !value; 
    }   
} 



// --------------------------------------------------------------- _getUniqueId
/**
 * Generates unique fragments ID
 *  
 * @name _getUniqueId
 * @memberOf AEd.entities.FragmentsManager
 * @function
 * @return {String} Unique fragment ID for use in <span id="ID">.       
 */
AEd.entities.FragmentsManager.prototype._getUniqueId = function() {
    this.IdCounter ++;
    return this.IdPrefix + this.IdCounter;      
}

// --------------------------------------------------------------- _strlenWithoutCombiningChars
/**
 * Counts a string length, ingnoring combining characters.
 * combining character - e.g. "ˇ + c = č"
 * @name _strlenWithoutCombiningChars
 * @memberOf AEd.entities.FragmentsManager
 * @function
 * @param string: the string
 * @return {String} the string's length
 */
AEd.entities.FragmentsManager.prototype._strlenWithoutCombiningChars = function (string)
{
    //removes common combining characters from the string
    return string.replace(/[\u0300-\u036f\u0483-\u0489\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/g, "").length;
}


// ------------------------------------------------------------ _createFragment
/**
 * Creates fragment
 *  
 * @name _createFragment
 * @memberOf AEd.entities.FragmentsManager
 * @function
 * @param {Object} oParams Fragment parameters.          
 * @param {AEd.entities.Annotation or AEd.entities.Suggestion} annotation Optional - Annotation or suggestion to assign to this fragment.
 * @return {AEd.entities.Fragment} Created Fragment instance            
 */
AEd.entities.FragmentsManager.prototype._createFragment = function(oParams, annotation)
{
    if (oParams)
    {
        oParams.fragmentID = this._getUniqueId();
        oParams.wysiwyg    = this.editor.wysiwyg;

        // create and insert fragment element to wysiwyg editor
        var parentElement = AEd.XML.selectSingleNodeXPath(this.editor.wysiwyg.getDocument(), oParams.wFragmentPath);


        var range;
        if(/Safari/.test(navigator.userAgent) || /Opera/.test(navigator.userAgent))
        {
            rangeDocument = this.editor.wysiwyg.getDocument();
            range = rangeDocument.createRange();
        }
        else
        {
            range = document.createRange();
        }
        
        var fragmentOffset = parseInt(oParams.wFragmentOffset);
        var fragmentLength = parseInt(oParams.wFragmentLength);

        range.setStart(parentElement, fragmentOffset);

        nodeValueLength = parentElement.nodeValue.length;
        
        if ((fragmentOffset + fragmentLength) > nodeValueLength)
        {
            range.setEnd(parentElement, nodeValueLength);
        }
        else
        {
            range.setEnd(parentElement, (fragmentOffset + fragmentLength));
        }
        
        this.editor.wysiwyg.setSelectionRange(range);

        //make HTML
        var fragmentHTML = '<' + AEd.CONFIG.NODE_NAME_ANNOTATION + ' id="' + oParams.fragmentID + '">' + oParams.wFragmentText + '</' + AEd.CONFIG.NODE_NAME_ANNOTATION + '>';

       this.editor.wysiwyg.setSelectionContent(fragmentHTML); 
                         
        var domElementFragment = this.editor.wysiwyg.getDocument().getElementById(oParams.fragmentID);

        // Fix for creating SPAN element with just white characters in native IE8 (IE < 9)
        if (AEd.isIE && AEd.IEversion < 9)
            if (domElementFragment.outerHTML != fragmentHTML.replace('"',''))
                domElementFragment.innerText = oParams.wFragmentText;

        AEd.$(domElementFragment).addClass(AEd.CONFIG.CLASS_ANNOTATION);

        oParams.fragmentElement = domElementFragment;
        oParams.targetElement = this.editor.domElementTarget;

        // create Fragment instance
        var f = new AEd.entities.Fragment(oParams, annotation);
        
        f.onShowAnnotations.addHandler(function(fragment)
        {
            // ---------- folding the attributes
            var clientFoldingOfAttributes = this.editor.settings.getSetting("ClientFoldingOfAttributes");
            var clientFoldingOfAttributesResizeDynamically = this.editor.settings.getSetting("ClientFoldingOfAttributesResizeDynamically");
            var clientFoldingOfAttributesHideButton = this.editor.settings.getSetting("ClientFoldingOfAttributesHideButton");
            var clientFoldingOfAttributesNesteds = this.editor.settings.getSetting("ClientFoldingOfAttributesNesteds");
            var clientFoldingOfAttributesNestedsHideButton = this.editor.settings.getSetting("ClientFoldingOfAttributesNestedsHideButton");
            var clientFoldingOfAttributesNestedsLevels = parseFloat(this.editor.settings.getSetting("ClientFoldingOfAttributesNestedsLevels"));
            var clientFoldingOfAttributesNestedsHideLevel = parseFloat(this.editor.settings.getSetting("ClientFoldingOfAttributesNestedsHideLevel"));
            
            if (clientFoldingOfAttributes == "true")
            {
                for (var i = 0; i < fragment.annotations.length; i++)
                {
                    if (fragment.annotations[i] instanceof AEd.entities.Annotation)
                    {
                        fragment.annotations[i].ui.setAnnoUiAttributesNotFolded();       
                    }
                    else if (fragment.annotations[i] instanceof AEd.entities.Suggestion)
                    {
                        fragment.annotations[i].ui.setSuggUiAttributesNotFolded();    
                    }
                    
                    // hiding folding button
                    if (clientFoldingOfAttributesHideButton == "true")
                    {
                        fragment.annotations[i].ui.btnDetails.hide();    
                    }
                    else
                    {
                        fragment.annotations[i].ui.btnDetails.show();    
                    }
                }
            
                if (clientFoldingOfAttributesResizeDynamically == "false")
                { // static resize
                    fragment.c.width = AEd.CONFIG.DLG_FRAGMENT_WIDTH_NOT_FOLD;
                    fragment.c.height = AEd.CONFIG.DLG_FRAGMENT_HEIGHT_NOT_FOLD;    
                }
                else
                { // dynamic resize
                    fragment.c.width = AEd.CONFIG.DLG_FRAGMENT_WIDTH_NOT_FOLD;
                    fragment.c.height = "";    
                }
            }
            
            else
            {
                for (var i = 0; i < fragment.annotations.length; i++)
                {
                    if (fragment.annotations[i] instanceof AEd.entities.Annotation)
                    {
                        fragment.annotations[i].ui.setAnnoUiAttributesFolded();        
                    }
                    else if (fragment.annotations[i] instanceof AEd.entities.Suggestion)
                    {
                        fragment.annotations[i].ui.setSuggUiAttributesFolded();    
                    }
                    
                    // showing folding button
                    fragment.annotations[i].ui.btnDetails.show();
                }
            
                fragment.c.width = AEd.CONFIG.DLG_FRAGMENT_WIDTH;
                fragment.c.height = AEd.CONFIG.DLG_FRAGMENT_HEIGHT; 
            }
            
            if (clientFoldingOfAttributesNesteds == "true")
            {
                for (var i = 0; i < fragment.annotations.length; i++)
                {
                    if (fragment.annotations[i] instanceof AEd.entities.Annotation)
                    {
                        fragment.annotations[i].ui.setAnnoUiNestedAttributesNotFolded();       
                    }
                    else if (fragment.annotations[i] instanceof AEd.entities.Suggestion)
                    {
                        fragment.annotations[i].ui.setSuggUiNestedAttributesNotFolded();    
                    }
                    
                    // hiding nested folding button
                    if (clientFoldingOfAttributesNestedsHideButton == "true")
                    {
                        fragment.annotations[i].ui.btnNestedDetails.hide();    
                    }
                    else
                    {
                        fragment.annotations[i].ui.btnNestedDetails.show();    
                    }
                }
            }
            
            else
            {
                for (var i = 0; i < fragment.annotations.length; i++)
                {
                    if (fragment.annotations[i] instanceof AEd.entities.Annotation)
                    {
                        fragment.annotations[i].ui.setAnnoUiNestedAttributesFolded();        
                    }
                    else if (fragment.annotations[i] instanceof AEd.entities.Suggestion)
                    {
                        fragment.annotations[i].ui.setSuggUiNestedAttributesFolded();    
                    }
                    
                    // showing nested folding button
                    fragment.annotations[i].ui.btnNestedDetails.show();
                }
            }
            
            // restricts levels of nesting
            for (var i = 0; i < fragment.annotations.length; i++)
            {
                for (var j = 0; j < fragment.annotations[i].nestedAnnotations.length; j++)
                {
                    // hide lower level and set button disabled
                    if (fragment.annotations[i].nestedAnnotations[j])
                    {
                        if (fragment.annotations[i].nestedAnnotations[j].ui.level == clientFoldingOfAttributesNestedsLevels)
                        {
                            fragment.annotations[i].nestedAnnotations[j].ui.hideNestedContent();
                            fragment.annotations[i].nestedAnnotations[j].ui.btnNestedDetails.setIcon("show-nested-details");
                            fragment.annotations[i].nestedAnnotations[j].ui.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_show_nested_details"));
                            fragment.annotations[i].nestedAnnotations[j].ui.btnNestedDetails.setDisabled(true);
                        }
                        else
                        {
                            fragment.annotations[i].nestedAnnotations[j].ui.showNestedContent();
                            fragment.annotations[i].nestedAnnotations[j].ui.btnNestedDetails.setIcon("hide-nested-details");
                            fragment.annotations[i].nestedAnnotations[j].ui.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_hide_nested_details"));                     
                            if (fragment.annotations[i].nestedAnnotations[j].ui.hasNestedContent())
                            {
                                fragment.annotations[i].nestedAnnotations[j].ui.btnNestedDetails.setDisabled(false);
                            }
                            else
                            {
                                fragment.annotations[i].nestedAnnotations[j].ui.btnNestedDetails.setDisabled(true);    
                            }
                        }   
                            
                        // hide lower level
                        if (clientFoldingOfAttributesNestedsHideLevel != -1 && clientFoldingOfAttributesNestedsHideLevel < clientFoldingOfAttributesNestedsLevels)
                        {
                            if (fragment.annotations[i].nestedAnnotations[j].ui.level >= clientFoldingOfAttributesNestedsHideLevel)
                            {
                                fragment.annotations[i].nestedAnnotations[j].ui.hideNestedContent();
                                fragment.annotations[i].nestedAnnotations[j].ui.btnNestedDetails.setIcon("show-nested-details");
                                fragment.annotations[i].nestedAnnotations[j].ui.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_show_nested_details"));
                            }
                            else
                            {
                                fragment.annotations[i].nestedAnnotations[j].ui.showNestedContent();
                                fragment.annotations[i].nestedAnnotations[j].ui.btnNestedDetails.setIcon("hide-nested-details");
                                fragment.annotations[i].nestedAnnotations[j].ui.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_hide_nested_details"));
                            }
                        }
                    }
                }
                
                // hide lower level and set button disabled
                if (fragment.annotations[i].ui.level == clientFoldingOfAttributesNestedsLevels)
                {
                    fragment.annotations[i].ui.hideNestedContent();
                    fragment.annotations[i].ui.btnNestedDetails.setIcon("show-nested-details");
                    fragment.annotations[i].ui.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_show_nested_details"));
                    fragment.annotations[i].ui.btnNestedDetails.setDisabled(true);
                }
                else
                {
                    fragment.annotations[i].ui.showNestedContent();
                    fragment.annotations[i].ui.btnNestedDetails.setIcon("hide-nested-details");
                    fragment.annotations[i].ui.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_hide_nested_details"));
                    if (fragment.annotations[i].ui.hasNestedContent())
                    {
                        fragment.annotations[i].ui.btnNestedDetails.setDisabled(false);
                    }
                    else
                    {
                        fragment.annotations[i].ui.btnNestedDetails.setDisabled(true);    
                    }
                }   
                        
                // hide lower level
                if (clientFoldingOfAttributesNestedsHideLevel != -1 && clientFoldingOfAttributesNestedsHideLevel < clientFoldingOfAttributesNestedsLevels)
                {
                    if (fragment.annotations[i].ui.level >= clientFoldingOfAttributesNestedsHideLevel)
                    {
                        fragment.annotations[i].ui.hideNestedContent();
                        fragment.annotations[i].ui.btnNestedDetails.setIcon("show-nested-details");
                        fragment.annotations[i].ui.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_show_nested_details"));
                    }
                    else
                    {
                        fragment.annotations[i].ui.showNestedContent();
                        fragment.annotations[i].ui.btnNestedDetails.setIcon("hide-nested-details");
                        fragment.annotations[i].ui.btnNestedDetails.setTitle(AEd.I18n.t("Annotation_button_hide_nested_details"));
                    }
                }
            }
            // ----------
        
            if (!this.modeNestedAnnotations)
            {
                if (this.openedFragments.length)
                {
                    for (var i = 0; i < this.openedFragments.length; i++)
                    {
                        this.openedFragments[i].dontHideAnnotations = false;
                        this.openedFragments[i].hideAnnotations();
                        this.openedFragments[i] = null;
                    }
                    this.openedFragments = new Array(); 
                }     
            
            }
            
            if (fragment)
            {
                this.openedFragments.push(fragment);
            }             
        }, this);
        
        f.onHideAnnotations.addHandler(function(fragment)
        {
            if (this.openedFragments.length)
            {
                for (var i = 0; i < this.openedFragments.length; i++)
                {
                    if (this.openedFragments[i] === fragment)
                    {
                        this.openedFragments.splice(i, 1);
                        break;
                    }
                }
            }
            
            if (this.openedFragments.length == 0)
            {
                this.modeNestedAnnotations = false;
            }
            
            if (!this.modeNestedAnnotations)
            {
                this.setShowAnnotations(true);  
            }                
        }, this);
        
        f.onFragmentClicked.addHandler(function(fragment)
        {
            this.setShowAnnotations(false);    
            fragment.dontShowAnnotations = false;               
        }, this);     
        
        var d = this.editor.wysiwyg.getDocument();   
        AEd.Events.addHandler(d, "click", function(fragment)
        {
            if (this.openedFragments.length)
            {                 
                while(this.openedFragments.length)
                {
                    this.openedFragments[0].dontHideAnnotations = false;
                    this.openedFragments[0].hideAnnotations();                                
                }
            }   
            this.modeNestedAnnotations = false;      
            this.setShowAnnotations(true);
            
            if (!this.editor.gui.toolbars.btnShowAnnoDlgs.isSelected)
            {
                this.setShowAnnotations(false);    
            }                 
        }, this);     
        
        f.onFragmentAnnoLinkSelected.addHandler(function(fragment){
            if (this.modeAnnotationLink) {
                if (fragment) {
                    var aAnnotations = fragment.getAssignedAnnotations();

                    if (aAnnotations && aAnnotations.length) {
                        for (var a = 0; a < aAnnotations.length; a++) {  
                            // tested on setModeAnnotationLink for given fragment
                            // this.annoLinkTypeUri is not actual, should contains subtypes
                            this.editor.annotations.onSelectedAnnotationLink.fire(aAnnotations[a]);

                        }
                    }
                }
            }              
        }, this);               

        this.fragmentsByID[f.fragmentID] = f;

        this.fragments.push(f);
        
        return f;
    }
    
    else
    {
        return null;
    }
}



// ----------------------------------------------------------- _destroyFragment
/**
 * Destroys fragment
 *  
 * @name _destroyFragment
 * @memberOf AEd.entities.FragmentsManager
 * @function
 * @param {AEd.entities.Fragment} fragment Fragment instance to destroy.         
 *      
 */
AEd.entities.FragmentsManager.prototype._destroyFragment = function(fragment) {
    if (fragment instanceof AEd.entities.Fragment) {
       var parent = fragment.domElementFragment.parentNode;
       
       if (parent) {  // parent is defined
           var parentParent = parent.parentNode;
           var newParent = document.createElement(parent.nodeName);
       
           while (parent.childNodes.length > 0) {  /// Loops through children
               if (parent.childNodes[0] !== fragment.domElementFragment) {  // Fragment not found
                   var n1 = parent.childNodes[0];
                   parent.removeChild(n1);
                   if (newParent.lastChild && newParent.lastChild.nodeType == 3 && n1.nodeType == 3) {
                       newParent.lastChild.nodeValue = newParent.lastChild.nodeValue + n1.nodeValue;
                   } else {
                       newParent.appendChild(n1);
                   }
               }             
               else {  // Fragment found
                   while (fragment.domElementFragment.childNodes.length > 0) {
                       var n2 = fragment.domElementFragment.childNodes[0];
                       fragment.domElementFragment.removeChild(n2);
                       if (newParent.lastChild && newParent.lastChild.nodeType == 3 && n2.nodeType == 3) {
                           newParent.lastChild.nodeValue = newParent.lastChild.nodeValue + n2.nodeValue;
                       } else {
                           newParent.appendChild(n2);
                       }
                   }
                   parent.removeChild(parent.childNodes[0]);
               }       
           }
       }
       
       if (parentParent) {
          parentParent.replaceChild(newParent, parent);
       }
        
       for (var i = 0 ; i < this.fragments.length; i++) {
           if (this.fragments[i] === fragment) {
              this.fragments.splice(i, 1);
              break;
           }             
       }        
       delete this.fragmentsByID[fragment.fragmentID];
       fragment.destroy();        
    }     
}
 


// ------------------------------------------------------ setModeAnnotationLink
/**
 * Sets mode for selecting annotation link
 *  
 * @name setModeAnnotationLink
 * @memberOf AEd.entities.FragmentsManager
 * @function   
 * @param {Boolean} value True/false if enabling or disabling mode for selecting annotation link.    
 * @param {String} typeUri TypeUri path required when enabling mode for selecting.      
 */
AEd.entities.FragmentsManager.prototype.setModeAnnotationLink = function(value, typeUri) {
  
    // enabling mode for selecting annotation link  
    if (value) {
        var type = this.editor.types.getTypeByURI(typeUri);
        if (type) {
             this.modeAnnotationLink = true;
             this.annoLinkTypeUri = typeUri;
             
             //loops through all fragments
             for (var i = 0; i < this.fragments.length; i++) {
                 //get all annotations and suggestions of the fragment
                 var aAnnotations = this.fragments[i].getAssignedAnnotations();

                 //if there are any annotations or suggestions
                 if (aAnnotations && aAnnotations.length) {
                      var makeHighlighted = false;
                      var annosWithThisTypeCount = 0;
                      for (var a = 0; a < aAnnotations.length; a++) {
                          if (aAnnotations[a].typeUri == typeUri)
                          {
                            makeHighlighted = true;
                            annosWithThisTypeCount++;
                          }
                      }
                      
                      //highlight the fragment
                      if (makeHighlighted) {
                          this.fragments[i].setHighlight(true);
                      }
                      
                      if ((annosWithThisTypeCount > 0) && (annosWithThisTypeCount < 2)) {
                          this.fragments[i].setModeAnnotationLink(true);
                      }
                 }
             }        
        }
        else {
            this.editor.gui.showMessage(AEd.I18n.t("Specified_attribute_type_not_exists"), AEd.I18n.t("Please_select_existing_attribute_type"), "warning");
        }
    }
    
    // disabling mode for selecting annotation link
    else {
       this.modeAnnotationLink = false; 
       this.annoLinkTypeUri = null;   
       for (var i = 0; i < this.fragments.length; i++) {
          this.fragments[i].setHighlight(false);
          var aAnnotations = this.fragments[i].getAssignedAnnotations();
          if (aAnnotations && aAnnotations.length) {
              var suggestion = 0;
              for (var a = 0; a < aAnnotations.length; a++) {
                  if (aAnnotations[a].tmpId) {
                      suggestion++;
                  }
              }
                      
              if (suggestion > 0) {
                  this.fragments[i].setSuggestionClass(true);
              }
              else {
                  this.fragments[i].setSuggestionClass(false);    
              }
          }
          this.fragments[i].setModeAnnotationLink(false);
       }
       
       if (this.openedFragments.length) {
          while(this.openedFragments.length) {
              this.openedFragments[0].dontHideAnnotations = false;
              this.openedFragments[0].hideAnnotations();
              this.openedFragments.splice(0, 1);          
          }

       }         
       this.setShowAnnotations(true);        
    }
}



// ------------------------------------------------------- showNestedAnnotation
/**
 * Shows nested annotation by specified uri.
 *  
 * @name showNestedAnnotation
 * @memberOf AEd.entities.FragmentsManager
 * @function      
 * @param {String} annoUri URI of nested annotation. 
 * @param {String} callerUri Uri of caller annotation (to prevent annotations hiding if more fragments contains the same annotation and they are opened in the same time through links).  
 */
AEd.entities.FragmentsManager.prototype.showNestedAnnotation = function(annoUri, callerUri) {

    var fragmentsWithThisAnno = new Array();
    
    for (var i = 0; i < this.fragments.length; i++) {
        var aAnnotations = this.fragments[i].getAssignedAnnotations();
        var found = false;
        if (aAnnotations && aAnnotations.length) {
            for (var j = 0; j < aAnnotations.length; j++) {
                 if (aAnnotations[j].uri == annoUri) {
                    found = true;
                    break;
                 }           
            }
        } 
        if (found) {
            fragmentsWithThisAnno.push(this.fragments[i]);
        }   
    }

    // prevent annotations hiding if more fragments contains the same annotation and they are opened in the same time through links

    if (callerUri){

      for (var i = 0; i < fragmentsWithThisAnno.length; i++){

          for (var j = 0; j < fragmentsWithThisAnno[i].annotations.length; j++){

              if (fragmentsWithThisAnno[i].annotations[j].uri == callerUri){
 
                 this.hideOpenedFragments();
                 break;
              }
          }
      }
    }

    // show anontations on first found fragment with this annotation
    if (fragmentsWithThisAnno.length) {
        var f = fragmentsWithThisAnno[0]; 
        this.modeNestedAnnotations = true; 
        this.setShowAnnotations(false);
            
        f.dontHideAnnotations = true;
        
        f.showAnnotations();        
        //this.openedFragments.push(f);
    }
}



// ------------------------------------------------------ setSuggestionsClass
/**
 * Sets class to all suggestions
 *  
 * @name setSuggestionsClass
 * @memberOf AEd.entities.FragmentsManager
 * @function    
 */
AEd.entities.FragmentsManager.prototype.setSuggestionsClass = function() {  

    for (var i = 0; i < this.fragments.length; i++) {
        var aAnnotations = this.fragments[i].getAssignedAnnotations();
        if (aAnnotations && aAnnotations.length) {
            var suggestion = 0;
            for (var a = 0; a < aAnnotations.length; a++) {
                if (aAnnotations[a].tmpId) {
                    suggestion++;
                }
            }
                      
            if (suggestion > 0) {
                this.fragments[i].setSuggestionClass(true);
            }
            else {
                this.fragments[i].setSuggestionClass(false);    
            }
        }
    }
}



// ------------------------------------------------------- hideOpenedFragments
/**
 * Hide all opened fragments.
 *  
 * @name hideOpenedFragments
 * @memberOf AEd.entities.FragmentsManager
 * @function    
 */
AEd.entities.FragmentsManager.prototype.hideOpenedFragments = function() {

    if (!this.modeNestedAnnotations) {
        if (this.openedFragments.length) {
            for (var i = 0; i < this.openedFragments.length; i++) {
                this.openedFragments[i].dontHideAnnotations = false;
                this.openedFragments[i].hideAnnotations();
                this.openedFragments[i] = null;                
            }
            this.openedFragments = new Array();
        }
    }    
}



// ------------------------------------------------------- showSuggestion
/**
 * Shows suggestion by specified tmpId.
 *  
 * @name showSuggestion
 * @memberOf AEd.entities.FragmentsManager
 * @function      
 * @param {Number} suggTmpId TmpId of suggestion.       
 */
AEd.entities.FragmentsManager.prototype.showSuggestion = function(suggTmpId) {

    if (!this.openedFragments.length) {

        this.hideOpenedFragments();
        var fragmentsWithThisSugg = new Array();
    
        for (var i = 0; i < this.fragments.length; i++) {
            var aSuggestions = this.fragments[i].getAssignedAnnotations();
            var found = false;
            if (aSuggestions && aSuggestions.length) {
                for (var j = 0; j < aSuggestions.length; j++) {
                    if (aSuggestions[j].tmpId == suggTmpId) {
                        found = true;
                        break;
                    }           
                }
            } 
            if (found) {
                fragmentsWithThisSugg.push(this.fragments[i]);
            }   
        }
    
        // show suggestions on first found fragment with this suggestion
        if (fragmentsWithThisSugg.length) {
            var f = fragmentsWithThisSugg[0]; 
            this.modeNestedAnnotations = false; 
            this.setShowAnnotations(false);
            
            f.dontHideAnnotations = true;
        
            f.showAnnotations();        
        }
    }
}



// ------------------------------------------------------- showNestedSuggestion
/**
 * Shows nested suggestion by specified tmpId on nested attribute click.
 *  
 * @name showNestedSuggestion
 * @memberOf AEd.entities.FragmentsManager
 * @function      
 * @param {Number} suggTmpId TmpId of nested suggestion.        
 */
AEd.entities.FragmentsManager.prototype.showNestedSuggestion = function(suggTmpId) {

    var fragmentsWithThisSugg = new Array();
    
    for (var i = 0; i < this.fragments.length; i++) {
        var aSuggestions = this.fragments[i].getAssignedAnnotations();
        var found = false;
        if (aSuggestions && aSuggestions.length) {
            for (var j = 0; j < aSuggestions.length; j++) {
                 if (aSuggestions[j].tmpId == suggTmpId) {
                    found = true;
                    break;
                 }           
            }
        } 
        if (found) {
            fragmentsWithThisSugg.push(this.fragments[i]);
        }   
    }
    
    // show suggestions on first found fragment with this suggestion
    if (fragmentsWithThisSugg.length) {
        var f = fragmentsWithThisSugg[0]; 
        this.modeNestedAnnotations = true; 
        this.setShowAnnotations(false);
            
        f.dontHideAnnotations = true;
        
        f.showAnnotations();        
    }
}



// *****************************************************************************
// class AEd.entities.FragmentsManager
// ***************************************************************************** 

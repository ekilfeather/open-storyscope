/* ***** BEGIN LICENSE BLOCK *****
* Licensed under Version: MPL 1.1/GPL 2.0/LGPL 2.1
* Full Terms at http://mozile.mozdev.org/0.8/LICENSE
*
* Software distributed under the License is distributed on an "AS IS" basis,
* WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
* for the specific language governing rights and limitations under the
* License.
*
* The Original Code is Chris Nott's code (chris[at]dithered[dot]com).
*
* The Initial Developer of the Original Code is Chris Nott.
* Portions created by the Initial Developer are Copyright (C) 2003
* the Initial Developer. All Rights Reserved.
*
* Contributor(s):
*	James A. Overton <james@overton.ca>
*
* ***** END LICENSE BLOCK ***** */

/**
* @fileoverview An implementation of a TreeWalker for DOM traversal, using basic DOM2 methods.
* <p>History: The original version of this file, named "DOM2 Traversal v1.0",  was written by Chris Nott and is available at <http://www.dithered.com/javascript/dom2_traversal/index.html> under a Creative Commons license (http://creativecommons.org/licenses/by/1.0/).
* The current version has been modified by James A. Overton to work with Mozile. Key changes include wrapping the objects in the Mozile namespace, so as to minimize the impact on other scripts in the same page.
* The goal is to make this work exactly like Mozilla's treeWalker. See an example at http://www.mozilla.org/docs/dom/samples/treewalkerdemo.xml
*
* Modified to work in IE<9 by Pavel Penkava
*
* @link http://mozile.mozdev.org 
* @author James A. Overton <james@overton.ca>
* @version 0.8
* $Id: overview-summary-TreeWalker.js.html,v 1.12 2008/02/20 18:47:09 jameso Exp $
*/

// End of Headers

(function () {	// sandbox

var searchFor = "MSIE ";
var position = navigator.userAgent.indexOf(searchFor);
if (position > -1) {
  var isIE = true;
  var IEversion = parseInt(navigator.userAgent.substring(position + searchFor.length));
}

// Mozilla has support by default, we don't have an implementation for the rest
if (isIE && IEversion < 9) {
/**
* The Node is designed for easy to read comparison purposes
* @type Object
*/
Node = {
    ELEMENT_NODE: 1,
    ATTRIBUTE_NODE: 2,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    ENTITY_REFERENCE_NODE: 5,
    ENTITY_NODE: 6,
    PROCESSING_INSTRUCTION_NODE: 7,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9,
    DOCUMENT_TYPE_NODE: 10,
    DOCUMENT_FRAGMENT_NODE: 11,
    NOTATION_NODE: 12
}

/**
* The NodeFilter is used to describe which node should be included by the TreeWalker, and which should be ignored.
* @type Object
*/
NodeFilter = {
    FILTER_ACCEPT: 1, // means the node should be used
    FILTER_REJECT: 2, // means the node should not be used
    FILTER_SKIP: 3, // means the node should not be used
    SHOW_ALL: -1,
    SHOW_ELEMENT: 1,
    SHOW_ATTRIBUTE: 2,
    SHOW_TEXT: 4,
    SHOW_CDATA_SECTION: 8,
    SHOW_ENTITY_REFERENCE: 16,
    SHOW_ENTITY: 32,
    SHOW_PROCESSING_INSTRUCTIONS: 64,
    SHOW_COMMENT: 128,
    SHOW_DOCUMENT: 256,
    SHOW_DOCUMENT_TYPE: 512,
    SHOW_DOCUMENT_FRAGMENT: 1024,
    SHOW_NOTATION: 2048
}


/**
* The TreeWalker is used to traverse the DOM tree.
* @param {Element} root A reference to the node that will serve as the root of the TreeWalker.
* @param {Integer} whatToShow A bitmask of one or more of the NodeFilter flags that indicate what node types to look at. Though all the NodeFilter flags are defined, only the following will actually work in IE5-6: NodeFilter.SHOW_ALL, NodeFilter.SHOW_ELEMENT, NodeFilter.SHOW_ELEMENT, NodeFilter.SHOW_ATTRIBUTE, NodeFilter.SHOW_TEXT, NodeFilter.SHOW_COMMENT, NodeFilter.SHOW_DOCUMENT, NodeFilter.SHOW_DOCUMENT_FRAGMENT.
* @param {NodeFilter} filter This is an object that has an acceptNode() method which accepts a node as it's single argument and returns either NodeFilter.FILTER_ACCEPT, NodeFilter.FILTER_REJECT, or NodeFilter.FILTER_SKIP to indicate if the node should be included in the TreeWalker.
* @param {Boolean} expandEntityReferences Not implemented. A boolean to indicate if entity references should be expanded. Because this script was developed for HTML documents, this argument is ignored.
* @constructor
*/
TreeWalker = function (root, whatToShow, filter, expandEntityReferences) {
    /**
    * The root of the tree being walked.
    * @type Element
    */
    this.root = root;

    /**
    * A flag indicating which node types to show.
    * @type Integer
    */
    this.whatToShow = whatToShow;

    /**
    * A NodeFilter object which will be used to filter the nodes.
    * @type NodeFIlter
    */
    this.filter = NodeFilter;
    this.filter.acceptNode = filter;

    /**
    * Indicates whether entity references should be expanded.
    * @type Boolean
    */
    this.expandEntityReferences = expandEntityReferences;

    /**
    * A reference to the current node being examined by this TreeWalker.
    * @type Node
    */
    this.currentNode = root;
}



//*************************************
// Public Members

/**
* The parentNode() method looks at the current node's ancestor nodes (starting with the parent node and working up) to find the first ancestor that passes the treeWalker's filter. If one is found, that node is returned and it becomes the current node for the TreeWalker. If the root node is reached before any acceptable nodes are found, the method returns null and the current node is not changed.
* @type Node
* @return The first ancestor node of the current node that passes the treeWalker's filter; null if the treeWalker's root node is reached before any acceptable nodes are found or if no parent node is found.
*/
TreeWalker.prototype.parentNode = function () {
    var testNode = this.currentNode;
    do {
        if (testNode != this.root &&
			testNode.parentNode != this.root &&
			testNode.parentNode != null) {
            testNode = testNode.parentNode;
        }
        else return null;
    } while (this._getFilteredStatus(testNode) != NodeFilter.FILTER_ACCEPT);

    if (testNode != null) this.currentNode = testNode;
    return testNode;
}

/**
* The firstChild() method looks through the current node's child nodes (starting with the first child and working down) to find a child that passes the treeWalker's filter. If one is found, that child is returned and it becomes the current node for the TreeWalker. If no acceptable node is found, the method returns null and the current node is not changed.
* @type Node
* @return The first child node of the current node that passes the treeWalker's filter; null if the current node has no child nodes or if none of the child nodes pass the filter.
*/
TreeWalker.prototype.firstChild = function () {
    var testNode = this.currentNode.firstChild;
    while (testNode != null) {
        if (this._getFilteredStatus(testNode) == NodeFilter.FILTER_ACCEPT) {
            break;
        }
        testNode = testNode.nextSibling;
    }

    if (testNode != null) this.currentNode = testNode;
    return testNode;
}

/**
* The lastChild() method looks through the current node's child nodes (starting with the last child and working up) to find a child that passes the treeWalker's filter. If one is found, that child is returned and it becomes the current node for the TreeWalker. If no acceptable node is found, the method returns null and the current node is not changed.
* @type Node
* @return The last child node of the current node that passes the treeWalker's filter; null if the current node has no child nodes or if none of the child nodes pass the filter.
*/
TreeWalker.prototype.lastChild = function () {
    var testNode = this.currentNode.lastChild;
    while (testNode != null) {
        if (this._getFilteredStatus(testNode) == NodeFilter.FILTER_ACCEPT) {
            break;
        }
        testNode = testNode.previousSibling;
    }

    if (testNode != null) this.currentNode = testNode;
    return testNode;
}

/**
* The nextNode() and previousNode() methods look at a flattened version of the document (instead of the other methods that preserve the document's structure). The nextNode() method returns the next node after the current node that passes the treeWalker's filter. If one is found, that node is returned and it becomes the current node for the TreeWalker. If there are no root node descendants after the current node that pass the filter, the method returns null and the current node is not changed.
* @type Node
* @return The node after the current node in a flattened view of the document that passes the treeWalker's filter; null if there are no nodes after the current node that are also descendants of the root node.
*/
TreeWalker.prototype.nextNode = function () {
    var testNode = this.currentNode;
    while (testNode != null) {
        // next node is the first child, if any
        if (testNode.childNodes.length != 0) testNode = testNode.firstChild;

        // or the next sibling, if any
        else if (testNode.nextSibling != null) testNode = testNode.nextSibling;

        // or the closest ancestor's next sibling, if any
        else {
            while (testNode != null) {
                if (testNode.parentNode != this.root && testNode.parentNode != null) {
                    if (testNode.parentNode.nextSibling != null) {
                        testNode = testNode.parentNode.nextSibling;
                        break;
                    }
                    else testNode = testNode.parentNode;
                }
                else return null;
            }
        }

        if (testNode != null && this._getFilteredStatus(testNode) == NodeFilter.FILTER_ACCEPT) {
            break;
        }
    }

    if (testNode != null) this.currentNode = testNode;
    return testNode;
}

/**
* The nextNode() and previousNode() methods look at a flattened version of the document (instead of the other methods that preserve the document's structure). The previousNode() method returns the node before the current node that passes the treeWalker's filter. If one is found, that node is returned and it becomes the current node for the TreeWalker. If there are no root node descendants before the current node that pass the filter, the method returns null and the current node is not changed.
* @type Node
* @return The node before the current node in a flattened view of the document that passes the treeWalker's filter; null if there are no nodes before the current node that are also descendants of the root node.
*/
TreeWalker.prototype.previousNode = function () {

    // look for a filter-acceptable node before current node
    var testNode = this.currentNode;
    while (testNode != null) {

        // previous node is the previous sibling's last child, 
        // or the previous sibling, if one exists
        if (testNode.previousSibling != null) {
            testNode = testNode.previousSibling;
            while (testNode.lastChild != null) {
                testNode = testNode.lastChild;
            }
        }

        // or the parent node
        else {
            if (testNode.parentNode != this.root && testNode.parentNode != null) {
                testNode = testNode.parentNode;
            }
            else testNode = null;
        }

        if (testNode != null && this._getFilteredStatus(testNode) == NodeFilter.FILTER_ACCEPT) {
            break;
        }
    }

    if (testNode != null) this.currentNode = testNode;
    return testNode;
}

/**
* The nextSibling() method looks through the current node's siblings nodes (starting with the next sibling and working down) to find a sibling that passes the treeWalker's filter. If one is found, that node is returned and it becomes the current node for the TreeWalker. If no acceptable node is found, the method returns null and the current node is not changed.
* @type Node
* @return The next sibling node of the current node that passes the treeWalker's filter; null if the current node has no sibling nodes after it or if none of the later sibling nodes pass the filter.
*/
TreeWalker.prototype.nextSibling = function () {
    var testNode = this.currentNode;
    while (testNode != null) {
        if (testNode.nextSibling != null) testNode = testNode.nextSibling;
        if (this._getFilteredStatus(testNode) == NodeFilter.FILTER_ACCEPT) {
            break;
        }
    }

    if (testNode != null) this.currentNode = testNode;
    return testNode;
}

/**
* The previousSibling() method looks through the current node's siblings nodes (starting with the previous sibling and working up) to find a sibling that passes the treeWalker's filter. If one is found, that node is returned and it becomes the current node for the TreeWalker. If no acceptable node is found, the method returns null and the current node is not changed.
* @type Node
* @return The previous sibling node of the current node that passes the treeWalker's filter; null if the current node has no sibling nodes before it or if none of the previous sibling nodes pass the filter.
*/
TreeWalker.prototype.previousSibling = function () {
    var testNode = this.currentNode;
    while (testNode != null) {
        if (testNode.previousSibling != null) testNode = testNode.previousSibling;
        if (this._getFilteredStatus(testNode) == NodeFilter.FILTER_ACCEPT) {
            break;
        }
    }

    if (testNode != null) this.currentNode = testNode;
    return testNode;
}



//*************************************
// Private Members

/**
* Determines the filtered status of the given node.
* Uses a bitmask system. For using bitmasks, see http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Operators:Bitwise_Operators#Example:_Flags_and_bitmasks
* @param {Node} node The node to check against the "whatToShow" value for the TreeWalker.
* @private
* @type Integer
*/
TreeWalker.prototype._getFilteredStatus = function (node) {

    var mask = null;
    switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            mask = NodeFilter.SHOW_ELEMENT;
            break;
        case Node.ATTRIBUTE_NODE:
            mask = NodeFilter.SHOW_ATTRIBUTE;
            break;
        case Node.TEXT_NODE:
            mask = NodeFilter.SHOW_TEXT;
            break;
        case Node.CDATA_SECTION_NODE:
            mask = NodeFilter.SHOW_CDATA_SECTION;
            break;
        case Node.ENTITY_REFERENCE_NODE:
            mask = NodeFilter.SHOW_ENTITY_REFERENCE;
            break;
        case Node.ENTITY_NODE:
            mask = NodeFilter.SHOW_PROCESSING_INSTRUCTION;
            break;
        case Node.PROCESSING_INSTRUCTION_NODE:
            mask = NodeFilter.SHOW_PROCESSING_INSTRUCTION;
            break;
        case Node.COMMENT_NODE:
            mask = NodeFilter.SHOW_COMMENT;
            break;
        case Node.DOCUMENT_NODE:
            mask = NodeFilter.SHOW_DOCUMENT;
            break;
        case Node.DOCUMENT_TYPE_NODE:
            mask = NodeFilter.SHOW_DOCUMENT_TYPE;
            break;
        case Node.DOCUMENT_FRAGMENT_NODE:
            mask = NodeFilter.SHOW_DOCUMENT_FRAGMENT;
            break;
        case Node.NOTATION_NODE:
            mask = NodeFilter.SHOW_NOTATION;
            break;
    }

    // Use a bit mask to determine if whatToShow includes this node.
    if (mask != null && (this.whatToShow & mask) == 0) {
        return NodeFilter.FILTER_REJECT;
    }
    // Check node against filter if one exists
    if (this.filter != null && this.filter.acceptNode != null) {
        return this.filter.acceptNode(node);
    }
    return NodeFilter.FILTER_ACCEPT;
}

HTMLDocument.prototype.createTreeWalker = function (root, whatToShow, filter, expandEntityReferences) {
    return new TreeWalker(root, whatToShow, filter, expandEntityReferences);
};

}

})();

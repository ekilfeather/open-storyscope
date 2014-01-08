/*
  DOM Ranges for Internet Explorer (m2)
  
  Copyright (c) 2009 Tim Cameron Ryan
  Released under the MIT/X License
  
  Modified with usage of TinyMCE methods findCommonAncestor (DOMUtils.js) and compareBoundaryPoints (Range.js) by Pavel Penkava
 */
 
/*
  Range reference:
    http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html
    http://mxr.mozilla.org/mozilla-central/source/content/base/src/nsRange.cpp
    https://developer.mozilla.org/En/DOM:Range
  Selection reference:
    http://trac.webkit.org/browser/trunk/WebCore/page/DOMSelection.cpp
  TextRange reference:
    http://msdn.microsoft.com/en-us/library/ms535872.aspx
  Other links:
    http://jorgenhorstink.nl/test/javascript/range/range.js
    http://jorgenhorstink.nl/2006/07/05/dom-range-implementation-in-ecmascript-completed/
    http://dylanschiemann.com/articles/dom2Range/dom2RangeExamples.html
    http://www.tinymce.com/download/download.php
*/

//[TODO] better exception support

(function () {	// sandbox

var searchFor = "MSIE ";
var position = navigator.userAgent.indexOf(searchFor);
if (position > -1) {
  var isIE = true;
  var IEversion = parseInt(navigator.userAgent.substring(position + searchFor.length));
}

// Mozilla has support by default, we don't have an implementation for the rest
if (isIE && IEversion < 9) {
/*
  DOM functions
 */

var DOMUtils = {
	findChildPosition: function (node) {
		for (var i = 0; node = node.previousSibling; i++)
			continue;
		return i;
	},
	isDataNode: function (node) {
		return node && node.nodeValue !== null && node.data !== null;
	},
	isAncestorOf: function (parent, node) {
		if (DOMUtils.isDataNode(parent))
				return false;

		if (!parent.contains) // Fix for Document node
				parent.contains = document.body.contains; // Function assignment

		return (parent.contains(DOMUtils.isDataNode(node) ? node.parentNode : node) ||
		    node.parentNode == parent);
	},
	isAncestorOrSelf: function (root, node) {
		return DOMUtils.isAncestorOf(root, node) || root == node;
	},
	findClosestAncestor: function (root, node) {
		if (DOMUtils.isAncestorOf(root, node))
			while (node && node.parentNode != root)
				node = node.parentNode;
		return node;
	},
	getNodeLength: function (node) {
		return DOMUtils.isDataNode(node) ? node.length : node.childNodes.length;
	},
	splitDataNode: function (node, offset) {
		if (!DOMUtils.isDataNode(node))
			return false;
		var newNode = node.cloneNode(false);
		node.deleteData(offset, node.length);
		newNode.deleteData(0, offset);
		node.parentNode.insertBefore(newNode, node.nextSibling);
	}
};

/*
  Text Range utilities
  functions to simplify text range manipulation in ie
 */

var TextRangeUtils = {
	convertToDOMRange: function (textRange, document) {
		function adoptBoundary(domRange, textRange, bStart) {
			// iterate backwards through parent element to find anchor location
			var cursorNode = document.createElement('a'), cursor = textRange.duplicate();
			cursor.collapse(bStart);
			var parent = cursor.parentElement();
			do {
				parent.insertBefore(cursorNode, cursorNode.previousSibling);
				cursor.moveToElementText(cursorNode);
			} while (cursor.compareEndPoints(bStart ? 'StartToStart' : 'StartToEnd', textRange) > 0 && cursorNode.previousSibling);

			// when we exceed or meet the cursor, we've found the node
			if (cursor.compareEndPoints(bStart ? 'StartToStart' : 'StartToEnd', textRange) == -1 && cursorNode.nextSibling) {
				// data node
				cursor.setEndPoint(bStart ? 'EndToStart' : 'EndToEnd', textRange);
				domRange[bStart ? 'setStart' : 'setEnd'](cursorNode.nextSibling, cursor.text.length);
			} else {
				// element
				domRange[bStart ? 'setStartBefore' : 'setEndBefore'](cursorNode);
			}
			cursorNode.parentNode.removeChild(cursorNode);
		}
	
		// return a DOM range
		var domRange = new DOMRange(document);
		adoptBoundary(domRange, textRange, true);
		adoptBoundary(domRange, textRange, false);

		// selection starts in the beginning of the html tag
		if (domRange.startContainer.nodeType != 3) {
		    domRange.startContainer = domRange.startContainer.firstChild;
		}
		// selection ends in the ending of the html tag
		if (domRange.endContainer.nodeType != 3) {
		    domRange.endContainer = domRange.endContainer.lastChild;
		    domRange.endOffset = domRange.endContainer.length;
		}

		return domRange;
	},

	convertFromDOMRange: function (domRange) {
		function adoptEndPoint(textRange, domRange, bStart) {
			// find anchor node and offset
			var container = domRange[bStart ? 'startContainer' : 'endContainer'];
			var offset = domRange[bStart ? 'startOffset' : 'endOffset'], textOffset = 0;
			var anchorNode = DOMUtils.isDataNode(container) ? container : container.childNodes[offset];
			var anchorParent = DOMUtils.isDataNode(container) ? container.parentNode : container;
			// visible data nodes need a text offset
			if (container.nodeType == 3 || container.nodeType == 4)
				textOffset = offset;

			// create a cursor element node to position range (since we can't select text nodes)
			var cursorNode = domRange._document.createElement('a');
			anchorParent.insertBefore(cursorNode, anchorNode);
			var cursor = domRange._document.body.createTextRange();
			cursor.moveToElementText(cursorNode);
			cursorNode.parentNode.removeChild(cursorNode);
			// move range
			textRange.setEndPoint(bStart ? 'StartToStart' : 'EndToStart', cursor);
			textRange[bStart ? 'moveStart' : 'moveEnd']('character', textOffset);
		}
		
		// return an IE text range
		var textRange = domRange._document.body.createTextRange();
		adoptEndPoint(textRange, domRange, true);
		adoptEndPoint(textRange, domRange, false);
		return textRange;
	}
};

/*
  DOM Range
 */
 
function DOMRange(document) {
	// save document parameter
	this._document = document;
	
	// initialize range
//[TODO] this should be located at document[0], document[0]
	this.startContainer = this.endContainer = document.body;
	this.endOffset = DOMUtils.getNodeLength(document.body);
}
DOMRange.START_TO_START = 0;
DOMRange.START_TO_END = 1;
DOMRange.END_TO_END = 2;
DOMRange.END_TO_START = 3;

DOMRange.prototype = {
	// public properties
	startContainer: null,
	startOffset: 0,
	endContainer: null,
	endOffset: 0,
	commonAncestorContainer: null,
	collapsed: false,
	// private properties
	_document: null,
	
	// private methods
	_refreshProperties: function () {
		// collapsed attribute
		this.collapsed = (this.startContainer == this.endContainer && this.startOffset == this.endOffset);
		// find common ancestor
		var node = this.startContainer;
		while (node && node != this.endContainer && !DOMUtils.isAncestorOf(node, this.endContainer))
			node = node.parentNode;
		this.commonAncestorContainer = node;
	},
	
	// range methods
//[TODO] collapse if start is after end, end is before start
	setStart: function(container, offset) {
		this.startContainer = container;
		this.startOffset = offset;
		this._refreshProperties();
	},
	setEnd: function(container, offset) {
		this.endContainer = container;
		this.endOffset = offset;
		this._refreshProperties();
	},
	setStartBefore: function (refNode) {
		// set start to beore this node
		this.setStart(refNode.parentNode, DOMUtils.findChildPosition(refNode));
	},
	setStartAfter: function (refNode) {
		// select next sibling
		this.setStart(refNode.parentNode, DOMUtils.findChildPosition(refNode) + 1);
	},
	setEndBefore: function (refNode) {
		// set end to beore this node
		this.setEnd(refNode.parentNode, DOMUtils.findChildPosition(refNode));
	},
	setEndAfter: function (refNode) {
		// select next sibling
		this.setEnd(refNode.parentNode, DOMUtils.findChildPosition(refNode) + 1);
	},
	selectNode: function (refNode) {
		this.setStartBefore(refNode);
		this.setEndAfter(refNode);
	},
	selectNodeContents: function (refNode) {
		this.setStart(refNode, 0);
		this.setEnd(refNode, DOMUtils.getNodeLength(refNode));
	},
	collapse: function (toStart) {
		if (toStart)
			this.setEnd(this.startContainer, this.startOffset);
		else
			this.setStart(this.endContainer, this.endOffset);
	},

	// editing methods
	cloneContents: function () {
		// clone subtree
		return (function cloneSubtree(iterator) {
			for (var node, frag = document.createDocumentFragment(); node = iterator.next(); ) {
				node = node.cloneNode(!iterator.hasPartialSubtree());
				if (iterator.hasPartialSubtree())
					node.appendChild(cloneSubtree(iterator.getSubtreeIterator()));
				frag.appendChild(node);
			}
			return frag;
		})(new RangeIterator(this));
	},
	extractContents: function () {
		// cache range and move anchor points
		var range = this.cloneRange();
		if (this.startContainer != this.commonAncestorContainer)
			this.setStartAfter(DOMUtils.findClosestAncestor(this.commonAncestorContainer, this.startContainer));
		this.collapse(true);
		// extract range
		return (function extractSubtree(iterator) {
			for (var node, frag = document.createDocumentFragment(); node = iterator.next(); ) {
				iterator.hasPartialSubtree() ? node = node.cloneNode(false) : iterator.remove();
				if (iterator.hasPartialSubtree())
					node.appendChild(extractSubtree(iterator.getSubtreeIterator()));
				frag.appendChild(node);
			}
			return frag;
		})(new RangeIterator(range));
	},
	deleteContents: function () {
		// cache range and move anchor points
		var range = this.cloneRange();
		if (this.startContainer != this.commonAncestorContainer)
			this.setStartAfter(DOMUtils.findClosestAncestor(this.commonAncestorContainer, this.startContainer));
		this.collapse(true);
		// delete range
		(function deleteSubtree(iterator) {
			while (iterator.next())
				iterator.hasPartialSubtree() ? deleteSubtree(iterator.getSubtreeIterator()) : iterator.remove();
		})(new RangeIterator(range));
	},
	insertNode: function (newNode) {
		// set original anchor and insert node
		if (DOMUtils.isDataNode(this.startContainer)) {
			DOMUtils.splitDataNode(this.startContainer, this.startOffset);
			this.startContainer.parentNode.insertBefore(newNode, this.startContainer.nextSibling);
		} else {
			this.startContainer.insertBefore(newNode, this.startContainer.childNodes[this.startOffset]);
		}
		// resync start anchor
		this.setStart(this.startContainer, this.startOffset);
	},
	surroundContents: function (newNode) {
		// extract and surround contents
		var content = this.extractContents();
		this.insertNode(newNode);
		newNode.appendChild(content);
		this.selectNode(newNode);
	},

	// other methods
	compareBoundaryPoints: function (how, sourceRange) {
    // fixed using TinyMCE compareBoundaryPoints and findCommonAncestor methods, because original version was buggy
    function _findCommonAncestor (a, b) {
			var ps = a, pe;

			while (ps) {
				pe = b;

				while (pe && ps != pe)
					pe = pe.parentNode;

				if (ps == pe)
					break;

				ps = ps.parentNode;
			}

			if (!ps && a.ownerDocument)
				return a.ownerDocument.documentElement;

			return ps;
		}
		function _compareBoundaryPoints(containerA, offsetA, containerB, offsetB) {
			var c, offsetC, n, cmnRoot, childA, childB;
			
			// In the first case the boundary-points have the same container. A is before B
			// if its offset is less than the offset of B, A is equal to B if its offset is
			// equal to the offset of B, and A is after B if its offset is greater than the
			// offset of B.
			if (containerA == containerB) {
				if (offsetA == offsetB)
					return 0; // equal

				if (offsetA < offsetB)
					return -1; // before

				return 1; // after
			}

			// In the second case a child node C of the container of A is an ancestor
			// container of B. In this case, A is before B if the offset of A is less than or
			// equal to the index of the child node C and A is after B otherwise.
			c = containerB;
			while (c && c.parentNode != containerA)
				c = c.parentNode;

			if (c) {
				offsetC = 0;
				n = containerA.firstChild;

				while (n != c && offsetC < offsetA) {
					offsetC++;
					n = n.nextSibling;
				}

				if (offsetA <= offsetC)
					return -1; // before

				return 1; // after
			}

			// In the third case a child node C of the container of B is an ancestor container
			// of A. In this case, A is before B if the index of the child node C is less than
			// the offset of B and A is after B otherwise.
			c = containerA;
			while (c && c.parentNode != containerB) {
				c = c.parentNode;
			}

			if (c) {
				offsetC = 0;
				n = containerB.firstChild;

				while (n != c && offsetC < offsetB) {
					offsetC++;
					n = n.nextSibling;
				}

				if (offsetC < offsetB)
					return -1; // before

				return 1; // after
			}

			// In the fourth case, none of three other cases hold: the containers of A and B
			// are siblings or descendants of sibling nodes. In this case, A is before B if
			// the container of A is before the container of B in a pre-order traversal of the
			// Ranges' context tree and A is after B otherwise.
			cmnRoot = _findCommonAncestor(containerA, containerB);
			childA = containerA;

			while (childA && childA.parentNode != cmnRoot)
				childA = childA.parentNode;

			if (!childA)
				childA = cmnRoot;

			childB = containerB;
			while (childB && childB.parentNode != cmnRoot)
				childB = childB.parentNode;

			if (!childB)
				childB = cmnRoot;

			if (childA == childB)
				return 0; // equal

			n = cmnRoot.firstChild;
			while (n) {
				if (n == childA)
					return -1; // before

				if (n == childB)
					return 1; // after

				n = n.nextSibling;
			}
		};

		var sc = this.startContainer, so = this.startOffset, ec = this.endContainer, eo = this.endOffset,
		rsc = sourceRange.startContainer, rso = sourceRange.startOffset, rec = sourceRange.endContainer, reo = sourceRange.endOffset;

		switch (how) {
		  case DOMRange.START_TO_START:
			  return _compareBoundaryPoints(sc, so, rsc, rso);
        break;
		  case DOMRange.START_TO_END:
			  return _compareBoundaryPoints(ec, eo, rsc, rso);
        break;
		  case DOMRange.END_TO_END:
			  return _compareBoundaryPoints(ec, eo, rec, reo);
        break;
		  case DOMRange.END_TO_START:
			  return _compareBoundaryPoints(sc, so, rec, reo);
        break;
    }
	},
	cloneRange: function () {
		// return cloned range
		var range = new DOMRange(this._document);
		range.setStart(this.startContainer, this.startOffset);
		range.setEnd(this.endContainer, this.endOffset);
		return range;
	},
	detach: function () {
//[TODO] Releases Range from use to improve performance. 
	},
	toString: function () {
		return TextRangeUtils.convertFromDOMRange(this).text;
	},
	createContextualFragment: function (tagString) {
		// parse the tag string in a context node
		var content = (DOMUtils.isDataNode(this.startContainer) ? this.startContainer.parentNode : this.startContainer).cloneNode(false);
		content.innerHTML = tagString;
		// return a document fragment from the created node
		for (var fragment = this._document.createDocumentFragment(); content.firstChild; )
			fragment.appendChild(content.firstChild);
		return fragment;
	}
};

/*
  Range iterator
 */

function RangeIterator(range) {
	this.range = range;
	if (range.collapsed)
		return;

//[TODO] ensure this works
	// get anchors
	var root = range.commonAncestorContainer;
	this._next = range.startContainer == root && !DOMUtils.isDataNode(range.startContainer) ?
	    range.startContainer.childNodes[range.startOffset] :
	    DOMUtils.findClosestAncestor(root, range.startContainer);
	this._end = range.endContainer == root && !DOMUtils.isDataNode(range.endContainer) ?
	    range.endContainer.childNodes[range.endOffset] :
	    DOMUtils.findClosestAncestor(root, range.endContainer).nextSibling;
}

RangeIterator.prototype = {
	// public properties
	range: null,
	// private properties
	_current: null,
	_next: null,
	_end: null,

	// public methods
	hasNext: function () {
		return !!this._next;
	},
	next: function () {
		// move to next node
		var current = this._current = this._next;
		this._next = this._current && this._current.nextSibling != this._end ?
		    this._current.nextSibling : null;

		// check for partial text nodes
		if (DOMUtils.isDataNode(this._current)) {
			if (this.range.endContainer == this._current)
				(current = current.cloneNode(true)).deleteData(this.range.endOffset, current.length - this.range.endOffset);
			if (this.range.startContainer == this._current)
				(current = current.cloneNode(true)).deleteData(0, this.range.startOffset);
		}
		return current;
	},
	remove: function () {
		// check for partial text nodes
		if (DOMUtils.isDataNode(this._current) &&
		    (this.range.startContainer == this._current || this.range.endContainer == this._current)) {
			var start = this.range.startContainer == this._current ? this.range.startOffset : 0;
			var end = this.range.endContainer == this._current ? this.range.endOffset : this._current.length;
			this._current.deleteData(start, end - start);
		} else
			this._current.parentNode.removeChild(this._current);
	},
	hasPartialSubtree: function () {
		// check if this node be partially selected
		return !DOMUtils.isDataNode(this._current) &&
		    (DOMUtils.isAncestorOrSelf(this._current, this.range.startContainer) ||
		        DOMUtils.isAncestorOrSelf(this._current, this.range.endContainer));
	},
	getSubtreeIterator: function () {
		// create a new range
		var subRange = new DOMRange(this.range._document);
		subRange.selectNodeContents(this._current);
		// handle anchor points
		if (DOMUtils.isAncestorOrSelf(this._current, this.range.startContainer))
			subRange.setStart(this.range.startContainer, this.range.startOffset);
		if (DOMUtils.isAncestorOrSelf(this._current, this.range.endContainer))
			subRange.setEnd(this.range.endContainer, this.range.endOffset);
		// return iterator
		return new RangeIterator(subRange);
	}
};

/*
  DOM Selection
 */
 
//[NOTE] This is a very shallow implementation of the Selection object, based on Webkit's
// implementation and without redundant features. Complete selection manipulation is still
// possible with just removeAllRanges/addRange/getRangeAt.

function DOMSelection(document) {
	// save document parameter
	this._document = document;
	
	// add DOM selection handler
	var selection = this;
	document.attachEvent('onselectionchange', function () { selection._selectionChangeHandler(); });
}

DOMSelection.prototype = {
	// public properties
  anchorNode : null,
  focusNode : null,
  anchorOffset : 0,
  focusOffset : 0,
  isCollapsed : true,
	rangeCount: 0,

	// private properties
	_document: null,
	
	// private methods
	_selectionChangeHandler: function () {
		// check if there exists a range
		this.rangeCount = this._selectionExists(this._document.selection.createRange()) ? 1 : 0;

    // set public properties
    if (this.rangeCount > 0) {
      var range = this.getRangeAt(0);

      this.anchorNode = range.startContainer;
      this.focusNode = range.endContainer;
      this.anchorOffset = range.startOffset;
      this.focusOffset = range.endOffset;
      this.isCollapsed = range.collapsed;
    }
    else {
      this.anchorNode = this._document.body;
      this.focusNode = this._document.body;
      this.anchorOffset = 0;
      this.focusOffset = 0;
      this.isCollapsed = true;
    }
	},
	_selectionExists: function (textRange) {
		// checks if a created text range exists or is an editable cursor
		return textRange.compareEndPoints('StartToEnd', textRange) != 0 ||
		    textRange.parentElement().isContentEditable;
	},

	// public methods
	addRange: function (range) {
		// add range or combine with existing range
		var selection = this._document.selection.createRange(), textRange = TextRangeUtils.convertFromDOMRange(range);
		if (!this._selectionExists(selection))
		{
			// select range
			textRange.select();
		}
		else
		{
			// only modify range if it intersects with current range
			if (textRange.compareEndPoints('StartToStart', selection) == -1)
				if (textRange.compareEndPoints('StartToEnd', selection) > -1 &&
				    textRange.compareEndPoints('EndToEnd', selection) == -1)
					selection.setEndPoint('StartToStart', textRange);
			else
				if (textRange.compareEndPoints('EndToStart', selection) < 1 &&
				    textRange.compareEndPoints('EndToEnd', selection) > -1)
					selection.setEndPoint('EndToEnd', textRange);
			selection.select();
		}
	},
	removeAllRanges: function () {
		// remove all ranges
		this._document.selection.empty();
	},
	getRangeAt: function (index) {
		// return any existing selection, or a cursor position in content editable mode
		var textRange = this._document.selection.createRange();
		if (this._selectionExists(textRange))
			return TextRangeUtils.convertToDOMRange(textRange, this._document);
		return null;
	},
	toString: function () {
		// get selection text
		return this._document.selection.createRange().text;
	}
};

/*
  scripting hooks
 */

document.createRange = function (doc) {
  if (typeof(doc) === "undefined") {
	  doc = document;
  }
  return new DOMRange(doc);
};

if (typeof(Range) === "undefined")
  Range = DOMRange;

window.getSelection = function (doc) {
  if (typeof(doc) === "undefined") {
	  return new DOMSelection(document);
  }
  else {
    // doc is defined so it is not the default document object
    var sel = new DOMSelection(doc);
    sel._selectionChangeHandler();
    return sel;
  }
};

//[TODO] expose DOMRange/DOMSelection to window.?
}

})();

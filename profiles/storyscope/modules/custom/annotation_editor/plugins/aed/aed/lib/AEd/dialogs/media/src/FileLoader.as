
/*
 *  Accessing Local Files from Flash Player 10
 */

package {
	
	import flash.display.MovieClip;
	import flash.display.LoaderInfo;
	import flash.net.FileReference;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.MouseEvent;
	import flash.external.ExternalInterface;
	import flash.events.FocusEvent;
	import flash.text.TextFormat;
	
	
	public class FileLoader extends MovieClip {
		
    /* File reference */
		public var _file:FileReference = new FileReference();
		
		/* Constructor */
		public function FileLoader() {
			_file.addEventListener(Event.SELECT, _onSelectEvent);
			_file.addEventListener(Event.COMPLETE, _onCompleteEvent);
			_file.addEventListener(IOErrorEvent.IO_ERROR, _onIOErrorEvent);

			// Check for Safari browser => show browse button instead of transparent overlay
			var browseButtonDisplay:Boolean = this.loaderInfo.parameters.browseButtonDisplay != undefined && this.loaderInfo.parameters.browseButtonDisplay.toLowerCase() === "true";
			
			// Assign event listener to the button
			_transparentButton.addEventListener(MouseEvent.CLICK, _loadIt);
			_browseButton.addEventListener(MouseEvent.CLICK, _loadIt);
			
			if (browseButtonDisplay) {
				// Set label on load
				this.addEventListener(Event.ADDED_TO_STAGE, _setLabel);
			}
			else {
				// Internet Explorer and Firefox can use tranparent overlay
				_browseButton.alpha = 0;
			}
			
			// Create a new TextFormat object which will be used for the button's label.
			var myTextFormat:TextFormat = new TextFormat();
			myTextFormat.bold = true;
			myTextFormat.size = 12;
			myTextFormat.color = 0xFFFFFF;
			myTextFormat.align = "center";
			_browseButton.setStyle("textFormat", myTextFormat);
			_browseButton.useHandCursor = true;
			
			//ExternalInterface.addCallback("handleClick", _handleExternalClick);
		}
		
		/* File is selected */
		public function _onSelectEvent(e:Event):void {
			// Check file size limit
			if (ExternalInterface.call("FileSizeOK", _file.size)) {
				// Show loading dialog
				ExternalInterface.call("FileLoadingProgress");
				// Call the load function
				_file.load();
			}
			else {
				// Show warning
				ExternalInterface.call("FileTooLong");
			}
		}

		/* File is loaded */
		public function _onCompleteEvent(e:Event):void {
			// Send result to JavaScript
			ExternalInterface.call("MakeFile", _file.name, _file.size, Base64.encodeByteArray(_file.data));
		}

		/* File loading failed */
		public function _onIOErrorEvent(e:IOErrorEvent):void {
			// Show loading failed dialog
			ExternalInterface.call("FileLoadingFailed");
		}

		/* Mouse click handler */
		public function _loadIt(e:MouseEvent):void {
			// Button clicked => show the FilePicker
			_file.browse();
		}

		/* Label setter */
		public function _setLabel(e:Event):void {
			// Multilingual label
			if (this.loaderInfo.parameters.browseButtonLabel != undefined)
			_browseButton.label = this.loaderInfo.parameters.browseButtonLabel;
			_browseButton.width = this.loaderInfo.parameters.browseButtonWidth;
		}
	}
	
}























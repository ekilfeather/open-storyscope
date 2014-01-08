/**
 * base64d_encoder.js
 *
 * Contains AEd.ui.libs.base64d_encoder class definition. 
 *  
 * @author: Milos Cudrak 
 * 
 */
 

// *****************************************************************************
// class AEd.libs.base64d_encoder
// *****************************************************************************  



/**
 * This class creates base64d_encoder.
 * @example   
 *  
 * 
 * @name base64d_encoder
 * @memberOf AEd.libs     
 * @class 
 */

AEd.libs.base64d_encoder = function() {

  this.base64encoded = '';   // Base64 encoded file
  this.fr = '';          // Filereader
  this.dlgLoading = ''; // Loading dialog
  this.dlgError = ''; // Error dialog
  this.dlgAbort = ''; // Abort dialog
  this.dlgNoFileForDownload = ''; // No file for download dialog
  this.dlgFlashFileSaveOK = ''; // Flash file save ok dialog
  this.dlgFlashFileSaveError = ''; // Flash file save error dialog
  this.fileInput = '';  // Input type file object
  this.maxFileSizeBytes = 2000000; // Maximum filesize in Bytes

  var base64d_encoderSelf = this;
   
    // Loading dialog

    this.dlgLoading = this.createDialog(AEd.I18n.t("Dlg_info_processing_file"), AEd.I18n.t("Dlg_info_processing_file_desc"), "loading");
    
    var LoadingbtnClose = new AEd.ui.core.UIButton({icon: "close"}); 
    var LoadingbtnCancel = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_message_abort")});
    
    this.dlgLoading.headerButtonsArea.addItem(LoadingbtnClose);
    this.dlgLoading.buttonsArea.addItem(LoadingbtnCancel);
    
    LoadingbtnClose.onClick.addHandler(function() {
        base64d_encoderSelf.fr.abort();
        
        AEd.Dialogs.remove(base64d_encoderSelf.dlgLoading);
        base64d_encoderSelf.dlgLoading.remove(); 
        base64d_encoderSelf.clear();
    });
    
    LoadingbtnCancel.onClick.addHandler(function() {
        base64d_encoderSelf.fr.abort();

        AEd.Dialogs.remove(base64d_encoderSelf.dlgLoading);
        base64d_encoderSelf.dlgLoading.remove(); 
        base64d_encoderSelf.clear();
    });

    // Abort dialog

    this.dlgAbort = this.createDialog(AEd.I18n.t("Dlg_info_processing_file_aborted"), AEd.I18n.t("Dlg_info_processing_file_aborted_desc"), "info");
    
    var AbortbtnClose = new AEd.ui.core.UIButton({icon: "close"}); 
    var AbortbtnOk = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_message_ok")});
    
    this.dlgAbort.headerButtonsArea.addItem(AbortbtnClose);
    this.dlgAbort.buttonsArea.addItem(AbortbtnOk);
    
    AbortbtnClose.onClick.addHandler(function() {
        
        AEd.Dialogs.remove(base64d_encoderSelf.dlgAbort);
        base64d_encoderSelf.dlgAbort.remove(); 
        base64d_encoderSelf.clear();
    });
    
    AbortbtnOk.onClick.addHandler(function() {

        AEd.Dialogs.remove(base64d_encoderSelf.dlgAbort);
        base64d_encoderSelf.dlgAbort.remove(); 
        base64d_encoderSelf.clear();
    });

    // Error dialog
 
    this.dlgError = this.createDialog(AEd.I18n.t("Dlg_error_processing_error"), AEd.I18n.t("Dlg_error_processing_error_desc"), "error");
    
    var ErrorbtnClose = new AEd.ui.core.UIButton({icon: "close"}); 
    var ErrorbtnOk = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_message_ok")});
    
    this.dlgError.headerButtonsArea.addItem(ErrorbtnClose);
    this.dlgError.buttonsArea.addItem(ErrorbtnOk);
    
    ErrorbtnClose.onClick.addHandler(function() {
        
        AEd.Dialogs.remove(base64d_encoderSelf.dlgError);
        base64d_encoderSelf.dlgError.remove(); 
        base64d_encoderSelf.clear();
    });
    
    ErrorbtnOk.onClick.addHandler(function() {

        AEd.Dialogs.remove(base64d_encoderSelf.dlgError);
        base64d_encoderSelf.dlgError.remove(); 
        base64d_encoderSelf.clear();
    });

    // No file for download dialog

    this.dlgNoFileForDownload  = this.createDialog(AEd.I18n.t("Dlg_info_download_file"), AEd.I18n.t("Dlg_info_download_file_desc"), "info");
    
    var NoFileForDownloadbtnClose = new AEd.ui.core.UIButton({icon: "close"}); 
    var NoFileForDownloadbtnOk = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_message_ok")});
    
    this.dlgNoFileForDownload.headerButtonsArea.addItem(NoFileForDownloadbtnClose);
    this.dlgNoFileForDownload.buttonsArea.addItem(NoFileForDownloadbtnOk);
    
    NoFileForDownloadbtnClose.onClick.addHandler(function() {
        
        AEd.Dialogs.remove(base64d_encoderSelf.dlgNoFileForDownload);
        base64d_encoderSelf.dlgNoFileForDownload.remove(); 
        base64d_encoderSelf.clear();
    });
    
    NoFileForDownloadbtnOk.onClick.addHandler(function() {

        AEd.Dialogs.remove(base64d_encoderSelf.dlgNoFileForDownload);
        base64d_encoderSelf.dlgNoFileForDownload.remove(); 
        base64d_encoderSelf.clear();
    });

    // Flash file save ok dialog

    this.dlgFlashFileSaveOK  = this.createDialog(AEd.I18n.t("Dlg_info_flash_download_file_ok"), AEd.I18n.t("Dlg_info_flash_download_file_ok_desc"), "ok");

    var FlashFileSaveOKbtnClose = new AEd.ui.core.UIButton({icon: "close"});
    var FlashFileSaveOKbtnOk = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_message_ok")});

    this.dlgFlashFileSaveOK.headerButtonsArea.addItem(FlashFileSaveOKbtnClose);
    this.dlgFlashFileSaveOK.buttonsArea.addItem(FlashFileSaveOKbtnOk);

    FlashFileSaveOKbtnClose.onClick.addHandler(function() {

        AEd.Dialogs.remove(base64d_encoderSelf.dlgFlashFileSaveOK);
        base64d_encoderSelf.dlgFlashFileSaveOK.remove();
    });

    FlashFileSaveOKbtnOk.onClick.addHandler(function() {

        AEd.Dialogs.remove(base64d_encoderSelf.dlgFlashFileSaveOK);
        base64d_encoderSelf.dlgFlashFileSaveOK.remove();
    });

    // Flash file save error dialog

    this.dlgFlashFileSaveErrorError  = this.createDialog(AEd.I18n.t("Dlg_info_flash_download_file"), AEd.I18n.t("Dlg_info_flash_download_file_desc"), "error");

    var FlashFileSaveErrorbtnClose = new AEd.ui.core.UIButton({icon: "close"});
    var FlashFileSaveErrorbtnOk = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_message_ok")});

    this.dlgFlashFileSaveErrorError.headerButtonsArea.addItem(FlashFileSaveErrorbtnClose);
    this.dlgFlashFileSaveErrorError.buttonsArea.addItem(FlashFileSaveErrorbtnOk);

    FlashFileSaveErrorbtnClose.onClick.addHandler(function() {

        AEd.Dialogs.remove(base64d_encoderSelf.dlgFlashFileSaveErrorError);
        base64d_encoderSelf.dlgFlashFileSaveErrorError.remove();
    });

    FlashFileSaveErrorbtnOk.onClick.addHandler(function() {

        AEd.Dialogs.remove(base64d_encoderSelf.dlgFlashFileSaveErrorError);
        base64d_encoderSelf.dlgFlashFileSaveErrorError.remove();
    });

    // File too long

    this.dlgFileTooLong = this.createDialog(AEd.I18n.t("Dlg_info_file_long"), AEd.I18n.t("Dlg_info_file_long_desc") + this.maxFileSizeBytes + " Bytes.", "info");
    
    var FileTooLongbtnClose = new AEd.ui.core.UIButton({icon: "close"}); 
    var FileTooLongbtnOk = new AEd.ui.core.UIButton({text: AEd.I18n.t("Dlg_message_ok")});
    
    this.dlgFileTooLong.headerButtonsArea.addItem(FileTooLongbtnClose);
    this.dlgFileTooLong.buttonsArea.addItem(FileTooLongbtnOk);
    
    FileTooLongbtnClose.onClick.addHandler(function() {
        
        AEd.Dialogs.remove(base64d_encoderSelf.dlgNoFileForDownload);
        base64d_encoderSelf.dlgFileTooLong.remove(); 
        base64d_encoderSelf.clear();
    });
    
    FileTooLongbtnOk.onClick.addHandler(function() {

        AEd.Dialogs.remove(base64d_encoderSelf.dlgFileTooLong);
        base64d_encoderSelf.dlgFileTooLong.remove(); 
        base64d_encoderSelf.clear();
    });
}

AEd.libs.base64d_encoder.prototype.constructor = AEd.libs.base64d_encoder;

// --------------------------------------------------------------- uint8ToString
/**
 * Converts uint8array to String code from http://stackoverflow.com/questions/6978156/get-base64-encode-file-data-from-input-form
 *
 * @name uint8ToString
 * @memberOf AEd.libs.base64d_encoder
 * @function 
 * @param {Uint8Array} buf Uint8Array to convert.
 * @return {String} out Uint8Array converted to String.
 */


AEd.libs.base64d_encoder.prototype.uint8ToString = function(buf) {
    var i, length, out = '';
    for (i = 0, length = buf.length; i < length; i += 1) {
        out += String.fromCharCode(buf[i]);
    }
    return out;
}

// --------------------------------------------------------------- clear
/**
 * Clears variables (e.g after error)
 *
 * @name clear
 * @memberOf AEd.libs.base64d_encoder
 * @function 
 */

AEd.libs.base64d_encoder.prototype.clear = function(){

  this.base64encoded = '';

  if (this.fileInput != '' && this.fileInput != null){

    this.fileInput.value = '';
  }
}


// --------------------------------------------------------------- setInput
/**
 * Sets input type file object
 *
 * @name setInput
 * @memberOf AEd.libs.base64d_encoder
 * @function 
 * @param {Element} inputElement input element type file
 */

AEd.libs.base64d_encoder.prototype.setInput = function(inputElement){

  this.fileInput = inputElement;
}

// --------------------------------------------------------------- createDialog
/**
 * Creates dialog (required classes AEd.ui.core.UIMessage AEd.ui.core.UIDialog AEd.ui.core.UIButton) 
 *
 * @name createDialog
 * @memberOf AEd.libs.base64d_encoder
 * @function 
 * @param {String} title Dialog title. 
 * @param {String} text Dialog text.
 * @param {String} msgType Type of message "error, warning, ..." defined in UIMessage.js. 
 * @return {UIDialog} dlg Dialog.
 */

AEd.libs.base64d_encoder.prototype.createDialog = function(title, text, msgType){

  dlg = new AEd.ui.core.UIDialog({
        render: false,
        showOverlay: true,
        title: AEd.I18n.t("Dlg_message_title"),
        width: AEd.CONFIG.DLG_MESSAGE_WIDTH,
        height: AEd.CONFIG.DLG_MESSAGE_HEIGHT
  });
    
  var msg = new AEd.ui.core.UIMessage({
       title: title,
       headerContent: text,
       icon: msgType
  });
    
  dlg.contentArea.addItem(msg);

return dlg;
}

// --------------------------------------------------------------- download
/**
 * Opens download window for base64 encoded data
 *
 * @name download
 * @memberOf AEd.libs.base64d_encoder
 * @function 
 */

AEd.libs.base64d_encoder.prototype.download = function(){

 if (this.fileInput != '' && this.fileInput != null && this.fileInput.value != ''){

    window.open("data:application/octet-stream;base64," + this.fileInput.value,'Download');
 }

 else{

   this.dlgNoFileForDownload.render(this.domElementTarget);    
   AEd.Dialogs.add(this.dlgNoFileForDownload, "modal");   
 }
}

// --------------------------------------------------------------- fileTooLong
/**
 * Helper function to show fileTooLong warning
 *
 * @name fileTooLong
 * @memberOf AEd.libs.base64d_encoder
 * @function
 */

AEd.libs.base64d_encoder.prototype.fileTooLong = function(){

  this.dlgFileTooLong.render(this.domElementTarget);
  AEd.Dialogs.add(this.dlgFileTooLong, "modal");
  this.clear();
}

// --------------------------------------------------------------- fileLoadingProgress
/**
 * Helper function to show fileLoadingProgress dialog
 *
 * @name fileLoadingProgress
 * @memberOf AEd.libs.base64d_encoder
 * @function
 */

AEd.libs.base64d_encoder.prototype.fileLoadingProgress = function(){

  this.dlgLoading.render(this.domElementTarget);
  AEd.Dialogs.add(this.dlgLoading, "modal");
}

// --------------------------------------------------------------- fileLoadingError
/**
 * Helper function to show fileLoadingError dialog
 *
 * @name fileLoadingError
 * @memberOf AEd.libs.base64d_encoder
 * @function
 */

AEd.libs.base64d_encoder.prototype.fileLoadingError = function(){

  AEd.Dialogs.remove(this.dlgLoading);
  this.dlgLoading.remove();
  this.clear();

  this.dlgError.render(this.domElementTarget);
  AEd.Dialogs.add(this.dlgError, "modal");
}

// --------------------------------------------------------------- fileLoadingAbort
/**
 * Helper function to show fileLoadingAbort dialog
 *
 * @name fileLoadingAbort
 * @memberOf AEd.libs.base64d_encoder
 * @function
 */

AEd.libs.base64d_encoder.prototype.fileLoadingAbort = function(){

  this.dlgAbort.render(this.domElementTarget);
  AEd.Dialogs.add(this.dlgAbort, "modal");
}

// --------------------------------------------------------------- fileLoadingDone
/**
 * Helper function to show fileLoadingDone dialog and store encoded data
 *
 * @name fileLoadingDone
 * @memberOf AEd.libs.base64d_encoder
 * @function
 */

AEd.libs.base64d_encoder.prototype.fileLoadingDone = function(encodedData){

  this.fileInput.value = encodedData;
  this.setEncodedData(this.fileInput.value);
  AEd.Dialogs.remove(this.dlgLoading);
  this.dlgLoading.remove();
}

// --------------------------------------------------------------- encode
/**
 * Encodes input file to base64
 *
 * @name encode
 * @memberOf AEd.libs.base64d_encoder
 * @function 
 * @param {File} File to convert.
 */

AEd.libs.base64d_encoder.prototype.encode = function(file){

  if (typeof(FileReader) != undefined || file.customFile) {

    var base64d_encoderSelf = this;
 
    if (file.size <= this.maxFileSizeBytes) {

      if (file.customFile) {

          if (base64d_encoderSelf.fileInput != ''){

            base64d_encoderSelf.fileLoadingDone(file.encodedData);

          }

      }
      else {
        this.fr = new FileReader();

        // FileReader done

        this.fr.onload = function(e) {

          if (base64d_encoderSelf.fileInput != ''){

            base64d_encoderSelf.fileLoadingDone(btoa(base64d_encoderSelf.uint8ToString(new Uint8Array(e.target.result))));
          }
        }


        // FileReader progress
        var x = true;
        this.fr.onprogress = function(e) {

          if (x === true){

            base64d_encoderSelf.fileLoadingProgress();
            x = false;
          }
        }

        // FileReader error
        this.fr.onerror = function(e) {

          base64d_encoderSelf.fr.abort();

          base64d_encoderSelf.fileLoadingError();
        }

        // FileReader abort
        this.fr.onabort = function(e) {

          base64d_encoderSelf.fileLoadingAbort();
        }

        this.fr.readAsArrayBuffer(file);
      }

    }

    else { // File too long

      this.fileTooLong();
    }
  }

  else {

    alert(AEd.I18n.t("Dlg_error_filereader_unsup"));
  }
 
}

// --------------------------------------------------------------- getEncodedData
/**
 * Gets encoded data
 *
 * @name getEncodedData
 * @memberOf AEd.libs.base64d_encoder
 * @function  
 * @return {Base64} this.base64encoded base64 encoded data
 */

AEd.libs.base64d_encoder.prototype.getEncodedData = function(){

return this.base64encoded;
}

// --------------------------------------------------------------- setEncodedData
/**
 * Sets encoded data
 *
 * @name setEncodedData
 * @memberOf AEd.libs.base64d_encoder
 * @function 
 * @param {Base64} base64data base64 encoded data
 */

AEd.libs.base64d_encoder.prototype.setEncodedData = function(base64data){

this.base64encoded = base64data;
}




// *****************************************************************************
// class AEd.libs.base64d_encoder
// *****************************************************************************

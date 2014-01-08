Installation
----------------------------
Note: these instructions assume that you install Selectivizr in the
      "sites/all/modules" directory.

   1. Unzip the files to the "sites/all/modules" directory. It should now
      contain a "selectvizr" directory.
   2. Download standalone Selectivizr from http://selectivizr.com/. Unzip the
      contents of the "selectivizr" directory from the installation package to the
      "sites/all/modules/selectivizr" directory.
   3. Enable the module in the Administration panel under "Configuration > User Interface" section.


Installation Troubleshooting
----------------------------
If Selectivizr script does not appear on your page's <head> tag, check if all files were
extracted correctly.

The "sites/all/modules/selectivizr/" directory should contain the following files:
selectivizr.js.

Alternatively the "sites/all/libraries/selectivizr" directory can be used but you will need to
install de Libraries module.
The Selectivizr module will automatically recognize the proper path to the library.
The "libraries" directory is the default path when drush is used to download the Selectivizr lib.

@ECHO off
set drush=call drush

SET /p answer=Do you want to remove Read-Only attribute of 'settings.php' file? (y/n):
IF /I %answer% == y (
  attrib -R ..\..\sites\default\settings.php
)

IF NOT "%1" == "" (
	ECHO Using '%1' for admin password
	%drush% si storyscope --account-pass=%1
) ELSE (
	ECHO No password argument given.
	ECHO You may pass one as the first arguement to this script.
	ECHO Drush will generate a new one. Check the output below.
)
%drush% en storyscope_migrate -yv
%drush% mi --all --force
%drush% fr storyscope_nav -y
%drush% cc all

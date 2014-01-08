#!/bin/bash
if [ $1 ]
	then
		echo "Using '$1' for admin password"
		drush si storyscope --account-pass=$1
	else
		echo "No password argument given." 
		echo "You may pass one as the first arguement to this script."
		echo "Drush will generate a new one. Check the output below."
fi
drush en storyscope_migrate -yv
drush mi --all --force
drush fr storyscope_nav -y
drush cc all

# Storyscope Install Profile

## Pre-requisites

Before setting up the Storyscope Drupal instance, you will need to install a
local copy of Apache Solr version 4.x.

1. Download Apache Solr 4.x version from http://lucene.apache.org/solr/ (4.1 at
time of writing) and follow its instructions for installation.
2. Replace the configuration files with those from
profiles/storyscope/config/apache\_solr\_common\_configurations/conf/4.x/ Obviously
back up the existing files before overwriting. If using the example Solr server,
this means copying the files into the directory
/path/to/solr-4.1.0/example/solr/collection1/conf/
3. Restart the apache solr.  Note, the storyscope profile currently assumes that
this is running at http://localhost:8983/solr  This may be made configurable at
installation time in the future.

## Running the Storyscope rebuild script

The rebuild.sh script uses the drush tool to drop the database read from the the current 
Drupal context 

```
./sites/all/default/settings.php > $databases 'default'
```

It is possible for the script to accept a default account password as the first argument;

```
/rebuild.sh decipher
using 'decipher' for admin password
```

Without the argument the tool resets the password for the admin (uid = 1) account and 
prints a new generated one to the standard output.
Settings from the settings.php file are preserved however. For example by editing the 
`$conf['site_name']` variable in setting.php the site name is preserved across rebuilds.

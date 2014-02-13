# Welcome to the DECIPHER project

## Summary/TOC

1. [Project overview](#project-overview)
1. [DECIPHER dependencies](#decipher-dependencies)
1. [Initial system set-up](#initial-system-set-up)
1. [Storyscope Installation](#storyscope-installation)
1. [Storyscope configuration](#storyscope-configuration)
1. [Adding content to Storyscope](#adding-content-to-storyscope)
1. [Rebuilding the site](#rebuilding-the-site)
1. [SOLR Configuration](#solr-configuration)
1. [Installing Sesame](#installing-sesame)
1. [Semantic Enrichment Component](#semantic-enrichment-component)
1. [Installing the Semantic Enrichment Component](#installing-the-semantic-enrichment-component)
1. [Contact information](contact-information)
1. [README changelog](readme-changelog)

# Project overview

![The project has three main components](http://metameso.org/~joe/decipher-main-components.png) - [more detailed package diagram](http://knot.fit.vutbr.cz/decipher/integration/package.jpg)

# Contact information

If need more details, please write us.

- Joe Corneli has been editing this README. <holtzermann17@gmail.com>
- Aleš is responsible for BUT StoryScope development. <ales.zurek@gmail.com>
- Jaroslav is responsible for the Annotation server and editor <idytrych@fit.vutbr.cz>
- Jan Kouril is responsible for SEC. <ikouril@fit.vutbr.cz>
- Fulvio Esposito at System Simulation <decipher@ssl.co.uk>

You also can find our responsibilities and contacts in Redmine.

# README changelog

- v4 updated in line with project deliverable D5.4.4 - Michael <decipher@ssl.co.uk>
- Draft 3, March 25, 2013 - Joe, add instructions on how to use Drush, make clearer division between Storyscope and other components
- Draft 2, February 11, 2013 - Joe, following tips from Jan
- Draft 1, January 23, 2013 - Joe, following tips from Jaroslav

# DECIPHER dependencies

DECIPHER makes use of various third-party open source packages.
This is a brief introduction and glossary.

**Drupal 7** provides the web application framework Storyscope is built upon. It provides a generic content management system environment extensible through modules. Storyscope is a customized version of Drupal 7 with a specific set of core and community-provided modules together with custom modules implementing Storyscope specific functionalities.

**Drush** is a command line tool for administering Drupal. It can be used to perform Drupal installations, module's and theme's configuration, general website maintenance, database updates, and to selectively enable or disable modules in the current installation. Though it's not mandatory for running Storyscope, it's a valuable aid for maintenance task as it allows tasks automation through scripting. This guide assumes the use of Drush in places.

**SOLR** is a server application providing the internal search functionality for Storyscope. Written in Java, its default distribution package includes Jetty, a  web server and servlet container, that eases SOLR deployment from a single self-contained package. SOLR has been used as full-text search server for local content in a Storyscope instance through the SOLR backend for the Search API Drupal's module so, while it might be installed on a different physical or virtual machine from the one running Storyscope, it's usually installed on the same one.

**GlassFish**  is used by the Annotation Server as the Java EE (Enterprise Edition) Server. GlassFish is an open-source application server sponsored by Oracle Corporation. It offers the reference implementation of Java EE (e.g., the first Java EE server supporting its version 7). The Annotation Server takes advantage of various advanced features provided by GlassFish, including its support for Comet -- a web application model allowing a web server to push data to a browser, without the browser explicitly requesting it.

**TinyMCE** is the preferred editor option in Storyscope. TinyMCE is a platform independent web based Javascript HTML WYSIWYG editor released as Open Source under LGPL. As such, it was extended to support semantic annotation in the DECIPHER Annotation Editor. Users can thus benefit from advanced integration -- annotation suggestions can be visualized directly in the editor and they can be confirmed/rejected by a single click.

**Elasticsearch** is the core engine employed in the Similarity Search module and in the SEC Store API behind the component. The search server based on the Lucene text indexing library provides a distributed, full-text search engine with a RESTful web interface. Its JSON-based interface helped us to easily develop the modules demonstrating SEC functions. The engine is also highly scalable so that it could be used to deal with enormous collections of relevant data available on the web.

The **triplestore** is used to represent the content of Storyscope instances plus additional related Linked Data. A custom Drupal module is used to asynchronously update the triplestore based on any changes to the Drupal instance. The synchronisation module uses the **Sesame** API to read and modify data in a Sesame triplestore. The data can be stored in either an Owlim or RDF/S repository depending on the reasoning to be performed on the data. There is a publicly accessible Sesame triplestore for DECIPHER at the Open University running on a Tomcat server. The Storyscope recommender components, written in Java, also run on a Tomcat server.  The recommender components receive requests from a Storyscope installation, query the triplestore and other Linked Data sources as required, and then return results to the Storyscope installation in XML. These are then rendered in the Storyscope user interface. The Open University triplestore uses **BigOwlim** repositories that can perform SPARQL 1.1 reasoning. For compatibility with **OWLIM** and RDF/S repositories, the recommender components use SPARQL 1.0 queries to the triplestore.

# Initial system set-up

The DECIPHER project is developed using open tools and development environments and should be usable on a wide variety of platforms.  Instructions are currently provided for Linux and Apple Macintosh platforms.

## Linux

On Ubuntu 12.04:

```
sudo apt-get install mysql-server mysql-client php5-mysql \
  apache2 libapache2-mod-php5 php5-curl git python-setuptools \
  mongodb python-pip php-pear
```

Note that under Fedora Linux, SELinux is enabled by default which prevents serving files from a link to a home directory, and also interacts with Drupal.  See *Storyscope Installation*.

## Apple Macintosh

Install [MAMP](http://www.mamp.info).  Apache will be running on port 8888.

## All platforms

Enable clean URLs:

In `/etc/apache2/sites-available/default`, change all occurrences of `AllowOveride None` to `AllowOveride all`.  Then enable the apache rewrite module and restart apache.  For example, on Ubuntu:

```
sudo a2enmod rewrite
sudo /etc/init.d/apache2 reload
```

## Install Drush

Interaction with Drupal is more convenient with `drush`, which has to be obtained separately.

```
git clone --branch 7.x-5.x http://git.drupal.org/project/drush.git
cd drush
ln -s `pwd`/drush /usr/local/bin/drush
```

Alternatively:

```
pear channel-discover pear.drush.org
pear install drush/drush
```

Drush will only work if it runs **within** the working directory of a Drupal instance.  See `drush help` for details.

## Install Drupal command-line debugger (optional)

If you're actively developing Drupal modules, it's helpful to have an interactive debugger.  (Note: this step is optional, and only of interest to developers.)

Like Drupal, Drush has its own sub-projects.  To give yourself a comfortable interactive debugging environment, first download `phpsh`, and follow the provided installation instructions, minimally:

```
git clone git://github.com/facebook/phpsh.git
cd phpsh
python setup.py build
sudo python setup.py install
```

Then install the Drush compatibility layer:

```
cd ~/.drush
git clone --branch master http://git.drupal.org/project/phpsh.git
```

Subsequently, you can run:

```
$ phpsh
php> r ~/.drush/phpsh/includes/console_7.inc
php> node_load(...);
```

# Storyscope Installation

Install MySQL, Apache and PHP (mod_php in Apache,
php5-curl).  If you use [MAMP](www.mamp.info), Apache will
be running on port 8888.  (See *Initial system set-up*).

Clone the decipher repository and check out the [master branch](https://github.com/ekilfeather/open-storyscope.git) of Storyscope from GitHub:

```
git clone git@github.com:ekilfeather/open-storyscope.git
```

Note: getting access to this repository requires permission - contact
<ekilfeather@dmc.dit.ie>.  Make sure your SSH keys are up to date!

Move or link the directory into the Apache document root (e.g. `/var/www` under Ubuntu, `/Applications/MAMP/htdocs/decipher` under MAMP).

> Setting up Apache under Fedora can be somewhat [more](https://fedoraproject.org/wiki/Administration_Guide_Draft/Apache?rd=Docs/Drafts/AGBeta/Apache) [involved](http://library.linode.com/web-servers/apache/installation/fedora-14).  Note that you *cannot* serve files from symlink into a user's home directory, and [SElinux interacts with Drupal](http://linuxconfig.org/how-to-install-drupal-7-on-fedora-linux) in ways you will need to control for.

Create the decipher database in MySQL and set up the database user with all privileges.

```
mysql
CREATE DATABASE decipher;
GRANT ALL ON decipher.* TO 'decipher'@'localhost' IDENTIFIED BY 'make-up-a-password';
```
On a Macintosh, you can use the MAMP GUI  to do this, at `http://localhost:8888/MAMP/`.

Then follow the standard Drupal setup steps:

```
mkdir sites/default/files
cp ./sites/default/default.settings.php ./sites/default/settings.php
chmod a+rw sites/default/files
chmod a+rw ./sites/default/settings.php
```

Navigate to `http://yourserver/install.php` and the installation page will appear (`yourserver` can be replaced with `localhost` or `localhost:8888` if you only want a local development instance).  Chose the Storyscope profile and install.

Alternatively, to avoid clicking through the UI every time you install, use the following commands:

```
drush site-install storyscope \
  --account-name=[admin_UN] --account-pass=[admin_PW] \
   --db-url=mysql://[db_user]:[db_pass]@localhost/[db_name] \
  --site-name=Example
```

Windows XP does not support versions of Internet Explorer beyond Internet Explorer 8.
To support Internet Explorer 8 in Drupal 7, you need to disable CSS file preprocessing by adding `preprocess` =&gt; FALSE in `includes/theme.inc` on line 175. Otherwise CSS3 selectors cannot be used in themes because of incompatibility.
This requirement comes from [Selectivizr library](http://selectivizr.com/)... "Style sheets MUST be added to the page using a &lt;link&gt; tag but you can still use @import in your style sheets. Styles defined in &lt;style&gt; tags won't be parsed."

Once you've got things installed, you'll be logged in automatically.  In the future, to log in, visit `http://yourserver/` (or `http://yourserver:8888/` on the Macintosh).

# Storyscope configuration

The Storyscope distribution includes default settings and usually
requires no further configuration work to operate.  This section
provides information for those that want to reconfigure the system
away from the default settings or experiment with different options.

Set up for access to external components -- the Content Aggregator,
the Semantic Enrichment Component and the Recommenders -- is done
through Drupal's configuration interface.

## To set up access to the Content Aggregator

- Log in as administrator
- Click on Configuration in the admin bar at the top
- Click on Search API in the "SEARCH AND METADATA" group
- If you don't find an element named "Decipher CA" of type "Server" click on
"Add server" otherwise click on "edit" for the Decipher CA server
- Enter "Decipher CA" as Server name
- Description can be left blank
- Tick the "Enabled" checkbox
- Enter the host, port and path to the Decipher Content Aggregator (i.e.
`http://storyscope.ssl.co.uk/soapix/searchretrieve/decipher`)
- Click on "Save settings"
- You'll be redirected again to the Search API configuration page
- If you don't find an element named "Decipher CA" of type "Index" click on
"Add index" otherwise click on "edit" for the Decipher CA index
- Go to the settings tab
- Enter Decipher CA as Index Name
- Description can be left blank
- Select the Decipher CA server in the "Server" combobox
- Tick "Read only" checkbox
- Save settings


## To set up access to the Semantic Enrichment component:

- Log in as administrator
- Click on Configuration in the admin bar at the top
- Click on Similarity Search in the "SEARCH AND METADATA" group
- Enter the SEC Store API address (e.g. `http://athena2.fit.vutbr.cz:8081/`)
- Set SEC Store API connection timeout to 20
- Set SEC Store API result count to 20
- Set SEC Store detail page date format to d.m.Y
- Click on Save configuration


## To set up access to the Recommender:

- Log in as administrator
- Click on Configuration in the admin bar at the top
- Click on SemRecommender service in the "WEB SERVICES" group
- Enter the SemRecommender Address (e.g.
`http://knot09.fit.vutbr.cz:8080/SemRecommender`)
- Click on Save configuration



## To set up access to the RDF triple store:

- Log in as administrator
- Click on Configuration in the admin bar at the top
- Click on Triple store in the "WEB SERVICES" group
- Enter the Triple Store Address (e.g.
`http://decipher.open.ac.uk/openrdf-sesame`)
- Enter the Triple Store Repo Name (e.g. Decipher)
- Enter The Triples Base URI (e.g. `http://storyscope7.ssl.co.uk`)
- Click on Save configuration


## To set up access to the Annotation editor service:

- Log in as administrator
- Click on Configuration in the admin bar at the top
- Click on Annotation editor in the "WEB SERVICES" group
- Enter the Annotation server address (e.g.
`http://knot09.fit.vutbr.cz:8080/Annotations`)
- Click on Save configuration
# Adding content to Storyscope

Some sample content is made available in the `storyscope-migrate` module.  This section describes how this content can be imported into a new Storyscope instance.

To import sample content into Drupal, run these commands from within your Drupal directory:

```
drush -y en storyscope_migrate
drush mi --all
```

If you get an error message about unmet dependencies, rerun with

```
drush mi --all --force
```

Also note that if you're using the `dec_rdf` module, which relies on `background_process` to upload triples, you'll need to specify the `$base_url` from the command-line:

```
drush -l http://your.site.com/path/to/drupal mi --all --force
```

# Rebuilding the site

There is a bash script at `profiles/storyscope/rebuild.sh` to rebuild the site after taking software updates to Storyscope.  The rebuild.sh script uses the drush tool to reset the Drupal database.  The database to be reset is determined by reading `$database['default']` from the the current Drupal context in `settings.php`.  The operations carried out by `rebuild.sh` are a superset of the operations described above to load data into a fresh Storyscope instance.  Indeed, the rebuild script can be used instead of that procedure.

It is possible for the script to accept a default account password as the first argument:

```
.../rebuild.sh decipher
using 'decipher' for admin password
```

Without the argument the tool resets the password for the admin (uid = 1) account and 
prints a new generated one to the standard output.
Settings from the `settings.php` file are preserved however. For example by editing the 
`$conf['site_name']` variable in setting.php the site name is preserved across rebuilds.
# SOLR Configuration

Each instance of Storyscope needs to access a [SOLR](http://lucene.apache.org/solr/) index service.
You can use a (commercially) hosted version of SOLR or run one yourself.

Setting up your own instance of SOLR is quite straightforward and documentation
and installer packages using a bundled web server are readily available.  Alternatively, SOLR can be configured to run under the GlassFish server.  This is preferable if GlassFish is already being used to host the Decipher Annotation server and the Sesame triple-store (described below).

## Installing SOLR with bundled web server

Download the installer and documentation packages at
[http://lucene.apache.org/solr/documentation.html](http://lucene.apache.org/solr/documentation.html).

Once you have installed the SOLR instance you will then need to copy the SOLR configuration files from
`/profiles/storyscope/config/apache_solr_common_configurations/conf/4.x` into
the SOLR config directory at `%path_to_solr%/example/solr/%path_to_collection%/conf`. `%path_to_collection%` can be different for each Storyscope instance you want to support.
The default path installed with SOLR is `collection1`.

You can then start SOLR with `java -jar ./start.jar`.

## Installing SOLR with GlassFish

If you are running the Annotation server and Sesame on GlassFish, it is better to run Solr with them (it is not necessary to run another Java EE server as Jetty).  This is an alternative to the bundled server SOLR installation described above.

* Download SOLR from
[http://www.apache.org/dyn/closer.cgi/lucene/solr/](http://www.apache.org/dyn/closer.cgi/lucene/solr/).  These instructions are based on version 4.5.1 (solr-4.5.1.zip)
* Unzip SOLR to some folder (for example to `/root/solr`) `unzip -q solr-4.5.1.zip -d /root/solr`
* Copy all libraries from `/root/solr/solr-4.5.1/dist/solrj-lib/` to your GlassFish domain libraries folder (for example `/root/glassfish-3.1.2.2/glassfish/domains/domain1/lib`)
* Copy `/root/solr/solr-4.5.1/example/resources/log4j.properties` to your GlassFish domain libraries folder
* Create directories `/opt/solr` and `/var/solrdata` and set permissions to 777 (chmod -R 777 /opt/solr)
* Copy all from `/root/solr/solr-4.5.1/example/solr` folder to `/opt/solr`
* Copy and rewrite files from decipher folder `src/drupal-7/profiles/storyscope/config/apache_solr_common_configurations/conf/4.x` to `/opt/solr/collection1/conf`
* In file `/opt/solr/collection1/conf/solrconfig.xml` delete `<useCompoundFile>false</useCompoundFile>`, `<mergeFactor>4</mergeFactor>` and `<ramBufferSizeMB>32</ramBufferSizeMB>`
* Start GlassFish
* Log in to GlassFish administration interface at page `http://localhost:4848/`
* Now go to *server (Admin Server)* menu item and then into *Properties* and add property `solr.data.dir` with value `/var/solrdata` and property `solr.solr.home` with value `/opt/solr` (the folder with configuration files). Then click on *Save* button
* Next go to *Configuration-&gt;server-config-&gt;JVM* and then into *JVM Options* where add property `-Djavax.net.ssl.keyStorePassword=changeit` and `-Djavax.net.ssl.trustStorePassword=changeit` (do not change password - there really must be "changeit")
* Click on *Application* menu item in menu on left side and then click on button *Deploy*
* Choose *Packaged File to Be Uploaded to the Server* and choose file `/root/solr/solr-4.5.1/dist/solr-4.5.1.war`
* Now change relative path to SOLR in *Context Root* field to `solr` and then confirm the form
* Move files `jcl-over-slf4j-1.6.6.jar`, `jul-to-slf4j-1.6.6.jar`, `log4j-1.2.16.jar`, `slf4j-api-1.6.6.jar` and `slf4j-log4j12-1.6.6.jar` from `/root/glassfish-3.1.2.2/glassfish/domains/domain1/lib` to `/opt/glassfish3/glassfish/domains/domain1/applications/solr-4.5.1/WEB-INF/lib`
* Move file `log4j.properties` from `/root/glassfish-3.1.2.2/glassfish/domains/domain1/lib` to `/opt/glassfish3/glassfish/domains/domain1/applications/solr-4.5.1/WEB-INF/lib` and set `solr.log=/opt/solr/logs/` in it
* From
[http://commons.apache.org/proper/commons-logging/download_logging.cgi](http://commons.apache.org/proper/commons-logging/download_logging.cgi)
 download `commons-logging-1.1.3-bin.zip` and unzip it. Then copy `commons-logging-1.1.3.jar` to `/root/glassfish-3.1.2.2/glassfish/domains/domain1/lib/` and rename to `commons-logging.jar`
* Then in GlassFish administration interface go to *Configuration-&gt;server-config-&gt;JVM* and then into *JVM Options* and add the property `-Dlog4j.configuration=file:/root/glassfish-3.1.2.2/glassfish/domains/domain1/applications/solr-4.5.1/WEB-INF/lib/log4j.properties`
* Restart GlassFish
* SOLR will be running on `http://localhost:8080/solr`

## Indexing Storyscope content

To begin indexing Storyscope you should authenticate with administrative privileges and navigate to
[/admin/config/search/search_api/server/solr/edit](http://localhost/storyscope/admin/config/search/search_api/server/solr/edit):

* Change the SOLR host to the host name or IP of your SOLR server, e.g. localhost
* Change the port to the server port.  By default is is 8983 for Jetty or 8080 for GlassFish or Tomcat
* The SOLR path should be the same as `/solr/%path_to_collections%`, e.g. `/solr/sollection1`

On saving you should get a message that the SOLR instance can be reached and an indication of the latency reaching the server.

You should then navigate to
[/admin/config/search/search_api/index/internal_search_index_nodes/status](http://localhost/storyscope/admin/config/search/search_api/index/internal_search_index_nodes/status)
and click on *Clear Index* and then *Index Content*.

The internal search functions of Storyscope should then be available.

# Installing Sesame

A Storyscope instance uses a Sesame triple store in addition to Drupal.  To install Sesame, you'll first need to install [Tomcat](http://tomcat.apache.org/download-70.cgi) or GlassFish (see below).  If you will be installing the Annotation server, it is better to use GlassFish.  The GlassFish server will be used by both Sesame and the Annotation server, resulting in a lower memory requirement.

Running Tomcat on port 8080 will be in conflict with GlassFish on port 8080. If for some reason you need to have both, you will need to change port for one of them and change all URIs accordingly.  Remember that the Annotation server cannot run on Tomcat but Sesame can run on GlassFish.

## Deploying Tomcat

You can either get Tomcat [directly from Apache](http://tomcat.apache.org/), or use the version provided by your package manager (`apt-get install tomcat7`).  Once set up properly, it will reside in `/usr/local/tomcat`.

In order to get the system working, you'll need to edit `/usr/share/tomcat/conf/tomcat-users.xml` or `/etc/tomcat7/tomcat-users.xml` (or similar) to enable an admin account.  You'll also want to run `export CATALINA_HOME=/usr/share/tomcat`
in your `~/.bashrc`.  You can start Tomcat with `sudo service tomcat start`.
See [these instructions](http://www.howtogeek.com/howto/linux/installing-tomcat-6-on-ubuntu/) to set up Tomcat to start at boot time.

Visit `http://localhost:8080` to make sure it's working.

## Deploying GlassFish 

Get the latest GlassFish [from Java.net](https://glassfish.java.net/download.html) -- select the Native Installer.   Run downloaded graphical installer/wizard.  The installer is intuitive and most things can be left on their default settings.

Alternatively, you can use the Glassfish that comes bundled [with NetBeans](http://netbeans.org/downloads/).

On Linux, some tiling window managers have trouble running graphical Java applications.  [This page](http://www.loper-os.org/?p=163) includes instructions on how to run graphical java applications under Ratpoison, other WMs will be similar.

## Deploying Sesame

Obtain Sesame from the [download page](http://sourceforge.net/projects/sesame/files/Sesame%202/).  Unzip it and follow the instructions below, depending on your choice of servlet container.  If you get error messages when you browse to some of the URLs, you may need to create some additional directories, e.g. `sudo mkdir /usr/share/tomcat7/.aduna`, `sudo mkdir /usr/share/tomcat7/.aduna/openrdf-sesame`, `sudo mkdir /usr/share/tomcat7/.aduna/openrdf-workbench`

### ...under GlassFish

Assuming you gave default settings for GlassFish, browse to `http://localhost:4848/common/index.jsf`.  Then click *Deploy an Application*.  Select a WAR file from the location where you downloaded Sesame, e.g. `~/Downloads/openrdf-sesame-2.7.2/war/openrdf-sesame.war` and click *OK*.  Do similar operations to install the OpenRDF Workbench, e.g. `~/Downloads/openrdf-sesame-2.7.2/war/openrdf-workbench.war`.

### ...under Tomcat

Browse to `http://localhost:8080/manager/html` (supplying the admin account information you specifed in `tomcat-users.xml`) and then use *Deploy directory or WAR file located on server* or *Select WAR file to upload* to deploy the Sesame WAR file (which will be something like `~/sesame/core/http/server/target/openrdf-sesame.war`).  If you browse to `http://localhost:8080/openrdf-sesame/home/overview.view` you can check that the system is working properly.

To use the web front-end, deploy the Workbench using the Tomcat Web Application Manager.  You don't need to download anything new, just deploy the additional WAR file `~/sesame/core/http/workbench/target/openrdf-workbench.war`.

### Creating a repository

You can either create a new repository from the Workbench app at `http://localhost:8080/openrdf-workbench`, or using the command line.

If you choose to use the command line, run these commands:

```
mkdir ~/.aduna
export JAVA_OPTS='-Dinfo.aduna.platform.appdata.basedir=/home/USERNAME/.aduna'

cd ~/openrdf-sesame-2.6.10/bin/
./console.sh
> connect http://localhost:8080/openrdf-sesame .
> create native .
Repository ID [native]: testing
Repository title [Native store]: Testing
Triple indexes [spoc,posc]: RE
```
See [the Sesame manual](http://www.openrdf.org/doc/sesame2/2.7.0-beta1/users/ch06.html) for further instructions.

# Semantic Enrichment Component

## Our branch model

In the main git repository, you should create branches for particular tasks / subtasks according to model from Annertech:

> **DNNN-Short_description** for Jira only issue, where NNN is Jira issue number and Short_description is short description of stuff in the branch.

> **DNNN-RMXXX-Short_description** for Redmine Issue, where NNN is Jira issue number of parent issue and XXX is detailed Redmine issue number.

In the main repository, we recommend you use the branch **D131-integration_d7_but**, and not an old version in the master branch.  The **master** branch is the home for Drupal 6 development, now maintained by Fulvio from SSL, but is generally not able to follow BUT development.  The code does not contain all work and there are a lot of bugs.

The **drupal-7** branch is where Drupal 7 development is happening.  Annertech started from scratch here.  After some time, this will be moved into master.

**D131-integration_d7_but** contains all work integrated together for testing. It is something as BUT development / testing branch. We are using it like a master at BUT; there is a separate bleeding edge version, with a lot of bugs fixed but a lot of new ones introduced.

For Drupal 6 BUT have the branch **D113-integration_but** but development was stopped here in the same time as development of Drupal 6 was stopped.

> If you like to understand a lot of old branches in the repository, it will not be simple (you can contact Jaroslav if you will need it)!

![Advanced configuration](http://www.glam.ac.uk/site_assets/4c24af278b096b04ef000147/staff-banner.jpg)

> Further instructions here go into details with other component subsystems.

## Other components

Brno University of Technology is maintaining a separate repository with StoryScope in it, as well as the Annotation Server and SEC Server. These are available from the decipher repository at `decipher-sec.ssl.co.uk` via SSH.

To download everything (here `UN` should be replaced with your username):

```
git clone ssh://UN@decipher-sec.ssl.co.uk/var/decipher/4Aserver/Annotations/
git clone ssh://UN@decipher-sec.ssl.co.uk/var/decipher/nlpserver
git clone ssh://UN@decipher-sec.ssl.co.uk/var/decipher/storyspace/src
git clone ssh://UN@decipher-sec.ssl.co.uk/var/decipher/sec
```

> Warning: you can not use the working copies in this repositories.  They are not actual - they are here due to some hack for settings of access rights. You can use them only as they was bare repositories.

The code in the directory `/src/trunk/decipher-3` is the latest Drupal 6 version of StoryScope.  To install it, you will need to modify `/src/trunk/decipher-3/sites/default/settings.php` and load `/src/trunk/database-updates/20121009_dump_merged.sql` into your MySQL database.

> Note: Drupal 6 development was stopped, but Drupal 6 it is still available in the branch **D131-integration_d7_but** and annotation editor will be updated here for some time.

## Configuration

Address of the SEC Store API, which is part of SEC Server, is in Annotation server at `/Annotations/src/java/cz/vutbr/fit/knot/annotations/app/Constants.java` (NLP_SERVER_URI), in the connection settings at http://yourserver/drupal-7/admin/structure/services_client/connection (you need to edit connection SecStoreApi) and in http://yourserver/drupal-7/admin/config/search/recommender. It is not so hard to get the Annotation server working: we have [a manual is available](http://knot.fit.vutbr.cz/annotations/directions_for_use_annot_server_en.html) or see the notes below.

Address of the Annotation server, which is part of SEC Server, is in the http://yourserver/drupal-7/admin/config/services/annotation_editor and in the `/var/www/drupal-7/profiles/storyscope/modules/custom/annotation_editor/plugins/aed/aed/4ATinyMCEProxy.php` in allowed servers list REMOTE_4A_SERVER_ADDRESSES (defaultly decipher-sec.ssl.co.uk, knot09.fit.vutbr.cz and localhost are in the list).

> Note: It is very good idea to do some settings of PHP in your php.ini (it ensures proper behaviour): 

```
max_execution_time = 1200
max_input_time = 180
memory_limit = 512M
default_socket_timeout = 180
```

Note that the Annotation server manual includes the wrong repository address.  An older manual for the Annotation editor (i.e. the client side of Annotation server) is [also available](http://knot.fit.vutbr.cz/annotations/directions_for_use_AnnoEd_en.html), but the installation section is completely wrong (it is for old standalone testing version).  We will update these manuals soon (we are waiting for some improvements which are now in progress).

The SEC server should optimally have at least 25 GB of memory (although 16 GB is OK for basic testing), and installation is not particularly easy.  We've provided some notes below; contact Jan Kouril <ikouril@fit.vutbr.cz> for details.

If you are not behind a restrictive firewall, you also can use the Annotation Server on http://decipher-sec.ssl.co.uk:8080/Annotations and the SEC Store API on http://decipher-sec.ssl.co.uk:8081

In order to get the BUT components to work, you need a properly configured and accessible SEC Server and Annotation server *before* you log in into the StoryScope. If you restart them, you will need to log out, and log back in to StoryScope again. If you will be inactive for long time, it is possible that you stay logged in in StoryScope but not in Annotation server and you will need to log out, and log back in.

For logging into StoryScope, log in with `UN:admin` and `PW:oakgrov03`, or `UN:visitor` and `PW:decipherguest` (second one is only for Drupal 6).   We not yet tested whether all of this stuff is working if you are not `admin` -- indeed, we know that there are some problems in Drupal 6.

Inside Drupal, it is good to start by clearing the cache and rebuilding the menus.  

If you'd like to create your own Drupal 6 configuration, it is necessary to enable all of the Decipher Core modules except **Decipher excerpts** and **Decipher search UI**.  After that, you must enable all Features (`recommender_example_event_view`, etc.), except **Decipher Plot Description Events View**.  Finally, you have to enable the TinyMCE plugin and configure it -- allow for appropriate roles, select pages to allow annotating, event detection, enable the `aed` plugin / button, disable anything in Cleanup and output.

If you'd like to create your own Drupal 7 configuration (without using rebuild.sh), it is necessary to enable Decipher recommender, Annotation editor, Services clien and Services client connection. Then you need to edit configuration of WYSIWYG on http://yourserver/storyscope7/admin/config/content/wysiwyg/profile/extra_html/edit where it is necessary to enable aed button/plugin and disable all in the section Cleanup and output. Then you need to import connection configuration in ttp://yourserver/storyspace7/admin/structure/services_client/connection/import:

```
$connection = new stdClass(); $connection->disabled = FALSE; /* Edit this to true to make a default connection disabled initially */ $connection->api_version = 1; $connection->name = 'secstoreapi'; $connection->admin_title = 'SecStoreApi'; $connection->admin_description = 'SEC Store API connection for searching in SEC Store API index. Machine name must be set to "secstoreapi"!'; $connection->version = 3; $connection->endpoint = 'http://decipher-sec.ssl.co.uk:8081'http://decipher-sec.ssl.co.uk:8081';">; (http://decipher-sec.ssl.co.uk:8081';) $connection->config = array(   'auth' => array(     'plugin' => '',     'config' => array(       'username' => '',       'password' => '',     ),   ),   'server' => array(     'plugin' => 'ServicesClientConnectionRestServer',     'config' => array(       'request_formatter' => 'json',       'response_parser' => 'json',     ),   ),   'request' => array(     'plugin' => 'ServicesClientConnectionCurlRequest',     'config' => array(       'request_timeout' => '10',       'ssl_verifypeer_skip' => 1,     ),   ), ); $connection->debug = 1;
```


## Installing the Annotation server (quickstart)

Get the latest GlassFish [from Oracle](http://www.oracle.com/technetwork/java/javaee/downloads/index.html) (select ogs-3.1.2.2-unix-ml.sh after you accept the license agreement), or use the one bundled [with NetBeans All](http://netbeans.org/downloads/).

After succesfull installation of GlassFish and NetBeans, you should have directories 
`/root/glassfish-3.1.2.2` and `/root/netbeans-7.2.1`.

From `/root/Annotations/lib/Jena-2.6.4/lib`, copy `xercesImpl-2.7.1.jar` to
`/root/glassfish-3.1.2.2/glassfish/domains/domain1/lib/`, and replace
`/root/glassfish-3.1.2.2/glassfish/modules/javax.faces.jar` with
`/root/Annotations/resources/JavaFaces/javax.faces-2.1.13.jar` (name it `javax.faces.jar`).

You also need a mysql database with the following parameters:
```
Database: annotations
User: annotations
Password: annotations
```

Perform the SQL query stored in `/root/Annotations/resources/db/annotations_min_data.sql` on the database `annotations@localhost`.

Run Netbeans. If you have standalone GlassFish as a system service and need to deploy it and keep running after closing NetBeans, you can run NetBeans from the console using xpra:

```
xpra start :13
env DISPLAY=:13 nohup /opt/netbeans-7.3/bin/netbeans &
xpra attach :13
```

> Note: After pushing Ctrl-C in console, NetBeans will be detached and still running (you can attach again). After restart of the server NetBeans will not start, but already deployed Annotation server will start correctly. But if you will close NetBeans without server restart, Annotation server will be killed by it.

Open the project Annotations (as you have noticed before, this repository contains NetBeansProject).  In the explorer window, there are tabs Files and Services.  In Services->Servers make right click on Properties of GlassFish and Enable comet support.

> Note: If you have standalone GlassFish, you will need to add it into the servers.

In /Annotations/src/java/cz/vutbr/fit/knot/annotations/app/Constants.java change SERVER_URI to addres which you will use in StoryScope configuration (for local testing commonly "http://localhost:8080" but for locahost you can not use it from outside !!! (all, not only annotation server but storyscope which will use it too)). If SERVER_URI is set badly, it is working but it is unusable (it is confused and data are damaged). In the same file change NLP_SERVER_URI to address of your SEC (SEC Store API).

Put NER to /var/sec and test it by command ./ner.py -f figav07c/example_input2 -k KBstatsMetrics.all in the directory /var/sec/NER. If it will fail, install dependencies (python packages), run make in subdirectories with Makefile etc.

Now run NetBeans project. When project is deployed, in http://localhost:8080/Annotations log in as „idytrych“ with password „test“ (first logging in will be slow as NER is initialised).  Click Upload Ontology. To group „administrators“ upload the OWL ontology you find at http://knot.fit.vutbr.cz/annotations/decipher_v5.owl.  

Your local Annotation server is up and running.

After first logging in to the Storyscope you will need to go to http://example.com:8080/Annotations/ again, log in and on the Users page edit the newly created user (it was created automatically by StoryScope - do not create user by hand!!!) into the „administrators“ user group. It is necessary to do it for every user of every Storyscope (it will be automatic in the future - it is necessary to have same user group as in StoryScope to make it working).

> Note: If your user can not see types of annotations and annotation editor is working very badly, your user is not in the user group (see above).

# Installing the Semantic Enrichment Component

We'll assume you've cloned the repositories from the "Other components" section above.

Here /root stands for whatever you are using as your working directory.

## Install SEC-compatible storyscope (Drupal 6 version)

Now you must copy contents of storyspace src repository to folder `/var/www/decipher`.  When you are finished, you must import database dump. Before you do that, note that compatible version with SEC server is in branch "D113-integration_but" – for more information, ask <ales.zurek@gmail.com>.

You need to switch branch from master (git checkout D113-integration_but).

Create database decipher to your mysql, parametres are as following:
```
Database: decipher
User: decipher
Password: decipher
```

Then you can import the dump, for instance: 
```
mysql -u decipher -p'decipher' decipher < /var/www/decipher/database-updates/20121009_dump_merged.sql
```

When this is done, you can point your browser to http://localhost/decipher/decipher-3

## Install SEC-compatible storyscope (Drupal 7 version)

You need to switch branch from master (git checkout D113-integration_but).

Instal Drupal 7 common way described above and do the rebuild using rebuild.sh. Then set configuration of SEC server adresses (see above).

## Install elasticsearch

Download latest version of elasticsearch from http://www.elasticsearch.org and unpack it to /root (rename the archive elasticsearch – without version).  It is convenient to install the elasticsearch service wrapper.

```
curl -L http://github.com/elasticsearch/elasticsearch-servicewrapper/tarball/master | tar -xz 
mv *servicewrapper*/service elasticsearch/bin/
rm -Rf *servicewrapper*
```

Now you can start elasticsearch with `sudo /etc/init.d/elasticsearch start`.

## Install SEC

The first thing you need to do is to install classifiers and Co-reference resolver.  Copy or create symlinks as following: 

`/root/nlpserver/Coreference` to `/root/Coreference`

`/root/nlpserver/ClassificationModels/RapidminerRepository` to
`/root/RapidminerRepository`

`root/nlpserver/RapidMinerDaemon` to
`/root/RapidMinerDaemon`

`/root/nlpserver/RapidMinerSettings/.RapidMiner5`
to `/root/.RapidMiner5`

Now install some python dependencies:

```
sudo easy_install py4j 
sudo easy_install pymongo 
sudo pip install jsonpickle
sudo easy_install pyes
```
Now you can start daemons:

`sudo java -jar /root/RapidMinerDaemon/dist/RapidMinerDaemon.jar`
`sudo java -jar /root/Coreference/dist/NLPStanford.jar`

The Python NLTK library is required to run further classifiers, previous classifiers were just for sentiment, artistic style genre etc.  Install it via `sudo easy_install nltk`.

After a minute, nltk should be installed, but you still need to download nltk packages to have the scripts working.  Start python and in the nltk interface download all necessary packages.  Just run:
```
python
import
nltk
nltk.download()
d
all
```
Now you can run SEC via `sudo python /root/nlpserver/decipher_web_api/secStoreAPI.py`

The log file is in `/var/log/secStoreAPI.py` so you can check in case something goes wrong. Note that this is still under heavy development, so bugs should be expected to occur often. 

When you've gotten it running, you must also note against which index you are making queries.  In `secStoreAPI.py`, there is a hardcoded line (line 82) with: 
```
conn = ES('athena1.fit.vutbr.cz:9200')
``` 
You should replace that with `localhost:9200`, if you want to run on your own index.  

On athena1.fit.vutbr.cz you can search objects by query from storyscope, but you can't search similar object to those in storyscope – they need to be indexed first, we got it running in November, because we indexed contents of storyscope to ssl server, but unified search still wasn't approved, so on current version, you can't use this feature. On decipher-sec.ssl.co.uk is version of index which is incompatible with latest SEC - it will be updated soon.

secStoreAPI.py is designed to work with the following types – many fields can be empty, so these are just examples.  (Note: for internal search, elasticsearch could be used via the elastica extension to drupal – many of our students are using this on different projects. - but it is something very different from SEC search functionality, where queries are not forwarded directly to the index)

```json
{ "artwork": 
  { 
      "title":"My best artwork",
      "article":"This is the best artwork I've ever created",
      "uri":"http://en.wikipedia.org/my_best_artwork", "src_id":"wikipedia",
      "artwork_type":"painting", "visibility":"public",
      "facets":[ 
			 "sentiment":"pos", 
			 "period":"renaissance", 
			 "theme":"portrait",
			 "readinglevel":"youths",
			 "price":1000000,
			 "currency":"USD",
			 "date":1655,
			 "width":100,
			 "height":100,
			 "artist":["Rembrandt"],
			 "owner":["Louvre Museum"], 
			 "credit_line":"Some copyright" 
      ],
      classified_facets:["sentiment","readinglevel"], 
      "type":"artwork",
      "id": "fb311820-3d60-11e2-a75f-50e54935d982",
      "image":"http://www.img.com/my_best_artwork.jpg" 
  } 
} 

{ 
    "artist": {
	"id": "fb311820-3d60-11e2-a75f-50e54935d983", 
	"title": "Johny English",
	"visibility":"public",
	"date_of_birth": "1234",
	"nationality": "English",
	"places_lived": ["London","Manchester"],
	"period": "renaissance",
	"article": "Johny English had a troubled childhood...",
	"uri": "http://somesite.com/johny_english",
	"artworks":["English landscape","White horse"],
	"date_of_death":"1289", 
	"place_of_birth":"Manchester",
	"relatives":["Mary English", "Peter English"],
	"co-workers":["John Connor","Mary Stuart"],
	"influenced":["William Shakespeare", "John Doe"],
	"influenced_by":["Aristotle","Platon"],
	"image":"http://www.img.com/johny.jpg" 
    }
}

{
    "document":
    {
	"id":"fb311820-3d60-11e2-a75f-50e54935d984", 
	"title":"Document about Mona Lisa",
	"visibility":"public",
	"text": "This document was created ...",
	"uri": "http://documents.com/mona_lisa", 
	"childs": ["fb311820-3d60-11e2-a75f-50e54935d982"]
	"facets":[ "sentiment":"pos",
		   "period":"renaissance",
		   "theme":"portrait",
		   "readinglevel":"youths", ],
	classified_facets:["sentiment","readinglevel","theme","period"] 
    } 
}
```

I hope you understand at least a piece of it :). It should be running nicely with 16 GB, if index is not too big or classifiers are not active, othervise memory requirements are massive.

## Overview of user-level features

BUT work have several parts:

- If you go to **Dossiers** and select **Dossier**, you can **Add New Resource** to this Dossier by using **Search by query** or **Search by example** functionality.  All new content of StoryScope is immediately sent to SEC, so search is combined -- external and internal.

- If you go to any **Object story** or something else which can be annotated (according to TinyMCE settings), you can go to its editing page and see the **Annotation editor button** in the TinyMCE toolbar.  The Annotation editor will connect and you can annotate the text.  When you annotate something, the annotation will be send to Annotation Server, and exported into StoryScope   structures (you will need additional settings in Annotation server administration interface to get it working).  These structures can be visualised as a Graph.  Annotations of the events will also be transformed into StoryScope events too.  You can suggest particular annotations in a "semiautomatic" mode.

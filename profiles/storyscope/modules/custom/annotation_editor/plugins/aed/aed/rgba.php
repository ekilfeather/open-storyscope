<?php
/*****************************************************************
 * Script for automatic generation of one pixel
 * alpha-transparent images for non-RGBA browsers.
 * @author Lea Verou
 * @version 1.0 beta
 * @link http://lea.verou.me/rgba.php/
 * Licensed under a MIT license
 *****************************************************************/

######## SETTINGS ##############################################################

/**
 * Enter the directory in which to store cached color images.
 * This should be relative and SHOULD contain a trailing slash.
 * The directory you specify should exist and be writeable (CHMOD 666 or 777).
 * If you want to store the pngs at the same directory, leave blank ('').
 */
define('COLORDIR', 'colors/');


/**
 * If you requently use a color with varying alphas, you can name it
 * below, to save you some typing and make your CSS easier to read.
 */
$color_names = array(
	'white' => array(255,255,255),
	'black' => array(0,0,0)
	// , 'mycolor' => array(red value, green value, blue value)
);


/**
 * If you don't want the generated pngs to be stored in the server, set the following to
 * false. This is STRONGLY NOT RECOMMENDED. It's here only for testing/debugging purposes.
 */
define('CACHEPNGS', true);



######## NO FURTHER EDITING, UNLESS YOU REALLY KNOW WHAT YOU'RE DOING ##########

$dir = substr(COLORDIR,0,strlen(COLORDIR)-1);
if(!is_writable($dir))
{
	die("The directory '$dir' either doesn't exist or isn't writable.");
}

$rgb = (isset($_REQUEST['name']) && array_key_exists($_REQUEST['name'], $color_names)) ? $color_names[$_REQUEST['name']] : '';

$red	= is_array($rgb)? $rgb[0] : intval($_REQUEST['r']);
$green	= is_array($rgb)? $rgb[1] : intval($_REQUEST['g']);
$blue	= is_array($rgb)? $rgb[2] : intval($_REQUEST['b']);

// "A value between 0 and 127. 0 indicates completely opaque while 127 indicates completely transparent."
// http://www.php.net/manual/en/function.imagecolorallocatealpha.php
$alpha = intval(127 - 127 * ($_REQUEST['a'] / 100));

// Send headers
header('Expires: Sun, 1 Jan 2026 00:00:00 GMT');
header('Cache-control: max-age=2903040000');
header('Content-type: image/png');

// Does it already exist? 
$filepath = COLORDIR . "color_r{$red}_g{$green}_b{$blue}_a$alpha.png";

if(/*CACHEPNGS and */file_exists($filepath))
{
	// The file exists, is it cached by the browser?
	$headers = apache_request_headers();
	if (isset($headers['If-Modified-Since']))
	{
		// We don't need to check if it actually was modified since then as it never changes.
		header('Last-Modified: '.gmdate('D, d M Y H:i:s', filemtime($filepath)).' GMT', true, 304);
	}
	else
	{
		header('Last-Modified: '.gmdate('D, d M Y H:i:s', filemtime($filepath)).' GMT', true, 200);
        header('Content-Length: '.filesize($filepath));
		die(file_get_contents($filepath));
	}
}
else
{
	$img = @imagecreatetruecolor(1,1)
		  or die('Cannot Initialize new GD image stream');
	
	// This is to allow the final image to have actual transparency
	// http://www.php.net/manual/en/function.imagesavealpha.php
	imagealphablending($img, false);
	imagesavealpha($img, true);
	
	// Allocate our requested color
	$color = imagecolorallocatealpha($img, $red, $green, $blue, $alpha);
	
	// Fill the image with it
	imagefill($img,0,0,$color);
	
	// Save the file
	//if(CACHEPNGS)
	{
		imagepng($img,$filepath,0,NULL);
	}
	
	// Serve the file
	imagepng($img);
	
	// Free up memory
	imagedestroy($img);
}





?>

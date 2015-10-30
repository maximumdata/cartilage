<?php

if (!is_admin()) add_action("wp_enqueue_scripts", "google_jquery_enqueue", 11);
function google_jquery_enqueue() {
   wp_deregister_script('jquery');
   wp_register_script('jquery', "http" . ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . "://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js", false, null);
   wp_enqueue_script('jquery');
} // thanks css-tricks!

function theme_enqueues() {
	// if the WP_DEBUG flag is set to true in wp-config.php, the theme will use expanded, dev-friendly versions of the css and javascript.
	// if it's set to false (default), the theme will use minified assets.
	if(WP_DEBUG) {
		wp_enqueue_style( 'compiledStylesDev', get_template_directory_uri() . '/dev/css/style.css', '', time() );
		wp_enqueue_script( 'vendorDev', get_template_directory_uri() . '/dev/js/vendor.js', array('jquery'), time(), true );
		wp_enqueue_script( 'customDev', get_template_directory_uri() . '/dev/js/custom.js', array('vendorDev'), time(), true );
	} else {
		wp_enqueue_style( 'compiledStyles', get_template_directory_uri() . '/public/css/style.css', '', '1.0.0' );
		wp_enqueue_script( 'vendor', get_template_directory_uri() . '/public/js/vendor.js', array('jquery'), '1.0.0', true );
		wp_enqueue_script( 'custom', get_template_directory_uri() . '/public/js/custom.js', array('vendor'), '1.0.0', true );
	}
}

add_action( 'wp_enqueue_scripts', 'theme_enqueues' );

remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

add_filter( 'script_loader_tag', function ( $tag, $handle ) {
	return preg_replace("/(><\/[a-zA-Z][^0-9](.*)>)$/", " async $1 ", $tag );
}, 10, 2 );

?>
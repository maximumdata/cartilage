<?php

if (!is_admin()) add_action("wp_enqueue_scripts", "google_jquery_enqueue", 11);
function google_jquery_enqueue() {
   wp_deregister_script('jquery');
   wp_register_script('jquery', "http" . ($_SERVER['SERVER_PORT'] == 443 ? "s" : "") . "://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js", false, null);
   wp_enqueue_script('jquery');
} // thanks css-tricks!

function theme_enqueues() {
	wp_enqueue_style( 'compiled-styles', get_template_directory_uri() . '/public/css/style.css' );
	wp_enqueue_script( 'vendor', get_template_directory_uri() . '/public/js/vendor.js', array(), '1.0.0', true );
	wp_enqueue_script( 'custom', get_template_directory_uri() . '/public/js/custom.js', array('vendor'), '1.0.0', true );
}

add_action( 'wp_enqueue_scripts', 'theme_enqueues' );

?>
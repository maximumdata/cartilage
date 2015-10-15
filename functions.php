<?php

function theme_enqueues() {
	wp_enqueue_style( 'compiled-styles', get_template_directory_uri() . '/public/css/style.css' );
	wp_enqueue_script( 'vendor', get_template_directory_uri() . '/public/js/vendor.js', array(), '1.0.0', true );
	wp_enqueue_script( 'custom', get_template_directory_uri() . '/public/js/custom.js', array('vendor'), '1.0.0', true );
}

add_action( 'wp_enqueue_scripts', 'theme_enqueues' );

?>
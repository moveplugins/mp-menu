<?php
/**
 * Check for updates for this Plugin
 *
 */
 if (!function_exists('mp_menu_update')){
	function mp_menu_update() {
		$args = array(
			'software_name' => 'MP Menu', //<- The exact name of this Plugin. Make sure it matches the title in your mp_repo, edd, and the WP.org repo
			'software_api_url' => 'http://repo.moveplugins.com',//The URL where EDD and mp_repo are installed and checked
			'software_filename' => 'mp-menu.php',
			'software_licensed' => false, //<-Boolean
		);
		
		//Since this is a plugin, call the Plugin Updater class
		$mp_menu_plugin_updater = new MP_CORE_Plugin_Updater($args);
	}
 }
add_action( 'init', 'mp_menu_update' );

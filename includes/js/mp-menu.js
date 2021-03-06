jQuery(document).ready(function($){
	
	//Wrap body is holding div which can have values which are not processed on 'body' or 'html'
	$( 'body' ).wrapInner('<div id="mp-menu-site-wrap" />');
		
	//Add menu holder to screen
	$( '#mp-menu-site-wrap' ).prepend( '<div id="mp-menu-holder"><div id="mp-menu-holder-inner"></div></div>' );
	
	//If the wpadminbar is on the screen
	if ($('#wpadminbar').length != 0) {
		navigation_selector = ':eq(0)';
	} else {
		navigation_selector = ':first';
	}
  
	//Store location of navigation by adding a placeholder div after it 
	$( '[role=navigation]' ).filter(navigation_selector).after( '<div id="mp-menu-navigation-placeholder"></div>' );
  	
	//Add menu toggle to screen
	$( '[role=navigation]' ).filter(navigation_selector).after( '<div id="mp-menu-toggle-button-holder"><a class="mp-menu-toggle"></a></div>' );
	
	//Add close menu to mp-menu-holder
	$( '[role=navigation]' ).filter(navigation_selector).append( '<div id="mp-menu-close-button-holder"><a class="mp-menu-close-button"></a></div><div style="clear: both;"></div>' );
	
	//Items which should have the "open" or "close" class added to them
	var $items = $( '.site, .hfeed, [role=navigation]' );
	
	//Open function
	var mp_menu_open = function() {

		//$( 'body' ).addClass( 'mobile-open' );
		setTimeout(function() {
			$items.removeClass('mp-menu-close').addClass('mp-menu-open');
			
			//Jquery trigger hook for menu open
			$(window).trigger("mp_menu_open_trigger");
	
		}, 300);
	}
	
	//Close function
	var mp_menu_close = function() { 
		//$( 'body' ).delay(300).removeClass( 'mobile-open' );
		$items.removeClass('mp-menu-open').addClass('mp-menu-close');
		
		//After the transition is done, remove the mp-menu-close class because it breaks fixed menus because the properites conflict		
		setTimeout(function() {
			$items.removeClass( 'mp-menu-close' );
			
			//Jquery trigger hook for menu close
			$(window).trigger("mp_menu_close_trigger");
			
		}, 300);
		
	}
	
	//When toggle switch is clicked
  	$( '.mp-menu-toggle, .mp-menu-close-button' ).click(function(e){
		
		e.preventDefault();

		$items.hasClass( 'mp-menu-open' ) ? $(mp_menu_close) : $(mp_menu_open);
	});
	
	//If the user clicks on the main site area, close the nav as well
	$(document).on('touchstart click', '#mp-menu-site-wrap > .site.mp-menu-open, #mp-menu-site-wrap > .hfeed.mp-menu-open', function(e){
				
		$(mp_menu_close);
		
	});
	
	var screen_width = mp_menu_vars.change_at_screen_width;
	
	//When the screen is smaller than the defined number of pixels
	enquire.register("screen and (max-width:"+screen_width+"px)", {
						
			// If supplied, triggered when a media query matches.
			match : function() {
				
				//Jquery trigger hook for menu switch
				$(window).trigger("mp_menu_switch_to_popout");
				
				//Move site navigation - this only needs to be done if the overflow:hidden value is set on the parent. This must be moved outside of that
				$( '#mp-menu-holder #mp-menu-holder-inner' ).append( $( '[role=navigation]' ).filter(navigation_selector) );
				
				//Dropdowns - show them when clicked 
				$(document).on('click', '#mp-menu-holder #mp-menu-holder-inner li a:not(:last-child)', function(menu_item_clicked){
					
					//Prevent the default click action
					menu_item_clicked.preventDefault();
					
					//Toggle the desplay of this drodown sub-menu
					$(this).next().slideToggle();
								
				});	
				
			},      
										
			// If supplied, triggered when the media query transitions 
			// *from a matched state to an unmatched state*.
			unmatch : function() {
				
				//Jquery trigger hook for menu switch
				$(window).trigger("mp_menu_switch_to_normal");
				
				//Move site navigation back to its original location
				$( '#mp-menu-navigation-placeholder' ).before( $( '[role=navigation]' ).filter(navigation_selector) );
				
				//Remove all inline display styles added to li elements for dropdowns
				$( '.sub-menu' ).css( 'display', '' );
									
			}
			
	});
		
});
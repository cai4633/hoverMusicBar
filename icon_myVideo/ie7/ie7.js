/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icon_myVideo\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-file-text2': '&#xe926;',
		'icon-enlarge': '&#xe989;',
		'icon-bookmarks': '&#xe9d3;',
		'icon-play2': '&#xea15;',
		'icon-pause': '&#xea16;',
		'icon-stop': '&#xea17;',
		'icon-previous': '&#xea18;',
		'icon-next': '&#xea19;',
		'icon-volume-medium': '&#xea27;',
		'icon-volume-mute2': '&#xea2a;',
		'icon-loop': '&#xea2d;',
		'icon-share': '&#xea7d;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());

HTML_TEMPLATE_CACHE = {};
 
loadTemplate = function(path) {
  if ( path in HTML_TEMPLATE_CACHE ) return HTML_TEMPLATE_CACHE[path];
  let html = $.get({
    url: path,
    dataType: 'html',
    async: false
  }).responseText;
  HTML_TEMPLATE_CACHE[path] = html;
  return html;
}

const templates = {
	LOTFP_RENDER_RETAINER_UI: "html/actors/retainer.html",
	LOTFP_RENDER_CHARACTER_UI: "html/actors/character.html",
	LOTFP_RENDER_NPC_UI: "html/actors/npc.html",
	LOTFP_RENDER_RENDER_ELEMENT_ARMOR: "html/elements/armor.html",
	LOTFP_RENDER_RENDER_ELEMENT_CONSUMABLE: "html/elements/consumable.html",
	LOTFP_RENDER_RENDER_ELEMENT_ITEM: "html/elements/item.html",
	LOTFP_RENDER_RENDER_ELEMENT_SPELL: "html/elements/item_charged.html",
	LOTFP_RENDER_RENDER_ELEMENT_ITEM_CHARGED: "html/elements/spell.html",
	LOTFP_RENDER_RENDER_ELEMENT_WEAPON: "html/elements/weapon.html",
	LOTFP_RENDER_CHAR_TAB_FRONT: "html/actos/char_tab_front.html",
	LOTFP_RENDER_CHAR_TAB_INVENTORY: "html/actos/char_tab_inventory.html",
	LOTFP_RENDER_CHAR_TAB_WEALTH: "html/actos/char_tab_wealth.html",
	LOTFP_RENDER_CHAR_TAB_ENCUMBERANCE: "html/actos/char_tab_encumberance.html",
	LOTFP_RENDER_CHAR_TAB_SKILLS: "html/actos/char_tab_skills.html",
	LOTFP_RENDER_CHAR_TAB_ATTR: "html/actos/char_tab_attr.html",
	LOTFP_RENDER_CHAR_TAB_SPELLS: "html/actos/char_tab_spells.html"
};

Object.keys(templates).forEach(function (key) {
	sync.render(key, function(obj, app, scope) {
		return sync.render("ui_processUI")(obj, app, {display: loadTemplate(templates[key])});
	});
});

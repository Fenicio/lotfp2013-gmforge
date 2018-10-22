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
	RETAINER_UI: "html/actors/retainer.html",
	CHARACTER_UI: "html/actors/character.html",
	NPC_UI: "html/actors/npc.html",
	FTC_RENDER_ELEMENT_ARMOR: "html/elements/armor.html",
	FTC_RENDER_ELEMENT_CONSUMABLE: "html/elements/consumable.html",
	FTC_RENDER_ELEMENT_ITEM: "html/elements/item.html",
	FTC_RENDER_ELEMENT_SPELL: "html/elements/item_charged.html",
	FTC_RENDER_ELEMENT_ITEM_CHARGED: "html/elements/spell.html",
	FTC_RENDER_ELEMENT_WEAPON: "html/elements/weapon.html",
	CHAR_TAB_FRONT: "html/actos/char_tab_front",
	CHAR_TAB_INVENTORY: "html/actos/char_tab_inventory",
	CHAR_TAB_WEALTH: "html/actos/char_tab_wealth",
	CHAR_TAB_ENCUMBERANCE: "html/actos/char_tab_encumberance",
	CHAR_TAB_SKILLS: "html/actos/char_tab_skills",
	CHAR_TAB_ATTR: "html/actos/char_tab_attr",
	CHAR_TAB_SPELLS: "html/actos/char_tab_spells"
};

Object.keys(templates).forEach(function (key) {
	sync.render(key, function(obj, app, scope) {
		return sync.render("ui_processUI")(obj, app, {display: loadTemplate(templates[key])});
	});
});

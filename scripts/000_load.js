HTML_TEMPLATE_CACHE = {};

const PACKAGE_NAME = "lotfp2013-gmforge";
const ROOT_DIR ='workshop/'+PACKAGE_NAME+'/';
const TEMPLATE_DIR ='workshop/'+PACKAGE_NAME+'/html/';
const CSS_DIR ='workshop/'+PACKAGE_NAME+'/css/';

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
console.log("LOADING");
const templates = {
  LOTFP_RENDER_RETAINER_UI: "actors/retainer.html",
  LOTFP_RENDER_CHARACTER_UI: "actors/character.html",
  LOTFP_RENDER_NPC_UI: "actors/npc.html",
  LOTFP_RENDER_RENDER_ELEMENT_ARMOR: "elements/armor.html",
  LOTFP_RENDER_RENDER_ELEMENT_CONSUMABLE: "elements/consumable.html",
  LOTFP_RENDER_RENDER_ELEMENT_ITEM: "elements/item.html",
  LOTFP_RENDER_RENDER_ELEMENT_SPELL: "elements/item_charged.html",
  LOTFP_RENDER_RENDER_ELEMENT_ITEM_CHARGED: "elements/spell.html",
  LOTFP_RENDER_RENDER_ELEMENT_WEAPON: "elements/weapon.html",
  LOTFP_RENDER_CHAR_TAB_FRONT: "actors/char_tab_front.html",
  LOTFP_RENDER_CHAR_TAB_INVENTORY: "actors/char_tab_inventory.html",
  LOTFP_RENDER_CHAR_TAB_WEALTH: "actors/char_tab_wealth.html",
  LOTFP_RENDER_CHAR_TAB_ENCUMBERANCE: "actors/char_tab_encumberance.html",
  LOTFP_RENDER_CHAR_TAB_SKILLS: "actors/char_tab_skills.html",
  LOTFP_RENDER_CHAR_TAB_ATTR: "actors/char_tab_attr.html",
  LOTFP_RENDER_CHAR_TAB_SPELLS: "actors/char_tab_spells.html"
};

Object.keys(templates).forEach(function (key) {
  console.log('key', key);
  
  console.log('TEMPLATE_DIR + loadTemplate(templates[key]', loadTemplate(TEMPLATE_DIR + templates[key]));
  console.log("sync", sync);
  sync.render(key, function(obj, app, scope) {
    console.log('obj', obj);
    console.log('app', app);
    console.log('scope', scope);
    return sync.render("ui_processUI")(obj, app, {display: loadTemplate(TEMPLATE_DIR + templates[key])});
  });
});

let MOD_PATH = "/workshop/lotfp2013"
const LOTFP = {
  VERSION: 'BETA',
  Compendium: {},
  sendCharacterRoll(obj, query, flavor) {
    runCommand("chatEvent", {
      person : obj.data.info.name.current,
      icon : obj.data.info.img.current,
      flavor : flavor,
      user : game.players.data[uid].displayName, // game 
      ui: "lotfp_roll",
      roll: LOTFP.simpleEval(query),
      userID : getCookie("UserID")
      // TODO add sound
    });
  },
  sendCharacterSave(obj, query, flavor) {
    runCommand("chatEvent", {
      person : obj.data.info.name.current,
      icon : obj.data.info.img.current,
      flavor : flavor,
      user : game.players.data[uid].displayName, // game 
      ui: "lotfp_save",
      roll: LOTFP.simpleEval(query),
      userID : getCookie("UserID")
      // TODO add sound
    });
  },
  sendCharacterSkill(obj, query, flavor) {
    runCommand("chatEvent", {
      person : obj.data.info.name.current,
      icon : obj.data.info.img.current,
      flavor : flavor,
      user : game.players.data[uid].displayName, // game 
      ui: "lotfp_skill",
      roll: LOTFP.simpleEval(query),
      userID : getCookie("UserID")
      // TODO add sound
    });
  },
  simpleEval: function(query) {
    const dices = [];
    query = query.replace(window.diceRegex, function(m){
      const res = sync.evalDice(m);
      res.replace(/[0-9]+/g, function(m2){
        const match = /[dD][0-9]+/g.exec(m);
        dices.push({
          dice:match[0],
          roll:m2
        });
        return m2;
      });
      return res  + "["+m+"]";
    });
    var diceOnly = query;

    query = query.replace(/\[.*?\]/g,"");
    return {
      diceOnly:diceOnly,
      total:sync.eval(query),
      dices:dices
    };
  }
};
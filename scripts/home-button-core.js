import { HomeButtonSettings } from './settings.js';

class CoreButtonHandler {

  static buttonConstructor(){
    $('#logo').before(`<div id='home-button-container' class='home-button-container'><button id='home-button' class='home-button'><i id="home-button-icon" class="fa-solid fa-house-blank"></i></button></div>`);
  }

  static goToScene(){
    const homeScene = game.scenes.contents.find((scene, index) => index == game.settings.get('home-button', 'homeScene'))
    const currentScene = game.scenes.viewed
    const activeScene = game.scenes.active

    if(currentScene != activeScene){
      $("#home-button-icon").replaceWith(`<i id="home-button-icon" class="fa-solid fa-turn-down-left"></i>`)
      activeScene.view()
    }
    if(currentScene == activeScene){
      $("#home-button-icon").replaceWith(`<i id="home-button-icon" class="fa-solid fa-house-blank"></i>`)
      homeScene.view()
    }
  }
}

Hooks.once('init', function () {
  CoreButtonHandler.buttonConstructor();
});

Hooks.once('ready', function () {
  HomeButtonSettings.registerSettings(game.scenes.contents);
  $('#home-button').on('click', ()=> {
    CoreButtonHandler.goToScene()
  });
});

Hooks.once('createScene', function(){
  HomeButtonSettings.registerSettings(game.scenes.contents);
});

Hooks.once('deleteScene', scene => {
 const homeScene = game.scenes.contents.find((scene, index) => index == game.settings.get('home-button', 'homeScene'))
 if(homeScene == scene){
   game.settings.set("home-button", "homeScene", 0)
 }
 HomeButtonSettings.registerSettings(game.scenes.contents)
});
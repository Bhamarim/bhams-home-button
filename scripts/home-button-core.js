import { HomeButtonSettings } from './settings.js'

class CoreButtonHandler {
  //Creates button
  static buttonConstructor() {
    $('#logo').before(
      `<div id='home-button-container' class='home-button-container'><button id='home-button' class='home-button'><i id="home-button-icon" class=""></i></button></div>`,
    )
  }

  //Handle scene switching
  static sceneSwtich() {
    const homeScene = game.scenes.contents.find(
      (scene, index) => index == game.settings.get('bhams-home-button', 'homeScene'),
    )
    const currentScene = game.scenes.viewed
    const activeScene = game.scenes.active

    if (currentScene != activeScene) {
      activeScene.view()
    }
    if (currentScene == activeScene) {
      homeScene.view()
    }
  }

  static iconSwitch() {
    const currentScene = game.scenes.viewed
    const activeScene = game.scenes.active

    //Viewing Landing Page
    if (currentScene != activeScene) {
      $('#home-button-icon').replaceWith(`<i id="home-button-icon" class="fa-solid fa-turn-down-left"></i>`)
    }
    //Viewing Active Scene
    if (currentScene == activeScene) {
      $('#home-button-icon').replaceWith(`<i id="home-button-icon" class="fa-solid fa-house-blank"></i>`)
    }
  }
}

Hooks.once('init', function () {
  CoreButtonHandler.buttonConstructor()
})

Hooks.once('ready', function () {
  HomeButtonSettings.registerSettings(game.scenes.contents)
  CoreButtonHandler.iconSwitch()
  $('#home-button').on('click', () => {
    CoreButtonHandler.sceneSwtich()
    CoreButtonHandler.iconSwitch()
  })
})

Hooks.once('createScene', function () {
  HomeButtonSettings.registerSettings(game.scenes.contents)
})

Hooks.once('deleteScene', (scene) => {
  const homeScene = game.scenes.contents.find(
    (scene, index) => index == game.settings.get('bhams-home-button', 'homeScene'),
  )
  if (homeScene == scene) {
    game.settings.set('bhams-home-button', 'homeScene', 0)
  }
  HomeButtonSettings.registerSettings(game.scenes.contents)
})

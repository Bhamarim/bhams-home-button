export class HomeButtonSettings{
    static registerSettings(scenes){
        game.settings.register('home-button', 'homeScene', {
            name: 'Home Scene',
            hint: 'Set the scene you want your players to return to at any moment. Pressing the button again will return them to the current active scene.',
            config: true,
            restricted: 'true',
            type: String,
            choices: scenes.map(scene => scene.name),
            default: scenes[0].name,
            onChange: debouncedReload
          });
    }
}


export let CONFIGURATION = {
  baseUrls: {
   // server: 'http://localhost:64943/',
     server: 'http://foodchooser.azurewebsites.net/',
    apiUrl: 'api/',
    foodImageFolder: 'foodimages/'
  },
  authConfig: {
    CLIENT_ID: 'AngularFoodClient',
    GRANT_TYPE: 'password',
    SCOPE: 'WebAPI'
  }
};

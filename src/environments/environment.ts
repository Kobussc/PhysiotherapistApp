import { firebaseConfig } from './../app/app.module';
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: 'AIzaSyBDsnXvV2k5Xe8r3Iks8L0TnXqZ551Uz90',
    authDomain: 'physiotherapistapp1.firebaseapp.com',
    databaseURL: 'https://physiotherapistapp1.firebaseio.com',
    projectId: 'physiotherapistapp1',
    storageBucket: '',
    messagingSenderId: '679335193359'
  }
};

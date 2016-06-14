import { Accounts } from 'meteor/accounts-base';

 // тут дозволяється замість майлу вказувати будь який юзернейм
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

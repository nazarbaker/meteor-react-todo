# meteor-react-todo

https://www.meteor.com/tutorials/react/creating-an-app

    meteor create simple-todos
    meteor npm install --save react react-dom
    
    Вся основна логіка відбувається в imports/ui/App.jsx
  

  import/api/task.js - в цьому файлі підключається mongodb
  
  і передається в server/main.js 
  i imports/ui/App.jsx
  
    Using data from a collection inside a React component:
  
    meteor npm install --save react-addons-pure-render-mixin
    meteor add react-meteor-data
    
    Запис в базу з консолі
    meteor mongo
    db.tasks.insert({ text: "Hello world!", createdAt: new Date() });
    
    
    додаваня можливості логування
    meteor add accounts-ui accounts-password
    
    imports/ui/AccountsUIWrapper.jsx
    
    
    
    Запуск на (для) моб
    https://www.meteor.com/tutorials/react/running-on-mobile

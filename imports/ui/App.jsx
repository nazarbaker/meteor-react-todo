import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor'; // підключається для підтягування юзера
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
//колись було так var App = React.createClass({...})


class App extends Component {
  // для стейту з приховування виконаних списків
  // запис в стейт
    constructor(props) {
      super(props);

      this.state = {
        hideCompleted: false,
      };
    }

    handleSubmit(event) {
     event.preventDefault();

     // Find the text field via the React ref
    //  тут записується текст з інпуту
     const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

// записуєм в базу в колекцію tasks
     Tasks.insert({
       text,
       createdAt: new Date(), // current time

       owner: Meteor.userId(),           // _id of logged in user
       username: Meteor.user().username,  // username of logged in user
     });

     // Clear form
     ReactDOM.findDOMNode(this.refs.textInput).value = '';
   }

// функція яка змінює чекед в стейті
   toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  // this.props.tasks -> приходить з ../api/tasks.js   вроді :)
  // фільтрує по стейту
  // до фільтрації не було нічого до закоментованого рядка
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
    // return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>
        </header>

{/* тут запис йде в стейт браузера і дані зникнуть після перезагрузки */}
        <label className="hide-completed">
          <input
            type="checkbox"
            readOnly
            checked={this.state.hideCompleted}
            onClick={this.toggleHideCompleted.bind(this)}
          />
          Hide Completed Tasks
        </label>

        <AccountsUIWrapper />

{/* handleSubmit -  In React, this is how you listen to browser events,
  like the submit event on the form
  bind - робить привязку контексту - привязує обробник до події
  */}


      {/* було так
         <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
          <input
            type="text"
            ref="textInput"
            placeholder="Type to add new tasks"
          />
        </form>

        стало так, щоб можна було вводити дані тільки для залогованих */}

        { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
            </form> : ''
          }

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

// check validate
App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};
 //  Наскільки я зрозумів тут автоматично слідкується за оновленням
 // в базі діних і оновлює сторінку і сортує з новіших до старших
 // другий рядок бере кількість не виконаних тасків
 // третій рядок бере поточного юзера
export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);

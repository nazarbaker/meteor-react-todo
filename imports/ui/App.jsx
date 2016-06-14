import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

// App component - represents the whole app
//колись було так var App = React.createClass({...})


class App extends Component {

    handleSubmit(event) {
     event.preventDefault();

     // Find the text field via the React ref
    //  тут записується текст з інпуту
     const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

// записуєм в базу в колекцію tasks
     Tasks.insert({
       text,
       createdAt: new Date(), // current time
     });

     // Clear form
     ReactDOM.findDOMNode(this.refs.textInput).value = '';
   }


  // this.props.tasks -> приходить з ../api/tasks.js   вроді :)
  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

{/* handleSubmit -  In React, this is how you listen to browser events,
  like the submit event on the form
  bind - робить привязку контексту - привязує обробник до події
  */}
        <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
          <input
            type="text"
            ref="textInput"
            placeholder="Type to add new tasks"
          />
        </form>

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
};
 //  Наскільки я зрозумів тут автоматично слідкується за оновленням
 // в базі діних і оновлює сторінку і сортує
export default createContainer(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);

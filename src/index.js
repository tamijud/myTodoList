
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Checkbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checked: this.props.checked,
            handleCheck: this.props.handleCheck
          };
  
    }

    render() {
      return (
          <input type="checkbox" onChange={this.state.handleCheck} value={this.state.checked} /> 
      );
    }
  }

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked:props.checked,
            task:props.task,
            index: props.index,
            newTask: props.newTask,
            handleChecked: props.handleChecked,
            handleNewTask: props.handleNewTask
        }
        this.handleCheck = this.handleCheck.bind(this);
        this.handleNewTask = this.handleNewTask.bind(this);
        this.handleTaskInput = this.handleTaskInput.bind(this);
    }

    handleCheck(){
        this.setState({checked: !this.state.checked});
        this.state.handleChecked(this.state.index);

    }

    handleTaskInput(event) {
        console.log("got task input " + event.target.value);
        this.setState({task: event.target.value});
      }

    handleNewTask(event){
        this.state.handleNewTask(this.state.task);
        event.preventDefault();
    }

    render() {
        console.log("Item["+this.state.index+"].state.newTask = "+ this.state.newTask);
        if(this.state.newTask)
        {
            // input area
            return(
                <li key= {this.state.index}>
                <form onSubmit={this.handleNewTask}>
                    <input type="text" value={this.state.task} onChange={this.handleTaskInput} />
                    <input type="submit" value="Add" />
                </form>
                </li>
            )
        }
        else
        {
            if (this.state.checked  ) {
                return (
                    <li key= {this.state.index}>
                        <Checkbox checked={this.state.checked} handleCheck={this.handleCheck} />
                        <strike className="task">{this.state.task}</strike>
                        
                    </li>
                );
            } else {
                return (
                    <li key= {this.state.index}>
                        <Checkbox checked={this.state.checked}  handleCheck={this.handleCheck}/>
                        <label className="task">{this.state.task}</label>
                        
                    </li>
                );
            }
        }
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {todos:[
            {checked: false, task: "learn react"},
            {checked: false, task: "make lunch"}
        ] };

        this.handleItemIsDone = this.handleItemIsDone.bind(this);
        this.handleNewTask = this.handleNewTask.bind(this);
    }

    handleItemIsDone(i){
        var todos = this.state.todos;
        todos[i].checked = !todos[i].checked;
        this.setState({todos: todos});
    }

    handleNewTask(task){
        var todos = this.state.todos;
        todos.push({checked:false, task:task});
        this.setState({todos: todos});
    }

    render() {
        var leftToDo = 0;
        this.state.todos.forEach(function (item) {if(!item.checked) leftToDo++;});
        const status = 'Items left to do: ' + leftToDo;

        
        return (
            <div>
                <div className="status">{status}</div>
                <ol>
                    {this.state.todos.map((item,index) => <Item checked={item.checked} task={item.task} key={index} 
                                                                index={index} newTask={false}
                                                                handleChecked={this.handleItemIsDone} handleNewTask={this.handleNewTask}/>)}
                    <Item checked={false} task={""} key={this.state.todos.length} 
                          index={this.state.todos.length} newTask={true}
                          handleChecked={this.handleItemIsDone} handleNewTask={this.handleNewTask} />
                </ol>
            </div>
        );
    }
}


// ========================================

ReactDOM.render(
    <Board />,
    document.getElementById('root')
);

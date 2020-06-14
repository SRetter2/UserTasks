import React from 'react';
import axios from 'axios';
import { HubConnectionBuilder } from '@aspnet/signalr';
import TaskRow from '../components/TaskRow';
import { AuthContext } from '../AuthContext';

class Home extends React.Component {

    state = {
        connection: null,
        taskText: '',
        tasks: []
    }
    componentDidMount = async () => {
        const connection = new HubConnectionBuilder()
            .withUrl("/userTaskHub").build();
        await connection.start();

        await connection.on("refreshTasks", obj => {
          this.setState({ tasks: obj })
        });

        this.setState({ connection });
        this.refreshTasks();
    }
    refreshTasks = () => {
        this.state.connection.invoke("gettasks");
    }
    onTextChange = e => {
        this.setState({ taskText: e.target.value });
    }
    onAddTaskClick = async () => {
        const name = this.state.taskText;
        await axios.post('/api/usertask/addtask', { name });
        this.setState({ taskText: '' });
        await this.refreshTasks();
    }
    onTakeTask = async task => {
        await axios.post('/api/usertask/updatetask', task );
        await this.refreshTasks();
        console.log(this.state.tasks);
    }
    onDoneTask = async id => {
        await axios.post('/api/usertask/deletetask', { id });
        await this.refreshTasks();
        console.log(this.state.tasks);
    }

    render() {
        const { taskText, tasks } = this.state;
        return (
            <AuthContext.Consumer>
                {value => {
                    const { user } = value;
                   return <div>
                        <div className='col-md-3 col-offset-md-6'>
                            <input type='text' className='form-control' value={taskText} onChange={this.onTextChange} placeholder='Task Name...'/>
                        </div>
                        <div className='col-md-3 col-offset-md-6'>
                            <button className='btn btn-success' onClick={this.onAddTaskClick}>Add Task</button>
                        </div>
                        <div>
                            <table className='table table-bordered table-striped table-hover' style={{marginTop:40}}>
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(t =>
                                        <TaskRow
                                            key={t.id}
                                            task={t}
                                            onDoneTask={() => this.onDoneTask(t.id)}
                                            onTakeTask={() => this.onTakeTask(t)}
                                            currentUser={user} />)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                }}
            </AuthContext.Consumer>
        );
    }
}

export default Home;
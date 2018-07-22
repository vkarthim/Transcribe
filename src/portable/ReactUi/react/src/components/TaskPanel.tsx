import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/taskActions';
import taskList from '../selectors';
import TaskItem from './controls/TaskItem';
import './TaskPanel.css';

interface IProps extends IStateProps, IDispatchProps {
};

class TaskPanel extends React.Component<IProps, object> {
      public render() {
        const { assignedTranscribe, availableTranscribe } = this.props;
        const { loaded, pending, selectedUser, selectedTask } = this.props;
        const { assignTask, selectTask } = this.props
        
        if (this.props.selectedTask.trim() === '' && this.props.assignedTranscribe.length > 0) {
            selectTask(assignedTranscribe[0].id);
        }
        const transcribeHead = (assignedTranscribe.length + availableTranscribe.length > 0)?
            (<h3 className="SectionHead">TO TRANSCRIBE</h3>): <div/>;
        const assignedHead = assignedTranscribe.length > 0?
            (<h4 className="ListHead">Assigned</h4>): <div/>;
        const assignedList = assignedTranscribe.map((t: ITask) => (
            <TaskItem
                id={t.id}
                name={t.name}
                selected={t.id === selectedTask}
                select={selectTask.bind(this,t.id)}/>
        ));
        const availableHead = availableTranscribe.length > 0?
            (<h4 className="ListHead">Available</h4>): <div/>;
        const availableList = availableTranscribe.map((t: ITask) => (
            <TaskItem
                id={t.id}
                name={t.name}
                selected={t.id === selectedTask}
                select={assignTask.bind(this,t.id, selectedUser)}/>
        ));
        const wrapper: JSX.Element = !pending && loaded? (
            <div>
                {transcribeHead}
                {assignedHead}
                {assignedList}
                {availableHead}
                {availableList}
            </div>
        ): <div/>;
        return (
            <div className="TaskPanel">
                {wrapper}
            </div>
        )
    }
};

interface IStateProps {
    assignedTranscribe: ITask[];
    availableTranscribe: ITask[];
    loaded: boolean;
    pending: boolean;
    selectedUser: string;
    selectedTask: string;
}

const mapStateToProps = (state: IState): IStateProps => ({
    assignedTranscribe: taskList(state).assignedTranscribe,
    availableTranscribe: taskList(state).availableTranscribe,
    loaded: state.tasks.loaded,
    pending: state.tasks.pending,
    selectedTask: state.tasks.selectedTask,
    selectedUser: state.users.selectedUser,
  });
  
  interface IDispatchProps {
    assignTask: typeof actions.assignTask;
    selectTask: typeof actions.selectTask;
  };
  
  const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    ...bindActionCreators({
        assignTask: actions.assignTask,
        selectTask: actions.selectTask,
        }, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(TaskPanel);
  
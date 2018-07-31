import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/taskActions';
import { ITranscriberStrings } from '../model/localize';
import { IState } from '../model/state';
import taskList from '../selectors';
import userStrings from '../selectors/localize';
import RevertAction from './controls/RevertAction';
import TaskItem from './controls/TaskItem';
import './TaskPanel.css';

interface IProps extends IStateProps, IDispatchProps {
};

class TaskPanel extends React.Component<IProps, object> {
      public render() {
        const { assignedReview, assignedTranscribe, availableReview, availableTranscribe } = this.props;
        const { loaded, pending, selectedUser, selectedTask } = this.props;
        const { assignTask, selectTask, strings, unassignTask } = this.props
        
        if (this.props.selectedTask.trim() === '' && this.props.assignedReview.length > 0) {
            selectTask(assignedReview[0].id);
        }
        if (this.props.selectedTask.trim() === '' && this.props.assignedTranscribe.length > 0) {
            selectTask(assignedTranscribe[0].id);
        }
        const assignedHead = (assignedReview.length + assignedTranscribe.length > 0)?
            (<h3 className="SectionHead">{strings.assigned.toUpperCase()}</h3>): <div/>;
        const assignedReviewHead = assignedReview.length > 0?
            (<h4 className="ListHead">{strings.review}</h4>): <div/>;
        const assignedTranscribeHead = assignedTranscribe.length > 0?
            (<h4 className="ListHead">{strings.transcribe}</h4>): <div/>;
        const assignedReviewList = assignedReview.map((t: ITask) => (
            <div className="AssignedRow">
                <TaskItem
                    id={t.id}
                    name={t.name}
                    selected={t.id === selectedTask}
                    select={selectTask.bind(this,t.id)}/>
                <RevertAction 
                    selected={t.id === selectedTask}
                    target={unassignTask.bind(this, t.id, selectedUser)}
                    text={"\u2B73"} />
            </div>
        ));
        const assignedTranscribeList = assignedTranscribe.map((t: ITask) => (
            <div className="AssignedRow">
                <TaskItem
                    id={t.id}
                    name={t.name}
                    selected={t.id === selectedTask}
                    select={selectTask.bind(this,t.id)}/>
                <RevertAction 
                    selected={t.id === selectedTask}
                    target={unassignTask.bind(this, t.id, selectedUser)}
                    text={"\u2B73"} />
            </div>
        ));
        const availableHead = (availableReview.length + availableTranscribe.length > 0)?
            (<h3 className="SectionHead">{strings.available.toUpperCase()}</h3>): <div/>;
        const availableReviewHead = availableReview.length > 0?
            (<h4 className="ListHead">{strings.review}</h4>): <div/>;
        const availableTranscribeHead = availableTranscribe.length > 0?
            (<h4 className="ListHead">{strings.transcribe}</h4>): <div/>;
        const availableReviewList = availableReview.map((t: ITask) => (
            <TaskItem
                id={t.id}
                name={t.name}
                selected={t.id === selectedTask}
                select={assignTask.bind(this,t.id, selectedUser)}/>
        ));
        const availableTranscribeList = availableTranscribe.map((t: ITask) => (
            <TaskItem
                id={t.id}
                name={t.name}
                selected={t.id === selectedTask}
                select={assignTask.bind(this,t.id, selectedUser)}/>
        ));
        const wrapper: JSX.Element = !pending && loaded? (
            <div>
                {assignedHead}
                {assignedReviewHead}
                {assignedReviewList}
                {assignedTranscribeHead}
                {assignedTranscribeList}
                {availableHead}
                {availableReviewHead}
                {availableReviewList}
                {availableTranscribeHead}
                {availableTranscribeList}
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
    assignedReview: ITask[];
    assignedTranscribe: ITask[];
    availableReview: ITask[];
    availableTranscribe: ITask[];
    loaded: boolean;
    pending: boolean;
    selectedUser: string;
    selectedTask: string;
    strings: ITranscriberStrings;
}

const mapStateToProps = (state: IState): IStateProps => ({
    assignedReview: taskList(state).assignedReview,
    assignedTranscribe: taskList(state).assignedTranscribe,
    availableReview: taskList(state).availableReview,
    availableTranscribe: taskList(state).availableTranscribe,
    loaded: state.tasks.loaded,
    pending: state.tasks.pending,
    selectedTask: state.tasks.selectedTask,
    selectedUser: state.users.selectedUser,
    strings: userStrings(state, {layout: "transcriber"}),
  });
  
  interface IDispatchProps {
    assignTask: typeof actions.assignTask;
    selectTask: typeof actions.selectTask;
    unassignTask: typeof actions.unAssignTask;
  };
  
  const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    ...bindActionCreators({
        assignTask: actions.assignTask,
        selectTask: actions.selectTask,
        unassignTask: actions.unAssignTask,
        }, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(TaskPanel);
  
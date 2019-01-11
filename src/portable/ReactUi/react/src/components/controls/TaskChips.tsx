import * as React from 'react';
import './TaskChips.sass';

interface IProps {
    text: string[];
};

class TaskChips extends React.Component<IProps, object> {
    public render() {
        const { text } = this.props;
        const chipsList = text.map((t: string) => (
            <div key={t} className="ChipsLabel">
                <label>{text}</label>
            </div>));
        return (
            <div className="TaskChips">
                {chipsList}
            </div>
        )
    }
};

export default TaskChips;

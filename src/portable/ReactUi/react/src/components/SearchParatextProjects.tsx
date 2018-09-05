import * as React from 'react';
import Ionicon from 'react-ionicons';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/paratextProjectActions';
import { IProjectSettingsStrings } from '../model/localize';
import { IState } from '../model/state';
import userStrings from '../selectors/localize';
import ButtonLink from './controls/ButtonLink'
import './SearchParatextProjects.sass';
import LabelCaptionUx from './ui-controls/LabelCaptionUx';


interface IProps extends IStateProps, IDispatchProps {
};


class SearchParatextProjects extends React.Component<IProps, object> {
    public componentDidMount() {
        const { fetchParatextProjects } = this.props;
        fetchParatextProjects();
    }    

    public render() {
        const { strings } = this.props;

        let wrapper;
        if(!this.props.loaded)
        {
            wrapper=(
                <div className="list">
                    <LabelCaptionUx name={strings.lookingForProjects} />
                    <span className="loadIconStyle">
                        <Ionicon icon="ios-refresh" fontSize="60px" color="#347eff" rotate={true} />
                    </span>
                    <div className="ButtonLink">
                        <ButtonLink text={strings.next.toUpperCase()} target="/NewOrBrowseParatextProjects" type="outline-light" />
                    </div>
                </div>)
        }
        const { loaded, paratextProjects } = this.props;        
        
        
        if (loaded) {
            if (paratextProjects.length === 0) {
                wrapper=(<Redirect to="/NewOrBrowseParatextProjects"/>)
                }
            else
            {
                const projects = paratextProjects.map((paratextProject:IParatextProject) =>
            <li className="list-item" key={paratextProject.id}>
                <div className="name">{paratextProject.name != null? paratextProject.name: paratextProject.id}</div>
                <div className="code">{paratextProject.langName != null? paratextProject.langName: paratextProject.lang}</div>
            </li>);

        wrapper = (
            
                <div className="list">
                    <div id="ParatextProject" className="label">{strings.selectProject}</div><ul>
            {projects}
                </ul><div className="ButtonLink">
                        <ButtonLink text={strings.next} target="/NewOrBrowseParatextProjects" type="outline-light" />
                    </div>
                </div>
             )

            }
        }        
        
        return(
            <div className="SearchParatextProjects">
            {wrapper}   
            </div>                
                          
        );
    }
}

interface IStateProps {
    loaded: boolean;
    paratextProjects: IParatextProject[];
    strings: IProjectSettingsStrings;
  };

  const mapStateToProps = (state: IState): IStateProps => ({
    loaded: state.paratextProjects.loaded,
    paratextProjects: state.paratextProjects.paratextProjects,
    strings: userStrings(state, { layout: "projectSettings" }),
  });

  interface IDispatchProps {
    
    fetchParatextProjects: typeof actions.fetchParatextProjects,
    selectParatextProject: typeof actions.selectParatextProject;
  };

  const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    ...bindActionCreators({        
        fetchParatextProjects: actions.fetchParatextProjects,
        selectParatextProject: actions.selectParatextProject,
        }, dispatch),
  });

export default connect(mapStateToProps, mapDispatchToProps)(SearchParatextProjects);
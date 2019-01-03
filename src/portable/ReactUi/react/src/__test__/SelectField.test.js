/* jshint esversion: 6 */
import React from 'react';
import expect from 'expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import SelectField from '../components/ui-controls/SelectField';

configure({ adapter: new Adapter() })

// Snapshot for SelectField
describe('>>>Control: SelectField --- Snapshot',()=>{
    const minProps = {
        id: "SelectField",
        caption: "Caption",
        options: ["OptionA", "OptionB", "OptionC"],
        selected: 1,
        message: "Error Message",
        direction: "ltr",
    };

    it('+++capturing Snapshot of SelectField', () => {
        const renderedValue =  renderer.create(<SelectField {...minProps}/>).toJSON()
        expect(renderedValue).toMatchSnapshot(1);
    });
});
//*******************************************************************************************************
describe('>>>Control: SelectField', () => {
    let wrapper;
    const minProps = {
        id: "SelectField",
        caption: "Caption",
        options: ["OptionA", "OptionB", "OptionC"],
        selected: 1,
        message: "Error Message",
        direction: "ltr",
    };

    beforeEach(() => {
        wrapper = shallow(<SelectField {...minProps} />);
    });

    it('+++ renders without exploding', () => {
        expect(wrapper.length).toEqual(1);
    });
});

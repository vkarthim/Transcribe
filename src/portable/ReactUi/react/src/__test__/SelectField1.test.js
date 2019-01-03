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
describe('>>>Control: SelectField1 --- Snapshot',()=>{
    const minProps = {
        id: "SelectField1",
        caption: "Caption",
        options: ["OptionA", "OptionB", "OptionC"],
        selected: 0,
        direction: "ltr",
    };

    it('+++capturing Snapshot of SelectField1', () => {
        const renderedValue =  renderer.create(<SelectField {...minProps}/>).toJSON()
        expect(renderedValue).toMatchSnapshot(1);
    });
});
//*******************************************************************************************************
describe('>>>Control: SelectField1', () => {
    let wrapper;
    const minProps = {
        id: "SelectField1",
        caption: "Caption",
        options: ["OptionA", "OptionB", "OptionC"],
        selected: 0,
        direction: "ltr",
    };

    beforeEach(() => {
        wrapper = shallow(<SelectField {...minProps} />);
    });

    it('+++ renders without exploding', () => {
        expect(wrapper.length).toEqual(1);
    });
});

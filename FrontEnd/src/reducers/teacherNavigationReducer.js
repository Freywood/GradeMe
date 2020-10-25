import { SWITCH_TO_CONTENT } from '../actions/teacherNavigationActions';
import {SUBJECT_OVERVIEW_IDENTIFIER } from '../components/teacher/TeacherTabs';

const DEFAULT_STATE = {activeContent: SUBJECT_OVERVIEW_IDENTIFIER}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case SWITCH_TO_CONTENT:
            return {...state, activeContent: action.newContentIdentifier};
        default:
            return state;
    }
}

import React, {useEffect, useState} from "react";
import {SERVER} from "../../../index";
import { connect } from "react-redux";
import useStyles from "../../styles/CourseOverviewStyle";
import Button from "@material-ui/core/Button";
import {setSubject, unselectCourse} from "../../actions/subjectSelectActions";
import {switchContent} from "../../actions/teacherNavigationActions";
import {COURSES_FOR_SUBJECT_IDENTIFIER} from "./TeacherTabs";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function SubjectOverview(props) {

    const classes = useStyles();
    const[subjectsOfTeacher, setSubjectsOfTeacher] = useState([]);
    const requestBody = JSON.stringify({
        userId: props.userId,
        request_token: props.request_token
    });

    function getSubjects(courses){
        let subjects = [];
        courses.reduce((e1, e2) => {e1.subjectName !== e2.subjectName && subjects.push({name: e2.subjectName, id: e2.subjectId}); return e2}, {subjectName: null});
        return subjects;
    }

    useEffect(()=>{
        props.unselectCourse();
        fetch(SERVER+"/api/course/getAll/forUser",
            {
                "method": "POST",
                "headers": {'Content-Type': 'application/json'},
                "body": requestBody
            }).then(response => response.json())
        .then(data => {
            setSubjectsOfTeacher(getSubjects(data));
        })
    }, [])

    function handleSubjectSelect(subjectId, subjectName) {
        function showSubject(){
            props.setSubject(subjectId, subjectName);
            props.switchContent(COURSES_FOR_SUBJECT_IDENTIFIER);
        }
        return showSubject;
    }

    const subjectPapers = subjectsOfTeacher.map((subject)=>
            <Button className={classes.text} key={subject.id} variant="outlined" onClick={handleSubjectSelect(subject.id, subject.name)}>
                {subject.name}
            </Button>
    )
    return(
        <div className={classes.root}>
            <Box p={4} bgcolor="background.paper" align="center">
                <Typography variant="h3" align="center" color="primary">
                    Fächerübersicht
                </Typography>
            </Box>
            <Box className={classes.mainContentBox}>
                {subjectPapers}
            </Box>

        </div>
    )
}

export default connect(
    (state)=>({
        state,
        userId: state.loginReducer.userId,
        request_token: state.loginReducer.request_token,
        content: state.teacherNavigationReducer.activeContent
    }),
    {setSubject, switchContent, unselectCourse})
(SubjectOverview);

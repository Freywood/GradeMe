import {connect} from "react-redux";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Paper} from "@material-ui/core";
import useStyles from "../../styles/CourseOverviewStyle";
import generalStyles from "../../styles/GeneralStyles";

function CourseOverview(props){
    const classes = useStyles();
    const generalStyle = generalStyles();
    return(
        <div>
            <Typography className={generalStyle.siteHeading}>
                Kursdetails für Kurs "{props.courseName}"
            </Typography>
            <Paper className={classes.paper}>
                <Typography variant="body1">
                    Fach: {props.courseSubjectName}
                </Typography>
            </Paper>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        courseId: state.courseNavigationReducer.courseId,
        courseName: state.courseNavigationReducer.courseName,
        courseSubjectName: state.courseNavigationReducer.courseSubjectName,
    }
}

export default connect(mapStateToProps, null)(CourseOverview)

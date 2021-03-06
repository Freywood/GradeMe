import React, {useEffect, useState} from 'react';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GradeIcon from '@material-ui/icons/Grade';
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import makeStyles from "@material-ui/core/styles/makeStyles";
import generalStyles from "../../../styles/GeneralStyles";
import {connect} from "react-redux";
import Box from "@material-ui/core/Box";
import {SERVER} from "../../../../index";
import Button from "@material-ui/core/Button";
import {setDetailsOfEditedTask, setIsTaskBeingEdited, SHOW_EVALUATE_TASK_PAGE, showEvaluateTaskPage, switchContent} from "../../../actions/teacherNavigationActions";
import { setErrorData } from "../../../actions/errorActions";
import Divider from '@material-ui/core/Divider';

export const EDIT_TASK = "EDIT_TASK";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    accordion_normal: {
      width: '100%',
    },
    accordion_red: {
      width: '100%',
      backgroundColor: '#FF6D6D',
    },
    accordion_yellow: {
      width: '100%',
      backgroundColor: '#FDFF9A',
    },
    accordionPrimaryHeading: {
        flexBasis: '40%',
    },
    accordionSecondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '15%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        width: '100%',
    },
    gradeButton: {
        backgroundColor: '#63a4ff',
        flexBasis: '15%'
    },
    gradeButtonPlaceholder: {
        backgroundColor: 'white',
        flexBasis: '15%'
    },
    editButton: {
      flexBasis: "15%",
      backgroundColor: '#63a4ff',
        marginLeft: '1%',
    },
    mainContentBox: {
        paddingRight: '5%',
        paddingLeft: '5%',
    },
    accordionHeaderFlexbox: {
        display: "flex",
        flexDirection: "row",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
        flexGrow: 1,
        alignSelf: "center",
        alignItems: "center",
    },
    accordionDetails: {
      display: "flex",
      flexDirection: "column",
    }
}));


function Taskoverview(props) {
    const classes = useStyles();
    const generalStyle = generalStyles();
    const[taskList, setTaskList] = useState([]);

    let requestBody = JSON.stringify({
        userId: props.userId,
        request_token: props.request_token
    });

    function handleEvaluateTaskClick(taskId, taskTitle){
        props.switchContent(SHOW_EVALUATE_TASK_PAGE);
        props.showEvaluateTaskPage(taskId, taskTitle);
    }

    function handleEditTaskClick(taskId, title, graded, deadline, description, courseId){
        props.switchContent(EDIT_TASK);
        props.setDetailsOfEditedTask(taskId, title, graded, deadline, description, courseId);
        props.setIsTaskBeeingEdited(true);
    }

    function getTasksForCourse(data){
        return data.filter((task)=>(task.courseId === props.courseId));
    }

  try {
    useEffect(() => {
      fetch(SERVER + "/api/task/getAll/forUser",
        {
          "method": "POST",
          "headers": { 'Content-Type': 'application/json' },
          "body": requestBody
        })
        .then(response => response.json())
        .then(data => props.forCourse ? setTaskList(getTasksForCourse(data)) : setTaskList(data))
    }, [props.forCourse])

    let currentTasksAccordionList= [];
    let pastTasksAccordionList = [];
    taskList.forEach((task) =>
      {
        let appropriateAccordionStyle;
        const currentDate = new Date();
        let  deadline = new Date(task.deadline);

        //berechnet den Unterschied in Tagen zwischen currentDate und deadline
        const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;
        const currentDateWithoutTime = new Date(currentDate.toDateString());
        const deadlineDateWithoutTime = new Date(deadline.toDateString());
        const diffInDays = (deadlineDateWithoutTime - currentDateWithoutTime) / MILLISECONDS_IN_A_DAY;

        if (props.role === "teacher" || diffInDays > 4 || diffInDays < 0) {
          appropriateAccordionStyle = classes.accordion_normal;
        } else if(diffInDays > 2) {
          appropriateAccordionStyle = classes.accordion_yellow;
        } else {
          appropriateAccordionStyle = classes.accordion_red;
        }

      //Der Anzeigemonat muss hier berechnet werden, da man dort, wo das Datum berechnet wird nicht einfach getMonth()+1 machen
      //kann, da ja dort ein String zusammengesetzt wird und dadurch einfach nur eine "1" angehangen wird
      const displayMonth = deadline.getMonth()+1;

      //Hier wird das Accordion zu dem entsprechenden Task gebaut um es später dem entsprechenden Array (PastTasks bzw. currentTasks) hinzuzufügen
      const accordionOfTask = (
        <Accordion key={task.taskId} className= { appropriateAccordionStyle }>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Box className={classes.accordionHeaderFlexbox}>
                    <Typography className={classes.accordionPrimaryHeading}>{task.title}</Typography>
                    <Typography className={classes.accordionSecondaryHeading}>{task.course}</Typography>
                    <Typography className={classes.accordionSecondaryHeading}>{diffInDays===0?"Heute":deadline.getDate() + "/" + displayMonth + "/" + deadline.getFullYear()}</Typography>
                    {props.role === "teacher" && task.graded?
                      <Button className={classes.gradeButton}
                        onClick={() => handleEvaluateTaskClick(task.taskId, task.title)}>
                        Bewerten
                      </Button>:
                      <Button className={classes.gradeButtonPlaceholder} disabled={true}>

                      </Button>}
                    {props.role === "teacher"?
                        <Button className={classes.editButton}
                                onClick={() => handleEditTaskClick(task.taskId, task.title, task.graded, task.deadline, task.description, task.course)}
                                marginTop={'100pt'}>
                            Bearbeiten
                        </Button>:null}
                    {props.role === "student" && task.graded?
                    <Tooltip title={"Diese Aufgabe wird benotet"}>
                      <GradeIcon/>
                    </Tooltip>: null
                  }
                </Box>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
                <Typography align={"left"}>
                    {task.description}
                </Typography>
            </AccordionDetails>
        </Accordion>
        )
        if(diffInDays >= 0){
          currentTasksAccordionList.push(accordionOfTask);
        } else {
          pastTasksAccordionList.push(accordionOfTask);
        }
      }
    )

    //Array wird reversed um die ältesten Aufgaben unten stehen zu lassen und die "aktuelleren" vergangenen Aufgaben weiter oben
    pastTasksAccordionList.reverse();
    return (
      <div>
        <Box p={ 4 } bgcolor="background.paper">
          <Typography className={generalStyle.siteHeading}>
            Aufgabenübersicht
          </Typography>
        </Box>
        <Box className={ classes.mainContentBox }>
          { currentTasksAccordionList }
          <Box paddingTop={ 3 }>
            <Divider />
          </Box>
          <Box p={ 2 } >
            <Typography className={generalStyle.siteSubHeading1}>
              Aufgabenarchiv
            </Typography>
          </Box>
          { pastTasksAccordionList }
        </Box>

      </div>
    )
  } catch (exception) {
      props.setErrorData("Beim Darstellen der Aufgabenübersicht ist ein Fehler aufgetreten. Möglicherweise konnte keine Verbindung zum Server aufgebaut werden");
      console.error("Errormessage: " + exception.message + "\nStacktrace:\n" + exception.stack);
      return null;
  }
}

const mapStateToProps = state => {
    return {
        userId: state.loginReducer.userId,
        request_token: state.loginReducer.request_token,
        role: state.loginReducer.role,
        courseId: state.courseNavigationReducer.courseId,
    }
}

export default connect (mapStateToProps, {showEvaluateTaskPage, switchContent, setErrorData, setDetailsOfEditedTask, setIsTaskBeeingEdited: setIsTaskBeingEdited})(Taskoverview)

import * as React from 'react';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxScheduler, { ISchedulerProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
import * as cors from 'cors';
const axios = require('axios');

class App extends React.PureComponent<{}, ISchedulerProps> {
    private myScheduler = React.createRef<JqxScheduler>();
    private myLog = React.createRef<HTMLDivElement>()

    constructor(props: {}) {
        super(props);
        this.mySchedulerOnAppointmentAdd = this.mySchedulerOnAppointmentAdd.bind(this);
        this.mySchedulerOnAppointmentChange = this.mySchedulerOnAppointmentChange.bind(this);
        this.mySchedulerOnAppointmentDelete = this.mySchedulerOnAppointmentDelete.bind(this);
        this.click = this.click.bind(this);
        //this.mySchedulerOnAppointmentAdd = this.mySchedulerOnAppointmentAdd.bind(this);
        //this.mySchedulerOnAppointmentDelete = this.mySchedulerOnAppointmentDelete.bind(this);
        //this.mySchedulerOnAppointmentChange = this.mySchedulerOnAppointmentChange.bind(this);
        //this.mySchedulerOnAppointmentDoubleClick = this.mySchedulerOnAppointmentDoubleClick.bind(this);
        //this.mySchedulerOnCellClick = this.mySchedulerOnCellClick.bind(this);
        const appointments = new Array();
        /*const appointment1 = {
            calendar: "My Calendar", // tem que criar
            description: "George brings projector for presentations.", //description
            end: new Date(2018, 10, 23, 16, 0, 0), // end
            id: "1", //id
            start: new Date(2018, 10, 23, 9, 0, 0),  //start
            subject: "Quarterly Project Review Meeting" // event
        };*/
        //appointments.push(appointment1);
        
        const source: any = {
            dataFields: [
                { name: 'id', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'subject', type: 'string' },
                { name: 'calendar', type: 'string' },
                { name: 'start', type: 'date' },
                { name: 'end', type: 'date' }
            ],
            dataType: "array",
            id: 'id',
            localData: appointments
        };
        const dataAdapter: any = new jqx.dataAdapter(source);
        this.state = {
            appointmentDataFields: {
                description: "description",
                from: "start",
                id: "id",
                resourceId: "calendar",
                subject: "subject",
                to: "end"
            },
            date: new jqx.date(2018, 11, 23),
            /**
             * called when the dialog is closed.
             * @param {Object} dialog - jqxWindow's jQuery object.
             * @param {Object} fields - Object with all widgets inside the dialog.
             * @param {Object} the selected appointment instance or NULL when the dialog is opened from cells selection.
             */
            editDialogClose: (dialog: any, fields: any, editAppointment: any) => {
                // editDialogClose callback
            },
            // called when the dialog is craeted.
            editDialogCreate: (dialog: any, fields: any, editAppointment: any) => {
                // hide repeat option
                fields.repeatContainer.hide();
                // hide status option
                fields.statusContainer.hide();
                // hide timeZone option
                fields.timeZoneContainer.hide();
                // hide color option
                fields.colorContainer.hide();
                fields.subjectLabel.html("Task");
                fields.locationLabel.hide();
                fields.locationContainer.hide();
                fields.fromLabel.html("Day");
                fields.toLabel.hide();
                fields.allDay.hide();
                fields.allDayLabel.hide();
                fields.toContainer.hide();
                //fields.resourceLabel.html("Calendar");
                fields.resourceLabel.hide();
                fields.resource.hide();
                //fields.daily.repeatDayInterval.hide();
                fields.repeatLabel.hide();
                fields.repeat.hide(); 


                // pode ter end, mas ele vai ser duplicado sempre, e não vai ser mostrado
            },
            /**
             * called when a key is pressed while the dialog is on focus. Returning true or false as a result disables the built-in keyDown handler.
             * @param {Object} dialog - jqxWindow's jQuery object.
             * @param {Object} fields - Object with all widgets inside the dialog.
             * @param {Object} editAppointment the selected appointment instance or NULL when the dialog is opened from cells selection.
             * @param {jQuery.Event Object} the keyDown event.
             */
            editDialogKeyDown: (dialog: any, fields: any, editAppointment: any, event: any) => {
                // editDialogKeyDown callback
                return false;
            },
            /**
             * called when the dialog is opened. Returning true as a result disables the built-in handler.
             * @param {Object} dialog - jqxWindow's jQuery object.
             * @param {Object} fields - Object with all widgets inside the dialog.
             * @param {Object} the selected appointment instance or NULL when the dialog is opened from cells selection.
             */
            height: 600,
            ready: () => {
                setTimeout(() => {
                    //this.myScheduler.current!.ensureAppointmentVisible("1");
                    this.myScheduler.current!.setAppointmentProperty('1', 'resizable', false);
                    this.myScheduler.current!.setAppointmentProperty('1', 'draggable', false);
                    this.myScheduler.current!.endAppointmentsUpdate();

                    //this.myScheduler.current!.beginAppointmentsUpdate();
                    // for no array usa os seguintes para cada id
                    // this.myScheduler.current!.setAppointmentProperty('id1', 'resizable', false);
                    // this.myScheduler.current!.setAppointmentProperty('id2', 'draggable', false);
                    // this.myScheduler.current!.endAppointmentsUpdate();
                });
            },
            resources: {
                colorScheme: "scheme05",
                dataField: "calendar",
                source: new jqx.dataAdapter(source)
            },
            source: dataAdapter,
            views: [
                'monthView'
            ]
        };
    }
    public render() {
        return (
            <div>
                <JqxScheduler ref={this.myScheduler}
                    // @ts-ignore
                    //width={getWidth('scheduler')}
                    onAppointmentDelete={this.mySchedulerOnAppointmentDelete}
                    onAppointmentAdd={this.mySchedulerOnAppointmentAdd}
                    //onAppointmentDoubleClick={this.mySchedulerOnAppointmentDoubleClick}
                    onAppointmentChange={this.mySchedulerOnAppointmentChange}
                    //onCellClick={this.mySchedulerOnCellClick}

                    height={this.state.height}
                    date={this.state.date}
                    source={this.state.source}
                    showLegend={true}
                    editDialogCreate={this.state.editDialogCreate}
                    editDialogOpen={this.state.editDialogOpen}
                    editDialogClose={this.state.editDialogClose}
                    editDialogKeyDown={this.state.editDialogKeyDown}
                    view={"monthView"}
                    appointmentDataFields={this.state.appointmentDataFields}
                    resources={this.state.resources}
                    views={this.state.views}
                    ready={this.state.ready}
                />
                <br />
                <div>Event Log:</div>
                <div ref={this.myLog} />

            </div>
        );
    }

    // Event handling
    private mySchedulerOnAppointmentAdd(event: any): void {
        const appointment = event.args.appointment;
        console.log(appointment);
        this.myLog.current!.innerHTML = 'appointmentAdd is raised';
        var start = appointment.originalData.start;
        start = start.getTime();

        console.log(start);

        axios.post('localhost:8080/task/save', {
            event: 'Projeto',
            description: 'Finalizando Projeto',
            status: false,
            start:start,
            end:start
          })
          .then(function (res : any) {
            console.log(res);
          })
          .catch(function (error : any) {
            console.log(error);
          });

    }
    private mySchedulerOnAppointmentChange(event: any): void {
        // const appointment = event.args.appointment;

        const appointment = event.args.appointment;
        let id = appointment.id;
        console.log(appointment);
        this.myLog.current!.innerHTML = 'appointmentAdd is raised';
        var start = appointment.originalData.start;
        start = start.getTime();

        console.log(start);

        axios.put('localhost:8080/task/'+ id, {
            event: 'Projeto',
            description: 'Finalizando Projeto',
            status: false,
            start:start,
            end:start
          })
          .then(function (res : any) {
            console.log(res);
          })
          .catch(function (error : any) {
            console.log(error);
          });

        this.myLog.current!.innerHTML = 'appointmentChange is raised';


    }
    private mySchedulerOnAppointmentDelete(event: any): void {
        const appointment = event.args.appointment;
        let id = appointment.id;

        axios.delete('localhost:8080/task/'+ id, {
          })
          .then(function (res : any) {
            console.log(res);
          })
          .catch(function (error : any) {
            console.log(error);
          });

        this.myLog.current!.innerHTML = 'appointmentDelete is raised';
    }
    
    private click(event: any): void {
        //console.log('teste');
        // this.myScheduler.current!.beginAppointmentsUpdate();
        // this.myScheduler.current!.setAppointmentProperty('id5', 'hidden', false);
        // this.myScheduler.current!.setAppointmentProperty('id6', 'hidden', false);
        // this.myScheduler.current!.endAppointmentsUpdate();
    }
}
export default App;
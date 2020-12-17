import * as React from 'react';
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxScheduler, { ISchedulerProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
class App extends React.PureComponent<{}, ISchedulerProps> {
    private myScheduler = React.createRef<JqxScheduler>();
    constructor(props: {}) {
        super(props);
        this.click = this.click.bind(this);
        const appointments = new Array();
        const appointment1 = {
            calendar: "My Calendar", // tem que criar
            description: "George brings projector for presentations.", //description
            end: new Date(2018, 10, 23, 16, 0, 0), // end
            id: "id1", //id
            location: "",
            start: new Date(2018, 10, 23, 9, 0, 0),  //start
            subject: "Quarterly Project Review Meeting" // event
        };
        appointments.push(appointment1);
        const source: any = {
            dataFields: [
                { name: 'id', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'location', type: 'string' },
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
                location: "location",
                resourceId: "calendar",
                subject: "subject",
                to: "end"
            },
            date: new jqx.date(2018, 11, 23),
            height: 600,
            ready: () => {
                setTimeout(() => {
                    this.myScheduler.current!.ensureAppointmentVisible("id1");
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
                    height={this.state.height}
                    date={this.state.date}
                    source={this.state.source}
                    showLegend={true}
                    view={"monthView"}
                    appointmentDataFields={this.state.appointmentDataFields}
                    resources={this.state.resources}
                    views={this.state.views}
                    ready={this.state.ready}
                />
                <br />
                <JqxButton onClick={this.click} width={200}>
                    Show Hidden Appointments
                </JqxButton>
            </div>
        );
    }
    // Event handling
    private click(event: any): void {
        console.log('teste');
        // this.myScheduler.current!.beginAppointmentsUpdate();
        // this.myScheduler.current!.setAppointmentProperty('id5', 'hidden', false);
        // this.myScheduler.current!.setAppointmentProperty('id6', 'hidden', false);
        // this.myScheduler.current!.endAppointmentsUpdate();
    }
}
export default App;
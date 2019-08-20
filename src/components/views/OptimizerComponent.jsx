import React, { Component } from "react";
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment'

class OptimizerComponent extends Component {
    render() {
        const groups = [
            {id: 1, title: 'Employee 1'}, 
            {id: 2, title: 'Employee 2'},
            {id: 3, title: 'Employee 3'},
            {id: 4, title: 'Employee 4'}
        ]

        const items = [
            {
              id: 1,
              group: 1,
              title: 'Stand By',
              start_time: moment(),
              end_time: moment().add(1, 'hour')
            },
            {
              id: 2,
              group: 2,
              title: 'Stand By',
              start_time: moment().add(-0.5, 'hour'),
              end_time: moment().add(0.5, 'hour')
            },
            {
              id: 3,
              group: 1,
              title: 'Promosi',
              start_time: moment().add(2, 'hour'),
              end_time: moment().add(3, 'hour')
            },
            {
                id: 4,
                group: 3,
                title: 'Follow Up',
                start_time: moment().add(2, 'hour'),
                end_time: moment().add(3, 'hour')
            },
            {
                id: 5,
                group: 4,
                title: 'Follow Up',
                start_time: moment().add(2, 'hour'),
                end_time: moment().add(3, 'hour')
            }
          ]

        return (
            <div className="container">
                <h3>Employee Scheduling</h3>
                <Timeline
                    groups={groups}
                    items={items}
                    defaultTimeStart={moment().add(-12, 'hour')}
                    defaultTimeEnd={moment().add(12, 'hour')}
                />
            </div>
        )
    }
}

export default OptimizerComponent
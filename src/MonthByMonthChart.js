import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import './chartConfig.js';
import {uploadToS3} from './upload.js';
import csvResults from './csv.js';


class MonthByMonthChart extends Component {
    static defaultProps = {
        options: {
            animation: false,
            layout: {
                padding: {
                    top: 20,
                }
            },
            cornerRadius: 5,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    display: false,
                }],
                xAxes: [{
                    display: false,
                }],
            },
            plugins: {
                datalabels: {
                    borderRadius: 4,
                    color: 'black',
                    font: {
                        weight: 'bold',
                        size: 20
                    },
                    // can use formatter to make any other adjustments to the label
                    formatter: function (value, context) {
                        return "$" + value;
                    },
                    padding: 6
                }
            }
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            month1Label: 'February',
            month1LastYearTemp: 46,
            month1CurrentYearTemp: 41,
            month2Label: 'March',
            month2LastYearTemp: 47,
            month2CurrentYearTemp: 45,
            month3Label: 'April',
            month3LastYearTemp: 55,
            month3CurrentYearTemp: 58,
            data: {
                labels: [1, 2, 3],
                datasets: [
                    {
                        label: "Last Year",
                        data: [11211, 12343, 10323],
                        backgroundColor: "#9FE0F8",
                        borderRadius: 5,
                        borderSkipped: false,
                        datalabels: {
                            align: 'end',
                            anchor: 'end'
                        }
                    },
                    {
                        label: "This Year",
                        data: [10211, 14341, 10321],
                        backgroundColor: "#093EDD",
                        borderRadius: 5,
                        borderSkipped: false,
                        datalabels: {
                            align: 'end',
                            anchor: 'end'
                        }
                    }
                ]
            }
        };
        this.chartRef = React.createRef();
    }


    /*
    This function will automatically run once this component is loaded
     */
    componentDidMount() {
        console.log(csvResults)
        // uploadToS3(this.chartRef.current, this.state.accountNumber);

        // this.interval = setInterval(() => dummyFunction(), 1000);
    }

    /*
    If you want to update the state, use the this.setState() function. Example below.
     */
    dummyFunction() {
        this.setState({
            accountNumber: "react123456789",
            month1Label: 'February',
            month1LastYearTemp: 46,
            month1CurrentYearTemp: 41,
            month2Label: 'March',
            month2LastYearTemp: 47,
            month2CurrentYearTemp: 45,
            month3Label: 'April',
            month3LastYearTemp: 55,
            month3CurrentYearTemp: 58,
            data: {
                labels: ["February", "March", "April"],
                datasets: [
                    {
                        label: "Last Year",
                        data: [1021, 1434, 1032],
                        backgroundColor: "#9FE0F8",
                        borderRadius: 5,
                        borderSkipped: false
                    },
                    {
                        label: "This Year",
                        data: [1021, 1434, 1032],
                        backgroundColor: "#093EDD",
                        borderRadius: 5,
                        borderSkipped: false

                    }
                ]
            }
        });
    }

    /*
    This function will get called whenever the MonthByMonth chart is updated.
     */
    componentDidUpdate() {
        // how to get chart and account Number
        uploadToS3(this.chartRef.current, this.state.accountNumber);
    }

    /*
    This function will automatically run once this component is unloaded
     */
    componentWillUnmount() {
        // clear data and stuff if you want
    }

    render () {
        const { month1Label, month1LastYearTemp, month1CurrentYearTemp,
            month2Label, month2LastYearTemp, month2CurrentYearTemp,
            month3Label, month3LastYearTemp, month3CurrentYearTemp, data} = this.state;
        return (
            <div id="month-by-month-chart" className="chart-container" ref={this.chartRef}>
                <div id="chart-label">My energy use comparison</div>
                <div className="top-line"></div>
                <div className="legend">
                    <div className="legend-label">
                        <div className="legend-dot last-year"></div>
                        Last Year
                    </div>
                    <div className="legend-label">
                        <div className="legend-dot this-year"></div>
                        This Year
                    </div>
                </div>

                <Bar data={data} options={this.props.options} />

                <div className="x-axis">
                    <div className="x-axis-label">
                        <div className="temperature">
                            {month1LastYearTemp}&#176; | {month1CurrentYearTemp}&#176;
                        </div>
                        <div className="month">
                            {month1Label}
                        </div>
                    </div>
                    <div className="x-axis-label">
                        <div className="temperature">
                            {month2LastYearTemp}&#176; | {month2CurrentYearTemp}&#176;
                        </div>
                        <div className="month">
                            {month2Label}
                        </div>
                    </div>
                    <div className="x-axis-label">
                        <div className="temperature">
                            {month3LastYearTemp}&#176; | {month3CurrentYearTemp}&#176;
                        </div>
                        <div className="month">
                            {month3Label}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MonthByMonthChart;
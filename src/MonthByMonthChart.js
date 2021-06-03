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
                    font: function(context) {
                        let year = context.dataset.label;
                        if (year === 'This Year') {
                            return {weight: 'bold', size: 20}
                        } else {
                            return {weight: 'normal',size: 20}
                        }
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
        // this.gen = this.getAccount(1, csvResults.data)
        this.gen = {};
        this.updateChart = this.updateChart.bind(this);
    }

    *getAccount(accountSize = 1, accountList) {
        let output = [];
        let index = 0;
    
        while (index < accountList.length) {
            output = [];
            for (let i = index; i < index + accountSize; i++) {
                if (accountList[i]) {
                    output.push(accountList[i]);
                }
            }
    
            yield output;
            index += accountSize;
        }
    }

    formatAccountFromCsv(row) {
        // make it look like state object
    }


    /*
    This function will automatically run once this component is loaded
     */
    componentDidMount() {
        // console.log(csvResults.data[0])
        // for (let account of csvResults.data) {
        //     console.log('in for/of iterator')
        //     console.log(account)
        // }
        this.gen = this.getAccount(1, csvResults.data)
        const firstAccount = this.gen.next()
        // console.log(firstAccount)

        this.setState({
            accountNumber: firstAccount.value[0]["Account Number"],
            month1Label: firstAccount.value[0]["Month_1"],
            month1LastYearTemp: firstAccount.value[0]["Last_year_avg_temp_1"],
            month1CurrentYearTemp: firstAccount.value[0]["This_year_avg_temp_1"],
            month2Label: firstAccount.value[0]["Month_2"],
            month2LastYearTemp: firstAccount.value[0]["Last_year_avg_temp_2"],
            month2CurrentYearTemp: firstAccount.value[0]["This_year_avg_temp_2"],
            month3Label: firstAccount.value[0]["Month_3"],
            month3LastYearTemp: firstAccount.value[0]["Last_year_avg_temp_3"],
            month3CurrentYearTemp: firstAccount.value[0]["This_year_avg_temp_3"],
            data: {
                labels: [1, 2, 3],
                datasets: [
                    {
                        label: "Last Year",
                        data: [firstAccount.value[0]["Last Year Cost($)_1"], firstAccount.value[0]["Last Year Cost($)_2"], firstAccount.value[0]["Last Year Cost($)_3"]],
                        backgroundColor: "#9FE0F8",
                        borderRadius: 5,
                        borderSkipped: false
                    },
                    {
                        label: "This Year",
                        data: [firstAccount.value[0]["This Year Cost($)_1"], firstAccount.value[0]["This Year Cost($)_2"], firstAccount.value[0]["This Year Cost($)_3"]],
                        backgroundColor: "#093EDD",
                        borderRadius: 5,
                        borderSkipped: false

                    }
                ]
            }

        })

    }



    /*
    This function will get called whenever the MonthByMonth chart is updated.
     */
    componentDidUpdate() {

        uploadToS3(this.chartRef.current, this.state.accountNumber).then(this.updateChart)
    }

    updateChart() {
        let chartData = this.gen.next()
        // console.log(this.gen)
        // console.log(chartData)

        if (!chartData.done) {
            this.setState({
                accountNumber: chartData.value[0]["Account Number"],
                month1Label: chartData.value[0]["Month_1"],
                month1LastYearTemp: chartData.value[0]["Last_year_avg_temp_1"],
                month1CurrentYearTemp: chartData.value[0]["This_year_avg_temp_1"],
                month2Label: chartData.value[0]["Month_2"],
                month2LastYearTemp: chartData.value[0]["Last_year_avg_temp_2"],
                month2CurrentYearTemp: chartData.value[0]["This_year_avg_temp_2"],
                month3Label: chartData.value[0]["Month_3"],
                month3LastYearTemp: chartData.value[0]["Last_year_avg_temp_3"],
                month3CurrentYearTemp: chartData.value[0]["This_year_avg_temp_3"],
                data: {
                    labels: [1, 2, 3],
                    datasets: [
                        {
                            label: "Last Year",
                            data: [chartData.value[0]["Last Year Cost($)_1"], chartData.value[0]["Last Year Cost($)_2"], chartData.value[0]["Last Year Cost($)_3"]],
                            backgroundColor: "#9FE0F8",
                            borderRadius: 5,
                            borderSkipped: false
                        },
                        {
                            label: "This Year",
                            data: [chartData.value[0]["This Year Cost($)_1"], chartData.value[0]["This Year Cost($)_2"], chartData.value[0]["This Year Cost($)_3"]],
                            backgroundColor: "#093EDD",
                            borderRadius: 5,
                            borderSkipped: false
    
                        }
                    ]
                }
            })
        }
    }


    /*
    This function will automatically run once this component is unloaded
     */
    componentWillUnmount() {
        // clear data and stuff if you want
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
    };


    render () {
        const { month1Label, month1LastYearTemp, month1CurrentYearTemp,
            month2Label, month2LastYearTemp, month2CurrentYearTemp,
            month3Label, month3LastYearTemp, month3CurrentYearTemp, data} = this.state;
        return (
            <div id="month-by-month-chart" className="chart-container" ref={this.chartRef}>
                <div className="chart-label">My energy use comparison</div>
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
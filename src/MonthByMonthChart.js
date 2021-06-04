import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import './chartConfig.js';
import { uploadToS3 } from './upload.js';
import csvResults from './csv.js';


class MonthByMonthChart extends Component {
    static defaultProps = {
        options: {
            animation: false,
            layout: {
                padding: {
                    top: 32,
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
                    font: function (context) {
                        let year = context.dataset.label;
                        if (year === 'This Year') {
                            return { weight: 'bold', size: 20 }
                        } else {
                            return { weight: 'normal', size: 20 }
                        }
                    },
                    // can use formatter to make any other adjustments to the label
                    formatter: function (value, context) {
                        return "$" + parseInt(value, 10).toLocaleString();
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
        const rowValue = row.value[0]

        return {
            accountNumber: rowValue["Account Number"],
            month1Label: rowValue["Month_1"],
            month1LastYearTemp: rowValue["Last_year_avg_temp_1"],
            month1CurrentYearTemp: rowValue["This_year_avg_temp_1"],
            month2Label: rowValue["Month_2"],
            month2LastYearTemp: rowValue["Last_year_avg_temp_2"],
            month2CurrentYearTemp: rowValue["This_year_avg_temp_2"],
            month3Label: rowValue["Month_3"],
            month3LastYearTemp: rowValue["Last_year_avg_temp_3"],
            month3CurrentYearTemp: rowValue["This_year_avg_temp_3"],
            data: {
                labels: [1, 2, 3],
                datasets: [
                    {
                        label: "Last Year",
                        data: [rowValue["Last Year Cost($)_1"], rowValue["Last Year Cost($)_2"], rowValue["Last Year Cost($)_3"]],
                        backgroundColor: "#9FE0F8",
                        borderRadius: 5,
                        borderSkipped: false
                    },
                    {
                        label: "This Year",
                        data: [rowValue["This Year Cost($)_1"], rowValue["This Year Cost($)_2"], rowValue["This Year Cost($)_3"]],
                        backgroundColor: "#093EDD",
                        borderRadius: 5,
                        borderSkipped: false

                    }
                ]
            }
        }
    }

    componentDidMount() {
        this.gen = this.getAccount(1, csvResults.data)
        const firstAccount = this.gen.next()

        this.setState(this.formatAccountFromCsv(firstAccount))
    }

    componentDidUpdate() {
        uploadToS3(this.chartRef.current, this.state.accountNumber).then(this.updateChart)
    }

    updateChart() {
        let chartData = this.gen.next()

        if (!chartData.done) {
            this.setState(this.formatAccountFromCsv(chartData))
        }
    }

    render() {
        const { month1Label, month1LastYearTemp, month1CurrentYearTemp,
            month2Label, month2LastYearTemp, month2CurrentYearTemp,
            month3Label, month3LastYearTemp, month3CurrentYearTemp, data } = this.state;
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
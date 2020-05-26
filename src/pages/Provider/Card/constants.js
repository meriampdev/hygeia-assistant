export const chartOptions = (maxValue, props) => {
  return { 
    maintainAspectRatio: false,
    legend: { display: false },
    scales: {
      xAxes: [{
        barThickness: 80,
        barPercentage : 1,
        categoryPercentage : 1,
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false,
          max: maxValue + 30,
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        display: function(context) {
          let value = context.dataset.data[context.dataIndex]
          return value !== 0
        },
        font: {
          size: '16',
          weight: 'bold'
        },
        color: function(context) {
          return props.dataColors[context.dataIndex]
        }
      }
    }
  }
}
import React from 'react'
import './card.scss'
import 'chartjs-plugin-datalabels'
import { Bar } from 'react-chartjs-2'
import { chartOptions } from './constants'

export default function Card(props) {
  const data = {
    labels: props.dataLabels,
    datasets: [{
      label: '',
      data: props.dataValues,
      backgroundColor: props.dataColors,
      borderColor: props.dataColors,
      borderWidth: 1
    }]
  }

  let percentage = (parseInt(props.percentageData) / parseInt(props.employeeCount)) * 100
  let maxValue = Math.max.apply(Math, props.dataValues)
  return (
    <div className='card'>
      <Bar
        height={300}
        data={data}
        options={chartOptions(maxValue, props)}
      />
      <div className={`percentage ${props.percentageClass}`}>
        <span className='percentage-label'>{props.percentageLabel}</span>
        <span>{`${percentage.toFixed(2)} %`}</span>
      </div>
    </div>
  )
}
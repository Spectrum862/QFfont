import {Line, Bar} from "react-chartjs-2"
import React, { useState,useEffect } from 'react'
import theme from '../../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { CircularProgress, } from '@material-ui/core/'
import pattern from 'patternomaly'

const testdata =  {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        data:[10,20,30,20,50,60],
        backgroundColor: [             
            pattern.draw('square', '#ff6384'),
            pattern.draw('circle', '#36a2eb'),
            pattern.draw('diamond', '#cc65fe'),
            pattern.draw('triangle', '#ffce56'),
            pattern.draw('weave', '#cc85fe'),
            pattern.draw('zigzag', '#77ce56')
        ]
    }]
}

export default function Chart(props){
    const [type,setType] = useState(null)
    const [data,setData] = useState(testdata)
  


    

    return (
        <div>
            <Bar data={testdata}/>
        </div>
    )
}



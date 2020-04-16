import {Line, Bar} from "react-chartjs-2"
import React, { useState,useEffect } from 'react'
import theme from '../../theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { CircularProgress, } from '@material-ui/core/'
import pattern from 'patternomaly'




export default function Chart(props){
    const [type,setType] = useState(null)
    const [data,setData] = useState(props.data)
  



    
    

    return (
        <div>
            <Bar data={data}/>
        </div>
    )
}



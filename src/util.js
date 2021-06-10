import React from "react";
import Tables from "./Tables";
import numeral from "numeral";
import {Circle, Popup} from "react-leaflet";

const casesTypeColors={
    cases:{
        hex: "#CC1034",
        rgb:"rgb(204,16,52)",
        half_op:"rgba(204,16,52,0.5)",
        multiplier:270,
    },
    recovered:{
        hex:"#7dd71d",
        rgb:"rgb(125,215,29)",
        half_op:"rgba(125,215,29,0.5)",
        multiplier:400,
    },
    deaths:{
        hex:"#fb4443",
        rgb:"rgb(251,68,67)",
        half_op:"rgba(251,68,67,0.5)",
        multiplier:600,
    },
};

export const sortData= (data) =>{
    const sortedData=[...data];

    sortedData.sort((a,b)=>{
        if(a.cases>b.cases)
        {
            return -1; //false
        }else{
            return 1; //true
        }
    })
    return sortedData;

};
//DRAW circles on the map woth interactive tool tips
export const showDataOnMap = (data, casesType='cases')=> (
    data.map(country=>(
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <h1>I'm a Popup</h1>
            </Popup>
        </Circle>
        
    ))
);
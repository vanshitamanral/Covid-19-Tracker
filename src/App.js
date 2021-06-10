import React, { useEffect, useState } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Typography,
  Table,
} from "@material-ui/core";
import InfoBox from './InfoBox.js';
import './App.css';
import Map from './Map';
import Tables from './Tables.js';
import { prettyPrintStat, sortData } from './util.js';

import "leaflet/dist/leaflet.css";

function App() {
  const[countries, setCountries] = useState([]);
  const [country,setCountry]=useState('worldwide');
  const [countryInfo, setCountryInfo]=useState({});
  const [tableData, setTableData]=useState([]);
  const [mapCenter, setMapCenter]=
  useState({lat:34.80746, lng:-40.4796});
  const [mapZoom, setMapZoom]= useState(3);
  const[mapCountries, setMapCountries]=useState([]);
  const [casesType,setCasesType]=useState("cases");

 //console.log(casesType);

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data)=>{
      setCountryInfo(data);
    });
  },[]);
  //STATE=> How to write a variable in REACT

  //https://disease.sh/v3/covid-19/countries

  //USEEFFECT = runs a piece of code based on given condition

  useEffect(()=>{
    //The code inside here will run once
    //when the component loads and not again
    //async-> send a request, wait for it, do something with it
    const getCountriesData=async()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response)=>response.json())
      .then((data)=>{
        const countries = data.map((c)=>(
        {
          name: c.country,
          value: c.countryInfo.iso2,
        }));
        const sortedData=sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      });
    };
    getCountriesData();
  },[countries]);

  const onCountryChange= async (event)=>{
    const countrycode= event.target.value;
    //console.log(countrycode);
    setCountry(countrycode);

    const url = countrycode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countrycode}`;
    await fetch(url).then((response)=>response.json()).then((data)=>{
      setCountry(countrycode);
      setCountryInfo(data);

      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
  };
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              {/* Loop through all the countries and show a 
              drop down list of the options */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country=>(
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            
            onClick={(e)=>setCasesType("cases")}
            title="CoronaVirus Cases"
            cases={prettyPrintStat(countryInfo.cases)} 
            total={prettyPrintStat(countryInfo.cases)} 
          />

          <InfoBox 
            onClick={(e)=>setCasesType("recovered")}
            title="Recovered" 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)} 
          />
            
          <InfoBox 
            
            onClick={(e)=>setCasesType("deaths")}
            title="Deaths" 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)} 
          />

        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />

      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Tables countries={tableData}/>
          <Card>
            <CardContent>
              <Typography color="textSecondary">Active Cases</Typography>
              <h3 style={{color:"#cc1034"}}>{prettyPrintStat(countryInfo.active)}</h3>
              <Typography color="textSecondary">Critical </Typography>
              <h3 style={{color:"#cc1034"}}>{prettyPrintStat(countryInfo.critical)}</h3>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    marginTop: "150px",
    border: "1px solid #27231F",
    backgroundColor: "#27231F",
    borderRadius: "10px",
  },
  item: {
    border: "1px solid #2E2E2E",
    backgroundColor: "#2E2E2E",
    borderRadius: "10px",
    color: "#B175FF",
    margin: "40px",
    padding: "40px",
    fontSize: "26px",
  },
  typography: {
    fontSize: "30px",
    color: "#B175FF",
    fontWeight: "bold",
  },
  title:{
    color:'white',
    marginTop:'50px'
  }
});

const DATA_URL =
  'https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","areaName":"areaName","areaCode":"areaCode","newCasesByPublishDate":"newCasesByPublishDate","cumCasesByPublishDate":"cumCasesByPublishDate","newDeathsByDeathDate":"newDeathsByDeathDate","cumDeathsByDeathDate":"cumDeathsByDeathDate"}';

function App() {
  const [loaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch(DATA_URL)
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setIsLoaded(true);
      });
  });

  if (!loaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <Typography variant="h4" className={classes.title}>
          Covid New Cases
        </Typography>
        <Typography variant="h4" className={classes.title}>
          England Region
        </Typography>
        {data.map((data, index) => {
          if (index === 0) {
            return (
              <Grid
                key={data}
                container
                justify="center"
                className={classes.container}
              >
                <Grid item className={classes.item} sm={3}>
                  <Typography className={classes.typography}>Date</Typography>
                  {data?.date}
                </Grid>
                <Grid item className={classes.item} sm={3}>
                  <Typography className={classes.typography}>Cases</Typography>
                  {data?.newCasesByPublishDate}
                </Grid>
                <Grid item className={classes.item} sm={3}>
                <Typography className={classes.typography}>Deaths</Typography>
                  {data?.newDeathsByDeathDate === null ? '0' : data?.newDeathsByDeathDate}
                </Grid>
              </Grid>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

export default App;

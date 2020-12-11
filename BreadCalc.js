import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import "./styles.css";

class App extends React.Component {
  render() {
    return (
      <Box bac="red" className="App" margin={5}>
        <Typography style={{ padding: 50 }} variant="h2">
          Sourdough Bread Calculator
        </Typography>
        <Grid container direction="row" spacing={3}>
          <Grid item>
            <Box
              padding={3}
              style={{
                border: "solid",
                height: "100%",
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 5,
                background: "white"
              }}
            >
              <Typography variant="h5" component="h1">
                Ingredients:
              </Typography>

              <FormControl variant="outlined" display="block">
                <TextField
                  label="Dough Weight"
                  placeholder="Dough weight in grams"
                />
                <TextField
                  label="Hydration"
                  placeholder="Hydration percentage"
                />
                <TextField label="Starter" placeholder="Starter percentage" />
                <TextField
                  label="Starter hydration"
                  placeholder="Starter hydration percentage"
                />
                <TextField label="Salt" placeholder="Salt percentage" />
              </FormControl>
            </Box>
          </Grid>
          <Grid item>
            <Box
              padding={5}
              style={{
                border: "solid",
                borderWidth: 1,
                height: "100%",
                borderColor: "black",
                borderRadius: 5,
                background: "white"
              }}
            >
              <Typography
                style={{ paddingBottom: 20 }}
                variant="h5"
                component="h1"
              >
                Totals:
              </Typography>

              <Typography variant="h6" display="inline">
                Flour:{" "}
              </Typography>
              <Typography variant="h6" display="inline" id="result_flour">
                0g
              </Typography>
              <br />
              <Typography variant="h6" display="inline">
                Water:{" "}
              </Typography>
              <Typography variant="h6" display="inline" id="result_water">
                0g
              </Typography>
              <br />
              <Typography variant="h6" display="inline">
                Starter:{" "}
              </Typography>
              <Typography variant="h6" display="inline" id="result_starter">
                0g{" "}
              </Typography>
              <br />
              <Typography variant="h6" display="inline">
                Salt:{" "}
              </Typography>
              <Typography variant="h6" display="inline" id="result_salt">
                0g
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default App;

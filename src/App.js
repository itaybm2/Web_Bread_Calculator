import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./styles.css";

const font = "'Assistant', 'sans-serif'";
const mytheme = createMuiTheme({
  palette: {
    background: {
      default: "#f2f4f3"
    }
  },
  typography: { fontFamily: font }
});
class App extends React.Component {
  constructor(props) {
    super(props);
    this.base = {
      labels: {
        checked: false,
        dough_weight_label: "Dough Weight",
        dough_weight_placeholder: "Dough weight in grams"
      },
      fields: {
        dough_weight: "",
        hydration: "",
        starter: "",
        starter_hydration: "",
        salt: ""
      },
      errors: {}
    };
    this.state = {
      labels: {
        checked: false,
        dough_weight_label: "Dough Weight",
        dough_weight_placeholder: "Dough weight in grams"
      },
      fields: {
        dough_weight: "",
        hydration: "",
        starter: "",
        starter_hydration: "",
        salt: ""
      },
      errors: {}
    };
    this.baseState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  calculateIngredients(amounts) {
    var starterWaterPer = amounts.starter / (1 + 1 / amounts.starter_hydration);
    var starterSolidPer = amounts.starter - starterWaterPer;
    var waterPer =
      amounts.hydration * (1 + amounts.salt + starterSolidPer) -
      starterWaterPer;
    var flour = 0;
    if (this.state.labels.checked === false) {
      flour =
        amounts.dough_weight / (1 + waterPer + amounts.starter + amounts.salt);
    } else {
      flour = amounts.dough_weight;
    }
    var starter = amounts.starter * flour;
    var salt = amounts.salt * flour;
    var water = waterPer * flour;
    document.getElementById("result_flour").innerHTML = parseInt(flour) + "g";
    document.getElementById("result_water").innerHTML = parseInt(water) + "g";
    document.getElementById("result_starter").innerHTML =
      parseInt(starter) + "g";
    document.getElementById("result_salt").innerHTML = parseInt(salt) + "g";
  }
  handleEnter(next, event) {
    if (event.keyCode === 13) {
      document.getElementById(next).focus();
    }
  }
  between(x, min, max) {
    return x >= min && x <= max;
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = this.state.errors;
    let formIsValid = true;
    for (var key in fields) {
      if (!fields[key]) {
        formIsValid = false;
        errors[key] = "Cannot be empty";
      }

      if (isNaN(fields[key])) {
        formIsValid = false;
        if (key === "dough_weight") {
          errors[key] = "Field must be a positive number";
        } else {
          errors[key] = "Field must be a number in range [1,100]";
        }
      } else {
        if (key === "dough_weight" && fields[key] < 0) {
          formIsValid = false;
          errors[key] = "Field must be a positive number";
        } else if (
          key !== "dough_weight" &&
          !this.between(fields[key], 0, 100)
        ) {
          formIsValid = false;
          errors[key] = "Field must be in range [1,100]";
        } else {
          errors[key] = "";
        }
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  }
  handleSwitch() {
    let labels = this.state.labels;
    labels.checked = !this.state.labels.checked;
    this.changeLabels();
    this.setState({
      fields: {
        dough_weight: "",
        hydration: "",
        starter: "",
        starter_hydration: "",
        salt: ""
      }
    });
  }
  changeLabels() {
    document.getElementById("result_flour").innerHTML = "0g";
    document.getElementById("result_starter").innerHTML = "0g";
    document.getElementById("result_salt").innerHTML = "0g";
    document.getElementById("result_water").innerHTML = "0g";
    let labels = this.state.labels;
    if (this.state.labels.checked) {
      labels.dough_weight_label = "Flour Weight";
      labels.dough_weight_placeholder = "Flour weight in grams";
    } else {
      labels.dough_weight_label = "Dough Weight";
      labels.dough_weight_placeholder = "Dough weight in grams";
    }
    this.setState({
      labels
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    let errors = this.state.errors;
    if (this.handleValidation()) {
      var dict = {
        dough_weight: this.state.fields.dough_weight,
        starter: parseFloat(this.state.fields.starter) / 100,
        hydration: parseFloat(this.state.fields.hydration) / 100,
        starter_hydration:
          parseFloat(this.state.fields.starter_hydration) / 100,
        salt: parseFloat(this.state.fields.salt) / 100
      };
      this.calculateIngredients(dict);
      this.setState({ errors: {} });
    } else {
      this.setState({ errors });
    }
  }
  clearAll(event) {
    event.preventDefault();
    document.getElementById("result_flour").innerHTML = "0g";
    document.getElementById("result_starter").innerHTML = "0g";
    document.getElementById("result_salt").innerHTML = "0g";
    document.getElementById("result_water").innerHTML = "0g";
    this.setState({
      fields: {
        dough_weight: "",
        hydration: "",
        starter: "",
        starter_hydration: "",
        salt: ""
      },
      errors: {}
    });
  }
  handleChange(field, event) {
    let fields = this.state.fields;
    fields[field] = event.target.value;
    // const value = target.value;
    // const name = target.name;
    this.setState({
      fields
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={mytheme}>
        <CssBaseline />
        <Box className="App">
          <Box margin justifyContent="right">
            <Grid container justify="space-evenly" direction="row" spacing={8}>
              <Grid item container xs={12} justify="center">
                <Grid item lg={1} xs={4}>
                  <a href="https://www.freepik.com/free-vector/vintage-agriculture-elements-set-with-wheat-ears-wreathes-hay-flour-bread-pasta-windmill-combine-harvester-isolated_10055215.htm">
                    <Box align="center">
                      <CardMedia
                        image={require("./3.png")}
                        style={{
                          width: "100%"
                        }}
                        component="img"
                      ></CardMedia>
                    </Box>
                  </a>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    display="block"
                    style={{ padding: 3 }}
                    variant="h3"
                    component="h4"
                  >
                    Sourdough Bread Calculator
                  </Typography>
                  <Typography display="block" align="center" variant="h5">
                    Just your friendly neighborhood recipe builder
                  </Typography>
                </Grid>
              </Grid>
              <Grid item lg={3} sm={8} xs={12}>
                <Box
                  padding={2}
                  style={{
                    backgroundColor: "#fffbff",
                    border: "solid",
                    borderWidth: 1,
                    borderColor: "black",
                    height: "100%",
                    borderRadius: 6,
                    background: "white"
                  }}
                >
                  <Box align="center">
                    <Typography variant="h4" component="h1">
                      Ingredients
                    </Typography>
                  </Box>
                  <FormControl
                    onSubmit={this.handleSubmit}
                    variant="outlined"
                    display="block"
                  >
                    <TextField
                      label={this.state.labels.dough_weight_label}
                      name="dough_weight"
                      id="dough_weight"
                      value={this.state.fields.dough_weight}
                      error={this.state.errors.dough_weight}
                      helperText={
                        this.state.errors.dough_weight
                          ? this.state.errors.dough_weight
                          : ""
                      }
                      onKeyDown={this.handleEnter.bind(this, "hydration")}
                      onChange={this.handleChange.bind(this, "dough_weight")}
                      placeholder={this.state.fields.dough_weight_placeholder}
                    />
                    <TextField
                      label="Hydration"
                      name="hydration"
                      id="hydration"
                      error={this.state.errors.hydration}
                      helperText={
                        this.state.errors.hydration
                          ? this.state.errors.hydration
                          : ""
                      }
                      value={this.state.fields.hydration}
                      onKeyDown={this.handleEnter.bind(this, "starter")}
                      onChange={this.handleChange.bind(this, "hydration")}
                      placeholder="Hydration percentage"
                    />
                    <TextField
                      name="starter"
                      id="starter"
                      label="Starter"
                      placeholder="Starter percentage"
                      error={this.state.errors.starter}
                      helperText={
                        this.state.errors.starter
                          ? this.state.errors.starter
                          : ""
                      }
                      value={this.state.fields.starter}
                      onKeyDown={this.handleEnter.bind(
                        this,
                        "starter_hydration"
                      )}
                      onChange={this.handleChange.bind(this, "starter")}
                    />
                    <TextField
                      label="Starter hydration"
                      name="starter_hydration"
                      id="starter_hydration"
                      placeholder="Starter Hydration percentage"
                      error={this.state.errors.starter_hydration}
                      helperText={
                        this.state.errors.starter_hydration
                          ? this.state.errors.starter_hydration
                          : ""
                      }
                      value={this.state.fields.starter_hydration}
                      onKeyDown={this.handleEnter.bind(this, "salt")}
                      onChange={this.handleChange.bind(
                        this,
                        "starter_hydration"
                      )}
                    />
                    <TextField
                      label="Salt"
                      id="salt"
                      placeholder="Salt Percentage"
                      error={this.state.errors.salt}
                      helperText={
                        this.state.errors.salt ? "Cannot be empty" : ""
                      }
                      value={this.state.fields.salt}
                      onChange={this.handleChange.bind(this, "salt")}
                    />
                    <Box marginTop={2}>
                      <Grid
                        component="label"
                        container
                        alignItems="center"
                        spacing={1}
                      >
                        <Grid item>Dough Weight</Grid>
                        <Grid item>
                          <Switch
                            checked={this.state.labels.checked}
                            onChange={this.handleSwitch}
                            color="primary"
                            name="checked"
                          />
                        </Grid>
                        <Grid item>Flour Weight</Grid>
                      </Grid>
                    </Box>
                  </FormControl>
                  <Box marginTop={3}>
                    <Button
                      disableElevation
                      variant="outlined"
                      type="submit"
                      value="Submit"
                      onClick={this.handleSubmit}
                      style={{ marginRight: 40 }}
                      color="primary"
                    >
                      Calculate
                    </Button>
                    <Button
                      onClick={this.clearAll}
                      variant="outlined"
                      color="primary"
                    >
                      Clear
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={3} sm={8} xs={12}>
                <Box
                  padding={2}
                  style={{
                    backgroundColor: "#FAF9FB",
                    border: "solid",
                    borderWidth: 1,
                    height: "100%",
                    borderColor: "black",
                    borderRadius: 6,
                    background: "white"
                  }}
                >
                  <Grid
                    container
                    justify="center"
                    spacing={4}
                    alignItems="center"
                  >
                    <Grid item xs={8} align="center">
                      <Typography
                        style={{ marginBottom: 20 }}
                        variant="h4"
                        component="h1"
                      >
                        Totals
                      </Typography>
                      <Typography variant="h6" display="inline">
                        Flour:{" "}
                      </Typography>
                      <Typography
                        variant="h6"
                        display="inline"
                        id="result_flour"
                      >
                        0g
                      </Typography>
                      <br />
                      <br />
                      <Typography variant="h6" display="inline">
                        Water:{" "}
                      </Typography>
                      <Typography
                        variant="h6"
                        display="inline"
                        id="result_water"
                      >
                        0g
                      </Typography>
                      <br />
                      <br />
                      <Typography variant="h6" display="inline">
                        Starter:{" "}
                      </Typography>
                      <Typography
                        variant="h6"
                        display="inline"
                        id="result_starter"
                      >
                        0g{" "}
                      </Typography>
                      <br />
                      <br />{" "}
                      <Typography variant="h6" display="inline">
                        Salt:{" "}
                      </Typography>
                      <Typography
                        variant="h6"
                        display="inline"
                        id="result_salt"
                      >
                        0g
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Box>
                        <a href="https://www.freepik.com/free-vector/vintage-agriculture-elements-set-with-wheat-ears-wreathes-hay-flour-bread-pasta-windmill-combine-harvester-isolated_10055215.htm">
                          <CardMedia
                            image={require("./4.png")}
                            style={{
                              width: "100%"
                            }}
                            component="img"
                          ></CardMedia>
                        </a>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </MuiThemeProvider>
    );
  }
}

export default App;

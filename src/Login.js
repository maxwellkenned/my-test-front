import React, {Component} from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import UploadScreen from './UploadScreen';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            senha: ''
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Login"/>
                        <TextField
                            hintText="Digite seu login"
                            floatingLabelText="Login"
                            onChange={(event, newValue) => this.setState({login: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Digite sua senha"
                            floatingLabelText="Senha"
                            onChange={(event, newValue) => this.setState({senha: newValue})}
                        />
                        <br/>
                        <Button variant="contained" label="Entrar" primary={true} style={style}
                                      onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event) {
        var apiBaseUrl = 'http://localhost:8000/api/';
        var self = this;
        var payload = {
            'login': this.state.login,
            'senha': this.state.senha
        };

        axios.post(apiBaseUrl + 'login', payload)
            .then(function (response) {
                    console.log(response);

                    if (response.data.code === 200) {
                        console.log("Logado com sucesso!");
                        var uploadScreen = [];
                        uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>);
                        self.props.appContext.setState({loginPage: [], uploadScreen: uploadScreen});
                    } else if (response.data.code === 204) {
                        console.log("Username password do not match");
                        alert("username password do not match")
                    } else {
                        console.log("Username does not exists");
                        alert("Username does not exist");
                    }
                }
            )
            .catch(function (error) {
                    console.log(error);
                }
            );
    }
}

const style = {
    margin: 15,
};

export default Login;
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            login: '',
            email: '',
            senha: '',
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar>
                            <Toolbar>
                                <Typography variant="h6">Cadastro</Typography>
                            </Toolbar>
                        </AppBar>
                        <TextField
                            hintText="Digite seu nome"
                            floatingLabelText="Nome"
                            onChange={(event, newValue) => this.setState({nome: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Digite seu login"
                            floatingLabelText="Login"
                            onChange={(event, newValue) => this.setState({login: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Digite seu Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({email: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Digite sua senha"
                            floatingLabelText="Senha"
                            onChange={(event, newValue) => this.setState({senha: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Cadastrar" primary={true} style={style}
                                      onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event) {
        var apiBaseUrl = "http://localhost:8000/api/";
        console.log("values", this.state.nome, this.state.login, this.state.email, this.state.senha);

        var self = this;
        var payload = {
            "nome": this.state.nome,
            "login": this.state.login,
            "email": this.state.email,
            "senha": this.state.senha
        };

        axios.post(apiBaseUrl + 'usuario/criarconta', payload)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    console.log(response);
                    var loginscreen = [];
                    loginscreen.push(<Login parentContext={this}/>);
                    var loginmessage = "Not Registered yet.Go to registration";
                    self.props.parentContext.setState({
                        loginscreen: loginscreen,
                        loginmessage: loginmessage,
                        buttonLabel: "Register",
                        isLogin: true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

const style = {
    margin: 15,
};
export default Register;
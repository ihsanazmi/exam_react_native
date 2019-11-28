import React, { Component } from 'react';
import { View, AsyncStorage}  from 'react-native';
import {Text, Input ,Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Axios from 'axios';
import { urlApi } from '../supports/url';
import { connect } from 'react-redux'
import { onRegisterSuccess } from './../redux/actions/users'
import { StackActions,NavigationActions } from 'react-navigation';

class login extends Component {
    state={
        look : true,
        username : '',
        password  : '',
        loading_btn : false
    }

    onBtnLoginClick = () => {
        this.setState({loading_btn:true})
        const {username,password} = this.state
        if(username&&password){
            Axios.post(urlApi + 'auth/login',{username,password})
            .then((res) => {
                if(res.data.error){
                    return alert(res.data.message)
                }
                var data_login = res.data.data[0]
                var {username,email,id, foto_profile} = data_login
                AsyncStorage.setItem('data',JSON.stringify({username,email,id,foto_profile}),(err)=>{
                    if(err) return alert(err.message)
                    this.props.onRegisterSuccess({username,email,id, foto_profile})
                })

            })
            .catch((err) => {
                console.log(err)
            })
        }
        else{
            return alert('Form cannot empty')
        }
    }

    componentDidUpdate(){
        if(this.props.bebas){
            const reset_stack = StackActions.reset({
                index : 0,
                actions : [NavigationActions.navigate({routeName:'home'})]
            })
            this.props.navigation.dispatch(reset_stack)
        }
    }

    render() {
    return (
      <View style={{flex:1,justifyContent:'center',paddingHorizontal:20}}>
        <Text style={{alignSelf:'center'}} h1> Insta </Text>
        <View style={{marginTop:30}}>
            <Input
                onChangeText = {(text) => this.setState({username : text})}
                placeholder='Username'
                leftIcon={
                    <Icon
                    name='user'
                    size={24}
                    color='black'
                    style={{paddingRight:10}}
                    />
                }
            />
        </View>
        <View style={{marginTop:15}}>
            <Input
                onChangeText = {(text) => this.setState({password : text})}
                secureTextEntry={this.state.look}
                placeholder='Password'
                leftIcon={
                    <Icon
                    name='lock'
                    size={24}
                    color='black'
                    style={{paddingRight:10}}
                    />
                }
                rightIcon={
                    <Icon
                    name='eye'
                    size={24}
                    color='black'
                    style={{paddingRight:10}}
                    onPress={() => this.setState({look : !this.state.look})}
                    />
                }
            />
        </View>
        <View style={{marginTop:30}}>
            <Button
                title='Login'
                onPress={this.onBtnLoginClick}
                loading = {this.state.loading_btn}
            />
        </View>

        <View style={{flexDirection:'row', marginTop:15}}>
            <View style={{flex:1}}>
                <Button
                     icon={
                        <Icon 
                            name='google'
                            size={25}
                            color='white'
                        />
                    }
                    buttonStyle={{backgroundColor:'red'}}

                />
            </View>
            <View style={{flex:1}}>
                <Button
                    icon={
                        <Icon 
                            name='facebook'
                            size={25}
                            color='white'
                        />
                    }
                    buttonStyle={{backgroundColor:'blue'}}
                />
            </View>
        </View>
        <Text h4 style={{alignSelf:'center'}} onPress={()=> this.props.navigation.navigate('register')}> Create Account </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        bebas : state.users.username
    }
}

export default connect(mapStateToProps,{onRegisterSuccess})(login)
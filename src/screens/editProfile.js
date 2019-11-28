import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import {Header,Left,Body,Container,Right} from 'native-base'
import {Avatar,Text,Image} from 'react-native-elements'
import { connect } from 'react-redux';
import {urlApi} from '../supports/url'
import Axios from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome'

class editProfile extends Component {
  
  state = {data : null}
  componentDidMount(){
      this.getDetailUser()
  }

  getDetailUser=()=>{
    Axios.get(urlApi + `post/getpostbyusername?username=${this.props.username}`)
    .then(res=>{
      // console.log(res.data.data)
      console.log(res.data.data)
      if(res.data.data){
        
        this.setState({data: res.data.data})
      }else{
        this.setState({data: 'No Post'})
      }
    })
  }

  renderPhoto = ()=>{
    if(this.state.data !== ''){
      let foto = this.state.data.map((val)=>{
          return (
              <View style={{width:`${100/3}%`,height:120,}}>
                  <Image 
                          source={{uri : urlApi + `${val.foto_url}`}}
                          style={{ width: '100%',height:'100%'}}
                      />
              </View>
          )
      })
      return foto
    }
    
}

  render() {
    if(this.state.data === null){
      return(
          <Text h1>Loading</Text>
      )
  }
    return (
      <View>
      <Header style={{backgroundColor:'white'}}>
          {/* <Left>
              <Icon name='arrow-back' onPress={() => this.props.navigation.goBack()} />
          </Left> */}
          <Body>
              <Text style={{fontWeight:'bold'}}>{this.state.data[0].username} </Text>
          </Body>
          <Right>
            <Icon name='sign-out' size={24}/>
          </Right>
      </Header>
      {/* Container USer Photo */}
      <View style={{height : 100,flexDirection:'row',paddingHorizontal:15,marginTop:15 }}>
          <View style={{flex:1 ,}}>
          <Avatar
              containerStyle={{borderWidth:3,borderColor:'red'}}
              size={100}
              rounded
              source={{
                  uri:urlApi +'public/profile/default.png',
              }}
              />
          </View>
          <View style={{flex:1 , justifyContent:'center',alignItems:'center'}}>
              <Text h4>{this.state.data.length}</Text>
              <Text>Posts</Text>
          </View>
          <View style={{flex:1 , justifyContent:'center',alignItems:'center'}}>
              <Text h4>1000</Text>
              <Text>Followers</Text>
          </View>
          <View style={{flex:1 , justifyContent:'center',alignItems:'center'}}>
              <Text h4>2000</Text>
              <Text>Following</Text>
          </View>
          
      </View>
      
      {/* Container User Info */}
      <View style={{marginTop:15,paddingHorizontal:15}}>
          <Text style={{fontWeight:'bold'}}> {this.state.data[0].username} </Text>
          <Text> User Bio </Text>
      </View>
      
      {/* List Foto */}
      <ScrollView style={{borderTopWidth:1,borderTopColor:'grey',marginTop:15}}>
          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
              {this.renderPhoto()}
          </View>
          
      </ScrollView>
  </View>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    username: state.users.username
  }
}

export default connect(mapStateToProps)(editProfile)
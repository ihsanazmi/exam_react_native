import React, { Component } from 'react';
import { View,ScrollView, ActivityIndicator } from 'react-native';
import {Image,Avatar, Text} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Post from './../components/post'
import { urlApi } from '../supports/url';
import Axios from 'axios';
import {connect} from 'react-redux'
// const data =[
//     {username : 'fikri' , url_foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKrpS7K4U5ju_Jqtj69t2SW90P8G0yInzjmySwy-McoemFPXj0', caption : 'caption',likes : 10},
//     {username : 'andi' , url_foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKrpS7K4U5ju_Jqtj69t2SW90P8G0yInzjmySwy-McoemFPXj0', caption : 'caption',likes : 10},
//     {username : 'budi' , url_foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKrpS7K4U5ju_Jqtj69t2SW90P8G0yInzjmySwy-McoemFPXj0', caption : 'caption',likes : 10},
//     {username : 'seto' , url_foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKrpS7K4U5ju_Jqtj69t2SW90P8G0yInzjmySwy-McoemFPXj0', caption : 'caption',likes : 10},
//     {username : 'susilo' , url_foto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKrpS7K4U5ju_Jqtj69t2SW90P8G0yInzjmySwy-McoemFPXj0', caption : 'caption',likes : 10},
// ]


class home extends Component {
  state = {data : null}
  
  componentDidMount(){
    Axios.get(urlApi + 'post/getallpost')
    .then((data) => {
      // console.log(this.props.user)
      let filter_home = data.data.data.filter((val)=>{
        return val.username !== this.props.user
        // console.log(filter_home)
      })
      this.setState({data:filter_home})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  filterData = (username) => {
    Axios.get(urlApi+ `post/getpostbyusername?username=${username}`)
    .then(res=>{
      var data = res.data.data
      var data_filtered = data.filter((val) => {
        return val.username === username
      })
      return this.props.navigation.navigate('detail',{data : data_filtered})
    })
    .catch(err=>{
      console.log(err)
    })

  }

  render() {
    if(this.state.data === null){
      return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large' />
      </View>
      )
    }
    return (
      <ScrollView style={{paddingTop:30}}>
        {
          this.state.data.map((val) => {
            return(
              <Post avatarUrl={urlApi + "public/profile/default.png"} onPindah={() =>this.filterData(val.username)} postUrl = {urlApi + val.foto_url} username={val.username} caption={val.caption}/>
            )
          })
        }
        
      </ScrollView>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    user : state.users.username,
  }
}

export default connect(mapStateToProps)(home)

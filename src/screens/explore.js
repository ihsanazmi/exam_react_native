import React, { Component } from 'react';
import { View, Text,ScrollView,TouchableWithoutFeedback,Image, ActivityIndicator } from 'react-native';
import {SearchBar} from 'react-native-elements'
import Axios from 'axios'
import {urlApi} from '../supports/url'


export default class explore extends Component {
  
  state = {
    all_post : null
  }

  componentDidMount(){
    this.getAllPost()
  }

  getAllPost = ()=>{
    Axios.get(urlApi + 'post/getallpost')
    .then(res=>{
      res.data.data.reverse()
      // console.log(x)
      this.setState({all_post:res.data.data})
    })
    .catch(err=>{
      console.log(err)
    })
  }

  moveToPostDetail = (id_posting, username)=>{
    let data = {
      id_posting, username
    }
    return this.props.navigation.navigate('postDetail',{data : data})
  }

  renderListPost = ()=>{
    let post = this.state.all_post.map((val)=>{
      return(
        <View style={{width:`${100/3}%`}}>
          <TouchableWithoutFeedback onPress={() => this.moveToPostDetail(val.id, val.username)}>
            <Image source={{uri: urlApi + val.foto_url }} style={{height: 125, width: '100%' }}/>
          </TouchableWithoutFeedback>
        </View>
      )
    })
    return post
  }

  render() {
    if(this.state.all_post === null){
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size='large' />
        </View>
        )
    }
    // console.log(this.state.all_post)
    return (
      <View style={{ flex: 1 }}>
          <SearchBar
              placeholder="Search"
              onChangeText={this.updateSearch}
              value={this.state.search}
              containerStyle={{ backgroundColor: '#fff' }}
              inputContainerStyle={{ backgroundColor: '#fff' }}
              inputStyle={{ color: 'black'}}
              lightTheme={true}
              searchIcon={{ size: 27 }}
          />
          <ScrollView>
              <View 
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    // justifyContent: 'space-between',
                    flex: 1
                }}
              >
                  
                  {/* <View style={{width:`${100/3}%`}}>
                      <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSISxhwEyv6Bo5LjRbq1Uhr3iL7Dgn4FaJ15dda1gzl2la3UoZT' }} style={{height: 125, width: '100%' }}/>
                  </View>
                  <View style={{width:`${100/3}%`}}>
                      <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSiDTawj--BDZ1NqrlhrZzqEfW-ZdEipsF6I1_n24O-nb3pn0E8' }} style={{height: 125, width: '100%' }}/>
                  </View>
                  <View style={{width:`${100/3}%`}}>
                      <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRB6eSld4ECv9wIcD3CSVOmXPCM5NQ6GkcIWFkdiGOp4O39gYjy' }} style={{height: 125, width: '100%' }}/>
                  </View> */}
                  
                  {this.renderListPost()}
              </View>
          </ScrollView>
      </View>
    );
  }
}

import React, { Component } from 'react';
import { View } from 'react-native';
import {Image,Avatar, Text} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class post extends Component {

  state ={
    seeMore : false
  }

  onSeeMorePress = ()=>{
    this.setState({seeMore:!this.state.seeMore})
  }

  renderSeeMore = (length)=>{
    console.log(length)
    if(length > 50){
    return <Text style={{fontWeight:'bold'}} onPress={this.onSeeMorePress}>{this.state.seeMore ? '' : '...See More' }</Text>
    }
  }

  render() {
    return (
        <View style={{marginBottom:40}}>
        {/* Profile Pict And Username */}
        <View style={{flexDirection:'row',paddingHorizontal:15, justifyContent:'space-between' }}>
          <View style={{flexDirection:'row'}}>
            <Avatar
                rounded
                source={{
                    uri:
                    this.props.avatarUrl,
                }}
                />
            <Text onPress={this.props.onPindah} style={{marginLeft:15,fontWeight:'bold',fontSize:18}}>{this.props.username}</Text>

          </View>
          <View style={{alignSelf:'center'}}>
            <Icon 
              name='ellipsis-v'
              size ={20}
            />
          </View>
        </View>

        {/* Image */}
        <View style={{borderTopWidth:0.3, borderTopColor:'grey',marginTop:10}}>
            <Image 
                source={{uri : this.props.postUrl}}
                style={{ width: '100%',height:400}}
            />
        </View>

        {/* Icon Like Comments And Bookmark */}
        <View style={{flexDirection:'row',paddingLeft:15,marginTop:15,justifyContent:'space-between'}}>
          <View style={{flexDirection:'row'}}>
            <Icon 
              style={{marginRight:20}}
              // style={{borderWidth:0.5,borderColor:'black'}}
              name='heart-o'
              size={30}
            />
            <Icon 
              // style={{borderWidth:0.5,borderColor:'black'}}
              name='comment-o'
              size={30}
            />
          </View>
          <View>
          <Icon 
              style={{marginRight:20}}
              // style={{borderWidth:0.5,borderColor:'black'}}
              name='tag'
              size={30}
            />
          </View>
        </View>

        {/* Captions */}
        <View style={{flexDirection:'row',marginTop:15,paddingHorizontal:15}}> 
          <Text style={{fontWeight:'bold'}}>{`${this.props.username} `}
            <Text 
              style={{fontWeight:"normal"}}
            >
              {this.state.seeMore  ? this.props.caption : this.props.caption.slice(0,51)} 
              {this.renderSeeMore(this.props.caption.length)}
              
            </Text>
          </Text>
        </View>
    </View>
    );
  }
}

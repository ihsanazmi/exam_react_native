import React, { Component } from 'react';
import { View,ScrollView } from 'react-native';
import {Header,Left,Body,Icon,Container,Right} from 'native-base'
import {Avatar,Text,Image} from 'react-native-elements'
export default class profileDetail extends Component {

  render() {
    return (
        <View>
            <Header style={{backgroundColor:'white'}}>
                <Left>
                    <Icon name='arrow-back' />
                </Left>
                <Body>
                    <Text style={{fontWeight:'bold'}}>Username</Text>
                </Body>
                <Right>
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
                        uri:'http://apiinstagrinjc.herokuapp.com/public/posts/POS1574734597340.jpeg',
                    }}
                    />
                </View>
                <View style={{flex:1 , justifyContent:'center',alignItems:'center'}}>
                    <Text h4>49</Text>
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
                <Text style={{fontWeight:'bold'}}> Username </Text>
                <Text> User Bio </Text>
            </View>
            
            {/* List Foto */}
            <ScrollView style={{borderTopWidth:1,borderTopColor:'grey',marginTop:15}}>
                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    <View style={{width:`${100/3}%`,height:120,}}>
                        <Image 
                                source={{uri : 'http://apiinstagrinjc.herokuapp.com/public/posts/POS1574734597340.jpeg'}}
                                style={{ width: '100%',height:'100%'}}
                            />
                    </View>
                    
                    
                </View>
                
            </ScrollView>
        </View>
    );
  }
}
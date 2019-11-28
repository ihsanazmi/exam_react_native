import React, { Component } from 'react';
import { View ,Image, ActivityIndicator} from 'react-native';
import { Header, Icon, Overlay } from 'react-native-elements';
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base';
import Axios from 'axios'
import {urlApi} from '../supports/url'

export default class postDetail extends Component {

    state ={
        detail: null,
        profile: null
    }

    componentDidMount(){
        this.getPostbyUsername()
    }

    getPostbyUsername=()=>{
        let data = this.props.navigation.getParam('data')
        console.log(data)
        Axios.get(urlApi + `post/getpostbyusername?username=${data.username}`)
        .then(res=>{
            // console.log(res.data.data)
            if(res.data.error){
                return console.log(res.data.error)
            }
            this.setState({profile: res.data.data})
            let filter_post = res.data.data.filter((val)=>{
                return val.id === data.id_posting
            })
            
            this.setState({detail:filter_post})
        })
        .catch(err=>{
            console.log(err)
        })

    }

    movePage =()=>{
        // alert(username)
        // Axios.get(urlApi+'')
        return this.props.navigation.navigate('detail',{data : this.state.profile})
    }

  render() {
    if(this.state.detail === null){
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' />
        </View>
        )
    }
    return (
      <View>
        <Header
            placement='left'
            centerComponent={{ 
                text: 'Post', 
                style: { color: 'black', fontSize: 18, fontWeight: '700' } 
            }}
            leftComponent={{ 
                icon: 'arrow-back', 
                color: 'black',
                onPress: () => this.props.navigation.goBack() 
            }}
            containerStyle={{
                backgroundColor: '#fff',
                justifyContent: 'space-around',
                elevation: 2,
                marginTop: Platform.OS === 'ios' ? 0 : - 25
            }}
        />
        <Card>
            <CardItem>
                <Left style={{ flex: 3 }}>
                    <Thumbnail source={{uri: urlApi + 'public/profile/default.png' }} />
                    <Body>
                        <Text onPress={this.movePage}>{this.state.detail[0].username}</Text>
                        <Text note>Instagrin User</Text>
                    </Body>
                </Left>
                <Right>
                    <Icon
                        name='more-vert'
                        size={30}
                        onPress={() => this.setState({ isVisible: true  })}
                    />
                </Right>
            </CardItem>
            <CardItem cardBody>
                <Image source={{uri: urlApi + `${this.state.detail[0].foto_url}` }} style={{height: 350, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
                <Left>
                    <Text>{this.state.detail[0].caption}</Text>
                </Left>
            </CardItem>
        </Card>
      </View>
    );
  }
}

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'
import {Text, Input, Button } from 'react-native-elements';
import {connect} from 'react-redux'
import Axios from 'axios';
import { urlApi } from '../supports/url';
import Icon from 'react-native-vector-icons/FontAwesome'

class postImage extends Component {
  state ={image : null ,caption : ''}

  openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      this.setState({image});
    });
  }

  onBtnPostPress = () => {
    var fd = new FormData()
    var image = {
      name :this.props.user_data.username + '.' +this.state.image.mime.split('/')[1] ,
      type : this.state.image.mime ,
      uri : this.state.image.path
    }
    console.log(image)
    fd.append('image',image)
    var data = {
      caption : this.state.caption,
      username : this.props.user_data.username,
      id_user : this.props.user_data.id
    }

    data = JSON.stringify(data)

    fd.append('data', data)
    console.log(fd)
    Axios.post(urlApi + 'post/addpost' , fd ,{headers : {'Content-Type': 'multipart/form-data' }})
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })

  }

  render() {
    console.log(this.props.user_data)
    return (
      <View style={{alignContent:'center'}}>
        <View style={{alignSelf:'center'}}>
          <Text h1>Posting Image</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around', marginVertical:17}}>
          <Icon onPress={this.openCamera} name='camera' size={64} />
          <Icon onPress={this.openCamera} name='image' size={64} />
        </View>
        <View style={{alignSelf:'center'}}>
          <Image 
            width={300}
            height={300}
            source ={{uri : this.state.image === null ? null : this.state.image.path }}
          /> 
        </View>
        <View style={{marginVertical:30}}>
          <Input 
          onChangeText = {(text) => this.setState({caption:text})}
          placeholder='Caption'
          />
        </View>
        <Button 
        onPress={this.onBtnPostPress}
        title ='Post'
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    user_data : state.users
  }
}

export default connect(mapStateToProps)(postImage);
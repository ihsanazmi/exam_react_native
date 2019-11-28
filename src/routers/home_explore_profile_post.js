import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import Home from './../screens/home'
import Icon from 'react-native-vector-icons/FontAwesome'
import explore from '../screens/explore'
import postImage from '../screens/postImage'
import editProfile from '../screens/editProfile'
import ProfileDetail from '../screens/profileDetail'
import postDetail from '../screens/postDetail'
import { createStackNavigator } from 'react-navigation-stack'


const Home_to_Profile= createAppContainer(createStackNavigator({
    home : Home,
    detail : ProfileDetail
},{
    headerMode :"none"
}))

const Explore_to_postDetail= createAppContainer(createStackNavigator({
    explore: explore,
    postDetail: postDetail,
    detail: ProfileDetail
},{
    headerMode:'none'
}))

// const postDetail_to_profiledetail = createAppContainer(createStackNavigator({
//     postDetail: postDetail,
//     detail:ProfileDetail
// },{
//     headerMode:'none'
// }))


const MainTab = createAppContainer(createMaterialTopTabNavigator(
    {
        home : {
            screen : Home_to_Profile,
            navigationOptions : {
                tabBarIcon : <Icon name='home' size={24} /> 
            }
        },
        explore : {
            screen : Explore_to_postDetail,
            navigationOptions : {
                tabBarIcon : <Icon name='search' size={24} />
            }
        },
        post : {
            screen : postImage,
            navigationOptions : {
                tabBarIcon : <Icon name='plus' size={24} />
            }
        },
        editProfile : {
            screen : editProfile,
            navigationOptions : {
                tabBarIcon : <Icon name='user' size={24} />
            }
        }
    },
    {
        tabBarPosition : 'bottom',
        tabBarOptions : {
            showIcon : true,
            showLabel: false,
            indicatorStyle : {position : 'absolute',top:0,backgroundColor: 'black'},
            style : {backgroundColor : "white",borderTopWidth : 0.8,borderTopColor : 'gray'}
        }
    }

))

export default MainTab;
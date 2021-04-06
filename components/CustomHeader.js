import * as React from 'react';
import {View} from 'react-native';
import {Header, Icon, Badge} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import db from "../config";
import firebase from "firebase";

export default class CustomHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: "",
            userId: firebase.auth().currentUser.email
        }
    }

    refUnreadNots(){
        db.collection("all_notifications")
        .where("targetedUserId", "==", this.state.userId)
        .where("notificationStatus", "==", "unread")
        .onSnapshot((snapshot)=>{
            var unreadNots = snapshot.docs.map((doc)=>doc.data())
            this.setState({
                value: unreadNots.length
            })
        })
    }

    componentDidMount(){
        this.refUnreadNots();
    }

    BellIcon=()=>{
        return(
            <View>
                <Icon name = "bell" type="fontawesome5" 
                color="#ff9800" size={25} onPress={()=>{
                    this.props.navigation.navigate("NotificationScreen")
                }}/>

                <Badge 
                 value={this.state.value}
                  containerStyle={{position: "absolute", top: -4, right: -4}}/>
            </View>
        )
    }

    render(){
        return(
            <View>
              <SafeAreaProvider>
                <Header
                 centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:30,fontWeight:"bold", } }}
                 leftComponent={
                    <Icon
                    name="bars"
                    type="font-awesome"
                    color="#FFFFFF"
                    onPress={
                        ()=>{
                            this.props.navigation.toggleDrawer()
                        }
                    }
                   />
                 }
                 rightComponent={
                     < this.BellIcon {...this.props}/>
                 }
                 backgroundColor = "#3F54EB"
                />
              </SafeAreaProvider>
            </View>
        )
    }
}
import * as React from "react";
import {View, StyleSheet, Image} from "react-native";
import firebase from "firebase";
import db from "../config";
import CustomHeader from "../components/CustomHeader";
import SwipeableFlatlist from "../components/swipeableFlatlist";

export default class NotificationScreen extends React.Component{

    constructor(){
        super();
        this.state={
            emailId: firebase.auth().currentUser.email,
            allNotifications: [],
            doc_id: "",
            status: ""
        }
        this.notificationRef = null;
    }

    refNotifications=async()=>{
        this.notificationRef = db.collection("all_notifications")
        .where("notificationStatus", "==", "unread")
        .where("targetedUserId", "==", this.state.emailId).get()
        .then((snapshot)=>{
            var allNotifications = [];
            snapshot.docs.map((doc)=>{
                var notifications = doc.data();
                notifications["doc_id"] = doc.id;
                allNotifications.push(notifications);
                this.setState({
                    allNotifications: allNotifications
                })
            })
        })

        // db.collection("all_notifications").where("targetedUserId", "==", this.state.emailId).get()
        // .then((snapshot)=>{
        //     snapshot.forEach((doc)=>{
        //         this.setState({
        //             doc_id: doc.id,
        //             status: doc.data().notificationStatus
        //         })
        //     })
        //     console.log(this.state.status)
        // })
    }

    // updateStatus=(status)=>{
    //     db.collection("all_notifications").doc(this.state.doc_id)
    //     .update({
    //         "notificationStatus": status
    //     })
    // }

    componentDidMount(){
        this.refNotifications();
    }

    componentWillUnmount(){
        this.notificationRef = null;
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: "#D6D6D6"}}>
                <View style={{flex: 0.1}}>
                   <CustomHeader title="Notifications" navigation={this.props.navigation}/>
                </View>
                <View style={{flex: 0.9}}>
                    {
                        this.state.allNotifications.length == 0 ?(
                           <View style={{flex: 1}}>
                                <Image source={require("../assets/Notification.png")}/>
                           </View>
                        ):(
                        <SwipeableFlatlist allNotifications={this.state.allNotifications}/>
                        )
                    }
                </View>
            </View>
        )
    }
}
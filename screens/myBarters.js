import * as React from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import CustomHeader from "../components/CustomHeader";
import db from "../config";
import firebase from "firebase";


export default class MyBarters extends React.Component{
    constructor(){
        super();
        this.state={
            barterId: firebase.auth().currentUser.email,
            barterName: "",
            allBarters: []
        }
        this.requestRef = "";
    }

    getBarterDetails = async()=>{
        db.collection("users").where("emailId", "==", this.state.barterId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    barterName: doc.data().first_name + " " +  doc.data().last_name
                })
            })
        })
    }

    allBarters = async() =>{
        db.collection("allBarters").where("barterId", "==", this.state.barterId).get()
        .then((snapshot)=>{
            var allBarters = [];
            snapshot.forEach((doc)=>{
                var barters = doc.data();
                barters["doc_id"] = doc.id;
                allBarters.push(barters);
                this.setState({
                    allBarters: allBarters
                })
            })
        })
    }

    sendItem=(itemDetails)=>{
        if(itemDetails.requestStatus == "Item sent"){
            var requestStatus = "User ready to exchange";
            db.collection("allBarters").doc(itemDetails.doc_id).update({
                "requestStatus": requestStatus
            })
            this.sendNotification(itemDetails, requestStatus);
        }
        else{
            var requestStatus = "Item sent"
            db.collection("allBarters").doc(itemDetails.doc_id).update({
                "requestStatus": requestStatus
            })
            this.sendNotification(itemDetails, requestStatus)
        }
    }

    sendNotification=(itemDetails, barterStatus)=>{
        var exchangeId = itemDetails.requestId;
        var barterId = itemDetails.barterId;
        db.collection("all_notifications")
        .where("requestId", "==", exchangeId)
        .where("barterId", "==", barterId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var message = "";
                if(barterStatus == "Item sent"){
                    message = this.state.barterName + " has sent the item."
                }
                else{
                    message = this.stats.barterName + " is ready to exchange."
                }
                db.collection("all_notifications").doc(doc.id).update({
                    "message": message,
                    "notificationStatus": "unread",
                    "date": firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
    }

    componentDidMount(){
        this.getBarterDetails();
        this.allBarters();
    }

    render(){
        return(
            <View>
                <CustomHeader title="My Barters" navigation={this.props.navigation}/>

                {
                    this.state.allBarters.length == 0
                    ?(
                       <View>
                           <Text> List of all your barters here </Text>
                       </View>
                    )
                    :(
                      <View>
                          <FlatList
                            keyExtractor={(item, index)=>index.toString()}
                            data={this.state.allBarters}
                            renderItem={({item})=>(
                                <View style={{borderBottomWidth: 2}}>
                                    <Text style={styles.title}>
                                        {item.itemName}
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        ~{item.requestedBy}
                                    </Text>

                                    <TouchableOpacity 
                                     style={styles.button}
                                     onPress={()=>{this.sendItem(item)}}
                                     >
                                        <Text style={styles.buttonText}>
                                            {item.requestStatus == "Item sent" ? "Item sent" : "Send item"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                          />
                      </View>
                    )
                }
            </View>
        )
    }
}

const styles=StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "600",
        marginLeft: 10
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "400",
        marginLeft: 40
    },
    button: {
        width: 200,
        height: 40,
        marginLeft: 1300,
        marginTop: -40,
        backgroundColor: "#57C3DE",
        borderWidth: 1.5,
        borderRadius: 1.5,
        alignItems: "center"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
        justifyContent: "center"
    }
})
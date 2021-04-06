import * as React from "react";
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from "react-native";
import CustomHeader from "../components/CustomHeader";
import firebase from 'firebase';
import db from "../config";

export default class Request extends React.Component{

  constructor(){
    super();
    this.state={
      itemName: "",
      reasonToRequest: "",
      userId: firebase.auth().currentUser.email
    }
  }

  createUniqueId=()=>{
    return Math.random().toString(36).substring(7);
  }

  updateDatabase=()=>{
    var randomId = this.createUniqueId()
    db.collection("items").add({
      "itemName": this.state.itemName,
      "reasonToRequest": this.state.reasonToRequest,
      "userId": this.state.userId,
      "requestId": randomId
    })
  }

  render(){
    return(
      <View style={{backgroundColor: "#D6D6D6", flex: 1}}>
        <CustomHeader title="Request Screen" navigation={this.props.navigation}/>

         <TextInput
          placeholder="Enter name of the item"
          style={[styles.formTextInput, {marginTop: 100, height: 50}]}
          onChangeText={
            (text)=>{
              this.setState({
                itemName: text
              })
            }
          }
         />

        <TextInput
         placeholder="Why do you want it?"
         style={[styles.formTextInput, {marginTop: 20, height: 200}]}
         multiline={true}
         onChangeText={
          (text)=>{
            this.setState({
              reasonToRequest: text
            })
          }
        }
        />

        <TouchableOpacity
         style={styles.buttonStyle}
         onPress={()=>{this.updateDatabase()}}
         >
          <Text style={styles.buttonText}>
            SUBMIT
          </Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  formTextInput: {
    alignSelf: "center",
    borderWidth: 2,
    width: 400,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#fff"
  },
  buttonStyle: {
    borderWidth: 2,
    borderRadius: 5,
    width: 400,
    height: 40,
    backgroundColor: "#EB830B",
    alignSelf: "center",
    marginTop: 10,
    alignItems: "center"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  }
})
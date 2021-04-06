import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class LSscreen extends React.Component{

    constructor(){
        super();
        this.state={
            emailId: "",
            password: "",
            confirmpwd: "",
            firstName: "",
            lastName: "",
            address: "",
            contact: "",
            isModalVisible: "false",
            isBookRequestActive: false
        }
    }

    userLogIn=(email,password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            this.props.navigation.navigate("BottomTab")
        })
        .catch((error)=>{
            var errorMessage = error.message;
            return alert(errorMessage);
        })
    }

    userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then((response)=>{
            db.collection('users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              emailId: this.state.emailId,
              address:this.state.address,
              isBookRequestActive: false
            })
            return alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isVisible" : false})},
                 ]
             );
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage)
          });
        }}

    showModal=()=>{
        return(
            <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
    <View style={styles.modalContainer}>
      <ScrollView style={{width:'100%'}}>
        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
        <Text
          style={styles.modalTitle}
          >Registration</Text>
        <TextInput
          style={styles.formTextInput}
          placeholder = {"First Name"}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email ID"}
          keyboardType={"email-address"}
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Confirm Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmpwd: text
            })
          }}
        />
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmpwd)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={{color:'#ff5722'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  </Modal>
        )
    }

    render(){
        return(
            <View style={{flex: 1,backgroundColor:"#D9D9D9"}}>

                {
                    this.showModal()
                }

                <View style={{justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.title}>Barter App</Text>
                </View>

                <TextInput
                 placeholder = "Enter your email address"
                 style={[styles.textInput, {marginTop: 70}]}
                 keyboardType='email-address'
                 onChangeText={
                     (text)=>{
                         this.setState({
                             emailId: text
                         }) 
                     }}
                />

                <TextInput
                 placeholder = "Enter your password"
                 style={[styles.textInput, {marginTop: 20}]}
                 secureTextEntry={true}
                 onChangeText={
                     (text)=>{
                      this.setState({
                          password: text
                      })
                     }
                 }
                />

                <TouchableOpacity
                 onPress={()=>{this.userLogIn(this.state.emailId, this.state.password)}}
                 style={styles.lsButton}
                >
                    <Text style={styles.buttonText}>
                     Log in
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                 onPress={()=>this.setState({ isModalVisible:true})}
                 style={styles.lsButton}
                >
                    <Text style={styles.buttonText}>
                     Sign up
                    </Text>
                </TouchableOpacity>

                <Text style={{marginTop: 40}}>

                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 2,
        borderRadius: 2,
        width: 300,
        height: 50,
        fontSize: 25,
        textAlign: "center",
        marginLeft: 600,
        backgroundColor: "#fff",
        fontWeight: "300"
    },
    lsButton:{
     backgroundColor: "#ff9800",
     width: 200,
     height: 50,
     borderRadius: 100,
     textAlign: "center",
     justifyContent: "center",
     shadowColor:"#000",
     shadowOffset: {
         width: 8,
         height: 5
     },
     shadowOpacity: .30,
     elevation: 16,
     shadowRadius: 10.32,
     padding: 10,
     marginTop: 30,
     marginLeft: 650
    },
    buttonText: {
        fontWeight: "200",
        fontSize: 20,
        color: "#fff"
    },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#ff3d00'
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
cancelButton:{
  width:200,
  height:30,
  justifyContent:'center',
  alignItems:'center',
  marginTop:5,
},
modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  }
})
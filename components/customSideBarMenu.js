import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {Avatar} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from 'firebase';
import db from "../config";

export default class CustomSideBarMenu extends React.Component{
    
    constructor(){
        super();

        this. state={
            userId: firebase.auth().currentUser.email,
            image: "#",
            name: "",
            docId: ""
        }
    }
    state={
        userId: firebase.auth().currentUser.email,
        image: "#",
        name: "",
        docId: ""
    }
    
    selectPicture=async()=>{
        const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })

        if(!cancelled){
            this.uploadImage(uri, this.state.userId);
        }
    };

    uploadImage = async(uri, imageName)=>{
        var response = await fetch(uri);
        var blob = await response.blob();

        var ref = firebase.storage().ref().child("user_profiles/" + imageName);

        return ref.put(blob).then((response)=>{
            this.fetchImage(imageName)
        })
    }

    fetchImage=(imageName)=>{
        var storageRef = firebase.storage().ref().child("user_profiles/"+imageName)

        storageRef.getDownloadURL().then((url)=>{
            this.setState({
                image: url
            })
        })
        .catch((error)=>{
            this.setState({
                image: "#"
            })
        })
    }

    getUserProfile(){
        db.collection("users").where("emailId", "==", this.state.userId)
        .onSnapshot((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    name: doc.data().first_name + " " + doc.data().last_name,
                    docId: doc.id,
                    image: doc.data().image
                })
            })
        })
    }

    componentDidMount(){
        this.fetchImage(this.state.userId);
        this.getUserProfile();
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.avatarView}>
                   <Avatar
                    rounded
                    source={{uri: this.state.image}}
                    size="medium"
                    onPress={()=>{this.selectPicture()}}
                    containerStyle={styles.imageContainer}
                    showEditButton
                   />

                   <Text style={styles.avatarText}>
                     {this.state.name}
                   </Text>

                </View>
               <View style={{flex: 1.5}}>
                   <DrawerItems {...this.props}/>
               </View>
               <View>
                   <TouchableOpacity
                   style={styles.logOutButton}
                    onPress={
                        ()=>{
                            this.props.navigation.navigate("LSscreen")
                            firebase.auth().signOut()
                        }}>
                       <Text style={styles.logOutText}>
                           SIGN OUT
                       </Text>
                   </TouchableOpacity>
               </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logOutText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    logOutButton: {
      height:30,
      width:'100%',
      justifyContent:'center',
      padding:10,
      marginTop: 500
    },
    avatarView: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "orange"
    },
    imageContainer: {
        flex: 1,
        width: "40%",
        height: "20%",
        marginLeft: 20,
        marginTop: 30,
        borderRadius: 40,
      },
      avatarText: {
          fontWeight: "100",
          fontSize: 20,
          paddingTop: 10
      }
})
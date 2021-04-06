import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import  {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';

export default class HomeScreen extends React.Component{

    constructor(){
        super();
        this.state={
            allItems: []
        }
        this.requestRef = null
    }

    getRequestedBooksList =()=>{
        this.requestRef = db.collection("items").onSnapshot((snapshot)=>{
          var allItems = snapshot.docs.map(document => document.data());
          this.setState({
            allItems : allItems
          });
        })
      }
    
      componentDidMount(){
        this.getRequestedBooksList()
      }

      componentWillUnmount(){
        this.requestRef();
      }

      keyExtractor = (item, index) => index.toString()

    render(){
        return(
            <SafeAreaProvider>
             <ScrollView>
              <View style={styles.subContainer}>
              <CustomHeader
                 navigation={this.props.navigation}
                 title="Donate Books"
                />

               {
                   this.state.allItems.length == 0
                   ?(
                       <View style={styles.subContainer}>
                           <Text style={{fontSize: 20}}>List of all requested Items</Text>
                       </View>
                   )
                   :(
                       <View>
                         <FlatList
                          keyExtractor={this.keyExtractor}
                          data={this.state.allItems}
                          renderItem={({item})=>(
                              <View style={{borderBottomWidth: 2}}>
                                 <Text style={{fontSize: 25, marginBottom: 10, marginTop: 10, fontWeight: "900"}}>
                                     {item.itemName}
                                 </Text>

                                 <Text style={{fontSize: 20, marginBottom: 10, marginTop: 10, fontWeight: "500"}}>
                                     {item.reasonToRequest}
                                 </Text>

                                 <TouchableOpacity 
                                   style={styles.button}
                                   onPress={()=>{
                                       this.props.navigation.navigate("RecieverDetails", {"details": item})
                                     }}
                                   >
                                     <Text style={{fontSize: 20, fontWeight: "500"}}>
                                         View
                                     </Text>
                                 </TouchableOpacity>
                              </View>
                          )}
                         />
                       </View>
                   )
               }
               </View>
              </ScrollView>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex: 2,
      backgroundColor: "#D9D9D9"
    },
    button:{
      width:120,
      height:40,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       },
       marginLeft: 1300,
       marginTop: -50,
       marginBottom: 20
    }
  })
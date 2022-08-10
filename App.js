import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button} from "react-native";

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');


const accountChangeHandler = (account) =>{
  setDefaultAccount(account);
}

  const ConnectWallet = () =>{
    if(window.ethereum){
     window.ethereum.request({method:'eth_requestAccounts'},[1, 2, 3, 4, 42,56]).then((result)=>{
       accountChangeHandler(result[0]);
     })
    }
    else{
      setErrorMessage("Install Metamask")
      alert("Please Install Metamask")
    }
  }
  return (
    <View style={styles.container}>
      <Button onPress={()=>ConnectWallet()} title="Connect Wallet"></Button>
      {defaultAccount !=undefined? <Text>Address is :  {defaultAccount}</Text> : null}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

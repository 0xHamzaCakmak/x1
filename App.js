import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button} from "react-native";
import { ethers } from "ethers";
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
     window.ethereum.request({method:'eth_requestAccounts',  params: [{ chainId: '0x38' }]}).then((result)=>{
       accountChangeHandler(result[0]);
       window.ethereum.request({method: 'eth_getBalance', params: [result[0], 'latest']})
		.then(balance => {
			setUserBalance(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
     })
    }
    else{
      setErrorMessage("Install Metamask")
      alert("Please Install Metamask")
    }
  }
	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}
  window.ethereum.on('accountsChanged', accountChangeHandler);
  window.ethereum.on('chainChanged', chainChangedHandler);
  return (
    <View style={styles.container}>
      <Button onPress={()=>ConnectWallet()} title="Connect Wallet"></Button>
      {defaultAccount !=undefined? <Text>Address is :  {defaultAccount} </Text> : null}
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
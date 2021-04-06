import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight, Alert } from 'react-native';
import * as pdata from './push.json';
import * as cdata from './call.json';
import { Convert } from './Convert';
import { Utils } from './Utils';
//{cardToString, cardToNumber} from


function StartScreen ({ navigation }) {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <Button
          title="Push/Fold advice"
          onPress={() =>
            navigation.navigate('PFChart')
          }
        />
        <Button
          title="Quiz"
          onPress={() =>
            navigation.navigate('Quiz')
          }
        />
    </View>
  );
};

function PFScreen ({ navigation }) {
	const [currentHand, setCurrentHand] = useState('--');
	const [handChosen, setHandChosen] = useState(true);
	const [pushStack, setPushStack] = useState('- BB');
	const [callStack, setCallStack] = useState('- BB');
	const [isSuited, setIsSuited] = useState(false);
	const pushHands = Convert.toHands(JSON.stringify(pdata));
	const callHands = Convert.toHands(JSON.stringify(cdata));


	React.useEffect(() => {
    	const unsubscribe = navigation.addListener('focus', () => {
      	console.log("Enter PFScreen");
      	//console.log(pdata['AA'][0][1]);
    	});

    	/*var ch = '42o';
		console.log(pushHands['default'][ch][0][1] + " BB");
		ch = 'KQs';
		console.log(pushHands['default'][ch][0][1] + " BB");*/

    	return unsubscribe;
  	}, [navigation]);

  	function getRanges() {
  		if (currentHand.length < 2 || currentHand == '--' || handChosen == false) {
  			return;
  		}

  		var card1 = currentHand.charAt(0);
  		var card2 = currentHand.charAt(1);

  		if (Utils.cardToNumber(card2) > Utils.cardToNumber(card1)) {
  			setCurrentHand(card2 + card1);
  		}

  		if (currentHand.length == 2 && currentHand != '--') {
  			try {
  				var ch = currentHand;
  				if (card1 != card2) {
	  				if(isSuited) {
	  					ch += 's';
	  				} else {
	  					ch += 'o';
	  				}
  				}
  				setPushStack(pushHands['default'][ch][0][1] + " BB");
  				setCallStack(callHands['default'][ch][0][1] + " BB");
 			} catch(error) {
  				console.log(error);
  			}
  		}
  	}

	// Called when user selects a card. 15 = clear
  	function selectCard(card: number) {
  		if (card == 15) {
  			setCurrentHand('--');
  			setHandChosen(true);
  			return;
  		}

  		if (handChosen == true) {
  			setHandChosen(false);
  			setCurrentHand(Utils.cardToString(card));
  		} else {
  			setHandChosen(true);
        if (card < Utils.cardToNumber(currentHand.charAt(0))) {
    			setCurrentHand(currentHand.concat(Utils.cardToString(card)));
        } else {
          setCurrentHand(Utils.cardToString(card).concat(currentHand));
        }
  		}
  	}

  	useEffect(() => {
   		getRanges();
	}, [currentHand, isSuited]);

  	return (
	    <View style={styles.pfContainer}>
	    	<Text style={{ fontSize: 32 }}>
	    		{currentHand}
	    		{isSuited ? 's' : 'o'}
	    	</Text>
	    	<Text style={{ fontSize: 28 }}>
	    		Push: {pushStack}
	    	</Text>
	    	<Text style={{ fontSize: 28 }}>
	    		Call: {callStack}
	    	</Text>
	    	<View style={styles.row}>
	    		<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(14)
          			}>
		    		<Text style={styles.pfButtonText}>A</Text>
		    	</TouchableHighlight>

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(2)
          			}>
		    		<Text style={styles.pfButtonText}>2</Text>
		    	</TouchableHighlight>

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(3)
          			}>
		    		<Text style={styles.pfButtonText}>3</Text>
		    	</TouchableHighlight>
	    	</View>


	    	<View style={styles.row}>
		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(4)
          			}>
		    		<Text style={styles.pfButtonText}>4</Text>
		    	</TouchableHighlight>

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(5)
          			}>
		    		<Text style={styles.pfButtonText}>5</Text>
		    	</TouchableHighlight>

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(6)
          			}>
		    		<Text style={styles.pfButtonText}>6</Text>
		    	</TouchableHighlight>

	    	</View>

	    	<View style={styles.row}>
		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(7)
          			}>
		    		<Text style={styles.pfButtonText}>7</Text>
		    	</TouchableHighlight>

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(8)
          			}>
		    		<Text style={styles.pfButtonText}>8</Text>
		    	</TouchableHighlight>

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(9)
          			}>
		    		<Text style={styles.pfButtonText}>9</Text>
		    	</TouchableHighlight>

	    	</View>

	    	<View style={styles.row}>
		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(10)
          			}>
		    		<Text style={styles.pfButtonText}>T</Text>
		    	</TouchableHighlight>

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(11)
          			}>
		    		<Text style={styles.pfButtonText}>J</Text>
		    	</TouchableHighlight>

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(12)
          			}>
		    		<Text style={styles.pfButtonText}>Q</Text>
		    	</TouchableHighlight>

	    	</View>

	    	<View style={styles.row}>
		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			setIsSuited(!isSuited)
          			}>
		    		<Text style={styles.pfButtonText}>{isSuited ? 's' : 'o'}</Text>
		    	</TouchableHighlight>

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(13)
          			}>
		    		<Text style={styles.pfButtonText}>K</Text>
		    	</TouchableHighlight>

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(15)
          			}>
		    		<Text style={styles.pfButtonText}>C</Text>
		    	</TouchableHighlight>
	    	</View>
		</View>
  	);
};

function QuizScreen ({ navigation }) {
	var spade = '\u{2660}';
	var heart = '\u{2665}';
	var diamond = '\u{2666}';
	var club = '\u{2663}';
	var suits:string[] = [spade, heart, diamond, club];

	const [effStack, setEffStack] = useState(0);
	const [hand, setHand] = useState("--");
	const [maxStack, setMaxStack] = useState(0);
  const [bbLimit, setBbLimit] = useState(0);
	const [isPusher, setIsPusher] = useState(true);

	const pushHands = Convert.toHands(JSON.stringify(pdata));
	const callHands = Convert.toHands(JSON.stringify(cdata));


	React.useEffect(() => {
    	const unsubscribe = navigation.addListener('focus', () => {
    		newHand();
      	console.log("Enter QuizScreen");
    	});
      newHand();
    	return unsubscribe;
  	}, [navigation]);

	function newHand() {
		var c1 = Math.floor(Math.random() * 13) + 2;
		var s1 = Math.floor(Math.random() * 4);
		var c2 = Math.floor(Math.random() * 13) + 2;
		var s2 = Math.floor(Math.random() * 4);
		var newStack = Math.floor(Math.random() * 14) + 1;
		newStack += Math.floor(Math.random() * 10)/10;
    
    var ip = Math.random();
    if (ip < 0.5) {
      setIsPusher(false);
    } else {
      setIsPusher(true);
    }

		if (c1 == c2 && s1 == s2) {
			if (c2 > 2) {
				c2--;
			}else {
				c2++;
			}
		}

		var nHand = Utils.cardToString(c1) + suits[s1] + " " + Utils.cardToString(c2) + suits[s2];

		setHand(nHand);
		setEffStack(newStack);
	}

  /*const showResults = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        { text: "OK", onPress: () => console.log("Close alert") }
      ]
    );*/

	// action = push for push/call
	function checkResults(action: string) {
    var limit = 0;

    var c1 = hand.charAt(0);
    var s1 = hand.charAt(1);
    var c2 = hand.charAt(3);
    var s2 = hand.charAt(4);
    var handStr = "";

    if (Utils.cardToNumber(c1) < Utils.cardToNumber(c2)) {
      handStr = c2 + c1;
    }else {
      handStr = c1 + c2;
    }

    if (c1 != c2 && s1 == s2) {
      handStr += "s";
    } else if (c1 != c2 && s1 != s2) {
      handStr += "o";
    }

    console.log("checkR: " + handStr);

    if (isPusher) {
      limit = pushHands['default'][handStr][0][1];
    } else {
      limit = callHands['default'][handStr][0][1];
    }
    console.log("lim: " + limit);

    if (isPusher) {
      if (action == "push" && effStack < limit) {
        alert("Correct, limit for pushing with " + hand + " is " + limit + " BB");
      } else if (action == "fold" && effStack > limit){
        alert("Correct, limit for pushing with " + hand + " is " + limit + " BB");
      } else {
        alert("Incorrect, limit for pushing with " + hand + " is " + limit + " BB");
      }
    } else {
      if (action == "push" && effStack < limit) {
        alert("Correct, limit for calling with " + hand + " is " + limit + " BB");
      } else if (action == "fold" && effStack > limit){
        alert("Correct, limit for calling with " + hand + " is " + limit + " BB");
      } else {
        alert("Incorrect, limit for calling with " + hand + " is " + limit + " BB");
      }
    }

    newHand();
	}

  	return (
    	<View style={styles.container}>
        	<Text style={{ fontSize: 28 }}>Effective stack: {effStack} BB</Text>
        	<Text style={{ fontSize: 32 }}>{hand}</Text>

        	<Button 
		    		title={ isPusher ? "Push" : "Call" }
		    		onPress={() =>
            			checkResults("push")
          			}
          	/>
          	<Button 
		    		title="Fold"
		    		onPress={() =>
            			checkResults("fold")
          			}
          	/>
        </View>
  	);
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartMenu">
      	<Stack.Screen
          name="StartMenu"
          component={StartScreen}
          options={{ title: 'Poker Helper' }}
        />
        <Stack.Screen
          name="PFChart"
          component={PFScreen}
          options={{ title: 'Push/Fold' }}
        />
        <Stack.Screen 
        	name="Quiz"
        	component={QuizScreen} 
        	options={{ title: 'Push/Fold Quiz' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: '#ddd',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  pfContainer: {
    flex: 1,
    flexGrow: 1,
    width: "100%",
    flexDirection: "column",
    flexWrap: "wrap",
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  pfButton: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#bbb',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: 'space-around',
  },
  pfButtonText: {
  	fontSize: 30,
  },
  row: {
  	width: "80%",
    flexDirection: "row",
    flexGrow: 1,
    //flexWrap: "wrap",
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
});

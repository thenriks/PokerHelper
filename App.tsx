import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';
import * as pdata from './push.json';
import * as cdata from './call.json';
import { Convert } from './Convert'



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

  	function cardToString(card: number): string {
  		if (card == 10) {
  			return 'T';
  		} else if (card == 11) {
  			return 'J';
  		} else if (card == 12) {
  			return 'Q';
  		} else if (card == 13) {
  			return 'K';
  		} else if (card == 14) {
  			return 'A';
  		} else {
  			return card.toString();
  		}
  	}

  	function cardToNumber(card: string): number {
  		if (card == 'T') {
  			return 10;
  		} else if (card == 'J') {
  			return 11;
  		} else if (card == 'Q') {
  			return 12;
  		} else if (card == 'K') {
  			return 13;
  		} else if (card == 'A') {
  			return 14;
  		} else {
  			return Number(card);
  		}
  	}

  	function getRanges() {
  		if (currentHand.length < 2 || currentHand == '--' || handChosen == false) {
  			return;
  		}

  		var card1 = currentHand.charAt(0);
  		var card2 = currentHand.charAt(1);

  		if (cardToNumber(card2) > cardToNumber(card1)) {
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
  				// const ch = currentHand+'o';
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
  			setCurrentHand(cardToString(card));
  		} else {
  			setHandChosen(true);
  			setCurrentHand(currentHand.concat(cardToString(card)));
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

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(4)
          			}>
		    		<Text style={styles.pfButtonText}>4</Text>
		    	</TouchableHighlight>
	    	</View>

	    	<View style={styles.row}>
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

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(7)
          			}>
		    		<Text style={styles.pfButtonText}>7</Text>
		    	</TouchableHighlight>
	    	</View>

	    	<View style={styles.row}>
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

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(10)
          			}>
		    		<Text style={styles.pfButtonText}>T</Text>
		    	</TouchableHighlight>
	    	</View>

	    	<View style={styles.row}>
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

		    	<TouchableHighlight 
		    		style={styles.pfButton}
		    		onPress={() =>
            			selectCard(13)
          			}>
		    		<Text style={styles.pfButtonText}>K</Text>
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
            			selectCard(14)
          			}>
		    		<Text style={styles.pfButtonText}>A</Text>
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

  	return (
    	<View style={styles.container}>
        	<Text>Quiz coming...</Text>
        	<Text>{spade}</Text>
	    	<Text>{heart}</Text>
	    	<Text>{diamond}</Text>
	    	<Text>{club}</Text>
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

import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
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
  		if (currentHand.length < 2) {
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
	    <View style={styles.container}>
	    	<Text>
	    		{currentHand}
	    		{isSuited ? 's' : 'o'}
	    	</Text>
	    	<Text>
	    		Push: {pushStack}
	    	</Text>
	    	<Text>
	    		Call: {callStack}
	    	</Text>
	    	<View style={styles.row}>
		    	<Button
		    		title="2"
		    		onPress={() =>
            			selectCard(2)
          			}
		    	/>
		    	<Button
		    		title="3"
		    		onPress={() =>
            			selectCard(3)
          			}
		    	/>
		    	<Button
		    		title="4"
		    		onPress={() =>
            			selectCard(4)
          			}
		    	/>
	    	</View>
	    	<View style={styles.row}>
		    	<Button
		    		title="5"
		    		onPress={() =>
            			selectCard(5)
          			}
		    	/>
		    	<Button
		    		title="6"
		    		onPress={() =>
            			selectCard(6)
          			}
		    	/>
		    	<Button
		    		title="7"
		    		onPress={() =>
            			selectCard(7)
          			}
		    	/>
	    	</View>
	    	<View style={styles.row}>
		    	<Button
		    		title="8"
		    		onPress={() =>
            			selectCard(8)
          			}
		    	/>
		    	<Button
		    		title="9"
		    		onPress={() =>
            			selectCard(9)
          			}
		    	/>
		    	<Button
		    		title="T"
		    		onPress={() =>
            			selectCard(10)
          			}
		    	/>
	    	</View>
	    	<View style={styles.row}>
		    	<Button
		    		title="J"
		    		onPress={() =>
            			selectCard(11)
          			}
		    	/>
		    	<Button
		    		title="Q"
		    		onPress={() =>
            			selectCard(12)
          			}
		    	/>
		    	<Button
		    		title="K"
		    		onPress={() =>
            			selectCard(13)
          			}
		    	/>
	    	</View>
	    	<View style={styles.row}>
	    		<Button
		    		title={isSuited ? 's' : 'o'}
		    		onPress={() =>
            			setIsSuited(!isSuited)
          			}
		    	/>
		    	<Button
		    		title="A"
		    		onPress={() =>
            			selectCard(14)
          			}
		    	/>
		    	<Button
		    		title="C"
		    		onPress={() =>
            			selectCard(15)
          			}
		    	/>
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
        	<Text>Quiz</Text>
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
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    width: '33%',
    backgroundColor: '#fff',
    borderBottomColor: 'black',
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

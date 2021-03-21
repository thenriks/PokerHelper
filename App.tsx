import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as pdata from './push.json';
import * as cdata from './call.json';


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
	//const [card1, setCard1] = useState(0);
	//const [card2, setCard2] = useState(0);
	var card1 = 0;
	var card2 = 0;
	const [handChosen, setHandChosen] = useState(true);
	const [stack, setStack] = useState('- BB');
	//var korti1 = 0;

	React.useEffect(() => {
    	const unsubscribe = navigation.addListener('focus', () => {
      	// console.log("Nonniih");
      	console.log(pdata['AA'][0][1]);
    	});

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

  	function getRanges(hand: string) {

  	}

	// Called when user selects a card. 15 = clear
  	function selectCard(card: number) {
  		//console.log(card);

  		//console.log(korti1)
  		//  	console.log("c1: " + card1);
  		//	console.log("c2: " + card2);
  		//	console.log("ch: " + handChosen);

  		if (handChosen == true) {
  			setHandChosen(false);
  			setCurrentHand(cardToString(card));
  		} else {
  			//setCard2(card);
  			//card2 = card;
  			setHandChosen(true);
  			//setCurrentHand(cardToString(card1).concat(cardToString(card2)));
  			setCurrentHand(currentHand.concat(cardToString(card)));
  		}
  	}

  	return (
	    <View style={styles.container}>
	    	<Text>
	    		{currentHand}
	    	</Text>
	    	<Text>
	    		{stack}
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

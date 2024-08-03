import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Switch } from 'react-native';
import { useState, createContext } from 'react';
import themes from './Themes';
import { Button, HelpButton, ToggleButton } from './Buttons';
import * as HelpText from './HelpText';

export const Context = createContext();

const getRandomMessage = () => {
  return HelpText.randomReassurance[Math.floor(Math.random() * HelpText.randomReassurance.length)];
}

export default function App() {

  //switch light and dark theme
  const [theme, setTheme] = useState(true);
  //message at the top
  const [message, setMessage] = useState(getRandomMessage);
  //list of help buttons
  const [listVisible, setListVisible] = useState(false);

  const main_color = theme ? themes.darkTheme.main_color 
  : themes.lightTheme.main_color;
  const secondary_color = theme ? themes.darkTheme.secondary_color 
  : themes.lightTheme.secondary_color;
  const buttons_flex = listVisible ? 4 : 2;

  return (
    <Context.Provider value={{ theme, setListVisible, setMessage }}>
      <View style={[styles.main_container, styles.align,
        {backgroundColor: main_color}]}>
      
        <View style={styles.top_container}>
          <Button label="Help" color={main_color} 
          color2={secondary_color} color3={secondary_color} func={() => setMessage(getRandomMessage)}></Button>
          <Switch
            trackColor={{false: secondary_color, true: secondary_color}}
            thumbColor={main_color}
            ios_backgroundColor={secondary_color}
            onValueChange={() => setTheme(prev => !prev)}
            value={theme}
            style={{margin: 20}}
          />
        </View>
        
        <View style={[styles.text_container, styles.align]}>
          <ScrollView contentContainerStyle={[styles.scrollGrow, styles.align]}>
            <Text style={[styles.text, {color: secondary_color}]}>
              {message}
            </Text>
          </ScrollView>
        </View>
        
        <View style={[styles.buttons_container, styles.border_top,
          {borderColor: secondary_color, flex: buttons_flex}]}>
          <ScrollView contentContainerStyle={[styles.scrollGrow, styles.align]}>

            {!listVisible && <View style={[styles.inner_buttons_container, styles.align]}>
            <Text style={[styles.text, {color: secondary_color, width: '100%', textAlign: 'center'}]}>
              What is bothering you? Let me help, you can always rely on me.
              </Text>
               <ToggleButton label="  See list  "></ToggleButton>
            </View>}

            {listVisible && 
            <View style={styles.align}>
              <View style={styles.right_container}>
               <ToggleButton label="X"></ToggleButton>
              </View>
              <View style={[ styles.inner_buttons_container, styles.align] }>
                <HelpButton label="Anxiety attack" msg={HelpText.anxietyAttackText}></HelpButton>
                <HelpButton label="I have no friends" msg={HelpText.noFriendsText}></HelpButton>
                <HelpButton label="No one will ever love me" msg={HelpText.noLoveText}></HelpButton>
                <HelpButton label="I feel hopeless" msg={HelpText.hopelessText}></HelpButton>
                <HelpButton label="I feel lonely" msg={HelpText.lonelyText}></HelpButton>
                <HelpButton label="I have no motivation" msg={HelpText.motivationText}></HelpButton>
                <HelpButton label="I have nothing to look forward to in life" msg={HelpText.lookForwardText}></HelpButton>
              </View>
            </View>}

          </ScrollView>
        </View>

        <StatusBar style="auto" />
      </View>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  border_top: {
    borderTopWidth: 2,
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  },
  scrollGrow: {
    flexGrow: 1,
  },
  top_container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 5,
    paddingTop: 40
  },
  right_container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    paddingRight: 10
  },
  align: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_container: {
    flex: 5,
    maxWidth: 600,
    width: '100%',
    padding: 20
  },
  buttons_container: {
    maxWidth: 600,
    width: '100%',
    padding: 20
  },
  inner_buttons_container: {
    flex: 1,
    padding: 10,
    rowGap: 20,
    columnGap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Switch } from 'react-native';
import { useState, createContext, useEffect } from 'react';
import themes from './Themes';
import { HelpButton, Button } from './Button';
import { randomReassurance, anxietyAttackText } from './HelpText';

export const Context = createContext();

export default function App() {

  const [theme, setTheme] = useState(false);
  const [message, setMessage] = useState(randomReassurance[Math.floor(Math.random() * randomReassurance.length)]);
  const [listVisible, setListVisible] = useState(false);

  const main_color = theme ? themes.darkTheme.main_color 
  : themes.lightTheme.main_color;
  const secondary_color = theme ? themes.darkTheme.secondary_color 
  : themes.lightTheme.secondary_color;
  const buttons_flex = listVisible ? 4 : 2;

  return (
    <Context.Provider value={{ theme }}>
      <View style={[styles.main_container, styles.align,
        {backgroundColor: main_color}]}>
      
      <View style={styles.right_container}>
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
          <Text style={[styles.text, {color: secondary_color}]}>
            {message}
          </Text>
        </View>
        
        <View style={[styles.buttons_container, styles.border_top,
          {borderColor: secondary_color, flex: buttons_flex}]}>
          <ScrollView>

            {!listVisible && <View style={styles.inner_buttons_container}>
            <Text style={[styles.text, {color: secondary_color, width: '100%', textAlign: 'center'}]}>
              What is bothering you? Let me help, you can always rely on me.
              </Text>
              <Button label="  See list  " func={() => setListVisible(listVisible => !listVisible)}></Button>
            </View>}

            {listVisible && 
            <View style={styles.align}>
              <View style={styles.right_container}>
                <Button label="X" func={() => setListVisible(listVisible => !listVisible)}></Button>
              </View>
              <View style={styles.inner_buttons_container}>
                <HelpButton label="Anxiety attack" func={() => {
                  setListVisible(listVisible => !listVisible);
                  setMessage(anxietyAttackText);
                }}></HelpButton>
                <HelpButton label="I have no friends" func={() => alert()}></HelpButton>
                <HelpButton label="No one will ever love me" func={() => alert()}></HelpButton>
                <HelpButton label="I feel hopeless" func={() => alert()}></HelpButton>
                <HelpButton label="I have no motivation" func={() => alert()}></HelpButton>
                <HelpButton label="I have nothing to look forward to in life" func={() => alert()}></HelpButton>
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
  right_container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    paddingRight: 20
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
    paddingTop: 10
  },
  inner_buttons_container: {
    flex: 1,
    padding: 20,
    rowGap: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

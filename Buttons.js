import { useContext } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Context } from './App';
import themes from './Themes';

export function Button({ label, func, color, color2, color3 }) {
  
  return (
      <View style={[styles.buttonContainer, {borderColor: color2, backgroundColor: color3}]}>
      <Pressable style={styles.button} onPress={func}>
          <Text style={[styles.buttonLabel, {color: color}]}>{label}</Text>
      </Pressable>
      </View>
  );
}

export function ToggleButton({ label }) {

  const { setListVisible, theme } = useContext(Context);

  const color = theme ? themes.darkTheme.main_color 
  : themes.lightTheme.main_color;
  const color2 = theme ? themes.darkTheme.secondary_color 
  : themes.lightTheme.secondary_color;

  return (
      <Button label={label} color={color} color2={color2} color3={color2} func={() =>
        setListVisible(prev => !prev)}></Button>
  );
}

export function HelpButton({ label, msg }) {

  const { setListVisible, setMessage, theme } = useContext(Context);

  const color2 = theme ? themes.darkTheme.help_buttons_color 
  : themes.lightTheme.help_buttons_color;
  const color3 = theme ? themes.darkTheme.main_color 
  : themes.lightTheme.secondary_color;

  return (
      <Button label={label} color={color3} color2={color2} color3={color2} func={() => {
        setListVisible(prev => !prev);
        setMessage(msg);
      }}></Button>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 18,
  },
});

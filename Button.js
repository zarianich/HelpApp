import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useContext } from 'react';
import { Context } from './App';
import themes from './Themes';

export function HelpButton({ label, func }) {

    const { theme } = useContext(Context);

    const secondary_color = theme ? themes.darkTheme.secondary_color 
  : themes.lightTheme.secondary_color;
    const help_buttons_color = theme ? themes.darkTheme.help_buttons_color 
  : themes.lightTheme.help_buttons_color;

    return (
        <View style={[styles.buttonContainer, {borderColor: help_buttons_color}]}>
        <Pressable style={styles.button} onPress={func}>
            <Text style={[styles.buttonLabel, {color: secondary_color}]}>{label}</Text>
        </Pressable>
        </View>
    );
}

export function Button({ label, func }) {

  const { theme } = useContext(Context);

  const secondary_color = theme ? themes.darkTheme.secondary_color 
  : themes.lightTheme.secondary_color;

  return (
      <View style={[styles.buttonContainer, {borderColor: secondary_color}]}>
      <Pressable style={styles.button} onPress={func}>
          <Text style={[styles.buttonLabel, {color: secondary_color}]}>{label}</Text>
      </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    fontSize: 18,
  },
});

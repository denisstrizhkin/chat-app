import {
  StyleSheet,
} from 'react-native';

export const API_URL = 'https://messenger.strizhkindenis.ru/api/';

export const COLORS = {
  bgDark: "#283739",
  bgLight: "#2c5d63",
  accent: "#a2c11c",
  fg: "#e0e0e0"
};

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: COLORS.bgLight,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 1000,
    alignItems: "center",
  },
  inputText: {
    color: COLORS.fg,
  },
  btn: {
    backgroundColor: COLORS.accent,
    width: "70%",
    height: 50,
    marginTop: 40,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  btn2: {
    backgroundColor: COLORS.accent,
    width: "70%",
    height: 50,
    marginTop: 15,
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
  channel: {
    backgroundColor: COLORS.bgLight,
    width: "100%",
    padding: 15,
    marginBottom: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  channelText: {
    color: COLORS.fg,
    fontSize: 20,
  },
  list: {
    width: "100%",
  },
  text: {
    color: COLORS.fg,
  },
  btnText: {
    color: COLORS.bgDark,
  },
  errorText: {
    marginTop: 25,
    color: COLORS.accent,
  }
});

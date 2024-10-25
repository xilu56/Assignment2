import { Platform } from 'react-native';

export const commonStyles = {
  container: {
    flex: 2,
    padding: 25,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  largeInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    height: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  datePicker: {
    width: '100%',
    marginBottom: 20,
    marginTop: -60,
    transform: [{ scale: 0.7 }],
  },
};

export const platformSpecificStyles = {
  input: {
    padding: Platform.OS === 'ios' ? 12 : 10,
  },
};

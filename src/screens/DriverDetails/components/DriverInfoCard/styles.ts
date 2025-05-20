import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  driverDetailsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  detailHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  wikiLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

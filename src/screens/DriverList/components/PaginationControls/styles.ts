import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  paginationControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#ffffff',
  },
  paginationButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  paginationButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  pageInfo: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

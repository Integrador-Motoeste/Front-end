import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
        marginBottom: 15,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 200},
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 5,
      },

      row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      
      text: {
        padding: 5,
        marginLeft: 10,
        fontSize: 16,
        color: '#616161',
        borderWidth: 0.7,
        borderRadius: 20,
        borderColor: '#616161',
        flex: 1,

      },

      price: {
        padding: 5,
        borderRadius: 20,
        borderColor: '#616161',
        fontSize: 16,
        color: '#616161',
        borderWidth: 0.7,
        marginLeft: 30,
      },

      status: {
        padding: 5,
        fontSize: 16,
        borderWidth: 0.7,
        borderColor: '#616161',
        borderRadius: 20,
        marginLeft: 10,
      },

      completed: {
        color: '#1FD87F',
        borderColor: '#1FD87F',
      },

      cancelled: {
        color: '#D81F1F',
        borderColor: '#D81F1F',
      },
})
import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        height: Dimensions.get('window').height/4,
        backgroundColor: '#1FD87F',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        padding: 20,
        justifyContent: 'center',
       
    },

    title: {
        //marginTop: 25,
        fontSize: 32,
        color: 'white',
    },

    filters: {
        flexDirection: 'row',
        marginTop: 10,
        marginRight: 50,
        gap: 8,
    },

    filter: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 5,
    },

    filterText: {
        color: '#1FA0D8',
        marginLeft: 5,
        fontWeight: 'bold'
    },

    filterText2: {
        color: '#1FD87F',
        marginLeft: 5,
        fontWeight: 'bold'
    },

    content: {
        padding: 20,
      },

    noRidesText: {    
    fontSize: 18,   
    color: 'gray',        
    marginTop: 20,
    },

    filterButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginLeft: 20,
    },

    filterButton: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        marginRight: 5,
    },

    activeFilter: {
        padding: 10,
        backgroundColor: '#1FD87F',
        color: '#fff',
        borderRadius: 20,
        marginRight: 5,
    },

})
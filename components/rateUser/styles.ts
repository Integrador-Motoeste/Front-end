import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 18,
        color: '#1FD87F',
        marginBottom: 30,
        textAlign: 'center',
    },
    userInfoContainer: {
        borderRadius: 15,
        padding: 10,
        marginBottom: 30,
        width: '100%',
        marginTop: 25,
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        color: '#1FD87F',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    ratingButton: {
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        marginLeft: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    selectedRatingButton: {
        backgroundColor: '#1FD87F',
    },
    ratingText: {
        fontSize: 18,
        color: '#000',
    },
    selectedRatingText: {
        color: '#FFF',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

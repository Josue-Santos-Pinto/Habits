import { ActivityIndicator, View } from "react-native"

export default () => {
    return (
        <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:'#09090A'}}>
            <ActivityIndicator size='large' color='#7C3AED' />
        </View>
    )
}
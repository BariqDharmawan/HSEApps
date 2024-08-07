import useGetDetailCategory from "@/hooks/useGetDetailCategory";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

const CategoryDetail = () => {
    const {id} = useLocalSearchParams()
    const {category} = useGetDetailCategory({id: String(id)})
    return (
        <View>
            <Stack.Screen options={{
                title: `Category ${category?.label}`
            }} />
            
        </View>
    );
}
 
export default CategoryDetail;
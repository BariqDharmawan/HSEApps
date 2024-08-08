import useGetDetailCategory from '@/hooks/useGetDetailCategory';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Card, Checkbox, Text } from 'react-native-paper';

const CategoryDetail = () => {
    const { id } = useLocalSearchParams();
    const { category, fields } = useGetDetailCategory({
        id: String(id),
        getFields: true,
    });

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    title: `Category ${category?.label}`,
                }}
            />
            <FlatList
                data={fields}
                contentContainerStyle={{
                    gap: 20,
                }}
                renderItem={({ item: field }) => (
                    <Card
                        style={{
                            borderRadius: 8,
                            overflow: 'hidden',
                        }}
                    >
                        <Card.Content
                            style={{
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderColor: '#E6E6E6',
                            }}
                        >
                            <View
                                style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Text
                                    style={{
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {field.section_title}
                                </Text>
                                <Checkbox status="unchecked" />
                            </View>
                        </Card.Content>
                    </Card>
                )}
                keyExtractor={(item) => item.section_title.replaceAll(' ', '-')}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        marginTop: 50,
        paddingVertical: 10,
        flex: 1,
        paddingHorizontal: 20,
    },
    tabHref: {
        position: 'absolute',
        left: '50%',
        bottom: 24,
        marginLeft: -10,
    },
});

export default CategoryDetail;

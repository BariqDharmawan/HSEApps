import BoxDivider from '@/components/BoxDivider';
import FormControl from '@/components/FormControl';
import useGetDetailCategory from '@/hooks/useGetDetailCategory';
import { indexToLetter, TIndexLetter } from '@/utils/strNumber';
import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Card, Checkbox, Text } from 'react-native-paper';

const CategoryDetail = () => {
    const { id } = useLocalSearchParams();
    const { category, fields: containerFields } = useGetDetailCategory({
        id: String(id),
        getFields: true,
    });
    console.log('containerFields', JSON.stringify(containerFields, null, 2));
    

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    title: `Category ${category?.label}`,
                }}
            />
            <FlatList
                data={containerFields}
                contentContainerStyle={{
                    gap: 20,
                }}
                renderItem={({ item: containerField, index: indexContainer }) => (
                    <View>
                        <View style={{
                            marginBottom: 16
                        }}>
                            <Text
                                style={{
                                    color: '#1F2024',
                                    fontWeight: 'medium',
                                    fontSize: 20,
                                    textTransform: 'capitalize',
                                }}
                            >
                                {indexToLetter(indexContainer as TIndexLetter)}. {containerField.container_title}
                            </Text>
                            <View
                                style={{
                                    marginTop: 6,
                                    maxWidth: 100,
                                    width: '25%',
                                    height: 2,
                                    backgroundColor: '#1F2024',
                                }}
                            />
                        </View>

                        {containerField.inputs.map((eachSection, indexSection) => (
                            <BoxDivider style={{
                                marginBottom: 20,
                            }}>
                            
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 14
                                }}>
                                <Text style={{
                                    fontSize: 18
                                }}>
                                    {indexToLetter(indexContainer as TIndexLetter)}{indexSection + 1}. {eachSection.title}
                                </Text>
                                <Checkbox
                                    status={'unchecked'}
                                    onPress={() => {
                                        // setChecked(!checked);
                                    }}
                                />
                                </View>

                                {eachSection.inputs.map(eachInput => (
                                    <FormControl options={eachInput.input_type === 'dropdown' ? eachInput.input_dropdown.map(eachDropdown => ({
                                        label: eachDropdown,
                                        value: eachDropdown
                                    })) : []} type={eachInput.input_type} label={eachInput.input_label} onChangeText={() => {}} value=''/>
                                ))}
                            
                            </BoxDivider>
                        ))}
                        
                    </View>
                )}
                keyExtractor={(item) => item.container_title.replaceAll(' ', '-')}
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

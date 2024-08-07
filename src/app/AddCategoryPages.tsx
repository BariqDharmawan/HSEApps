import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import BoxDivider from '@/components/BoxDivider';
import PlusButton from '@/components/PlusButton';
import { IFormCategoryValues, IInitInputSection, IPayloadInputCategory } from '@/utils/data';
import { generateRandomString } from '@/utils/strNumber';
import { Colors } from '@/constants/Colors';
import FormCategorySection from '@/components/FormCategorySection';
import FormCategoryInputs from '@/components/FormCategoryInputs';
import useManageCategory from '@/hooks/useManageCategory';
import { useRouter } from 'expo-router';
import 'react-native-get-random-values';
import { uuid } from 'uuidv4';

const AddCategoryPages = () => {
    const router = useRouter()
    const [categoryName, setCategoryName] = useState('')

    const initInputEachSection: IInitInputSection[] = [
        {
            input_id: generateRandomString(4),
            input_label: '',
            input_type: '',
            input_dropdown: [''],
        },
    ];

    const { addCategory, addInputCategory } = useManageCategory()

    const formikInputs = useFormik<IFormCategoryValues>({
        initialValues: {
            section_0: {
                title: '',
                inputs: initInputEachSection,
            },
        },
        onSubmit: (values) => {
            const categoryId = uuid()

            addCategory({
                id: categoryId,
                label: categoryName
            })

            const inputSection = Object.keys(values).map(value => formikInputs.values[value as keyof IFormCategoryValues].inputs)

            const saveData: IPayloadInputCategory[] = Object.keys(formikInputs.values).map(section => ({
                section_title: section,
                inputs: inputSection,
                category_id: categoryId
            }))

            addInputCategory(saveData)

            router.push('/category')
        },
    });    

    return (
        <>
            <SafeAreaView>
                <View style={{
                    paddingHorizontal: 16,
                    paddingBottom: 20,
                    borderBottomWidth: 1,
                    borderBottomColor: '#CECECE'
                }}>
                <Button mode='contained-tonal' buttonColor={Colors.blue.material} style={{
                        borderRadius: 8,
                        bottom: 0,
                    }} onPress={() => {
                        formikInputs.handleSubmit()
                    }} dark>Add new category</Button>
                </View>
            
                <ScrollView
                    style={{
                        paddingTop: 16,
                        paddingHorizontal: 16,
                    }}
                >
                    <TextInput
                    label="Category name"
                    mode="outlined"
                    style={{
                        marginBottom: 30,
                        backgroundColor: Colors.white,
                    }}
                    value={categoryName}
                    outlineStyle={{
                        borderColor: '#e8e6e6',
                    }}
                    onChangeText={value => {
                        setCategoryName(value)
                    }}
                    blurOnSubmit
                />

                    {Object.keys(formikInputs.values).map((eachSection, indexSec) => {
                        return (
                            <FormCategorySection formik={formikInputs} index={indexSec} key={`each-section-${indexSec}`}>
                                <BoxDivider
                                    style={{
                                        backgroundColor: Colors.white,
                                        marginTop: 20,
                                        gap: 20,
                                        padding: 30,
                                    }}
                                >
                                    {formikInputs.values[`section_${indexSec}`].inputs.map((eachInput, indexArr) => (
                                        <FormCategoryInputs
                                            key={eachInput.input_id}
                                            currentDropdown={
                                                formikInputs.values[`section_${indexSec}`].inputs[indexArr].input_dropdown
                                            }
                                            formik={formikInputs}
                                            indexInput={indexArr}
                                            indexSection={indexSec}
                                            isDeleteAble={formikInputs.values[`section_${indexSec}`].inputs.length > 1}
                                            isLast={indexArr === formikInputs.values[`section_${indexSec}`].inputs.length - 1}
                                            onDelete={async () => {
                                                await formikInputs.setFieldValue(
                                                    `section_${indexSec}.inputs`,
                                                    formikInputs.values[`section_${indexSec}`].inputs.filter(
                                                        (_, indexInput) => indexArr !== indexInput
                                                    )
                                                );
                                            }}
                                        />
                                    ))}

                                    <PlusButton
                                        inverted={false}
                                        style={{
                                            alignSelf: 'center',
                                            marginTop: -50,
                                        }}
                                        onPress={() => {
                                            const totalInput = formikInputs.values[`section_${indexSec}`].inputs.length;

                                            formikInputs.setFieldValue(
                                                `${Object.keys(formikInputs.values)[indexSec]}.inputs[${totalInput}]`,
                                                {
                                                    input_id: generateRandomString(4),
                                                    input_label: '',
                                                    input_type: '',
                                                    input_dropdown: [''],
                                                }
                                            );
                                        }}
                                    />
                                </BoxDivider>
                            </FormCategorySection>
                        );
                    })}

                    <View style={{
                        marginBottom: 100,
                    }}>

                    <Button
                        mode="contained"
                        textColor={Colors.blue.material}
                        buttonColor={Colors.white}
                        style={{
                            alignSelf: 'center',
                            alignContent: 'center',
                            borderWidth: 1,
                            borderColor: Colors.blue.material,
                        }}
                        onPress={() => {
                            const totalSection = Object.keys(formikInputs.values).length;
                            formikInputs.setFieldValue(`section_${totalSection}`, {
                                title: '',
                                inputs: initInputEachSection,
                            });
                        }}
                        dark
                    >
                        Tambah Section
                    </Button>

                    

                    </View>
                </ScrollView>

               
            </SafeAreaView>
            
        </>
    );
};

export default AddCategoryPages;

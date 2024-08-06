import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import BoxDivider from '@/components/BoxDivider';
import PlusButton from '@/components/PlusButton';
import CloseButton from '@/components/CloseButton';
import { inputTypes, TInputValue } from '@/constants/select-options';
import { IFormCategoryValues, IInitInputSection } from '@/utils/data';
import RadioLabel from '@/components/RadioLabel';
import { generateRandomString, isCheckedOrUnchecked } from '@/utils/strNumber';
import { Colors } from '@/constants/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import RenderCondition from '@/components/RenderCondition';
import { removeAndReorderKeys, resetKeys } from '@/utils/arrObj';
import FormCategorySection from '@/components/FormCategorySection';
import FormCategoryInputs from '@/components/FormCategoryInputs';

const AddCategoryPages = () => {

    const initInputEachSection: IInitInputSection[] = [
        {
            input_id: generateRandomString(4),
            input_label: '',
            input_type: '',
            input_dropdown: [''],
        },
    ];

    const formik = useFormik<IFormCategoryValues>({
        initialValues: {
            section_0: {
                title: '',
                inputs: initInputEachSection,
            },
        },
        onSubmit: (values) => {},
    });

    console.log(JSON.stringify(formik.values, null, 2));

    return (
        <>
            <SafeAreaView>
                <ScrollView
                    style={{
                        paddingHorizontal: 16,
                    }}
                >
                    {Object.keys(formik.values).map((eachSection, indexSec) => {

                        return (
                            <FormCategorySection formik={formik} index={indexSec} key={`each-section-${indexSec}`}>
                                <BoxDivider
                                    style={{
                                        backgroundColor: Colors.white,
                                        marginTop: 20,
                                        gap: 20,
                                        padding: 30,
                                    }}
                                >
                                    {formik.values[`section_${indexSec}`].inputs.map((eachInput, indexArr) => (
                                        <FormCategoryInputs
                                            key={eachInput.input_id}
                                            currentDropdown={formik.values[`section_${indexSec}`].inputs[indexArr].input_dropdown}
                                            formik={formik}
                                            indexInput={indexArr}
                                            indexSection={indexSec}
                                            isDeleteAble={formik.values[`section_${indexSec}`].inputs.length > 1}
                                            isLast={indexArr === formik.values[`section_${indexSec}`].inputs.length - 1}
                                            onDelete={async () => {
                                                console.log(indexArr, formik.values[`section_${indexSec}`].inputs.filter((_, indexInput) => indexArr !== indexInput));
                                                
                                                await formik.setFieldValue(`section_${indexSec}.inputs`, formik.values[`section_${indexSec}`].inputs.filter((_, indexInput) => indexArr !== indexInput))
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
                                            const totalInput = formik.values[`section_${indexSec}`].inputs.length;

                                            formik.setFieldValue(
                                                `${Object.keys(formik.values)[indexSec]}.inputs[${totalInput}]`,
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

                    <Button
                        mode="contained"
                        textColor={Colors.blue.material}
                        buttonColor={Colors.white}
                        style={{
                            alignSelf: 'center',
                            alignContent: 'center',
                            marginBottom: 130,
                            borderWidth: 1,
                            borderColor: Colors.blue.material,
                        }}
                        onPress={() => {
                            const totalSection = Object.keys(formik.values).length;
                            formik.setFieldValue(`section_${totalSection}`, {
                                title: '',
                                inputs: initInputEachSection,
                            });
                        }}
                        dark
                    >
                        Tambah Section
                    </Button>
                </ScrollView>
            </SafeAreaView>
            <View
                style={{
                    zIndex: 10,
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    left: 0,
                    padding: 20,
                    elevation: 70,
                    backgroundColor: Colors.white,
                    shadowOffset: {
                        width: 0,
                        height: 3,
                    },
                    borderTopWidth: 1,
                    borderTopColor: '#e8e6e6',
                    shadowColor: '#000',
                }}
            >
                <TextInput
                    label="Category name"
                    mode="outlined"
                    style={{
                        backgroundColor: Colors.white,
                    }}
                    outlineStyle={{
                        borderColor: '#e8e6e6',
                    }}
                    blurOnSubmit
                />
            </View>
        </>
    );
};

export default AddCategoryPages;

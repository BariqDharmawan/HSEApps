import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFormik } from 'formik';
import PlusButton from '@/components/PlusButton';
import { IFormCategoryValues, IInitInputSection } from '@/utils/data';
import { generateRandomString } from '@/utils/strNumber';
import { Colors } from '@/constants/Colors';
import FormCategoryContainer from '@/components/FormCategoryContainer';
import FormCategoryInputs from '@/components/FormCategoryInputs';
import FormCategorySection from '@/components/FormCategorySection';
import useManageCategory from '@/hooks/useManageCategory';
import { useRouter } from 'expo-router';
import 'react-native-get-random-values';
import { uuid } from 'uuidv4';

const initInputEachSection = (): IInitInputSection[] => [
    {
        input_id: generateRandomString(4),
        input_label: '',
        input_type: '',
        input_dropdown: [''],
    },
];

const AddCategoryPages = () => {
    const initSectionValue: { title: string; inputs: IInitInputSection[] }[] = [
        {
            title: '',
            inputs: initInputEachSection(),
        },
    ];

    const router = useRouter();
    const [categoryName, setCategoryName] = useState('');

    const { addCategory, addInputCategory } = useManageCategory();

    const formikInputs = useFormik<IFormCategoryValues[]>({
        initialValues: [
            {
                container_title: '',
                section: initSectionValue,
            },
        ],
        onSubmit: (values) => {
            const categoryId = uuid();

            addCategory({
                id: categoryId,
                label: categoryName,
            });

            const payload = values.map((value) => ({
                category_id: categoryId,
                inputs: value.section,
                container_title: value.container_title,
            }));

            addInputCategory(payload);

            router.push('/category');
        },
    });

    return (
        <>
            <SafeAreaView>
                <ScrollView
                    style={{
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
                        onChangeText={(value) => {
                            setCategoryName(value);
                        }}
                        blurOnSubmit
                    />

                    {formikInputs.values.map((container, indexContainer) => (
                        <FormCategoryContainer index={indexContainer} formik={formikInputs}>
                            {container.section.map((eachSection, indexSection) => (
                                <FormCategorySection
                                    value={eachSection.title}
                                    onChangeText={(value) => {
                                        eachSection.title = value;
                                        formikInputs.setValues([...formikInputs.values]);
                                    }}
                                >
                                    {eachSection.inputs.map((eachInput, indexInput) => (
                                        <FormCategoryInputs
                                            indexContainer={indexContainer}
                                            indexSection={indexSection}
                                            indexInput={indexInput}
                                            onDelete={() => {
                                                const restInputs = formikInputs.values[indexContainer].section[
                                                    indexSection
                                                ].inputs.filter(
                                                    (loopInput, indexLoopInput) => indexLoopInput !== indexInput
                                                );

                                                formikInputs.values[indexContainer].section[indexSection].inputs =
                                                    restInputs;
                                                formikInputs.setValues([...formikInputs.values]);
                                            }}
                                            currentDropdown={eachInput.input_dropdown}
                                            formik={formikInputs}
                                            style={{
                                                marginBottom: indexInput === eachSection.inputs.length - 1 ? 0 : 30,
                                            }}
                                        ></FormCategoryInputs>
                                    ))}
                                    <PlusButton
                                        style={{
                                            alignSelf: 'center',
                                            marginTop: -30,
                                        }}
                                        inverted={false}
                                        onPress={() => {
                                            formikInputs.values[indexContainer].section[indexSection].inputs.push(
                                                initInputEachSection()[0]
                                            );

                                            formikInputs.setValues([...formikInputs.values]);
                                        }}
                                    />

                                    <IconButton
                                        icon="close"
                                        mode="contained-tonal"
                                        size={20}
                                        style={{
                                            backgroundColor: 'white',
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            borderWidth: 1,
                                            borderColor: '#C5C5C5',
                                            transform: [
                                                {
                                                    translateY: -20,
                                                },
                                                {
                                                    translateX: 20,
                                                },
                                            ],
                                        }}
                                        onPress={() => {
                                            const resSection = container.section.filter(
                                                (_, indexLoopSection) => indexLoopSection !== indexSection
                                            );
                                            container.section = resSection;

                                            formikInputs.setValues([...formikInputs.values]);
                                        }}
                                    />
                                </FormCategorySection>
                            ))}

                            <Button
                                mode="contained"
                                textColor={Colors.blue.material}
                                buttonColor={Colors.white}
                                style={{
                                    marginTop: 30,
                                    alignSelf: 'center',
                                    alignContent: 'center',
                                    borderWidth: 1,
                                    borderColor: Colors.blue.material,
                                }}
                                onPress={() => {
                                    console.log(JSON.stringify(formikInputs.values, null, 2));
                                    formikInputs.values[indexContainer].section.push(initSectionValue[0]);

                                    formikInputs.setValues([...formikInputs.values]);
                                }}
                                dark
                            >
                                Tambah Section
                            </Button>
                        </FormCategoryContainer>
                    ))}

                    <Button
                        mode="contained-tonal"
                        textColor={Colors.blue.material}
                        buttonColor={Colors.white}
                        style={{
                            alignSelf: 'center',
                            alignContent: 'center',
                            borderWidth: 1,
                            marginBottom: 30,
                            borderColor: Colors.blue.material,
                        }}
                        onPress={() => {
                            formikInputs.values.push({
                                container_title: '',
                                section: initSectionValue,
                            });

                            formikInputs.setValues([...formikInputs.values]);
                            // console.log(JSON.stringify(formikInputs.values, null, 2));
                            // formikInputs.values[indexContainer].section.push(initSectionValue[0])
                            // formikInputs.setValues([...formikInputs.values])
                        }}
                        dark
                    >
                        Tambah Container
                    </Button>

                    <Button
                        mode="contained-tonal"
                        buttonColor={Colors.blue.material}
                        style={{
                            borderRadius: 8,
                            marginBottom: 30,
                        }}
                        onPress={() => {
                            formikInputs.handleSubmit();
                        }}
                        dark
                    >
                        Add new category
                    </Button>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default AddCategoryPages;

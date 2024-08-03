import BoxDivider from '@/components/BoxDivider';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, RadioButton,  Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlusButton from '@/components/PlusButton';
import CloseButton from '@/components/CloseButton';
import SwitcherLabel from '@/components/SwitcherLabel';
import { useFormik } from 'formik';

const inputTypes = [
    { label: 'Textbox', value: 'textbox' },
    { label: 'Switcher', value: 'switcher' },
    { label: 'Textarea', value: 'textarea' },
];

type FormValues = {
    [K in `title_${number}_required`]: boolean;
  };
  

const AddCategoryPages = () => {
    const [sectionBox, setSectionBox] = useState([['input-0']]);

    const formik = useFormik<FormValues>({
        initialValues: {
            [`title_${0}_required`]: false
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })
    

    return (
        <>
            <SafeAreaView>
                <ScrollView
                    style={{
                        paddingHorizontal: 16,
                    }}
                >
                    {sectionBox.map((eachSection, indexSec, arrSec) => (
                        <BoxDivider
                            key={`section-${indexSec}`}
                            style={{
                                backgroundColor: '#fff',
                                marginBottom: 30,
                            }}
                        >
                            <BoxDivider
                                style={{
                                    backgroundColor: '#fff',
                                }}
                            >
                                <TextInput
                                    label="Title section"
                                    mode="flat"
                                    style={{
                                        flexGrow: 1,
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#C1C1C1',
                                    }}
                                    blurOnSubmit
                                />

                                <SwitcherLabel value={Boolean(formik.values[(`title_${indexSec}_required`)])} label='Is required?' onValueChange={(isChecked) => {
                                    formik.setFieldValue(`title_${indexSec}_required`, isChecked)
                                }} />
                            </BoxDivider>

                            <BoxDivider
                                style={{
                                    backgroundColor: '#fff',
                                    marginTop: 20,
                                    gap: 20,
                                    padding: 30,
                                }}
                            >
                                {eachSection.map((el, indexArr, arr) => (
                                    <BoxDivider
                                        style={{
                                            position: 'relative',
                                            paddingBottom: indexArr === arr.length - 1 ? 40 : 0,
                                        }}
                                    >
                                        {arr.length > 1 && (
                                            <CloseButton
                                                onPress={() => {
                                                    setSectionBox((prevSectionBox) =>
                                                        prevSectionBox.map((innerArray, index) =>
                                                            index === indexSec
                                                                ? innerArray.filter((_, i) => i !== indexArr)
                                                                : innerArray
                                                        )
                                                    );
                                                }}
                                            />
                                        )}

                                        <TextInput
                                            label={`Put the label input ${indexArr}`}
                                            mode="flat"
                                            style={{
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#C1C1C1',
                                            }}
                                            blurOnSubmit
                                        />

                                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
                                            {inputTypes.map((type) => (
                                                <View>
                                                    <Text>{type.label}</Text>
                                                    <RadioButton
                                                        key={type.label.replaceAll(' ', '-')}
                                                        value={type.value}
                                                        status={
                                                            type.value === inputTypes[0].value ? 'checked' : 'unchecked'
                                                        }
                                                    />
                                                </View>
                                            ))}
                                        </View>
                                    </BoxDivider>
                                ))}

                                <PlusButton
                                    inverted={false}
                                    style={{
                                        alignSelf: 'center',
                                        marginTop: -50,
                                    }}
                                    onPress={() => {
                                        setSectionBox((prevSectionBox) =>
                                            prevSectionBox.map((innerArray, index) =>
                                                index === indexSec
                                                    ? [...innerArray, `input-${indexSec}-${innerArray.length}`]
                                                    : innerArray
                                            )
                                        );
                                    }}
                                />
                            </BoxDivider>

                            {arrSec.length > 1 && (
                                <Button
                                    mode="contained"
                                    textColor="#d04242"
                                    buttonColor="#fff"
                                    style={{
                                        marginTop: 20,
                                        alignSelf: 'center',
                                        borderWidth: 1,
                                        borderColor: '#d04242',
                                    }}
                                    onPress={() => {
                                        setSectionBox((prevSectionBox) =>
                                            prevSectionBox.filter((_, index) => index !== indexSec)
                                        );
                                    }}
                                    dark
                                >
                                    Remove Section
                                </Button>
                            )}
                        </BoxDivider>
                    ))}

                    <Button
                        mode="contained"
                        textColor="#2196F3"
                        buttonColor="#fff"
                        style={{
                            alignSelf: 'center',
                            alignContent: 'center',
                            marginBottom: 130,
                            borderWidth: 1,
                            borderColor: '#2196F3',
                        }}
                        onPress={() => {
                            setSectionBox((prevSectionBox) => [
                                ...prevSectionBox,
                                [`input-${prevSectionBox.length}-0`],
                            ]);
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
                    backgroundColor: '#fff',
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
                        backgroundColor: '#fff',
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

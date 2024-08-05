import { Button, IconButton, TextInput } from 'react-native-paper';
import BoxDivider from '../BoxDivider';
import RenderCondition from '../RenderCondition';
import { View } from 'react-native';
import { PropsWithChildren } from 'react';
import CloseButton from '../CloseButton';
import { inputTypes, TInputValue } from '@/constants/select-options';
import RadioLabel from '../RadioLabel';
import { IFormCategoryValues, IInitInputSection } from '@/utils/data';
import { FormikProps } from 'formik';
import { isCheckedOrUnchecked } from '@/utils/strNumber';

const FormCategoryInputs = ({
    onDelete,
    isLast,
    formik,
    currentDropdown,
    indexSection,
    isDeleteAble,
    indexInput,
}: PropsWithChildren<{
    currentDropdown: string[];
    onDelete: () => void;
    isLast: boolean;
    formik: FormikProps<IFormCategoryValues>;
    indexSection: number;
    indexInput: number;
    isDeleteAble: boolean;
}>) => {
    return (
        <BoxDivider
            style={{
                position: 'relative',
                paddingBottom: isLast ? 40 : 0,
            }}
        >
            <RenderCondition firstCondition={isDeleteAble} renderWhenTrue={<CloseButton onPress={onDelete} />} />

            <TextInput
                label="Label input"
                mode="flat"
                style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#C1C1C1',
                }}
                // value={formik.values[`section_${indexSection}`].inputs[indexInput]}
                onChangeText={(value) => {
                    formik.setFieldValue(
                        `${Object.keys(formik.values)[indexSection]}.inputs[${indexInput}].input_label`,
                        value
                    );
                }}
                blurOnSubmit
            />

            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    flexWrap: 'wrap',
                }}
            >
                {inputTypes.map((type, indexType) => (
                    <View
                        key={`each-type-${indexType}`}
                        style={{
                            width: '50%',
                        }}
                    >
                        <RadioLabel
                            label={type.value}
                            onPress={() => {
                                formik.setFieldValue(
                                    `${Object.keys(formik.values)[indexSection]}.inputs[${indexInput}].input_type`,
                                    type.value
                                );
                            }}
                            value={type.value}
                            status={isCheckedOrUnchecked(
                                formik.values[`section_${indexSection}`].inputs[indexInput][
                                    `input_type` as keyof IInitInputSection
                                ] === type.value
                            )}
                        />
                    </View>
                ))}
            </View>
            <RenderCondition
                firstCondition={
                    (formik.values[`section_${indexSection}`].inputs[indexInput][
                        `input_type` as keyof IInitInputSection
                    ] as TInputValue) === 'dropdown'
                }
                renderWhenTrue={
                    <>
                        {currentDropdown.map((dropdown, indexDropdown) => (
                            <View key={`each-dropdown-${indexSection}-${indexInput}-${indexDropdown}`}>
                                <TextInput
                                    label={`Option ${indexDropdown + 1}`}
                                    mode="outlined"
                                    style={{
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#C1C1C1',
                                        flex: 1,
                                    }}
                                    value={
                                        formik.values[`section_${indexSection}`].inputs[indexInput].input_dropdown[
                                            indexDropdown
                                        ]
                                    }
                                    onChangeText={(value) => {
                                        currentDropdown[indexDropdown] = value;

                                        formik.setFieldValue(
                                            `section_${indexSection}.inputs[${indexInput}].input_dropdown`,
                                            currentDropdown
                                        );
                                    }}
                                    blurOnSubmit
                                />
                                <RenderCondition
                                    firstCondition={currentDropdown.length > 1}
                                    renderWhenTrue={
                                        <IconButton
                                            icon="close"
                                            mode="contained-tonal"
                                            size={20}
                                            style={{
                                                position: 'absolute',
                                                right: 0,
                                                top: '50%',
                                                transform: [
                                                    {
                                                        translateY: -20,
                                                    },
                                                ],
                                            }}
                                            onPress={() => {
                                                formik.setFieldValue(
                                                    `${Object.keys(formik.values)[indexSection]}.inputs[${indexInput}].input_dropdown`,
                                                    formik.values[`section_${indexSection}`].inputs[
                                                        indexInput
                                                    ].input_dropdown.filter(
                                                        (_, indexOption) => indexOption !== indexDropdown
                                                    )
                                                );
                                            }}
                                        />
                                    }
                                />
                            </View>
                        ))}
                        <Button
                            mode="text"
                            style={{
                                alignSelf: 'flex-start',
                            }}
                            onPress={() => {
                                formik.setFieldValue(
                                    `${Object.keys(formik.values)[indexSection]}.inputs[${indexInput}].input_dropdown`,
                                    [...currentDropdown, '']
                                );
                            }}
                        >
                            Tambah option
                        </Button>
                    </>
                }
            />
        </BoxDivider>
    );
};

export default FormCategoryInputs;

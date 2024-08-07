import { Colors } from '@/constants/Colors';
import BoxDivider from '../BoxDivider';
import { PropsWithChildren } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { FormikProps } from 'formik';
import { IFormCategoryValues } from '@/utils/data';
import RenderCondition from '../RenderCondition';
import { resetKeys } from '@/utils/arrObj';
import { generateRandomString } from '@/utils/strNumber';

const FormCategorySection = ({
    children,
    formik,
    index,
}: PropsWithChildren<{ formik: FormikProps<IFormCategoryValues>; index: number }>) => {
    return (
        <BoxDivider
            style={{
                backgroundColor: Colors.white,
                marginBottom: 30,
            }}
        >
            {/* <BoxDivider
                style={{
                    backgroundColor: Colors.white,
                }}
            > */}
            <TextInput
                label="Big question"
                mode="flat"
                style={{
                    flexGrow: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: '#C1C1C1',
                }}
                value={formik.values[`section_${index}`].title}
                onChangeText={(value) => {
                    formik.setFieldValue(Object.keys(formik.values)[index], {
                        title: value,
                        inputs: formik.values[`section_${index}`].inputs,
                    });
                }}
                blurOnSubmit
            />
            {/* </BoxDivider> */}
            {children}

            <RenderCondition
                firstCondition={Object.keys(formik.values).length > 1}
                renderWhenTrue={
                    <Button
                        mode="contained"
                        textColor={Colors.red.material}
                        buttonColor={Colors.white}
                        style={{
                            marginTop: 20,
                            alignSelf: 'center',
                            borderWidth: 1,
                            borderColor: Colors.red.material,
                        }}
                        onPress={() => {
                            const sectionToRemove = Object.keys(formik.values)[index] as keyof IFormCategoryValues;
                            const { [sectionToRemove]: _, ...restSection } = formik.values;

                            formik.setValues({
                                ...resetKeys(restSection),
                            });
                        }}
                        dark
                    >
                        Remove Section
                    </Button>
                }
            />
        </BoxDivider>
    );
};

export default FormCategorySection;

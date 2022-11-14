// import { Field, Formik, Form } from "formik";

interface Props {
    onSubmit: (values: any) => void;
    onCancel: () => void;
}
// interface Props {
//     onSubmit: (values: PatientFormValues) => void;
//     onCancel: () => void;
// }

// import { TextField, SelectField, GenderOption } from "./../AddPatientModal/FormField";
// const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
//     const [{ diagnoses }] = useStateValue();
//     return (
//         <Formik
//             initialValues={
//                 {
//                     /// ...
//                 }
//             }
//             onSubmit={onSubmit}
//             validate={(values) => {
//                 /// ...
//             }}
//         >
//             {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
//                 return (
//                     <Form className="form ui">
//                         // ...
//                         <DiagnosisSelection
//                             setFieldValue={setFieldValue}
//                             setFieldTouched={setFieldTouched}
//                             diagnoses={Object.values(diagnoses)}
//                         />
//                         // ...
//                     </Form>
//                 );
//             }}
//         </Formik>
//     );
// };

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    console.log(onSubmit, onCancel);

    return <p>test</p>;
};
export default AddEntryForm;

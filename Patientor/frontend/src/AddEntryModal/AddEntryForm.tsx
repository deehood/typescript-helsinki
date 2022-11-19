import { Field, Formik, Form } from "formik";
import { Grid, Button } from "@material-ui/core";
import { Entry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection, SelectField, TextField } from "./../AddPatientModal/FormField";
import { isDate } from "../utils";

export type EntryFormValues = Omit<Entry, "id">;
interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const healthCheckRatingOptions = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "LowRisk" },
    { value: HealthCheckRating.HighRisk, label: "HighRisk" },
    { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" },
];

const entryOptions = [
    { value: "HealthCheck", label: "Health Check" },
    { value: "Hospital", label: "Hospital" },
    { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosisList }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "HealthCheck",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                console.log(values);
                // if (values.type === "HealthCheck") values[healthCheckRating] = "";

                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                } else if (!isDate(values.date)) errors.date = "Invalid Date";

                if (!values.specialist) {
                    errors.specialist = requiredError;
                }

                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
                return (
                    <Form className="form ui">
                        <SelectField label="Entry Type" name="type" options={entryOptions} />

                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosisList)}
                        />

                        {(values.type === "HealthCheck" || values.type === "Hospital") && (
                            <SelectField
                                label="HealthCheck Rating"
                                name="healthCheckRating"
                                options={healthCheckRatingOptions}
                            />
                        )}

                        {values.type === "Hospital" && (
                            <>
                                <h5>Discharge</h5>
                                <Field
                                    label="Date"
                                    placeholder="YYYY-MM-DD"
                                    name="discharge.date"
                                    component={TextField}
                                />
                                <Field
                                    label="Criteria"
                                    placeholder="Criteria"
                                    name="discharge.criteria"
                                    component={TextField}
                                />
                            </>
                        )}

                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;

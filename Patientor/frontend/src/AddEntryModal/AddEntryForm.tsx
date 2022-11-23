import { Field, Formik, Form } from "formik";
import { Grid, Button } from "@material-ui/core";
import { Entry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection, SelectField, TextField } from "./../AddPatientModal/FormField";
import { isDate } from "../utils";
// type employerName = string;

export type EntryFormValues =
    | Omit<Entry, "id">
    | (
          | HealthCheckRating
          | (HealthCheckRating & {
                discharge: { date: string; criteria: string };
            })
          | {
                sickLeave: {
                    startDate: string;
                    endDate: string;
                };
            }
      );
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
interface Discharge {
    discharge: {
        date: string;
        criteria: string;
    };
}
interface sickLeave {
    startDate: string;
    endDate: string;
}

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
                healthCheckRating: 0,
                discharge: {
                    date: "",
                    criteria: "",
                },
                employerName: "",
                sickLeave: {
                    startDate: "",
                    endDate: "",
                },
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                console.log("values ->", values);

                const requiredError = "Field is required";
                const errors: {
                    [field: string]: string | Discharge | sickLeave;
                } = {};

                if (!values.description) {
                    errors.description = requiredError;
                }

                if (!values.date) {
                    errors.date = requiredError;
                } else if (!isDate(values.date)) {
                    errors.date = "Invalid Date";
                }

                if (!values.specialist) {
                    errors.specialist = requiredError;
                }

                if (values.type === "Hospital") {
                    if (!("discharge" in errors)) Object.assign(errors, { discharge: {} });

                    if (!values.discharge.date) {
                        Object.assign(errors.discharge, { date: requiredError });
                    } else if (!isDate(values.discharge.date)) {
                        Object.assign(errors.discharge, { date: "Invalid Date" });
                    }

                    if (!values.discharge.criteria) {
                        Object.assign(errors.discharge, { criteria: requiredError });
                    }
                    if (Object.keys(errors.discharge).length === 0) delete errors.discharge;
                }

                if (values.type === "OccupationalHealthcare") {
                    if (!("employerName" in errors)) Object.assign(errors, { employerName: "" });
                    if (!("sickleave" in errors))
                        Object.assign(errors, { sickLeave: { startDate: "", endDate: "" } });

                    if (!values.employerName) errors.employerName = requiredError;

                    // Object.assign(errors, { employerName: requiredError });

                    if (values.sickLeave.startDate && !isDate(values.sickLeave.startDate)) {
                        Object.assign(errors.sickLeave, { startDate: "Invalid Date" });
                    }
                    if (values.sickLeave.endDate && !isDate(values.sickLeave.endDate)) {
                        Object.assign(errors.sickLeave, { endDate: "Invalid Date" });
                    }

                    if (Object.keys(errors.employerName).length === 0) delete errors.employerName;
                    if (Object.keys(errors.sickLeave).length === 0) delete errors.sickLeave;
                }

                console.log("errors -> ", errors);

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
                                <h3>Discharge</h3>
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
                        {values.type === "OccupationalHealthcare" && (
                            <>
                                <Field
                                    label="Employer name"
                                    placeholder="Employer name"
                                    name="employerName"
                                    component={TextField}
                                />
                                <h3>Sick leave</h3>
                                <Field
                                    label="Start date"
                                    placeholder="YYYY-MM-DD"
                                    name="sickLeave.startDate"
                                    component={TextField}
                                />
                                <Field
                                    label="End date"
                                    placeholder="YYYY-MM-DD"
                                    name="sickLeave.endDate"
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

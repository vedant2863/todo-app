import { FormFieldProps } from "../utils/types";

const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    name,
    register,
    error,
    className
}) => (
    <>
        <input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className={className}
        />
        {error && <span className="error-message">{error.message}</span>}
    </>
);
export default FormField;
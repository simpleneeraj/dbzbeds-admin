import React from "react";
import css from "styles/admin.module.scss";
/**
 * Admin Panel
 */
const UploadProductPage = () => {
  return (
    <div className={css.container}>
      <div className={css.sidebar}>
        <div className={css.controls}>
          <button>Upload</button>
        </div>
      </div>
      <div className={css.content}>
        <h1>Upload Product</h1>
        <div className={css.grid}>
          <Input
            type="text"
            label="Product Name"
            placeholder="Enter product name"
          />
          <Input
            type="text"
            label="Product Name"
            placeholder="Enter product name"
          />
        </div>
        <div className={css.inputsBox}>
          <Textarea
            label="Product Description"
            placeholder="Enter product description"
          />
        </div>
        <div className={css.grid}>
          <Select
            label="Product Size"
            options={[
              {
                text: "Hello",
                value: "World",
              },
            ]}
          />
          <Select
            label="Product Size"
            options={[
              {
                text: "Hello",
                value: "World",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
export default UploadProductPage;

interface Common {
  label: string;
  error?: string;
}

interface I extends Common, React.ComponentPropsWithoutRef<"input"> {}
const Input = ({ label, error, ...rest }: I) => {
  return (
    <div className={css.input}>
      <label>{label}</label>
      <input {...rest} />
      {error ? <span className={css.error}>{error}</span> : null}
    </div>
  );
};
interface T extends Common, React.ComponentPropsWithoutRef<"textarea"> {}
const Textarea = ({ label, error, ...rest }: T) => {
  return (
    <div className={css.input}>
      <label>{label}</label>
      <textarea {...rest}></textarea>
      {error ? <span className={css.error}>{error}</span> : null}
    </div>
  );
};
interface S extends Common, React.ComponentPropsWithoutRef<"select"> {
  options?: {
    text: string;
    value: string;
  }[];
}
const Select = ({ options, label, error, ...rest }: S) => {
  return (
    <div className={css.input}>
      <label>{label}</label>

      <select {...rest}>
        {options?.map((d, i) => (
          <option key={i} value={d.value}>
            {d.text}
          </option>
        ))}
      </select>
      {error ? <span className={css.error}>{error}</span> : null}
    </div>
  );
};

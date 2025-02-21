import classes from "./TextArea.module.css";

import sendIcon from "../assets/SVG/send.svg";

export default function TextArea({ onChange, onInput, onSubmit }) {
  
  return (
    <div className={classes.text_container}>
      <form onSubmit={onSubmit} className={classes.form}>
        <textarea
          name="text"
          id="text"
          placeholder="Enter text"
          rows="3"
          value={onInput.text}
          onChange={onChange}
        ></textarea>
        <button type="submit">
          <img src={sendIcon} alt="Send user input text icon" className={classes.icon} />
        </button>
      </form>
      {onInput.text.length > 0 && (
        <p className={classes.count}>Character Count: {onInput.text.length}</p>
      )}
    </div>
  );
}

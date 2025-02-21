// import detector from "../util/detector";
import classes from "./Translate.module.css";

import quoteIcon from "../assets/SVG/quote.svg";

export default function Translate({
  text,
  onContainer,
  onStranslate,
  onSummarize,
  onLanguage,
  handleLanguageChange,
  onSubmitting, 
}) {
  return (
    <main className={classes.conatinaer} ref={onContainer}>
      <div className={classes.trans_container}>
        {text.map((text, index) => {
          return (
            <div key={text.id} className={classes.translate} tabIndex="0">
              <div className={classes.text_box}>
                <div className={classes.text_div}>
                  <p className={classes.text}>{text.text}</p>
                  <div className={classes.action_container}>
                    <div className={classes.action}>
                      <select
                        value={onLanguage}
                        onChange={handleLanguageChange}
                      >
                        <option value="en">English</option>
                        <option value="pt">Portuguese</option>
                        <option value="es">Spanish</option>
                        <option value="ru">Russian</option>
                        <option value="tr">Turkish</option>
                        <option value="fr">French</option>
                      </select>
                      <button
                        className={classes.trans_action}
                        onClick={() => onStranslate(text.id)}
                      >
                        Translate
                      </button>
                      {text.lang === "en" && text.count > 150 && (
                        <button
                          className={classes.sum_action}
                          onClick={() => onSummarize(text.id)}
                          disabled={onSubmitting ? true : false}
                        >
                          Summarize
                        </button>
                      )}
                    </div>
                    <p className={classes.lang}>{text.lang}</p>
                  </div>
                </div>
                {/* <div><img src={quoteIcon} alt="" /></div> */}
              </div>
              {text.trans !== "" && (
                <div className={classes.trans}>{text.trans}</div>
              )}
              {text.sum !== "" && <div className={classes.sum}>{text.sum}</div>}
            </div>
          );
        })}
      </div>
    </main>
  );
}

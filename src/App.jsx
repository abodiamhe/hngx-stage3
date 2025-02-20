import { useState, useEffect, useRef } from "react";

import TextArea from "./component/TextArea";
import Header from "./component/Header";
import Translate from "./component/translate";
import detector from "./util/detector";
import translate from "./util/translate";
import summarize from "./util/summarize";

const textData = [
  {
    id: "d11",
    lang: "en",
    text: "Where is the next bus stop, please?",
    trans: "svsv erffs vusms",
    sum: "The text asks where the next bus stop is, likely in a specific location. It doesn't provide any further context about why the bus stop is important or the person's need for it.",
    count: 15,
  },
  {
    id: "d12",
    lang: "en",
    text: "Hello",
    trans: "svsv erffs vusms",
    sum: "It doesn't offer any further information about the greeting or its meaning.",
    count: 7,
  },
];

function App() {
  const containerRef = useRef(null);

  //To disable summarising button
  const [submitting, setSubmitting] = useState(false);
  //Select the language to translate to
  const [selectLanguage, setSelectLanguage] = useState("");
  //pass the aray of object to be display
  const [text, setText] = useState([]);
  //Input field for user text
  const [userInput, setUserInput] = useState({
    id: Math.random().toString(),
    lang: "",
    text: "",
    trans: "",
    sum: "",
    count: 0,
  });
  
  //Makes our container always be at the bottom when new text is added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [userInput]);

  //Getting user input for text field in userInput and keeping the other values
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const handleLanguageChange = (event) => {
    setSelectLanguage(event.target.value);
  };

  //When submitted, we push the userInput object to array while keepping the rest values empty, but sending the text to API for detection
  const handleSubmit = async (event) => {
    event.preventDefault();
    //Detecting the text language
    const language = await detector(userInput.text);
    const newText = {
      ...userInput,
      lang: language,
      count: userInput.text.length,
    };

    setText((prevValue) => [...prevValue, newText]);

    setUserInput({
      id: Math.random().toString(),
      lang: "",
      text: "",
      trans: "",
      sum: "",
      count: 0,
    });
  };

  //To extract input id and language to translate to when translate form is submited
  const handleTranslate = async (id) => {
    const obj = text.find((text) => text.id === id);

    if (selectLanguage) {
      const translateText = await translate(selectLanguage, obj);

      setText((prevValue) =>
        prevValue.map((text) =>
          text.id === id ? { ...text, trans: translateText } : text
        )
      );
    }
  };

  //To extract input id when summarize form is submited
  const handleSummarize = async (id) => {
    const obj = text.find((text) => text.id === id);
    setSubmitting(true);

    if (obj) {
      const summarizedText = await summarize(obj.text);

      setText((prevValue) =>
        prevValue.map((text) => {
          setSubmitting(false);
          return text.id === id ? { ...text, sum: summarizedText } : text;
        })
      );
    } else {
      console.log("no text found ");
    }
  };

  return (
    <div className="container">
      <div className="feature">
        <Header />
        <Translate
          text={text}
          onContainer={containerRef}
          onStranslate={handleTranslate}
          onSummarize={handleSummarize}
          onLanguage={selectLanguage}
          handleLanguageChange={handleLanguageChange}
          onSubmitting={submitting} 
        />
        <section>
          <TextArea
            onChange={handleChange}
            onInput={userInput}
            onSubmit={handleSubmit} 
          />
        </section>
      </div>
    </div>
  );
}

export default App;

//Registration for Language Detector API
//Token: Ao0sOYNgv1RN4h4O2t16oikVJrL6QPk1y11WTW9fjlKIVw6RgzXeOJ19yvXCdzS7KOO0wHpku3ysJsyT+297pgYAAABXeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjUxNzQiLCJmZWF0dXJlIjoiTGFuZ3VhZ2VEZXRlY3Rpb25BUEkiLCJleHBpcnkiOjE3NDk1OTk5OTl9

//Translation API
//Token: AlnVnF22b1HlFaFwg7mkmBId51AYAg7k9K5FfKIE/2G6iR1zd8I35fia1e4oa/RkQY1cRCq4+MPM3IfBEc07XQEAAABReyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjUxNzQiLCJmZWF0dXJlIjoiVHJhbnNsYXRpb25BUEkiLCJleHBpcnkiOjE3NTMxNDI0MDB9

//Summerize API
//Token: Asn9zG8TyEfsjbIE4NAL3+SWxllmQYo+kHznZddU7C4I//MPjdDfeKDNsA2tc4PC1HoExTPteL5UENIrnhR+nw8AAABVeyJvcmlnaW4iOiJodHRwOi8vbG9jYWxob3N0OjUxNzQiLCJmZWF0dXJlIjoiQUlTdW1tYXJpemF0aW9uQVBJIiwiZXhwaXJ5IjoxNzUzMTQyNDAwfQ==
